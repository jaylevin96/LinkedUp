import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { editCommentThunk } from "../../store/comments";

export default function EditCommentModal({ comment, user }) {
    const dispatch = useDispatch()
    const [message, setMessage] = useState(comment.message)
    const [errors, setErrors] = useState([])
    const { closeModal } = useModal()

    const handleSubmit = async (e) => {
        e.preventDefault()
        let body = {
            message,
            postId: comment.postId
        }
        const data = await dispatch(editCommentThunk(comment.id, body))
        console.log(data);
        if (data && data.errors) {
            setErrors(data.errors.message)
            return
        }
        else {
            closeModal()

        }
    }
    console.log(errors);
    return (
        <div className="modal-container">
            <h1>Edit your Comment</h1>
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
                {errors.length > 0 && (<p className="validation-errors">{errors[0]}</p>)}
                <form className="comment-form" onSubmit={handleSubmit}>
                    <textarea className="comment-input" placeholder="What do you want to say?"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}

                    >
                    </textarea>
                    <div className="post-button-div">
                        <button className="cancel-button" onClick={closeModal}
                            style={{ backgroundColor: "gray", marginRight: "1em" }}
                        >Cancel</button>
                        <button type="submit">Save Changes</button>

                    </div>



                </form>

            </div>


        </div>


    )
}
