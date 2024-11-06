import React, {useState, useEffect} from 'react';
import {View, Text, Image, Alert, ActivityIndicator} from 'react-native';
import {Container, Content} from 'native-base';
import {FormInput, ActionButton} from '../../../Components/FormComponents/FormCompponents';
import styles from './OTP.styles';
import axios from 'axios';
import Colors from '../../../constants/Color';
import GoBack from '../../../Components/Signin/GoBack';
import {useSelector, useDispatch} from 'react-redux';
import {getUserEmail} from '../../../redux/action/Login/email';
import LoadingModal from '../../../utils/Modal'

const Email = ({navigation}) => {
  const state = useSelector(state => state.userEmail);
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [valid, setValid] = useState(true);
  const [res, setRes] = useState('');
  const getEmail = _email => {
    setEmail(_email);
  };
  const handleValidEmail = () => {
    if (email !== '') {
      setValid(true);
    } else {
      setValid(false);
    }
  };

  useEffect(() => {
    if (!state.loading && state.success) {
      Alert.alert("Voyage Nepal",state.email.message,[
        { text: "OK", onPress: () => null }
      ])
      console.log(state);
      navigation.navigate('MyModal');
    } else if(!state.loading && !state.success){
      setRes(state.error);
    }
  }, [state]);

  const handleSubmit = () => {
    if (email !== '') {
      dispatch(getUserEmail(email));
    } else {
      console.log('Required Email');
      setValid(false);
    }
  };
  return (
    <View style={{backgroundColor: 'white', flex: 1}}>
      <GoBack goBack={() => navigation.goBack()} />
      <Content style={{padding: 30, paddingTop: 40}} keyboardShouldPersistTaps = {'handled'}>
        <Image
          source={require('../../../assets/pictures/forgetpassword.png')}
          style={{alignSelf: 'center', marginBottom: 30}}
        />
        <FormInput
          icon="mail-outline"
          placeholder="Email Address"
          value={email}
          onChangeText={getEmail}
          onBlur={() => handleValidEmail()}
        />
        {valid ? null : (
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
        {res === '' ? null : (
          <Text
            style={{
              color: Colors.error,
              fontSize: 14,
              marginBottom: 10,
              alignSelf: 'center',
            }}>
            {res}
          </Text>
        )}
        <ActionButton mt = {30} buttonName={state.loading ? <ActivityIndicator color = '#ffffff' /> : "Submit"} home={() => handleSubmit()} />
      </Content>
      {/* {state.loading ? (
          <LoadingModal visibility={true} />
        ) : (
          <LoadingModal visibility={false} />
        )} */}
    </View>
  );
};

export default Email;
