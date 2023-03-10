from sqlalchemy import Column, Integer, String, Boolean, ForeignKey, DateTime
from sqlalchemy.sql import func
from sqlalchemy.orm import relationship
from src.app.database import Base


class Keyboard(Base):
    __tablename__ = 'keyboards'
    id = Column(Integer, primary_key=True)
    name = Column(String(50))
    switches = Column(String(50))
    stabilisers = Column(String(50))
    keycaps = Column(String(50))
    manufacturer = Column(String(50))
    owner_id = Column(Integer, ForeignKey("users.id"))
    owner = relationship("User", lazy='subquery')


class Post(Base):
    __tablename__ = 'posts'
    id = Column(Integer, primary_key=True)
    title = Column(String(50))
    content = Column(String(1024))
    author_id = Column(Integer, ForeignKey("users.id"))
    author = relationship("User", lazy='subquery')
    is_edited = Column(Boolean, default=False)
    comments = relationship("Comment", lazy='subquery')
    created_on = Column(DateTime, default=func.now())
    updated_on = Column(DateTime, default=func.now())


class Comment(Base):
    __tablename__ = "comments"
    id = Column(Integer, primary_key=True)
    content = Column(String(256))
    is_edited = Column(Boolean, default=False)
    post_id = Column(Integer, ForeignKey("posts.id"))
    author_id = Column(Integer, ForeignKey("users.id"))
    author = relationship("User", lazy='subquery')
    created_on = Column(DateTime, default=func.now())
    updated_on = Column(DateTime, default=func.now())


class User(Base):
    __tablename__ = "users"
    id = Column(Integer, primary_key=True)
    full_name = Column(String(320))
    username = Column(String(24), unique=True)
    email = Column(String(320))
    password_hash = Column(String(64))
    disabled = Column(Boolean, default=False)
    keyboards = relationship("Keyboard", lazy='subquery')
    posts = relationship("Post", lazy='subquery')
    comments = relationship("Comment", lazy='subquery')
    created_on = Column(DateTime, default=func.now())
    updated_on = Column(DateTime, default=func.now())
