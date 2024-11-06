import React from 'react';
import {Image} from 'react-native';
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

export const Title = props => {
  return (
    <Text
      style={{
        fontSize: 35,
        fontWeight: '200',
        fontFamily: 'GentiumBookBasic-Bold',
        marginBottom: 10,
      }}>
      Voyage Nepal
    </Text>
  );
};

export const ActionText = props => {
  return (
    <Text
      style={{
        fontSize: 25,
        fontWeight: '300',
        color: '#800000',
        fontFamily: 'GentiumBookBasic-Bold',
      }}>
      {props.text}
    </Text>
  );
};



export const FormInput = props => {

  return (
    <Item rounded bordered style={{margin: 10, borderColor: Colors.themeColor}}>
      <Icon name={props.icon} style = {{color: Colors.themeColor}} onPress = {props.showCalendar}></Icon>
      <Input placeholder={props.placeholder} onChangeText = {(text) => props.onChangeText(text)} value = {props.value} onFocus = {props.onFocus} onBlur = {props.onBlur} secureTextEntry = {props.secureText} />
      <Icon name={props.rightIcon} style = {{color: Colors.themeColor}} onPress = {props.showPassword}></Icon>
    </Item>
  );
};

export const ActionButton = props => {
  return (
    <Button onPress={props.home} rounded block style = {{marginBottom: 15, backgroundColor: Colors.themeColor, marginTop: props.mt}}>
      <Text
      uppercase = {false}
        style={{fontSize: 20}}>
        {props.buttonName}
      </Text>
    </Button>
  );
};

export const Account = props => {
  return (
    <View style={{flexDirection: 'row', alignSelf: 'center', marginBottom: 15}}>
      <Text style={{fontSize: 18}}>{props.text}</Text>
      <Text style={{fontSize: 18, color: '#CF3838'}} onPress={props.signup}>
        {props.action}
      </Text>
    </View>
  );
};
