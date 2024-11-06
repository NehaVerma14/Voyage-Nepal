import {GET_PLACE_FAIL, GET_PLACE_SUCCESS, GET_PLACE} from '../../action/action.types'

const initialState = {
    loading: true,
    success: false,
    place: {},
    error: {}
}

export default (state = initialState, action) => {
    switch (action.type) {
        case GET_PLACE:
            return{...state, loading: true}
        case GET_PLACE_SUCCESS:
            return{...state, loading: false, success: true, place: action.payload, error: {}}
        case GET_PLACE_FAIL:
            return{...state, loading: false, success: false, error: action.payload}
    
        default:
            return state;
    }
}