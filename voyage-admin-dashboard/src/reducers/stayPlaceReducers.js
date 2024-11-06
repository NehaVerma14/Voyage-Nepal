import {
  GET_HOTEL_REQUEST,
  GET_HOTEL_SUCCESS,
  GET_HOTEL_FAIL,
  CREATE_HOTEL_REQUEST,
  CREATE_HOTEL_SUCCESS,
  CREATE_HOTEL_FAIL,
  CREATE_HOTEL_RESET,
  DELETE_HOTEL_REQUEST,
  DELETE_HOTEL_SUCCESS,
  DELETE_HOTEL_FAIL,
  RESET_DELETE_HOTEL,
  GET_HOTELS_CHUNK_REQUEST,
  GET_HOTELS_CHUNK_SUCCESS,
  GET_HOTELS_CHUNK_FAIL,
  END_OF_HOTELS_CHUNK_PAGE,
  MARK_FIRST_HOTELS_CHUNK_PAGE
} from "../actions/action.types";

export const createStayPlaceReducer = (state = {}, action) => {
  switch (action.type) {
    case CREATE_HOTEL_REQUEST:
      return { loading: true, hotelInfo: {} };
    case CREATE_HOTEL_SUCCESS:
      return { loading: false, hotelInfo: action.payload, success: true };
    case CREATE_HOTEL_FAIL:
      return { loading: false, error: action.payload };
    case CREATE_HOTEL_RESET:
      return {};
    default:
      return state;
  }
};

export const getHotelReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_HOTEL_REQUEST:
      return { loading: true, hotels: {} };
    case GET_HOTEL_SUCCESS:
      return { loading: false, hotels: action.payload };
    case GET_HOTEL_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const hotelListReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_HOTELS_CHUNK_REQUEST:
      return { loading: true };
    case GET_HOTELS_CHUNK_SUCCESS:
      return {
        loading: false,
        hotels: action.payload.data,
        lastObjectId: action.payload.lastId,
        firstObjectId: action.payload.firstId
      };
    case GET_HOTELS_CHUNK_FAIL:
      return { loading: false, error: action.payload };
    case END_OF_HOTELS_CHUNK_PAGE:
      return { ...state, isEndOfHotelPage: action.payload };
    case MARK_FIRST_HOTELS_CHUNK_PAGE:
      return {
        ...state,
        isFirstPage: action.payload,
      };
    default:
      return state;
  }
};

export const hotelDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case DELETE_HOTEL_REQUEST:
      return { loading: true };
    case DELETE_HOTEL_SUCCESS:
      return { loading: false, success: true, deletedHotel: action.payload.deletedDoc };
    case RESET_DELETE_HOTEL:
      return {}
    case DELETE_HOTEL_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
}