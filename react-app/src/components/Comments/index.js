import React, { useEffect, useRef, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import OpenModalButton from "../OpenModalButton";
import EditCommentModal from '../EditCommentModal';
import { createCommentThunk, getPostCommentsThunk } from '../../store/comments';
import "./comments.css"
import DeleteCommentModal from '../DeleteCommentModal';
import CommentDetails from './CommentDetails';
export default function Comments({ post, user }) {
    let dispatch = useDispatch()
    let [newComment, setNewComment] = useState('')
    const [errors, setErrors] = useState([])
    const [showCommentOptions, setShowCommentOptions] = useState({})
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
    const handleEnter = async (e) => {
        // if (!newComment.length) {

        //     return
        // }
        if (!newComment.length) {
            setNewComment(prev => '')
        }
        if (e.key === "Enter" && !e.shiftKey && newComment.length) {

            let body = {
                message: newComment,
                "postId": post.id
            }
            let data = await dispatch(createCommentThunk(post.id, body))
            // console.log(data);
            if (data && data.errors) {
                setErrors(data.errors.message)
                return
            }

            setNewComment(prev => '')
        }
    };


    return <>
        <div className="create-comment-container">
            {errors.length > 0 && (<p className="validation-errors">{errors[0]}</p>)}
            <textarea placeholder='Add a comment...'
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                onKeyPress={handleEnter}

            ></textarea>

        </div>
        {comments.map((comment, index) => {
            // const commentRef = useRef()
            // commentRefs.current[index] = commentRef
            return <CommentDetails comment={comment} user={user} key={comment.id} />
        })}
    </>
}
