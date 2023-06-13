import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import OpenModalButton from "../OpenModalButton";
import { createCommentThunk, getPostCommentsThunk } from '../../store/comments';
import "./comments.css"
export default function Comments({ post, user }) {
    let dispatch = useDispatch()
    let [newComment, setNewComment] = useState('')
    let comments = useSelector((state) => state.comments[post.id])
    if (comments) {
        comments = Object.values(comments)
        comments.sort((a, b) => {
            if (a.createdAt > b.createdAt) return -1
        })
    }

    useEffect(() => {
        dispatch(getPostCommentsThunk(post.id))
    }, [])

    if (!comments) {
        return <></>
    }
    const handleEnter = (e) => {
        if (e.key === "Enter" && !e.shiftKey) {
            let body = {
                message: newComment,
                "postId": post.id
            }
            dispatch(createCommentThunk(post.id, body))
        }
    };


    return <>
        <div id="create-comment-container">
            <textarea placeholder='Add a comment...'
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                onKeyPress={handleEnter}

            ></textarea>

        </div>
        {comments.map(comment => {
            return (
                <div className='comments-details-container'>
                    <div>

                        {`${comment.UserInfo.firstname} ${comment.UserInfo.lastname}`}
                        <span className='comment-details-created'>{comment.createdAt}</span>

                    </div>

                    {/* {comment.userId === user.id && ()} */}
                    <div>
                        {comment.UserInfo.title}
                    </div>
                    <div className='comment-details-message'>
                        {comment.message}

                    </div>
                </div>)
        })}
    </>
}
