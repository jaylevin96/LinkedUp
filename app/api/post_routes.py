from flask import Blueprint, jsonify, session, request
from app.models import User, db, Post, Comment
from app.forms import LoginForm
from app.forms import SignUpForm
from app.forms import PostForm
from flask_login import current_user, login_user, logout_user, login_required
from datetime import datetime

post_routes = Blueprint('posts',__name__)


@post_routes.route('')
@login_required
def get_all_posts():
    """
    Returns a list of all posts
    """
    posts = Post.query.all()
    return {"posts":[post.to_dict() for post in posts]}



@post_routes.route('/<int:post_id>/comments')
@login_required
def get_post_comments(post_id):
    comments = Comment.query.filter(Comment.postId == post_id).all()
    return{"comments":[comment.to_dict() for comment in comments]}


@post_routes.route('', methods=["POST"])
@login_required
def create_a_post():
    """
    Creates a new post and adds the current logged in user as the owner of the post.
    """
    form = PostForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    form.userId.data = current_user.id

    if form.validate():
        res = Post(
            message = form.data['message'],
            userId = form.data['userId']
        )
        db.session.add(res)
        db.session.commit()
        return res.to_dict()
    else:
        errors = form.errors
        return {"errors":errors}, 400

@post_routes.route('/<int:post_id>',methods=["PUT"])
@login_required
def edit_post_by_id(post_id):
    """
    Edit a post by id if the current user is the owner of the post. Otherwise returns an error message.
    """
    data = request.get_json()
    post = Post.query.get(post_id)
    if not post:
        return{
            "errors": "Post not found"
        }

    if current_user.id != post.userId:
        return {
            "errors": "User did not create this post"
        }

    form = PostForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    form.message.data = data['message']
    form.userId.data = current_user.id

    if form.validate():
        post.message = data['message']
        post.updated_at = datetime.utcnow()
        db.session.commit()
        return post.to_dict(),201
    else:
         errors = form.errors
         return{"errors:errors"},400


@post_routes.route('/<int:post_id>',methods=["DELETE"])
@login_required
def delete_post_by_id(post_id):
    """
    Delete a post by id if the current user is the owner of the post. Otherwise returns an error message.
    """
    post = Post.query.get(post_id)
    if not post:
        return{
            "errors": "Post not found"
        }

    if current_user.id != post.userId:
        return {
            "errors": "User did not create this post"
        }
    db.session.delete(post)
    db.session.commit()
    return {
        "message": "Post successfully deleted"
    }
