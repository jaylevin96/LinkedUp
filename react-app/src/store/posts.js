const GET_POSTS = "posts/GET_ALL"
const CREATE_POST = "posts/NEW"
const EDIT_POST = "posts/EDIT"
const DELETE_POST = "posts/DELETE"

const getPosts = (data) => {
    return {
        type: GET_POSTS,
        data
    }
}

const createPost = (data) => {
    return {
        type: CREATE_POST,
        data
    }
}

const editPost = (data) => {
    return {
        type: EDIT_POST,
        data
    }
}
const deletePost = (id) => {
    return {
        type: DELETE_POST,
        id
    }
}

export const getPostsThunk = () => async dispatch => {
    const response = await fetch("/api/posts")

    if (response.ok) {
        const data = await response.json()
        if (data.errors) {
            return data;
        }
        dispatch(getPosts(data))
    }

}

export const createPostThunk = (data) => async dispatch => {
    const response = await fetch("/api/posts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
    })
    if (response.ok) {
        const data = await response.json()
        if (data.errors) {
            return data
        }
        dispatch(createPost(data))
    }
    else {
        const data = await response.json()
        return data;
    }
}

export const editPostThunk = (data) => async dispatch => {
    const response = await fetch(`/api/posts/${data.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
    })
    if (response.ok) {
        const data = await response.json()
        if (data.errors) {
            return data
        }
        dispatch(editPost(data))

    }
}

export const deletePostThunk = (id) => async dispatch => {
    const response = await fetch(`/api/posts/${id}`, { method: "DELETE" })
    const data = await response.json()
    dispatch(deletePost(id))
}


const initialState = {}
export default function reducer(state = initialState, action) {

    let newState = { ...state }
    switch (action.type) {
        case GET_POSTS:
            let data = action.data.posts
            data.forEach(post => {
                newState[post.id] = post
            })
            return newState;
        case CREATE_POST:
            newState[action.data.id] = action.data
            return newState
        case EDIT_POST:
            newState[action.data.id] = action.data

        default:
            return state;
    }
}
