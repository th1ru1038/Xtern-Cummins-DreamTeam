"""
ServiceSync AI — Synthetic Data Seeder
=======================================
Populates the database with realistic synthetic data for demo and development.

Run AFTER setup_db.py:
    python setup_db.py      # Create tables
    python seed_data.py     # Fill with data

All data is synthetic — no real PII or Cummins proprietary data.
Fault codes use real SPN/FMI format but descriptions are synthesized.
"""

import sqlite3
import json
import os
from datetime import datetime, timedelta

DB_PATH = os.path.join(os.path.dirname(__file__), '..', 'servicesync.db')


def get_connection():
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    return conn


# ═══════════════════════════════════════════════════════════════
# FAULT CODES + TYPICAL CAUSES + EDGE CASES
# ═══════════════════════════════════════════════════════════════

FAULT_CODES = [
    # --- CRITICAL SEVERITY ---
    {
        "cummins_code": 111,
        "spn": 100, "fmi": 1,
        "obd2_code": "P0192",
        "pid_sid": "PID 100",
        "description": "Engine Oil Pressure Low — Data Valid But Below Normal Range",
        "system_category": "lubrication",
        "complexity": "high",
        "safety_critical": True,
        "causes_derate": True,
        "qsol_procedure": "TS-OIL-001",
        "applies_to": "X15,ISX15,B6.7,L9",
        "typical_causes": [
            ("Low oil level", 0.30),
            ("Oil pump failure", 0.20),
            ("Oil pressure sensor malfunction", 0.20),
            ("Worn main/rod bearings", 0.15),
            ("Oil filter blockage", 0.15),
        ],
        "edge_cases": [{
            "scenario": "Oil just changed within last 500 miles",
            "likely_cause": "Wrong oil viscosity or oil filter not seated properly",
            "ai_value_add": "QSOL checks pump first; AI flags recent oil change as likely root cause"
        }]
    },
    {
        "cummins_code": 151,
        "spn": 110, "fmi": 0,
        "obd2_code": "P0217",
        "pid_sid": "PID 110",
        "description": "Engine Coolant Temperature High — Data Above Normal Range",
        "system_category": "cooling",
        "complexity": "medium",
        "safety_critical": True,
        "causes_derate": True,
        "qsol_procedure": "TS-COOL-001",
        "applies_to": "X15,ISX15,B6.7,L9,QSB6.7",
        "typical_causes": [
            ("Thermostat stuck closed", 0.25),
            ("Water pump failure", 0.20),
            ("Radiator blockage or damage", 0.20),
            ("Coolant leak", 0.15),
            ("Fan clutch failure", 0.10),
            ("Low coolant level", 0.10),
        ],
        "edge_cases": [{
            "scenario": "Thermostat replaced within last month",
            "likely_cause": "Wrong thermostat rating installed or air pocket trapped after service",
            "ai_value_add": "QSOL starts with radiator inspection; AI checks recent thermostat work first"
        }]
    },
    {
        "cummins_code": 157,
        "spn": 157, "fmi": 0,
        "obd2_code": "P0093",
        "pid_sid": None,
        "description": "Fuel Rail Pressure High — Data Above Normal Range",
        "system_category": "fuel",
        "complexity": "high",
        "safety_critical": True,
        "causes_derate": True,
        "qsol_procedure": "TS-FUEL-003",
        "applies_to": "X15,ISX15",
        "typical_causes": [
            ("Fuel pressure relief valve stuck closed", 0.30),
            ("Fuel pressure sensor malfunction", 0.25),
            ("High pressure pump internal failure", 0.25),
            ("Injector return line blockage", 0.20),
        ],
        "edge_cases": [{
            "scenario": "Injectors recently replaced",
            "likely_cause": "Wrong injector trim codes entered in ECM or return line not connected properly",
            "ai_value_add": "AI checks for recent injector work before starting pump diagnostics"
        }]
    },
    {
        "cummins_code": 143,
        "spn": 190, "fmi": 0,
        "obd2_code": "P0219",
        "pid_sid": "PID 190",
        "description": "Engine Overspeed — Data Above Normal Range",
        "system_category": "engine_control",
        "complexity": "medium",
        "safety_critical": True,
        "causes_derate": False,
        "qsol_procedure": "TS-SPD-001",
        "applies_to": "X15,ISX15,B6.7,L9",
        "typical_causes": [
            ("Vehicle driven downhill in too low a gear", 0.35),
            ("Engine speed sensor intermittent signal", 0.25),
            ("ECM calibration issue", 0.20),
            ("Turbo overspin causing runaway condition", 0.20),
        ],
        "edge_cases": [{
            "scenario": "Code logged during PTO operation",
            "likely_cause": "PTO speed setting misconfigured, not actual overspeed event",
            "ai_value_add": "AI checks if PTO was active when code set; QSOL doesn't check PTO context"
        }]
    },
    {
        "cummins_code": 3597,
        "spn": 3597, "fmi": 15,
        "obd2_code": None,
        "pid_sid": None,
        "description": "Engine Protection Torque Derate — High Severity",
        "system_category": "engine_protection",
        "complexity": "high",
        "safety_critical": True,
        "causes_derate": True,
        "qsol_procedure": "TS-PROT-001",
        "applies_to": "X15,ISX15,B6.7",
        "typical_causes": [
            ("Active high-severity fault triggering protection", 0.40),
            ("Coolant temperature critically high", 0.20),
            ("Oil pressure critically low", 0.20),
            ("Aftertreatment critical fault active", 0.20),
        ],
        "edge_cases": [{
            "scenario": "No other active codes visible to technician",
            "likely_cause": "Inactive code still triggering protection; check inactive code list in INSITE",
            "ai_value_add": "AI checks both active AND inactive codes; junior techs often miss the inactive list"
        }]
    },
    {
        "cummins_code": 1569,
        "spn": 1569, "fmi": 31,
        "obd2_code": None,
        "pid_sid": None,
        "description": "Engine Protection Lamp Command — Stop Engine Light On",
        "system_category": "engine_protection",
        "complexity": "high",
        "safety_critical": True,
        "causes_derate": True,
        "qsol_procedure": "TS-PROT-002",
        "applies_to": "X15,ISX15,B6.7,L9",
        "typical_causes": [
            ("Critical fault active requiring engine shutdown", 0.40),
            ("Low oil pressure triggered protection", 0.25),
            ("High coolant temperature triggered protection", 0.20),
            ("Intermittent code triggered lamp but went inactive", 0.15),
        ],
        "edge_cases": [{
            "scenario": "Lamp on but no other active codes found",
            "likely_cause": "Intermittent code triggered lamp then went inactive; check event log timeline",
            "ai_value_add": "AI reviews complete INSITE event log, not just current active codes"
        }]
    },
    {
        "cummins_code": 84,
        "spn": 84, "fmi": 2,
        "obd2_code": "P0500",
        "pid_sid": "PID 84",
        "description": "Vehicle Speed Sensor — Data Erratic or Intermittent",
        "system_category": "drivetrain",
        "complexity": "medium",
        "safety_critical": True,
        "causes_derate": False,
        "qsol_procedure": "TS-VSS-001",
        "applies_to": "X15,B6.7,L9",
        "typical_causes": [
            ("Speed sensor air gap too large", 0.30),
            ("Sensor wiring damage or chafing", 0.25),
            ("Tone ring cracked or damaged", 0.25),
            ("ABS module communication issue", 0.20),
        ],
        "edge_cases": [{
            "scenario": "Code only occurs above 60 mph",
            "likely_cause": "Tone ring cracked at one spot, only detectable at high rotational speed",
            "ai_value_add": "AI correlates speed data with code occurrence timing in INSITE"
        }]
    },

    # --- HIGH SEVERITY ---
    {
        "cummins_code": 102,
        "spn": 102, "fmi": 0,
        "obd2_code": "P0234",
        "pid_sid": None,
        "description": "Turbocharger Boost Pressure — Data Above Normal Range (Overboost)",
        "system_category": "air_intake",
        "complexity": "high",
        "safety_critical": False,
        "causes_derate": True,
        "qsol_procedure": "TS-TURBO-001",
        "applies_to": "X15,ISX15,QSX15",
        "typical_causes": [
            ("Turbo actuator stuck closed", 0.30),
            ("Wastegate malfunction", 0.25),
            ("Boost pressure sensor error", 0.25),
            ("Charge air cooler restriction", 0.20),
        ],
        "edge_cases": [{
            "scenario": "High altitude operation above 8000 ft",
            "likely_cause": "Altitude compensation not calibrated; sensor reading may be accurate for altitude",
            "ai_value_add": "QSOL doesn't factor altitude; AI checks GPS/location context"
        }]
    },
    {
        "cummins_code": 103,
        "spn": 102, "fmi": 1,
        "obd2_code": "P0299",
        "pid_sid": None,
        "description": "Turbocharger Boost Pressure Low — Underboost Condition",
        "system_category": "air_intake",
        "complexity": "high",
        "safety_critical": False,
        "causes_derate": True,
        "qsol_procedure": "TS-TURBO-002",
        "applies_to": "X15,ISX15,B6.7",
        "typical_causes": [
            ("Turbocharger actuator failure", 0.25),
            ("Exhaust leak before turbo", 0.20),
            ("Intake air leak after compressor", 0.20),
            ("Clogged air filter", 0.20),
            ("VGT vanes sticking with carbon", 0.15),
        ],
        "edge_cases": [{
            "scenario": "Air filter replaced within last week",
            "likely_cause": "Wrong filter size or not fully seated causing unfiltered air bypass",
            "ai_value_add": "AI checks service history for recent filter work before expensive turbo diagnosis"
        }]
    },
    {
        "cummins_code": 94,
        "spn": 94, "fmi": 1,
        "obd2_code": "P0087",
        "pid_sid": "PID 94",
        "description": "Fuel Delivery Pressure Low — Fuel Rail Pressure Below Normal",
        "system_category": "fuel",
        "complexity": "high",
        "safety_critical": False,
        "causes_derate": True,
        "qsol_procedure": "TS-FUEL-001",
        "applies_to": "X15,ISX15,B6.7,L9",
        "typical_causes": [
            ("Fuel filter restriction", 0.25),
            ("Fuel supply pump failure", 0.20),
            ("Fuel pressure regulator issue", 0.20),
            ("Air in fuel system", 0.20),
            ("Fuel leak in supply line", 0.15),
        ],
        "edge_cases": [{
            "scenario": "Fuel filter just replaced",
            "likely_cause": "Air in fuel system from filter change or wrong filter part number used",
            "ai_value_add": "AI suggests bleeding fuel system first instead of replacing pump"
        }]
    },
    {
        "cummins_code": 3936,
        "spn": 3936, "fmi": 21,
        "obd2_code": None,
        "pid_sid": None,
        "description": "Aftertreatment SCR Catalyst Conversion Efficiency Low",
        "system_category": "aftertreatment",
        "complexity": "high",
        "safety_critical": False,
        "causes_derate": True,
        "qsol_procedure": "TS-SCR-001",
        "applies_to": "X15,ISX15,B6.7,L9",
        "typical_causes": [
            ("DEF quality issue (contaminated or old)", 0.25),
            ("DEF dosing valve failure", 0.20),
            ("SCR catalyst degradation", 0.20),
            ("DEF supply module failure", 0.20),
            ("Exhaust temperature too low for SCR", 0.15),
        ],
        "edge_cases": [{
            "scenario": "DEF tank just refilled",
            "likely_cause": "Contaminated DEF or wrong fluid added to DEF tank (e.g., washer fluid)",
            "ai_value_add": "AI asks about recent DEF fill before recommending expensive catalyst replacement"
        }]
    },
    {
        "cummins_code": 3251,
        "spn": 3251, "fmi": 0,
        "obd2_code": None,
        "pid_sid": None,
        "description": "Aftertreatment DPF Soot Load High — Regeneration Needed",
        "system_category": "aftertreatment",
        "complexity": "medium",
        "safety_critical": False,
        "causes_derate": True,
        "qsol_procedure": "TS-DPF-001",
        "applies_to": "X15,ISX15,B6.7,L9",
        "typical_causes": [
            ("Excessive idle time preventing passive regen", 0.30),
            ("Failed regen due to low exhaust temperature", 0.20),
            ("DPF differential pressure sensor fault", 0.20),
            ("Turbo underperformance reducing exhaust temp", 0.15),
            ("Injector issue causing incomplete combustion", 0.15),
        ],
        "edge_cases": [{
            "scenario": "Multiple failed regen attempts in INSITE logs",
            "likely_cause": "Underlying issue preventing regen (7th injector or exhaust temps), not the DPF itself",
            "ai_value_add": "QSOL says force regen; AI checks regen history and looks for root cause first"
        }]
    },
    {
        "cummins_code": 5246,
        "spn": 5246, "fmi": 0,
        "obd2_code": None,
        "pid_sid": None,
        "description": "Aftertreatment SCR Operator Inducement — Engine Power Derate Active",
        "system_category": "aftertreatment",
        "complexity": "high",
        "safety_critical": False,
        "causes_derate": True,
        "qsol_procedure": "TS-SCR-003",
        "applies_to": "X15,ISX15,B6.7,L9",
        "typical_causes": [
            ("DEF quality failure (wrong fluid or contaminated)", 0.30),
            ("DEF level critically low", 0.25),
            ("SCR catalyst efficiency below threshold", 0.20),
            ("Multiple unreset aftertreatment codes", 0.15),
            ("DEF system tampering detected", 0.10),
        ],
        "edge_cases": [{
            "scenario": "Derate occurred right after DEF tank was overfilled",
            "likely_cause": "Overfilling caused DEF level sensor reading error; drain to proper level and reset",
            "ai_value_add": "QSOL focuses on DEF quality testing; AI asks about recent fill and overfill possibility"
        }]
    },
    {
        "cummins_code": 651,
        "spn": 651, "fmi": 5,
        "obd2_code": "P0201",
        "pid_sid": None,
        "description": "Injector Cylinder 1 — Current Below Normal (Open Circuit)",
        "system_category": "fuel",
        "complexity": "high",
        "safety_critical": False,
        "causes_derate": False,
        "qsol_procedure": "TS-INJ-001",
        "applies_to": "X15,ISX15,B6.7",
        "typical_causes": [
            ("Injector solenoid failure", 0.30),
            ("Open circuit in injector wiring", 0.25),
            ("ECM driver failure", 0.20),
            ("Corroded injector connector", 0.25),
        ],
        "edge_cases": [{
            "scenario": "Code appears on multiple cylinders simultaneously",
            "likely_cause": "ECM power supply issue or common connector problem, not individual injectors",
            "ai_value_add": "AI detects multi-cylinder pattern suggesting ECM/wiring rather than injector failures"
        }]
    },
    {
        "cummins_code": 520375,
        "spn": 520375, "fmi": 18,
        "obd2_code": None,
        "pid_sid": None,
        "description": "Aftertreatment DEF Pump Speed Low — Not Reaching Commanded Speed",
        "system_category": "aftertreatment",
        "complexity": "medium",
        "safety_critical": False,
        "causes_derate": True,
        "qsol_procedure": "TS-DEF-002",
        "applies_to": "X15,B6.7,L9",
        "typical_causes": [
            ("DEF pump motor wear", 0.25),
            ("Crystallized DEF in pump from sitting", 0.25),
            ("Low voltage supply to pump", 0.25),
            ("DEF supply line restriction", 0.25),
        ],
        "edge_cases": [{
            "scenario": "Vehicle sat unused for 30+ days",
            "likely_cause": "DEF crystallized in pump and lines from sitting; flush system before replacing pump",
            "ai_value_add": "AI checks vehicle idle/downtime history before recommending pump replacement"
        }]
    },
    {
        "cummins_code": 4364,
        "spn": 4364, "fmi": 18,
        "obd2_code": None,
        "pid_sid": None,
        "description": "Aftertreatment DEF Dosing Valve — Mechanical Fault",
        "system_category": "aftertreatment",
        "complexity": "medium",
        "safety_critical": False,
        "causes_derate": True,
        "qsol_procedure": "TS-DEF-003",
        "applies_to": "X15,B6.7,L9",
        "typical_causes": [
            ("DEF crystallization blocking valve", 0.30),
            ("Dosing valve solenoid failure", 0.25),
            ("DEF contamination", 0.25),
            ("Valve seat wear from high mileage", 0.20),
        ],
        "edge_cases": [{
            "scenario": "Vehicle operates in cold climate below 20°F regularly",
            "likely_cause": "DEF freezing in dosing valve despite heater; check DEF heater circuit first",
            "ai_value_add": "AI checks ambient temp history and DEF heater operation before valve replacement"
        }]
    },
    {
        "cummins_code": 2659,
        "spn": 2659, "fmi": 0,
        "obd2_code": None,
        "pid_sid": None,
        "description": "Exhaust Backpressure Too High",
        "system_category": "aftertreatment",
        "complexity": "medium",
        "safety_critical": False,
        "causes_derate": True,
        "qsol_procedure": "TS-EXH-001",
        "applies_to": "X15,B6.7",
        "typical_causes": [
            ("DPF heavily loaded with soot/ash", 0.35),
            ("Aftertreatment module physically damaged", 0.25),
            ("Exhaust pipe restriction or collapse", 0.20),
            ("DPF pressure sensor tube blocked", 0.20),
        ],
        "edge_cases": [{
            "scenario": "DPF was recently cleaned/serviced",
            "likely_cause": "DPF not reinstalled correctly or gasket leak causing sensor misread",
            "ai_value_add": "AI checks recent DPF service before recommending replacement"
        }]
    },

    # --- MEDIUM SEVERITY ---
    {
        "cummins_code": 112,
        "spn": 111, "fmi": 3,
        "obd2_code": "P0237",
        "pid_sid": "PID 111",
        "description": "Engine Coolant Level Sensor — Voltage Above Normal",
        "system_category": "cooling",
        "complexity": "low",
        "safety_critical": False,
        "causes_derate": False,
        "qsol_procedure": "TS-COOL-002",
        "applies_to": "X15,ISX15,QSX15",
        "typical_causes": [
            ("Coolant level sensor failure", 0.30),
            ("Wiring harness damage near sensor", 0.25),
            ("Actual low coolant level", 0.25),
            ("Corroded connector pins", 0.20),
        ],
        "edge_cases": [{
            "scenario": "Coolant system recently serviced or flushed",
            "likely_cause": "Air pocket in cooling system or sensor connector not reconnected",
            "ai_value_add": "QSOL assumes sensor failure; AI checks recent cooling system service first"
        }]
    },
    {
        "cummins_code": 153,
        "spn": 110, "fmi": 3,
        "obd2_code": "P0118",
        "pid_sid": "PID 110",
        "description": "Engine Coolant Temperature Sensor — Voltage Above Normal (Open Circuit)",
        "system_category": "cooling",
        "complexity": "low",
        "safety_critical": False,
        "causes_derate": False,
        "qsol_procedure": "TS-COOL-003",
        "applies_to": "X15,B6.7,L9,QSB6.7",
        "typical_causes": [
            ("Open circuit in sensor wiring", 0.30),
            ("Coolant temperature sensor failure", 0.30),
            ("Corroded connector", 0.20),
            ("ECM pin damage", 0.20),
        ],
        "edge_cases": [{
            "scenario": "Multiple sensor codes appearing at the same time",
            "likely_cause": "Common ground wire issue or ECM connector problem, not individual sensors",
            "ai_value_add": "QSOL treats each code separately; AI detects shared-ground pattern"
        }]
    },
    {
        "cummins_code": 154,
        "spn": 110, "fmi": 4,
        "obd2_code": "P0117",
        "pid_sid": None,
        "description": "Engine Coolant Temperature Sensor — Voltage Below Normal (Short Circuit)",
        "system_category": "cooling",
        "complexity": "low",
        "safety_critical": False,
        "causes_derate": False,
        "qsol_procedure": "TS-COOL-004",
        "applies_to": "X15,B6.7,L9",
        "typical_causes": [
            ("Short to ground in sensor wiring", 0.30),
            ("Sensor internal failure", 0.25),
            ("Damaged wiring harness near exhaust", 0.25),
            ("Water intrusion in connector", 0.20),
        ],
        "edge_cases": [{
            "scenario": "Code appears only in cold weather below 0°F",
            "likely_cause": "Moisture in connector freezing and causing intermittent short",
            "ai_value_add": "AI factors weather/ambient temperature context into diagnosis"
        }]
    },
    {
        "cummins_code": 3364,
        "spn": 3364, "fmi": 2,
        "obd2_code": None,
        "pid_sid": None,
        "description": "EGR Valve Position Error — Data Erratic or Intermittent",
        "system_category": "egr",
        "complexity": "medium",
        "safety_critical": False,
        "causes_derate": False,
        "qsol_procedure": "TS-EGR-001",
        "applies_to": "X15,ISX15,B6.7",
        "typical_causes": [
            ("Carbon buildup on EGR valve", 0.35),
            ("EGR actuator wear", 0.25),
            ("Wiring harness chafing", 0.20),
            ("EGR cooler leak affecting valve operation", 0.20),
        ],
        "edge_cases": [{
            "scenario": "Code intermittent, only appears at cold start",
            "likely_cause": "Carbon buildup restricts valve at cold temps, clears when engine warms up",
            "ai_value_add": "AI correlates code frequency with coolant temperature data from INSITE"
        }]
    },
    {
        "cummins_code": 641,
        "spn": 641, "fmi": 14,
        "obd2_code": None,
        "pid_sid": None,
        "description": "VGT Actuator — Special Instructions (Calibration Required)",
        "system_category": "air_intake",
        "complexity": "medium",
        "safety_critical": False,
        "causes_derate": False,
        "qsol_procedure": "TS-VGT-001",
        "applies_to": "X15,ISX15",
        "typical_causes": [
            ("VGT actuator out of calibration", 0.30),
            ("Actuator motor wear", 0.25),
            ("Carbon buildup on turbine vanes", 0.25),
            ("Actuator position sensor drift", 0.20),
        ],
        "edge_cases": [{
            "scenario": "Code appears right after ECM reflash/update",
            "likely_cause": "VGT needs recalibration after ECM update, not physical replacement",
            "ai_value_add": "AI checks ECM event log for recent reflash before suggesting part replacement"
        }]
    },
    {
        "cummins_code": 639,
        "spn": 639, "fmi": 9,
        "obd2_code": None,
        "pid_sid": None,
        "description": "J1939 CAN Bus Communication Error — Abnormal Update Rate",
        "system_category": "electrical",
        "complexity": "medium",
        "safety_critical": False,
        "causes_derate": False,
        "qsol_procedure": "TS-CAN-001",
        "applies_to": "X15,ISX15,B6.7,L9",
        "typical_causes": [
            ("CAN bus wiring damaged or chafed", 0.25),
            ("Terminating resistor missing or failed", 0.25),
            ("Aftermarket device interfering with CAN bus", 0.25),
            ("ECM connector corrosion", 0.25),
        ],
        "edge_cases": [{
            "scenario": "Code appeared after aftermarket device installation (ELD, GPS, etc.)",
            "likely_cause": "Aftermarket CAN device causing bus loading or termination issue",
            "ai_value_add": "AI asks about recent device installations; QSOL doesn't check for aftermarket equipment"
        }]
    },
    {
        "cummins_code": 520372,
        "spn": 520372, "fmi": 3,
        "obd2_code": None,
        "pid_sid": None,
        "description": "Aftertreatment DEF Tank Temperature Sensor — Voltage Above Normal",
        "system_category": "aftertreatment",
        "complexity": "medium",
        "safety_critical": False,
        "causes_derate": False,
        "qsol_procedure": "TS-DEF-004",
        "applies_to": "X15,B6.7,L9",
        "typical_causes": [
            ("DEF tank temperature sensor failure", 0.30),
            ("Open circuit in sensor wiring", 0.25),
            ("Corroded connector at DEF tank", 0.25),
            ("DEF tank header unit failure", 0.20),
        ],
        "edge_cases": [{
            "scenario": "DEF tank just replaced or cleaned",
            "likely_cause": "Sensor connector not fully seated after tank service",
            "ai_value_add": "AI checks for recent DEF system service before recommending sensor replacement"
        }]
    },
    {
        "cummins_code": 411,
        "spn": 411, "fmi": 2,
        "obd2_code": None,
        "pid_sid": None,
        "description": "EGR Differential Pressure Sensor — Data Erratic",
        "system_category": "egr",
        "complexity": "low",
        "safety_critical": False,
        "causes_derate": False,
        "qsol_procedure": "TS-EGR-002",
        "applies_to": "X15,ISX15,B6.7",
        "typical_causes": [
            ("Sensor tubing clogged with soot", 0.35),
            ("Sensor internal failure", 0.25),
            ("Water accumulated in tubing", 0.20),
            ("EGR cooler leak contaminating sensor", 0.20),
        ],
        "edge_cases": [{
            "scenario": "Code clears after reset but returns every few hundred miles",
            "likely_cause": "Sensor tubes slowly clogging with soot; clean tubes, don't just replace sensor",
            "ai_value_add": "AI tracks code recurrence pattern and recommends tube maintenance with sensor"
        }]
    },
    {
        "cummins_code": 3031,
        "spn": 3031, "fmi": 9,
        "obd2_code": None,
        "pid_sid": None,
        "description": "Aftertreatment Intake NOx Sensor — Abnormal Update Rate",
        "system_category": "aftertreatment",
        "complexity": "medium",
        "safety_critical": False,
        "causes_derate": False,
        "qsol_procedure": "TS-NOX-001",
        "applies_to": "X15,B6.7,L9",
        "typical_causes": [
            ("NOx sensor internal failure", 0.30),
            ("CAN bus wiring issue to sensor", 0.25),
            ("Sensor power supply problem", 0.25),
            ("ECM communication error", 0.20),
        ],
        "edge_cases": [{
            "scenario": "Both intake and outlet NOx sensors fail together",
            "likely_cause": "Shared CAN bus wiring issue, not both sensors failing at once",
            "ai_value_add": "AI checks for CAN bus codes and shared wiring before replacing expensive NOx sensors"
        }]
    },
    {
        "cummins_code": 168,
        "spn": 168, "fmi": 1,
        "obd2_code": None,
        "pid_sid": "PID 168",
        "description": "Battery/System Voltage Low — Data Below Normal Range",
        "system_category": "electrical",
        "complexity": "low",
        "safety_critical": False,
        "causes_derate": False,
        "qsol_procedure": "TS-ELEC-001",
        "applies_to": "X15,ISX15,B6.7,L9",
        "typical_causes": [
            ("Weak or failing batteries", 0.30),
            ("Alternator undercharging", 0.25),
            ("Loose or corroded battery connections", 0.25),
            ("Parasitic electrical draw", 0.10),
            ("Corroded battery cables", 0.10),
        ],
        "edge_cases": [{
            "scenario": "Code only appears on cold morning starts",
            "likely_cause": "Battery CCA capacity marginal, shows up only in cold; load test will confirm",
            "ai_value_add": "AI factors ambient temperature into battery diagnosis priority"
        }]
    },

    # --- LOW SEVERITY ---
    {
        "cummins_code": 91,
        "spn": 91, "fmi": 3,
        "obd2_code": "P0122",
        "pid_sid": "PID 91",
        "description": "Accelerator Pedal Position Sensor — Voltage Above Normal",
        "system_category": "engine_control",
        "complexity": "low",
        "safety_critical": False,
        "causes_derate": False,
        "qsol_procedure": "TS-PEDAL-001",
        "applies_to": "X15,B6.7",
        "typical_causes": [
            ("Accelerator pedal sensor failure", 0.35),
            ("Wiring short to voltage source", 0.30),
            ("Connector damage from cab moisture", 0.35),
        ],
        "edge_cases": [{
            "scenario": "Pedal assembly recently replaced",
            "likely_cause": "Wrong pedal part number or wiring misrouted during install",
            "ai_value_add": "AI checks recent pedal replacement before wiring diagnosis"
        }]
    },
    {
        "cummins_code": 105,
        "spn": 105, "fmi": 3,
        "obd2_code": "P0108",
        "pid_sid": "PID 105",
        "description": "Intake Manifold Pressure (MAP) Sensor — Voltage Above Normal",
        "system_category": "air_intake",
        "complexity": "low",
        "safety_critical": False,
        "causes_derate": False,
        "qsol_procedure": "TS-MAP-001",
        "applies_to": "X15,B6.7,L9",
        "typical_causes": [
            ("Intake pressure sensor failure", 0.30),
            ("Wiring short to voltage", 0.25),
            ("Connector corrosion", 0.25),
            ("ECM 5V reference voltage issue", 0.20),
        ],
        "edge_cases": [{
            "scenario": "Multiple 5V sensor codes appear at the same time",
            "likely_cause": "ECM 5V reference supply shorted; all sensors on that circuit affected",
            "ai_value_add": "AI detects multi-sensor pattern pointing to shared 5V reference voltage failure"
        }]
    },
    {
        "cummins_code": 3226,
        "spn": 3226, "fmi": 3,
        "obd2_code": None,
        "pid_sid": None,
        "description": "Aftertreatment DPF Intake Pressure Sensor — Voltage Above Normal",
        "system_category": "aftertreatment",
        "complexity": "low",
        "safety_critical": False,
        "causes_derate": False,
        "qsol_procedure": "TS-DPF-002",
        "applies_to": "X15,B6.7,L9",
        "typical_causes": [
            ("Pressure sensor failure", 0.30),
            ("Blocked pressure sensing tube", 0.30),
            ("Water in pressure lines", 0.20),
            ("Sensor wiring issue", 0.20),
        ],
        "edge_cases": [{
            "scenario": "Sensor replaced but code returns within days",
            "likely_cause": "Pressure tube not replaced or cleaned with sensor; debris remains in tube",
            "ai_value_add": "AI flags that tube inspection is needed alongside sensor replacement"
        }]
    },
    {
        "cummins_code": 3216,
        "spn": 3216, "fmi": 9,
        "obd2_code": None,
        "pid_sid": None,
        "description": "Aftertreatment DPF Pressure — Abnormal Update Rate",
        "system_category": "aftertreatment",
        "complexity": "low",
        "safety_critical": False,
        "causes_derate": False,
        "qsol_procedure": "TS-DPF-003",
        "applies_to": "X15,B6.7",
        "typical_causes": [
            ("CAN bus communication issue", 0.40),
            ("Sensor internal fault", 0.35),
            ("ECM software glitch", 0.25),
        ],
        "edge_cases": [{
            "scenario": "Code appears only during cold start in winter",
            "likely_cause": "Sensor warming up slowly in extreme cold, not actual failure",
            "ai_value_add": "AI checks ambient temperature; if below -10°F, recommends monitoring not replacement"
        }]
    },
    {
        "cummins_code": 1761,
        "spn": 1761, "fmi": 5,
        "obd2_code": None,
        "pid_sid": None,
        "description": "Aftertreatment DOC Intake Temperature Sensor — Current Below Normal",
        "system_category": "aftertreatment",
        "complexity": "low",
        "safety_critical": False,
        "causes_derate": False,
        "qsol_procedure": "TS-DOC-001",
        "applies_to": "X15,B6.7,L9",
        "typical_causes": [
            ("Temperature sensor failure", 0.35),
            ("Wiring open circuit from heat damage", 0.30),
            ("Connector corrosion from heat exposure", 0.35),
        ],
        "edge_cases": [{
            "scenario": "Sensor was replaced but code returns within days",
            "likely_cause": "Aftermarket sensor with wrong resistance curve; use OEM part only",
            "ai_value_add": "AI checks if non-OEM part was used in recent repair"
        }]
    },
    {
        "cummins_code": 108,
        "spn": 108, "fmi": 3,
        "obd2_code": "P0073",
        "pid_sid": "PID 108",
        "description": "Ambient Air Temperature Sensor — Voltage Above Normal",
        "system_category": "air_intake",
        "complexity": "low",
        "safety_critical": False,
        "causes_derate": False,
        "qsol_procedure": "TS-AMB-001",
        "applies_to": "X15,B6.7,L9",
        "typical_causes": [
            ("Ambient temp sensor failure", 0.35),
            ("Open circuit in sensor wiring", 0.30),
            ("Sensor physically damaged", 0.20),
            ("Connector corrosion", 0.15),
        ],
        "edge_cases": []
    },
    {
        "cummins_code": 174,
        "spn": 174, "fmi": 0,
        "obd2_code": None,
        "pid_sid": "PID 174",
        "description": "Fuel Temperature Too High — Data Above Normal Range",
        "system_category": "fuel",
        "complexity": "medium",
        "safety_critical": False,
        "causes_derate": False,
        "qsol_procedure": "TS-FUEL-004",
        "applies_to": "X15,B6.7,L9",
        "typical_causes": [
            ("Restricted fuel return line", 0.30),
            ("Fuel cooler blocked or damaged", 0.30),
            ("High ambient temperature operation", 0.20),
            ("Fuel heater stuck on", 0.20),
        ],
        "edge_cases": []
    },
    {
        "cummins_code": 3556,
        "spn": 3556, "fmi": 3,
        "obd2_code": None,
        "pid_sid": None,
        "description": "DEF Tank Level Sensor — Voltage Above Normal",
        "system_category": "aftertreatment",
        "complexity": "low",
        "safety_critical": False,
        "causes_derate": False,
        "qsol_procedure": "TS-DEF-005",
        "applies_to": "X15,B6.7,L9",
        "typical_causes": [
            ("Level sensor failure in DEF tank", 0.35),
            ("Open wiring to sensor", 0.30),
            ("DEF tank header unit failure", 0.20),
            ("Connector corrosion", 0.15),
        ],
        "edge_cases": []
    },
]


