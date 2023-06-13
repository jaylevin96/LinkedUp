const GET_POSTS = "posts/GET_ALL"


const getPosts = (data) => {
    return {
        type: GET_POSTS,
        data
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


        default:
            return state;
    }
}
