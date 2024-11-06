import {GET_PLACE_BY_CATEGORY, GET_PLACE_BY_CATEGORY_SUCCESS, GET_PLACE_BY_CATEGORY_FAIL} from '../action.types'
import api from '../../../services/ApiServices'

export const GetPlaceByCategory = (data) => {
    return async (dispatch, getState) => {
        const {loginUser} = getState()
        const {user} = loginUser
        dispatch({
            type: GET_PLACE_BY_CATEGORY,
        })
        var config = {
            method: 'get',
            url: `/places/${data}/category`,
            headers: { 
              'Authorization': `Bearer ${user.token}`,
            }
          };
          
          api(config)
          .then(function (response) {
            // console.log(JSON.stringify(response.data));
            dispatch({
                type: GET_PLACE_BY_CATEGORY_SUCCESS,
                payload: response.data
            })
          })
          .catch(function (error) {
            console.log(error);
            dispatch({
                type: GET_PLACE_BY_CATEGORY_FAIL,
                payload: error
            })
          });
          
    } 
}