import {GET_PLACE, GET_PLACE_SUCCESS, GET_PLACE_FAIL} from '../action.types'
import api from '../../../services/ApiServices'

export const GetPlaceByID = (data) => {
    // const {id} = data
    // console.log(data);
    return async (dispatch, getState) => {
        const {loginUser} = getState()
        const {user} = loginUser
        dispatch({
            type: GET_PLACE,
        })
        var config = {
            method: 'get',
            url: `/place/${data}`,
            headers: { 
              'Authorization': `Bearer ${user.token}`,
              Cookie: `token=${user.token}`,
            }
          };
          
          api(config)
          .then(function (response) {
            // console.log(JSON.stringify(response.data));
            dispatch({
                type: GET_PLACE_SUCCESS,
                payload: response.data.data
            })
          })
          .catch(function (error) {
            console.log(error);
            dispatch({
                type: GET_PLACE_FAIL,
                payload: error
            })
          });
          
    } 
}