# ═══════════════════════════════════════════════════════════════
# PARTS CATALOG
# ═══════════════════════════════════════════════════════════════

PARTS = [
    # (part_number, part_name, category, compatible_engines, avg_cost, warranty_days, safety_critical)
    ("CLT-SENS-X15-001",    "Coolant Level Sensor",              "sensor",          "X15,ISX15,QSX15",     85.00,   90, False),
    ("CLT-TEMP-SENS-001",   "Coolant Temperature Sensor",        "sensor",          "X15,B6.7,L9",         65.00,   90, False),
    ("OIL-SENS-001",        "Oil Pressure Sensor",               "sensor",          "X15,ISX15,B6.7,L9",  120.00,   90, False),
    ("OIL-PUMP-X15-001",    "Oil Pump Assembly (X15)",           "pump",            "X15,ISX15",          2800.00,  180, True),
    ("OIL-FILT-001",        "Oil Filter",                        "filter",          "X15,B6.7,L9",         35.00,    0, False),
    ("TURBO-ACT-X15-001",   "VGT Turbo Actuator",               "turbo",           "X15,ISX15",          1450.00,  180, False),
    ("TURBO-ASSY-X15-001",  "Turbocharger Assembly (X15)",       "turbo",           "X15,ISX15",          3800.00,  365, False),
    ("VGT-ACT-X15-001",     "VGT Actuator Module",              "turbo",           "X15,ISX15",          1200.00,  180, False),
    ("AIR-FILT-X15-001",    "Air Filter Element",                "filter",          "X15,ISX15",            85.00,    0, False),
    ("FUEL-FILT-001",       "Fuel Filter/Water Separator",       "filter",          "X15,B6.7,L9",         45.00,    0, False),
    ("FUEL-PUMP-X15-001",   "Fuel Supply Pump",                  "pump",            "X15,ISX15",           950.00,  180, False),
    ("FUEL-REG-001",        "Fuel Pressure Regulator",           "fuel",            "X15,ISX15,B6.7",     380.00,   90, False),
    ("FUEL-RELIEF-001",     "Fuel Pressure Relief Valve",        "fuel",            "X15,ISX15",           220.00,   90, False),
    ("HP-PUMP-X15-001",     "High Pressure Fuel Pump (X15)",     "pump",            "X15,ISX15",          4200.00,  365, False),
    ("INJ-X15-CYL1-001",   "Fuel Injector (X15 per cyl)",       "injector",        "X15,ISX15",           680.00,  180, False),
    ("THERM-X15-001",       "Thermostat",                        "cooling",         "X15,ISX15",            95.00,   90, False),
    ("WPUMP-X15-001",       "Water Pump Assembly (X15)",         "pump",            "X15,ISX15",           650.00,  180, False),
    ("FAN-CLUTCH-001",      "Fan Clutch Assembly",               "cooling",         "X15,ISX15,B6.7",     480.00,  180, False),
    ("EGR-VALVE-X15-001",   "EGR Valve Assembly (X15)",          "egr",             "X15,ISX15",           890.00,  180, False),
    ("EGR-ACT-001",         "EGR Actuator",                      "egr",             "X15,ISX15",           420.00,   90, False),
    ("EGR-DP-SENS-001",     "EGR Differential Pressure Sensor",  "sensor",          "X15,B6.7",           180.00,   90, False),
    ("DEF-DOSE-001",        "DEF Dosing Valve",                  "aftertreatment",  "X15,B6.7,L9",        520.00,  180, False),
    ("DEF-PUMP-001",        "DEF Supply Pump Module",            "aftertreatment",  "X15,B6.7,L9",        780.00,  180, False),
    ("DEF-TANK-HDR-001",    "DEF Tank Header/Sensor Unit",       "aftertreatment",  "X15,B6.7,L9",        340.00,   90, False),
    ("SCR-CAT-X15-001",     "SCR Catalyst Assembly (X15)",       "aftertreatment",  "X15,ISX15",          5200.00,  365, False),
    ("DPF-ASSY-X15-001",    "DPF Assembly (X15)",                "aftertreatment",  "X15,ISX15",          4800.00,  365, False),
    ("DPF-PRESS-SENS-001",  "DPF Differential Pressure Sensor",  "sensor",          "X15,B6.7,L9",        195.00,   90, False),
    ("7TH-INJ-001",         "7th Injector (DPF Dosing)",         "aftertreatment",  "X15,B6.7",           380.00,   90, False),
    ("DOC-TEMP-SENS-001",   "DOC Intake Temperature Sensor",     "sensor",          "X15,B6.7,L9",        145.00,   90, False),
    ("NOX-SENS-IN-001",     "NOx Sensor — Intake",               "sensor",          "X15,B6.7,L9",        850.00,  180, False),
    ("NOX-SENS-OUT-001",    "NOx Sensor — Outlet",               "sensor",          "X15,B6.7,L9",        850.00,  180, False),
    ("MAP-SENS-001",        "Intake Manifold Pressure Sensor",   "sensor",          "X15,B6.7,L9",        110.00,   90, False),
    ("ACCEL-PED-001",       "Accelerator Pedal Assembly",        "electrical",      "X15,B6.7,L9",        285.00,   90, False),
    ("VSS-001",             "Vehicle Speed Sensor",              "sensor",          "X15,B6.7,L9",        165.00,   90, True),
    ("SPD-SENS-001",        "Engine Speed/Position Sensor",      "sensor",          "X15,B6.7,L9",        195.00,   90, False),
    ("CAN-TERM-001",        "CAN Bus Terminating Resistor",      "electrical",      "X15,B6.7,L9",         25.00,    0, False),
    ("BATTERY-001",         "Heavy Duty Battery (Group 31)",     "electrical",      "X15,B6.7,L9",        280.00,  365, False),
    ("ALT-001",             "Alternator Assembly",               "electrical",      "X15,B6.7,L9",        520.00,  180, False),
    ("CAT-CONV-X15-001",    "Catalytic Converter (X15)",         "aftertreatment",  "X15,ISX15",          2400.00,  365, False),
    ("O2-SENS-X15-UP",      "O2 Sensor — Upstream",              "sensor",          "X15,ISX15",           145.00,   90, False),
]


