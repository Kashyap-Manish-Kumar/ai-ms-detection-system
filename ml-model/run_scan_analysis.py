import os
import numpy as np
import cv2

from prediction.predict import predict_mri
from prediction.report_generator import generate_report

# -----------------------------------
# Base Directory
# -----------------------------------
BASE_DIR = os.path.dirname(os.path.abspath(__file__))

# -----------------------------------
# Dataset Folder
# -----------------------------------
DATASET_FOLDER = os.path.join(
    BASE_DIR,
    "dataset",
    "processed",
    "images"
)

# -----------------------------------
# Reports Folder
# -----------------------------------
REPORTS_FOLDER = os.path.join(BASE_DIR, "reports")

# -----------------------------------
# Outputs Folders
# -----------------------------------
MRI_OUTPUT = os.path.join(BASE_DIR, "outputs", "mri")

MASK_OUTPUT = os.path.join(BASE_DIR, "outputs", "masks")

OVERLAY_OUTPUT = os.path.join(BASE_DIR, "outputs", "overlays")

# -----------------------------------
# Create Folders
# -----------------------------------
os.makedirs(REPORTS_FOLDER, exist_ok=True)

os.makedirs(MRI_OUTPUT, exist_ok=True)

os.makedirs(MASK_OUTPUT, exist_ok=True)

os.makedirs(OVERLAY_OUTPUT, exist_ok=True)

# -----------------------------------
# Save Visualization Images
# -----------------------------------
def save_visualizations(
        patient_id,
        original,
        mask
):

    # MRI image path
    mri_path = os.path.join(
        MRI_OUTPUT,
        f"{patient_id}_mri.png"
    )

    # Mask image path
    mask_path = os.path.join(
        MASK_OUTPUT,
        f"{patient_id}_mask.png"
    )

    # Overlay image path
    overlay_path = os.path.join(
        OVERLAY_OUTPUT,
        f"{patient_id}_overlay.png"
    )

    # Save MRI image
    cv2.imwrite(mri_path, original)

    # Convert mask
    mask_img = (mask * 255).astype("uint8")

    # Save mask image
    cv2.imwrite(mask_path, mask_img)

    # Convert grayscale MRI to color
    if len(original.shape) == 2:

        original_color = cv2.cvtColor(
            original,
            cv2.COLOR_GRAY2BGR
        )

    else:

        original_color = original

    # Create red mask
    red_mask = np.zeros_like(original_color)

    red_mask[:, :, 2] = mask_img

    # Blend overlay
    overlay = cv2.addWeighted(
        original_color,
        0.7,
        red_mask,
        0.3,
        0
    )

    # Save overlay
    cv2.imwrite(overlay_path, overlay)


# -----------------------------------
# DATASET ANALYSIS
# -----------------------------------
def run_scan_analysis(patient_id):

    print("Starting MRI scan analysis...\n")

    files = sorted(os.listdir(DATASET_FOLDER))

    patient_files = [

        f for f in files

        if f.startswith(f"{patient_id}_")
    ]

    # No files found
    if len(patient_files) == 0:

        raise ValueError(
            f"No MRI slices found for patient: {patient_id}"
        )

    results = []

    total_pixels = 0

    first_saved = False

    # -----------------------------------
    # Process Each MRI Slice
    # -----------------------------------
    for file in patient_files:

        image_path = os.path.join(
            DATASET_FOLDER,
            file
        )

        original, mask = predict_mri(image_path)

        lesion_pixels = int(np.sum(mask))

        total_pixels += lesion_pixels

        results.append({

            "slice": file,

            "lesion_pixels": lesion_pixels
        })

        print(f"{file} → lesion pixels: {lesion_pixels}")

        # -----------------------------------
        # Save First Lesion Visualization
        # -----------------------------------
        if lesion_pixels > 0 and not first_saved:

            save_visualizations(
                patient_id,
                original,
                mask
            )

            first_saved = True

    # -----------------------------------
    # Statistics
    # -----------------------------------
    slices_analyzed = len(results)

    lesion_slices = sum(

        1 for r in results

        if r["lesion_pixels"] > 0
    )

    volume_mm3 = total_pixels * 4

    print("\nFINAL SUMMARY\n")

    print("Patient:", patient_id)

    print("Slices analyzed:", slices_analyzed)

    print("Lesion slices:", lesion_slices)

    print("Total lesion pixels:", total_pixels)

    print("Estimated lesion volume:", volume_mm3, "mm³")

    # -----------------------------------
    # Generate Report
    # -----------------------------------
    report_path = os.path.join(
        REPORTS_FOLDER,
        f"{patient_id}_report.pdf"
    )

    generate_report(
        patient_id,
        slices_analyzed,
        lesion_slices,
        total_pixels,
        volume_mm3,
        report_path
    )

    # -----------------------------------
    # Return Response
    # -----------------------------------
    return {

        "patient_id": patient_id,

        "slices_analyzed": slices_analyzed,

        "lesion_slices": lesion_slices,

        "total_lesion_pixels": total_pixels,

        "volume_mm3": volume_mm3,

        "report_path":
            f"/reports/{patient_id}_report.pdf",

        "images": {

            "mri":
                f"/outputs/mri/{patient_id}_mri.png",

            "mask":
                f"/outputs/masks/{patient_id}_mask.png",

            "overlay":
                f"/outputs/overlays/{patient_id}_overlay.png"
        }
    }


# -----------------------------------
# UPLOADED MRI ANALYSIS
# -----------------------------------
def analyze_uploaded_scan(
        image_path,
        patient_id="uploaded_scan"
):

    print("Analyzing uploaded MRI scan...\n")

    # -----------------------------------
    # Predict
    # -----------------------------------
    original, mask = predict_mri(image_path)

    lesion_pixels = int(np.sum(mask))

    volume_mm3 = lesion_pixels * 4

    lesion_detected = lesion_pixels > 0

    # -----------------------------------
    # Save Images
    # -----------------------------------
    save_visualizations(
        patient_id,
        original,
        mask
    )

    # -----------------------------------
    # Generate Report
    # -----------------------------------
    report_path = os.path.join(
        REPORTS_FOLDER,
        f"{patient_id}_report.pdf"
    )

    generate_report(
        patient_id,
        1,
        1 if lesion_detected else 0,
        lesion_pixels,
        volume_mm3,
        report_path
    )

    print("\nUPLOAD SCAN SUMMARY\n")

    print("Patient:", patient_id)

    print("Lesion Pixels:", lesion_pixels)

    print("Estimated Volume:", volume_mm3)

    # -----------------------------------
    # Return Response
    # -----------------------------------
    return {

        "patient_id": patient_id,

        "prediction": (
            "Lesion Detected"
            if lesion_detected
            else "No Lesion Detected"
        ),

        "lesion_pixels": lesion_pixels,

        "volume_mm3": volume_mm3,

        "report_path":
            f"/reports/{patient_id}_report.pdf",

        "images": {

            "mri":
                f"/outputs/mri/{patient_id}_mri.png",

            "mask":
                f"/outputs/masks/{patient_id}_mask.png",

            "overlay":
                f"/outputs/overlays/{patient_id}_overlay.png"
        }
    }


# -----------------------------------
# Run Directly
# -----------------------------------
if __name__ == "__main__":

    run_scan_analysis("Patient-4")

# -----------------------------------
# Run API
# cd api
# uvicorn app:app --reload
# -----------------------------------