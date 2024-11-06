import {Icon, Button, Container} from 'native-base';
import Colors from '../../../../constants/Color';
import {FormInput} from '../../../FormComponents/FormCompponents';

import {View, Text, Image, Pressable} from 'react-native';
import React from 'react';
import SponsorStyle from './SponsorStyle';
const banner = ({navigation}) => {
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
        {/* <View> */}
          <Text>Splash Text</Text>
          <FormInput icon="mail-outline" placeholder="Enter Splash Text Here" />
        {/* </View> */}

        <Text>Event Banner URL</Text>
        <FormInput
          icon="ios-phone-portrait-outline"
          placeholder="Event banner Url"
        />
        <Text>Upload Splash Image</Text>
        <FormInput
          icon="ios-phone-landscape-sharp"
          placeholder="Choose an Image"
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

export default banner;