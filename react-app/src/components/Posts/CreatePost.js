import React, { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getPostsThunk } from '../../store/posts';
import OpenModalButton from "../OpenModalButton";
import CreatePostModal from '../NewPostModal';
import "./posts.css"
export default function CreatePost() {
    let user = useSelector(state => state.session.user)
    if (!user) return <></>
    return <div id="create-post-container">
        <img className="profile-image" src={user.profileImage}></img>
        <OpenModalButton modalComponent={<CreatePostModal user={user} />} buttonText={"Start a post"} />
    </div>
}
