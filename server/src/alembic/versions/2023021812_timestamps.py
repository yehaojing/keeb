"""add created_on, updated_on timestamps to users, posts, comments

Revision ID: 2023021812_add_timestamps
Revises: 2023021523_comments_author_id
Create Date: 2023-02-18 12:06:26.131801

"""
from alembic import op, context
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '2023021812_add_timestamps'
down_revision = '2023021523_comments_author_id'
branch_labels = None
depends_on = None

tables = ['users', 'posts', 'comments']
columns = ['created_on', 'updated_on']


def column_exists_in_table(
        table_name: str,
        column_name: str,
        inspector: sa.engine.reflection.Inspector):
    return True \
        if column_name in [
            col['name'] for col in inspector.get_columns(table_name)
        ] \
        else False


def upgrade() -> None:
    migration_context = context.get_context()
    insp = sa.engine.reflection.Inspector.from_engine(
        migration_context.connection
    )

    for table in tables:
        for column in columns:
            if not column_exists_in_table(table, column, insp):
                op.add_column(
                    table,
                    sa.Column(
                        column,
                        sa.DateTime(timezone=True),
                        server_default=sa.func.current_timestamp()
                    )
                )


def downgrade() -> None:
    migration_context = context.get_context()
    insp = sa.engine.reflection.Inspector.from_engine(
        migration_context.connection
    )
    for table in tables:
        for column in columns:
            if column_exists_in_table(table, column, insp):
                op.drop_column(table, column)
