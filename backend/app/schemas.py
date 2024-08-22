from pydantic import BaseModel

class UserCreate(BaseModel):
    full_name: str
    email: str
    username: str
    password: str
    
class UserLogin(BaseModel):
    username: str
    password: str