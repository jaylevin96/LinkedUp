import React, { useEffect, useRef, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import OpenModalButton from "../OpenModalButton";
import EditCommentModal from '../EditCommentModal';
import { createCommentThunk, getPostCommentsThunk } from '../../store/comments';
import "./comments.css"
import DeleteCommentModal from '../DeleteCommentModal';



export default function CommentDetails({ comment, user }) {
    const [showCommentOptions, setShowCommentOptions] = useState(false)
    const commentRef = useRef()

    const closeMenu = (e) => {
        console.log(commentRef.current);

        if (commentRef && !commentRef.current.contains(e.target)) {
            // console.log(e.target === ref.current);
            setShowCommentOptions(false)
            // console.log("got here");
        }
    }
    useEffect(() => {
        document.addEventListener("click", closeMenu)

        return () => document.removeEventListener("click", closeMenu)
    }, [])

    return (
        <div className='comments-details-container' key={comment.id}>
            <div className='comments-details-header'>
                <div>
                    <div>
                        {`${comment.UserInfo.firstname} ${comment.UserInfo.lastname}`}
                    </div>
                    <div>
                        {comment.UserInfo.title}
                    </div>
                    <span className='comment-details-created'>{comment.createdAt}</span>
                </div>


                {comment.userId === user.id && (<span className='comment-details-elips'>

                    <i className="fa-solid fa-ellipsis" ref={commentRef}
                        onClick={() => {
                            // let newOptions = {...showCommentOptions}
                            setShowCommentOptions(true)
                        }}
                    ></i>

                    {showCommentOptions && (
                        <div className='comments-options'>
                            <span className='comments-options-details'>
                                <OpenModalButton modalComponent={<EditCommentModal comment={comment} user={user} />} buttonText={

                                    <>
                                        <i className="fa-solid fa-pen-to-square"></i>
                                        <span className='comment-specific-option'>
                                            Edit
                                        </span>
                                    </>


                                } />


                            </span>
                            <span className='comments-options-details'>
                                <OpenModalButton modalComponent={<DeleteCommentModal comment={comment} user={user} />} buttonText={
                                    <>
                                        <i className="fa-solid fa-trash-can"></i>
                                        <span className='comment-specific-option'>
                                            Delete
                                        </span>
                                    </>

                                } />

                            </span>
                        </div>
                    )}
                </span>)}



            </div>

            {/* {comment.userId === user.id && ()} */}

            <div className='comment-details-message'>
                {comment.message}

            </div>
        </div>)
}
