from src.app.database import SessionLocal
from fastapi.security import OAuth2PasswordBearer


def get_session():
    session = SessionLocal()
    try:
        yield session
    finally:
        session.close()


oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/users/token")
