"""add author_id to comments table, make it FKEY to users.id

Revision ID: 2023021523_comments_author_id
Revises: 2023021507_comments_author_id
Create Date: 2023-02-15 23:05:10.453672

"""
from alembic import op, context
import sqlalchemy as sa
import logging

# revision identifiers, used by Alembic.
revision = '2023021523_comments_author_id'
down_revision = '2023021507_posts_author_id'
branch_labels = None
depends_on = None

logger = logging.getLogger('schema_migration')
logger.setLevel(logging.INFO)


def upgrade() -> None:
    migration_context = context.get_context()
    insp = sa.engine.reflection.Inspector.from_engine(
        migration_context.connection
    )

    if 'author_id' not in [
        col['name'] for col in insp.get_columns('comments')
    ]:
        op.alter_column(
            'comments',
            'author_id',
            type_=sa.Integer,
            postgresql_using='author_id::int'
        )
    else:
        logger.info("'author_id' column already exists in table 'comments'")

    if 'comments_author_id_fkey' not in [
        fkey['name'] for fkey in insp.get_foreign_keys('comments')
    ]:

        op.create_foreign_key(
            'comments_author_id_fkey',
            'comments', 'users',
            ['author_id'], ['id'],
        )
    else:
        logger.info(
            (
                "'comments_author_id_fkey' foreign key"
                "already exists in table 'comments'"
            )
        )


def downgrade() -> None:
    pass
