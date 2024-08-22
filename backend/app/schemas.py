from pydantic import BaseModel
from typing import List

class UserCreate(BaseModel):
    full_name: str
    email: str
    username: str
    password: str
    
class UserLogin(BaseModel):
    username: str
    password: str

class ArticleCreate(BaseModel):
    title: str
    tldr: str
    content: str
    tags: List[str]