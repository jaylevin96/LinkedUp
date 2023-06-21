from app.models import db, User, UserExperience, environment, SCHEMA
from sqlalchemy.sql import text
import datetime

def seed_experiences():
    for experience in [
        {'userId':1,
        'experienceTitle':"Consultant",
        "experienceDetails":"Software implementation",
        "company": "Super cool Tech Company",
        "fromDate": datetime.datetime(2021,8,1),
        "toDate":datetime.datetime(2022,5,1)
         },
          {'userId':2,
         'experienceTitle':"Engineer",
         "experienceDetails":"Software Engineer",
        "company": "Really cool Tech Company",
        "fromDate": datetime.datetime(2017,4,1),
        "toDate":datetime.datetime(2020,5,1)
         },
          {'userId':3,
         'experienceTitle':"Software Engineer Intern",
         "experienceDetails":"Made some cool websites",
        "company": "Coolest Tech Company",
        "fromDate": datetime.datetime(2021,1,10),
        "toDate":datetime.datetime(2023,5,20)
         },


    ]:
        db.session.add(UserExperience(**experience))
    db.session.commit()

def undo_experiences():
    if environment  == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.user_experiences RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM user_experiences"))
    db.session.commit()
