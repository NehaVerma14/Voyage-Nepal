import React from 'react';
import {Image, ScrollView} from 'react-native';
import {
  Container,
  Content,
  Text,
  Button,
  View,
  Icon,
  Input,
  Item,
} from 'native-base';

import Colors from '../../constants/Color';
import SigninStyles from './Signin.styles'

export const HorizontalLine = () => {
  return (
    <View
      style={SigninStyles.horizontalLine}></View>
  );
};

export const ForgotPassword = (props) => {
  return (
    <Text
      style={SigninStyles.forgotPasswordText} onPress = {props.forgotPassword} >
      Forgot Password?
    </Text>
  );
};

export const LineWithText = () => {
  return (
    <View style={{flexDirection: 'row', marginBottom: 20}}>
      <View
        style={{
          backgroundColor: Colors.gray,
          height: 1,
          flex: 1,
          alignSelf: 'center',
        }}
      />
      <Text
        style={{
          alignSelf: 'center',
          paddingHorizontal: 5,
          fontSize: 18,
          color: Colors.dimGray,
        }}>
        Or
      </Text>
      <View
        style={{
          backgroundColor: Colors.gray,
          height: 1,
          flex: 1,
          alignSelf: 'center',
        }}
      />
    </View>
  );
};

export const SocialMediaLogin = (props) => {
  return (
    <View style={{flexDirection: 'column', marginBottom: 10}}>
      <Button
        transparent
        rounded
        style={[SigninStyles.SocialMediaLoginBtn, {backgroundColor: props.bgcolor}]} onPress = {props.login}>
        <Icon type="FontAwesome" name={props.iconName} style={{fontSize: 15, color: '#ffffff'}} />
        {/* <Text uppercase={false} style={{fontSize: 18}}>
          {props.text}
        </Text> */}
      </Button>
    </View>
  );
};
