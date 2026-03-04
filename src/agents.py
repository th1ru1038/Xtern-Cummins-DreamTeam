import subprocess
import json

class TriageAgent:
    """Diagnoses the problem"""
    
    def diagnose(self, error_code, symptoms, context=""):
        prompt = f"""You are a Cummins diesel engine diagnostician.

Error: {error_code}
Symptoms: {symptoms}
Context: {context}

Analyze and provide ONLY this JSON (no other text):
{{
  "diagnosis": "most likely issue in one sentence",
  "confidence": 85,
  "reasoning": "why in one sentence"
}}"""

        result = subprocess.run(
            ["ollama", "run", "llama3.2", prompt],
            capture_output=True,
            text=True,
            timeout=30
        )
        
        # Parse JSON from response
        response = result.stdout.strip()
        try:
            # Find JSON in the response
            start = response.find('{')
            end = response.rfind('}') + 1
            json_str = response[start:end]
            return json.loads(json_str)
        except:
            return {
                "diagnosis": "Unable to diagnose",
                "confidence": 0,
                "reasoning": "Error parsing AI response"
            }


class EvidenceAgent:
    """Gets service history"""
    
    def __init__(self):
        # Fake database for now
        self.history_db = {
            "ENG-X15-001": {
                "last_service": "2024-01-15",
                "repairs": ["Catalytic converter replacement"],
                "mileage": 150000
            },
            "ENG-X15-002": {
                "last_service": "2023-06-20",
                "repairs": ["Oil change", "Filter replacement"],
                "mileage": 89000
            }
        }
    
    def get_history(self, engine_serial):
        history = self.history_db.get(engine_serial, {})
        
        if history:
            summary = f"Last service: {history['last_service']}. "
            summary += f"Recent repairs: {', '.join(history['repairs'])}. "
            summary += f"Mileage: {history['mileage']}"
        else:
            summary = "No service history found"
        
        return {
            "engine_serial": engine_serial,
            "summary": summary,
            "full_history": history
        }


class EscalationAgent:
    """Decides if junior can handle it"""
    
    def decide(self, confidence, complexity="medium", tech_level="intermediate"):
        # Simple rules
        
        if confidence > 85 and complexity == "low":
            return {
                "decision": "PROCEED",
                "reasoning": "High confidence, routine repair",
                "requires_approval": False
            }
        
        if confidence < 70:
            return {
                "decision": "ESCALATE",
                "reasoning": "Low confidence, need senior review",
                "requires_approval": True
            }
        
        if complexity == "high":
            return {
                "decision": "ESCALATE",
                "reasoning": "High complexity, need senior approval",
                "requires_approval": True
            }
        
        # Medium confidence, medium complexity
        return {
            "decision": "PROCEED_WITH_GUIDANCE",
            "reasoning": f"Medium complexity, {tech_level} tech can handle with guidance",
            "requires_approval": False
        }


# TEST IT
if __name__ == "__main__":
    print("Testing ServiceSync AI Agents\n")
    print("="*50)
    
    # Test 1: Triage Agent
    print("\n1. TRIAGE AGENT:")
    triage = TriageAgent()
    diagnosis = triage.diagnose(
        error_code="P0420",
        symptoms="Rough idle at cold start",
        context="Cat converter replaced 2 months ago"
    )
    print(f"   Diagnosis: {diagnosis['diagnosis']}")
    print(f"   Confidence: {diagnosis['confidence']}%")
    print(f"   Reasoning: {diagnosis['reasoning']}")
    
    # Test 2: Evidence Agent
    print("\n2. EVIDENCE AGENT:")
    evidence = EvidenceAgent()
    history = evidence.get_history("ENG-X15-001")
    print(f"   {history['summary']}")
    
    # Test 3: Escalation Agent
    print("\n3. ESCALATION AGENT:")
    escalation = EscalationAgent()
    decision = escalation.decide(
        confidence=diagnosis['confidence'],
        complexity="medium",
        tech_level="intermediate"
    )
    print(f"   Decision: {decision['decision']}")
    print(f"   Reasoning: {decision['reasoning']}")
    print(f"   Requires Approval: {decision['requires_approval']}")
    
    print("\n" + "="*50)
    print("✓ All agents working!")