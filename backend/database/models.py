"""
ServiceSync AI — Database Models
Easy-to-use functions for reading and writing to the database.

Usage:
    from database.models import resolve_fault_code, log_decision, get_open_cases
"""

import sqlite3
import os
import re
import json
from datetime import datetime

DB_PATH = os.path.join(os.getcwd(), 'backend', 'servicesync.db')


def get_connection():
    """Get a database connection with row_factory for dict-like access."""
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    return conn


# ═══════════════════════════════════════════════
# FAULT CODES
# ═══════════════════════════════════════════════

def _enrich_fault_code(code_row, conn):
    """Add typical causes and edge cases to a fault code result."""
    if code_row is None:
        return None

    code_id = code_row['id']
    cursor = conn.cursor()

    cursor.execute('SELECT cause, probability FROM typical_causes WHERE fault_code_id = ?',
                   (code_id,))
    causes = [dict(row) for row in cursor.fetchall()]

    cursor.execute('SELECT scenario, likely_cause, ai_value_add FROM edge_cases WHERE fault_code_id = ?',
                   (code_id,))
    edges = [dict(row) for row in cursor.fetchall()]

    return {
        **dict(code_row),
        'typical_causes': causes,
        'edge_cases': edges
    }


def get_fault_code_by_spn_fmi(spn, fmi):
    """Look up by SPN and FMI numbers (heavy-duty J1939 format)."""
    conn = get_connection()
    cursor = conn.cursor()
    cursor.execute('SELECT * FROM fault_codes WHERE spn = ? AND fmi = ?', (spn, fmi))
    result = _enrich_fault_code(cursor.fetchone(), conn)
    conn.close()
    return result


def get_fault_code_by_obd2(obd2_code):
    """Look up by OBD-II P-code (light/medium-duty format)."""
    conn = get_connection()
    cursor = conn.cursor()
    cursor.execute('SELECT * FROM fault_codes WHERE obd2_code = ?', (obd2_code.upper(),))
    result = _enrich_fault_code(cursor.fetchone(), conn)
    conn.close()
    return result


def get_fault_code_by_cummins_code(cummins_code):
    """Look up by Cummins OEM fault code number."""
    conn = get_connection()
    cursor = conn.cursor()
    cursor.execute('SELECT * FROM fault_codes WHERE cummins_code = ?', (cummins_code,))
    result = _enrich_fault_code(cursor.fetchone(), conn)
    conn.close()
    return result


def get_fault_code_by_pid_sid(pid_sid):
    """Look up by PID/SID identifier (legacy J1587/J1708 format)."""
    conn = get_connection()
    cursor = conn.cursor()
    cursor.execute('SELECT * FROM fault_codes WHERE pid_sid = ?', (pid_sid.upper(),))
    result = _enrich_fault_code(cursor.fetchone(), conn)
    conn.close()
    return result


def resolve_fault_code(code_input):
    """
    Auto-detect format and look up the fault code.
    Accepts any of:
      - "SPN 157 FMI 18" (SPN/FMI format)
      - "P0087" (OBD-II format)
      - "SID 27" or "PID 157" (PID/SID legacy format)
      - "559" (Cummins OEM number)
      - 559 (integer Cummins OEM number)
    Returns the full fault code record or None.
    """
    code_str = str(code_input).strip().upper()

    # Try SPN/FMI format: "SPN 157 FMI 18"
    spn_fmi_match = re.match(r'SPN\s*(\d+)\s*FMI\s*(\d+)', code_str)
    if spn_fmi_match:
        spn = int(spn_fmi_match.group(1))
        fmi = int(spn_fmi_match.group(2))
        return get_fault_code_by_spn_fmi(spn, fmi)

    # Try OBD-II format: "P0087", "P0420"
    obd2_match = re.match(r'^P\d{4}$', code_str)
    if obd2_match:
        return get_fault_code_by_obd2(code_str)

    # Try PID/SID format: "SID 27", "PID 157", "SID27", "PID157"
    pid_sid_match = re.match(r'^(SID|PID)\s*(\d+)$', code_str)
    if pid_sid_match:
        prefix = pid_sid_match.group(1)
        number = pid_sid_match.group(2)
        normalized = f"{prefix} {number}"
        return get_fault_code_by_pid_sid(normalized)

    # Try Cummins OEM number: "559" or 559
    try:
        cummins_num = int(code_str)
        return get_fault_code_by_cummins_code(cummins_num)
    except ValueError:
        pass

    return None


