"""change posts.author_id type to int, makes it FKEY to users.id

Revision ID: 2023021507_posts_author_id
Revises:
Create Date: 2023-02-15 07:35:46.559138

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '2023021507_posts_author_id'
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    op.alter_column(
        'posts',
        'author_id',
        type_=sa.Integer,
        postgresql_using='author_id::int'
    )

    op.create_foreign_key(
        'posts_author_id_fkey',
        'posts', 'users',
        ['author_id'], ['id'],
    )


def downgrade():
    pass
