import os
import numpy as np
import cv2

from prediction.predict import predict_mri
from prediction.visualization import create_overlay


def analyze_scan(folder_path):

    slice_results = []
    total_lesion_pixels = 0

    files = sorted(os.listdir(folder_path))

    first_saved = False

    for file in files:

        if not file.endswith(".png"):
            continue

        image_path = os.path.join(folder_path, file)

        original, mask = predict_mri(image_path)

        lesion_pixels = int(np.sum(mask))

        total_lesion_pixels += lesion_pixels

        slice_results.append({
            "slice": file,
            "lesion_pixels": lesion_pixels
        })

        print(f"{file} → lesion pixels: {lesion_pixels}")

        # Save example images for report
        if not first_saved:

            cv2.imwrite("mri_image.png", original)

            cv2.imwrite("lesion_mask.png", mask * 255)

            create_overlay(original, mask)

            first_saved = True

    return slice_results, total_lesion_pixels