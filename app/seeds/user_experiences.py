from app.models import db, User, UserExperience, environment, SCHEMA
from sqlalchemy.sql import text
import datetime

def seed_experiences():
    for experience in [
       {
        'userId': 1,
        'experienceTitle': "Consultant",
        "experienceDetails": "Software implementation",
        "company": "Super cool Tech Company",
        "fromDate": datetime.datetime(2021, 8, 1),
        "toDate": datetime.datetime(2022, 5, 1)
    },
    {
        'userId': 2,
        'experienceTitle': "Software Engineer",
        "experienceDetails": "Developed scalable web applications",
        "company": "Tech Solutions Inc.",
        "fromDate": datetime.datetime(2019, 6, 1),
        "toDate": datetime.datetime(2021, 12, 31)
    },
    {
        'userId': 3,
        'experienceTitle': "Senior Software Engineer",
        "experienceDetails": "Led cross-functional development teams",
        "company": "Innovative Tech Corp.",
        "fromDate": datetime.datetime(2018, 5, 1),
        "toDate": datetime.datetime(2022, 2, 28)
    },
    {
        'userId': 4,
        'experienceTitle': "Software Development Manager",
        "experienceDetails": "Managed software projects and teams",
        "company": "Global Software Solutions",
        "fromDate": datetime.datetime(2017, 9, 1),
        "toDate": datetime.datetime(2023, 3, 15)
    },
    {
        'userId': 5,
        'experienceTitle': "UX Designer",
        "experienceDetails": "Designed intuitive user interfaces",
        "company": "Design Studio Ltd.",
        "fromDate": datetime.datetime(2016, 4, 1),
        "toDate": datetime.datetime(2022, 8, 31)
    },
    {
        'userId': 6,
        'experienceTitle': "Frontend Developer",
        "experienceDetails": "Implemented responsive web designs",
        "company": "Tech Innovators Co.",
        "fromDate": datetime.datetime(2015, 7, 1),
        "toDate": datetime.datetime(2018, 12, 31)
    },
    {
        'userId': 7,
        'experienceTitle': "Product Manager",
        "experienceDetails": "Managed product roadmap and strategy",
        "company": "Software Solutions Ltd.",
        "fromDate": datetime.datetime(2014, 10, 1),
        "toDate": datetime.datetime(2021, 6, 30)
    },
    {
        'userId': 8,
        'experienceTitle': "Data Scientist",
        "experienceDetails": "Analyzed large datasets for insights",
        "company": "Data Analytics Inc.",
        "fromDate": datetime.datetime(2019, 2, 1),
        "toDate": datetime.datetime(2023, 1, 31)
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
