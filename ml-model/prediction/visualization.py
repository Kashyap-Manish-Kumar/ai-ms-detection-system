import cv2
import numpy as np


def create_overlay(original, mask):

    # convert mask to red
    red_mask = np.zeros_like(original)

    red_mask[:, :, 2] = mask * 255

    overlay = cv2.addWeighted(original, 0.7, red_mask, 0.3, 0)

    cv2.imwrite("overlay.png", overlay)

    return overlay