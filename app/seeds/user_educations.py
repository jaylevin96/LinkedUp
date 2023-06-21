from app.models import db, User, UserEducation, environment, SCHEMA
from sqlalchemy.sql import text
import datetime

def seed_educations():
    for education in [
        {
            "school": "University of Illinois",
            "degree":"Bachelor's Degree",
            "userId":1,
            "field": "Information Systems",
            "fromDate": datetime.datetime(2015,8,1),
            "toDate":datetime.datetime(2019,5,1)

        },
         {
            "school": "App Academy",
            "degree":"Technical Certificate",
            "userId":2,
            "field": "Software Engineering",
            "fromDate": datetime.datetime(2023,1,1),
            "toDate":datetime.datetime(2023,7,1)

        },
         {
            "school": "University of Illinois",
            "degree":"Bachelor's Degree",
            "userId":3,
            "field": "Marketing",
            "fromDate": datetime.datetime(2015,8,1),
            "toDate":datetime.datetime(2019,5,1)

        },
    ]:
        db.session.add(UserEducation(**education))
    db.session.commit()

def undo_educations():
    if environment  == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.user_educations RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM user_educations"))
    db.session.commit()
