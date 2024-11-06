import {LOGIN_USER_DETAILS} from '../action/action.types'

const initialState = {
    userDetail: {},
    
}

export default (state = initialState, action) => {
    switch (action.type) {
        case LOGIN_USER_DETAILS:
            return{...state, userDetail: action.payload}

        default: 
        return state;

    }
}