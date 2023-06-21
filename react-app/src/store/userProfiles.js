const GET_PROFILE = "userProfiles/GET"

const getProfile = (userId, data) => {
    return {
        type: GET_PROFILE,
        userId,
        data
    }
}

export const getProfileThunk = (userId) => async dispatch => {
    const response = await fetch(`/api/userprofile/${userId}`)

    if (response.ok) {
        const data = await response.json()
        dispatch(getProfile(userId, data))
    }
}


const initialState = {}
export default function reducer(state = initialState, action) {
    let newState = { ...state }
    switch (action.type) {
        case GET_PROFILE:
            newState[action.userId] = action.data
            return newState
        default:
            return state;
    }
}
