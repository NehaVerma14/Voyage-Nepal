import React, {useState, useEffect} from 'react';
import {StatusBar} from 'react-native';
import {Root} from 'native-base';
import AppNavigator from './navigation/AppNavigator';
import {Provider} from 'react-redux';
import store from './redux/store';
import NetInfo from '@react-native-community/netinfo';
import Colors from './constants/Color';
import api from './services/ApiServices';
import AsyncStorage from '@react-native-async-storage/async-storage';

const App = () => {
  const [connectStatus, setConnectStatus] = useState(true);
  useEffect(() => {
    NetInfo.addEventListener(state => {
      setConnectStatus(state.isInternetReachable);
    });
  }, []);

  // const token = async() => {
  //   return await AsyncStorage.getItem('token')
  // }

  // const refreshToken = async() => {
  //   return await AsyncStorage.getItem('refresh_token')
  // }

  // let token = AsyncStorage.getItem('token')
  // let refreshToken = AsyncStorage.getItem('refresh_token')

  // api.interceptors.request.use(config => {
  //   config.headers['Authorization'] = `Bearer ${token && token}`;
  //   return config;
  // });

  // api.interceptors.response.use(
  //   response => {
  //     console.log('response', response);
  //     return response;
  //   },
  //   async error => {
  //     const config = error.config;
  //     if (error.response && error.response.status === 401) {
  //       let res = await refreshToken;
  //       if (res.data.refresh_token) {
  //         token = res.data.token;
  //       }
  //       return api(config);
  //     }
  //     return Promise.reject(error);
  //   },
  // );

  // return connectStatus === true ? (
  //   <Provider store={store}>
  //     <Root>
  //       <StatusBar backgroundColor={Colors.themeColor} />
  //       <AppNavigator />
  //     </Root>
  //   </Provider>
  // ) : (
  //   <NoInternetScreen />
  // );
  return (
    <Provider store={store}>
      <Root>
        <StatusBar backgroundColor={Colors.themeColor} />
        <AppNavigator />
      </Root>
    </Provider>
  );
};

export default App;
