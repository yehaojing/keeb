from pydantic import BaseModel

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

class Post(BaseModel):
    id: int
    title: str
    content: str
    author_id: int

    class Config:
        orm_mode = True
