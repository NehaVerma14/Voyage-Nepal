import React from 'react';
import {View, Text, SafeAreaView, Image} from 'react-native';
import {Container, Content, Button} from 'native-base'
import Colors from '../constants/Color'

const NoInternetScreen = props => {
  return (
    <Container style = {{alignItems: 'center'}}>
      <Content padder>
        <Image source = {require('../assets/pictures/noInternet.png')} style = {{width: 150, height: 150, marginTop: 200}} />
      </Content>
      
    </Container>
  );
};

export default NoInternetScreen;
