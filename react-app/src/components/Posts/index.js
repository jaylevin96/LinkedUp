import React, { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import OpenModalButton from "../OpenModalButton";
import EditPostModal from '../EditPostModal';
import DeletePostModal from '../DeletePostModal';
import { getPostsThunk } from '../../store/posts';
import "./posts.css"
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
            return (<div className='post-details-container' key={post.id}>
                <div>
                    {`${post.UserInfo.firstname} ${post.UserInfo.lastname}`}
                    <span className='post-details-created'>{post.createdAt}</span>
                </div>

                {post.userId === user.id && (
                    <div>
                        <OpenModalButton modalComponent={<EditPostModal post={post} user={user} />} buttonText={"Edit"} />
                        <OpenModalButton modalComponent={<DeletePostModal post={post} user={user} />} buttonText={"Delete"} />
                    </div>
                )}

                <div>
                    {post.UserInfo.title}
                </div>
                <div className='post-details-message'>
                    {post.message}


                </div>


            </div>)




        })}
    </div>

}