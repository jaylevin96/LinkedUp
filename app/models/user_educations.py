from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime

class UserEducation(db.Model):
    __tablename__ = 'user_educations'
    if environment == "production":
         __table_args__ = {'schema': SCHEMA}

    id= db.Column(db.Integer, primary_key=True)
    field = db.Column(db.String(50), nullable=False)
    userId = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")),nullable=False)
    school = db.Column(db.String(50),nullable=False)
    degree = db.Column(db.String(50),nullable=False)
    fromDate = db.Column(db.Date,nullable=False)
    toDate = db.Column(db.Date)

    user = db.relationship("User", back_populates="userEducations")

    def to_dict(self):
         return {
              'id': self.id,
              'userId': self.userId,
              'UserInfo': self.user.to_dict(),
              'field': self.field,
              'school': self.school,
              'degree':self.degree,
              'fromDate': self.fromDate.strftime("%m/%Y"),
              'toDate': self.toDate.strftime("%m/%Y")
         }
