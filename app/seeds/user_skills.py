from app.models import db, User, UserSkill, environment, SCHEMA
from sqlalchemy.sql import text

def seed_skills():
    for skill in [
        {
            "userId":1,
            "skill": "consulting"
        },
        {
            "userId":1,
            "skill": "software"
        },
        {
            "userId":1,
            "skill": "implementation"
        },
        {
            "userId":1,
            "skill": "agile"
        },
        {
            "userId":2,
            "skill": "software development"
        },
        {
            "userId":2,
            "skill": "Python"
        },
        {
            "userId":2,
            "skill": "Debugging"
        },
        {
            "userId":3,
            "skill": "HTML"
        },
        {
            "userId":3,
            "skill": "CSS"
        },
        {
            "userId":3,
            "skill": "JavaScript"
        },

    ]:
        db.session.add(UserSkill(**skill))
    db.session.commit()

def undo_skills():
    if environment  == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.user_skills RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM user_skills"))
    db.session.commit()
