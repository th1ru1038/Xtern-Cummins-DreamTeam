"""
ServiceSync AI — Database Models
Easy-to-use functions for reading and writing to the database.
"""

import sqlite3
import os
import json
from datetime import datetime

DB_PATH = os.path.join(os.path.dirname(__file__), '..', 'servicesync.db')


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
        # Normalize to "SID 27" or "PID 157" format for database lookup
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
                 alternative_causes=None, recommended_tests=None,
                 recent_repairs=None, service_history_flags=None,
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
         tech_id, tech_skill_level,
         symptoms, insite_data, triage_diagnosis, triage_confidence,
         triage_reasoning, alternative_causes, recommended_tests,
         recent_repairs, service_history_flags, escalation_decision,
         escalation_reasoning, requires_approval, online_status,
         llm_model, llm_version)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    ''', (
        datetime.now().isoformat(),
        engine_serial, fault_code_input, fault_code_id,
        tech_id, tech_skill_level,
        symptoms,
        json.dumps(insite_data) if insite_data else None,
        triage_diagnosis, triage_confidence, triage_reasoning,
        json.dumps(alternative_causes) if alternative_causes else None,
        json.dumps(recommended_tests) if recommended_tests else None,
        json.dumps(recent_repairs) if recent_repairs else None,
        json.dumps(service_history_flags) if service_history_flags else None,
        escalation_decision, escalation_reasoning, requires_approval,
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


def record_outcome(decision_id, actual_repair, parts_used, repair_successful):
    """Record the actual outcome after repair is done."""
    conn = get_connection()
    cursor = conn.cursor()
    cursor.execute('''
        UPDATE decision_logs
        SET actual_repair = ?,
            parts_used = ?,
            repair_successful = ?,
            updated_at = ?
        WHERE id = ?
    ''', (actual_repair, json.dumps(parts_used), repair_successful,
          datetime.now().isoformat(), decision_id))
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