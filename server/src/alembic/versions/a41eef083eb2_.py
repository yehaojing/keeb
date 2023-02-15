"""add author_id to comments table, make it FKEY to users.id

Revision ID: a41eef083eb2
Revises: a25ed1ec5d05
Create Date: 2023-02-15 23:05:10.453672

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'a41eef083eb2'
down_revision = 'a25ed1ec5d05'
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
