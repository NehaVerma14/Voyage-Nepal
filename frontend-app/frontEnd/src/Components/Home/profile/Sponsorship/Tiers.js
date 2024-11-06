import {Icon, Button, Container} from 'native-base';
import Colors from '../../../../constants/Color';
import {FormInput} from '../../../FormComponents/FormCompponents';

import {View, Text, Image, Pressable} from 'react-native';
import React from 'react';
import SponsorStyle from './SponsorStyle';
const Tiers = ({navigation}) => {
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
        <Text
          style={{
            lineHeight: 20,
            fontSize: 20,
            fontWeight: 'bold',
          }}>
          Please Fill the Sponsorship Form
        </Text>
        <Text style={SponsorStyle.text2}>Sponsors Tiers</Text>
        <Pressable
          style={SponsorStyle.listContainer}
          onPress={() => {
            navigation.navigate('Sponsor');
          }}>
          <Text style={{fontSize: 12}}>Tier 1 100/month</Text>
        </Pressable>
        <Pressable
          style={SponsorStyle.listContainer}
          onPress={() => {
            navigation.navigate('Sponsor');
          }}>
          <Text style={{fontSize: 12}}>Tier 2 500/6 months</Text>
        </Pressable>
        <Pressable
          style={SponsorStyle.listContainer}
          onPress={() => {
            navigation.navigate('Sponsor');
          }}>
          <Text style={{fontSize: 12}}>Tier 3 1000/year</Text>
        </Pressable>
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
            navigation.navigate('success');
          }}>
          <Text style={{color: 'white', fontSize: 18}}>Choose</Text>
        </Button>
      </Container>
    </View>
  );
};

export default Tiers;