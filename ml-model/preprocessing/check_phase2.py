import os

BASE_DIR = os.path.dirname(os.path.dirname(__file__))

images_path = os.path.join(BASE_DIR, "dataset", "processed", "images")
masks_path = os.path.join(BASE_DIR, "dataset", "processed", "masks")

images = os.listdir(images_path)
masks = os.listdir(masks_path)

print("Images found:", len(images))
print("Masks found :", len(masks))

if len(images) == 0:
    print("❌ No images generated")
elif len(images) != len(masks):
    print("⚠ Images and masks count mismatch")
else:
    print("✅ Phase 2 completed successfully")