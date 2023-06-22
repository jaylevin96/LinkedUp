import React, { useEffect, useRef, useState } from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import OpenModalButton from "../OpenModalButton";
import EditPostModal from '../EditPostModal';
import DeletePostModal from '../DeletePostModal';
import { getPostsThunk } from '../../store/posts';
import Comments from '../Comments';
import "./posts.css"


export default function PostDetails({ post, user }) {
    const [showComments, setShowComments] = useState(false)
    const [showPostOptions, setShowPostOptions] = useState(false)
    const postRef = useRef()
    const history = useHistory()

    const closeMenu = (e) => {


        if (postRef.current && !postRef.current.contains(e.target)) {
            // console.log(e.target === ref.current);
            setShowPostOptions(false)
            // console.log("got here");
        }
    }

    useEffect(() => {
        document.addEventListener("click", closeMenu)

        return () => document.removeEventListener("click", closeMenu)

    }, [])

    if (!user) return <></>

    return (

        <>
            <div className='post-details-container'
                style={showComments ? { marginBottom: 0, borderBottom: 0, borderBottomLeftRadius: 0, borderBottomRightRadius: 0 } : {}}>
                <div className='post-details-header'>
                    <div className='post-details-user'>
                        <div>
                            <img className='profile-image' src={post.UserInfo.profileImage}
                                onClick={() => {
                                    history.push(`/profile/${post.userId}`)
                                }}
                            ></img>
                        </div>
                        <div>

                            <div className='post-details-name'>
                                <NavLink to={`/profile/${post.userId}`}

                                >{`${post.UserInfo.firstname} ${post.UserInfo.lastname}`}</NavLink>


                            </div>

                            <div>
                                {post.UserInfo.title}
                            </div>
                            <div className='post-details-created'>{new Date(post.createdAt + " UTC").toLocaleString()}</div>
                        </div>
                    </div>
                    {post.userId === user.id && (<span className='details-elips'>

                        <i className="fa-solid fa-ellipsis" ref={postRef}
                            onClick={() => {
                                // let newOptions = {...showCommentOptions}
                                setShowPostOptions(!showPostOptions)
                            }}
                        ></i>

                        {showPostOptions && (
                            <div className='options'>
                                <span className='options-details'>
                                    <OpenModalButton modalComponent={<EditPostModal post={post} user={user} />} buttonText={

                                        <>
                                            <i className="fa-solid fa-pen-to-square"></i>
                                            <span className='specific-option'>
                                                Edit
                                            </span>
                                        </>


                                    } />


                                </span>
                                <span className='options-details'>
                                    <OpenModalButton modalComponent={<DeletePostModal post={post} user={user} />} buttonText={
                                        <>
                                            <i className="fa-solid fa-trash-can"></i>
                                            <span className='specific-option'>
                                                Delete
                                            </span>
                                        </>

                                    } />

                                </span>
                            </div>
                        )}
                    </span>)}
                </div>





                <div className='post-details-message'>
                    {post.message}


                </div>
                <div className='post-details-footer'>
                    <button className='button-post-comment'
                        onClick={() => {

                            setShowComments(!showComments)
                        }}
                    >Comment</button>

                </div>





            </div>
            {showComments && (
                <div className='comments-container'>
                    <Comments post={post} user={user} />
                </div>

            )}

        </>

    )
}
