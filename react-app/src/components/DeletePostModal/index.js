import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { deletePostThunk } from "../../store/posts";

export default function DeletePostModal({ post, user }) {
    const dispatch = useDispatch()
    const [message, setMessage] = useState(post.message)
    const [errors, setErrors] = useState([])
    const { closeModal } = useModal()

    const handleSubmit = async (e) => {
        e.preventDefault()
        let body = { message }
        const data = await dispatch(deletePostThunk(post.id))

        if (data && data.errors) {
            setErrors(data.errors.message)
            return
        }
        else {
            closeModal()

        }
    }

    return (
        <div className="modal-container">
            <h1>Are you sure you want to delete this post?</h1>
            <div className="modal-user-info">
                <img className="profile-image" src={user.profileImage}></img>
                <div>
                    {`${user.firstname} ${user.lastname}`}
                </div>
                <div>
                    {user.title}
                </div>

            </div>
            <div className="post-input-container">

                <form className="new-post-form" onSubmit={handleSubmit}>
                    <div className="post-input">
                        {message}
                    </div>
                    <div>
                        <button type="submit">Delete post</button>

                    </div>



                </form>

            </div>


        </div>


    )

}
