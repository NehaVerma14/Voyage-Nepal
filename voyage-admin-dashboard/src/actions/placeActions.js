import axios from "axios";
import {
  CREATE_PLACE_REQUEST,
  CREATE_PLACE_SUCCESS,
  CREATE_PLACE_FAIL,
  CREATE_PLACE_RESET,
  UPDATE_PLACE_REQUEST,
  UPDATE_PLACE_SUCCESS,
  UPDATE_PLACE_FAIL,
  DELETE_PLACE_REQUEST,
  DELETE_PLACE_SUCCESS,
  DELETE_PLACE_FAIL,
  GET_PLACES_REQUEST,
  GET_PLACES_SUCCESS,
  GET_PLACES_FAIL,
  MARK_FIRST_PLACES_PAGE,
  END_OF_PLACES_PAGE,
  RESET_DELETE_PLACE
} from "./action.types";
import { API } from "../backend";

export const createPlace = (placeData) => async (dispatch, getState) => {
  try {
    const { userLogin } = getState();
    const { token, userData } = userLogin.userInfo;

    const URL = `${API}/place/create/${userData.id}`;
    dispatch({ type: CREATE_PLACE_REQUEST });

    if (!token || !userData.isAdmin) {
      throw new Error("User is not an Admin");
    }

    var config = {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    };

    const { data } = await axios.post(URL, placeData, config);

    dispatch({ type: CREATE_PLACE_SUCCESS, payload: data });
    dispatch({ type: CREATE_PLACE_RESET, });
  } catch (err) {
    dispatch({
      type: CREATE_PLACE_FAIL,
      payload:
        err.response && err.response.data.error
          ? err.response.data.error
          : err.message,
    });
    dispatch({ type: CREATE_PLACE_RESET, });
  }
};

export const getNextPlaces = (lastObjId = null) => async (dispatch, getState) => {
  try {
    const { userLogin } = getState();
    const { token, userData } = userLogin.userInfo;

    let URL;
    if(!lastObjId) {
      URL = `${API}/places/next-page/${userData.id}`;
    } else {
      URL = `${API}/places/next-page/${userData.id}/${lastObjId}`;
    }
    dispatch({ type: GET_PLACES_REQUEST });

    var config = {
      method: "get",
      url: URL,
      headers: {
        Authorization: `Bearer ${token}`,
      }
    };

    const { data: placeDataList } = await axios(config);


    dispatch({ type: GET_PLACES_SUCCESS, payload: {
      data: placeDataList.data,
      firstId: placeDataList.data[0]._id.toString(),
      lastId: placeDataList.data[placeDataList.data.length-1]._id.toString()
    } });

    if(!lastObjId) {
      dispatch({
        type: MARK_FIRST_PLACES_PAGE,
        payload: 'true'
      })
    }

    if(placeDataList.data.length !== 5) {
      dispatch({
        type: END_OF_PLACES_PAGE,
        payload: 'true'
      })
    }
  } catch (err) {
    dispatch({
      type: GET_PLACES_FAIL,
      payload:
        err.response && err.response.data.error
          ? err.response.data.error
          : err.message,
    });
  }
};

export const getPreviousPlaces = (firstObjId) => async (dispatch, getState) => {
  try {
    const { userLogin, placeList } = getState();
    const { token, userData } = userLogin.userInfo;

    const  URL = `${API}/places/previous-page/${userData.id}/${firstObjId}`;

    dispatch({ type: GET_PLACES_REQUEST });

    var config = {
      method: "get",
      url: URL,
      headers: {
        Authorization: `Bearer ${token}`,
      }
    };

    const { data: placeDataList } = await axios(config);

    const reversePlaceDataList = placeDataList.data.reverse();

    if(reversePlaceDataList.length === 5) {
      dispatch({ type: GET_PLACES_SUCCESS, payload: {
        data: reversePlaceDataList,
        firstId: reversePlaceDataList[0]._id.toString(),
        lastId: reversePlaceDataList[reversePlaceDataList.length-1]._id.toString()
      } });
    } else  {
      dispatch({
        type: GET_PLACES_SUCCESS,
        payload: {
          data: placeList.places,
          firstId: placeList.firstObjectId,
          lastId: placeList.lastObjectId
        }
      })

      dispatch({
        type: MARK_FIRST_PLACES_PAGE,
        payload: 'true'
      })
    }
  } catch (err) {
    dispatch({
      type: GET_PLACES_FAIL,
      payload:
        err.response && err.response.data.error
          ? err.response.data.error
          : err.message,
    });
  }
}

// export const updatePlace =
//   (updatedData, placeId) => async (dispatch, getState) => {
//     try {
//       const URL = `${API}/place/${placeId}/update`;
//       dispatch({ type: UPDATE_PLACE_REQUEST });

//       const { userLogin } = getState();
//       const { token } = userLogin.userInfo;

//       const config = {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       };
//       const { data } = await axios.put(URL, updatedData, config);

//       dispatch({ type: UPDATE_PLACE_SUCCESS, payload: data });
//     } catch (err) {
//       dispatch({
//         type: UPDATE_PLACE_FAIL,
//         payload:
//           err.response && err.response.data.error
//             ? err.response.data.error
//             : err.message,
//       });
//     }
//   };

export const deletePlace = (placeId) => async (dispatch, getState) => {
  try {
    const { userLogin } = getState();
    const { token, userData } = userLogin.userInfo;

    dispatch({ type: DELETE_PLACE_REQUEST });

    const URL = `${API}/place/delete/${placeId}/${userData.id}`;

    if (!token || !userData.isAdmin) {
      throw new Error("User is not an Admin");
    }

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const { data } = await axios.delete(URL, config);

    dispatch({ type: DELETE_PLACE_SUCCESS, payload: data });
  } catch (err) {
    dispatch({
      type: DELETE_PLACE_FAIL,
      payload:
        err.response && err.response.data.error
          ? err.response.data.error
          : err.message,
    });
  } finally {
    dispatch({ type: RESET_DELETE_PLACE })
  }
};

