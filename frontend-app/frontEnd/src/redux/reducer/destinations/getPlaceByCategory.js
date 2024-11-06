import {GET_PLACE_BY_CATEGORY, GET_PLACE_BY_CATEGORY_SUCCESS, GET_PLACE_BY_CATEGORY_FAIL} from '../../action/action.types'

const initialState = {
    loading: true,
    success: false,
    place: {},
    error: {}
}

export default (state = initialState, action) => {
    switch (action.type) {
        case GET_PLACE_BY_CATEGORY:
            return{...state, loading: true}
        case GET_PLACE_BY_CATEGORY_SUCCESS:
            return{...state, loading: false, success: true, place: action.payload, error: {}}
        case GET_PLACE_BY_CATEGORY_FAIL:
            return{...state, loading: false, success: false, error: action.payload}
    
        default:
            return state;
    }
}