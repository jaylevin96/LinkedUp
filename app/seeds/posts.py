from app.models import db, User,Post, environment, SCHEMA
from sqlalchemy.sql import text
def seed_posts():
    for post in [
        {
"userId": 1,
"message": "This is my first post on this amazing platform. I'm really impressed with the features and user interface. Looking forward to connecting with like-minded professionals!"
},
{
"userId": 2,
"message": "I've been using LinkedUp for a while now, and I must say it's way better than any other professional networking platform out there. The interface is sleek, the recommendations are spot-on, and the overall user experience is top-notch. Highly recommend!"
},
{
"userId": 3,
"message": "Why doesn't LinkedIn look like this? LinkedUp has set a new standard for professional networking. The design is refreshing, and the features are intuitive. It's about time someone shook up the industry!"
},
{
"userId": 4,
"message": "I'm thrilled to announce that I've landed my dream job! It's a wonderful opportunity, and I can't wait to embark on this exciting new journey. Special thanks to everyone who supported me along the way!"
},
{
"userId": 4,
"message": "Starting my new project today. It's an ambitious endeavor, but I'm confident in my skills and the team I'm working with. Stay tuned for updates on our progress!"
},
{
"userId": 5,
"message": "Had the privilege of attending a great conference today. The keynote speakers were inspiring, and the breakout sessions provided valuable insights. Grateful for the opportunity to expand my knowledge and connect with industry experts."
},
{
"userId": 6,
"message": "In this post, I'll be sharing some coding tips and tricks that I've learned throughout my career. These techniques have helped me streamline my workflow and write more efficient code. Hope you find them useful!"
},
{
"userId": 6,
"message": "Check out this cool programming tool I found recently. It's a game-changer for developers, making complex tasks much easier. Give it a try and let me know what you think!"
},

{
"userId": 7,
"message": "Working on a challenging UI project that requires a perfect balance between aesthetics and usability. It's a great opportunity to apply my skills and create a seamless user experience. Looking forward to overcoming the design hurdles!"
},

    ]:
        db.session.add(Post(**post))
    db.session.commit()

def undo_posts():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.posts RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM posts"))

    db.session.commit()
