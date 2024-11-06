import { LOGIN_USER_DETAILS} from '../action.types';

export const userDetails = (data) => {
    return dispatch => {
        dispatch({
            type: LOGIN_USER_DETAILS,
            payload: data
        })
    }
}