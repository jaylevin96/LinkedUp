from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, DateField
from wtforms.validators import DataRequired,  ValidationError, Length
from app.models import User, UserSkill


def user_id_exists(form, field):
    user_id = field.data
    user = User.query.get(user_id)
    if not user:
        raise ValidationError("User does not exist")



class UserSkillForm(FlaskForm):
    userId = IntegerField("User Id", validators=[DataRequired(), user_id_exists])
    skill = StringField("Skill", validators=[DataRequired(),Length(min=3,max=50,message="Skill must be between 3 and 50 characters")])
