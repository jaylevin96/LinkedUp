import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import OpenModalButton from "../OpenModalButton";
import EditPostModal from '../EditPostModal';
import DeletePostModal from '../DeletePostModal';
import { getPostsThunk } from '../../store/posts';
import "./posts.css"
import Comments from '../Comments';
export default function Posts() {
    let dispatch = useDispatch()
    const [showComments, setShowComments] = useState({})
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
            let id = post.id

            return (

                <>



                    <div className='post-details-container' key={post.id}
                        style={showComments[post.id] ? { marginBottom: 0 } : {}}>
                        <div className='post-details-header'>
                            <div className='post-details-user'>
                                <div>
                                    {`${post.UserInfo.firstname} ${post.UserInfo.lastname}`}

                                </div>
                                <div>
                                    {post.UserInfo.title}
                                </div>
                                <div className='post-details-created'>{post.createdAt}</div>
                            </div>
                            {post.userId === user.id && (
                                <span className='post-details-options-buttons'>
                                    <OpenModalButton modalComponent={<EditPostModal post={post} user={user} />} buttonText={<i class="fa-solid fa-pen-to-square"></i>} />
                                    <OpenModalButton modalComponent={<DeletePostModal post={post} user={user} />} buttonText={<i class="fa-solid fa-trash-can"></i>} />
                                </span>
                            )}
                        </div>





                        <div className='post-details-message'>
                            {post.message}


                        </div>
                        <div className='post-details-footer'>
                            <button className='button-post-comment'
                                onClick={() => {
                                    let newComments = { ...showComments }
                                    newComments[post.id] = !newComments[post.id]
                                    setShowComments(newComments)
                                }}
                            >Comment</button>

                        </div>





                    </div>
                    {showComments[post.id] && (
                        <div className='comments-container'>
                            <Comments post={post} user={user} />
                        </div>

                    )}

                </>

            )




        })}
    </div >

}
