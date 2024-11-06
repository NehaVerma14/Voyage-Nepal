import React, {useEffect} from 'react';
import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import TravelList from '../../../Components/Home/Explore/TravelList';
import api from '../../../services/ApiServices'
import {useSelector, useDispatch} from 'react-redux'
import {Category} from '../../../redux/action/Data/Category'

const Explore = ({navigation}, props) => {

  const state = useSelector(state => state.loginUser)
  const category = useSelector(state => state.category)

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
      <TravelList />
    </SafeAreaView>
  );
};

export default Explore;
