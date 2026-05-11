import os
import cv2
import numpy as np
import tensorflow as tf

from prediction.preprocess import preprocess_image
from prediction.visualize_prediction import show_prediction


# -----------------------------------
# Configuration
# -----------------------------------

IMG_SIZE = 128
THRESHOLD = 0.05


# -----------------------------------
# Base Directory
# -----------------------------------

BASE_DIR = os.path.dirname(os.path.dirname(__file__))


# -----------------------------------
# Model Path
# -----------------------------------

MODEL_PATH = os.path.join(BASE_DIR, "models", "ms_unet_model.h5")


# -----------------------------------
# Test MRI Image
# -----------------------------------


IMAGE_PATH = os.path.join(
    BASE_DIR,
    "dataset",
    "processed",
    "images",
    "Patient-4_slice_8.png"
)


# -----------------------------------
# Load Model
# -----------------------------------

print("Loading trained model...")

model = tf.keras.models.load_model(MODEL_PATH, compile=False)

print("Model loaded successfully")


# -----------------------------------
# Post-processing
# -----------------------------------

def clean_mask(mask):

    kernel_small = np.ones((3,3), np.uint8)

    mask = cv2.morphologyEx(mask, cv2.MORPH_OPEN, kernel_small)
    mask = cv2.morphologyEx(mask, cv2.MORPH_CLOSE, kernel_small)

    kernel_smooth = np.ones((5,5), np.uint8)

    mask = cv2.dilate(mask, kernel_smooth, iterations=1)
    mask = cv2.erode(mask, kernel_smooth, iterations=1)

    return mask


# -----------------------------------
# Test-Time Augmentation
# -----------------------------------

def tta_prediction(input_img):

    predictions = []

    # original
    pred = model.predict(input_img)[0]
    predictions.append(pred)

    # horizontal flip
    flipped = np.flip(input_img, axis=2)
    pred = model.predict(flipped)[0]
    pred = np.flip(pred, axis=1)
    predictions.append(pred)

    # vertical flip
    flipped = np.flip(input_img, axis=1)
    pred = model.predict(flipped)[0]
    pred = np.flip(pred, axis=0)
    predictions.append(pred)

    # both flips
    flipped = np.flip(input_img, axis=(1,2))
    pred = model.predict(flipped)[0]
    pred = np.flip(pred, axis=(0,1))
    predictions.append(pred)

    avg_prediction = np.mean(predictions, axis=0)

    return avg_prediction


# -----------------------------------
# Prediction Function
# -----------------------------------

def predict_mri(image_path, debug=True):

    input_img = preprocess_image(image_path)

    original = cv2.imread(image_path, cv2.IMREAD_GRAYSCALE)

    if original is None:
        raise ValueError(f"Image not found: {image_path}")

    original = cv2.resize(original, (IMG_SIZE, IMG_SIZE))

    # TTA prediction
    prediction = tta_prediction(input_img)

    if debug:
        print("Prediction max value:", prediction.max())
        print("Prediction mean value:", prediction.mean())
        print("Prediction min value:", prediction.min())

    mask = (prediction > THRESHOLD).astype(np.uint8)
    mask = mask[:,:,0]

    mask = clean_mask(mask)

    return original, mask


# -----------------------------------
# Run prediction
# -----------------------------------

if __name__ == "__main__":

    original, mask = predict_mri(IMAGE_PATH)

    show_prediction(original, mask)