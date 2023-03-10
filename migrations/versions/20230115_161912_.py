"""empty message

Revision ID: 8d9b8bd15152
Revises: 684bb6fd511a
Create Date: 2023-01-15 16:19:12.046833

"""
from alembic import op
import sqlalchemy as sa

import os
environment = os.getenv("FLASK_ENV")
SCHEMA = os.environ.get("SCHEMA")

# revision identifiers, used by Alembic.
revision = '8d9b8bd15152'
down_revision = '684bb6fd511a'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('albums',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('owner_id', sa.Integer(), nullable=True),
    sa.Column('title', sa.String(), nullable=True),
    sa.Column('album_img_url', sa.Text(), nullable=True),
    sa.Column('artist', sa.String(length=255), nullable=True),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('playlists',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('user_id', sa.Integer(), nullable=True),
    sa.Column('title', sa.String(length=255), nullable=False),
    sa.Column('description', sa.Text(), nullable=False),
    sa.Column('playlist_img_url', sa.Text(), nullable=False),
    sa.Column('created_at', sa.Date(), nullable=False),
    sa.Column('updated_at', sa.Date(), nullable=False),
    sa.ForeignKeyConstraint(['user_id'], ['users.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('playlist_songs',
    sa.Column('playlist_id', sa.Integer(), nullable=False),
    sa.Column('song_id', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['playlist_id'], ['playlists.id'], ),
    sa.ForeignKeyConstraint(['song_id'], ['songs.id'], ),
    sa.PrimaryKeyConstraint('playlist_id', 'song_id')
    )
    op.add_column('songs', sa.Column('title', sa.String(length=255), nullable=False))
    op.add_column('songs', sa.Column('album_id', sa.Integer(), nullable=True))
    op.add_column('songs', sa.Column('song_url', sa.Text(), nullable=True))
    op.create_foreign_key(None, 'songs', 'albums', ['album_id'], ['id'])
    # op.drop_column('songs', 'url')
    # ### end Alembic commands ###
    if environment == "production":
            op.execute(f"ALTER TABLE albums SET SCHEMA {SCHEMA};")
            op.execute(f"ALTER TABLE playlists SET SCHEMA {SCHEMA};")
            op.execute(f"ALTER TABLE playlist_songs SET SCHEMA {SCHEMA};")




def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('songs', sa.Column('url', sa.VARCHAR(), nullable=False))
    op.drop_constraint(None, 'songs', type_='foreignkey')
    op.drop_column('songs', 'song_url')
    op.drop_column('songs', 'album_id')
    op.drop_column('songs', 'title')
    op.drop_table('playlist_songs')
    op.drop_table('playlists')
    op.drop_table('albums')
    # ### end Alembic commands ###