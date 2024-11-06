import React, {useState, useEffect} from 'react';
import {View, Text, Alert, ActivityIndicator} from 'react-native';
import {FormInput, ActionButton} from '../../../Components/FormComponents/FormCompponents';
import {Toast, Content} from 'native-base'
import styles from './OTP.styles'
import GoBack from '../../../Components/Signin/GoBack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import api from '../../../services/ApiServices'
import { useSelector } from 'react-redux';

const ResetPassword = ({navigation}) => {
  const state = useSelector(state => state.resetOtp.resetID.userResetId)
  const [loading, setLoading] = useState(false)
  const [hidePassword, setHidePassword] = useState(true);
  const [hideConfirmPassword, setHideConfirmPassword] = useState(true);
  const [data, setData] = useState({
    password: '',
    confirmPassword: '',

    isValidPassword: true,
    isValidConfirmPassword: true,
  });
  const [error, setError] = useState('')


  const getPassword = _password => {
    setData({...data, password: _password, isValidPassword: true});
  };
  const getConfirmPassword = _confirmPassword => {
    setData({
      ...data,
      confirmPassword: _confirmPassword,
      isValidConfirmPassword: true,
    });
  };

  const handleValidPassword = () => {
    if (data.password.length >= 6) {
      setData({
        ...data,
        isValidPassword: true,
      });
    } else {
      setData({
        ...data,
        isValidPassword: false,
      });
    }
  };
  const handleValidConfirmPassword = () => {
    if (data.password === data.confirmPassword) {
      setData({
        ...data,
        isValidConfirmPassword: true,
      });
    } else {
      setData({
        ...data,
        isValidConfirmPassword: false,
      });
    }
  };

  var userData = JSON.stringify({
    "password": data.password
  });
  
  var config = {
    method: 'post',
    url: `/user/${state}/reset-password`,
    headers: { 
      'Content-Type': 'application/json', 
      'Accept': 'application/json'
    },
    data : userData
  };

  const handleSubmit = () => {
    setLoading(true)
    if(data.password !== '' && data.confirmPassword !== ''){
      api(config)
      .then(res => {
        setLoading(false)
        Alert.alert("Voyage Nepal", 'Password Changed Successfully. Please login!', [
          { text: "OK", onPress: () => null }
        ])
        navigation.navigate('Signin')
      })
      .catch(err => {
        setLoading(false)
        console.log(err.response);
        setError(err.data)
        Toast.show({
          text: err.response.data.error,
          buttonText: "Okay",
          type: "success",
          duration: 5000
        })
      })
    }
  }

  return (
    <View style = {{backgroundColor: '#ffffff', flex: 1,}}>
        <GoBack goBack = {() => navigation.goBack()}  />
      <Content style = {{margin: 20}} keyboardShouldPersistTaps = {'handled'}>
        <FormInput
          icon="key"
          placeholder="Password"
          value={data.password}
          onChangeText={getPassword}
          onBlur={() => handleValidPassword()}
          rightIcon={hidePassword ? 'eye-off-outline' : 'eye-outline'}
          showPassword={() => setHidePassword(!hidePassword)}
          secureText={hidePassword ? true : false}
        />
        {data.isValidPassword ? null : (
          <Text
            style={{
              color: '#FF0000',
              fontSize: 14,
              marginBottom: 10,
              alignSelf: 'flex-end',
            }}>
            Required!
          </Text>
        )}
        <FormInput
          icon="key"
          placeholder="Confirm Password"
          value={data.confirmPassword}
          onChangeText={getConfirmPassword}
          onBlur={() => handleValidConfirmPassword()}
          rightIcon={hideConfirmPassword ? 'eye-off-outline' : 'eye-outline'}
          showPassword={() => setHideConfirmPassword(!hideConfirmPassword)}
          secureText={hideConfirmPassword ? true : false}
        />
        {data.isValidConfirmPassword ? null : (
          <Text style={{color: '#FF0000', fontSize: 14, marginBottom: 10}}>
            Password and confirm password doesn't match
          </Text>
        )}
        <ActionButton mt = {30} buttonName={loading ? <ActivityIndicator color = '#ffffff'/> :"Submit"} home={() => handleSubmit()} />
      </Content>
      {/* {loading ? (
          <LoadingModal visibility={true} />
        ) : (
          <LoadingModal visibility={false} />
        )} */}
    </View>
  );
};

export default ResetPassword;
