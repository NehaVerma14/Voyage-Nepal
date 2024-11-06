import axios from "axios";
import {
  GET_COUNT_FAIL,
  GET_COUNT_REQUEST,
  GET_COUNT_SUCCESS,
} from "./action.types";
import { API } from "../backend";


export const getDocsCount = (userId) => async (dispatch, getState) => {
  try {
    const { userLogin } = getState();
    const { token, userData } = userLogin.userInfo;
    const URL = `${API}/docs/count/${userData.id}`;

    dispatch({ type: GET_COUNT_REQUEST });

    var config = {
      method: "get",
      url: URL,
      headers: {
        Authorization: `Bearer ${token}`,
      }
    };

    const { data } = await axios(config);

    dispatch({ type: GET_COUNT_SUCCESS, payload: data });
  } catch (err) {
    dispatch({
        type: GET_COUNT_FAIL,
        payload:
          err.response && err.response.data.error
            ? err.response.data.error
            : err.message,
      });
  }
};
