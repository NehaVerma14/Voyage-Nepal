import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import {
  userLoginReducer,
  userRegisterReducer,
  userListReducer,
  userDeleteReducer,
  userUpdateRoleReducer
} from "./reducers/userReducers";
import { sidebarReducers } from "./reducers/sidebarReducers";

import {
  createPlaceReducer,
  placeListReducer,
  placeDeleteReducer,
} from "./reducers/placeReducers";
import {
  createCategoryReducer,
  categoryListReducer,
} from "./reducers/categoryReducers";
import { overviewReducers } from "./reducers/overviewReducers.js";
import {
  createStayPlaceReducer,
  hotelListReducer,
  hotelDeleteReducer,
} from "./reducers/stayPlaceReducers";

import {
  getCategoryReducer,
  categoryDeleteReducer,
} from "./reducers/categoryReducers";
import {
  reviewListReducer,
  approveReviewReducer,
  rejectReviewReducer
} from "./reducers/reviewReducers";
import { getHotelReducer } from "./reducers/stayPlaceReducers";
import { countReducers } from "./reducers/countReducers";

const reducer = combineReducers({
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  userDelete: userDeleteReducer,
  userList: userListReducer,
  userUpdateRole: userUpdateRoleReducer,
  placeList: placeListReducer,
  categoryList: categoryListReducer,
  hotelList: hotelListReducer,
  createPlace: createPlaceReducer,
  placeDelete: placeDeleteReducer,
  createCategory: createCategoryReducer,
  categoryDelete: categoryDeleteReducer,
  createStayPlace: createStayPlaceReducer,
  sidebarToggle: sidebarReducers,
  overviewToggle: overviewReducers,
  placeCategory: getCategoryReducer,
  placeHotel: getHotelReducer,
  hotelDelete: hotelDeleteReducer,
  docsCount: countReducers,
  reviewList: reviewListReducer,
  approveReview: approveReviewReducer,
  rejectReview: rejectReviewReducer,
});

const userInfo = localStorage.getItem("userInfo");
const userInfoFromStorage = userInfo ? JSON.parse(userInfo) : null;

const initialState = {
  userLogin: { userInfo: userInfoFromStorage },
  userRegister: {},
  userList: {},
  userDelete: {
    deleteMsg: null,
  },
  createPlace: {},
  placeList: {},
  placeDelete: {
    deletedPlace: null,
  },
  placeCategory: null,
  placeHotel: null,
  categoryList: {},
  hotelList: {},
  hotelDelete: {
    deletedHotel: null,
  },
  createStayPlace: {},
  createCategory: {},
  categoryDelete: {
    deleteMsg: null,
  },
  docsCount: {},
  sidebarToggle: {
    placeToggle: false,
    categoryToggle: false,
    hotelToggle: false,
    userToggle: false,
    reviewToggle: false,
  },
  overviewToggle: {
    showUser: true,
  },
};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
