from fastapi import FastAPI, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from pydantic import BaseModel
from jose import JWTError, jwt
from datetime import datetime, timedelta
from .db import get_db
from .models import User, Article
from .utils import verify_password, hash_password
from .schemas import ArticleCreate
from .db import engine
from .models import Base
from fastapi.security import OAuth2PasswordBearer


app = FastAPI()

# Secret key for JWT encoding/decoding
SECRET_KEY = "bf54aa19e38de06204ba3af3ba99c208fbfb7176aa51eb2022673b0f4bd8cc04" 
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30

# OAuth2 scheme to retrieve token from the request header
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="login")

# Set up CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  
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


# Route to create an article
@app.post("/createpost/")
async def create_article(article_data: ArticleCreate, db: Session = Depends(get_db), token: str = Depends(oauth2_scheme)):
    # Extract user information from the token
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        username = payload.get("sub")
        if username is None:
            raise HTTPException(status_code=401, detail="Invalid credentials")
    except JWTError:
        raise HTTPException(status_code=401, detail="Invalid credentials")
    
    user = db.query(User).filter(User.username == username).first()
    if user is None:
        raise HTTPException(status_code=404, detail="User not found")
    
    # Create a new article object with the user ID and tags
    new_article = Article(
        title=article_data.title,
        tldr=article_data.tldr,
        content=article_data.content,
        user_id=user.id,
        tags=",".join(article_data.tags)  # Join tags as a comma-separated string
    )

    # Save the new article to the database
    db.add(new_article)
    db.commit()
    db.refresh(new_article)

    return {"message": "Article created successfully", "article_id": new_article.id}

Base.metadata.create_all(bind=engine)

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="127.0.0.1", port=8000, reload=True)
