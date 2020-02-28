"""create servers table

Revision ID: 838dac6878ea
Revises: 
Create Date: 2020-02-24 21:31:55.525861

"""
from alembic import op
import sqlalchemy as sa

revision = '838dac6878ea'
down_revision = None
branch_labels = None
depends_on = None

def upgrade():
    op.create_table(
        'servers',
        sa.Column('id', sa.BigInteger, primary_key=True),
    )

def downgrade():
    op.drop_table('servers')
