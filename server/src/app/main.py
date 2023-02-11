from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from src.app.database import Base, engine
from src.app.routers import keyboards, posts

Base.metadata.create_all(engine)

app = FastAPI()

origins = [
    "*",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(keyboards.router, prefix="/keyboard")
app.include_router(posts.router, prefix="/posts")
