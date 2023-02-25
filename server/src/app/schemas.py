from pydantic import BaseModel
from datetime import datetime
# from typing import Optional


# Keybaord
class KeyboardBase(BaseModel):
    name: str
    switches: str
    stabilisers: str
    keycaps: str
    manufacturer: str


class KeyboardCreate(KeyboardBase):
    pass


class KeyboardPatch(KeyboardBase):
    pass


# Comment
class CommentBase(BaseModel):
    content: str


class Comment(CommentBase):
    id: int
    post_id: int
    author_id: int
    is_edited: bool
    created_on: datetime
    updated_on: datetime

    class Config:
        orm_mode = True


class CommentCreate(CommentBase):
    pass


class CommentPatch(CommentBase):
    pass


# Post
class PostBase(BaseModel):
    title: str
    content: str


class PostCreate(PostBase):
    pass


class Post(PostCreate):
    id: int
    author_id: int
    is_edited: bool
    comments: list[Comment] = []
    created_on: datetime
    updated_on: datetime

    class Config:
        orm_mode = True


class PostPatch(PostBase):
    pass


# User
class User(BaseModel):
    username: str
    email: str | None = None
    full_name: str | None = None
    disabled: bool | None = False
    created_on: datetime
    updated_on: datetime

    class Config:
        orm_mode = True


class UserCreate(User):
    password: str


class Keyboard(KeyboardBase):
    id: int
    owner: User

    class Config:
        orm_mode = True


class UserInDB(User):
    id: int
    password_hash: str
    keyboards: list[Keyboard] = []
    posts: list[Post] = []


class Token(BaseModel):
    access_token: str
    token_type: str


class TokenData(BaseModel):
    username: str | None = None
