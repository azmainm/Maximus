from fastapi import FastAPI, Depends
from fastapi.middleware.cors import CORSMiddleware  # Import CORS middleware
from pydantic import BaseModel
from sqlalchemy.orm import Session
from .db import get_db  # Import the get_db function from db.py

app = FastAPI()

# Set up CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Change this to a list of origins you want to allow
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Define the Pydantic model for the signup data
class SignUpModel(BaseModel):
    full_name: str
    email: str
    username: str
    password: str

@app.post("/signup/")
async def signup(signup_data: SignUpModel, db: Session = Depends(get_db)):
    # Here you can handle the signup logic, such as saving the user to the database.
    return {"message": "User signed up successfully"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="127.0.0.1", port=8000, reload=True)
