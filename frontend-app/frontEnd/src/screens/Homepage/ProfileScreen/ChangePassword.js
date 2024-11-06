import React, {useState} from 'react';
import {View, Text} from 'react-native';
import {Button, Toast, Container} from 'native-base'
import styles from '../../Signin/forgotPAssword/OTP.styles'
import {FormInput} from '../../../Components/FormComponents/FormCompponents';
import GoBack from '../../../Components/Signin/GoBack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '../../../services/ApiServices'
import {useSelector} from 'react-redux'
import { useNavigation } from '@react-navigation/native';
import LoadingModal from '../../../utils/Modal'

const ChangePassword = () => {
  const navigation = useNavigation();
  
  const state = useSelector(state => state.loginUser)
  const [hideCurrentPassword, setHideCurrentPassword] = useState(true);
  const [hideNewPassword, setHideNewPassword] = useState(true);
  const [hideConfirmPassword, setHideConfirmPassword] = useState(true);
  const [passwordError, setPasswordError] = useState('')
  const [showToast, setShowToast] = useState(false)
  const [loading, setLoading] = useState()
  const [data, setData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmNewPassword: '',

    isValidCurrentPassword: true,
    isValidNewPassword: true,
    isValidConfirmNewPassword: true,
  });

  const getPassword = _password => {
    setData({
      ...data,
      currentPassword: _password,
      isValidCurrentPassword: true,
    });
  };

  const getNewPassword = _password => {
    setData({
      ...data,
      newPassword: _password,
      isValidNewPassword: true,
    });
  };

  const getConfirmPassword = _confirmPassword => {
    setData({
      ...data,
      confirmNewPassword: _confirmPassword,
      isValidConfirmNewPassword: true,
    });
  };

  const handleValidCurrentPassword = () => {
    if (data.currentPassword.length === 0) {
      setData({
        ...data,
        isValidCurrentPassword: false,
      });
    } 
  };

  const handleValidNewPassword = () => {
    if (data.newPassword.length >= 6) {
      setData({
        ...data,
        isValidNewPassword: true,
      });
    } else if(data.newPassword.length === 0) {
      setPasswordError('Required')
    } 
    else {
      setData({
        ...data,
        isValidNewPassword: false,
      });
    }
  };

  const handleValidNewConfirmPassword = () => {
    if (data.newPassword === data.confirmNewPassword) {
      setData({
        ...data,
        isValidConfirmNewPassword: true,
      });
    } else {
      setData({
        ...data,
        isValidConfirmNewPassword: false,
      });
    }
  };

  const handleSubmit = async() => {
    setLoading(true)
    var info = JSON.stringify({
      "currentPassword": data.currentPassword,
      "newPassword": data.newPassword
    });
    
    var config = {
      method: 'put',
      url: `/user/${state.user.userData.id}/change-password`,
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${state.user.token}`, 
        'Cookie': `token=${state.user.token}`
      },
      data : info
    };
    
    if(data.newPassword === data.confirmNewPassword && data.newPassword !== '' && data.currentPassword !== ''){
      await api(config)
      .then(function (response) {
        setLoading(false)
        console.log(JSON.stringify(response.data.success));
        navigation.navigate('Signin')
        AsyncStorage.clear()
      })
      .catch(function (error) {
        setLoading(false)
        console.log(error.response.data.error);
        Toast.show({
          text: error.response.data.error,
          buttonText: "Okay",
          type: "danger",
          duration: 5000
        })
      });
    }
    
  }

  return (
    <View style={{backgroundColor: '#ffffff', flex: 1}}>
      <GoBack goBack={() => navigation.goBack()} />
      <View style={{margin: 20}}>
        <FormInput
          icon="key"
          placeholder="Current Password"
          value={data.currentPassword}
          onChangeText={getPassword}
          onBlur={() => handleValidCurrentPassword()}
          rightIcon={hideCurrentPassword ? 'eye-off-outline' : 'eye-outline'}
          showPassword={() => setHideCurrentPassword(!hideCurrentPassword)}
          secureText={hideCurrentPassword ? true : false}
        />
        {data.isValidCurrentPassword ? null : (
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
          placeholder="New Password"
          value={data.newPassword}
          onChangeText={getNewPassword}
          onBlur={() => handleValidNewPassword()}
          rightIcon={hideNewPassword ? 'eye-off-outline' : 'eye-outline'}
          showPassword={() => setHideNewPassword(!hideNewPassword)}
          secureText={hideNewPassword ? true : false}
        />
        {data.isValidNewPassword ? null : (
          <Text style={{color: '#FF0000', fontSize: 14, marginBottom: 10}}>
            Password must be 6 characters long!
          </Text>
        )}
        {passwordError === '' ? null : (
          <Text style={{color: '#FF0000', fontSize: 14, marginBottom: 10}}>
            {passwordError}
          </Text>
        )} 
        <FormInput
          icon="key"
          placeholder="Confirm New Password"
          value={data.confirmNewPassword}
          onChangeText={getConfirmPassword}
          onBlur={() => handleValidNewConfirmPassword()}
          rightIcon={hideConfirmPassword ? 'eye-off-outline' : 'eye-outline'}
          showPassword={() => setHideConfirmPassword(!hideConfirmPassword)}
          secureText={hideConfirmPassword ? true : false}
        />
        {data.isValidConfirmNewPassword ? null : (
          <Text style={{color: '#FF0000', fontSize: 14, marginBottom: 10}}>
            New Password and confirm password doesn't match
          </Text>
        )}
        <Button
          onPress={() => handleSubmit()}
          rounded
          style={styles.nextButton}>
          <Text style={styles.nextButtonText}>Submit</Text>
        </Button>
      </View>
      <View style = {{marginTop: 80}}> 
      {/* {loading ? 
      <LoadingModal visibility = {true} /> : <LoadingModal visibility = {false} />} */}
      </View>
      
    </View>
  );
};

export default ChangePassword;
