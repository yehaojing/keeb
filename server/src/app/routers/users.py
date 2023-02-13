from fastapi import APIRouter, HTTPException, Depends
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy.orm import Session
from passlib.context import CryptContext

import src.app.schemas as schemas
import src.app.models as models
from src.app.dependencies import get_session

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")


def verify_password(plain_password, hashed_password):
    return pwd_context.verify(plain_password, hashed_password)


def hash_password(password):
    return pwd_context.hash(password)


router = APIRouter(
    tags=["users"]
)


@router.post(
    "/",
    response_model=schemas.UserInDB
)
def create_new_user(
    user: schemas.UserCreate,
    session: Session = Depends(get_session)
):
    user_db = models.User(
        full_name=user.full_name,
        username=user.username,
        email=user.email,
        password_hash=hash_password(user.password),
        disabled=user.disabled
    )

    session.add(user_db)
    session.commit()
    session.refresh(user_db)
    session.close()

    return user_db


@router.post(
    "/token",
)
async def login(
    form_data: OAuth2PasswordRequestForm = Depends(),
    session: Session = Depends(get_session)
):
    user = session \
        .query(models.User) \
        .filter(models.User.username == form_data.username) \
        .one()

    if not user:
        raise HTTPException(
            status_code=400,
            detail="Incorrect username or password"
        )

    if not verify_password(
        plain_password=form_data.password,
        hashed_password=user.password_hash
    ):
        raise HTTPException(
            status_code=400,
            detail="Incorrect username or password"
        )

    return user
