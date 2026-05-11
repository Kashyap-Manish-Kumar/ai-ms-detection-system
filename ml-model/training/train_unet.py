# training/train_unet.py

# ---------------------------------
# Step 1: Import Libraries
# ---------------------------------
import os
import numpy as np
import cv2
from glob import glob
from sklearn.model_selection import train_test_split
import tensorflow as tf

from tensorflow.keras import layers, models, optimizers
from tensorflow.keras.callbacks import EarlyStopping, ModelCheckpoint


# ---------------------------------
# Step 2: Base Project Directory
# ---------------------------------
BASE_DIR = os.path.dirname(os.path.dirname(__file__))

IMAGE_PATH = os.path.join(BASE_DIR, "dataset", "processed", "images")
MASK_PATH = os.path.join(BASE_DIR, "dataset", "processed", "masks")

MODEL_SAVE_PATH = os.path.join(BASE_DIR, "models", "ms_unet_model.h5")


# ---------------------------------
# Step 3: Load Image Paths
# ---------------------------------
images = sorted(glob(os.path.join(IMAGE_PATH, "*.png")))
masks = sorted(glob(os.path.join(MASK_PATH, "*.png")))

print("\nDataset Loading...\n")

print("Images found:", len(images))
print("Masks found :", len(masks))


# ---------------------------------
# Step 4: Image Size
# ---------------------------------
IMG_HEIGHT = 128
IMG_WIDTH = 128

X = []
Y = []


# ---------------------------------
# Step 5: Read Images
# ---------------------------------
for img_file, mask_file in zip(images, masks):

    img = cv2.imread(img_file, cv2.IMREAD_GRAYSCALE)
    img = cv2.resize(img, (IMG_WIDTH, IMG_HEIGHT))
    img = img / 255.0

    mask = cv2.imread(mask_file, cv2.IMREAD_GRAYSCALE)
    mask = cv2.resize(mask, (IMG_WIDTH, IMG_HEIGHT))
    mask = mask / 255.0

    X.append(img)
    Y.append(mask)


# Convert to numpy arrays
X = np.array(X)
Y = np.array(Y)

# Add channel dimension
X = np.expand_dims(X, axis=-1)
Y = np.expand_dims(Y, axis=-1)

print("\nImages shape:", X.shape)
print("Masks shape :", Y.shape)


# ---------------------------------
# Step 6: Train Test Split
# ---------------------------------
X_train, X_val, Y_train, Y_val = train_test_split(
    X, Y, test_size=0.2, random_state=42
)

print("\nTraining samples:", X_train.shape[0])
print("Validation samples:", X_val.shape[0])


# ---------------------------------
# Step 7: Define U-Net Model
# ---------------------------------
def unet_model(input_size=(128,128,1)):

    inputs = layers.Input(input_size)

    # Encoder
    c1 = layers.Conv2D(64,(3,3),activation='relu',padding='same')(inputs)
    c1 = layers.Conv2D(64,(3,3),activation='relu',padding='same')(c1)
    p1 = layers.MaxPooling2D((2,2))(c1)

    c2 = layers.Conv2D(128,(3,3),activation='relu',padding='same')(p1)
    c2 = layers.Conv2D(128,(3,3),activation='relu',padding='same')(c2)
    p2 = layers.MaxPooling2D((2,2))(c2)

    c3 = layers.Conv2D(256,(3,3),activation='relu',padding='same')(p2)
    c3 = layers.Conv2D(256,(3,3),activation='relu',padding='same')(c3)
    p3 = layers.MaxPooling2D((2,2))(c3)

    c4 = layers.Conv2D(512,(3,3),activation='relu',padding='same')(p3)
    c4 = layers.Conv2D(512,(3,3),activation='relu',padding='same')(c4)
    p4 = layers.MaxPooling2D((2,2))(c4)

    # Bottleneck
    c5 = layers.Conv2D(1024,(3,3),activation='relu',padding='same')(p4)
    c5 = layers.Conv2D(1024,(3,3),activation='relu',padding='same')(c5)

    # Decoder
    u6 = layers.UpSampling2D((2,2))(c5)
    u6 = layers.Concatenate()([u6,c4])
    c6 = layers.Conv2D(512,(3,3),activation='relu',padding='same')(u6)
    c6 = layers.Conv2D(512,(3,3),activation='relu',padding='same')(c6)

    u7 = layers.UpSampling2D((2,2))(c6)
    u7 = layers.Concatenate()([u7,c3])
    c7 = layers.Conv2D(256,(3,3),activation='relu',padding='same')(u7)
    c7 = layers.Conv2D(256,(3,3),activation='relu',padding='same')(c7)

    u8 = layers.UpSampling2D((2,2))(c7)
    u8 = layers.Concatenate()([u8,c2])
    c8 = layers.Conv2D(128,(3,3),activation='relu',padding='same')(u8)
    c8 = layers.Conv2D(128,(3,3),activation='relu',padding='same')(c8)

    u9 = layers.UpSampling2D((2,2))(c8)
    u9 = layers.Concatenate()([u9,c1])
    c9 = layers.Conv2D(64,(3,3),activation='relu',padding='same')(u9)
    c9 = layers.Conv2D(64,(3,3),activation='relu',padding='same')(c9)

    outputs = layers.Conv2D(1,(1,1),activation='sigmoid')(c9)

    model = models.Model(inputs=[inputs], outputs=[outputs])

    return model


# ---------------------------------
# Step 8: Build Model
# ---------------------------------
model = unet_model()

model.summary()


# ---------------------------------
# Step 9: Dice Coefficient
# ---------------------------------
def dice_coef(y_true, y_pred, smooth=1):

    y_true_f = tf.reshape(y_true, [-1])
    y_pred_f = tf.reshape(y_pred, [-1])

    intersection = tf.reduce_sum(y_true_f * y_pred_f)

    return (2. * intersection + smooth) / (
        tf.reduce_sum(y_true_f) + tf.reduce_sum(y_pred_f) + smooth
    )


# ---------------------------------
# Step 10: Dice Loss
# ---------------------------------
def dice_loss(y_true, y_pred):

    return 1 - dice_coef(y_true, y_pred)


# ---------------------------------
# Step 11: Combined Loss
# ---------------------------------
def combined_loss(y_true, y_pred):

    bce = tf.keras.losses.binary_crossentropy(y_true, y_pred)

    return bce + dice_loss(y_true, y_pred)


# ---------------------------------
# Step 12: Compile Model
# ---------------------------------
model.compile(
    optimizer=optimizers.Adam(learning_rate=1e-4),
    loss=combined_loss,
    metrics=[dice_coef]
)


# ---------------------------------
# Step 13: Callbacks
# ---------------------------------
checkpoint = ModelCheckpoint(
    MODEL_SAVE_PATH,
    monitor="val_loss",
    save_best_only=True
)

earlystop = EarlyStopping(
    monitor="val_loss",
    patience=15,
    restore_best_weights=True
)


# ---------------------------------
# Step 14: Train Model
# ---------------------------------
print("\nTraining Started...\n")

history = model.fit(
    X_train,
    Y_train,
    validation_data=(X_val, Y_val),
    batch_size=8,
    epochs=80,
    callbacks=[checkpoint, earlystop],
    verbose=1
)

print("\nTraining Completed.")
print("Model saved at:", MODEL_SAVE_PATH)