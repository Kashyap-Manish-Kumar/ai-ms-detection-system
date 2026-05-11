import os
import numpy as np
import cv2

from prediction.predict import predict_mri
from prediction.report_generator import generate_report



def run_scan_analysis(patient_id):

    folder = "../dataset/processed/images"

    print("Starting MRI scan analysis...\n")

    files = sorted(os.listdir(folder))

    patient_files = [f for f in files if f.startswith(f"{patient_id}_")]

    results = []
    total_pixels = 0
    first_saved = False

    for file in patient_files:

        image_path = os.path.join(folder, file)

        original, mask = predict_mri(image_path)

        lesion_pixels = int(np.sum(mask))
        total_pixels += lesion_pixels

        results.append({
            "slice": file,
            "lesion_pixels": lesion_pixels
        })

        print(f"{file} → lesion pixels: {lesion_pixels}")

        if lesion_pixels > 0 and not first_saved:

            print("Saving visualization images from:", file)

            cv2.imwrite("mri_slice.png", original)

            mask_img = (mask * 255).astype("uint8")
            cv2.imwrite("lesion_mask.png", mask_img)

            if len(original.shape) == 2:
                original_color = cv2.cvtColor(original, cv2.COLOR_GRAY2BGR)
            else:
                original_color = original

            red_mask = np.zeros_like(original_color)
            red_mask[:, :, 2] = mask_img

            overlay = cv2.addWeighted(original_color, 0.7, red_mask, 0.3, 0)

            cv2.imwrite("lesion_overlay.png", overlay)

            first_saved = True

    slices_analyzed = len(results)

    lesion_slices = sum(
        1 for r in results if r["lesion_pixels"] > 0
    )

    volume_mm3 = total_pixels * 4

    print("\nFINAL SUMMARY\n")

    print("Patient:", patient_id)
    print("Slices analyzed:", slices_analyzed)
    print("Lesion slices:", lesion_slices)
    print("Total lesion pixels:", total_pixels)
    print("Estimated lesion volume:", volume_mm3, "mm³")

    # -----------------------------
    # Save report per patient
    # -----------------------------

    report_folder = "../reports"
    os.makedirs(report_folder, exist_ok=True)

    report_path = os.path.join(report_folder, f"{patient_id}_report.pdf")

    generate_report(
        patient_id,
        slices_analyzed,
        lesion_slices,
        total_pixels,
        volume_mm3,
        report_path
    )

    return {
        "patient_id": patient_id,
        "slices_analyzed": slices_analyzed,
        "lesion_slices": lesion_slices,
        "total_lesion_pixels": total_pixels,
        "volume_mm3": volume_mm3,
        "report_path": report_path
    }


if __name__ == "__main__":
    run_scan_analysis("Patient-4")
    
#cd api
#uvicorn app:app --reload