from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from passlib.context import CryptContext
from .. import models, schemas, db, utils
from jose import JWTError, jwt
from datetime import datetime, timedelta

# JWT settings
SECRET_KEY = "bf54aa19e38de06204ba3af3ba99c208fbfb7176aa51eb2022673b0f4bd8cc04" 
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30

router = APIRouter()

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

def create_access_token(data: dict):
    to_encode = data.copy()
    expire = datetime.utcnow() + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt

@router.post("/login")
def login(user: schemas.UserLogin, db: Session = Depends(db.get_db)):
    # Fetch the user by username
    db_user = db.query(models.User).filter(models.User.username == user.username).first()
    
    if not db_user:
        raise HTTPException(status_code=400, detail="Invalid username or password")

    # Verify password
    if not utils.verify_password(user.password, db_user.hashed_password):
        raise HTTPException(status_code=400, detail="Invalid username or password")

    # Create JWT token
    access_token = create_access_token(data={"sub": db_user.username})
    
    return {"access_token": access_token, "token_type": "bearer"}

@router.post("/signup")
def create_user(user: schemas.UserCreate, db: Session = Depends(db.get_db)):
    # Check if the user already exists
    existing_user = db.query(models.User).filter(models.User.email == user.email).first()
    if existing_user:
        raise HTTPException(status_code=400, detail="Email already registered")

    # Hash the password
    hashed_password = pwd_context.hash(user.password)
    
    # Create a new user
    new_user = models.User(
        full_name=user.full_name,
        email=user.email,
        username=user.username,
        hashed_password=hashed_password
    )
    
    # Save to the database
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    
    return {"message": "User created successfully"}
