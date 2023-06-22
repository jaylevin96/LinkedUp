from flask_wtf import FlaskForm
from wtforms import StringField
from flask_wtf.file import FileField, FileAllowed
from app.aws import ALLOWED_EXTENSIONS
from wtforms.validators import DataRequired, Email, ValidationError, Length
from app.models import User





class EditUserForm(FlaskForm):
    profileImage = FileField("image", validators=[FileAllowed(list(ALLOWED_EXTENSIONS))])
