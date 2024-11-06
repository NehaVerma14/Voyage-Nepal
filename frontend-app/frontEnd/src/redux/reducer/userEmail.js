import {USER_EMAIL, USER_EMAIL_ERROR, USER_EMAIL_SUCCESS} from '../action/action.types'

const initialState = {
    email: '',
    loading: true,
    success: false,
    error: ''
}

export default (state = {}, action) => {
    switch (action.type) {
        case USER_EMAIL:
            return{loading: true}
        case USER_EMAIL_SUCCESS:
            return{loading: false, email: action.payload, success: true, error: ''}
        case USER_EMAIL_ERROR:
            return{loading: false, email: '', success: false, error: action.payload}

        default: 
        return state;

    }
}