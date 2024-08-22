from sqlalchemy.orm import Session
from backend.app.db import SessionLocal  # Import SessionLocal from db.py
from backend.app.models import User  # Import the User model from models.py

# Create a session
db: Session = SessionLocal()

# Query all users in the users table
users = db.query(User).all()

# Print the details of each user
for user in users:
    print(f"ID: {user.id}, Full Name: {user.full_name}, Email: {user.email}, Username: {user.username}")

# Close the session
db.close()
