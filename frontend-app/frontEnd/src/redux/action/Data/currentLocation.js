import {CURRENT_LOCATION} from '../action.types'

export const CurrentLocation = (long, lat) => {
    var location = {
        longitude: long,
        latitude: lat
    }
    return async (dispatch) => {
        dispatch({
            type: CURRENT_LOCATION,
            payload: location
        })
        // console.log(location);
    }
}