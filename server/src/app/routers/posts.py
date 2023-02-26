from typing import List
from fastapi import APIRouter, HTTPException, Depends
# from fastapi.encoders import jsonable_encoder
from sqlalchemy.orm import Session

import src.app.models as models
import src.app.schemas as schemas
from src.app.dependencies import get_session, get_current_active_user

router = APIRouter(
    tags=["posts"]
)


def find_post(
    post_id: int,
    session: Session = Depends(get_session)
):
    post = session.query(models.Post).get(post_id)
    return post


def find_comment(
    comment_id: int,
    session: Session = Depends(get_session)
):
    comment = session.query(models.Comment).get(comment_id)
    return comment


def is_current_user_post(
    post: models.Post = Depends(find_post),
    current_user: schemas.UserInDB = Depends(get_current_active_user)
):
    if post.author_id != current_user.id:
        raise HTTPException(
            status_code=401,
            detail=(
                "Unauthorised operation on post"
                f" with id '{post.id}'"
            )
        )

    return post


def is_current_user_comment(
    comment: models.Comment = Depends(find_comment),
    current_user: schemas.UserInDB = Depends(get_current_active_user)
):
    if comment.author_id != current_user.id:
        raise HTTPException(
            status_code=401,
            detail=(
                "Unauthorised operation on comment"
                f" with id '{comment.id}'"
            )
        )

    return comment


@router.post(
    "/"
)
def create_post(
    post: schemas.PostCreate,
    session: Session = Depends(get_session),
    current_user: schemas.UserInDB = Depends(get_current_active_user)
):
    post_db = models.Post(
        title=post.title,
        content=post.content,
        author_id=current_user.id
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
    current_user_post=Depends(is_current_user_post),
    session: Session = Depends(get_session),
):
    patch_data = post_patch.dict()
    patch_data["is_edited"] = True
    session.query(models.Post) \
        .filter(models.Post.id == post_id) \
        .update(patch_data)
    session.commit()

    return find_post(post_id, session)


@router.delete(
    "/{post_id}/",
)
def delete_post(
    post=Depends(find_post),
    session: Session = Depends(get_session),
    current_user_post=Depends(is_current_user_post),
):
    session.delete(post)
    session.commit()

    return {"detail": f"post with id {post.id} deleted"}


@router.get(
    "/",
    response_model=List[schemas.Post]
)
def read_post_list(
    session: Session = Depends(get_session)
):

    resp = (
        session
        .query(models.Post)
        .all()
    )
    session.close()

    return resp


@router.post(
    "/{post_id}/comments",
    response_model=schemas.Comment,
)
def create_comment(
    post_id: int,
    comment: schemas.CommentCreate,
    session: Session = Depends(get_session),
    current_user: schemas.UserInDB = Depends(get_current_active_user)
):

    comment_db = models.Comment(
        content=comment.content,
        post_id=post_id,
        author_id=current_user.id
    )

    session.add(comment_db)
    session.commit()
    session.refresh(comment_db)

    return comment_db


@router.get(
    "/{post_id}/comments/{comment_id}",
    response_model=schemas.Comment,
)
def get_comment(
    comment: models.Comment = Depends(find_comment),
):

    return comment


@router.patch(
    "/{post_id}/comments/{comment_id}",
    response_model=schemas.Comment
)
def update_comment(
    comment_id: int,
    comment_patch: schemas.CommentPatch,
    current_user_post=Depends(is_current_user_comment),
    session: Session = Depends(get_session),
):
    patch_data = comment_patch.dict()
    patch_data["is_edited"] = True
    session.query(models.Comment) \
        .filter(models.Comment.id == comment_id) \
        .update(patch_data)
    session.commit()

    return find_comment(comment_id, session)


@router.delete(
    "/{post_id}/comments/{comment_id}",
)
def delete_comment(
    current_user_post=Depends(is_current_user_comment),
    comment: models.Comment = Depends(find_comment),
    session: Session = Depends(get_session),
):
    session.delete(comment)
    session.commit()

    return {"detail": f"post with id {comment.id} deleted"}
