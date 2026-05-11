import matplotlib.pyplot as plt

def show_prediction(original, mask):

    plt.figure(figsize=(14,4))

    # Original MRI
    plt.subplot(1,3,1)
    plt.title("MRI Slice")
    plt.imshow(original, cmap="gray")
    plt.axis("off")

    # Predicted mask
    plt.subplot(1,3,2)
    plt.title("Predicted Lesion")
    plt.imshow(mask, cmap="gray")
    plt.axis("off")

    # Overlay
    plt.subplot(1,3,3)
    plt.title("Lesion Overlay")
    plt.imshow(original, cmap="gray")
    plt.imshow(mask, cmap="jet", alpha=0.5)
    plt.axis("off")

    plt.tight_layout()
    plt.show()