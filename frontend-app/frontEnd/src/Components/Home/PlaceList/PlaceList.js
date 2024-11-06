import {View, Text} from 'react-native';
import React, {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {GetPlaceByCategory} from '../../../redux/action/Data/getPlaceByCategory';
import api from '../../../services/ApiServices';

const Place = ({category}) => {
  const dispatch = useDispatch();
  const state = useSelector(state => state.loginUser);
  const [places, setPlaces] = useState([]);

  useEffect(() => {
    var config = {
      method: 'get',
      url: `/places/${category}/category`,
      headers: {
        Authorization: `Bearer ${state.user.token}`,
      },
    };

    api(config)
      .then(function (response) {
        // console.log(JSON.stringify(response.data));
        setPlaces(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, [category]);
  return (
    <View>
      {places && places.map(place => <View key={place._id}><Text>{place.name}</Text></View>)}
    </View>
  );
};

export default Place;