# ═══════════════════════════════════════════════════════════════
# ENGINES
# ═══════════════════════════════════════════════════════════════

ENGINES = [
    # (serial, model, ecm_type, vehicle_type, year, mileage, customer, location)
    ("ENG-X15-2023-001234", "X15",    "CM2350", "heavy_duty",  2023, 285000, "Anderson Farms LLC",       "Rural Monroe County, IN"),
    ("ENG-ISX-2023-003421", "ISX15",  "CM2350", "heavy_duty",  2023, 192000, "MidWest Freight Inc",      "Indianapolis, IN"),
    ("ENG-B67-2025-001122", "B6.7",   "CM2350", "medium_duty", 2025,  42000, "City of Bloomington",      "Bloomington, IN"),
    ("ENG-X15-2024-005678", "X15",    "CM2350", "heavy_duty",  2024,  95000, "JR Trucking Co",           "Seymour, IN"),
    ("ENG-L9-2024-002233",  "L9",     "CM2350", "medium_duty", 2024,  67000, "Bluegrass Construction",   "Louisville, KY"),
    ("ENG-X15-2022-009876", "X15",    "CM2350", "heavy_duty",  2022, 340000, "Tennessee Express Lines",  "Memphis, TN"),
    ("ENG-B67-2024-004455", "B6.7",   "CM2350", "medium_duty", 2024, 110000, "Hoosier Landscaping",      "Seymour, IN"),
    ("ENG-X15-2023-007788", "X15",    "CM2350", "heavy_duty",  2023, 220000, "Capital Excavation",       "Spencer, IN"),
    ("ENG-B67-2025-003344", "B6.7",   "CM2350", "medium_duty", 2025,  28000, "Marion County Schools",    "Indianapolis, IN"),
    ("ENG-L9-2023-005566",  "L9",     "CM2350", "medium_duty", 2023, 155000, "River City Concrete",      "Evansville, IN"),
]


