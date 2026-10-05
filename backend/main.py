from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
from parser import analyze_configuration, simulate_remediation
from pydantic import BaseModel
from typing import Dict, Any

app = FastAPI(title="PRAHARI Compliance API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class SimulationRequest(BaseModel):
    normalized_model: Dict[str, Any]
    target_intent_key: str
    expected_value: Any

@app.post("/api/upload")
async def upload_configuration(file: UploadFile = File(...)):
    content = await file.read()
    text_content = content.decode("utf-8")
    
    # Process through our Normalization Engine
    results = analyze_configuration(file.filename, text_content)
    return results

@app.post("/api/simulate")
async def run_simulation(request: SimulationRequest):
    results = simulate_remediation(request.normalized_model, request.target_intent_key, request.expected_value)
    return results

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
