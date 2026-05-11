from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles
import os
import sys

# allow importing project files
sys.path.append(os.path.abspath(".."))

from run_scan_analysis import run_scan_analysis

app = FastAPI()

# path to reports folder
REPORTS_DIR = os.path.abspath("../reports")

# mount reports folder so browser can access PDFs
app.mount("/reports", StaticFiles(directory=REPORTS_DIR), name="reports")


@app.get("/")
def home():
    return {"message": "MS Detection API Running"}


@app.post("/predict")
async def predict(patient_id: str):

    result = run_scan_analysis(patient_id)

    return {
        "status": "completed",
        "analysis": result,
        "report_path": result["report_path"]
    }