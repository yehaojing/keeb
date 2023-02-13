from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

engine = create_engine("postgresql://user:pw@keeb-database-dev:5432/keeb")

Base = declarative_base()

SessionLocal = sessionmaker(bind=engine, expire_on_commit=False)
