import {FETCH_CATEGORY} from '../action.types';
import api from '../../../services/ApiServices';
import store from '../../store'

export const Category = (data) => {
  return async (dispatch, getState) => {
    // const state = getState();
    // console.log(state.loginUser);
    dispatch({
        type: FETCH_CATEGORY,
        payload: data,
      });
  };
};
