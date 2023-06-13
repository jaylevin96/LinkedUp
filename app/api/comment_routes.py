from flask import Blueprint, jsonify, session, request
from app.models import User, db, Post, Comment
from app.forms import LoginForm
from app.forms import SignUpForm
from app.forms import PostForm
from app.forms import CommentForm
from flask_login import current_user, login_user, logout_user, login_required
from datetime import datetime

comment_routes = Blueprint('comments',__name__)


@comment_routes.route('')
@login_required
def get_all_comments():
    """
    Returns a list of every comment
    """
    comments = Comment.query.all()
    return{"comments":[comment.to_dict() for comment in comments]}


@comment_routes.route('')
@login_required
def create_comment():
    """
    Create a new comment for a post
    """

    form = CommentForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    form.userId.data = current_user.id

    if form.validate():
        res = Comment(
            message = form.data['message'],
            userId = form.data['userId'],
            postId = form.data['postId']
        )
        db.session.add(res)
        db.session.commit()
        return res.to_dict()
    else:
        errors = form.errors
        return{"errors":errors},400
