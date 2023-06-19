from flask_wtf import FlaskForm
from wtforms import StringField
from flask_wtf.file import FileField, FileAllowed
from app.aws import ALLOWED_EXTENSIONS
from wtforms.validators import DataRequired, Email, ValidationError
from app.models import User


def user_exists(form, field):
    # Checking if user exists
    email = field.data
    user = User.query.filter(User.email == email).first()
    if user:
        raise ValidationError('Email address is already in use.')





class SignUpForm(FlaskForm):

    email = StringField('email', validators=[DataRequired(), user_exists])
    first_name = StringField('first name',validators=[DataRequired()])
    last_name = StringField('last name',validators=[DataRequired()])
    password = StringField('password', validators=[DataRequired()])
    title = StringField('title', validators=[DataRequired()])
    profileImage = FileField("image", validators=[FileAllowed(list(ALLOWED_EXTENSIONS))])
