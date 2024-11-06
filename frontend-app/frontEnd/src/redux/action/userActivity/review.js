import {REVIEW, REVIEW_SUCCESS, REVIEW_FAIL} from '../action.types'
import {Toast} from 'native-base'
import api from '../../../services/ApiServices'

export const userReviews = (data) => {
    const {review, starCount, placeId} = data
    return async (dispatch, getState) => {
        const {getPlaceById, loginUser} = getState()
        console.log(starCount);
        const {place} = getPlaceById
        console.log(place);
        const {user} = loginUser
        dispatch({
            type: REVIEW
        })
        var data = JSON.stringify({
            reviewText: review ? review : '',
            rating: starCount ? starCount : 0,
          });
          var config = {
            method: 'post',
            url: `/review/create/${placeId}/${user.userData.id}`,
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${user.token}`,
              Cookie: `token=${user.token}`,
            },
            data: data,
          };
          api(config)
            .then(function (response) {
              console.log(JSON.stringify(response.data));
              dispatch({
                  type: REVIEW_SUCCESS,
                  payload: JSON.stringify(response.data.message)
              })
              Toast.show({
                text: response.data.message,
                type: 'success',
                buttonText: 'Okay'
              })
            })
            .catch(function (err) {
              console.log(err);
              dispatch({
                type: REVIEW_FAIL,
                payload: err.response && err.response.data.error ? err.response.data.error : err.message
            })
            Toast.show({
              text: err.response && err.response.data.error ? err.response.data.error : err.message,
              type: 'danger',
              buttonText: 'Okay'
            })
            });
        }    
}