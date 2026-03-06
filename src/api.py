"""
ServiceSync AI — FastAPI Server
================================
Connects the React frontend to the Python backend + Llama 3.2.

Run:
    uvicorn src.api:app --reload --port 8000

Endpoints:
    GET  /api/technician/{technician_id}   — tech profile + assigned fault code
    POST /api/junior/chat                  — voice/chat diagnostic session via Llama 3.2
    POST /api/junior/report                — save session to decision_logs for senior review
    GET  /api/escalations/pending          — cases awaiting senior approval
"""

import sys
import os
import subprocess
import json
from typing import Optional

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

# ── sys.path: make backend/database importable ────────────
# Points to <project-root>/backend so "from database.models import ..."
# resolves to backend/database/models.py (DB_PATH → backend/servicesync.db)
_BACKEND_DIR = os.path.join(os.path.dirname(os.path.abspath(__file__)), '..', 'backend')
sys.path.insert(0, _BACKEND_DIR)

from database.models import (
    resolve_fault_code,
    get_technician,
    get_available_technicians,
    get_service_history,
    log_decision,
    get_pending_escalations,
    get_open_cases,
    get_connection,
)

# ── FastAPI app ───────────────────────────────────────────
app = FastAPI(title="ServiceSync AI", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# ══════════════════════════════════════════════════════════
# Llama 3.2 helper  (same pattern as src/agents.py)
# ══════════════════════════════════════════════════════════

def call_llama(prompt: str, timeout: int = 60) -> str:
    """Call Llama 3.2 via Ollama subprocess. Fully offline — no external APIs."""
    try:
        result = subprocess.run(
            ["ollama", "run", "llama3.2"],
            input=prompt,
            capture_output=True,
            text=True,
            timeout=timeout,
        )
        output = result.stdout.strip()
        if not output:
            return "Could you describe what you're seeing on the engine right now?"
        return output
    except subprocess.TimeoutExpired:
        return "I need a moment to think. Could you repeat your last observation?"
    except FileNotFoundError:
        raise HTTPException(
            status_code=503,
            detail="Ollama is not installed or not on PATH. Run: brew install ollama && ollama pull llama3.2",
        )
    except Exception as e:
        return f"AI temporarily unavailable. Please continue your inspection and try again."


# ══════════════════════════════════════════════════════════
# Pydantic request models
# ══════════════════════════════════════════════════════════

class ChatRequest(BaseModel):
    technician_id: str
    fault_code: str
    user_message: str
    conversation_history: list[dict] = []


class ReportRequest(BaseModel):
    technician_id: str
    fault_code: str
    transcript: list[dict] = []
    confidence: float = 0.0
    diagnosis: str = ""
    engine_serial: Optional[str] = None


# ══════════════════════════════════════════════════════════
# 1. GET /api/technician/{technician_id}
# ══════════════════════════════════════════════════════════

@app.get("/api/technician/{technician_id}")
def get_technician_profile(technician_id: str):
    """
    Return technician profile including:
    - name, skill_level
    - assigned fault code (from their most recent open case)
    - past case count (from decision_logs)
    """
    tech = get_technician(technician_id)
    if not tech:
        raise HTTPException(status_code=404, detail=f"Technician '{technician_id}' not found.")

    # ── Find the tech's most recent open/assigned case ────
    assigned_fault_code = None
    assigned_case = None
    try:
        open_cases = get_open_cases()
        for case in open_cases:
            if case.get("assigned_tech_id") == technician_id:
                raw_faults = case.get("fault_codes")
                # fault_codes may be stored as JSON array string
                try:
                    parsed = json.loads(raw_faults)
                    assigned_fault_code = parsed[0] if isinstance(parsed, list) and parsed else raw_faults
                except (json.JSONDecodeError, TypeError):
                    assigned_fault_code = raw_faults
                assigned_case = case
                break
    except Exception:
        pass  # cases table might be empty — that's fine

    # ── Resolve fault code details from fault_codes table ─
    fault_code_detail = None
    if assigned_fault_code:
        fault_code_detail = resolve_fault_code(assigned_fault_code)

    # ── Count past cases from decision_logs ───────────────
    past_case_count = 0
    try:
        conn = get_connection()
        cursor = conn.cursor()
        cursor.execute(
            "SELECT COUNT(*) FROM decision_logs WHERE tech_id = ?",
            (technician_id,),
        )
        past_case_count = cursor.fetchone()[0]
        conn.close()
    except Exception:
        pass

    return {
        "technician_id": tech["tech_id"],
        "name": tech["name"],
        "skill_level": tech["skill_level"],
        "email": tech.get("email"),
        "assigned_fault_code": assigned_fault_code,
        "fault_code_detail": fault_code_detail,
        "assigned_case": assigned_case,
        "past_case_count": past_case_count,
    }


# ══════════════════════════════════════════════════════════
# 2. POST /api/junior/chat
# ══════════════════════════════════════════════════════════

SYSTEM_INSTRUCTION = (
    "You are Jamie, a friendly AI mentor helping a junior diesel technician. "
    "Speak like a knowledgeable colleague, not a manual. Use simple words. "
    "Ask only ONE short question at a time. Never list steps. Be encouraging. "
    "Max 2 sentences per response."
)


@app.post("/api/junior/chat")
def junior_chat(req: ChatRequest):
    """
    Voice/chat diagnostic session.
    Builds a prompt with fault-code context + conversation history,
    calls Llama 3.2, returns the AI response with confidence estimate.
    """
    # ── Look up fault code from DB ────────────────────────
    fault_info = resolve_fault_code(req.fault_code)
    fault_desc = "Unknown fault code"
    typical_causes = []
    if fault_info:
        fault_desc = fault_info.get("description", fault_desc)
        typical_causes = [c["cause"] for c in fault_info.get("typical_causes", [])]

    # ── Get technician skill level ────────────────────────
    tech = get_technician(req.technician_id)
    skill_level = tech["skill_level"] if tech else "junior"

    # ── Build the full prompt ─────────────────────────────
    prompt_parts = [
        f"SYSTEM: {SYSTEM_INSTRUCTION}",
        "",
        f"FAULT CODE: {req.fault_code}",
        f"DESCRIPTION: {fault_desc}",
    ]
    if typical_causes:
        prompt_parts.append(f"TYPICAL CAUSES: {', '.join(typical_causes)}")
    prompt_parts.extend([
        f"TECHNICIAN SKILL LEVEL: {skill_level}",
        "",
    ])

    # Append full conversation history
    for msg in req.conversation_history:
        role = msg.get("role", "user")
        text = msg.get("content", "")
        label = "TECHNICIAN" if role == "user" else "AI MENTOR"
        prompt_parts.append(f"{label}: {text}")

    # Append the current user message
    prompt_parts.append(f"TECHNICIAN: {req.user_message}")
    prompt_parts.append("AI MENTOR:")

    prompt = "\n".join(prompt_parts)

    # ── Call Llama 3.2 ────────────────────────────────────
    response = call_llama(prompt)

    # ── Estimate confidence from conversation depth ───────
    turn_count = len(req.conversation_history) // 2 + 1
    base_confidence = min(0.3 + turn_count * 0.1, 0.95)

    diagnostic_keywords = [
        "replaced", "checked", "measured", "tested", "confirmed",
        "voltage", "pressure", "temperature", "reading", "found",
        "inspected", "verified", "ohms", "psi", "degrees",
    ]
    user_lower = req.user_message.lower()
    keyword_hits = sum(1 for kw in diagnostic_keywords if kw in user_lower)
    confidence = min(base_confidence + keyword_hits * 0.05, 0.98)

    # ── Determine if escalation is needed ─────────────────
    should_escalate = False
    escalation_keywords = [
        "dangerous", "unsafe", "smoke", "fire", "leak", "crack",
        "snap", "explosion", "sparking", "overheating",
    ]
    if any(kw in user_lower for kw in escalation_keywords):
        should_escalate = True
    if confidence < 0.4 and turn_count > 5:
        should_escalate = True

    return {
        "response": response,
        "confidence": round(confidence, 2),
        "should_escalate": should_escalate,
    }


# ══════════════════════════════════════════════════════════
# 3. POST /api/junior/report
# ══════════════════════════════════════════════════════════

@app.post("/api/junior/report")
def junior_report(req: ReportRequest):
    """
    Save completed voice session to decision_logs.
    Marks the case as requiring senior approval.
    """
    # ── Build transcript text for storage ─────────────────
    transcript_text = ""
    if req.transcript:
        transcript_text = "\n".join(
            f"{'Tech' if m.get('role') == 'user' else 'AI'}: {m.get('content', '')}"
            for m in req.transcript
        )

    engine_serial = req.engine_serial or "UNASSIGNED"

    # ── Get technician info ───────────────────────────────
    tech = get_technician(req.technician_id)
    skill_level = tech["skill_level"] if tech else "junior"

    # ── Decide escalation type based on confidence ────────
    if req.confidence >= 0.8:
        escalation_decision = "PROCEED_WITH_GUIDANCE"
    elif req.confidence >= 0.5:
        escalation_decision = "PROCEED_WITH_GUIDANCE"
    else:
        escalation_decision = "ESCALATE"

    # Senior always reviews junior technician work
    requires_approval = True

    # ── Write to decision_logs via models.py ──────────────
    decision_id = log_decision(
        engine_serial=engine_serial,
        fault_code_input=req.fault_code,
        tech_id=req.technician_id,
        tech_skill_level=skill_level,
        symptoms=transcript_text,
        triage_diagnosis=req.diagnosis or "Pending senior review",
        triage_confidence=req.confidence,
        triage_reasoning=f"Junior voice session — {len(req.transcript)} conversation turns",
        escalation_decision=escalation_decision,
        escalation_reasoning="Junior technician work requires senior approval per policy",
        requires_approval=requires_approval,
        guidance_notes=f"Full transcript: {len(req.transcript)} turns. Confidence: {req.confidence:.0%}",
        llm_model="llama-3.2-3b",
        llm_version="v1.0",
    )

    return {
        "status": "sent_to_senior",
        "case_id": decision_id,
    }


# ══════════════════════════════════════════════════════════
# 4. GET /api/escalations/pending
# ══════════════════════════════════════════════════════════

@app.get("/api/escalations/pending")
def pending_escalations():
    """Return all decisions awaiting senior approval."""
    results = get_pending_escalations()
    return {
        "escalations": results,
        "count": len(results),
    }


# ══════════════════════════════════════════════════════════
# Health check
# ══════════════════════════════════════════════════════════

@app.get("/api/health")
def health_check():
    """Quick health check for frontend connectivity testing."""
    ollama_ok = False
    try:
        result = subprocess.run(
            ["ollama", "list"],
            capture_output=True,
            text=True,
            timeout=5,
        )
        ollama_ok = result.returncode == 0
    except Exception:
        pass

    db_ok = False
    try:
        conn = get_connection()
        conn.execute("SELECT 1")
        conn.close()
        db_ok = True
    except Exception:
        pass

    return {
        "status": "ok",
        "ollama": ollama_ok,
        "database": db_ok,
    }


# ══════════════════════════════════════════════════════════
# Entrypoint
# ══════════════════════════════════════════════════════════

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("src.api:app", host="0.0.0.0", port=8000, reload=True)