# ═══════════════════════════════════════════════════════════════
# TECHNICIANS
# ═══════════════════════════════════════════════════════════════

TECHNICIANS = [
    # (tech_id, name, skill_level, email, phone)
    ("TECH-JT-042",  "Jake Thompson",   "junior",       "jake.thompson@dealer.example.com",   "812-555-0142"),
    ("TECH-MR-018",  "Mike Rodriguez",  "junior",       "mike.rodriguez@dealer.example.com",  "317-555-0218"),
    ("TECH-EC-071",  "Emma Chen",       "intermediate", "emma.chen@dealer.example.com",       "812-555-0371"),
    ("TECH-DP-033",  "David Park",      "intermediate", "david.park@dealer.example.com",      "812-555-0433"),
    ("TECH-SJ-005",  "Sarah Johnson",   "senior",       "sarah.johnson@dealer.example.com",   "812-555-0105"),
    ("TECH-RB-009",  "Robert Brown",    "senior",       "robert.brown@dealer.example.com",    "615-555-0209"),
    ("TECH-LM-055",  "Lisa Martinez",   "junior",       "lisa.martinez@dealer.example.com",   "812-555-0555"),
    ("TECH-AK-022",  "Alex Kim",        "intermediate", "alex.kim@dealer.example.com",        "502-555-0322"),
    ("TECH-TW-063",  "Tyler Wilson",    "junior",       "tyler.wilson@dealer.example.com",    "812-555-0663"),
    ("TECH-NP-041",  "Nina Patel",      "intermediate", "nina.patel@dealer.example.com",      "812-555-0741"),
]


