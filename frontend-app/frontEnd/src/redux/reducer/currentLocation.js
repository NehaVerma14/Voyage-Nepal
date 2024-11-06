import {CURRENT_LOCATION} from '../action/action.types'
const initialState = {}

export default (state = {}, action) => {
    switch (action.type) {
        case CURRENT_LOCATION:
            return {currentLocation: action.payload}
    
        default:
            return state;
    }
}