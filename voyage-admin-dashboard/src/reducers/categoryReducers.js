import {
  CREATE_CATEGORY_REQUEST,
  CREATE_CATEGORY_SUCCESS,
  CREATE_CATEGORY_FAIL,
  CREATE_CATEGORY_RESET,
  GET_CATEGORY_REQUEST,
  GET_CATEGORY_SUCCESS,
  GET_CATEGORY_FAIL,
  GET_CATEGORY_CHUNK_REQUEST,
  GET_CATEGORY_CHUNK_SUCCESS,
  GET_CATEGORY_CHUNK_FAIL,
  END_OF_CATEGORY_PAGE,
  MARK_FIRST_CATEGORY_PAGE,
  DELETE_CATEGORY_REQUEST,
  DELETE_CATEGORY_SUCCESS,
  DELETE_CATEGORY_FAIL,
  RESET_DELETE_CATEGORY
} from "../actions/action.types";

export const createCategoryReducer = (state = {}, action) => {
  switch (action.type) {
    case CREATE_CATEGORY_REQUEST:
      return { loading: true, categoryInfo: {} };
    case CREATE_CATEGORY_SUCCESS:
      return { loading: false, categoryInfo: action.payload, success: true };
    case CREATE_CATEGORY_FAIL:
      return { loading: false, error: action.payload };
    case CREATE_CATEGORY_RESET:
      return {}
    default:
      return state;
  }
};

export const getCategoryReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_CATEGORY_REQUEST:
      return { loading: true, categories: {} };
    case GET_CATEGORY_SUCCESS:
      return { loading: false, categories: action.payload };
    case GET_CATEGORY_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const categoryListReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_CATEGORY_CHUNK_REQUEST:
      return { loading: true };
    case GET_CATEGORY_CHUNK_SUCCESS:
      return {
        loading: false,
        categories: action.payload.data,
        lastObjectId: action.payload.lastId,
        firstObjectId: action.payload.firstId
      };
    case GET_CATEGORY_CHUNK_FAIL:
      return { loading: false, error: action.payload };
    case END_OF_CATEGORY_PAGE:
      return { ...state, isEndOfCategoryPage: action.payload };
    case MARK_FIRST_CATEGORY_PAGE:
      return {
        ...state,
        isFirstPage: action.payload,
      };
    default:
      return state;
  }
};

export const categoryDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case DELETE_CATEGORY_REQUEST:
      return { loading: true, deleteMsg: null };
    case DELETE_CATEGORY_SUCCESS:
      return { loading: false, success: true, deleteMsg: action.payload };
    case RESET_DELETE_CATEGORY:
      return {}
    case DELETE_CATEGORY_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
}
