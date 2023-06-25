from app.models import db, User, environment, SCHEMA
from sqlalchemy.sql import text


# Adds a demo user, you can add other users here if you want
def seed_users():
    demo = User(
        first_name="Jay", last_name="Levin", email='demo@aa.io', password='password', title="Student at App Academy", profileImage="https://jlevin96-bucket.s3.us-east-2.amazonaws.com/ef73f5731bde403da420e69b788d24db.jpg")
    marnie = User(
        first_name="Marnie",last_name="Garrett", email='marnie@aa.io', password='password', title="Software Engineer",profileImage="https://jlevin96-bucket.s3.us-east-2.amazonaws.com/86cda83ac22646028a63b09c83b31031.jpg")
    teddy = User(
        first_name="Teddy",last_name="Hawkins", email='bobbie@aa.io', password='password', title="SWE Lead", profileImage="https://jlevin96-bucket.s3.us-east-2.amazonaws.com/90302c0b295944449704f58fc28f9814.jpg")
    alex = User(
    first_name="Alex", last_name="Turner", email='alex@aa.io', password='password', title="Data Scientist",profileImage="https://jlevin96-bucket.s3.us-east-2.amazonaws.com/7e596d0d3a924c8e9b941f83aea268df.jpg")

    sophie = User(
    first_name="Sophie", last_name="Anderson", email='sophie@aa.io', password='password', title="Product Manager", profileImage="https://jlevin96-bucket.s3.us-east-2.amazonaws.com/ecf71e5534b445d184e5e5701cf48991.jpg")

    john = User(
    first_name="John", last_name="Johnson", email='john@aa.io', password='password', title="UX Designer")

    emily = User(
    first_name="Emily", last_name="Brown", email='emily@aa.io', password='password', title="Frontend Developer")

    db.session.add(demo)
    db.session.add(marnie)
    db.session.add(teddy)
    db.session.add(alex)
    db.session.add(sophie)
    db.session.add(john)
    db.session.add(emily)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_users():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM users"))

    db.session.commit()
