import {View, Text, SafeAreaView, Pressable, FlatList} from 'react-native';
import Colors from '../../../../constants/Color';

import {Item, Input, Icon} from 'native-base';
import React from 'react';
import styles from '../Sponsorship/SponsorStyle';

const SponsorPage = ({navigation}) => {
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
      <Item
        rounded
        style={{
          marginLeft: 20,
          marginRight: 25,
          marginBottom: 20,
          marginTop: 30,
          paddingLeft: 10,
          paddingRight: 10,
        }}>
        <Input placeholder="Search your destination" />
        <Icon name="search" style={{color: Colors.gray}} size={28} />
      </Item>
      <View>
        <Text
          style={{
            color: Colors.themeColor,
            margin: 20,
            fontSize: 20,
            fontWeight: 'bold',
          }}>
          Your Advertisements
        </Text>
      </View>

      <View
        style={{
          width: '100%',
          height: '85%',
          flexDirection: 'row',
          flexWrap: 'wrap',
          marginLeft: 25,
          marginRight: 25,
        }}>
        <View style={{width: '45%', height: '25%', padding: 8}}>
          <View
            style={{
              flex: 1,
              backgroundColor: Colors.themeColor,
              alignItems: 'center',
            }}>
            <Icon
              type="Ionicons"
              name="calendar-sharp"
              style={{color: Colors.white, fontSize: 70, marginTop: 25}}
              onPress={() => navigation.navigate('banner')}
            />
            <Text style={{color: Colors.white, fontWeight: 'bold'}}>
              Event Scheduler
            </Text>
          </View>
        </View>
        <View style={{width: '45%', height: '25%', padding: 8}}>
          <View
            style={{
              flex: 1,
              backgroundColor: Colors.themeColor,
              alignItems: 'center',
            }}>
            <Icon
              type="Ionicons"
              name="checkmark-circle-sharp"
              style={{color: Colors.white, fontSize: 70, marginTop: 25}}
            />
            <Text style={{color: Colors.white, fontWeight: 'bold'}}>
              Ads Posted
            </Text>
          </View>
        </View>
        <View style={{width: '45%', height: '25%', padding: 8}}>
          <View
            style={{
              flex: 1,
              backgroundColor: Colors.themeColor,
              alignItems: 'center',
            }}>
            <Icon
              type="Ionicons"
              name="people-sharp"
              style={{color: Colors.white, fontSize: 70, marginTop: 25}}
            />
            <Text style={{color: Colors.white, fontWeight: 'bold'}}>
              Feedback
            </Text>
          </View>
        </View>
        <View style={{width: '45%', height: '25%', padding: 8}}>
          <View
            style={{
              flex: 1,
              backgroundColor: Colors.themeColor,
              alignItems: 'center',
            }}>
            <Icon
              type="Ionicons"
              name="checkmark-circle-sharp"
              style={{color: Colors.white, fontSize: 70, marginTop: 25}}
            />
            <Text style={{color: Colors.white, fontWeight: 'bold'}}>
              Others
            </Text>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default SponsorPage;