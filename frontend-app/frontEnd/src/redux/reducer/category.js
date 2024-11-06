import {FETCH_CATEGORY} from '../action/action.types'

const initialState = []

export default (state = initialState, action) => {
    switch (action.type) {
        case FETCH_CATEGORY:
            return action.payload
        default: 
        return state;

    }
}