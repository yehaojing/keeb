"""change posts.author_id type to int, makes it FKEY to users.id

Revision ID: 2023021507_posts_author_id
Revises:
Create Date: 2023-02-15 07:35:46.559138

"""
from alembic import op, context
import sqlalchemy as sa
import logging

# revision identifiers, used by Alembic.
revision = '2023021507_posts_author_id'
down_revision = None
branch_labels = None
depends_on = None

logger = logging.getLogger('schema_migration')
logger.setLevel(logging.INFO)

migration_context = context.get_context()
insp = sa.engine.reflection.Inspector.from_engine(migration_context.connection)


def upgrade():
    if 'author_id' not in [col['name'] for col in insp.get_columns('posts')]:
        op.alter_column(
            'posts',
            'author_id',
            type_=sa.Integer,
            postgresql_using='author_id::int'
        )

    else:
        logger.info("'author_id' column already exists in table 'posts'")

    if 'posts_author_id_fkey' not in [
        fkey['name'] for fkey in insp.get_foreign_keys('posts')
    ]:

        op.create_foreign_key(
            'posts_author_id_fkey',
            'posts', 'users',
            ['author_id'], ['id'],
        )
    else:
        logger.info(
            (
                "'posts_author_id_fkey' foreign key"
                "already exists in table 'posts'"
            )
        )


def downgrade():
    pass
