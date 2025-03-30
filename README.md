# Gender Classification Model

A machine learning model that predicts gender based on physical features, with a React frontend and FastAPI backend.

![Model Screenshot](./screenshot.png) *(Replace with actual screenshot)*

## Features

- 🧠 **ML Model**: Random Forest classifier trained on physical features
- ⚡ **API**: FastAPI backend with `/predict` endpoint
- 💅 **UI**: React + Tailwind CSS responsive interface
- 📦 **Model Persistence**: Saved as `.pkl` using `joblib`

## Tech Stack

**Backend**: FastAPI, Python 3.9+, scikit-learn, joblib  
**Frontend**: React 18, Tailwind CSS 3, Axios  
**Tools**: Git, ESLint, Prettier

## Setup Guide

### 1. Clone Repository

- git clone <https://github.com/denyse-umwari/gender-classifier-model.git>
- cd gender-classifier-model

### 2. Backend Setup

- cd backend
- python -m venv gender-classifier-venv

#### Linux/Mac

- source venv/bin/activate

#### Windows

- gender-classifier-venv\Scripts\activate

- pip install -r requirements.txt
- python model/train_model.py  # Trains and saves model
- uvicorn server:app --reload  # Starts backend @ <http://localhost:8000>

### 3. Frontend Setup

- cd frontend
- npm install
- npm run dev  # Starts frontend @ <http://localhost:5173>
