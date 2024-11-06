import {PICTURE_UPLOAD, PICTURE_UPLOAD_SUCCESS, PICTURE_UPLOAD_FAIL, PICUTRE_UPDATE_SUCCESS, PICTURE_UPDATE_FAIL} from '../../action/action.types'

export default (state = {}, action) => {
    switch (action.type) {
        case PICTURE_UPLOAD:
            return{loading: true}
        case PICTURE_UPLOAD_SUCCESS: 
            return{loading: false, success: true}  
        case PICTURE_UPLOAD_FAIL:
            return{loading: false, error: true}
        case PICUTRE_UPDATE_SUCCESS: 
            return{loading: false, success: true}
        case PICTURE_UPDATE_FAIL:
            return{loading: false, error: true}
        default:
            return state
    }
}