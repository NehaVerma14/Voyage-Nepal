import {LOGIN_USER_SUCCESS, LOGIN_USER_FAIL, LOGIN, LOGOUT_USER} from '../action/action.types'

// const initialState = {
//     user: {},
//     errors: {},
// }

export default (state = {}, action) => {
    switch (action.type) {
        case LOGIN: 
            return{loading: true, success: false}
        case LOGIN_USER_SUCCESS:
            return{user: action.payload, loading: false, success: true}
        case LOGIN_USER_FAIL:
            return{errors: action.payload, loading: false, success: false}
        case LOGOUT_USER: 
            return{}

        default: 
        return state;
    }
}