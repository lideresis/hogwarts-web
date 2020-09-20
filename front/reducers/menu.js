const OPEN_MENU = 'OPEN_MENU'
const CLOSE_MENU = 'CLOSE_MENU'
const TOGGLE_MENU = 'TOGGLE_MENU'

const initialState = {
    isOpen: true
}

export default (state = initialState, action) => {
    switch (action.type) {
        case OPEN_MENU:
            return {
                ...state,
                isOpen: true
            }
        case CLOSE_MENU:
            return {
                ...state,
                isOpen: false
            }
        case TOGGLE_MENU:
            return {
                ...state,
                isOpen: !state.isOpen
            }
        default:
            return state
    }
}

export const openMenu = () => ({
    type: OPEN_MENU
})

export const closeMenu = () => ({
    type: CLOSE_MENU
})

export const toggleMenu = () => ({
    type: TOGGLE_MENU
})
