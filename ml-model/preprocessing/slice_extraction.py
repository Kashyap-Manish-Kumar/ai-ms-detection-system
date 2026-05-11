import os
import nibabel as nib
import numpy as np
import cv2

# -----------------------------
# Base Project Directory
# -----------------------------
BASE_DIR = os.path.dirname(os.path.dirname(__file__))

# Dataset Paths
RAW_DATASET = os.path.join(BASE_DIR, "dataset", "raw", "dataset")

PROCESSED_IMAGES = os.path.join(BASE_DIR, "dataset", "processed", "images")
PROCESSED_MASKS = os.path.join(BASE_DIR, "dataset", "processed", "masks")

# -----------------------------
# Create output folders
# -----------------------------
os.makedirs(PROCESSED_IMAGES, exist_ok=True)
os.makedirs(PROCESSED_MASKS, exist_ok=True)

print("\n================================")
print("MRI SLICE EXTRACTION STARTED")
print("================================\n")

slice_counter = 0
patient_counter = 0

# -----------------------------
# Loop through patients
# -----------------------------
for patient in sorted(os.listdir(RAW_DATASET)):

    patient_path = os.path.join(RAW_DATASET, patient)

    if not os.path.isdir(patient_path):
        continue

    flair_file = None
    mask_file = None

    # Find required files
    for file in os.listdir(patient_path):

        if "Flair.nii" in file and "LesionSeg" not in file:
            flair_file = os.path.join(patient_path, file)

        if "LesionSeg-Flair.nii" in file:
            mask_file = os.path.join(patient_path, file)

    if flair_file is None or mask_file is None:
        print(f"Skipping {patient} (missing MRI or mask)")
        continue

    print(f"\nProcessing {patient}")

    try:
        flair_img = nib.load(flair_file).get_fdata()
        mask_img = nib.load(mask_file).get_fdata()

    except Exception as e:
        print(f"Error loading files for {patient}: {e}")
        continue

    depth = flair_img.shape[2]

    # -----------------------------
    # Loop through slices
    # -----------------------------
    for i in range(depth):

        try:
            mri_slice = flair_img[:, :, i]
            mask_slice = mask_img[:, :, i]

            # Normalize MRI
            mri_slice = (mri_slice - np.min(mri_slice)) / (
                np.max(mri_slice) - np.min(mri_slice) + 1e-8
            )

            # Resize
            mri_slice = cv2.resize(mri_slice, (128, 128))
            mask_slice = cv2.resize(mask_slice, (128, 128))

            image_name = f"{patient}_slice_{i}.png"
            mask_name = f"{patient}_slice_{i}.png"

            img_path = os.path.join(PROCESSED_IMAGES, image_name)
            mask_path = os.path.join(PROCESSED_MASKS, mask_name)

            cv2.imwrite(img_path, (mri_slice * 255).astype(np.uint8))
            cv2.imwrite(mask_path, (mask_slice * 255).astype(np.uint8))

            slice_counter += 1

        except Exception as e:
            print(f"Slice error {patient} slice {i}: {e}")
            continue

    patient_counter += 1
    print(f"{patient} completed ({depth} slices)")

# -----------------------------
# Final Report
# -----------------------------
print("\n================================")
print("PROCESSING COMPLETED")
print("================================")

print(f"Patients Processed : {patient_counter}")
print(f"Total Slices Saved : {slice_counter}")

print("\nImages Folder :", PROCESSED_IMAGES)
print("Masks Folder  :", PROCESSED_MASKS)