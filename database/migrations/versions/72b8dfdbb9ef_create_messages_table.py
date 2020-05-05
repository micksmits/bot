"""create messages table

Revision ID: 72b8dfdbb9ef
Revises: 847b0196ee6e
Create Date: 2020-04-27 21:27:27.067991

"""
from alembic import op
import sqlalchemy as sa

revision = '72b8dfdbb9ef'
down_revision = '847b0196ee6e'
branch_labels = None
depends_on = None

def upgrade():
    op.create_table(
        'messages',
        sa.Column('id', sa.BigInteger, primary_key=True),
        sa.Column('guild_id', sa.BigInteger),
    )

    op.create_foreign_key('fk_guilds_messages', 'messages', 'guilds', ['guild_id'], ['id'], ondelete="CASCADE")

def downgrade():
    op.drop_table('messages')