# ═══════════════════════════════════════════════════════════════
# SERVICE HISTORY
# ═══════════════════════════════════════════════════════════════

def get_service_history_records():
    """Returns service history records with dates relative to today."""
    base = datetime(2026, 3, 5)
    return [
        # Engine 1: ENG-X15-2023-001234 — the main demo scenario
        ("ENG-X15-2023-001234", (base - timedelta(days=67)).strftime("%Y-%m-%d"),
         "SPN 3936 FMI 21", "replacement",
         "Catalytic converter replacement — SCR efficiency low",
         2400.0, "TECH-SJ-005",
         "Replaced SCR catalyst. DEF quality tested OK. Customer reporting reduced power.",
         "active"),

        ("ENG-X15-2023-001234", (base - timedelta(days=180)).strftime("%Y-%m-%d"),
         "SPN 94 FMI 1", "replacement",
         "Fuel filter replacement — routine + fuel pressure low code",
         45.0, "TECH-EC-071",
         "Routine fuel filter. Pressure code cleared after replacement.",
         "expired"),

        ("ENG-X15-2023-001234", (base - timedelta(days=365)).strftime("%Y-%m-%d"),
         "SPN 168 FMI 1", "repair",
         "Battery cable cleaning and tightening",
         0.0, "TECH-JT-042",
         "Loose battery connection causing intermittent low voltage. Cleaned and torqued.",
         "expired"),

        # Engine 2: ENG-ISX-2023-003421 — recurring fuel issue
        ("ENG-ISX-2023-003421", (base - timedelta(days=21)).strftime("%Y-%m-%d"),
         "SPN 94 FMI 1", "replacement",
         "Fuel pressure regulator replaced",
         380.0, "TECH-DP-033",
         "Fuel rail pressure intermittently low. Regulator replaced, monitored OK.",
         "active"),

        ("ENG-ISX-2023-003421", (base - timedelta(days=90)).strftime("%Y-%m-%d"),
         "SPN 94 FMI 1", "replacement",
         "Fuel filter replacement — fuel pressure low",
         45.0, "TECH-MR-018",
         "Filter was heavily restricted. Replaced and bled fuel system.",
         "expired"),

        # Engine 3: ENG-B67-2025-001122
        ("ENG-B67-2025-001122", (base - timedelta(days=14)).strftime("%Y-%m-%d"),
         "SPN 110 FMI 3", "replacement",
         "Coolant temperature sensor replaced",
         65.0, "TECH-LM-055",
         "High voltage code. Sensor connector had corrosion. Replaced sensor.",
         "active"),

        # Engine 4: ENG-X15-2024-005678 — turbo for escalation demo
        ("ENG-X15-2024-005678", (base - timedelta(days=120)).strftime("%Y-%m-%d"),
         "SPN 641 FMI 14", "repair",
         "VGT actuator recalibration",
         0.0, "TECH-NP-041",
         "VGT actuator calibration after ECM update. No parts needed.",
         "expired"),

        ("ENG-X15-2024-005678", (base - timedelta(days=200)).strftime("%Y-%m-%d"),
         None, "maintenance",
         "Routine PM service — oil, filters, inspection",
         165.0, "TECH-EC-071",
         "Standard PM. All filters replaced. No issues found.",
         "expired"),

        # Engine 5: ENG-L9-2024-002233 — DEF contamination
        ("ENG-L9-2024-002233", (base - timedelta(days=5)).strftime("%Y-%m-%d"),
         "SPN 5246 FMI 0", "repair",
         "DEF system flush — contaminated DEF",
         520.0, "TECH-AK-022",
         "Customer filled DEF tank with windshield washer fluid. Flushed entire system. New dosing valve.",
         "active"),

        ("ENG-L9-2024-002233", (base - timedelta(days=60)).strftime("%Y-%m-%d"),
         "SPN 3251 FMI 0", "repair",
         "Forced DPF regeneration",
         0.0, "TECH-AK-022",
         "Excessive idle time caused soot buildup. Forced regen successful.",
         "expired"),

        # Engine 6: ENG-X15-2022-009876
        ("ENG-X15-2022-009876", (base - timedelta(days=30)).strftime("%Y-%m-%d"),
         "SPN 102 FMI 1", "replacement",
         "Turbocharger assembly replaced",
         3800.0, "TECH-RB-009",
         "VGT vanes seized from carbon. Full turbo replacement. Senior job.",
         "active"),

        # Engine 7: ENG-B67-2024-004455
        ("ENG-B67-2024-004455", (base - timedelta(days=10)).strftime("%Y-%m-%d"),
         "SPN 651 FMI 5", "replacement",
         "Cylinder 3 injector replaced",
         680.0, "TECH-DP-033",
         "Injector solenoid failed. Replaced and programmed trim codes in INSITE.",
         "active"),

        # Engine 8: ENG-X15-2023-007788
        ("ENG-X15-2023-007788", (base - timedelta(days=45)).strftime("%Y-%m-%d"),
         "SPN 3364 FMI 2", "repair",
         "EGR valve cleaned",
         0.0, "TECH-EC-071",
         "Heavy carbon buildup on EGR valve. Cleaned and tested. Position test passed.",
         "expired"),
    ]


