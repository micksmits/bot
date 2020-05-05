"""create channels table

Revision ID: 01ded259b018
Revises: 838dac6878ea
Create Date: 2020-02-24 22:26:47.498401

"""
from alembic import op
import sqlalchemy as sa
import enum

revision = '01ded259b018'
down_revision = '838dac6878ea'
branch_labels = None
depends_on = None

class Type(enum.Enum):
    logs = 'logs'
    media = 'media'

def upgrade():
    op.create_table(
        'channels',
        sa.Column('id', sa.BigInteger, primary_key=True),
        sa.Column('guild_id', sa.BigInteger),
        sa.Column('type', sa.Enum(Type)),
    )

    op.create_foreign_key('fk_guilds_channels', 'channels', 'guilds', ['guild_id'], ['id'], ondelete="CASCADE")

def downgrade():
    op.drop_table('channels')
