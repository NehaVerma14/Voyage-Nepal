import React from 'react';
import {Image, ImageBackground, useWindowDimensions} from 'react-native';
import {View, Text, Button, Icon} from 'native-base';
import Colors from '../../../constants/Color'

import profileStyles from './profile.styles';

export const UserName = props => {
  return <Text style={profileStyles.userName}>{props.name}</Text>;
};

export const List = props => {
  return (
    <View style={{margin: 15, flexDirection: 'row', alignItems: 'center'}}>
      <Icon type={props.iconType} name={props.iconName} />
      <Text uppercase={false} style={profileStyles.listStyle}>
        {props.listName}
      </Text>
    </View>
  );
};

export const Divider = () => {
  return <View style={profileStyles.divider} />;
};

export const SignOut = props => {
  return (
    <View style={profileStyles.signoutContainer}>
      <Button transparent onPress={props.signOut}>
        <Icon type= 'AntDesign' name="logout" style={{color: Colors.primary}} />
        <Text style={profileStyles.signoutText} uppercase = {false}>Log out</Text>
      </Button>
    </View>
  );
};
