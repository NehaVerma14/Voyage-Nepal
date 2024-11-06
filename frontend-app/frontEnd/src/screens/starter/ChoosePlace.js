import React, {useEffect, useState} from 'react';
import {View, Text, Alert, BackHandler} from 'react-native';
import {Icon, Button, Container, Content} from 'native-base';
import api from '../../services/ApiServices';
import {useSelector} from 'react-redux';
import Colors from '../../constants/Color';
import SkeletonLoader from '../LoadingScreen/SkeletonPlaceholder';

const ChoosePlace = ({navigation, route}) => {
  useEffect(() => {
    const backAction = () => {
      Alert.alert('Voyage Nepal', 'Are you sure you want to exit the app?', [
        {
          text: 'Cancel',
          onPress: () => null,
          style: 'cancel',
        },
        {text: 'YES', onPress: () => BackHandler.exitApp()},
      ]);
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove();
  }, []);

  const {id, token} = route.params;
  const [places, setPlaces] = useState();
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    var config = {
      method: 'get',
      url: `/places/random`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    api(config)
      .then(function (response) {
        const array = response.data.map(res => {
          const _place = res.name;
          const words = _place.split(' ');
          for (let i = 0; i < words.length; i++) {
            words[i] = words[i].charAt(0).toUpperCase() + words[i].substr(1);
          }
          return words.join(' ');
        });

        // for (var i = 0; i < 13; i++) {
        //   var random = array[Math.floor(Math.random() * 24)];
        //   newArray.push(random);
        // }
        setPlaces(array);
        setLoading(false);

      })
      .catch(function (error) {
        console.log(error);
      });
  }, [navigation]);

  const handleClick = place => {
    navigation.navigate('LoadingScreen2', {_place: place});
  };

  const placeName = name => {
    const _place = name;
    const words = _place.split(' ');

    for (let i = 0; i < words.length; i++) {
      words[i] = words[i].charAt(0).toUpperCase() + words[i].substr(1);
    }

    return words.join(' ');
  };

  return (
    <Container>
      <Text style={{fontWeight: 'bold', fontSize: 25, margin: 20}}>
        Choose Anyone Place
      </Text>
      <View
        style={{
          flexDirection: 'row',
          flexWrap: 'wrap',
          marginLeft: 10,
          marginRight: 10,
        }}>
        {!loading ? (
          places.map((place, index) => (
            <Button
              key={index}
              bordered
              style={{margin: 10, padding: 5, borderColor: Colors.themeColor}}
              onPress={() => handleClick(place)}>
              <Text style={{color: 'black'}}>{place}</Text>
            </Button>
          ))
        ) : (
          <View style={{display: 'flex', flex: 1, padding: 20}}>
            <View
              style={{
                flexDirection: 'row',
                marginBottom: 20,
                alignItems: 'center',
                flexWrap: 'wrap'
              }}>
              <SkeletonLoader width={150} height={50} radius={5} mr={10} mb={10} />
              <SkeletonLoader width={120} height={50} radius={5} mr={10} mb={10} />
              <SkeletonLoader width={160} height={50} radius={5} mr={10} mb={10}/>
              <SkeletonLoader width={130} height={50} radius={5} mr={10} mb={10}/>
              <SkeletonLoader width={140} height={50} radius={5} mr={10} mb={10}/>
              <SkeletonLoader width={150} height={50} radius={5} mr={10} mb={10}/>
              <SkeletonLoader width={160} height={50} radius={5} mr={10} mb={10}/>
              <SkeletonLoader width={120} height={50} radius={5} mr={10} mb={10}/>
              <SkeletonLoader width={150} height={50} radius={5} mr={10} mb={10}/>
              <SkeletonLoader width={160} height={50} radius={5} mr={10} mb={10}/>
            </View>
          </View>
        )}
      </View>
    </Container>
  );
};

export default ChoosePlace;
