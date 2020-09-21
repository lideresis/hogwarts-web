const LOGIN = 'LOGIN'
const LOGOUT = 'LOGOUT'

const userJson = localStorage.getItem('user')

const initialState = {
    user: (userJson ? JSON.parse(userJson) : null)
}

export default (state = initialState, action) => {
    switch (action.type) {
        case LOGIN:
            return {
                ...state,
                user: action.payload
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

export const login = (payload) => ({
    type: LOGIN,
    payload
})

export const logout = () => ({
    type: LOGOUT
})