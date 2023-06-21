from flask import Blueprint, jsonify
from flask_login import login_required
from app.models import User, db, UserEducation, UserSkill, UserExperience

user_profile_routes = Blueprint('user_information',__name__)

@user_profile_routes.route('/<int:user_id>')
@login_required
def get_profile_details(user_id):
    educations = UserEducation.query.filter(UserEducation.userId == user_id).all()
    skills = UserSkill.query.filter(UserSkill.userId == user_id).all()
    experiences = UserExperience.query.filter(UserExperience.userId == user_id).all()
    user = User.query.get(user_id)


    return {
        "educations":[education.to_dict() for education in educations],
            "skills":[skill.to_dict() for skill in skills],
            "experiences":[experience.to_dict() for experience in experiences],
            "userDetails": user.to_dict()}
