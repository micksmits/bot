"""Create roles table

Revision ID: 847b0196ee6e
Revises: b962af3c94f0
Create Date: 2020-03-30 16:44:16.370955

"""
from alembic import op
import sqlalchemy as sa
import enum

revision = '847b0196ee6e'
down_revision = 'b962af3c94f0'
branch_labels = None
depends_on = None

class Type(enum.Enum):
    welcome = 'welcome'
    mute = 'mute'

def upgrade():
    op.create_table(
        'roles',
        sa.Column('id', sa.BigInteger, primary_key=True),
        sa.Column('server_id', sa.BigInteger),
        sa.Column('type', sa.Enum(Type)),
    )

    op.create_foreign_key(
        'fk_servers_roles', 'roles', 'servers', ['server_id'], ['id']
    )

def downgrade():
    op.drop_table('roles')
