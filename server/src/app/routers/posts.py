from typing import List
from fastapi import APIRouter, Depends
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
    "/"
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


@router.post(
    "/comments",
    response_model=schemas.Comment,
)
def create_comment(
    comment: schemas.CommentCreate,
    session: Session = Depends(get_session)
):

    comment_db = models.Comment(
        content=comment.content,
        post_id=comment.post_id
    )

    session.add(comment_db)
    session.commit()
    session.refresh(comment_db)

    return comment_db