def get_all_fault_codes():
    """Get a list of all fault codes in the database."""
    conn = get_connection()
    cursor = conn.cursor()
    cursor.execute('''
        SELECT id, cummins_code, spn, fmi, obd2_code, description,
               system_category, complexity, safety_critical, causes_derate,
               applies_to
        FROM fault_codes ORDER BY spn, fmi
    ''')
    results = [dict(row) for row in cursor.fetchall()]
    conn.close()
    return results


def search_fault_codes(keyword):
    """Search fault codes by keyword in description or system_category."""
    conn = get_connection()
    cursor = conn.cursor()
    cursor.execute('''
        SELECT * FROM fault_codes
        WHERE description LIKE ? OR system_category LIKE ?
        ORDER BY safety_critical DESC, spn
    ''', (f'%{keyword}%', f'%{keyword}%'))
    results = [_enrich_fault_code(row, conn) for row in cursor.fetchall()]
    conn.close()
    return results


def add_fault_code(cummins_code, spn, fmi, obd2_code, description,
                   system_category, complexity='medium', safety_critical=False,
                   causes_derate=False, qsol_procedure=None, pid_sid=None,
                   applies_to='all'):
    """Add a new fault code supporting all formats."""
    conn = get_connection()
    cursor = conn.cursor()
    cursor.execute('''
        INSERT OR IGNORE INTO fault_codes
        (cummins_code, spn, fmi, obd2_code, pid_sid, description,
         system_category, complexity, safety_critical, causes_derate,
         qsol_procedure, applies_to)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    ''', (cummins_code, spn, fmi, obd2_code, pid_sid, description,
          system_category, complexity, safety_critical, causes_derate,
          qsol_procedure, applies_to))
    conn.commit()
    last_id = cursor.lastrowid
    conn.close()
    return last_id


# ═══════════════════════════════════════════════
# SERVICE HISTORY
# ═══════════════════════════════════════════════

def get_service_history(engine_serial, months_back=6):
    """Get recent service history for an engine."""
    conn = get_connection()
    cursor = conn.cursor()
    cursor.execute('''
        SELECT service_date, fault_code_input, repair_type, parts_replaced,
               part_cost, technician_notes, warranty_status
        FROM service_history
        WHERE engine_serial = ?
          AND service_date > date('now', ? || ' months')
        ORDER BY service_date DESC
        LIMIT 10
    ''', (engine_serial, f'-{months_back}'))
    results = [dict(row) for row in cursor.fetchall()]
    conn.close()
    return results


def check_recent_related_repairs(engine_serial, fault_code_input, days_back=90):
    """Check if same or related fault code was repaired recently. Used by Service History Agent."""
    conn = get_connection()
    cursor = conn.cursor()
    cursor.execute('''
        SELECT service_date, fault_code_input, repair_type, parts_replaced,
               part_cost, technician_notes
        FROM service_history
        WHERE engine_serial = ?
          AND fault_code_input = ?
          AND service_date > date('now', ? || ' days')
        ORDER BY service_date DESC
    ''', (engine_serial, fault_code_input, f'-{days_back}'))
    results = [dict(row) for row in cursor.fetchall()]
    conn.close()
    return results


def add_service_record(engine_serial, service_date, fault_code_input,
                       repair_type, parts_replaced=None, part_cost=0,
                       technician_id=None, notes=None, warranty='none'):
    """Add a service history record."""
    conn = get_connection()
    cursor = conn.cursor()
    cursor.execute('''
        INSERT INTO service_history
        (engine_serial, service_date, fault_code_input, repair_type,
         parts_replaced, part_cost, technician_id, technician_notes,
         warranty_status)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    ''', (engine_serial, service_date, fault_code_input, repair_type,
          parts_replaced, part_cost, technician_id, notes, warranty))
    conn.commit()
    conn.close()


# ═══════════════════════════════════════════════
# DECISION LOGS (Audit Trail)
# ═══════════════════════════════════════════════

