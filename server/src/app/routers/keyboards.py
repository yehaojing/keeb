from typing import List
from fastapi import APIRouter, status, HTTPException, Depends
from sqlalchemy.orm import Session

from src.app.database import SessionLocal
import src.app.models as models
import src.app.schemas as schemas

router = APIRouter()

def get_session():
    session = SessionLocal()
    try:
        yield session
    finally:
        session.close()

@router.post(
    "/",
    response_model=schemas.Keyboard,
    status_code=status.HTTP_201_CREATED
)
def create_keyboard(
    keyboard: schemas.PostCreate,
    session: Session = Depends(get_session)
):

    keyboard_db = models.Post(
        name=keyboard.name,
        switches=keyboard.switches,
        stabilisers=keyboard.stabilisers,
        keycaps=keyboard.keycaps,
        manufacturer=keyboard.manufacturer
    )

    session.add(keyboard_db)
    session.commit()
    session.refresh(keyboard_db)

    return keyboard_db


@router.get(
    "/{id}", 
    response_model=schemas.Keyboard
)
def read_keyboard(id: int):

    session = SessionLocal()
    keyboard = session.query(models.Keyboard).get(id)
    session.close()

    if not keyboard:
        raise HTTPException(
            status_code=404,
            detail=f"keyboard with id {id} not found"
        )

    return keyboard


@router.put(
    "/{id}", 
    response_model=schemas.Keyboard
)
def update_keyboard(id: int, name: str):

    session = SessionLocal()
    keyboard = session.query(models.Keyboard).get(id)

    if keyboard:
        keyboard.name = name
        session.commit()

    session.close()

    if not keyboard:
        raise HTTPException(
            status_code=404,
            detail=f"keyboard with id {id} not found"
        )

    return keyboard


@router.delete(
    "/{id}"
)
def delete_keyboard(id: int):

    session = SessionLocal()
    keyboard = session.query(models.Keyboard).get(id)

    if keyboard:
        session.delete(keyboard)
        session.commit()
        session.close()
    else:
        raise HTTPException(
            status_code=404,
            detail=f"keyboard with id {id} not found"
        )

    return f"keyboard with id {id} deleted"


@router.get(
    "/",
    response_model=List[schemas.Keyboard]
)
def read_keyboard_list():

    session = SessionLocal()
    keyboard_list = session.query(models.Keyboard).all()
    session.close()

    return keyboard_list
