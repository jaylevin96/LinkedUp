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
            <h1>Edit your Comment</h1>
            <div>
                {`${user.firstname} ${user.lastname}`}
            </div>
            <div>
                {user.title}
            </div>
            <div>
                {errors.length > 0 && (<p className="validation-errors">{errors[0]}</p>)}
                <form onSubmit={handleSubmit}>
                    <textarea placeholder="What do you want to say?"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}

                    >
                    </textarea>
                    <button type="submit">Save Changes</button>



                </form>

            </div>


        </div>


    )
}
