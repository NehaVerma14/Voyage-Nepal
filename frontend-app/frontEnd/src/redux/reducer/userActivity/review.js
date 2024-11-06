import {REVIEW, REVIEW_SUCCESS, REVIEW_FAIL} from '../../action/action.types'
 
const initialState = {
    loading: false,
    success: '',
    error: {}
}

export default (state = {}, action) => {
    switch (action.type) {
        case REVIEW:
            return{loading: true}
        case REVIEW_SUCCESS:
            return{loading: false, success: action.payload, error: {}}
        case REVIEW_FAIL:
            return{loading: false, error: action.payload}
    
        default:
            return state
    }
} 