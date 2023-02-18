"""add author_id to comments table, make it FKEY to users.id

Revision ID: 2023021523_comments_author_id
Revises: 2023021507_posts_author_id
Create Date: 2023-02-15 23:05:10.453672

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '2023021523_comments_author_id'
down_revision = '2023021507_posts_author_id'
branch_labels = None
depends_on = None


def upgrade() -> None:
    op.add_column(
        'comments',
        sa.Column('author_id', sa.Integer)
    )

    op.create_foreign_key(
        'comments_author_id_fkey',
        'comments', 'users',
        ['author_id'], ['id'],
    )


def downgrade() -> None:
    pass
