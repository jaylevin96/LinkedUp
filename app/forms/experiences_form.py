from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, DateField
from wtforms.validators import DataRequired,  ValidationError, Length
from app.models import User, UserExperience


def user_id_exists(form, field):
    user_id = field.data
    user = User.query.get(user_id)
    if not user:
        raise ValidationError("User does not exist")

def to_date_is_after(form,field):
    toDate = field.data
    fromDate = form.fromDate.data
    if toDate < fromDate:
        raise ValidationError("To date must be after from date")

class UserExperienceForm(FlaskForm):
    userId = IntegerField("User Id", validators=[DataRequired(), user_id_exists])
    company = StringField("Company", validators=[DataRequired(),Length(min=1,max=50,message="Company can not exceed 50 characters")])
    fromDate = DateField("From Date", validators=[DataRequired()])
    toDate = DateField("To Date", validators=[DataRequired(),to_date_is_after])
    experienceTitle = StringField("Title",validators=[DataRequired(),Length(min=1,max=50,message="Role can not exceed 50 characters")])
    experienceDetails = StringField("Details",validators=[DataRequired(),Length(min=1,max=255,message="Details can not exceed 255 characters")])
