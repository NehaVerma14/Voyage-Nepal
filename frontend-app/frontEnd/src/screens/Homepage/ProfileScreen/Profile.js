import React, {useState, useEffect} from 'react';
import {Image, useWindowDimensions, StyleSheet, Pressable} from 'react-native';
import {
  View,
  Text,
  Item,
  Icon,
  H1,
  Content,
  Right,
  Toast,
  Container,
} from 'native-base';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {SignOut} from '../../../Components/Home/profile/Profile';
import LinearGradient from 'react-native-linear-gradient';
import {useSelector, useDispatch} from 'react-redux';
import api from '../../../services/ApiServices';
import {logout} from '../../../redux/action/Login/logout';

import Colors from '../../../constants/Color';
import InitialsRound from '../../../utils/InitialRound/InitailRound';

const Profile = ({navigation}) => {
  const state = useSelector(state => state.loginUser);
  const detail = useSelector(state => state.userDetails);

  const dispatch = useDispatch();

  const imageWidth = useWindowDimensions().width;
  const imageHeight = Math.round(imageWidth * (1105 / 2004));
  const [name, setName] = useState();

  const token = state.user.token;

  const handleLogOut = async () => {
    // dispatch(logout());
    await AsyncStorage.removeItem('token');
    navigation.navigate('Signin');
    // const storage = AsyncStorage.getItem('token')
    // console.log(storage);
  };

  const source = {
    uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSmBG1Bl_akIk0oU-pFMLCCH8m-q2TGIU9fKA&usqp=CAU',
  };

  var user = state.user.userData.name;

  return (
    <Container>
      <View
        style={{
          flex: 1,
          backgroundColor: '#ffffff',
          padding: 20,
          marginBottom: 40,
        }}>
        <View style={{display: 'flex', flexDirection: 'row', height: 200, justifyContent: 'space-around', alignItems: 'center', marginLeft: 15, marginRight: 15}}>
          <View>
            {detail.userDetail.profileImgURL ? (
              <Image
                source={{uri: detail.userDetail.profileImgURL}}
                style={{
                  width: 150,
                  height: 150,
                  marginBottom: 10,
                  borderRadius: 80,
                }}
              />
            ) : (
              <InitialsRound
                initials={user.charAt(0).toUpperCase()}
                font={60}
                iHeight={120}
                iWidth={120}
                borderRadius={80}
              />
            )}
          </View>
          <View style = {{display: 'flex', flexDirection: 'column'}}>
            <H1 style={{fontWeight: 'bold', color: '#000', marginBottom: 10}}>
              {state.user.userData.name}
            </H1>
            <Text note style={{color: '#000000'}}>
              {state.user.userData.email}
            </Text>
            <Text style={{color: '#000000', fontSize: 20}}>
              {state.user.userData.city}
            </Text>
          </View>
        </View>
        {/* <LinearGradient
          start={{x: 0, y: 1}}
          end={{x: 1, y: 0}}
          colors={['#87f3e6', '#617170']}
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 20,
            marginBottom: 25,
          }}> */}
        {/* <View
            style={{
              height: 250,
              // alignItems: 'center',
              // justifyContent: 'center',
              marginLeft: 45,
              // marginRight: 25,
              display: 'flex',
              flexDirection: 'row'
            }}>
            {detail.userDetail.profileImgURL ? (
              <Image
                source={{uri: detail.userDetail.profileImgURL}}
                style={{
                  width: 150,
                  height: 150,
                  marginBottom: 10,
                  borderRadius: 80,
                }}
              />
            ) : (
              <InitialsRound
                initials={user.charAt(0).toUpperCase()}
                font={60}
                iHeight={120}
                iWidth={120}
                borderRadius={80}
              />
            )}

            <H1 style={{fontWeight: 'bold', color: '#ffffff'}}>
              {state.user.userData.name}
            </H1>
            <Text note style={{color: '#000000'}}>
              {state.user.userData.email}
            </Text>
            <Text style={{color: '#000000', fontSize: 20}}>
              {state.user.userData.city}
            </Text>
          </View> */}
        {/* </LinearGradient> */}

        <Content style={{marginTop: 20, margin: 10}}>
          <Pressable
            style={styles.listContainer}
            onPress={() => {
              navigation.navigate('About me');
            }}>
            <Icon active type="Feather" name="user" style={{marginRight: 15}} />
            <Text style={{fontSize: 19}} uppercase={false}>
              About me
            </Text>
            <Right>
              <Icon type="Entypo" name="chevron-right" />
            </Right>
          </Pressable>
          <Pressable
            style={styles.listContainer}
            onPress={() => {
              navigation.navigate('Change Password');
            }}>
            <Icon
              active
              type="Ionicons"
              name="ios-key-outline"
              style={{marginRight: 15}}
            />
            <Text style={{fontSize: 19}}>Change Password</Text>
            <Right>
              <Icon type="Entypo" name="chevron-right" />
            </Right>
          </Pressable>
          <Pressable
            style={styles.listContainer}
            onPress={() => {
              navigation.navigate('Settings');
            }}>
            <Icon
              active
              type="Ionicons"
              name="settings-outline"
              style={{marginRight: 15}}
            />
            <Text style={{fontSize: 19}}>Settings</Text>
            <Right>
              <Icon type="Entypo" name="chevron-right" />
            </Right>
          </Pressable>
          <Pressable
            style={styles.listContainer}
            onPress={() => {
              navigation.navigate('Sponsor');
            }}>
            <Icon
              active
              type="Ionicons"
              name="settings-outline"
              style={{marginRight: 15}}
            />
            <Text style={{fontSize: 19}}>Sponsor</Text>
            <Right>
              <Icon type="Entypo" name="chevron-right" />
            </Right>
          </Pressable>
          <SignOut signOut={() => handleLogOut()} />
        </Content>
      </View>
    </Container>
  );
};

export default Profile;

const styles = StyleSheet.create({
  listContainer: {
    borderRadius: 10,
    padding: 15,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderColor: 'black',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 3,
    marginBottom: 15,
  },
});
