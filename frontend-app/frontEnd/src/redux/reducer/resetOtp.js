import {RESET_PASSWORD, RESET_PASSWORD_FAIL, RESET_PASSWORD_SUCCESS} from '../action/action.types'

const initialState = {
    resetID: '',
    errors: {}
}

export default (state = {}, action) => {
    switch (action.type) {
        case RESET_PASSWORD:
            return{loading: true}
        case RESET_PASSWORD_SUCCESS:
            return{loading: false, success: true, resetID: action.payload}
        case RESET_PASSWORD_FAIL:
            return{loading: false, error: action.payload, success: false}
        default: 
        return state;
    }
}