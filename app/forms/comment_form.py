from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from wtforms.validators import DataRequired,  ValidationError, Length
from app.models import User, Post


def user_id_exists(form, field):
    user_id = field.data
    user = User.query.get(user_id)
    if not user:
        raise ValidationError("User does not exist")

def post_id_exists(form, field):
    postId = field.data
    post = Post.query.get(postId)
    if not post:
        raise ValidationError("Post does not exist")


class CommentForm(FlaskForm):
    userId = IntegerField("User Id", validators=[DataRequired(), user_id_exists])
    postId = IntegerField("Post Id", validators=[DataRequired(), post_id_exists])
    message = StringField("Comment message", validators=[DataRequired(),Length(min=1,max=255,message="Comment can not exceed 255 characters")])
