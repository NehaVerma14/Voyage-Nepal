import React from 'react';
import {StyleSheet, View, Text} from 'react-native';

const InitialsRound = ({initials, iHeight, iWidth, bgColor = '#52c0b4', borderRadius, font}) => {
  return (
    <View
      style={[
        styles.initialsRound,
        {height: iHeight, width: iWidth, backgroundColor: bgColor, borderRadius: borderRadius},
      ]}>
      <Text style = {{color: '#ffffff', fontSize: font}}>{initials}</Text>
    </View>
  );
};

export default InitialsRound;

const styles = StyleSheet.create({
  initialsRound: {
    color: 'white',
    fontWeight: 'bold',
    marginRight: 5,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
