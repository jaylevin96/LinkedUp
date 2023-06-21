from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime

class UserExperience(db.Model):
    __tablename__ = "user_experiences"
    if environment == "production":
         __table_args__ = {'schema': SCHEMA}

    id= db.Column(db.Integer, primary_key=True)
    userId = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")),nullable=False)
    fromDate = db.Column(db.Date,nullable=False)
    toDate = db.Column(db.Date)
    company = db.Column(db.String(50),nullable=False)
    experienceTitle = db.Column(db.String(50),nullable=False)
    experienceDetails = db.Column(db.String(50),nullable=False)

    user = db.relationship("User", back_populates="userExperiences")

    def to_dict(self):
         return {
              'id': self.id,
              'userId': self.userId,
              'UserInfo': self.user.to_dict(),
              'company':self.company,
              'fromDate': self.fromDate.strftime("%m/%Y"),
              'toDate': self.toDate.strftime("%m/%Y"),
              'experienceTitle': self.experienceTitle,
              'experienceDetails': self.experienceDetails
         }
