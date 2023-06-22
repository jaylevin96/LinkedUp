import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom"
import { getProfileThunk } from "../../store/userProfiles";
import OpenModalButton from "../OpenModalButton";
import CreateExperienceModal from "../NewExperienceModal";
import CreateEducationModal from "../NewEducationModal";
import Education from "./education";
import Experience from "./experience";
import Skill from "./skill";
import "./profileDetails.css"
import CreateSkillModal from "../NewSkillModal";
import EditImageModal from "../EditProfileImageModal";
export default function ProfileDetails() {
    const params = useParams();
    const dispatch = useDispatch()
    const { userId } = params
    let user = useSelector((state) => state.profiles[userId])
    let currentUser = useSelector((state) => state.session.user)
    useEffect(() => {
        window.scrollTo(0, 0)

        dispatch(getProfileThunk(userId))
    }, [userId])




    if (!user || !currentUser) {
        return <></>
    }


    let userDetails = user.userDetails

    return <div id="profile-container">
        <div className="profile-container-header">
            <div className="profile-image-container">
                <img src={userDetails.profileImage}></img>
                {currentUser.id === userDetails.id && (<OpenModalButton modalComponent={<EditImageModal />} buttonText={"Change photo"} />)}
            </div>
            <div className="profile-container-info">

                <div className="profile-container-name">
                    {`${userDetails.firstname} ${userDetails.lastname}`}
                </div>
                <div className="profile-container-title">
                    {userDetails.title}

                </div>
            </div>

        </div>

        <div className="profile-section">
            <div className="profile-section-header">
                <h3>Experience</h3>
                {currentUser.id === userDetails.id && (<OpenModalButton modalComponent={<CreateExperienceModal user={userDetails} />} buttonText={<i className="fa-solid fa-plus fa-lg"></i>} />)}

            </div>
            <div>


                {user.experiences.map(experience => {
                    return <Experience experience={experience} />
                })}
            </div>
        </div>
        <div className="profile-section">
            <div className="profile-section-header">

                <h3>Education</h3>
                {currentUser.id === userDetails.id && (<OpenModalButton modalComponent={<CreateExperienceModal user={userDetails} />} buttonText={<i className="fa-solid fa-plus fa-lg"></i>} />)}
            </div>

            <div>
                {user.educations.map(education => {
                    return <Education education={education} />
                })}
            </div>
        </div>
        <div className="profile-section">
            <div className="profile-section-header">
                <h3>Skills</h3>
                {currentUser.id === userDetails.id && (<OpenModalButton modalComponent={<CreateSkillModal user={userDetails} />} buttonText={<i className="fa-solid fa-plus fa-lg"></i>} />)}
            </div>
            <div>
                <ul className="profile-skills-list">

                    {user.skills.map(skill => {
                        return <Skill skill={skill} />
                    })}
                </ul>
            </div>
        </div>

    </div>
}
