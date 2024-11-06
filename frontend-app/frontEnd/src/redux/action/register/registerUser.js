import {REGISTER_USER_SUCCESS, REGISTER_USER_FAIL, REGISTER} from '../action.types';
import api from '../../../services/ApiServices'

export const registerUser = userData => {
  const {name, email, password, gender, isAdmin, city, dob} = userData;

  return async (dispatch) => {

    dispatch({
      type: REGISTER,
      payload: 1
    })

    //TODO: fetch Data
    var newUser = JSON.stringify({
      name: name,
      email: email,
      password: password,
      gender: gender,
      isAdmin: false,
      city: city,
      DOB: dob,
    });

    var config = {
      method: 'post',
      url: `/user/signup`,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      data: newUser,
    };

    var Data={}

    try {
      const response = await api(config)
      console.log(response.data);
      Data = {response}
      dispatch({
        type: REGISTER_USER_SUCCESS,
        payload: response.data
      });
      
    } catch (error) {
      Data = {error}
      dispatch({
        type: REGISTER_USER_FAIL,
        payload: error.response && error.response.data.error ? error.response.data.error : error.message
      })
    }
    // console.log(Data);
    return Data;
  };
};