def log_decision(engine_serial, fault_code_input, tech_id, tech_skill_level,
                 symptoms, triage_diagnosis, triage_confidence,
                 triage_reasoning, escalation_decision, escalation_reasoning,
                 requires_approval, online_status='online',
                 case_id=None, environment=None, guidance_notes=None,
                 alternative_causes=None, recommended_tests=None,
                 recent_repairs=None, service_history_flags=None,
                 warranty_status=None,
                 insite_data=None, llm_model='llama-3.2-3b', llm_version='v1.0'):
    """Log an AI diagnosis decision for audit trail."""
    # Try to resolve the fault code to get the database ID
    resolved = resolve_fault_code(fault_code_input)
    fault_code_id = resolved['id'] if resolved else None

    conn = get_connection()
    cursor = conn.cursor()
    cursor.execute('''
        INSERT INTO decision_logs
        (timestamp, engine_serial, fault_code_input, fault_code_id,
         tech_id, tech_skill_level, case_id,
         symptoms, insite_data, environment,
         triage_diagnosis, triage_confidence,
         triage_reasoning, alternative_causes, recommended_tests,
         recent_repairs, service_history_flags, warranty_status,
         escalation_decision, escalation_reasoning, requires_approval,
         guidance_notes,
         online_status, llm_model, llm_version)
        VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)
    ''', (
        datetime.now().isoformat(),
        engine_serial, fault_code_input, fault_code_id,
        tech_id, tech_skill_level, case_id,
        symptoms,
        json.dumps(insite_data) if insite_data else None,
        json.dumps(environment) if environment else None,
        triage_diagnosis, triage_confidence, triage_reasoning,
        json.dumps(alternative_causes) if alternative_causes else None,
        json.dumps(recommended_tests) if recommended_tests else None,
        json.dumps(recent_repairs) if recent_repairs else None,
        json.dumps(service_history_flags) if service_history_flags else None,
        warranty_status,
        escalation_decision, escalation_reasoning, requires_approval,
        guidance_notes,
        online_status, llm_model, llm_version
    ))
    conn.commit()
    decision_id = cursor.lastrowid
    conn.close()
    return decision_id


def get_pending_escalations():
    """Get all decisions that need senior approval."""
    conn = get_connection()
    cursor = conn.cursor()
    cursor.execute('''
        SELECT * FROM decision_logs
        WHERE requires_approval = 1
          AND approved_by IS NULL
        ORDER BY timestamp DESC
    ''')
    results = [dict(row) for row in cursor.fetchall()]
    conn.close()
    return results


def approve_decision(decision_id, approved_by):
    """Senior tech approves a decision."""
    conn = get_connection()
    cursor = conn.cursor()
    cursor.execute('''
        UPDATE decision_logs
        SET approved_by = ?,
            approval_timestamp = ?,
            updated_at = ?
        WHERE id = ?
    ''', (approved_by, datetime.now().isoformat(),
          datetime.now().isoformat(), decision_id))
    conn.commit()
    conn.close()


def record_outcome(decision_id, actual_repair, parts_used,
                   repair_successful, repair_duration_hours=None):
    """Record the actual outcome after repair is done."""
    conn = get_connection()
    cursor = conn.cursor()
    cursor.execute('''
        UPDATE decision_logs
        SET actual_repair = ?,
            parts_used = ?,
            repair_successful = ?,
            repair_duration_hours = ?,
            updated_at = ?
        WHERE id = ?
    ''', (actual_repair, json.dumps(parts_used), repair_successful,
          repair_duration_hours, datetime.now().isoformat(), decision_id))
    conn.commit()
    conn.close()


def mark_synced(decision_id):
    """Mark an offline decision as synced to server."""
    conn = get_connection()
    cursor = conn.cursor()
    cursor.execute('''
        UPDATE decision_logs
        SET online_status = 'synced',
            sync_timestamp = ?,
            updated_at = ?
        WHERE id = ?
    ''', (datetime.now().isoformat(), datetime.now().isoformat(), decision_id))
    conn.commit()
    conn.close()


def get_decision_log(decision_id):
    """Get a specific decision log entry."""
    conn = get_connection()
    cursor = conn.cursor()
    cursor.execute('SELECT * FROM decision_logs WHERE id = ?', (decision_id,))
    result = cursor.fetchone()
    conn.close()
    return dict(result) if result else None


