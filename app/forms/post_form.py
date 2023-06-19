from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from wtforms.validators import DataRequired,  ValidationError, Length
from app.models import User
# from app.api.AWS_helpers import ALLOWED_EXTENSIONS
# from flask_wtf.file import FileField, FileAllowed


def user_id_exists(form, field):
    user_id = field.data
    user = User.query.get(user_id)
    if not user:
        raise ValidationError("User does not exist")

class PostForm(FlaskForm):
    message = StringField("Post message", validators=[DataRequired(),Length(min=1,max=255,message="Post can not exceed 255 characters")])
    userId = IntegerField("User Id", validators=[DataRequired(), user_id_exists])
