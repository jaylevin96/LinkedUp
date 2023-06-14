const GET_POST_COMMENTS = "comments/GET_BY_POST"
const CREATE_COMMENT = "comments/NEW"
const EDIT_COMMENT = "comments/EDIT"
const DELETE_COMMENT = "comments/DELETE"

const getPostComments = (id, data) => {
    return {
        type: getPostComments,
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

const deleteComment = (id) => {
    return {
        type: DELETE_COMMENT,
        id
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
}

const initialState = {}
export default function reducer(state = initialState, action) {
    let newState = { ...state }
    switch (action.type) {
        case getPostComments:
            newState[action.id] = {}
            action.data.comments.forEach(comment => {
                newState[action.id][comment.id] = comment
            })
            return newState
        case createComment:
            newState[action.id][action.data.id] = action.data
            return newState
        case editComment:
            newState[action.postId][action.data.id] = action.data
            return newState


        default:
            return state
    }
}