def get_recent_decisions(limit=20):
    """Get the most recent decision logs."""
    conn = get_connection()
    cursor = conn.cursor()
    cursor.execute('''
        SELECT id, timestamp, engine_serial, fault_code_input, tech_id,
               triage_diagnosis, triage_confidence, escalation_decision,
               requires_approval, approved_by, repair_successful, online_status
        FROM decision_logs
        ORDER BY timestamp DESC
        LIMIT ?
    ''', (limit,))
    results = [dict(row) for row in cursor.fetchall()]
    conn.close()
    return results


def get_offline_pending_sync():
    """Get all offline decisions waiting to be synced."""
    conn = get_connection()
    cursor = conn.cursor()
    cursor.execute('''
        SELECT * FROM decision_logs
        WHERE online_status = 'offline'
        ORDER BY timestamp ASC
    ''')
    results = [dict(row) for row in cursor.fetchall()]
    conn.close()
    return results


# ═══════════════════════════════════════════════
# TECHNICIANS
# ═══════════════════════════════════════════════

def add_technician(tech_id, name, skill_level, email=None, phone=None):
    conn = get_connection()
    cursor = conn.cursor()
    cursor.execute('''
        INSERT OR IGNORE INTO technicians (tech_id, name, skill_level, email, phone)
        VALUES (?, ?, ?, ?, ?)
    ''', (tech_id, name, skill_level, email, phone))
    conn.commit()
    conn.close()


def get_technician(tech_id):
    conn = get_connection()
    cursor = conn.cursor()
    cursor.execute('SELECT * FROM technicians WHERE tech_id = ?', (tech_id,))
    result = cursor.fetchone()
    conn.close()
    return dict(result) if result else None


def get_available_technicians(skill_level=None):
    """Get technicians, optionally filtered by skill level."""
    conn = get_connection()
    cursor = conn.cursor()
    if skill_level:
        cursor.execute('SELECT * FROM technicians WHERE skill_level = ?', (skill_level,))
    else:
        cursor.execute('SELECT * FROM technicians ORDER BY skill_level')
    results = [dict(row) for row in cursor.fetchall()]
    conn.close()
    return results


# ═══════════════════════════════════════════════
# ENGINES
# ═══════════════════════════════════════════════

def add_engine(engine_serial, engine_model, ecm_type, vehicle_type,
               year, mileage, customer_name=None, location=None):
    conn = get_connection()
    cursor = conn.cursor()
    cursor.execute('''
        INSERT OR IGNORE INTO engines
        (engine_serial, engine_model, ecm_type, vehicle_type,
         year, mileage, customer_name, location)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    ''', (engine_serial, engine_model, ecm_type, vehicle_type,
          year, mileage, customer_name, location))
    conn.commit()
    conn.close()


def get_engine(engine_serial):
    conn = get_connection()
    cursor = conn.cursor()
    cursor.execute('SELECT * FROM engines WHERE engine_serial = ?', (engine_serial,))
    result = cursor.fetchone()
    conn.close()
    return dict(result) if result else None


# ═══════════════════════════════════════════════
# CASES (Multi-case queue)
# ═══════════════════════════════════════════════

def get_open_cases(priority=None):
    """Get all open/active cases, optionally filtered by priority."""
    conn = get_connection()
    cursor = conn.cursor()
    if priority:
        cursor.execute('''
            SELECT * FROM cases
            WHERE status IN ('open', 'in_progress', 'escalated')
              AND priority = ?
            ORDER BY priority_score DESC
        ''', (priority,))
    else:
        cursor.execute('''
            SELECT * FROM cases
            WHERE status IN ('open', 'in_progress', 'escalated')
            ORDER BY priority_score DESC
        ''')
    results = [dict(row) for row in cursor.fetchall()]
    conn.close()
    return results


def get_case(case_id=None, case_number=None):
    """Get a specific case by ID or case number."""
    conn = get_connection()
    cursor = conn.cursor()
    if case_id:
        cursor.execute('SELECT * FROM cases WHERE id = ?', (case_id,))
    elif case_number:
        cursor.execute('SELECT * FROM cases WHERE case_number = ?', (case_number,))
    else:
        conn.close()
        return None
    result = cursor.fetchone()
    conn.close()
    return dict(result) if result else None


