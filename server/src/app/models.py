from sqlalchemy import Column, Integer, String, ForeignKey
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


class Post(Base):
    __tablename__ = 'posts'
    id = Column(Integer, primary_key=True)
    title = Column(String(50))
    content = Column(String(1024))
    author_id = Column(String(50))
    comments = relationship("Comment", lazy='subquery')


class Comment(Base):
    __tablename__ = "comments"
    id = Column(Integer, primary_key=True)
    content = Column(String(256))
    post_id = Column(Integer, ForeignKey("posts.id"))
