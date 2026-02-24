"""
ServiceSync AI — Database Setup

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
            id              INTEGER PRIMARY KEY AUTOINCREMENT,
            fault_code      VARCHAR(10) NOT NULL UNIQUE,
            description     TEXT NOT NULL,
            common_in_insite BOOLEAN DEFAULT 1,
            qsol_available  BOOLEAN DEFAULT 1,
            complexity       VARCHAR(10) CHECK(complexity IN ('low', 'medium', 'high')),
            safety_critical  BOOLEAN DEFAULT 0,
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
            fault_code      VARCHAR(10),
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
            fault_code              VARCHAR(10) NOT NULL,
            tech_id                 VARCHAR(50) NOT NULL,
            tech_skill_level        VARCHAR(20),

            -- Inputs
            symptoms                TEXT,
            insite_data             TEXT,

            -- AI Analysis (Triage Agent)
            triage_diagnosis        TEXT,
            triage_confidence       REAL,
            triage_reasoning        TEXT,
            alternative_causes      TEXT,
            recommended_tests       TEXT,

            -- Service History (Service History Agent)
            recent_repairs          TEXT,
            service_history_flags   TEXT,

            -- Escalation Decision (Escalation Agent)
            escalation_decision     VARCHAR(30),
            escalation_reasoning    TEXT,
            requires_approval       BOOLEAN,

            -- Outcome (filled in after repair)
            approved_by             VARCHAR(50),
            approval_timestamp      DATETIME,
            actual_repair           TEXT,
            parts_used              TEXT,
            repair_successful       BOOLEAN,

            -- Metadata
            online_status           VARCHAR(20),
            sync_timestamp          DATETIME,
            llm_model               VARCHAR(50),
            llm_version             VARCHAR(20),

            -- Audit
            created_at              DATETIME DEFAULT CURRENT_TIMESTAMP,
            updated_at              DATETIME DEFAULT CURRENT_TIMESTAMP
        )
    ''')

    # ──────────────────────────────────────────────
    # INDEXES — make searches faster
    # ──────────────────────────────────────────────
    cursor.execute('CREATE INDEX IF NOT EXISTS idx_decision_engine ON decision_logs(engine_serial)')
    cursor.execute('CREATE INDEX IF NOT EXISTS idx_decision_fault ON decision_logs(fault_code)')
    cursor.execute('CREATE INDEX IF NOT EXISTS idx_decision_tech ON decision_logs(tech_id)')
    cursor.execute('CREATE INDEX IF NOT EXISTS idx_decision_time ON decision_logs(timestamp)')
    cursor.execute('CREATE INDEX IF NOT EXISTS idx_service_engine ON service_history(engine_serial)')
    cursor.execute('CREATE INDEX IF NOT EXISTS idx_service_date ON service_history(service_date)')

    conn.commit()
    conn.close()

    print(f"✅ Database created at: {os.path.abspath(DB_PATH)}")
    print("✅ All 7 tables created successfully!")
    print("")
    print("Tables:")
    print("  1. fault_codes        — Known Cummins fault codes")
    print("  2. typical_causes     — Common causes per fault code")
    print("  3. edge_cases         — Where AI adds value over QSOL")
    print("  4. engines            — Engine inventory")
    print("  5. technicians        — Tech roster")
    print("  6. service_history    — Past repairs per engine")
    print("  7. decision_logs      — AI diagnosis audit trail")


if __name__ == '__main__':
    create_database()