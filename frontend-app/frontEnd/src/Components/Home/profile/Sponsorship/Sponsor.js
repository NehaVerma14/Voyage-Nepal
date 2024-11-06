import React from 'react';
import {View, Image, Text, StyleSheet, Pressable} from 'react-native';
import {Container, Content, Icon, Right, Button, Col} from 'native-base';
import SponsorStyle from './SponsorStyle';
import Colors from '../../../../constants/Color';
import {FormInput} from '../../../FormComponents/FormCompponents';

const Sponsor = ({navigation}) => {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: '#FFFFFF',
      }}>
      <Container
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          margin: 18,
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

        <Text style={SponsorStyle.text}>Please Fill the Sponsorship Form</Text>
        <Text style={SponsorStyle.text2}>Contact Information</Text>
        <FormInput
          icon="ios-people-sharp"
          placeholder="Full Name"
          // style={SponsorStyle.form}
        />
        <FormInput icon="mail-outline" placeholder="Email Address" />
        <FormInput
          icon="ios-phone-portrait-outline"
          placeholder="Phone Number"
        />
        <FormInput
          icon="ios-phone-landscape-sharp"
          placeholder="Best Time to Reach"
        />
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
            navigation.navigate('Company');
          }}>
          <Text style={{color: 'white', fontSize: 18, alignItems: 'center'}}>
            Next
          </Text>
        </Button>
      </Container>
    </View>
  );
};

export default Sponsor;