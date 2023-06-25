from app.models import db, User,Comment, environment, SCHEMA
from sqlalchemy.sql import text

def seed_comments():
    for comment in [
       {
"userId": 1,
"message": "First comment on my own post! LOL!",
"postId": 1
},
{
"userId": 3,
"message": "I completely agree with your assessment. LinkedUp has definitely raised the bar!",
"postId": 2
},
{
"userId": 4,
"message": "I wish LinkedIn would take notes from LinkedUp's design. It's so refreshing!",
"postId": 3
},
{
"userId": 5,
"message": "Congratulations on landing your dream job! Wishing you all the best!",
"postId": 4
},
{
"userId": 6,
"message": "You deserve it!",
"postId": 4
},
{
"userId": 6,
"message": "Looking forward to hearing more about your new project. Good luck!",
"postId": 5
},
{
"userId": 7,
"message": "The conference sounds amazing! I wish I could have been there.",
"postId": 6
},
{
"userId": 1,
"message": "Thanks for sharing these coding tips. They are incredibly helpful!",
"postId": 7
},
{
"userId": 2,
"message": "How did you hear about all of these?!",
"postId": 7
},
{
"userId": 2,
"message": "I tried that programming tool, and it's fantastic! Thanks for the recommendation.",
"postId": 8
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