# ═══════════════════════════════════════════════════════════════
# CASES (Multi-case queue for Priority Engine demo)
# ═══════════════════════════════════════════════════════════════

def get_cases():
    base = datetime(2026, 3, 5)
    return [
        # Open — Safety critical, high priority
        ("CASE-2026-0047", "ENG-X15-2022-009876", "CUST-006", "Tennessee Express Lines",
         "Customer yard, Memphis, TN", "priority",
         '["SPN 100 FMI 1"]',
         "Oil pressure warning on dashboard, oil light on at idle, ticking noise",
         (base - timedelta(minutes=30)).isoformat(), "open", "P0", 24.0,
         None, True, False, False, "online", None, None, None, None, None),

        # Open — Safety critical + offline
        ("CASE-2026-0046", "ENG-L9-2024-002233", "CUST-005", "Bluegrass Construction",
         "Highway 64 construction site, Louisville, KY", "standard",
         '["SPN 520375 FMI 18", "SPN 5246 FMI 0"]',
         "DEF warning light, power derate active, machine stopped",
         (base - timedelta(hours=3)).isoformat(), "open", "P0", 22.0,
         None, True, False, False, "offline", None, None, None, None, None),

        # Open — High priority, fleet risk
        ("CASE-2026-0045", "ENG-ISX-2023-003421", "CUST-002", "MidWest Freight Inc",
         "Distribution center, Indianapolis, IN", "critical",
         '["SPN 94 FMI 1"]',
         "Fuel pressure warning, stalling under load, 3rd occurrence in 90 days",
         (base - timedelta(hours=1)).isoformat(), "open", "P1", 19.0,
         None, False, True, True, "online", None, None, None, None, None),

        # Escalated — Turbo underboost
        ("CASE-2026-0043", "ENG-X15-2024-005678", "CUST-004", "JR Trucking Co",
         "I-65 rest area, Seymour, IN", "priority",
         '["SPN 102 FMI 1"]',
         "Severe power loss, cannot maintain highway speed, check engine light",
         (base - timedelta(hours=2)).isoformat(), "escalated", "P1", 18.0,
         "TECH-JT-042", False, False, True, "intermittent", 0.73, 4.5, None, None, None),

        # Open — Medium priority, offline
        ("CASE-2026-0042", "ENG-X15-2023-001234", "CUST-001", "Anderson Farms LLC",
         "Rural Monroe County, IN", "standard",
         '["SPN 3936 FMI 21"]',
         "Rough idle at cold start, occasional black smoke, reduced power noted",
         (base - timedelta(hours=4)).isoformat(), "open", "P2", 14.0,
         None, False, False, False, "offline", None, None, None, None, None),

        # In progress — Low priority, online
        ("CASE-2026-0044", "ENG-B67-2025-001122", "CUST-003", "City of Bloomington",
         "Municipal garage, Bloomington, IN", "standard",
         '["SPN 110 FMI 3"]',
         "Check engine light, temp gauge reading erratic",
         (base - timedelta(hours=6)).isoformat(), "in_progress", "P3", 6.0,
         "TECH-LM-055", False, False, False, "online", 0.91, 1.0, None, None, None),

        # Resolved recently
        ("CASE-2026-0038", "ENG-B67-2024-004455", "CUST-007", "Hoosier Landscaping",
         "Customer site, Seymour, IN", "standard",
         '["SPN 651 FMI 5"]',
         "Engine misfire, rough running, loss of power",
         (base - timedelta(days=2)).isoformat(), "resolved", "P2", 15.0,
         "TECH-DP-033", False, False, False, "online", 0.88, 3.0, 2.5,
         "Injector cylinder 3 replaced. Trim codes updated. Running smooth.",
         (base - timedelta(days=2) + timedelta(hours=3)).isoformat()),

        # Closed
        ("CASE-2026-0035", "ENG-X15-2023-007788", "CUST-008", "Capital Excavation",
         "Quarry site, Spencer, IN", "standard",
         '["SPN 3364 FMI 2"]',
         "Intermittent check engine light, slight power loss at cold start",
         (base - timedelta(days=5)).isoformat(), "closed", "P3", 8.0,
         "TECH-EC-071", False, False, False, "online", 0.85, 2.5, 1.5,
         "EGR valve carbon buildup. Cleaned and tested. All clear.",
         (base - timedelta(days=5) + timedelta(hours=2)).isoformat()),
    ]


# ═══════════════════════════════════════════════════════════════
# DECISION LOGS (Audit Trail — required deliverable)
# ═══════════════════════════════════════════════════════════════

