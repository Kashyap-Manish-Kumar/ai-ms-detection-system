import cv2
import numpy as np

IMG_SIZE = 128

def preprocess_image(image_path):
    """
    Load MRI image and prepare it for model prediction
    """

    img = cv2.imread(image_path, cv2.IMREAD_GRAYSCALE)

    if img is None:
        raise ValueError(f"Image not found: {image_path}")

    img = cv2.resize(img, (IMG_SIZE, IMG_SIZE))

    # normalize
    img = img / 255.0

    # add channel
    img = np.expand_dims(img, axis=-1)

    # add batch dimension
    img = np.expand_dims(img, axis=0)

    return img