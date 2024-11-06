import {
  GET_COUNT_FAIL,
  GET_COUNT_REQUEST,
  GET_COUNT_SUCCESS,
} from "../actions/action.types";


export const countReducers = (state = {}, action) => {
    switch (action.type) {
        case GET_COUNT_REQUEST:
            return { loading: true, countData: { } }
        case GET_COUNT_SUCCESS:
            return { loading: false, countData: action.payload, success: true }
        case GET_COUNT_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state;
    }
}