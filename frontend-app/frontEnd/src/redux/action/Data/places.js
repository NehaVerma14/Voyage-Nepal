import {FETCH_PLACE} from '../action.types';
// import api from '../../../services/ApiServices';

export const Places = (data) => {
  return dispatch => {
    dispatch({
        type: FETCH_PLACE,
        payload: data,
      });
  };
};
