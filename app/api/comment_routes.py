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


@comment_routes.route('', methods=["POST"])
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


@comment_routes.route('/<int:comment_id>',methods=["PUT"])
@login_required
def edit_comment_by_id(comment_id):
    """
    Edit a comment on a post by Id. Only the owner of the comment can edit.
    """

    data = request.get_json()
    comment = Comment.query.get(comment_id)
    if not comment:

            return {
                "errors":"Comment not found"
            }
    if current_user.id != comment.userId:
         return {
              "errors": "User did not create this comment"
         }

    form = CommentForm()
    print('got here')
    form['csrf_token'].data = request.cookies['csrf_token']
    form.message.data = data['message']
    form.userId.data = current_user.id
    form.postId = comment.postId

    if form.validate():
         comment.message = data['message']
         comment.updated_at = datetime.utcnow()
         db.session.commit()
         return comment.to_dict(),201
    else:
         errors = form.errors
         return{"errors:errors"},400

@comment_routes.route('/<int:comment_id>', methods=["DELETE"])
@login_required
def delete_comment_by_id(comment_id):
     """
     Delete a comment by id if the current user is the owner of the comment
     """


     comment = Comment.query.get(comment_id)
     if not comment:
          return{
               "errors":"Comment not found"
          }

     if current_user.id != comment.userId:
          return {
               "errors":"User did not create this comment"
          }

     db.session.delete(comment)
     db.session.commit()
     return{
          "message":"Comment successfully deleted"
     }
