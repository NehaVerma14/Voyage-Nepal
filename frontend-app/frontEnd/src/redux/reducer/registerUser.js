import {REGISTER_USER_SUCCESS, REGISTER_USER_FAIL, REGISTER} from '../action/action.types'

const initialState = {
    success: {},
    errors: {},
    loading: true,
}

const authReducer = (state = {}, action) => {
    switch (action.type) {
        case REGISTER: 
            return{loading: true}
        case REGISTER_USER_SUCCESS:
            return{success: action.payload, loading: false}
        case REGISTER_USER_FAIL:
            return{errors: action.payload, loading: false}
        default:
             return state;
    }
}

export default authReducer