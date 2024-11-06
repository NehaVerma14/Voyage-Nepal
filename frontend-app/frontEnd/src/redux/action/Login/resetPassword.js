import {RESET_PASSWORD, RESET_PASSWORD_FAIL, RESET_PASSWORD_SUCCESS} from '../action.types';
import axios from 'axios';
import api from '../../../services/ApiServices'

const BASE_URL = 'http://10.0.2.2:8080/api';

export const resetPassword = otp => {
  const code = otp;

  return async dispatch => {
    dispatch({
      type: RESET_PASSWORD
    })
    var data = JSON.stringify({
      otp: code,
    });

    var config = {
      method: 'post',
      url: `/user/verify-reset-otp`,
      headers: {
        'Content-Type': 'application/json',
      },
      data: data,
    };

    var Data = {};

    api(config)
      .then(response => {
        console.log(JSON.stringify(response.data));
        Data = response.data;
        dispatch({
          type: RESET_PASSWORD_SUCCESS,
          payload: response.data,
        });
      })
      .catch(err => {
        console.log(err);
        Data = err;
        dispatch({
          type: RESET_PASSWORD_FAIL,
          payload: err.response && err.response.data.error ? err.response.data.error : err.message,
        });
      });
  };
};
