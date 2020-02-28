"""create users table

Revision ID: b962af3c94f0
Revises: 01ded259b018
Create Date: 2020-02-24 22:49:31.516911

"""
from alembic import op
import sqlalchemy as sa

revision = 'b962af3c94f0'
down_revision = '01ded259b018'
branch_labels = None
depends_on = None

def upgrade():
    op.create_table(
        'users',
        sa.Column('id', sa.BigInteger, primary_key=True),
    )

def downgrade():
    op.drop_table('users')
