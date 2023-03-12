"""add images to keyboard, owners to images

Revision ID: 2023031216_images
Revises: 2023021812_add_timestamps
Create Date: 2023-03-12 16:24:44.100819

"""
from alembic import op, context
import sqlalchemy as sa
import logging


# revision identifiers, used by Alembic.
revision = '2023031216_images'
down_revision = '2023021812_add_timestamps'
branch_labels = None
depends_on = None

logger = logging.getLogger('schema_migration')
logger.setLevel(logging.INFO)


def upgrade() -> None:
    migration_context = context.get_context()
    insp = sa.engine.reflection.Inspector.from_engine(
        migration_context.connection
    )

    if 'owner_id' not in [
        col['name'] for col in insp.get_columns('images')
    ]:
        op.add_column(
            "images",
            sa.Column(
                "owner_id",
                sa.Integer
            )
        )
    else:
        logger.info("'owner_id' column already exists in table 'images'")

    if 'keyboard_id' not in [
        col['name'] for col in insp.get_columns('images')
    ]:
        op.add_column(
            "images",
            sa.Column(
                "keyboard_id",
                sa.Integer
            )
        )
    else:
        logger.info("'keyboard_id' column already exists in table 'images'")

    if 'images_owner_id_fkey' not in [
        fkey['name'] for fkey in insp.get_foreign_keys('images')
    ]:

        op.create_foreign_key(
            'images_owner_id_fkey',
            'images', 'users',
            ['owner_id'], ['id'],
        )
    else:
        logger.info(
            (
                "'images_owner_id_fkey' foreign key"
                "already exists in table 'images'"
            )
        )

    if 'images_keyboard_id_fkey' not in [
        fkey['name'] for fkey in insp.get_foreign_keys('images')
    ]:

        op.create_foreign_key(
            'images_keyboard_id_fkey',
            'images', 'keyboards',
            ['keyboard_id'], ['id'],
        )
    else:
        logger.info(
            (
                "'images_keyboard_id_fkey' foreign key"
                "already exists in table 'images'"
            )
        )


def downgrade() -> None:
    pass
