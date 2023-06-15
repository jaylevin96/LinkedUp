import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import OpenModalButton from "../OpenModalButton";
import EditPostModal from '../EditPostModal';
import DeletePostModal from '../DeletePostModal';
import { getPostsThunk } from '../../store/posts';
import "./posts.css"
import Comments from '../Comments';
import PostDetails from './PostDetails';
export default function Posts() {
    let dispatch = useDispatch()

    let posts = Object.values(useSelector((state) => state.posts))
    let user = useSelector(state => state.session.user)
    posts.sort((a, b) => {
        if (a.createdAt > b.createdAt) return -1
    })
    useEffect(() => {
        dispatch(getPostsThunk())
    }, [])

    if (!Object.values(posts)) {
        return <></>
    }

    return <div id="posts-container">
        {posts.map(post => {

            return <PostDetails post={post} user={user} key={post.id} />





        })}
    </div >

}
