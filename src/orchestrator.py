from agents import TriageAgent, EvidenceAgent, EscalationAgent
from datetime import datetime

class Orchestrator:
    """Coordinates all 3 agents"""
    
    def __init__(self):
        self.triage = TriageAgent()
        self.evidence = EvidenceAgent()
        self.escalation = EscalationAgent()
    
    def diagnose_problem(self, error_code, symptoms, engine_serial, tech_level="intermediate"):
        print(f"\n🔍 ServiceSync AI - Diagnosing {error_code}...")
        print("="*50)
        
        # Step 1: Get service history
        print("\n📋 Step 1: Checking service history...")
        history = self.evidence.get_history(engine_serial)
        print(f"   {history['summary']}")
        
        # Step 2: Diagnose with AI
        print("\n🤖 Step 2: AI Analysis...")
        diagnosis = self.triage.diagnose(
            error_code=error_code,
            symptoms=symptoms,
            context=history['summary']
        )
        print(f"   Diagnosis: {diagnosis['diagnosis']}")
        print(f"   Confidence: {diagnosis['confidence']}%")
        
        # Step 3: Decide escalation
        print("\n⚖️  Step 3: Escalation Decision...")
        decision = self.escalation.decide(
            confidence=diagnosis['confidence'],
            complexity="medium",  # Would be determined by diagnosis
            tech_level=tech_level
        )
        print(f"   Decision: {decision['decision']}")
        print(f"   Reasoning: {decision['reasoning']}")
        
        # Return everything
        return {
            "timestamp": datetime.now().isoformat(),
            "input": {
                "error_code": error_code,
                "symptoms": symptoms,
                "engine_serial": engine_serial,
                "tech_level": tech_level
            },
            "service_history": history,
            "diagnosis": diagnosis,
            "decision": decision
        }


# TEST IT
if __name__ == "__main__":
    orchestrator = Orchestrator()
    
    # Test case
    result = orchestrator.diagnose_problem(
        error_code="P0420",
        symptoms="Rough idle at cold start, black smoke",
        engine_serial="ENG-X15-001",
        tech_level="intermediate"
    )
    
    print("\n" + "="*50)
    print("✅ COMPLETE WORKFLOW SUCCESSFUL!")
    print("\nFinal Recommendation:")
    print(f"   {result['decision']['decision']}")
    print(f"   {result['decision']['reasoning']}")