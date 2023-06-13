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

const createComment = (data) => {
    return {
        type: CREATE_COMMENT,
        data
    }
}
const editComment = (data) => {
    return {
        type: EDIT_COMMENT,
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

        default:
            return state
    }
}
