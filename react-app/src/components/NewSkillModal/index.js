import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { addSkillThunk } from "../../store/userProfiles";
// import { createPostThunk } from "../../store/posts";
export default function CreateSkillModal({ user }) {

    const dispatch = useDispatch()
    const [skill, setSkill] = useState('')
    const [errors, setErrors] = useState([])
    const { closeModal } = useModal()

    let userId = user.id

    const handleSubmit = async (e) => {
        e.preventDefault()
        let body = {
            skill, userId
        }
        const data = await dispatch(addSkillThunk(body))
        if (data) {
            setErrors(data)
            return
        }
        closeModal()
        // let body = { message }
        // const data = await dispatch(createPostThunk(body))

        //     if (data && data.errors) {
        //         setErrors(data.errors.message)
        //         return
        //     }
        //     else {
        //         closeModal()

        //     }
    }

    return (
        <div className="modal-container">
            {/* <h1>Start a post</h1> */}
            {/* <div className="modal-user-info">
                <img className="profile-image" src={user.profileImage}></img>
                <div>
                    {`${user.firstname} ${user.lastname}`}
                </div>
                <div>
                    {user.title}
                </div>

            </div> */}

            <div className="profile-section-input-container">
                <h2>Add Skill</h2>
                <form className="new-section-form" onSubmit={handleSubmit}>
                    <label>
                        Skill
                        {errors.skill && <span style={{ marginLeft: "1em" }} className="validation-errors">{errors.skill[0]}</span>}
                        <input type="text" className="profile-section-input"
                            value={skill}
                            onChange={(e) => setSkill(e.target.value)}>

                        </input>

                    </label>




                    <button type="submit">Add</button>




                </form>

            </div>


        </div>


    )

}
