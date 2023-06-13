import React, { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getPostsThunk } from '../../store/posts';
export default function Posts() {
    let dispatch = useDispatch()
    let posts = useSelector((state) => state.posts)
    useEffect(() => {
        dispatch(getPostsThunk())
    }, [])

    if ()

}
