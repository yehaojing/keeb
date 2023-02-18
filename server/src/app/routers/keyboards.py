from typing import List
from fastapi import APIRouter, status, HTTPException, Depends
from sqlalchemy.orm import Session

import src.app.models as models
import src.app.schemas as schemas
from src.app.dependencies import get_session, get_current_active_user

router = APIRouter(
    tags=["keyboards"]
)


def find_keyboard(
    keyboard_id: int,
    session: Session = Depends(get_session)
):
    keyboard = session.query(models.Keyboard).get(keyboard_id)

    if not keyboard:
        raise HTTPException(
            status_code=404,
            detail=f"keyboard with id {keyboard_id} not found"
        )

    return keyboard


def is_current_user_keyboard(
    keyboard: models.Keyboard = Depends(find_keyboard),
    current_user: schemas.UserInDB = Depends(get_current_active_user)
):
    if keyboard.owner_id != current_user.id:
        raise HTTPException(
            status_code=401,
            detail=(
                "Unauthorised operation on keyboard"
                f" with id '{keyboard.id}'"
            )
        )

    return keyboard


@router.post(
    "/",
    response_model=schemas.Keyboard,
    status_code=status.HTTP_201_CREATED
)
def create_keyboard(
    keyboard: schemas.KeyboardCreate,
    session: Session = Depends(get_session),
    current_user: schemas.UserInDB = Depends(get_current_active_user)
):

    keyboard_db = models.Keyboard(
        name=keyboard.name,
        switches=keyboard.switches,
        stabilisers=keyboard.stabilisers,
        keycaps=keyboard.keycaps,
        manufacturer=keyboard.manufacturer,
        owner_id=current_user.id
    )

    session.add(keyboard_db)
    session.commit()
    session.refresh(keyboard_db)
    session.close()

    return keyboard_db


@router.get(
    "/{keyboard_id}",
    response_model=schemas.Keyboard
)
def read_keyboard(
    keyboard=Depends(find_keyboard)
):

    return keyboard


@router.patch(
    "/{keyboard_id}",
    response_model=schemas.Keyboard,
)
def update_keyboard(
    keyboard_id: int,
    keyboard_patch: schemas.KeyboardPatch,
    current_user_keyboard=Depends(is_current_user_keyboard),
    session: Session = Depends(get_session)
):
    session.query(models.Keyboard) \
        .filter(models.Keyboard.id == keyboard_id) \
        .update(keyboard_patch.dict())
    session.commit()

    return find_keyboard(keyboard_id, session)


@router.delete(
    "/{keyboard_id}"
)
def delete_keyboard(
    session: Session = Depends(get_session),
    keyboard=Depends(find_keyboard),
    current_user_keyboard=Depends(is_current_user_keyboard),
):
    session.delete(keyboard)
    session.commit()

    return {"detail": f"keyboard with id {keyboard.id} deleted"}


@router.get(
    "/",
    response_model=List[schemas.Keyboard]
)
def read_keyboard_list(
    session: Session = Depends(get_session)
):

    keyboard_list = session.query(models.Keyboard).all()

    return keyboard_list
