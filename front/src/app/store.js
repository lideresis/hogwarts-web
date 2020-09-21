import { createStore, combineReducers } from 'redux'

import auth from '../reducers/auth'
import menu from '../reducers/menu'

const reducers = combineReducers({
    auth,
    menu
})

export default createStore(reducers)
