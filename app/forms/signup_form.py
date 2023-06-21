from flask_wtf import FlaskForm
from wtforms import StringField
from flask_wtf.file import FileField, FileAllowed
from app.aws import ALLOWED_EXTENSIONS
from wtforms.validators import DataRequired, Email, ValidationError, Length
from app.models import User


def user_exists(form, field):
    # Checking if user exists
    email = field.data
    user = User.query.filter(User.email == email).first()
    if user:
        raise ValidationError('Email address is already in use.')





class SignUpForm(FlaskForm):

    email = StringField('email', validators=[DataRequired(), user_exists])
    first_name = StringField('first name',validators=[DataRequired(), Length(min=2,max=50,message="First name must be between 2 and 50 characters")])
    last_name = StringField('last name',validators=[DataRequired(), Length(min=2,max=50,message="Last name must be between 2 and 50 characters")])
    password = StringField('password', validators=[DataRequired(), Length(min=5,max=50,message="Password must be at least 5 characters")])
    title = StringField('title', validators=[DataRequired(), Length(min=3,max=50,message="Title must be between 3 and 50 characters")])
    profileImage = FileField("image", validators=[FileAllowed(list(ALLOWED_EXTENSIONS))])
