import React, { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getPostsThunk } from '../../store/posts';
import OpenModalButton from "../OpenModalButton";
import CreatePostModal from '../NewPostModal';
import "./posts.css"
export default function CreatePost() {
    let user = useSelector(state => state.session.user)

    return <div id="create-post-container">
        <OpenModalButton modalComponent={<CreatePostModal user={user} />} buttonText={"Start a post"} />
    </div>
}