def get_decision_logs():
    base = datetime(2026, 3, 5)
    return [
        # Log 1: Offline + edge case → PROCEED_WITH_GUIDANCE (the main demo)
        {
            "timestamp": (base - timedelta(hours=3, minutes=42)).isoformat(),
            "engine_serial": "ENG-X15-2023-001234",
            "fault_code_input": "SPN 3936 FMI 21",
            "tech_id": "TECH-JT-042",
            "tech_skill_level": "junior",
            "symptoms": "Rough idle at cold start, occasional black smoke, reduced power",
            "insite_data": json.dumps({
                "active_codes": ["SPN 3936 FMI 21"],
                "inactive_codes": ["SPN 110 FMI 4"],
                "freeze_frame": {"engine_speed": 720, "coolant_temp": 42, "boost_pressure": 14.2, "exhaust_temp_pre_scr": 280}
            }),
            "environment": json.dumps({"temperature_f": 35, "location": "Rural Monroe County, IN", "weather": "overcast"}),
            "triage_diagnosis": "O2 sensor malfunction (upstream), not catalytic converter repeat failure",
            "triage_confidence": 0.82,
            "triage_reasoning": "SCR catalyst was replaced 67 days ago — unlikely repeat failure within warranty period. Low exhaust temp readings and rough idle at cold start suggest upstream O2 sensor wiring corrosion rather than converter efficiency issue.",
            "alternative_causes": json.dumps(["Exhaust leak before O2 sensor", "ECM calibration drift after catalyst replacement", "Intermittent wiring harness issue"]),
            "recommended_tests": json.dumps(["O2 Sensor Response Test via INSITE", "Check O2 sensor wiring harness for corrosion", "Exhaust backpressure test"]),
            "recent_repairs": json.dumps([{"date": "2026-01-28", "repair": "Catalytic converter replacement", "cost": 2400}]),
            "service_history_flags": json.dumps(["RECENT_REPAIR_SAME_SYSTEM", "WARRANTY_ACTIVE"]),
            "warranty_status": "Active — 23 days remaining on catalyst",
            "escalation_decision": "PROCEED_WITH_GUIDANCE",
            "escalation_reasoning": "Medium complexity + junior tech + 82% confidence. Part cost for O2 sensor ($145) within junior limit. Not safety-critical. Document for warranty file.",
            "requires_approval": False,
            "guidance_notes": "1. Run INSITE O2 Sensor Response Test. 2. Inspect O2 sensor wiring for corrosion. 3. Replace sensor if test confirms (Part# O2-SENS-X15-UP, $145). 4. Document all readings for warranty file.",
            "approved_by": None,
            "actual_repair": "Replaced upstream O2 sensor — corroded wiring found at connector",
            "parts_used": json.dumps([{"part_number": "O2-SENS-X15-UP", "cost": 145}]),
            "repair_successful": True,
            "repair_duration_hours": 1.2,
            "online_status": "offline",
            "sync_timestamp": (base - timedelta(hours=1)).isoformat(),
            "llm_model": "llama-3.2-3b",
            "llm_version": "v1.0"
        },
        # Log 2: High cost + low confidence → ESCALATE
        {
            "timestamp": (base - timedelta(hours=2, minutes=15)).isoformat(),
            "engine_serial": "ENG-X15-2024-005678",
            "fault_code_input": "SPN 102 FMI 1",
            "tech_id": "TECH-JT-042",
            "tech_skill_level": "junior",
            "symptoms": "Severe power loss, cannot maintain highway speed, check engine light on",
            "insite_data": json.dumps({
                "active_codes": ["SPN 102 FMI 1"],
                "freeze_frame": {"engine_speed": 1800, "coolant_temp": 195, "boost_pressure": 8.5, "commanded_boost": 22.0, "turbo_speed": 45000}
            }),
            "environment": json.dumps({"temperature_f": 48, "location": "I-65 rest area, Seymour, IN", "weather": "clear"}),
            "triage_diagnosis": "Turbocharger actuator failure or VGT vane sticking",
            "triage_confidence": 0.73,
            "triage_reasoning": "Large gap between commanded boost (22 psi) and actual (8.5 psi). VGT actuator was recalibrated 120 days ago — possible actuator motor degradation. Turbo speed lower than expected.",
            "alternative_causes": json.dumps(["Major intake air leak after compressor", "Severely clogged air filter", "Exhaust manifold crack"]),
            "recommended_tests": json.dumps(["VGT Actuator Test via INSITE", "Boost Pressure Leak-Down Test", "Air filter visual inspection"]),
            "recent_repairs": json.dumps([{"date": "2025-11-05", "repair": "VGT actuator recalibration", "cost": 0}]),
            "service_history_flags": json.dumps(["PREVIOUS_RELATED_REPAIR"]),
            "warranty_status": "Standard warranty active",
            "escalation_decision": "ESCALATE",
            "escalation_reasoning": "Multiple triggers: (1) Confidence 73% < 85% threshold. (2) Turbo assembly $3,800 exceeds $1,000 junior limit. (3) High complexity. (4) Junior tech.",
            "requires_approval": True,
            "guidance_notes": None,
            "approved_by": "TECH-SJ-005",
            "actual_repair": None,
            "parts_used": None,
            "repair_successful": None,
            "repair_duration_hours": None,
            "online_status": "online",
            "sync_timestamp": None,
            "llm_model": "llama-3.2-3b",
            "llm_version": "v1.0"
        },
        # Log 3: High confidence + low complexity → PROCEED
        {
            "timestamp": (base - timedelta(hours=5, minutes=50)).isoformat(),
            "engine_serial": "ENG-B67-2025-001122",
            "fault_code_input": "SPN 110 FMI 3",
            "tech_id": "TECH-LM-055",
            "tech_skill_level": "junior",
            "symptoms": "Check engine light, temperature gauge reading erratic, no overheating",
            "insite_data": json.dumps({
                "active_codes": ["SPN 110 FMI 3"],
                "freeze_frame": {"engine_speed": 1200, "coolant_temp": 999, "oil_pressure": 42}
            }),
            "environment": json.dumps({"temperature_f": 55, "location": "Municipal garage, Bloomington, IN"}),
            "triage_diagnosis": "Coolant temperature sensor open circuit or failure",
            "triage_confidence": 0.91,
            "triage_reasoning": "Coolant temp reading 999°F is clearly a sensor fault (maxed out from open circuit). No overheating symptoms. Previous replacement 14 days ago — check connector seating first.",
            "alternative_causes": json.dumps(["Connector not fully seated from recent repair", "Replacement sensor DOA"]),
            "recommended_tests": json.dumps(["INSITE Coolant Temp Sensor Test", "Inspect connector seating"]),
            "recent_repairs": json.dumps([{"date": "2026-02-19", "repair": "Coolant temp sensor replaced", "cost": 65}]),
            "service_history_flags": json.dumps(["RECENT_REPAIR_SAME_COMPONENT"]),
            "warranty_status": "Sensor under 90-day parts warranty",
            "escalation_decision": "PROCEED",
            "escalation_reasoning": "High confidence (91%), low complexity, part cost $65 under threshold. Standard replacement procedure.",
            "requires_approval": False,
            "guidance_notes": "Check connector seating first — sensor replaced 14 days ago. If connector OK, replace under warranty.",
            "approved_by": None,
            "actual_repair": "Connector was not fully seated from previous repair. Reseated, code cleared.",
            "parts_used": json.dumps([]),
            "repair_successful": True,
            "repair_duration_hours": 0.5,
            "online_status": "online",
            "sync_timestamp": None,
            "llm_model": "llama-3.2-3b",
            "llm_version": "v1.0"
        },
        # Log 4: Safety-critical → MANDATORY ESCALATE
        {
            "timestamp": (base - timedelta(minutes=28)).isoformat(),
            "engine_serial": "ENG-X15-2022-009876",
            "fault_code_input": "SPN 100 FMI 1",
            "tech_id": "TECH-TW-063",
            "tech_skill_level": "junior",
            "symptoms": "Oil pressure warning light on at idle, driver heard ticking noise from engine",
            "insite_data": json.dumps({
                "active_codes": ["SPN 100 FMI 1"],
                "inactive_codes": ["SPN 1569 FMI 31"],
                "freeze_frame": {"engine_speed": 650, "oil_pressure": 12, "coolant_temp": 198, "oil_temp": 235}
            }),
            "environment": json.dumps({"temperature_f": 72, "location": "Customer yard, Memphis, TN", "weather": "sunny"}),
            "triage_diagnosis": "Critical low oil pressure — possible oil pump degradation or bearing wear",
            "triage_confidence": 0.78,
            "triage_reasoning": "Oil pressure at 12 psi at idle is critically low (minimum 20 psi). Engine protection lamp triggered. Oil temp elevated at 235°F. Recent turbo replacement 30 days ago — oil system may have debris.",
            "alternative_causes": json.dumps(["Oil pressure sensor malfunction", "Oil pickup tube blockage", "Oil dilution from fuel system"]),
            "recommended_tests": json.dumps(["DO NOT RUN ENGINE", "Check oil level and condition on dipstick", "Mechanical oil pressure gauge test"]),
            "recent_repairs": json.dumps([{"date": "2026-02-03", "repair": "Turbocharger assembly replaced", "cost": 3800}]),
            "service_history_flags": json.dumps(["RECENT_MAJOR_REPAIR", "SAFETY_CRITICAL"]),
            "warranty_status": "Turbo under warranty — 335 days remaining",
            "escalation_decision": "ESCALATE",
            "escalation_reasoning": "MANDATORY: (1) Safety-critical system. (2) Engine must NOT operate. (3) Recent turbo work — warranty implications. (4) Junior tech not qualified for engine internals.",
            "requires_approval": True,
            "guidance_notes": "DO NOT START ENGINE. Check oil level and look for metal flakes on dipstick. Wait for senior response.",
            "approved_by": None,
            "actual_repair": None,
            "parts_used": None,
            "repair_successful": None,
            "repair_duration_hours": None,
            "online_status": "online",
            "sync_timestamp": None,
            "llm_model": "llama-3.2-3b",
            "llm_version": "v1.0"
        },
    ]


