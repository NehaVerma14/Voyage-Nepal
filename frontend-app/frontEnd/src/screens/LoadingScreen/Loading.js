import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  ActivityIndicator,
  Image,
  PermissionsAndroid,
  useWindowDimensions,
  Alert
} from 'react-native';
import Colors from '../../constants/Color';
import api from '../../services/ApiServices';
import {useIsFocused} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import Geolocation from 'react-native-geolocation-service';
import {Recommended} from '../../redux/action/Data/recommended';
import {userDetails} from '../../redux/action/Login/userDetails';
import {CurrentLocation} from '../../redux/action/Data/currentLocation';
import SkeletonLoader from './SkeletonPlaceholder';

import moment from 'moment';

const Loading = ({navigation, route}) => {
  const width = useWindowDimensions().width;
  const {_place} = route.params;

  const state = useSelector(state => state.loginUser);
  const detail = useSelector(state => state.userDetails);

  const [age, setAge] = useState(0);
  const [loading, setLoading] = useState(true);

  const dispatch = useDispatch();

  const [position, setPosition] = useState({
    latitude: 27.7172,
    longitude: 85.324,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });

  const [recommended, setRecommended] = useState();

  const isFocused = useIsFocused();

  var today = new Date();

  const geoLocation = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Voyage Nepal',
          message: 'Voyage Nepal wants to access to your location ',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        // do something if granted...
        Geolocation.getCurrentPosition(
          position => {
            // console.log(position);
            const longitude = position.coords.longitude;
            const latitude = position.coords.latitude;
            setPosition({
              ...position,
              longitude: longitude,
              latitude: latitude,
            });
            dispatch(CurrentLocation(longitude, latitude));
          },
          error => Alert.alert("Voyage Nepal", error.message, [
            { text: "OK", onPress: () => null }
          ]),
          {
            enableHighAccuracy: true,
            timeout: 30000,
            maximumAge: 1000,
          },
        );
      }
    } catch (error) {
      console.warn(error);
    }
  };

  useEffect(async () => {
    await geoLocation();
    navigation.navigate('Home', {currentLocation: position})
    // fetchRecommended();
  }, [isFocused]);

  // const fetchRecommended = async () => {
  //   const userDOB = moment(detail.userDetail.DOB, 'YYYY/M/D');
  //   const userAge = moment().diff(userDOB, 'years');
  //   setAge(userAge);
  //   // console.log(age)
  //   var data = JSON.stringify({
  //     placename: _place,
  //     age: age,
  //     x: position.latitude,
  //     y: position.longitude,
  //   });

    // var config = {
    //   method: 'post',
    //   url: `/place/recommends/${state.user.userData.id}`,
    //   headers: {
    //     'Content-Type': 'application/json',
    //     Authorization: `Bearer ${state.user.token}`,
    //     Cookie: `token=${state.user.token}`,
    //   },
    //   data: data,
    // };

    // api(config)
    //   .then(function (response) {
    //     // console.log(JSON.stringify(response.data.data));
    //     setLoading(false);
    //     setRecommended(response.data.data);
    //     dispatch(Recommended(response.data.data));
    //     navigation.navigate('Home', {currentLocation: position});
    //   })
    //   .catch(function (error) {
    //     console.log(error.response.data);
    //   });
  // };

  return (
    <View style={{display: 'flex', flex: 1, padding: 20}}>
      <View style={{flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20, alignItems: 'center'}}>
        <View style={{flexDirection: 'column'}}>
          <SkeletonLoader width = {200} height = {20} radius = {5} mb = {10} />
          <SkeletonLoader width = {150} height = {10} radius = {5} mb = {20}/>
        </View>
        <SkeletonLoader width = {80} height = {80} radius = {50} />
      </View>
      <View style={{marginBottom: 20}}>
          <SkeletonLoader width = {width} height = {200} radius = {5} />
      </View>
      <View style={{marginBottom: 20}}>
          <SkeletonLoader width = {150} height = {20} radius = {5} />
      </View>
      <View style={{marginBottom: 20, flexDirection: 'row'}}>
          <SkeletonLoader width = {180} height = {200} radius = {5} mr={10}/>
          <SkeletonLoader width = {180} height = {200} radius = {5} mr={10}/>
          <SkeletonLoader width = {180} height = {200} radius = {5} mr={10}/>
      </View>
      <View style={{marginBottom: 20}}>
          <SkeletonLoader width = {150} height = {20} radius = {5} />
      </View>
      <View style={{marginBottom: 20, flexDirection: 'row'}}>
          <SkeletonLoader width = {150} height = {200} radius = {5} mr={10}/>
          <SkeletonLoader width = {180} height = {200} radius = {5} mr={10}/>
          <SkeletonLoader width = {150} height = {200} radius = {5} mr={10}/>
      </View>
      <View style={{marginBottom: 20}}>
          <SkeletonLoader width = {width} height = {200} radius = {5} />
      </View>
    </View>
  );
};

export default Loading;
