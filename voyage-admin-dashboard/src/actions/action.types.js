//User Login Actions
export const USER_LOGIN_REQUEST = 'USER_LOGIN_REQUEST';
export const USER_LOGIN_SUCCESS = 'USER_LOGIN_SUCCESS';
export const USER_LOGIN_FAIL = 'USER_LOGIN_FAIL';
export const USER_LOGOUT = 'USER_LOGOUT';

export const USER_REGISTER_REQUEST = 'USER_REGISTER_REQUEST';
export const USER_REGISTER_SUCCESS = 'USER_REGISTER_SUCCESS';
export const USER_REGISTER_FAIL = 'USER_REGISTER_FAIL';
export const USER_REGISTER_RESET = 'USER_REGISTER_RESET';

//update user role
export const UPDATE_USER_ROLE_REQUEST = 'UPDATE_USER_ROLE_REQUEST';
export const UPDATE_USER_ROLE_SUCCESS = 'UPDATE_USER_ROLE_SUCCESS';
export const UPDATE_USER_ROLE_FAIL = 'UPDATE_USER_ROLE_FAIL';
export const RESET_UPDATE_ROLE = 'RESET_UPDATE_ROLE';

//Pending Review Action
export const PENDING_REVIEW_REQUEST = 'PENDING_REVIEW_REQUEST';
export const PENDING_REVIEW_SUCCESS = 'PENDING_REVIEW_SUCCESS';
export const PENDING_REVIEW_FAIL = 'PENDING_REVIEW_FAIL';

export const APPROVE_REVIEW_REQUEST = 'APPROVE_REVIEW_REQUEST';
export const APPROVE_REVIEW_SUCCESS = 'APPROVE_REVIEW_SUCCESS';
export const APPROVE_REVIEW_FAIL = 'APPROVE_REVIEW_FAIL';
export const APPROVE_REVIEW_RESET = 'APPROVE_REVIEW_RESET';

export const REJECT_REVIEW_REQUEST = 'REJECT_REVIEW_REQUEST';
export const REJECT_REVIEW_SUCCESS = 'REJECT_REVIEW_SUCCESS';
export const REJECT_REVIEW_FAIL = 'REJECT_REVIEW_FAIL';
export const REJECT_REVIEW_RESET = 'REJECT_REVIEW_RESET';

export const DELETE_USER_REQUEST = 'DELETE_USER_REQUEST';
export const DELETE_USER_SUCCESS = 'DELETE_USER_SUCCESS';
export const DELETE_USER_FAIL = 'DELETE_USER_FAIL';
export const RESET_DELETE_USER = 'RESET_DELETE_USER';

export const GET_USERS_REQUEST = 'GET_USERS_REQUEST';
export const GET_USERS_SUCCESS = 'GET_USERS_SUCCESS';
export const GET_USERS_FAIL = 'GET_USERS_FAIL';
export const END_OF_USER_PAGE = 'END_OF_USER_PAGE';
export const MARK_FIRST_USER_PAGE = 'MARK_FIRST_USER_PAGE';


//Create Place Action
export const CREATE_PLACE_REQUEST = 'CREATE_PLACE_REQUEST';
export const CREATE_PLACE_SUCCESS = 'CREATE_PLACE_SUCCESS';
export const CREATE_PLACE_FAIL = 'CREATE_PLACE_FAIL';
export const CREATE_PLACE_RESET = 'CREATE_PLACE_RESET';


//UPDATE PLACE ACTION
export const UPDATE_PLACE_REQUEST = 'UPDATE_PLACE_REQUEST';
export const UPDATE_PLACE_SUCCESS = 'UPDATE_PLACE_SUCCESS';
export const UPDATE_PLACE_FAIL = 'UPDATE_PLACE_FAIL';

//DELETE PLACE ACTION
export const DELETE_PLACE_REQUEST = 'DELETE_PLACE_REQUEST';
export const DELETE_PLACE_SUCCESS = 'DELETE_PLACE_SUCCESS';
export const DELETE_PLACE_FAIL = 'DELETE_PLACE_FAIL';
export const RESET_DELETE_PLACE = 'RESET_DELETE_PLACE';

//GET PLACE ACTION
export const GET_PLACES_REQUEST = 'GET_PLACE_REQUEST';
export const GET_PLACES_SUCCESS = 'GET_PLACE_SUCCESS';
export const GET_PLACES_FAIL = 'GET_PLACE_FAIL';
export const END_OF_PLACES_PAGE = 'END_OF_PLACES_PAGE';
export const MARK_FIRST_PLACES_PAGE = 'MARK_FIRST_PLACES_PAGE';

//Create CATEGORY Action
export const CREATE_CATEGORY_REQUEST = 'CREATE_CATEGORY_REQUEST';
export const CREATE_CATEGORY_SUCCESS = 'CREATE_CATEGORY_SUCCESS';
export const CREATE_CATEGORY_FAIL = 'CREATE_CATEGORY_FAIL';
export const CREATE_CATEGORY_RESET = 'CREATE_CATEGORY_RESET';

