from fastapi import FastAPI, Depends
from pydantic import BaseModel
from sqlalchemy.orm import Session
from .db import get_db  # Import the get_db function from db.py

app = FastAPI()

# Define the Pydantic model for the signup data
class SignUpModel(BaseModel):
    full_name: str
    email: str
    username: str
    password: str

@app.post("/signup/")
async def signup(signup_data: SignUpModel, db: Session = Depends(get_db)):
    # Here you can handle the signup logic, such as saving the user to the database.
    # Example: 
    # new_user = UserModel(
    #     full_name=signup_data.full_name,
    #     email=signup_data.email,
    #     username=signup_data.username,
    #     hashed_password=hash_password(signup_data.password)  # You would need a function to hash passwords
    # )
    # db.add(new_user)
    # db.commit()
    # db.refresh(new_user)
    
    return {"message": "User signed up successfully"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="127.0.0.1", port=8000, reload=True)
