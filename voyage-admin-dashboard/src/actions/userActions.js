import axios from "axios";
import {
  USER_LOGIN_FAIL,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_REQUEST,
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
  UPDATE_USER_ROLE_FAIL,
  UPDATE_USER_ROLE_REQUEST,
  UPDATE_USER_ROLE_SUCCESS,
  RESET_UPDATE_ROLE
} from "./action.types";
import { API } from "../backend";

export const login = (email, password) => {
  return async (dispatch) => {
    try {
      dispatch({ type: USER_LOGIN_REQUEST });

      const { data } = await axios.post(`${API}/user/signin`, {
        email,
        password,
      });

      dispatch({ type: USER_LOGIN_SUCCESS, payload: data });

      localStorage.setItem('userInfo', JSON.stringify(data));
    } catch (err) {
      dispatch({
        type: USER_LOGIN_FAIL,
        payload:
          err.response && err.response.data.error
            ? err.response.data.error
            : err.message,
      });
    }
  };
};

export const logout = () => {
  return (dispatch) => {
    localStorage.removeItem('userInfo');
    dispatch({ type: USER_LOGOUT });
    window.location.href = "/login";
  }
}

export const register = (token) => async(dispatch) => {
  try {
    dispatch({ 
      type: USER_REGISTER_REQUEST
    });

    if(!token) {
      throw new Error('Token has expired');
    }

    const config = {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    }

    const URL = `${API}/user/verify-email`;
    const { data } = await axios.post(URL, {token}, config);

    if(data?.error) {
      throw new Error(data.error);
    }

    dispatch({
      type: USER_REGISTER_SUCCESS,
      payload: data
    })

  } catch (err) {
    dispatch({
      type: USER_REGISTER_FAIL,
      payload:
        err.response && err.response.data.error
          ? err.response.data.error
          : err.message,
    });
  } finally {
    dispatch({
      type: USER_REGISTER_RESET
    })
  }
}

export const getNextUsers = (lastObjId = null) => async (dispatch, getState) => {
  try {
    const { userLogin } = getState();
    const { token, userData } = userLogin.userInfo;

    let URL;
    if(!lastObjId) {
      URL = `${API}/users/next-page/${userData.id}`;
    } else {
      URL = `${API}/users/next-page/${userData.id}/${lastObjId}`;
    }

    dispatch({ type: GET_USERS_REQUEST });

    var config = {
      method: "get",
      url: URL,
      headers: {
        Authorization: `Bearer ${token}`,
      }
    };

    const { data: userDataList } = await axios(config);

    dispatch({ type: GET_USERS_SUCCESS, payload: {
      data: userDataList.data,
      firstId: userDataList.data[0]._id.toString(),
      lastId: userDataList.data[userDataList.data.length-1]._id.toString()
    } });

    if(!lastObjId) {
      dispatch({
        type: MARK_FIRST_USER_PAGE,
        payload: 'true'
      })
    }

    if(userDataList.data.length !== 5) {
      dispatch({
        type: END_OF_USER_PAGE,
        payload: 'true'
      })
    }
  } catch (err) {
    dispatch({
      type: GET_USERS_FAIL,
      payload:
        err.response && err.response.data.error
          ? err.response.data.error
          : err.message,
    });
  }
}

export const getPreviousUsers = (firstObjId) => async (dispatch, getState) => {
  try {
    const { userLogin, userList } = getState();
    const { token, userData } = userLogin.userInfo;

    const  URL = `${API}/users/previous-page/${userData.id}/${firstObjId}`;

    dispatch({ type: GET_USERS_REQUEST });

    var config = {
      method: "get",
      url: URL,
      headers: {
        Authorization: `Bearer ${token}`,
      }
    };

    const { data: userDataList } = await axios(config);

    const reverseUserDataList = userDataList.data.reverse();

    if(reverseUserDataList.length === 5) {
      dispatch({ type: GET_USERS_SUCCESS, payload: {
        data: reverseUserDataList,
        firstId: reverseUserDataList[0]._id.toString(),
        lastId: reverseUserDataList[reverseUserDataList.length-1]._id.toString()
      } });
    } else  {
      dispatch({
        type: GET_USERS_SUCCESS,
        payload: {
          data: userList.users,
          firstId: userList.firstObjectId,
          lastId: userList.lastObjectId
        }
      })

      dispatch({
        type: MARK_FIRST_USER_PAGE,
        payload: 'true'
      })
    }
  } catch (err) {
    dispatch({
      type: GET_USERS_FAIL,
      payload:
        err.response && err.response.data.error
          ? err.response.data.error
          : err.message,
    });
  }
}

export const deleteUser = (userId) => async (dispatch, getState) => {
  try {
    const { userLogin } = getState();
    const { token, userData } = userLogin.userInfo;

    dispatch({ type: DELETE_USER_REQUEST });

    const URL = `${API}/user/${userData.id}/${userId}`;

    if (!token || !userData.isAdmin) {
      throw new Error("User is not an Admin");
    }

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const { data } = await axios.delete(URL, config);

    dispatch({ type: DELETE_USER_SUCCESS, payload: data });
  } catch (err) {
    dispatch({
      type: DELETE_USER_FAIL,
      payload:
        err.response && err.response.data.error
          ? err.response.data.error
          : err.message,
    });
  } finally {
    dispatch({ type: RESET_DELETE_USER })
  }
};

export const updateUserRole = (userId, role) => async (dispatch, getState) => {
  try {
    const { userLogin } = getState();
    const { token, userData } = userLogin.userInfo;

    dispatch({ type: UPDATE_USER_ROLE_REQUEST });

    const URL = `${API}/user/update-role/${userData.id}/${userId}`;

    if (!token || !userData.isAdmin) {
      throw new Error("User is not an Admin");
    }

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
    };

    const { data } = await axios.put(URL, { "isAdmin": role }, config);

    dispatch({ type: UPDATE_USER_ROLE_SUCCESS, payload: data });
  } catch (err) {
    dispatch({
      type: UPDATE_USER_ROLE_FAIL,
      payload:
        err.response && err.response.data.error
          ? err.response.data.error
          : err.message,
    });
  } finally {
    dispatch({ type: RESET_UPDATE_ROLE })
  }

}

