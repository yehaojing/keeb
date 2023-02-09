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
    response_model=schemas.Post,
    status_code=status.HTTP_201_CREATED
)
def create_post(
    post: schemas.PostCreate,
    session: Session = Depends(get_session)
):

    post_db = models.Post(
        title=post.title,
        content=post.content,
        author_id=post.author_id
    )

    session.add(post_db)
    session.commit()
    session.refresh(post_db)

    return post_db


@router.get(
    "/{id}", 
    response_model=schemas.Post
)
def read_post(id: int):

    session = SessionLocal()
    post = session.query(models.Post).get(id)
    session.close()

    if not post:
        raise HTTPException(
            status_code=404,
            detail=f"post with id {id} not found"
        )

    return post


@router.put(
    "/{id}", 
    response_model=schemas.Post
)
def update_post(id: int, content: str):

    session = SessionLocal()
    post = session.query(models.Post).get(id)

    if post:
        post.content = content
        session.commit()

    session.close()

    if not post:
        raise HTTPException(
            status_code=404,
            detail=f"post with id {id} not found"
        )

    return post


@router.delete(
    "/{id}"
)
def delete_post(id: int):

    session = SessionLocal()
    post = session.query(models.Post).get(id)

    if post:
        session.delete(post)
        session.commit()
        session.close()
    else:
        raise HTTPException(
            status_code=404,
            detail=f"post with id {id} not found"
        )

    return f"post with id {id} deleted"


@router.get(
    "/",
    response_model=List[schemas.Post]
)
def read_post_list():

    session = SessionLocal()
    post_list = session.query(models.Post).all()
    session.close()

    return post_list
