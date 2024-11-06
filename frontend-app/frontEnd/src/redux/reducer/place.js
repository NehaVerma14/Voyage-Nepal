import {FETCH_PLACE} from '../action/action.types'

const initialState = []

export default (state = initialState, action) => {
    switch (action.type) {
        case FETCH_PLACE:
            return action.payload
        default: 
        return state;

    }
}