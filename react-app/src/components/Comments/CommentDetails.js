import React, { useEffect, useRef, useState } from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import OpenModalButton from "../OpenModalButton";
import EditCommentModal from '../EditCommentModal';
import { createCommentThunk, getPostCommentsThunk } from '../../store/comments';
import "./comments.css"
import DeleteCommentModal from '../DeleteCommentModal';



export default function CommentDetails({ comment, user }) {
    const [showCommentOptions, setShowCommentOptions] = useState(false)
    const commentRef = useRef()
    const history = useHistory()
    const closeMenu = (e) => {


        if (commentRef.current && !commentRef.current.contains(e.target)) {
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
        <div className='comments-overview-container'>
            <div>

                <img className="comments-profile-image"
                    onClick={() => {
                        history.push(`/profile/${comment.userId}`)
                    }}
                    src={comment.UserInfo.profileImage}></img>
            </div>
            <div className='comments-details-container' key={comment.id}>
                <div className='comments-details-header'>
                    <div className='comments-details-name'>
                        <NavLink to={`/profile/${comment.userId}`}> {`${comment.UserInfo.firstname} ${comment.UserInfo.lastname}`}</NavLink>

                        <div>
                            {comment.UserInfo.title}
                        </div>
                        <span className='comment-details-created'>{new Date(comment.createdAt + " UTC").toLocaleString()}</span>
                    </div>


                    {comment.userId === user.id && (<span className='details-elips'>

                        <i className="fa-solid fa-ellipsis" ref={commentRef}
                            onClick={() => {
                                // let newOptions = {...showCommentOptions}
                                setShowCommentOptions(!showCommentOptions)
                            }}
                        ></i>

                        {showCommentOptions && (
                            <div className='options'>
                                <span className='options-details'>
                                    <OpenModalButton modalComponent={<EditCommentModal comment={comment} user={user} />} buttonText={

                                        <>
                                            <i className="fa-solid fa-pen-to-square"></i>
                                            <span className='specific-option'>
                                                Edit
                                            </span>
                                        </>


                                    } />


                                </span>
                                <span className='options-details'>
                                    <OpenModalButton modalComponent={<DeleteCommentModal comment={comment} user={user} />} buttonText={
                                        <>
                                            <i className="fa-solid fa-trash-can"></i>
                                            <span className='specific-option'>
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
            </div>
        </div>)
}