# ═══════════════════════════════════════════════════════════════
# ESCALATION RULES
# ═══════════════════════════════════════════════════════════════

ESCALATION_RULES = [
    # (rule_name, condition_field, operator, threshold, action, priority, notes)
    ("Safety Critical Override",       "safety_critical", "==", "true",  "ESCALATE",               100, "Safety-critical systems always require senior approval"),
    ("Very Low Confidence",            "confidence",      "<",  "0.50",  "ESCALATE",                95, "Very low confidence — do NOT proceed, escalate immediately"),
    ("High Part Cost",                 "part_cost",       ">",  "1000",  "ESCALATE",                90, "Parts exceeding $1000 require senior authorization"),
    ("Warranty High Value",            "warranty_cost",   ">",  "2000",  "ESCALATE",                85, "High-value warranty repairs require senior review"),
    ("Low Confidence",                 "confidence",      "<",  "0.70",  "ESCALATE",                80, "Low diagnostic confidence requires senior review"),
    ("Repeat Failure Flag",            "service_flag",    "==", "RECENT_REPAIR_SAME_COMPONENT", "ESCALATE", 70, "Repeat failures within 90 days need investigation"),
    ("High Confidence + Low Complex",  "confidence",      ">",  "0.85",  "PROCEED",                50, "Routine repairs with high confidence can proceed"),
    ("Medium Conf + Intermediate",     "confidence",      ">",  "0.75",  "PROCEED_WITH_GUIDANCE",   40, "Intermediate techs handle medium-confidence with guidance"),
    ("Junior Tech Override",           "tech_level",      "==", "junior","PROCEED_WITH_GUIDANCE",   30, "Junior techs always receive additional guidance steps"),
    ("Default — Escalate",             "default",         "==", "true",  "ESCALATE",                 0, "When in doubt, escalate to senior for safety"),
]


# ═══════════════════════════════════════════════════════════════
# MAIN SEED FUNCTION
# ═══════════════════════════════════════════════════════════════

def seed_all():
    """Populate every table with synthetic data."""

    conn = get_connection()
    cursor = conn.cursor()

    print("\n=== ServiceSync AI — Seeding Database ===\n")

    # --- Fault codes + causes + edge cases ---
    print("Seeding fault codes...")
    fc_count = 0
    tc_count = 0
    ec_count = 0
    for fc in FAULT_CODES:
        cursor.execute('''
            INSERT OR IGNORE INTO fault_codes
            (cummins_code, spn, fmi, obd2_code, pid_sid, description,
             system_category, complexity, safety_critical, causes_derate,
             qsol_procedure, applies_to)
            VALUES (?,?,?,?,?,?,?,?,?,?,?,?)
        ''', (
            fc["cummins_code"], fc["spn"], fc["fmi"], fc["obd2_code"],
            fc.get("pid_sid"), fc["description"], fc["system_category"],
            fc["complexity"], fc["safety_critical"], fc["causes_derate"],
            fc.get("qsol_procedure"), fc["applies_to"]
        ))
        fault_code_id = cursor.lastrowid
        fc_count += 1

        for cause, prob in fc.get("typical_causes", []):
            cursor.execute(
                'INSERT INTO typical_causes (fault_code_id, cause, probability) VALUES (?,?,?)',
                (fault_code_id, cause, prob))
            tc_count += 1

        for ec in fc.get("edge_cases", []):
            cursor.execute(
                'INSERT INTO edge_cases (fault_code_id, scenario, likely_cause, ai_value_add) VALUES (?,?,?,?)',
                (fault_code_id, ec["scenario"], ec["likely_cause"], ec["ai_value_add"]))
            ec_count += 1

    print(f"  {fc_count} fault codes, {tc_count} typical causes, {ec_count} edge cases")

    # --- Parts catalog ---
    print("Seeding parts catalog...")
    for p in PARTS:
        cursor.execute('''
            INSERT OR IGNORE INTO parts_catalog
            (part_number, part_name, category, compatible_engines, avg_cost,
             warranty_period_days, safety_critical)
            VALUES (?,?,?,?,?,?,?)
        ''', p)
    print(f"  {len(PARTS)} parts")

    # --- Engines ---
    print("Seeding engines...")
    for e in ENGINES:
        cursor.execute('''
            INSERT OR IGNORE INTO engines
            (engine_serial, engine_model, ecm_type, vehicle_type, year, mileage,
             customer_name, location)
            VALUES (?,?,?,?,?,?,?,?)
        ''', e)
    print(f"  {len(ENGINES)} engines")

    # --- Technicians ---
    print("Seeding technicians...")
    for t in TECHNICIANS:
        cursor.execute('''
            INSERT OR IGNORE INTO technicians (tech_id, name, skill_level, email, phone)
            VALUES (?,?,?,?,?)
        ''', t)
    print(f"  {len(TECHNICIANS)} technicians")

    # --- Service history ---
    print("Seeding service history...")
    records = get_service_history_records()
    for r in records:
        cursor.execute('''
            INSERT INTO service_history
            (engine_serial, service_date, fault_code_input, repair_type,
             parts_replaced, part_cost, technician_id, technician_notes,
             warranty_status)
            VALUES (?,?,?,?,?,?,?,?,?)
        ''', (r[0], r[1], r[2], r[3], r[4], r[5], r[6], r[7], r[8]))
    print(f"  {len(records)} service records")

    # --- Cases ---
    print("Seeding cases...")
    cases = get_cases()
    for c in cases:
        cursor.execute('''
            INSERT OR IGNORE INTO cases
            (case_number, engine_serial, customer_id, customer_name, customer_location,
             customer_sla, fault_codes, symptoms, reported_at, status, priority,
             priority_score, assigned_tech_id, safety_critical, fleet_impact,
             warranty_risk, connectivity_status, triage_confidence,
             estimated_repair_hours, actual_repair_hours, resolution, resolved_at)
            VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)
        ''', c)
    print(f"  {len(cases)} cases")

    # --- Decision logs ---
    print("Seeding decision logs...")
    logs = get_decision_logs()
    for log in logs:
        # Resolve fault code ID
        cursor.execute('SELECT id FROM fault_codes WHERE spn = ? AND fmi = ?',
                       tuple(int(x) for x in log["fault_code_input"].replace("SPN ", "").replace("FMI ", "").split()))
        row = cursor.fetchone()
        fc_id = row['id'] if row else None

        cursor.execute('''
            INSERT INTO decision_logs
            (timestamp, engine_serial, fault_code_input, fault_code_id,
             tech_id, tech_skill_level, symptoms, insite_data, environment,
             triage_diagnosis, triage_confidence, triage_reasoning,
             alternative_causes, recommended_tests,
             recent_repairs, service_history_flags, warranty_status,
             escalation_decision, escalation_reasoning, requires_approval,
             guidance_notes, approved_by, actual_repair, parts_used,
             repair_successful, repair_duration_hours,
             online_status, sync_timestamp, llm_model, llm_version)
            VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)
        ''', (
            log["timestamp"], log["engine_serial"], log["fault_code_input"], fc_id,
            log["tech_id"], log["tech_skill_level"], log["symptoms"],
            log.get("insite_data"), log.get("environment"),
            log["triage_diagnosis"], log["triage_confidence"], log["triage_reasoning"],
            log.get("alternative_causes"), log.get("recommended_tests"),
            log.get("recent_repairs"), log.get("service_history_flags"),
            log.get("warranty_status"),
            log["escalation_decision"], log["escalation_reasoning"], log["requires_approval"],
            log.get("guidance_notes"), log.get("approved_by"),
            log.get("actual_repair"), log.get("parts_used"),
            log.get("repair_successful"), log.get("repair_duration_hours"),
            log["online_status"], log.get("sync_timestamp"),
            log["llm_model"], log["llm_version"]
        ))
    print(f"  {len(logs)} decision logs")

    # --- Escalation rules ---
    print("Seeding escalation rules...")
    for r in ESCALATION_RULES:
        cursor.execute('''
            INSERT INTO escalation_rules
            (rule_name, condition_field, operator, threshold_value, action, priority, notes)
            VALUES (?,?,?,?,?,?,?)
        ''', r)
    print(f"  {len(ESCALATION_RULES)} rules")

    conn.commit()

    # --- Summary ---
    print("\n=== Database Summary ===")
    for table in ["fault_codes", "typical_causes", "edge_cases", "engines",
                  "technicians", "service_history", "cases", "decision_logs",
                  "parts_catalog", "escalation_rules"]:
        cursor.execute(f"SELECT COUNT(*) as cnt FROM {table}")
        print(f"  {table}: {cursor.fetchone()['cnt']} rows")

    conn.close()
    print(f"\nDatabase: {os.path.abspath(DB_PATH)}")
    print("Done! Your backend teammate can now import from models.py.\n")


if __name__ == '__main__':
    seed_all()