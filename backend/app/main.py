from fastapi import FastAPI, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from pydantic import BaseModel
from jose import JWTError, jwt
from datetime import datetime, timedelta
from .db import get_db
from .models import User
from .utils import verify_password, hash_password

app = FastAPI()

# Secret key for JWT encoding/decoding
SECRET_KEY = "bf54aa19e38de06204ba3af3ba99c208fbfb7176aa51eb2022673b0f4bd8cc04" 
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30

# Set up CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  
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

# Pydantic model for login data
class LoginModel(BaseModel):
    username: str
    password: str

# Function to create access token (JWT)
def create_access_token(data: dict, expires_delta: timedelta | None = None):
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    else:
        expire = datetime.utcnow() + timedelta(minutes=15)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt

# Signup route
@app.post("/signup/")
async def signup(signup_data: SignUpModel, db: Session = Depends(get_db)):
    # Check if the user already exists
    existing_user = db.query(User).filter((User.email == signup_data.email) | (User.username == signup_data.username)).first()
    if existing_user:
        raise HTTPException(status_code=400, detail="Email or username already registered")

    # Hash the password
    hashed_password = hash_password(signup_data.password)
    
    # Create a new user
    new_user = User(
        full_name=signup_data.full_name,
        email=signup_data.email,
        username=signup_data.username,
        hashed_password=hashed_password
    )
    
    # Save the new user to the database
    db.add(new_user)
    db.commit()
    db.refresh(new_user)

    return {"message": "User created successfully", "user_id": new_user.id}

# Login route
@app.post("/login/")
async def login(login_data: LoginModel, db: Session = Depends(get_db)):
    # Fetch user from the database
    user = db.query(User).filter(User.username == login_data.username).first()
    if not user:
        raise HTTPException(status_code=400, detail="Invalid username or password")
    
    # Verify the password
    if not verify_password(login_data.password, user.hashed_password):
        raise HTTPException(status_code=400, detail="Invalid username or password")
    
    # Create JWT token
    access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(data={"sub": user.username}, expires_delta=access_token_expires)
    
    return {"access_token": access_token, "token_type": "bearer"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="127.0.0.1", port=8000, reload=True)
