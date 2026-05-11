import os
import nibabel as nib

# -----------------------------
# Project base directory
# -----------------------------
base_dir = os.path.dirname(os.path.dirname(__file__))

# Dataset path
dataset_path = os.path.join(base_dir, "dataset", "raw", "dataset")

print("\nScanning Dataset...\n")

# -----------------------------
# Counters
# -----------------------------
total_patients = 0
total_mri_files = 0
total_slices = 0

# -----------------------------
# Scan patient folders
# -----------------------------
for patient in os.listdir(dataset_path):

    patient_path = os.path.join(dataset_path, patient)

    if os.path.isdir(patient_path):

        total_patients += 1
        print(f"\nPatient Folder: {patient}")

        for file in os.listdir(patient_path):

            if file.endswith(".nii"):

                file_path = os.path.join(patient_path, file)

                try:
                    img = nib.load(file_path)
                    data = img.get_fdata()

                    slices = data.shape[2]

                    total_mri_files += 1
                    total_slices += slices

                    print(f"   File: {file}")
                    print(f"   Shape: {data.shape}")
                    print(f"   Slices: {slices}\n")

                except Exception as e:
                    print(f"Error reading {file}: {e}")

# -----------------------------
# Final Dataset Summary
# -----------------------------
print("\n===================================")
print("DATASET SUMMARY")
print("===================================")

print("Total Patients:", total_patients)
print("Total MRI Files:", total_mri_files)
print("Total Brain Slices:", total_slices)

if total_mri_files > 0:
    print("Average slices per MRI:", total_slices // total_mri_files)

print("===================================\n")
