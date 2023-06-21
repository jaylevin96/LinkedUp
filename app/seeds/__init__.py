from flask.cli import AppGroup
from .users import seed_users, undo_users
from .posts import seed_posts, undo_posts
from .comments import seed_comments, undo_comments
from .user_educations import seed_educations, undo_educations
from .user_experiences import seed_experiences, undo_experiences
from .user_skills import seed_skills, undo_skills

from app.models.db import db, environment, SCHEMA

# Creates a seed group to hold our commands
# So we can type `flask seed --help`
seed_commands = AppGroup('seed')


# Creates the `flask seed all` command
@seed_commands.command('all')
def seed():
    if environment == 'production':
        # Before seeding in production, you want to run the seed undo
        # command, which will  truncate all tables prefixed with
        # the schema name (see comment in users.py undo_users function).
        # Make sure to add all your other model's undo functions below
        undo_users()
        undo_posts()
        undo_comments()
        undo_skills()
        undo_experiences()
        undo_educations()
    seed_users()
    seed_posts()
    seed_comments()
    seed_educations()
    seed_experiences()
    seed_skills()
    # Add other seed functions here


# Creates the `flask seed undo` command
@seed_commands.command('undo')
def undo():
    undo_users()
    undo_posts()
    undo_comments()
    undo_skills()
    undo_experiences()
    undo_educations()
    # Add other undo functions here
