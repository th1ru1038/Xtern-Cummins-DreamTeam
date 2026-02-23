import subprocess

def diagnose(error_code, symptoms):
    prompt = f"""You are a Cummins diesel engine diagnostician.

Error: {error_code}
Symptoms: {symptoms}

Provide ONLY:
1. Most likely issue (one sentence)
2. Confidence: 0-100%

Be concise."""

    result = subprocess.run(
        ["ollama", "run", "llama3.2", prompt],
        capture_output=True,
        text=True
    )
    
    return result.stdout.strip()

# Test it
print(diagnose("P0420", "rough idle at cold start"))