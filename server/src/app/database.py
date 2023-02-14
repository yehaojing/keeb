from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
import os

engine = create_engine(os.environ["DATABASE_URI"])

Base = declarative_base()

SessionLocal = sessionmaker(bind=engine, expire_on_commit=False)
