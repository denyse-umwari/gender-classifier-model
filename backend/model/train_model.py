import pandas as pd
from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import train_test_split
import joblib

# Load & preprocess data
df = pd.read_csv("../../data/gender_classifier.csv")
df['gender'] = df['gender'].map({'Male': 1, 'Female': 0})

# Train-test split
X = df.drop('gender', axis=1)
y = df['gender']
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42)

# Train model
model = RandomForestClassifier(random_state=42)
model.fit(X_train, y_train)

# Save model
joblib.dump(model, "gender_classifier.pkl")
print("Model trained & saved!")
