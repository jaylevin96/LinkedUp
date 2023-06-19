from .db import db, environment, SCHEMA, add_prefix_for_prod
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin


class User(db.Model, UserMixin):
    __tablename__ = 'users'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    first_name = db.Column(db.String(40),nullable=False)
    last_name = db.Column(db.String(40),nullable=False)
    title = db.Column(db.String(40),nullable=False)
    profileImage = db.Column(db.String(255),default="https://jlevin96-bucket.s3.us-east-2.amazonaws.com/b6a0d1d480e5447595dc6c0f054eba13.jpg")
    email = db.Column(db.String(255), nullable=False, unique=True)
    hashed_password = db.Column(db.String(255), nullable=False)

    @property
    def password(self):
        return self.hashed_password

    @password.setter
    def password(self, password):
        self.hashed_password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)

    def to_dict(self):
        return {
            'id': self.id,
            'firstname':self.first_name,
            'lastname':self.last_name,
            'email': self.email,
            'title':self.title,
            'profileImage': self.profileImage
        }
    userPosts = db.relationship("Post", back_populates="user",cascade="delete-orphan, all")
    userComments = db.relationship("Comment",back_populates="user",cascade="delete-orphan, all")
