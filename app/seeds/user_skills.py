from app.models import db, User, UserSkill, environment, SCHEMA
from sqlalchemy.sql import text

def seed_skills():
    for skill in [
       {
        "userId": 1,
        "skill": "consulting"
    },
    {
        "userId": 1,
        "skill": "software implementation"
    },
    {
        "userId": 1,
        "skill": "project management"
    },
    {
        "userId": 1,
        "skill": "data analysis"
    },
    {
        "userId": 1,
        "skill": "team collaboration"
    },
    {
        "userId": 2,
        "skill": "software engineering"
    },
    {
        "userId": 2,
        "skill": "web development"
    },
    {
        "userId": 2,
        "skill": "agile methodologies"
    },
    {
        "userId": 2,
        "skill": "problem-solving"
    },
    {
        "userId": 2,
        "skill": "testing and debugging"
    },
    {
        "userId": 3,
        "skill": "leadership"
    },
    {
        "userId": 3,
        "skill": "full-stack development"
    },
    {
        "userId": 3,
        "skill": "software architecture"
    },
    {
        "userId": 3,
        "skill": "agile project management"
    },
    {
        "userId": 3,
        "skill": "team collaboration"
    },
    {
        "userId": 4,
        "skill": "software project management"
    },
    {
        "userId": 4,
        "skill": "team leadership"
    },
    {
        "userId": 4,
        "skill": "agile methodologies"
    },
    {
        "userId": 4,
        "skill": "communication skills"
    },
    {
        "userId": 4,
        "skill": "problem-solving"
    },
    {
        "userId": 5,
        "skill": "user experience design"
    },
    {
        "userId": 5,
        "skill": "usability testing"
    },
    {
        "userId": 5,
        "skill": "information architecture"
    },
    {
        "userId": 5,
        "skill": "user research"
    },
    {
        "userId": 5,
        "skill": "prototyping"
    },
    {
        "userId": 6,
        "skill": "frontend development"
    },
    {
        "userId": 6,
        "skill": "HTML/CSS"
    },
    {
        "userId": 6,
        "skill": "JavaScript"
    },
    {
        "userId": 6,
        "skill": "React.js"
    },
    {
        "userId": 6,
        "skill": "responsive design"
    },
    {
        "userId": 7,
        "skill": "product management"
    },
    {
        "userId": 7,
        "skill": "product strategy"
    },
    {
        "userId": 7,
        "skill": "market research"
    },
    {
        "userId": 7,
        "skill": "data analysis"
    },
    {
        "userId": 7,
        "skill": "agile methodologies"
    }

    ]:
        db.session.add(UserSkill(**skill))
    db.session.commit()

def undo_skills():
    if environment  == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.user_skills RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM user_skills"))
    db.session.commit()
