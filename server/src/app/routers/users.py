from fastapi import APIRouter, HTTPException, Depends
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy.orm import Session
from datetime import timedelta

import src.app.schemas as schemas
import src.app.models as models
from src.app.dependencies import (
    get_session,
    hash_password,
    verify_password,
    get_current_active_user,
    create_access_token,
    ACCESS_TOKEN_EXPIRE_MINUTES
)


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

    access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(
        data={"username": user.username}, expires_delta=access_token_expires
    )

    return {"access_token": access_token, "token_type": "bearer"}


@router.get("/me/", response_model=schemas.UserInDB)
async def read_users_me(
    current_user: schemas.UserInDB = Depends(get_current_active_user)
):
    return current_user


@router.get("/me/", response_model=schemas.UserInDB)
async def read_users_me(
    current_user: schemas.UserInDB = Depends(get_current_active_user)
):
    return current_user
