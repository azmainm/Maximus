from backend.app.db import Base, engine
from backend.app.models import User  # Import your models

# This will create the tables in your SQLite database file
Base.metadata.create_all(bind=engine)
