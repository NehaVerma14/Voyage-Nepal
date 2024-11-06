import {
  PICTURE_UPLOAD,
  PICTURE_UPLOAD_SUCCESS,
  PICTURE_UPLOAD_FAIL,
  PICUTRE_UPDATE_SUCCESS,
  PICTURE_UPDATE_FAIL
} from '../action.types';
import api from '../../../services/ApiServices';
import {Toast} from 'native-base'

export const pictureUpload = (data) => {
  return async (dispatch, getState) => {
    dispatch({
      type: PICTURE_UPLOAD,
      payload: 1,
    });

    const {loginUser, userDetails} = getState()
    const {user} = loginUser
    const {userDetail} = userDetails

    var config = {
      method: 'post',
      url: `/upload/photo/${user.userData.id}`,
      headers: {
        Authorization: `Bearer ${user.token}`,
        Accept: 'application/json',
        Cookie: `token=${user.token}`,
      },
      data: data,
    };

    var config1 = {
      method: 'put',
      url: `/update/photo/${user.userData.id}`,
      headers: {
        Authorization: `Bearer ${user.token}`,
        Accept: 'application/json',
        Cookie: `token=${user.token}`,
      },
      data: data,
    };

    if(!userDetail.profileImgURL){
        api(config)
      .then(function (response) {
        dispatch({
            type: PICTURE_UPLOAD_SUCCESS,
            payload: 1
        })
        Toast.show({
          text: response.data,
          buttonText: "Okay",
          type: "success",
          duration: 5000
        })
      })
      .catch(function (error) {
        dispatch({
            type: PICTURE_UPLOAD_FAIL,
            payload: 1
        })
        Toast.show({
          text: 'Picture Upload Fail. File was too large',
          buttonText: "Okay",
          type: "success",
          duration: 5000
        })
      });
      } else if(userDetail.profileImgURL) {
        api(config1)
      .then(function (response) {
        dispatch({
            type: PICUTRE_UPDATE_SUCCESS,
            payload: 1
        })
        Toast.show({
          text: response.data,
          buttonText: "Okay",
          type: "success",
          duration: 5000
        })
      })
      .catch(function (error) {
          console.log(error);
        dispatch({
            type: PICTURE_UPDATE_FAIL,
            payload: 1
        })
        Toast.show({
          text: 'Picture Update Fail. File was too large',
          buttonText: "Okay",
          type: "danger",
          duration: 5000
        })
      });
      }  
  };
};
