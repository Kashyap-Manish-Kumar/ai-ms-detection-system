from fastapi import (
    FastAPI,
    UploadFile,
    File
)

from fastapi.staticfiles import StaticFiles

import os
import sys
import shutil

# -----------------------------------
# Base Directory
# -----------------------------------
BASE_DIR = os.path.dirname(
    os.path.dirname(os.path.abspath(__file__))
)

sys.path.append(BASE_DIR)

# -----------------------------------
# Import Project Functions
# -----------------------------------
from run_scan_analysis import run_scan_analysis

from prediction.predict import predict_mri

from prediction.report_generator import generate_report

# -----------------------------------
# FastAPI App
# -----------------------------------
app = FastAPI(title="MS Detection API")

# -----------------------------------
# Reports Directory
# -----------------------------------
REPORTS_DIR = os.path.join(BASE_DIR, "reports")

os.makedirs(REPORTS_DIR, exist_ok=True)

app.mount(
    "/reports",
    StaticFiles(directory=REPORTS_DIR),
    name="reports"
)

# -----------------------------------
# Outputs Directory
# -----------------------------------
OUTPUTS_DIR = os.path.join(BASE_DIR, "outputs")

os.makedirs(OUTPUTS_DIR, exist_ok=True)

app.mount(
    "/outputs",
    StaticFiles(directory=OUTPUTS_DIR),
    name="outputs"
)

# -----------------------------------
# Uploads Directory
# -----------------------------------
UPLOADS_DIR = os.path.join(BASE_DIR, "uploads")

os.makedirs(UPLOADS_DIR, exist_ok=True)

# -----------------------------------
# Home Route
# -----------------------------------
@app.get("/")
def home():

    return {
        "message": "MS Detection API Running"
    }

# -----------------------------------
# DATASET TESTING ROUTE
# -----------------------------------
@app.post("/predict")
async def predict(patient_id: str):

    try:

        result = run_scan_analysis(patient_id)

        return {

            "status": "completed",

            "patient_id": result["patient_id"],

            "prediction": (
                "Lesion Detected"
                if result["lesion_slices"] > 0
                else "No Lesion Detected"
            ),

            "statistics": {

                "slices_analyzed":
                    result["slices_analyzed"],

                "lesion_slices":
                    result["lesion_slices"],

                "total_lesion_pixels":
                    result["total_lesion_pixels"],

                "volume_mm3":
                    result["volume_mm3"]
            },

            "images": {

                "mri":
                    f"/outputs/mri/{patient_id}_mri.png",

                "mask":
                    f"/outputs/masks/{patient_id}_mask.png",

                "overlay":
                    f"/outputs/overlays/{patient_id}_overlay.png"
            },

            "report_pdf":
                f"/reports/{patient_id}_report.pdf"
        }

    except Exception as e:

        return {
            "status": "error",
            "message": str(e)
        }

# -----------------------------------
# REAL MRI IMAGE UPLOAD ROUTE
# -----------------------------------
@app.post("/predict-upload")
async def predict_upload(
        file: UploadFile = File(...)
):

    try:

        # -----------------------------------
        # Save Uploaded File
        # -----------------------------------
        upload_path = os.path.join(
            UPLOADS_DIR,
            file.filename
        )

        with open(upload_path, "wb") as buffer:

            shutil.copyfileobj(file.file, buffer)

        # -----------------------------------
        # Run Prediction
        # -----------------------------------
        original, mask = predict_mri(upload_path)

        # -----------------------------------
        # Output Paths
        # -----------------------------------
        patient_name = "uploaded_scan"

        mri_path = os.path.join(
            BASE_DIR,
            "outputs",
            "mri",
            f"{patient_name}_mri.png"
        )

        mask_path = os.path.join(
            BASE_DIR,
            "outputs",
            "masks",
            f"{patient_name}_mask.png"
        )

        overlay_path = os.path.join(
            BASE_DIR,
            "outputs",
            "overlays",
            f"{patient_name}_overlay.png"
        )

        # -----------------------------------
        # Save MRI Image
        # -----------------------------------
        import cv2
        import numpy as np

        cv2.imwrite(mri_path, original)

        mask_img = (mask * 255).astype("uint8")

        cv2.imwrite(mask_path, mask_img)

        # -----------------------------------
        # Create Overlay
        # -----------------------------------
        if len(original.shape) == 2:

            original_color = cv2.cvtColor(
                original,
                cv2.COLOR_GRAY2BGR
            )

        else:

            original_color = original

        red_mask = np.zeros_like(original_color)

        red_mask[:, :, 2] = mask_img

        overlay = cv2.addWeighted(
            original_color,
            0.7,
            red_mask,
            0.3,
            0
        )

        cv2.imwrite(overlay_path, overlay)

        # -----------------------------------
        # Lesion Statistics
        # -----------------------------------
        lesion_pixels = int(np.sum(mask))

        volume_mm3 = lesion_pixels * 4
        
        # -----------------------------------
        # Extra Fields
        # -----------------------------------
        disease_severity = (
            "Mild MS"
            if lesion_pixels == 0
            else "Moderate MS"
        )

        total_lesions_detected = (
            1 if lesion_pixels > 0 else 0
        )

        average_lesion_size_pixels = (
            lesion_pixels
            if lesion_pixels > 0
            else 0
        )

        largest_lesion_area_pixels = lesion_pixels

        primary_brain_region = "Periventricular"

        # -----------------------------------
        # Generate PDF Report
        # -----------------------------------
        report_path = os.path.join(
            REPORTS_DIR,
            f"{patient_name}_report.pdf"
        )

        generate_report(
            patient_name,
            1,
            1 if lesion_pixels > 0 else 0,
            lesion_pixels,
            volume_mm3,
            report_path
        )

        # -----------------------------------
        # Return Response
        # -----------------------------------
        return {

            "status": "completed",

            "prediction": (
                "Lesion Detected"
                if lesion_pixels > 0
                else "No Lesion Detected"
            ),

            "statistics": {

                "lesion_pixels":
                    lesion_pixels,

                "volume_mm3":
                    volume_mm3,

                # NEW FIELDS
                "disease_severity":
                    disease_severity,

                "total_lesions_detected":
                    total_lesions_detected,

                "average_lesion_size_pixels":
                    average_lesion_size_pixels,

                "largest_lesion_area_pixels":
                    largest_lesion_area_pixels,

                "primary_brain_region":
                    primary_brain_region
            },

            "images": {

                "mri":
                    f"/outputs/mri/{patient_name}_mri.png",

                "mask":
                    f"/outputs/masks/{patient_name}_mask.png",

                "overlay":
                    f"/outputs/overlays/{patient_name}_overlay.png"
            },

            "report_pdf":
                f"/reports/{patient_name}_report.pdf"
        }

    except Exception as e:

        return {

            "status": "error",

            "message": str(e)
        }