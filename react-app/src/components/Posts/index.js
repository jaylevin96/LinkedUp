import React, { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getPostsThunk } from '../../store/posts';
export default function Posts() {
    let dispatch = useDispatch()
    let posts = Object.values(useSelector((state) => state.posts))
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
                </div>
                <div>

                </div>
                <div>
                    {post.updatedAt}
                </div>
                <div>
                    {post.message}


                </div>


            </div>)




        })}
    </div>

}
