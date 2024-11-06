import {combineReducers} from 'redux'
import loginUser from './loginUser'
import authReducer from './registerUser'
import resetOtp from './resetOtp'
import userEmail from './userEmail'
import userDetails from './userDetails'
import category from './category'
import place from './place'
import recommendedPlace from './recommendedPlace'
import getPlaceById from './destinations/getPlaceById'
import review from './userActivity/review'
import currentLocation from './currentLocation'
import getPlaceByCategory from './destinations/getPlaceByCategory'
export default combineReducers({
    loginUser,
    authReducer,
    resetOtp,
    userEmail,
    userDetails,
    category,
    place,
    recommendedPlace,
    getPlaceById,
    review,
    currentLocation,
    getPlaceByCategory
})