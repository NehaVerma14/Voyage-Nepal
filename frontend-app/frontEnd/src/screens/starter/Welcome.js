import {View, Text, Image} from 'react-native';
import React from 'react';

const Welcome = ({route}) => {
    const {user} = route.params
  return (
    <View>
      <Text>You have successfully signed in</Text>
      <Text>Full Name: {user.user.name}</Text>
      <Text>EMail: {user.user.email}</Text>
      <Image source={{uri: `${user.user.photo}`}} style = {{width: 150, height: 150}}></Image>
    </View>
  );
};

export default Welcome;
