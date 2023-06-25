from app.models import db, User, UserEducation, environment, SCHEMA
from sqlalchemy.sql import text
import datetime

def seed_educations():
    for education in [
        {
        "school": "University of Illinois",
        "degree": "Bachelor's Degree",
        "userId": 1,
        "field": "Information Systems",
        "fromDate": datetime.datetime(2015, 8, 1),
        "toDate": datetime.datetime(2019, 5, 1)
    },
    {
        "school": "Stanford University",
        "degree": "Master's Degree",
        "userId": 2,
        "field": "Computer Science",
        "fromDate": datetime.datetime(2020, 9, 1),
        "toDate": datetime.datetime(2022, 5, 1)
    },
    {
        "school": "App Academy",
        "degree": "Certificate",
        "userId": 1,
        "field": "Software Engineering",
        "fromDate": datetime.datetime(2023, 1, 1),
        "toDate": datetime.datetime(2023, 7, 1)
    },
    {
        "school": "University of California, Berkeley",
        "degree": "Bachelor's Degree",
        "userId": 2,
        "field": "Computer Science",
        "fromDate": datetime.datetime(2015, 8, 1),
        "toDate": datetime.datetime(2019, 5, 1)
    },
    {
        "school": "App Academy",
        "degree": "Certificate",
        "userId": 3,
        "field": "Software Engineering",
        "fromDate": datetime.datetime(2020, 9, 1),
        "toDate": datetime.datetime(2021, 3, 1)
    },
    {
        "school": "Harvard University",
        "degree": "Bachelor's Degree",
        "userId": 3,
        "field": "Electrical Engineering",
        "fromDate": datetime.datetime(2015, 8, 1),
        "toDate": datetime.datetime(2019, 5, 1)
    },
    {
        "school": "App Academy",
        "degree": "Certificate",
        "userId": 4,
        "field": "Software Engineering",
        "fromDate": datetime.datetime(2015, 8, 1),
        "toDate": datetime.datetime(2016, 2, 1)
    },
    {
        "school": "Carnegie Mellon University",
        "degree": "Master's Degree",
        "userId": 4,
        "field": "Software Engineering",
        "fromDate": datetime.datetime(2020, 9, 1),
        "toDate": datetime.datetime(2022, 5, 1)
    },
    {
        "school": "University of California, Los Angeles",
        "degree": "Bachelor's Degree",
        "userId": 5,
        "field": "Computer Science",
        "fromDate": datetime.datetime(2015, 8, 1),
        "toDate": datetime.datetime(2019, 5, 1)
    },
    {
        "school": "University of Washington",
        "degree": "Master's Degree",
        "userId": 5,
        "field": "Human-Computer Interaction",
        "fromDate": datetime.datetime(2020, 9, 1),
        "toDate": datetime.datetime(2022, 5, 1)
    },
    {
        "school": "App Academy",
        "degree": "Certificate",
        "userId": 6,
        "field": "Software Engineering",
        "fromDate": datetime.datetime(2019, 6, 1),
        "toDate": datetime.datetime(2019, 12, 1)
    },
    {
        "school": "University of California, San Diego",
        "degree": "Bachelor's Degree",
        "userId": 6,
        "field": "Computer Science",
        "fromDate": datetime.datetime(2015, 8, 1),
        "toDate": datetime.datetime(2019, 5, 1)
    },
    {
        "school": "App Academy",
        "degree": "Certificate",
        "userId": 7,
        "field": "Software Engineering",
        "fromDate": datetime.datetime(2018, 3, 1),
        "toDate": datetime.datetime(2018, 9, 1)
    },
    {
        "school": "University of California, Santa Barbara",
        "degree": "Bachelor's Degree",
        "userId": 7,
        "field": "Computer Science",
        "fromDate": datetime.datetime(2014, 9, 1),
        "toDate": datetime.datetime(2018, 6, 1)
    },
    {
        "school": "Yale University",
        "degree": "Master's Degree",
        "userId": 8,
        "field": "Computer Science",
        "fromDate": datetime.datetime(2020, 9, 1),
        "toDate": datetime.datetime(2022, 5, 1)
    },
    {
        "school": "Princeton University",
        "degree": "Bachelor's Degree",
        "userId": 8,
        "field": "Electrical Engineering",
        "fromDate": datetime.datetime(2016, 9, 1),
        "toDate": datetime.datetime(2020, 5, 1)
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
