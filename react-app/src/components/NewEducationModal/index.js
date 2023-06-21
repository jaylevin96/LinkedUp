import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { addEducationThunk } from "../../store/userProfiles";
// import { createPostThunk } from "../../store/posts";
export default function CreateEducationModal({ user }) {

    const dispatch = useDispatch()
    const [field, setField] = useState('')
    const [school, setSchool] = useState('')
    const [fromDate, setFromDate] = useState('')
    const [toDate, setToDate] = useState('')
    const [degree, setDegree] = useState('')
    const [errors, setErrors] = useState([])
    const { closeModal } = useModal()

    let userId = user.id

    const handleSubmit = async (e) => {
        e.preventDefault()
        let body = {
            field, school, fromDate, toDate, degree, userId
        }
        const data = await dispatch(addEducationThunk(body))
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
                <h2>Add Education</h2>
                <form className="new-section-form" onSubmit={handleSubmit}>
                    <label>
                        School
                        {errors.school && <span style={{ marginLeft: "1em" }} className="validation-errors">{errors.school[0]}</span>}
                        <input type="text" className="profile-section-input"
                            value={school}
                            onChange={(e) => setSchool(e.target.value)}>

                        </input>

                    </label>
                    <label>
                        Degree
                        {errors.degree && <span style={{ marginLeft: "1em" }} className="validation-errors">{errors.degree[0]}</span>}
                        <input type="text" className="profile-section-input"
                            value={degree}
                            onChange={(e) => setDegree(e.target.value)}

                        >
                        </input>

                    </label>
                    <label>
                        Field
                        {errors.field && <span style={{ marginLeft: "1em" }} className="validation-errors">{errors.field[0]}</span>}
                        <input type="text" className="profile-section-input"
                            value={field}
                            onChange={(e) => setField(e.target.value)}

                        >
                        </input>

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
