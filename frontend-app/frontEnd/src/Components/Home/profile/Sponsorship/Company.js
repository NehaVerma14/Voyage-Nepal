import {Icon, Button, Container} from 'native-base';
import Colors from '../../../../constants/Color';
import {FormInput} from '../../../FormComponents/FormCompponents';

import {View, Text, Image} from 'react-native';
import React from 'react';
import SponsorStyle from './SponsorStyle';

const Company = ({navigation}) => {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: '#FFFFFF',
        marginBottom: 30
      }}>
      <Container
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          marginLeft: 15,
        }}>
        <Image
          source={require('../../../../assets/pictures/newlogo.png')}
          style={SponsorStyle.img}></Image>
        <Button
          transparent
          onPress={() => navigation.goBack()}
          large
          style={{position: 'absolute', top: 10}}>
          <Icon
            name="arrow-back-circle-sharp"
            style={{color: Colors.themeColor, fontSize: 38}}
          />
        </Button>
        <Text style={SponsorStyle.text3}>Please Fill the Sponsorship Form</Text>
        <Text style={SponsorStyle.text2}>
          Company/ Organization Information
        </Text>
        <FormInput icon="mail-outline" placeholder="Legal Name" />
        <FormInput icon="mail-outline" placeholder="Website Address" />
        <FormInput icon="mail-outline" placeholder="Company address" />
        <FormInput icon="mail-outline" placeholder="City " />
        <FormInput icon="mail-outline" placeholder="State " />
        <Button
          title="Next"
          width={180}
          style={{
            marginTop: 10,
            marginLeft: 85,
            backgroundColor: Colors.themeColor,
            borderRadius: 30,
            alignItems: 'center',
            justifyContent: 'center',
          }}
          onPress={() => {
            navigation.navigate('Tiers');
          }}>
          <Text style={{color: 'white', fontSize: 18, alignItems: 'center'}}>
            Next
          </Text>
        </Button>
      </Container>
    </View>
  );
};

export default Company;