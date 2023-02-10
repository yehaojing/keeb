from typing import List
from fastapi import APIRouter

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


@router.get(
    "/",
    response_model=List[schemas.Post]
)
def read_post_list():

    session = SessionLocal()
    resp = (
        session
        .query(models.Post, models.Comment)
        .join(models.Comment, isouter=True)
        .all()
    )
    session.close()

    post_list = [p for (p, c) in resp]

    return post_list
