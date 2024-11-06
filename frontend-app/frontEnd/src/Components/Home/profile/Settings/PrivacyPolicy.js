import React from 'react';
import {View} from 'react-native';
import {Button, Icon, Content, Container, Text} from 'native-base';

const PrivacyPolicy = ({navigation}) => {
  return (
    <Container>
      <View style = {{flexDirection: 'row', alignItems: 'center'}}>
      <Button transparent onPress={() => navigation.goBack()} large>
        <Icon name="arrow-back" style={{color: '#52c0b4', fontSize: 25}} />
      </Button>
      <Text style={{fontSize: 20, fontWeight: '800'}}>Privacy Policy</Text>

      </View>
      <Content padder>
        <Text note style = {{marginBottom: 15}}>Last updated: June 20, 2021</Text>
        <Text style = {{marginBottom: 15}}>This Privacy Policy describes Our policies and procedures on the collection, use and disclosure of Your information when You use the Service and tells You about Your privacy rights and how the law protects You.</Text>
        <Text style = {{marginBottom: 15}}>
        We use Your Personal data to provide and improve the Service. By using the Service, You agree to the collection and use of information in accordance with this Privacy Policy. This Privacy Policy has been created with the help of the Privacy Policy Generator.
        </Text>
        
      </Content>
    </Container>
  );
};

export default PrivacyPolicy;
