import os
import nibabel as nib
import numpy as np
import matplotlib

# Use non-interactive backend
matplotlib.use("Agg")

import matplotlib.pyplot as plt

# -----------------------------
# Project base directory
# -----------------------------
base_dir = os.path.dirname(os.path.dirname(__file__))

# -----------------------------
# MRI file path
# -----------------------------
mri_path = os.path.join(
    base_dir,
    "dataset",
    "raw",
    "dataset",
    "Patient-1",
    "1-Flair.nii"
)

print("MRI Path:", mri_path)

# -----------------------------
# Check file exists
# -----------------------------
if not os.path.exists(mri_path):
    print("ERROR: MRI file not found!")
    exit()

# -----------------------------
# Load MRI
# -----------------------------
mri_image = nib.load(mri_path)
mri_data = mri_image.get_fdata()

print("MRI Shape:", mri_data.shape)

# -----------------------------
# Extract middle slice
# -----------------------------
slice_index = mri_data.shape[2] // 2
slice_img = mri_data[:, :, slice_index]

# Normalize image
slice_img = (slice_img - np.min(slice_img)) / (np.max(slice_img) - np.min(slice_img))

# -----------------------------
# Save MRI image
# -----------------------------
output_path = os.path.join(base_dir, "mri_slice.png")

plt.figure(figsize=(6,6))
plt.imshow(slice_img, cmap="gray")
plt.axis("off")
plt.title("MRI Brain Slice")

plt.savefig(output_path)
plt.close()

print("MRI slice saved successfully!")
print("Saved at:", output_path)