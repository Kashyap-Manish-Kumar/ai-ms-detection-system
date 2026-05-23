# 🧠 Turing Body — AI-Based Multiple Sclerosis Detection System

<div align="center">

![Next.js](https://img.shields.io/badge/Next.js-Frontend-black?style=for-the-badge&logo=next.js)
![Spring Boot](https://img.shields.io/badge/Spring_Boot-Backend-green?style=for-the-badge&logo=springboot)
![TensorFlow](https://img.shields.io/badge/TensorFlow-DeepLearning-orange?style=for-the-badge&logo=tensorflow)
![Python](https://img.shields.io/badge/Python-ML-blue?style=for-the-badge&logo=python)
![License](https://img.shields.io/badge/License-Educational-red?style=for-the-badge)

### 🚀 AI-Powered MRI Lesion Segmentation & Analysis Platform

</div>

---

# 📌 Overview

Turing Body is a full-stack AI-powered medical imaging platform developed for detecting and segmenting **Multiple Sclerosis (MS)** lesions from MRI brain scans using Deep Learning and Computer Vision.

The system integrates:

- 🧠 U-Net Deep Learning segmentation
- ⚙️ Spring Boot backend APIs
- 🎨 Next.js frontend dashboard
- 📊 MRI lesion analysis
- 📄 Automated PDF report generation

---

# 🧠 Problem Statement

Multiple Sclerosis causes lesions in the brain and spinal cord that are visible in MRI scans.

Manual lesion analysis is:
- time-consuming
- dependent on radiologist expertise
- prone to inconsistency
- difficult for large MRI datasets

Turing Body automates this process using AI-based semantic segmentation to improve lesion detection and analysis.

---

# ✨ Key Features

## 🔹 AI-Based MRI Segmentation
- U-Net Deep Learning model
- Pixel-wise lesion detection
- Semantic segmentation pipeline

## 🔹 MRI Upload & Analysis
- MRI scan upload system
- Real-time lesion prediction
- Automated segmentation workflow

## 🔹 Lesion Visualization
- Original MRI display
- Segmentation mask visualization
- Overlay rendering

## 🔹 Lesion Statistics
- Lesion count
- Lesion volume
- Average lesion size
- Maximum lesion size

## 🔹 Severity Classification
- Mild MS
- Moderate MS
- Severe MS

## 🔹 Authentication System
- JWT Authentication
- Protected routes
- Secure APIs

## 🔹 PDF Report Generation
- MRI analysis reports
- Segmentation results
- Clinical statistics

---

# 🏗️ System Architecture

```text
Frontend (Next.js)
        ↓
Spring Boot Backend APIs
        ↓
Python ML Prediction Pipeline
        ↓
U-Net Segmentation Model
        ↓
Lesion Analysis & Report Generation
```

---

# 🧠 Machine Learning Module

## Deep Learning Architecture

The ML module uses:

```text
U-Net Convolutional Neural Network (CNN)
```

for biomedical image segmentation.

### Model Features
- Encoder-Decoder architecture
- Skip connections
- Dice Loss optimization
- Test-Time Augmentation (TTA)
- Morphological post-processing

---

# 📊 Dataset

## Dataset Type
- MRI FLAIR Brain Scans
- Ground Truth Lesion Masks

## File Format

```text
.nii (NIfTI Medical Imaging Format)
```

---

# ⚙️ ML Training Configuration

| Parameter | Value |
|---|---|
| Architecture | U-Net |
| Input Size | 128×128×1 |
| Optimizer | Adam |
| Learning Rate | 1e-4 |
| Batch Size | 8 |
| Epochs | 80 |
| Loss Function | BCE + Dice Loss |

---

# 📈 Model Performance

| Metric | Value |
|---|---|
| Best Validation Dice Score | ~0.56 |
| Training Dice Score | ~0.71 |

### Evaluation Metrics
- Dice Coefficient
- Dice Loss
- Binary Cross Entropy
- Segmentation Overlap Accuracy

---

# ⚙️ Backend Module

## Backend Stack

| Technology | Purpose |
|---|---|
| Spring Boot | Backend Framework |
| Spring Security | Authentication |
| JWT | Secure Authentication |
| Spring Data JPA | ORM |
| Hibernate | Database Mapping |
| MySQL | Database |
| Docker | Containerization |

---

# 🎨 Frontend Module

## Frontend Stack

| Technology | Purpose |
|---|---|
| Next.js | Frontend Framework |
| React.js | UI Library |
| Tailwind CSS | Styling |
| Axios / Fetch API | API Communication |
| JWT Authentication | Secure Sessions |
| Vercel | Deployment |

---

# 🔐 Authentication Flow

```text
User Login
    ↓
JWT Token Generation
    ↓
Token Validation
    ↓
Protected API Access
```

---

# 🧪 Prediction Pipeline

```text
MRI Upload
    ↓
Preprocessing
    ↓
U-Net Prediction
    ↓
Test-Time Augmentation
    ↓
Thresholding
    ↓
Morphological Post-processing
    ↓
Lesion Analysis
    ↓
Severity Classification
    ↓
Visualization + PDF Report
```

---

# 📁 Project Structure

```text
Turing-Body
│
├── frontend
│   ├── app
│   ├── components
│   ├── services
│   └── styles
│
├── backend
│   ├── controller
│   ├── service
│   ├── repository
│   ├── security
│   └── model
│
├── ml-model
│   ├── preprocessing
│   ├── training
│   ├── prediction
│   └── reports
│
└── README.md
```

---

# 🚀 Installation & Setup

## 1️⃣ Clone Repository

```bash
git clone https://github.com/your-username/ai-ms-detection-system.git
cd ai-ms-detection-system
```

---

## 2️⃣ Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

Frontend runs on:

```text
http://localhost:3000
```

---

## 3️⃣ Backend Setup

```bash
cd backend
mvn spring-boot:run
```

Backend runs on:

```text
http://localhost:8080
```

---

## 4️⃣ ML Model Setup

```bash
pip install -r requirements.txt
```

Run ML prediction service:

```bash
python app.py
```

---

# 🐳 Docker Support

## Build Docker Image

```bash
docker build -t turing-body .
```

## Run Docker Container

```bash
docker run -p 8080:8080 turing-body
```

---

# 🌐 Deployment

| Module | Platform |
|---|---|
| Frontend | Vercel |
| Backend | Render / Railway |
| ML Service | Python API |
| Database | MySQL |

---

# 📌 Challenges Faced

## 🔹 Small Medical Dataset
### Solution
- U-Net architecture
- Data augmentation
- Test-Time Augmentation

---

## 🔹 Noisy MRI Predictions
### Solution
- Morphological post-processing
- Threshold tuning

---

## 🔹 Overfitting
### Solution
- EarlyStopping
- Validation monitoring
- Model checkpointing

---

# 🔮 Future Improvements

- 3D U-Net implementation
- Attention U-Net
- Transformer-based segmentation
- Real-time prediction
- Cloud deployment
- Multi-modal MRI support

---

# 🛠️ Technologies Used

## Machine Learning
- Python
- TensorFlow
- Keras
- OpenCV
- NumPy
- SciPy
- nibabel

## Backend
- Spring Boot
- Spring Security
- JWT
- Hibernate
- MySQL

## Frontend
- Next.js
- React.js
- Tailwind CSS

---

# 👨‍💻 Author

## Manish Kashyap

AI & Full Stack Developer

---

# 📄 License

This project is developed for educational and research purposes.

---

# ⭐ Final Summary

Turing Body is a complete AI-powered medical imaging platform that combines:

- Deep Learning
- Medical Image Segmentation
- Spring Boot Backend APIs
- Next.js Frontend
- Secure Authentication
- MRI Lesion Analysis

into a full-stack healthcare AI solution for Multiple Sclerosis detection and analysis.

---
