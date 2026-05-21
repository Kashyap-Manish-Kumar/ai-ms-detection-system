# AI MS Detection System 
Turing Body – AI-Based Multiple Sclerosis Detection System
<div align="center">
🧠 AI-Powered MRI Lesion Segmentation & Analysis Platform
Deep Learning • Medical Imaging • Full Stack AI System
</div>
📌 Overview

Turing Body is an AI-powered medical imaging platform developed for the detection and segmentation of Multiple Sclerosis (MS) lesions from MRI brain scans using Deep Learning and Computer Vision techniques.

The system integrates:

U-Net Deep Learning segmentation
Spring Boot backend APIs
Next.js frontend dashboard
MRI lesion analysis
Automated report generation

The platform provides an end-to-end workflow for:

MRI upload
AI-based lesion segmentation
Severity estimation
Lesion statistics generation
Interactive visualization
PDF report generation
🧠 Problem Statement

Multiple Sclerosis causes lesions in the brain and spinal cord that are visible in MRI scans. Manual lesion detection is:

time-consuming,
dependent on radiologist expertise,
prone to variability,
difficult for large MRI datasets.

Turing Body automates this process using Deep Learning-based semantic segmentation to improve lesion detection efficiency and analysis.

🚀 Key Features
🔹 AI-Based MRI Lesion Segmentation
U-Net Deep Learning model
Pixel-wise lesion detection
Semantic segmentation pipeline
🔹 MRI Upload & Analysis
MRI scan upload system
Real-time segmentation processing
Automated lesion prediction
🔹 Lesion Visualization
Original MRI display
Predicted segmentation masks
Overlay visualization
🔹 Lesion Statistics
Lesion count
Lesion volume
Average lesion size
Maximum lesion size
🔹 Severity Classification
Mild MS
Moderate MS
Severe MS
🔹 Automated PDF Reports
MRI analysis report generation
Segmentation visualization
Clinical statistics summary
🔹 Secure Authentication
JWT-based authentication
Protected dashboard routes
Secure API communication
🔹 Responsive Dashboard
Modern medical UI
Dark theme interface
Fully responsive design
🏗️ System Architecture
Frontend (Next.js)
        ↓
Spring Boot Backend APIs
        ↓
Python ML Prediction Pipeline
        ↓
U-Net Segmentation Model
        ↓
Lesion Analysis & Report Generation
🧠 Machine Learning Module
Deep Learning Architecture

The ML module uses:

U-Net Convolutional Neural Network

for biomedical image segmentation.

Model Features
Encoder-Decoder architecture
Skip connections
Pixel-wise segmentation
Dice Loss optimization
Test-Time Augmentation (TTA)
📊 Dataset
Dataset Type
MRI FLAIR Brain Scans
Ground Truth Lesion Masks
File Format
.nii (NIfTI medical imaging format)
Dataset Workflow
MRI Volume
↓
Slice Extraction
↓
Normalization
↓
Resizing
↓
Segmentation Training
⚙️ ML Training Configuration
Parameter	Value
Architecture	U-Net
Input Size	128×128×1
Optimizer	Adam
Learning Rate	1e-4
Batch Size	8
Epochs	80
Loss Function	BCE + Dice Loss
📈 Model Performance
Metric	Value
Best Validation Dice Score	~0.56
Training Dice Score	~0.71
Evaluation Metrics
Dice Coefficient
Dice Loss
Binary Cross Entropy
Segmentation Overlap Accuracy
🖥️ Backend Module
Backend Stack
Technology	Purpose
Spring Boot	Backend Framework
Spring Security	Authentication
JWT	Token Security
Spring Data JPA	Database ORM
Hibernate	ORM Layer
MySQL	Database
Docker	Containerization
Backend Features
RESTful API architecture
JWT authentication
Secure route protection
MRI upload APIs
ML integration service
Patient management
Doctor profile management
Exception handling
Health monitoring endpoint
Backend Architecture
Controller Layer
↓
Service Layer
↓
Repository Layer
↓
Database + ML Service
🎨 Frontend Module
Frontend Stack
Technology	Purpose
Next.js	Frontend Framework
React.js	UI Library
Tailwind CSS	Styling
Axios / Fetch API	API Communication
JWT Authentication	Secure Sessions
Vercel	Deployment
Frontend Features
MRI upload dashboard
Segmentation visualization
Responsive UI
Dark medical theme
Glassmorphism design
Protected routes
Real-time prediction rendering
Report download system
🔐 Authentication System

The project uses:

JWT (JSON Web Token)

for secure authentication.

Authentication Workflow
User Login
↓
JWT Token Generation
↓
Token Validation
↓
Protected API Access
🧪 Prediction Pipeline
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
Visualization + Report Generation
🧬 Medical Image Processing Pipeline
Preprocessing Steps
MRI slice extraction
Grayscale conversion
Intensity normalization
Image resizing
Tensor reshaping
Post-processing Steps
Thresholding
Morphological operations
Noise reduction
Lesion refinement
📊 Severity Classification Logic
Lesion Volume	Severity
< 200	Mild MS
< 800	Moderate MS
≥ 800	Severe MS
📁 Project Structure
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
⚡ Installation & Setup
1️⃣ Clone Repository
git clone https://github.com/your-username/turing-body.git
cd turing-body
2️⃣ Frontend Setup
cd frontend
npm install
npm run dev

Frontend runs on:

http://localhost:3000
3️⃣ Backend Setup
cd backend
mvn spring-boot:run

Backend runs on:

http://localhost:8080
4️⃣ ML Environment Setup
pip install -r requirements.txt

Run prediction service:

python app.py
🐳 Docker Support

The project supports Docker containerization.

Build Docker image:

docker build -t turing-body .

Run container:

docker run -p 8080:8080 turing-body
🌐 Deployment
Module	Platform
Frontend	Vercel
Backend	Render / Railway
ML Model	Python Service
Database	MySQL
📌 Challenges Faced
🔹 Small Medical Dataset

Solution:

U-Net architecture
Data augmentation
Test-Time Augmentation
🔹 Noisy Segmentation Masks

Solution:

Morphological post-processing
Threshold tuning
🔹 Overfitting

Solution:

EarlyStopping
Validation monitoring
Checkpointing
🔹 Frontend-Backend Integration

Solution:

REST APIs
JWT authentication
CORS configuration
🔮 Future Improvements
3D U-Net implementation
Attention U-Net
Transformer-based segmentation
Real-time prediction
Cloud deployment
Multi-modal MRI support
Advanced analytics dashboard
📚 Technologies Used
Machine Learning
Python
TensorFlow
Keras
OpenCV
NumPy
SciPy
nibabel
Backend
Spring Boot
Spring Security
JWT
Hibernate
MySQL
Frontend
Next.js
React.js
Tailwind CSS
