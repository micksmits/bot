"""create reactions table

Revision ID: f8d4c218be79
Revises: 72b8dfdbb9ef
Create Date: 2020-04-27 21:28:13.679485

"""
from alembic import op
import sqlalchemy as sa

revision = 'f8d4c218be79'
down_revision = '72b8dfdbb9ef'
branch_labels = None
depends_on = None

def upgrade():
    op.create_table(
        'reactions',
        sa.Column('id', sa.BigInteger, primary_key=True),
        sa.Column('message_id', sa.BigInteger),
        sa.Column('role_id', sa.BigInteger)
    )

    op.create_foreign_key('fk_messages_reactions', 'reactions', 'messages', ['message_id'], ['id'], ondelete="CASCADE")
    op.create_foreign_key('fk_roles_reactions', 'reactions', 'roles', ['role_id'], ['id'], ondelete="CASCADE")

def downgrade():
    op.drop_table('reactions')
