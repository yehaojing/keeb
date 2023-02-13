from typing import List
from fastapi import APIRouter, HTTPException, Depends
# from fastapi.encoders import jsonable_encoder
from sqlalchemy.orm import Session

import src.app.models as models
import src.app.schemas as schemas
from src.app.dependencies import get_session

router = APIRouter(
    tags=["posts"]
)


def find_post(
    post_id: int,
    session: Session = Depends(get_session)
):
    post = session.query(models.Post).get(post_id)
    return post


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
    "/{post_id}/"
)
def get_post(
    post_id: int,
    session: Session = Depends(get_session),
    post: models.Post = Depends(find_post)
):
    session.close()

    if not post:
        raise HTTPException(
            status_code=404,
            detail=f"post with id {post_id} not found"
        )

    return post


@router.patch(
    "/{post_id}/",
    response_model=schemas.Post
)
def update_post(
    post_id: int,
    post_patch: schemas.PostPatch,
    session: Session = Depends(get_session),
):
    patch_data = post_patch.dict()
    patch_data["is_edited"] = True
    session.query(models.Post) \
        .filter(models.Post.id == post_id) \
        .update(patch_data)
    session.commit()

    return find_post(post_id, session)


@router.get(
    "/",
    response_model=List[schemas.Post]
)
def read_post_list(
    session: Session = Depends(get_session)
):

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
    "/{post_id}/comments",
    response_model=schemas.Comment,
)
def create_comment(
    post_id: int,
    comment: schemas.CommentCreate,
    session: Session = Depends(get_session)
):

    comment_db = models.Comment(
        content=comment.content,
        post_id=post_id
    )

    session.add(comment_db)
    session.commit()
    session.refresh(comment_db)

    return comment_db
