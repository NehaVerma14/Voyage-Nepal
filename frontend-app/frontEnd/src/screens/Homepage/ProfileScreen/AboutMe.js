import React, {useState, useEffect} from 'react';
import {View, Text, Image, ActivityIndicator, Alert} from 'react-native';
import {
  Container,
  Content,
  Item,
  Input,
  H2,
  Icon,
  Button,
  H1,
  Toast,
} from 'native-base';
import Colors from '../../../constants/Color';
import {useSelector} from 'react-redux';
import api from '../../../services/ApiServices';
var FormData = require('form-data');
import * as ImagePicker from 'react-native-image-picker';
import moment from 'moment';
import InitialsRound from '../../../utils/InitialRound/InitailRound';
import { useIsFocused } from '@react-navigation/native';

var data = new FormData();

const AboutMe = ({navigation}) => {
  const state = useSelector(state => state.loginUser);
  const detail = useSelector(state => state.userDetails);
  const [filePath, setFilePath] = useState({});
  const [loading, setLoading] = useState();
  const isFocused = useIsFocused()
  const [userDetail, setUserDetail] = useState(detail)

  useEffect(() => {
    setUserDetail(detail)
  }, [isFocused, loading, detail])

  const selectFile = async () => {
    ImagePicker.launchImageLibrary(
      {
        mediaType: 'photo',
      },
      response => {
        console.log('Response = ', response);
        setLoading(true);
        if (response.didCancel) {
          setLoading(false)
          console.log('User cancelled image picker');
        } else if (response.error) {
          setLoading(false)
          console.log('ImagePicker Error: ', response.error);
        } else if (response.customButton) {
          setLoading(false)
          console.log('User tapped custom button: ', response.customButton);
          Alert.alert("Voyage Nepal", response.customButton, [
            { text: "OK", onPress: () => null }
          ]);
        } else {
          let source = response;
          // You can also display the image using data:
          // let source = {
          //   uri: 'data:image/jpeg;base64,' + response.data
          // };
          setFilePath(source);
          data.append('photo', {
            uri: response.assets[0].uri,
            type: response.assets[0].type,
            name: response.assets[0].fileName,
            size: response.assets[0].fileSize,
          });
          var config = {
            method: 'post',
            url: `/upload/photo/${state.user.userData.id}`,
            headers: {
              Authorization: `Bearer ${state.user.token}`,
              Accept: 'application/json',
              Cookie: `token=${state.user.token}`,
            },
            data: data,
          };

          var config1 = {
            method: 'put',
            url: `/update/photo/${state.user.userData.id}`,
            headers: {
              Authorization: `Bearer ${state.user.token}`,
              Accept: 'application/json',
              Cookie: `token=${state.user.token}`,
            },
            data: data,
          };

          if (!userDetail.userDetail.profileImgURL) {
            api(config)
              .then(function (response) {
                setLoading(false);
                console.log(JSON.stringify(response.data));
                console.log('success!');
                Toast.show({
                  text: response.data,
                  buttonText: 'Okay',
                  type: 'success',
                  duration: 5000,
                });
              })
              .catch(function (error) {
                setLoading(false);
                console.log(error);
                console.log('upload error');
                Toast.show({
                  text: 'File was too large',
                  buttonText: 'Okay',
                  type: 'danger',
                  duration: 5000,
                });
              });
          } else if (userDetail.userDetail.profileImgURL) {
            api(config1)
              .then(function (response) {
                setLoading(false);
                console.log(JSON.stringify(response.data));
                console.log('update success!');
                Toast.show({
                  text: response.data,
                  buttonText: 'Okay',
                  type: 'success',
                  duration: 5000,
                });
              })
              .catch(function (error) {
                setLoading(false);
                console.log(error);
                console.log('update error');
                Toast.show({
                  text: 'File was too large',
                  buttonText: 'Okay',
                  type: 'danger',
                  duration: 5000,
                });
              });
          }
        }
      },
    );
  };

  var date = new Date(userDetail.userDetail.DOB);
  var dob = moment(date).utc().format('DD/MM/YYYY');

  var user = state.user.userData.name

  return (
    <Container style={{backgroundColor: '#ffffff', marginBottom: 30}}>
      <Button transparent onPress={() => navigation.goBack()} large>
        <Icon name="arrow-back" style={{color: '#52c0b4', fontSize: 25}} />
      </Button>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-evenly',
          padding: 10,
          marginBottom: 20,
        }}>
        <View
          style={{
            width: 145,
            height: 145,
            borderRadius: 80,
            alignItems: 'center',
            justifyContent: 'center',
            borderWidth: 5,
            borderColor: Colors.themeColor
          }}>
          {loading ? (
            <ActivityIndicator color={Colors.themeColor} size="large" />
          ) : userDetail.userDetail.profileImgURL ? (
            <Image
              source={{uri: userDetail.userDetail.profileImgURL}}
              style={{width: 140, height: 140, borderRadius: 80}}
            />
          ) : (
            <InitialsRound initials = {user.charAt(0).toUpperCase()} font = {60} iHeight = {140} iWidth = {140} borderRadius = {80} />
          )}
        </View>

        <View>
          <H2>Profile</H2>
          <Text style={{color: Colors.warning}} onPress={() => selectFile()}>
            Change Picture
          </Text>
        </View>
      </View>

      <Content style={{margin: 20, marginLeft: 40}}>
        <H1 style={{fontSize: 23, fontWeight: '900', color: '#000000'}}>
          Name
        </H1>
        <Item style={{marginBottom: 25}}>
          <Input
            disabled
            placeholder={state.user.userData.name}
            style={{fontSize: 20, fontWeight: '600'}}
          />
        </Item>
        <H1 style={{fontSize: 23, fontWeight: '900', color: '#000000'}}>
          Email
        </H1>
        <Item style={{marginBottom: 25}}>
          <Input
            disabled
            placeholder={state.user.userData.email}
            style={{fontSize: 20, fontWeight: '600'}}
          />
        </Item>
        <H1 style={{fontSize: 23, fontWeight: '900', color: '#000000'}}>
          Date of Birth
        </H1>
        <Item style={{marginBottom: 25}}>
          <Input
            disabled
            placeholder={dob}
            style={{fontSize: 20, fontWeight: '600'}}
          />
        </Item>
        <H1 style={{fontSize: 23, fontWeight: '900', color: '#000000'}}>
          Address
        </H1>
        <Item style={{marginBottom: 25}}>
          <Input
            disabled
            placeholder={state.user.userData.city}
            style={{fontSize: 20, fontWeight: '600'}}
          />
        </Item>
        <H1 style={{fontSize: 23, fontWeight: '900', color: '#000000'}}>
          Gender
        </H1>
        <Item style={{marginBottom: 35}}>
          <Input
            disabled
            placeholder={state.user.userData.gender}
            style={{fontSize: 20, fontWeight: '600'}}
          />
        </Item>
      </Content>
    </Container>
  );
};

export default AboutMe;
