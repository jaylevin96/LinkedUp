import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import OpenModalButton from "../OpenModalButton";
import { getPostCommentsThunk } from '../../store/comments';
export default function Comments({ post, user }) {
    let dispatch = useDispatch()
    let comments = useSelector((state) => state.comments[post.id])
    if (comments) {
        comments = Object.values(comments)
    }

    useEffect(() => {
        dispatch(getPostCommentsThunk(post.id))
    }, [])

    if (!comments) {
        return <></>
    }


    return <>
        {comments.map(comment => {
            return (
                <>
                    <div>

                        {`${comment.UserInfo.firstname} ${comment.UserInfo.lastname}`}
                        <span className='comment-details-created'>{comment.createdAt}</span>

                    </div>

                    {/* {comment.userId === user.id && ()} */}
                </>)
        })}
    </>
}