def create_case(case_number, engine_serial, customer_name, customer_location,
                fault_codes, symptoms, customer_sla='standard',
                customer_id=None, connectivity_status='online'):
    """Create a new service case."""
    conn = get_connection()
    cursor = conn.cursor()
    cursor.execute('''
        INSERT INTO cases
        (case_number, engine_serial, customer_id, customer_name, customer_location,
         customer_sla, fault_codes, symptoms, reported_at, status,
         connectivity_status)
        VALUES (?,?,?,?,?,?,?,?,?,?,?)
    ''', (case_number, engine_serial, customer_id, customer_name, customer_location,
          customer_sla,
          json.dumps(fault_codes) if isinstance(fault_codes, list) else fault_codes,
          symptoms, datetime.now().isoformat(), 'open', connectivity_status))
    conn.commit()
    new_id = cursor.lastrowid
    conn.close()
    return new_id


def assign_case(case_id, tech_id):
    """Assign a technician to a case."""
    conn = get_connection()
    cursor = conn.cursor()
    cursor.execute('''
        UPDATE cases SET assigned_tech_id = ?, status = 'in_progress' WHERE id = ?
    ''', (tech_id, case_id))
    conn.commit()
    conn.close()


def update_case_priority(case_id, priority, priority_score,
                         safety_critical=False, fleet_impact=False, warranty_risk=False):
    """Update case priority (called by Priority Engine)."""
    conn = get_connection()
    cursor = conn.cursor()
    cursor.execute('''
        UPDATE cases
        SET priority = ?, priority_score = ?,
            safety_critical = ?, fleet_impact = ?, warranty_risk = ?
        WHERE id = ?
    ''', (priority, priority_score, safety_critical, fleet_impact, warranty_risk, case_id))
    conn.commit()
    conn.close()


def update_case_triage(case_id, triage_confidence, estimated_repair_hours):
    """Update case with triage results."""
    conn = get_connection()
    cursor = conn.cursor()
    cursor.execute('''
        UPDATE cases SET triage_confidence = ?, estimated_repair_hours = ? WHERE id = ?
    ''', (triage_confidence, estimated_repair_hours, case_id))
    conn.commit()
    conn.close()


def escalate_case(case_id):
    """Mark a case as escalated."""
    conn = get_connection()
    cursor = conn.cursor()
    cursor.execute("UPDATE cases SET status = 'escalated' WHERE id = ?", (case_id,))
    conn.commit()
    conn.close()


def resolve_case(case_id, resolution, actual_repair_hours=None):
    """Resolve a case."""
    conn = get_connection()
    cursor = conn.cursor()
    cursor.execute('''
        UPDATE cases
        SET status = 'resolved', resolution = ?,
            actual_repair_hours = ?, resolved_at = ?
        WHERE id = ?
    ''', (resolution, actual_repair_hours, datetime.now().isoformat(), case_id))
    conn.commit()
    conn.close()


def get_case_queue_summary():
    """Get summary stats for the operations dashboard."""
    conn = get_connection()
    cursor = conn.cursor()
    cursor.execute('''
        SELECT
            COUNT(*) FILTER (WHERE status IN ('open','in_progress','escalated')) as active_cases,
            COUNT(*) FILTER (WHERE status = 'escalated' AND resolved_at IS NULL) as pending_review,
            COUNT(*) FILTER (WHERE status = 'resolved' AND date(resolved_at) = date('now')) as resolved_today,
            COUNT(*) FILTER (WHERE safety_critical = 1 AND status != 'closed') as safety_critical,
            AVG(triage_confidence) FILTER (WHERE triage_confidence IS NOT NULL) as avg_confidence
        FROM cases
    ''')
    result = cursor.fetchone()
    conn.close()
    if result:
        return dict(result)
    # Fallback for older SQLite without FILTER
    return _get_case_queue_summary_compat()


def _get_case_queue_summary_compat():
    """Compatibility version for SQLite < 3.30."""
    conn = get_connection()
    cursor = conn.cursor()
    summary = {}
    cursor.execute("SELECT COUNT(*) FROM cases WHERE status IN ('open','in_progress','escalated')")
    summary['active_cases'] = cursor.fetchone()[0]
    cursor.execute("SELECT COUNT(*) FROM cases WHERE status = 'escalated'")
    summary['pending_review'] = cursor.fetchone()[0]
    cursor.execute("SELECT COUNT(*) FROM cases WHERE status = 'resolved'")
    summary['resolved_today'] = cursor.fetchone()[0]
    cursor.execute("SELECT COUNT(*) FROM cases WHERE safety_critical = 1 AND status != 'closed'")
    summary['safety_critical'] = cursor.fetchone()[0]
    cursor.execute("SELECT AVG(triage_confidence) FROM cases WHERE triage_confidence IS NOT NULL")
    summary['avg_confidence'] = cursor.fetchone()[0]
    conn.close()
    return summary


