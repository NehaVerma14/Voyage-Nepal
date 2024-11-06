import {LOGIN_USER_SUCCESS, LOGIN_USER_FAIL, LOGIN} from '../action.types';
import api from '../../../services/ApiServices';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const loginUser = userData => {
  const {email, password} = userData;

  return async dispatch => {
    dispatch({
      type: LOGIN,
      payload: 1,
    });

    var user = JSON.stringify({
      email: email,
      password: password,
    });

    var config = {
      method: 'post',
      url: `/user/signin`,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      data: user,
    };

    var Data = {};

    await api(config)
      .then(res => {
        const data = res.data;
        Data = res.data;
        console.log(Data);
        AsyncStorage.setItem('token', data.token);
        AsyncStorage.setItem('email', data.userData.email);
        AsyncStorage.setItem('refresh_token', data.refreshToken);
        AsyncStorage.setItem('userid', data.userData.id);
        dispatch({
          type: LOGIN_USER_SUCCESS,
          payload: data,
        });
      })
      .catch(err => {
        //  console.log(err.message);
        const error = err;
        Data = error;
        dispatch({
          type: LOGIN_USER_FAIL,
          payload:
            err.response && err.response.data.error
              ? err.response.data.error
              : err.message,
        });
      });
    return Data;
  };
};
