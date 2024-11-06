import {applyMiddleware, createStore, combineReducers} from 'redux'
import thunk from 'redux-thunk'

import rootReducer from './reducer/index'

const middleware = [thunk]

import {composeWithDevTools} from 'redux-devtools-extension'

export default createStore(
    rootReducer,
    composeWithDevTools(applyMiddleware(...middleware))
)