# ═══════════════════════════════════════════════
# PARTS CATALOG
# ═══════════════════════════════════════════════

def get_part(part_number):
    """Look up a part by part number."""
    conn = get_connection()
    cursor = conn.cursor()
    cursor.execute('SELECT * FROM parts_catalog WHERE part_number = ?', (part_number,))
    result = cursor.fetchone()
    conn.close()
    return dict(result) if result else None


def get_part_cost(part_number):
    """Get the cost of a part (used by Escalation Agent for threshold checks)."""
    part = get_part(part_number)
    return part['avg_cost'] if part else None


def search_parts(keyword=None, category=None):
    """Search parts catalog."""
    conn = get_connection()
    cursor = conn.cursor()
    if category:
        cursor.execute('SELECT * FROM parts_catalog WHERE category = ? ORDER BY avg_cost DESC', (category,))
    elif keyword:
        cursor.execute('SELECT * FROM parts_catalog WHERE part_name LIKE ? ORDER BY avg_cost DESC',
                       (f'%{keyword}%',))
    else:
        cursor.execute('SELECT * FROM parts_catalog ORDER BY category, avg_cost DESC')
    results = [dict(row) for row in cursor.fetchall()]
    conn.close()
    return results


def get_expensive_parts(min_cost=1000):
    """Get parts above a cost threshold (for escalation logic)."""
    conn = get_connection()
    cursor = conn.cursor()
    cursor.execute('SELECT * FROM parts_catalog WHERE avg_cost >= ? ORDER BY avg_cost DESC',
                   (min_cost,))
    results = [dict(row) for row in cursor.fetchall()]
    conn.close()
    return results


# ═══════════════════════════════════════════════
# ESCALATION RULES
# ═══════════════════════════════════════════════

def get_escalation_rules(active_only=True):
    """Get all escalation rules, ordered by priority (highest first)."""
    conn = get_connection()
    cursor = conn.cursor()
    if active_only:
        cursor.execute('SELECT * FROM escalation_rules WHERE active = 1 ORDER BY priority DESC')
    else:
        cursor.execute('SELECT * FROM escalation_rules ORDER BY priority DESC')
    results = [dict(row) for row in cursor.fetchall()]
    conn.close()
    return results


def evaluate_escalation(confidence, part_cost, safety_critical,
                        tech_skill_level, service_flags=None):
    """
    Evaluate escalation rules against a diagnosis.
    Returns the first matching rule's action: PROCEED, PROCEED_WITH_GUIDANCE, or ESCALATE.

    This is what the Escalation Agent calls.
    """
    rules = get_escalation_rules(active_only=True)

    for rule in rules:
        field = rule['condition_field']
        op = rule['operator']
        threshold = rule['threshold_value']
        action = rule['action']

        match = False

        if field == 'safety_critical' and op == '==' and str(safety_critical).lower() == threshold:
            match = True
        elif field == 'confidence' and confidence is not None:
            t = float(threshold)
            if op == '<' and confidence < t:
                match = True
            elif op == '>' and confidence > t:
                match = True
            elif op == '<=' and confidence <= t:
                match = True
            elif op == '>=' and confidence >= t:
                match = True
        elif field == 'part_cost' and part_cost is not None:
            t = float(threshold)
            if op == '>' and part_cost > t:
                match = True
        elif field == 'tech_level' and op == '==' and tech_skill_level == threshold:
            match = True
        elif field == 'service_flag' and service_flags:
            if threshold in service_flags:
                match = True
        elif field == 'default':
            match = True

        if match:
            return {
                'action': action,
                'rule_name': rule['rule_name'],
                'notes': rule['notes']
            }

    # Fallback
    return {'action': 'ESCALATE', 'rule_name': 'no_match_fallback', 'notes': 'No rule matched — escalating for safety'}











