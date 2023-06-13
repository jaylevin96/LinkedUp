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

                        <button
                            onClick={() => {
                                let newComments = { ...showComments }
                                newComments[post.id] = !newComments[post.id]
                                setShowComments(newComments)
                            }}
                        >Comments</button>




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
