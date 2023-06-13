from app.models import db, User,Comment, environment, SCHEMA
from sqlalchemy.sql import text

def seed_comments():
    for comment in [
        {
            "userId": 1,
            "message": "first comment on my own post! LOL!",
            "postId":1

        },
        {
            "userId": 2,
            "postId":1,
            "message": "cool..."
        },
        {
            "userId": 3,
            "postId":2,
            "message": "Right?!?!?! I can't believe they overcomplicated everything..."
        },


    ]:
        db.session.add(Comment(**comment))
    db.session.commit()

def undo_comments():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.comments RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM comments"))

    db.session.commit()
