from app.models import db, User,Post, environment, SCHEMA
from sqlalchemy.sql import text
def seed_posts():
    for post in [
        {"userId":1,
         "message":"First post. very cool"

         },
         {"userId":1,
         "message":"wow I am even the second to post here"

         },
         {"userId":2,
         "message":"Linked up is way better!"

         },
         {"userId":3,
         "message":"Why doesn't linked in look like this?"

         }


    ]:
        db.session.add(Post(**post))
    db.session.commit()

def undo_posts():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.posts RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM posts"))

    db.session.commit()
