import React, {useState} from 'react';
import {
  View,
  Text,
  Modal,
  Image,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import Colors from '../constants/Color';

const LoadingModal = props => {
  return (
    <Modal visible={props.visibility} transparent={true}>
      <View
        style={{
          backgroundColor: '#ffffff00',
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#0000000a',
            width: 200,
            height: 200,
          }}>
          <ActivityIndicator color={Colors.themeColor} size="large" />
        </View>
      </View>
    </Modal>
  );
};

export default LoadingModal;