//GET CATEGORY CHUNKS PAGINATION
export const GET_CATEGORY_CHUNK_REQUEST = 'GET_CATEGORY_CHUNK_REQUEST';
export const GET_CATEGORY_CHUNK_SUCCESS = 'GET_CATEGORY_CHUNK_SUCCESS';
export const GET_CATEGORY_CHUNK_FAIL = 'GET_CATEGORY_CHUNK_FAIL';
export const END_OF_CATEGORY_PAGE = 'END_OF_CATEGORY_PAGE';
export const MARK_FIRST_CATEGORY_PAGE = 'MARK_FIRST_CATEGORY_PAGE';


//UPDATE CATEGORY ACTION
export const UPDATE_CATEGORY_REQUEST = 'UPDATE_CATEGORY_REQUEST';
export const UPDATE_CATEGORY_SUCCESS = 'UPDATE_CATEGORY_SUCCESS';
export const UPDATE_CATEGORY_FAIL = 'UPDATE_CATEGORY_FAIL';

//DELETE CATEGORY ACTION
export const DELETE_CATEGORY_REQUEST = 'DELETE_CATEGORY_REQUEST';
export const DELETE_CATEGORY_SUCCESS = 'DELETE_CATEGORY_SUCCESS';
export const DELETE_CATEGORY_FAIL = 'DELETE_CATEGORY_FAIL';
export const RESET_DELETE_CATEGORY = 'RESET_DELETE_CATEGORY';

//GET CATEGORY ACTION
export const GET_CATEGORY_REQUEST = 'GET_CATEGORY_REQUEST';
export const GET_CATEGORY_SUCCESS = 'GET_CATEGORY_SUCCESS';
export const GET_CATEGORY_BY_ID_SUCCESS = 'GET_CATEGORY_BY_ID_SUCCESS';
export const GET_CATEGORY_FAIL = 'GET_CATEGORY_FAIL';

//Create HOTEL Action
export const CREATE_HOTEL_REQUEST = 'CREATE_HOTEL_REQUEST';
export const CREATE_HOTEL_SUCCESS = 'CREATE_HOTEL_SUCCESS';
export const CREATE_HOTEL_FAIL = 'CREATE_HOTEL_FAIL';
export const CREATE_HOTEL_RESET = 'CREATE_HOTEL_RESET';


//UPDATE HOTEL ACTION
export const UPDATE_HOTEL_REQUEST = 'UPDATE_HOTEL_REQUEST';
export const UPDATE_HOTEL_SUCCESS = 'UPDATE_HOTEL_SUCCESS';
export const UPDATE_HOTEL_FAIL = 'UPDATE_HOTEL_FAIL';

//DELETE HOTEL ACTION
export const DELETE_HOTEL_REQUEST = 'DELETE_HOTEL_REQUEST';
export const DELETE_HOTEL_SUCCESS = 'DELETE_HOTEL_SUCCESS';
export const DELETE_HOTEL_FAIL = 'DELETE_HOTEL_FAIL';
export const RESET_DELETE_HOTEL = 'RESET_DELETE_HOTEL';


//GET HOTEL ACTION
export const GET_HOTEL_REQUEST = 'GET_HOTEL_REQUEST';
export const GET_HOTEL_SUCCESS = 'GET_HOTEL_SUCCESS';
export const GET_HOTEL_FAIL = 'GET_HOTEL_FAIL';

//chunks hotels get request
export const GET_HOTELS_CHUNK_REQUEST = 'GET_HOTELS_CHUNK_REQUEST';
export const GET_HOTELS_CHUNK_SUCCESS = 'GET_HOTELS_CHUNK_SUCCESS';
export const GET_HOTELS_CHUNK_FAIL = 'GET_HOTELS_CHUNK_FAIL';
export const END_OF_HOTELS_CHUNK_PAGE = 'END_OF_HOTELS_CHUNK_PAGE';
export const MARK_FIRST_HOTELS_CHUNK_PAGE = 'MARK_FIRST_HOTELS_CHUNK_PAGE';

//toggler sidebar
export const TOGGLE_PLACE = 'TOGGLE_PLACE';
export const TOGGLE_CATEGORY = 'TOGGLE_CATEGORY';
export const TOGGLE_HOTEL = 'TOGGLE_HOTEL';
export const TOGGLE_USER = 'TOGGLE_USER';
export const TOGGLE_REVIEW = 'TOGGLE_REVIEW';

export const TOGGLE_OVERVIEW_PLACE = 'TOGGLE_OVERVIEW_PLACE';
export const TOGGLE_OVERVIEW_CATEGORY = 'TOGGLE_OVERVIEW_CATEGORY';
export const TOGGLE_OVERVIEW_HOTEL = 'TOGGLE_OVERVIEW_HOTEL';
export const TOGGLE_OVERVIEW_USER = 'TOGGLE_OVERVIEW_USER';

export const GET_COUNT_REQUEST = 'GET_COUNT_REQUEST';
export const GET_COUNT_SUCCESS = 'GET_COUNT_SUCCESS';
export const GET_COUNT_FAIL = 'GET_COUNT_FAIL';