from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import User, db, UserEducation, UserSkill, UserExperience
from app.forms import UserEducationForm, UserExperienceForm, UserSkillForm

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


@user_profile_routes.route('/experiences',methods=["POST"])
@login_required
def add_experience():
    form = UserExperienceForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate():
        res = UserExperience(
            userId= current_user.id,
            company=form.data['company'],
            fromDate = form.data['fromDate'],
            toDate = form.data['toDate'],
            experienceTitle = form.data['experienceTitle'],
            experienceDetails = form.data['experienceDetails']

        )
        db.session.add(res)
        db.session.commit()
        return res.to_dict()
    else:
        errors = form.errors
        return errors, 400



@user_profile_routes.route('/educations',methods=["POST"])
@login_required
def add_education():
    form = UserEducationForm()
    data = request.get_json()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate():
        res = UserEducation(
            userId= current_user.id,
            field=form.data['field'],
            fromDate = form.data['fromDate'],
            toDate = form.data['toDate'],
            school = form.data['school'],
            degree = form.data['degree']

        )
        db.session.add(res)
        db.session.commit()
        return res.to_dict()
    else:
        errors = form.errors
        return errors, 400


@user_profile_routes.route('/skills',methods=["POST"])
@login_required
def add_skill():
    form = UserSkillForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate():
        res = UserSkill(
            userId = current_user.id,
            skill = form.data['skill']
        )
        db.session.add(res)
        db.session.commit()
        return res.to_dict()
    else:
        errors = form.errors
        return errors, 400
