import {
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAIL,
  USER_LOGOUT,
  USER_REGISTER_FAIL,
  USER_REGISTER_REQUEST,
  USER_REGISTER_RESET,
  USER_REGISTER_SUCCESS,
  DELETE_USER_REQUEST, 
  DELETE_USER_SUCCESS,
  DELETE_USER_FAIL,
  RESET_DELETE_USER,
  GET_USERS_REQUEST,
  GET_USERS_SUCCESS,
  GET_USERS_FAIL,
  END_OF_USER_PAGE,
  MARK_FIRST_USER_PAGE,
  UPDATE_USER_ROLE_REQUEST,
  UPDATE_USER_ROLE_SUCCESS,
  UPDATE_USER_ROLE_FAIL,
  RESET_UPDATE_ROLE
} from "../actions/action.types";

export const userLoginReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_LOGIN_REQUEST:
      return { loading: true, userInfo: {} };
    case USER_LOGIN_SUCCESS:
      return { userInfo: action.payload, loading: false };
    case USER_LOGIN_FAIL:
      return { loading: false, error: action.payload };
    case USER_LOGOUT:
      return {};
    default:
      return state;
  }
};

export const userRegisterReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_REGISTER_REQUEST:
      return { loading: true, registerInfo: {} };
    case USER_REGISTER_SUCCESS:
      return { registerInfo: action.payload, loading: false, success: true };
    case USER_REGISTER_FAIL:
      return { loading: false, error: action.payload };
    case USER_REGISTER_RESET:
      return {};
    default:
      return state;
  }
};

export const userListReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_USERS_REQUEST:
      return { loading: true, users: [], lastObjectId: null };
    case GET_USERS_SUCCESS:
      return {
        loading: false,
        users: action.payload.data,
        lastObjectId: action.payload.lastId,
        firstObjectId: action.payload.firstId
      };
    case GET_USERS_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case END_OF_USER_PAGE:
      return {...state, isEndOfUserPage: action.payload}
    case MARK_FIRST_USER_PAGE:
      return {
        ...state,
        isFirstPage: action.payload
      }
    default:
      return state;
  }
};

export const userDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case DELETE_USER_REQUEST:
      return { loading: true, deleteMsg: null };
    case DELETE_USER_SUCCESS:
      return { loading: false, success: true, deleteMsg: action.payload };
    case RESET_DELETE_USER:
      return {}
    case DELETE_USER_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
}

export const userUpdateRoleReducer = (state = {}, action) => {
  switch (action.type) {
    case UPDATE_USER_ROLE_REQUEST:
      return { loading: true };
    case UPDATE_USER_ROLE_SUCCESS:
      return {
        loading: false,
        updateMsg: action.payload
      };
    case UPDATE_USER_ROLE_FAIL:
      return { error: action.payload };
    case RESET_UPDATE_ROLE:
      return { };
    default:
      return state;
  }
}