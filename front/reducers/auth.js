const LOGIN = 'LOGIN'
const LOGOUT = 'LOGOUT'

const initialState = {
    user: null
}

export default (state = initialState, action) => {
    switch (action.type) {
        case LOGIN:
            return {
                ...state,
                user: {}
            }
        case LOGOUT:
            return {
                ...state,
                user: null
            }
        default:
            return state
    }
}

export const login = () => ({
    type: LOGIN
})

export const logout = () => ({
    type: LOGOUT
})