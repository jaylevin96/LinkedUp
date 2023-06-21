from .db import db, environment, SCHEMA, add_prefix_for_prod

class UserSkill(db.Model):
    __tablename__ = "user_skills"
    if environment == "production":
         __table_args__ = {'schema': SCHEMA}

    id= db.Column(db.Integer, primary_key=True)
    userId = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")),nullable=False)
    skill = db.Column(db.String(50),nullable=False)


    user = db.relationship("User", back_populates="userSkills")

    def to_dict(self):
        return {
        'id': self.id,
        'userId': self.userId,
        'UserInfo': self.user.to_dict(),
        'skill': self.skill
        }
