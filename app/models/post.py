from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime

class Post(db.Model):
    __tablename__ = "posts"
    if environment == "production":
        __table_args__ = {'schema': SCHEMA}


    id = db.Column(db.Integer, primary_key=True)
    userId = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")),nullable=False)
    message = db.Column(db.String(255), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow)

    user = db.relationship("User", back_populates="userPosts")
    postComments = db.relationship("Comment", back_populates="post",cascade="delete-orphan, all")

    def to_dict(self):
        return {
            'id': self.id,
            'userId': self.userId,
            'UserInfo': self.user.to_dict(),
            'message': self.message,
            'createdAt':self.created_at.strftime("%m/%d/%Y, %H:%M:%S"),
            'updatedAt':self.updated_at.strftime("%m/%d/%Y, %H:%M:%S"),
        }
