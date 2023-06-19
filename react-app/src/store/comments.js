const GET_POST_COMMENTS = "comments/GET_BY_POST"
const CREATE_COMMENT = "comments/NEW"
const EDIT_COMMENT = "comments/EDIT"
const DELETE_COMMENT = "comments/DELETE"

const getPostComments = (id, data) => {
    return {
        type: GET_POST_COMMENTS,
        id,
        data
    }
}

const createComment = (id, data) => {
    return {
        type: CREATE_COMMENT,
        id,
        data
    }
}
const editComment = (postId, data) => {
    return {
        type: EDIT_COMMENT,
        postId,
        data
    }
}

const deleteComment = (id, postId) => {
    return {
        type: DELETE_COMMENT,
        id,
        postId
    }
}

export const getPostCommentsThunk = (id) => async dispatch => {
    const response = await fetch(`/api/posts/${id}/comments`)
    if (response.ok) {
        const data = await response.json()

        if (data.errors) {
            return data
        }


        dispatch(getPostComments(id, data))
    }
}

export const createCommentThunk = (id, data) => async dispatch => {

    const response = await fetch(`/api/comments`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
    })
    if (response.ok) {
        const data = await response.json()
        if (data.errors) {
            return data
        }
        else {

            dispatch(createComment(id, data))
        }
    }
    else {
        const data = await response.json()
        if (data.errors) return data
    }





}

export const editCommentThunk = (id, data) => async dispatch => {
    let postId = data.postId
    const response = await fetch(`/api/comments/${id}`,
        {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data)
        })

    if (response.ok) {
        const data = await response.json()
        if (data.errors) {
            return data
        }
        else {
            dispatch(editComment(postId, data))
        }
    }
    else {
        const data = await response.json()
        if (data.errors) return data
    }
}

export const deleteCommentThunk = (id, postId) => async dispatch => {
    const response = await fetch(`/api/comments/${id}`, { method: "DELETE" })
    if (response.ok) {
        const data = await response.json()
        dispatch(deleteComment(id, postId))
    }
}

const initialState = {}
export default function reducer(state = initialState, action) {
    let newState = { ...state }

    switch (action.type) {
        case GET_POST_COMMENTS:
            newState[action.id] = {}
            action.data.comments.forEach(comment => {
                newState[action.id][comment.id] = comment
            })
            return newState
        case CREATE_COMMENT:
            newState[action.id] = { ...newState[action.id] }

            newState[action.id][action.data.id] = action.data

            return newState
        case EDIT_COMMENT:
            newState[action.postId] = { ...newState[action.postId] }
            newState[action.postId][action.data.id] = { ...newState[action.postId][action.data.id] }
            newState[action.postId][action.data.id] = action.data
            return newState
        case DELETE_COMMENT:
            newState[action.postId] = { ...newState[action.postId] }
            newState[action.postId][action.id] = { ...newState[action.postId][action.id] }
            delete newState[action.postId][action.id]

            return newState



        default:
            return state
    }
}
