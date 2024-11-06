import axios from "axios";
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
} from "./action.types";
import { API } from "../backend";

export const getAllStayPlace = () => async (dispatch, getState) => {
  try {
    const { userLogin } = getState();
    const { token, userData } = userLogin.userInfo;

    const URL = `${API}/hotels/${userData.id}`;
    dispatch({ type: GET_HOTEL_REQUEST });

    var config = {
      method: "get",
      url: URL,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const { data } = await axios(config);

    dispatch({ type: GET_HOTEL_SUCCESS, payload: data });
  } catch (err) {
    dispatch({
      type: GET_HOTEL_FAIL,
      payload:
        err.response && err.response.data.error
          ? err.response.data.error
          : err.message,
    });
  }
};

export const createStayPlace = (hotelData) => async (dispatch, getState) => {
  try {
    const { userLogin } = getState();
    const { token, userData } = userLogin.userInfo;

    const URL = `${API}/hotel/create/${userData.id}`;
    dispatch({ type: CREATE_HOTEL_REQUEST });

    if (!token || !userData.isAdmin) {
      throw new Error("User is not an Admin");
    }

    var config = {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    };

    const { data } = await axios.post(URL, hotelData, config);

    dispatch({ type: CREATE_HOTEL_SUCCESS, payload: data });
  } catch (err) {
    dispatch({
      type: CREATE_HOTEL_FAIL,
      payload:
        err.response && err.response.data.error
          ? err.response.data.error
          : err.message,
    });
  } finally {
    dispatch({ type: CREATE_HOTEL_RESET, });
  }
};

export const deleteStayPlace = (hotelId) => async (dispatch, getState) => {
  try {
    const { userLogin } = getState();
    const { token, userData } = userLogin.userInfo;

    dispatch({ type: DELETE_HOTEL_REQUEST });

    const URL = `${API}/hotel/delete/${hotelId}/${userData.id}`;

    if (!token || !userData.isAdmin) {
      throw new Error("User is not an Admin");
    }

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const { data } = await axios.delete(URL, config);

    dispatch({ type: DELETE_HOTEL_SUCCESS, payload: data });
  } catch (err) {
    dispatch({
      type: DELETE_HOTEL_FAIL,
      payload:
        err.response && err.response.data.error
          ? err.response.data.error
          : err.message,
    });
  } finally {
    dispatch({ type: RESET_DELETE_HOTEL })
  }
};



export const getNextStayPlace = (lastObjId = null) => async (dispatch, getState) => {
  try {
    const { userLogin } = getState();
    const { token, userData } = userLogin.userInfo;

    let URL;
    if(!lastObjId) {
      URL = `${API}/hotels/next-page/${userData.id}`;
    } else {
      URL = `${API}/hotels/next-page/${userData.id}/${lastObjId}`;
    }
    dispatch({ type: GET_HOTELS_CHUNK_REQUEST });

    var config = {
      method: "get",
      url: URL,
      headers: {
        Authorization: `Bearer ${token}`,
      }
    };

    const { data: hotelsDataList } = await axios(config);


    dispatch({ type: GET_HOTELS_CHUNK_SUCCESS, payload: {
      data: hotelsDataList.data,
      firstId: hotelsDataList.data[0]._id.toString(),
      lastId: hotelsDataList.data[hotelsDataList.data.length-1]._id.toString()
    } });

    if(!lastObjId) {
      dispatch({
        type: MARK_FIRST_HOTELS_CHUNK_PAGE,
        payload: 'true'
      })
    }

    if(hotelsDataList.data.length !== 5) {
      dispatch({
        type: END_OF_HOTELS_CHUNK_PAGE,
        payload: 'true'
      })
    }
  } catch (err) {
    dispatch({
      type: GET_HOTELS_CHUNK_FAIL,
      payload:
        err.response && err.response.data.error
          ? err.response.data.error
          : err.message,
    });
  }
};

export const getPreviousStayPlace = (firstObjId) => async (dispatch, getState) => {
  try {
    const { userLogin, hotelList } = getState();
    const { token, userData } = userLogin.userInfo;

    const  URL = `${API}/hotels/previous-page/${userData.id}/${firstObjId}`;

    dispatch({ type: GET_HOTELS_CHUNK_REQUEST });

    var config = {
      method: "get",
      url: URL,
      headers: {
        Authorization: `Bearer ${token}`,
      }
    };

    const { data: hotelsDataList } = await axios(config);

    const reverseHotelDataList = hotelsDataList.data.reverse();

    if(reverseHotelDataList.length === 5) {
      dispatch({ type: GET_HOTELS_CHUNK_SUCCESS, payload: {
        data: reverseHotelDataList,
        firstId: reverseHotelDataList[0]._id.toString(),
        lastId: reverseHotelDataList[reverseHotelDataList.length-1]._id.toString()
      } });
    } else  {
      dispatch({
        type: GET_HOTELS_CHUNK_SUCCESS,
        payload: {
          data: hotelList.hotels,
          firstId: hotelList.firstObjectId,
          lastId: hotelList.lastObjectId
        }
      })

      dispatch({
        type: MARK_FIRST_HOTELS_CHUNK_PAGE,
        payload: 'true'
      })
    }
  } catch (err) {
    dispatch({
      type: GET_HOTELS_CHUNK_FAIL,
      payload:
        err.response && err.response.data.error
          ? err.response.data.error
          : err.message,
    });
  }
}
