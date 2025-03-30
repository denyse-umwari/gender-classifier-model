from fastapi import FastAPI
from pydantic import BaseModel
import joblib
import pandas as pd

app = FastAPI()

# Load the trained model
model = joblib.load("model/gender_classifier.pkl")


class Features(BaseModel):
    long_hair: int
    forehead_width_cm: float
    forehead_height_cm: float
    nose_wide: int
    nose_long: int
    lips_thin: int
    distance_nose_to_lip_long: int


@app.post("/predict")
def predict(features: Features):
    input_data = pd.DataFrame([[
        features.long_hair,
        features.forehead_width_cm,
        features.forehead_height_cm,
        features.nose_wide,
        features.nose_long,
        features.lips_thin,
        features.distance_nose_to_lip_long,
    ]], columns=[
        "long_hair", "forehead_width_cm", "forehead_height_cm",
        "nose_wide", "nose_long", "lips_thin", "distance_nose_to_lip_long"
    ])

    prediction = model.predict(input_data)[0]
    return {"gender": "Male" if prediction == 1 else "Female"}
