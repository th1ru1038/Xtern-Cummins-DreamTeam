"""
ServiceSync AI — Database Setup
Creates all tables for the ServiceSync AI system.

Tables:
  1. fault_codes        — Known Cummins fault codes (SPN/FMI, OBD-II, PID/SID)
  2. typical_causes     — Common causes per fault code (normalized)
  3. edge_cases         — Scenarios where AI adds value over QSOL
  4. engines            — Engine inventory with serial numbers
  5. technicians        — Field tech roster with skill levels
  6. service_history    — Past repairs per engine
  7. decision_logs      — AI diagnosis audit trail (required deliverable)
  8. cases              — Open/closed service cases for multi-case queue
  9. parts_catalog      — Replacement parts with costs (escalation thresholds)
 10. escalation_rules   — Configurable rules for the Escalation Agent

Usage:
    python setup_db.py          # Creates empty tables
    python seed_data.py         # Fills tables with synthetic data
"""

import sqlite3
import os

DB_PATH = os.path.join(os.path.dirname(__file__), '..', 'servicesync.db')


def create_database():
    """Creates all tables for ServiceSync AI."""

    conn = sqlite3.connect(DB_PATH)
    cursor = conn.cursor()

    # ──────────────────────────────────────────────
    # TABLE 1: fault_codes
    # Stores all known Cummins fault codes and their info
    # ──────────────────────────────────────────────
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS fault_codes (
            id               INTEGER PRIMARY KEY AUTOINCREMENT,
            cummins_code     INTEGER,
            spn              INTEGER,
            fmi              INTEGER,
            obd2_code        VARCHAR(10),
            pid_sid          VARCHAR(20),
            description      TEXT NOT NULL,
            system_category  VARCHAR(50),
            complexity       VARCHAR(10) CHECK(complexity IN ('low', 'medium', 'high')),
            safety_critical  BOOLEAN DEFAULT 0,
            causes_derate    BOOLEAN DEFAULT 0,
            qsol_procedure   VARCHAR(50),
            applies_to       VARCHAR(100) DEFAULT 'all',
            created_at       DATETIME DEFAULT CURRENT_TIMESTAMP
        )
    ''')

    # ──────────────────────────────────────────────
    # TABLE 2: typical_causes
    # Each fault code can have multiple typical causes
    # ──────────────────────────────────────────────
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS typical_causes (
            id              INTEGER PRIMARY KEY AUTOINCREMENT,
            fault_code_id   INTEGER NOT NULL,
            cause           TEXT NOT NULL,
            probability     FLOAT,
            FOREIGN KEY (fault_code_id) REFERENCES fault_codes(id)
        )
    ''')

    # ──────────────────────────────────────────────
    # TABLE 3: edge_cases
    # Scenarios where QSOL falls short and AI adds value
    # ──────────────────────────────────────────────
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS edge_cases (
            id              INTEGER PRIMARY KEY AUTOINCREMENT,
            fault_code_id   INTEGER NOT NULL,
            scenario        TEXT NOT NULL,
            likely_cause    TEXT NOT NULL,
            ai_value_add    TEXT NOT NULL,
            FOREIGN KEY (fault_code_id) REFERENCES fault_codes(id)
        )
    ''')

    # ──────────────────────────────────────────────
    # TABLE 4: engines
    # Stores engine information
    # ──────────────────────────────────────────────
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS engines (
            id              INTEGER PRIMARY KEY AUTOINCREMENT,
            engine_serial   VARCHAR(50) NOT NULL UNIQUE,
            engine_model    VARCHAR(50),
            ecm_type        VARCHAR(20),
            vehicle_type    VARCHAR(20) CHECK(vehicle_type IN ('heavy_duty', 'medium_duty', 'light_duty')),
            year            INTEGER,
            mileage         INTEGER,
            customer_name   VARCHAR(100),
            location        VARCHAR(200),
            created_at      DATETIME DEFAULT CURRENT_TIMESTAMP
        )
    ''')

    # ──────────────────────────────────────────────
    # TABLE 5: technicians
    # Stores technician information
    # ──────────────────────────────────────────────
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS technicians (
            id              INTEGER PRIMARY KEY AUTOINCREMENT,
            tech_id         VARCHAR(50) NOT NULL UNIQUE,
            name            VARCHAR(100) NOT NULL,
            skill_level     VARCHAR(20) CHECK(skill_level IN ('junior', 'intermediate', 'senior')),
            email           VARCHAR(100),
            phone           VARCHAR(20),
            created_at      DATETIME DEFAULT CURRENT_TIMESTAMP
        )
    ''')

    # ──────────────────────────────────────────────
    # TABLE 6: service_history
    # Past repairs on each engine
    # ──────────────────────────────────────────────
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS service_history (
            id              INTEGER PRIMARY KEY AUTOINCREMENT,
            engine_serial   VARCHAR(50) NOT NULL,
            service_date    DATE NOT NULL,
            fault_code_input VARCHAR(30),
            repair_type     TEXT NOT NULL,
            parts_replaced  TEXT,
            part_cost       REAL DEFAULT 0,
            technician_id   VARCHAR(50),
            technician_notes TEXT,
            warranty_status VARCHAR(20) DEFAULT 'none',
            created_at      DATETIME DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (engine_serial) REFERENCES engines(engine_serial)
        )
    ''')

    # ──────────────────────────────────────────────
    # TABLE 7: decision_logs (THE BIG ONE)
    # Logs every AI-assisted diagnosis for audit trail
    # ──────────────────────────────────────────────
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS decision_logs (
            id                      INTEGER PRIMARY KEY AUTOINCREMENT,
            timestamp               DATETIME NOT NULL,

            -- Context
            engine_serial           VARCHAR(50) NOT NULL,
            fault_code_input        VARCHAR(30) NOT NULL,
            fault_code_id           INTEGER,
            tech_id                 VARCHAR(50) NOT NULL,
            tech_skill_level        VARCHAR(20),

            -- Case reference
            case_id                 INTEGER,

            -- Inputs
            symptoms                TEXT,
            insite_data             TEXT,
            environment             TEXT,

            -- AI Analysis (Triage Agent)
            triage_diagnosis        TEXT,
            triage_confidence       REAL,
            triage_reasoning        TEXT,
            alternative_causes      TEXT,
            recommended_tests       TEXT,

            -- Service History (Service History Agent)
            recent_repairs          TEXT,
            service_history_flags   TEXT,
            warranty_status         TEXT,

            -- Escalation Decision (Escalation Agent)
            escalation_decision     VARCHAR(30),
            escalation_reasoning    TEXT,
            requires_approval       BOOLEAN,
            guidance_notes          TEXT,

            -- Outcome (filled in after repair)
            approved_by             VARCHAR(50),
            approval_timestamp      DATETIME,
            actual_repair           TEXT,
            parts_used              TEXT,
            repair_successful       BOOLEAN,
            repair_duration_hours   REAL,

            -- Metadata
            online_status           VARCHAR(20),
            sync_timestamp          DATETIME,
            llm_model               VARCHAR(50),
            llm_version             VARCHAR(20),

            -- Audit
            created_at              DATETIME DEFAULT CURRENT_TIMESTAMP,
            updated_at              DATETIME DEFAULT CURRENT_TIMESTAMP,

            FOREIGN KEY (fault_code_id) REFERENCES fault_codes(id),
            FOREIGN KEY (case_id) REFERENCES cases(id)
        )
    ''')

    # ──────────────────────────────────────────────
    # TABLE 8: cases
    # Service cases for multi-case queue and priority engine
    # ──────────────────────────────────────────────
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS cases (
            id                  INTEGER PRIMARY KEY AUTOINCREMENT,
            case_number         VARCHAR(30) NOT NULL UNIQUE,
            engine_serial       VARCHAR(50) NOT NULL,
            customer_id         VARCHAR(50),
            customer_name       VARCHAR(100),
            customer_location   TEXT,
            customer_sla        VARCHAR(20) DEFAULT 'standard',
            fault_codes         TEXT,
            symptoms            TEXT,
            reported_at         DATETIME NOT NULL,
            status              VARCHAR(20) DEFAULT 'open',
            priority            VARCHAR(5),
            priority_score      REAL,
            assigned_tech_id    VARCHAR(50),
            safety_critical     BOOLEAN DEFAULT 0,
            fleet_impact        BOOLEAN DEFAULT 0,
            warranty_risk       BOOLEAN DEFAULT 0,
            connectivity_status VARCHAR(20) DEFAULT 'online',
            triage_confidence   REAL,
            estimated_repair_hours REAL,
            actual_repair_hours REAL,
            resolution          TEXT,
            resolved_at         DATETIME,
            created_at          DATETIME DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (engine_serial) REFERENCES engines(engine_serial),
            FOREIGN KEY (assigned_tech_id) REFERENCES technicians(tech_id)
        )
    ''')

    # ──────────────────────────────────────────────
    # TABLE 9: parts_catalog
    # Replacement parts with costs.
    # Escalation Agent checks: part_cost > $1000 → needs senior approval
    # ──────────────────────────────────────────────
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS parts_catalog (
            id                  INTEGER PRIMARY KEY AUTOINCREMENT,
            part_number         VARCHAR(50) NOT NULL UNIQUE,
            part_name           VARCHAR(200) NOT NULL,
            category            VARCHAR(50),
            compatible_engines  TEXT,
            avg_cost            REAL,
            warranty_period_days INTEGER DEFAULT 90,
            safety_critical     BOOLEAN DEFAULT 0,
            in_stock            BOOLEAN DEFAULT 1,
            lead_time_days      INTEGER DEFAULT 0,
            created_at          DATETIME DEFAULT CURRENT_TIMESTAMP
        )
    ''')

    # ──────────────────────────────────────────────
    # TABLE 10: escalation_rules
    # Configurable rules for the Escalation Agent
    # ──────────────────────────────────────────────
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS escalation_rules (
            id                  INTEGER PRIMARY KEY AUTOINCREMENT,
            rule_name           VARCHAR(100) NOT NULL,
            condition_field     VARCHAR(50) NOT NULL,
            operator            VARCHAR(10) NOT NULL,
            threshold_value     VARCHAR(50) NOT NULL,
            action              VARCHAR(30) NOT NULL,
            priority            INTEGER DEFAULT 0,
            active              BOOLEAN DEFAULT 1,
            notes               TEXT
        )
    ''')

    # ──────────────────────────────────────────────
    # INDEXES
    # ──────────────────────────────────────────────
    cursor.execute('CREATE INDEX IF NOT EXISTS idx_fault_spn_fmi ON fault_codes(spn, fmi)')
    cursor.execute('CREATE INDEX IF NOT EXISTS idx_fault_obd2 ON fault_codes(obd2_code)')
    cursor.execute('CREATE INDEX IF NOT EXISTS idx_fault_cummins ON fault_codes(cummins_code)')
    cursor.execute('CREATE INDEX IF NOT EXISTS idx_fault_pid_sid ON fault_codes(pid_sid)')
    cursor.execute('CREATE INDEX IF NOT EXISTS idx_decision_engine ON decision_logs(engine_serial)')
    cursor.execute('CREATE INDEX IF NOT EXISTS idx_decision_tech ON decision_logs(tech_id)')
    cursor.execute('CREATE INDEX IF NOT EXISTS idx_decision_time ON decision_logs(timestamp)')
    cursor.execute('CREATE INDEX IF NOT EXISTS idx_decision_case ON decision_logs(case_id)')
    cursor.execute('CREATE INDEX IF NOT EXISTS idx_service_engine ON service_history(engine_serial)')
    cursor.execute('CREATE INDEX IF NOT EXISTS idx_service_date ON service_history(service_date)')
    cursor.execute('CREATE INDEX IF NOT EXISTS idx_cases_status ON cases(status)')
    cursor.execute('CREATE INDEX IF NOT EXISTS idx_cases_priority ON cases(priority)')
    cursor.execute('CREATE INDEX IF NOT EXISTS idx_cases_tech ON cases(assigned_tech_id)')
    cursor.execute('CREATE INDEX IF NOT EXISTS idx_parts_number ON parts_catalog(part_number)')

    conn.commit()
    conn.close()

    print(f"Database created at: {os.path.abspath(DB_PATH)}")
    print("All 10 tables created successfully!")
    print("")
    print("Tables:")
    print("  1. fault_codes        — Known Cummins fault codes")
    print("  2. typical_causes     — Common causes per fault code")
    print("  3. edge_cases         — Where AI adds value over QSOL")
    print("  4. engines            — Engine inventory")
    print("  5. technicians        — Tech roster")
    print("  6. service_history    — Past repairs per engine")
    print("  7. decision_logs      — AI diagnosis audit trail")
    print("  8. cases              — Service case queue (multi-case)")
    print("  9. parts_catalog      — Parts with costs (escalation)")
    print(" 10. escalation_rules   — Configurable escalation logic")
    print("")
    print("Run 'python seed_data.py' to populate with synthetic data.")


if __name__ == '__main__':
    create_database()