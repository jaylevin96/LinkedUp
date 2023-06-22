import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../context/Modal";
import { addSkillThunk, getProfileThunk } from "../../store/userProfiles";
import { editUserImageThunk } from "../../store/session";
// import { createPostThunk } from "../../store/posts";
export default function EditImageModal() {

    const dispatch = useDispatch()
    const [image, setImage] = useState(null)
    const [errors, setErrors] = useState([])
    let currentUser = useSelector((state) => state.session.user)
    const { closeModal } = useModal()

    const handleSubmit = async (e) => {
        e.preventDefault()
        const formData = new FormData();
        formData.append('profileImage', image)
        const data = await dispatch(editUserImageThunk(formData))

        if (data) {
            setErrors(data)
            return
        }
        await dispatch(getProfileThunk(currentUser.id))
        closeModal()

    }

    return (
        <div className="modal-container">


            <div className="profile-section-input-container">
                <h2 style={{ marginBottom: "1em" }}>Update your profile photo</h2>
                <form className="new-section-form" onSubmit={handleSubmit}>
                    <label id="profile-button-upload">
                        {image ? "Image added!" : "Select a new photo"}
                        <input id="file-input" type='file'
                            accept="image/*"
                            onChange={(e) => setImage(e.target.files[0])}
                            style={{ "display": "none" }}
                        ></input>
                    </label>




                    <button type="submit">Add</button>




                </form>

            </div>


        </div>


    )

}
