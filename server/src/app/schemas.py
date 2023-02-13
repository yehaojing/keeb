from pydantic import BaseModel
from typing import Optional


class KeyboardCreate(BaseModel):
    name: str
    switches: str
    stabilisers: str
    keycaps: str
    manufacturer: str


class PostCreate(BaseModel):
    title: str
    content: str
    author_id: int


class Keyboard(BaseModel):
    id: int
    name: str
    switches: str
    stabilisers: str
    keycaps: str
    manufacturer: str

    class Config:
        orm_mode = True


class Comment(BaseModel):
    id: int
    content: str
    post_id: int

    class Config:
        orm_mode = True


class CommentCreate(BaseModel):
    content: str


class Post(BaseModel):
    id: int
    title: str
    content: str
    author_id: int
    is_edited: bool
    comments: list[Comment] = []

    class Config:
        orm_mode = True


class PostPatch(BaseModel):
    title: str
    content: str


class User(BaseModel):
    username: str
    email: str | None = None
    full_name: str | None = None
    disabled: bool | None = False

    class Config:
        orm_mode = True


class UserCreate(User):
    password: str


class UserInDB(User):
    id: int
    password_hash: str


class Token(BaseModel):
    access_token: str
    token_type: str
