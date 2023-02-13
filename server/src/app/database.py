from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

engine = create_engine("sqlite:///keyboard.db")

Base = declarative_base()

SessionLocal = sessionmaker(bind=engine, expire_on_commit=False)
