import React, {useState, useEffect} from 'react';
import {View, PermissionsAndroid} from 'react-native';
import {Icon, Button, CardItem, Body, Left, Thumbnail, Text, H3} from 'native-base';
import Geolocation from 'react-native-geolocation-service';
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';
import Colors from '../../../constants/Color'
import Geocoder from 'react-native-geocoding';
import MapViewDirections from 'react-native-maps-directions';
import { useIsFocused } from '@react-navigation/native';
import { GEOCODING_API } from '@env'
import {useSelector} from 'react-redux'

const FeedMap = ({navigation, route}) => {
  const state = useSelector(state => state.currentLocation)
  const {name} = route.params;
  
  const [position, setPosition] = useState({
    latitude: state.currentLocation.latitude,
    longitude: state.currentLocation.longitude,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });
  const [pos, setPos] = useState({
    latitude: 27.7172,
    longitude: 85.3240,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  })

  const isFocused = useIsFocused();

  const geoLocation = async () => {
    Geocoder.init(GEOCODING_API);
    await Geocoder.from(name)
    .then(json => {
			var location = json.results[0].geometry.location;
			// console.log(location.lat);
      setPos({...pos, latitude: location.lat, longitude: location.lng})
		})
		.catch(error => console.warn(error));
  }

  useEffect(async () => {
    geoLocation()
  }, [isFocused]);


  return (
    <View style = {{backgroundColor: '#ffffff'}}>
      <View style = {{flexDirection: 'row', alignItems: 'center',}}>
      <Button transparent onPress = {() => navigation.goBack()} large ><Icon name = 'arrow-back' style = {{color: '#52c0b4', fontSize: 25}} /></Button>
      <H3>{name}</H3>
      </View>
      <View>
      
        <MapView
        provider={PROVIDER_GOOGLE}
        style = {{height: 700, width: 500, justifyContent: 'flex-end', alignItems: 'center'}}
        initialRegion={pos}
        >
        <Marker
          coordinate={{
            latitude: pos.latitude,
            longitude: pos.longitude,
          }}
          title={name}></Marker>
        <Marker
          coordinate={{
            latitude: position.latitude,
            longitude: position.longitude,
          }}
          title={'Kathmandu'}
          ></Marker>
        <MapViewDirections
        origin={position}
        destination={pos}
        apikey="AIzaSyDziZCJwC1dqy7vRGhVEyhWbnuSc0pTeAI"
        strokeWidth={3}
        strokeColor='red'
        />
      </MapView>
      </View>
    </View>
  );
};

export default FeedMap;
