from flask import Blueprint, jsonify, session, request
from app.models import User, db, Post
from app.forms import LoginForm
from app.forms import SignUpForm
from app.forms import PostForm
from flask_login import current_user, login_user, logout_user, login_required


post_routes = Blueprint('posts',__name__)


@post_routes.route('')
@login_required
def get_all_posts():
    """
    Returns a list of all posts
    """
    posts = Post.query.all()
    return {"posts":[post.to_dict() for post in posts]}


@post_routes.route('', methods=["POST"])
@login_required
def create_a_post():
    """
    Creates a new post and adds the current logged in user as the owner of the post.
    """
    form = PostForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    form.user_id.data = current_user.id

    if form.validate():
        res = Post(
            message = form.data['message'],
            user_id = form.data['user_id']
        )
        db.session.add(res)
        db.session.commit()
        return res.to_dict()
    else:
        errors = form.errors
        return errors, 400
