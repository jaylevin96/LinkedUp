import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { addExperienceThunk } from "../../store/userProfiles";
// import { createPostThunk } from "../../store/posts";
export default function CreateExperienceModal({ user }) {

    const dispatch = useDispatch()
    const [company, setCompany] = useState('')
    const [experienceTitle, setExperienceTitle] = useState('')
    const [fromDate, setFromDate] = useState('')
    const [toDate, setToDate] = useState('')
    const [experienceDetails, setExperienceDetails] = useState('')
    const [errors, setErrors] = useState([])
    const { closeModal } = useModal()

    let userId = user.id

    const handleSubmit = async (e) => {
        e.preventDefault()
        let body = {
            company, experienceTitle, fromDate, toDate, experienceDetails, userId
        }
        const data = await dispatch(addExperienceThunk(body))
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
                <h2>Add Experience</h2>
                <form className="new-section-form" onSubmit={handleSubmit}>
                    <label>
                        Company
                        {errors.company && <span style={{ marginLeft: "1em" }} className="validation-errors">{errors.company[0]}</span>}
                        <input type="text" className="profile-section-input"
                            value={company}
                            onChange={(e) => setCompany(e.target.value)}>

                        </input>

                    </label>
                    <label>
                        Role
                        {errors.experienceTitle && <span style={{ marginLeft: "1em" }} className="validation-errors">{errors.experienceTitle[0]}</span>}
                        <input type="text" className="profile-section-input"
                            value={experienceTitle}
                            onChange={(e) => setExperienceTitle(e.target.value)}

                        >
                        </input>

                    </label>
                    <label>
                        Details
                        {errors.experienceDetails && <span style={{ marginLeft: "1em" }} className="validation-errors">{errors.experienceDetails[0]}</span>}

                        <textarea className="profile-section-input" value={experienceDetails}
                            onChange={(e) => setExperienceDetails(e.target.value)}></textarea>

                    </label>
                    <label>
                        From Date
                        {errors.fromDate && <span style={{ marginLeft: "1em" }} className="validation-errors">{errors.fromDate[0]}</span>}
                        <input type="date" className="profile-section-input"
                            value={fromDate}
                            onChange={(e) => setFromDate(e.target.value)}
                        ></input>
                    </label>
                    <label>
                        To Date
                        {errors.toDate && <span style={{ marginLeft: "1em" }} className="validation-errors">{errors.toDate[0]}</span>}
                        <input type="date" className="profile-section-input"
                            value={toDate}
                            onChange={(e) => setToDate(e.target.value)}
                        ></input>
                    </label>


                    <button type="submit">Add</button>




                </form>

            </div>


        </div>


    )

}
