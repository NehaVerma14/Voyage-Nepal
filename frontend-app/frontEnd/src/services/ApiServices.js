import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
let refreshToken = AsyncStorage.getItem('refresh_token');
let userid = AsyncStorage.getItem('userid');

const api = axios.create({
  // baseURL: 'https://voyage-nepal.uc.r.appspot.com/api'
  // baseURL: 'http://10.0.2.2:8080/api'
  baseURL: 'http://192.168.10.106:8080/api',
});

let a_token = JSON.stringify({
  refreshToken: refreshToken
})

var apiconfig = {
  method: 'post',
  url: `/auth/${userid}/token`,
  data: a_token,
};

const refreshAccessToken = async() => {
  try {
    await api(apiconfig)
    .then(res => {return res.data.accessToken})
  } catch (error) {
    console.log('error', error);
  }
}

api.interceptors.request.use(
  async config => {
    let token = await AsyncStorage.getItem('token');
    if(token){
      config.headers['Authorization'] = 'Bearer ' + token
    }
    return config;
  },
  error => {
    Promise.reject(error);
  },
);

api.interceptors.response.use(
  response => {
    // console.log('response', response.data);
    return response;
  },
  async error => {
    const originalRequest = error.config;
    if (
      error.response &&
      error.response.status === 401 &&
      error.response.data.message === 'Unauthorized Access!' &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;
      const access_token = await refreshAccessToken();
      axios.defaults.headers.common['Authorization'] = 'Bearer ' + access_token;
      return api(originalRequest);
    }
    return Promise.reject(error);
  },
);

export default api;
