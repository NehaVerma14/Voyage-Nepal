import axios from 'axios'

const FlaskApi = axios.create({
    baseURL: 'https://flask-recommender-api.uc.r.appspot.com'
})

export default FlaskApi;
