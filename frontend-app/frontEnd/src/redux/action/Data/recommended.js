import {RECOMMENDED_PLACE} from '../action.types';
// import api from '../../../services/ApiServices';

export const Recommended = (data) => {
  return dispatch => {
    dispatch({
        type: RECOMMENDED_PLACE,
        payload: data,
      });
  };
};
