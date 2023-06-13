import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { createPostThunk } from "../../store/posts";
export default function CreatePostModal({ user }) {

    const dispatch = useDispatch()
    const [message, setMessage] = useState()
    const [errors, setErrors] = useState([])
    const { closeModal } = useModal()

    const handleSubmit = async (e) => {
        e.preventDefault()
        let body = { message }
        const data = await dispatch(createPostThunk(body))

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
            <h1>Start a post</h1>
            <div>
                {`${user.firstname} ${user.lastname}`}
            </div>
            <div>
                {user.title}
            </div>
            <div>
                {errors.length > 0 && (<p className="validation-errors">{errors[0]}</p>)}
                <form onSubmit={handleSubmit}>
                    <textarea placeholder="What do you want to talk about?"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}

                    >
                    </textarea>
                    <button type="submit">Post</button>



                </form>

            </div>


        </div>


    )

}
