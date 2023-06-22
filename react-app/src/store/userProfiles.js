const GET_PROFILE = "userProfiles/GET"
const ADD_EDUCATION = "userProfiles/Education/POST"
const ADD_EXPERIENCE = "userProfiles/Experience/POST"
const ADD_SKILL = "userProfiles/Skill/POST"
const getProfile = (userId, data) => {
    return {
        type: GET_PROFILE,
        userId,
        data
    }
}

const addEducation = (data) => {
    return {
        type: ADD_EDUCATION,
        data
    }
}
const addExperience = (data) => {
    return {
        type: ADD_EXPERIENCE,
        data
    }
}

const addSkill = (data) => {
    return {
        type: ADD_SKILL,
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

export const addEducationThunk = (body) => async dispatch => {
    const response = await fetch(`/api/userprofile/educations`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body)
    })
    if (response.ok) {
        const data = await response.json()
        dispatch(addEducation(data))
    }
    else {
        const data = await response.json()
        return data;
    }
}

export const addExperienceThunk = (body) => async dispatch => {
    const response = await fetch(`/api/userprofile/experiences`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body)
    })
    if (response.ok) {
        const data = await response.json()
        dispatch(addExperience(data))
    }
    else {
        const data = await response.json()
        return data;
    }
}

export const addSkillThunk = (body) => async dispatch => {
    const response = await fetch('/api/userprofile/skills', {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body)
    })
    if (response.ok) {
        const data = await response.json()
        dispatch(addSkill(data))
    }
    else {
        const data = await response.json()
        return data;
    }
}


const initialState = {}
export default function reducer(state = initialState, action) {
    let newState = { ...state }
    switch (action.type) {
        case GET_PROFILE:
            newState[action.userId] = action.data
            return newState
        case ADD_EDUCATION:
            newState[action.data.userId] = { ...newState[action.data.userId] }
            newState[action.data.userId].educations = [...newState[action.data.userId].educations]
            newState[action.data.userId].educations.push(action.data)
            return newState
        case ADD_EXPERIENCE:
            newState[action.data.userId] = { ...newState[action.data.userId] }
            newState[action.data.userId].experiences = [...newState[action.data.userId].experiences]
            newState[action.data.userId].experiences.push(action.data)
            return newState
        case ADD_SKILL:
            newState[action.data.userId] = { ...newState[action.data.userId] }
            newState[action.data.userId].skills = [...newState[action.data.userId].skills]
            newState[action.data.userId].skills.push(action.data)
            return newState;

        default:
            return state;
    }
}
