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
    comments: list[Comment] = []

    class Config:
        orm_mode = True
