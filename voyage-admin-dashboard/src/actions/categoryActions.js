import axios from "axios";
import {
  CREATE_CATEGORY_REQUEST,
  CREATE_CATEGORY_SUCCESS,
  CREATE_CATEGORY_FAIL,
  CREATE_CATEGORY_RESET,
  UPDATE_CATEGORY_REQUEST,
  UPDATE_CATEGORY_SUCCESS,
  UPDATE_CATEGORY_FAIL,
  DELETE_CATEGORY_REQUEST,
  DELETE_CATEGORY_SUCCESS,
  DELETE_CATEGORY_FAIL,
  RESET_DELETE_CATEGORY,
  GET_CATEGORY_REQUEST,
  GET_CATEGORY_SUCCESS,
  GET_CATEGORY_FAIL,
  GET_CATEGORY_CHUNK_REQUEST,
  GET_CATEGORY_CHUNK_SUCCESS,
  GET_CATEGORY_CHUNK_FAIL,
  END_OF_CATEGORY_PAGE,
  MARK_FIRST_CATEGORY_PAGE
} from "./action.types";
import { API } from "../backend";

export const createCategory = (categoryData) => async (dispatch, getState) => {
  try {
    const { userLogin } = getState();
    const { token, userData } = userLogin.userInfo;

    const URL = `${API}/category/create/${userData.id}`;
    dispatch({ type: CREATE_CATEGORY_REQUEST });
    
    if (!token || !userData.isAdmin) {
      throw new Error("User is not an Admin");
    }

    var config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const { data } = await axios.post(URL, categoryData, config);

    dispatch({ type: CREATE_CATEGORY_SUCCESS, payload: data });
    dispatch({ type: CREATE_CATEGORY_RESET, });
  } catch (err) {
    dispatch({
      type: CREATE_CATEGORY_FAIL,
      payload:
        err.response && err.response.data.error
          ? err.response.data.error
          : err.message,
    });
    dispatch({ type: CREATE_CATEGORY_RESET, });
  }
};

export const getAllCategory = () => async (dispatch, getState) => {
  try {
    const { userLogin } = getState();
    const { token, userData } = userLogin.userInfo;

    const URL = `${API}/categories/${userData.id}`;
    dispatch({ type: GET_CATEGORY_REQUEST });

    var config = {
      method: "get",
      url: URL,
      headers: {
        Authorization: `Bearer ${token}`,
      }
    };

    const { data } = await axios(config);

    dispatch({ type: GET_CATEGORY_SUCCESS, payload: data });
  } catch (err) {
    dispatch({
      type: GET_CATEGORY_FAIL,
      payload:
        err.response && err.response.data.error
          ? err.response.data.error
          : err.message,
    });
  }
};

export const getNextCategory = (lastObjId = null) => async (dispatch, getState) => {
  try {
    const { userLogin } = getState();
    const { token, userData } = userLogin.userInfo;

    let URL;
    if(!lastObjId) {
      URL = `${API}/categories/next-page/${userData.id}`;
    } else {
      URL = `${API}/categories/next-page/${userData.id}/${lastObjId}`;
    }
    dispatch({ type: GET_CATEGORY_CHUNK_REQUEST });

    var config = {
      method: "get",
      url: URL,
      headers: {
        Authorization: `Bearer ${token}`,
      }
    };

    const { data: categoryDataList } = await axios(config);


    dispatch({ type: GET_CATEGORY_CHUNK_SUCCESS, payload: {
      data: categoryDataList.data,
      firstId: categoryDataList.data[0]._id.toString(),
      lastId: categoryDataList.data[categoryDataList.data.length-1]._id.toString()
    } });

    if(!lastObjId) {
      dispatch({
        type: MARK_FIRST_CATEGORY_PAGE,
        payload: 'true'
      })
    }

    if(categoryDataList.data.length !== 5) {
      dispatch({
        type: END_OF_CATEGORY_PAGE,
        payload: 'true'
      })
    }
  } catch (err) {
    dispatch({
      type: GET_CATEGORY_CHUNK_FAIL,
      payload:
        err.response && err.response.data.error
          ? err.response.data.error
          : err.message,
    });
  }
};

export const getPreviousCategory = (firstObjId) => async (dispatch, getState) => {
  try {
    const { userLogin, categoryList } = getState();
    const { token, userData } = userLogin.userInfo;

    const  URL = `${API}/categories/previous-page/${userData.id}/${firstObjId}`;

    dispatch({ type: GET_CATEGORY_CHUNK_REQUEST });

    var config = {
      method: "get",
      url: URL,
      headers: {
        Authorization: `Bearer ${token}`,
      }
    };

    const { data: categoryDataList } = await axios(config);

    const reverseCategoryDataList = categoryDataList.data.reverse();

    if(reverseCategoryDataList.length === 5) {
      dispatch({ type: GET_CATEGORY_CHUNK_SUCCESS, payload: {
        data: reverseCategoryDataList,
        firstId: reverseCategoryDataList[0]._id.toString(),
        lastId: reverseCategoryDataList[reverseCategoryDataList.length-1]._id.toString()
      } });
    } else  {
      dispatch({
        type: GET_CATEGORY_CHUNK_SUCCESS,
        payload: {
          data: categoryList.categories,
          firstId: categoryList.firstObjectId,
          lastId: categoryList.lastObjectId
        }
      })

      dispatch({
        type: MARK_FIRST_CATEGORY_PAGE,
        payload: 'true'
      })
    }
  } catch (err) {
    dispatch({
      type: GET_CATEGORY_CHUNK_FAIL,
      payload:
        err.response && err.response.data.error
          ? err.response.data.error
          : err.message,
    });
  }
}

// export const updateCategory = (updatedData, categoryId) => async(dispatch, getState) => {
//     try {
//         const URL = `${API}/CATEGORY/${CATEGORYId}/update`;
//         dispatch({ type: UPDATE_CATEGORY_REQUEST });

//         const { userLogin } = getState();
//         const { token } = userLogin.userInfo;

//         const config = {
//             headers: {
//                 'Authorization': `Bearer ${token}`
//             }
//         }
//         const { data }  = await axios.put(URL, updatedData, config)

//         dispatch({ type: UPDATE_CATEGORY_SUCCESS, payload: data});
//     } catch (err) {
//         dispatch({
//             type: UPDATE_CATEGORY_FAIL,
//             payload:
//               err.response && err.response.data.error
//                 ? err.response.data.error
//                 : err.message,
//           });
//     }
// }

export const deleteCategory = (categoryId) => async (dispatch, getState) => {
  try {
    const { userLogin } = getState();
    const { token, userData } = userLogin.userInfo;

    dispatch({ type: DELETE_CATEGORY_REQUEST });

    const URL = `${API}/category/${categoryId}/${userData.id}`;

    if (!token || !userData.isAdmin) {
      throw new Error("User is not an Admin");
    }

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const { data } = await axios.delete(URL, config);

    dispatch({ type: DELETE_CATEGORY_SUCCESS, payload: data });
  } catch (err) {
    dispatch({
      type: DELETE_CATEGORY_FAIL,
      payload:
        err.response && err.response.data.error
          ? err.response.data.error
          : err.message,
    });
  } finally {
    dispatch({ type: RESET_DELETE_CATEGORY })
  }
};


