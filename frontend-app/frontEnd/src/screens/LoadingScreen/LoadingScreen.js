import React, {useEffect} from 'react';
import {View, Text, ActivityIndicator} from 'react-native';
import {userDetails} from '../../redux/action/Login/userDetails';
import api from '../../services/ApiServices'
import {useDispatch, useSelector} from 'react-redux';
import Colors from '../../constants/Color'

const LoadingScreen = ({navigation, route}) => {
    const {id, token} = route.params;
    const state = useSelector(state => state.loginUser);
    const dispatch = useDispatch()
  useEffect(async() => {
    await fetchDetails()
  }, []);
  const fetchDetails = () => {
    var config = {
        method: 'get',
        url: `/user/user-details`,
        headers: {
          Authorization: `Bearer ${token}`,
          Cookie: `token=${token}`,
        },
      };
       api(config)
      .then(res => {
        // console.log(res.data);
        dispatch(userDetails(res.data));
        navigation.navigate('ChoosePlace', {id: id, token: token})
      })
      .catch(err => {
        console.log(err);
      });
  } 
    
    
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'transparent',
      }}>
      <ActivityIndicator color={Colors.themeColor} size="large" />
    </View>
  );
};

export default LoadingScreen;
