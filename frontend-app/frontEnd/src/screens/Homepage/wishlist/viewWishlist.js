import {View, Text} from 'react-native';
import React from 'react';
import {Icon, Button} from 'native-base';
import Colors from '../../../constants/Color';
import PlaceList from '../../../Components/Home/PlanTrip/PlaceList';

const ViewWishlist = () => {
  return (
    <View style={{margin: 20}}>
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginLeft: 0,
        }}>
        <Text style={{fontSize: 22, fontWeight: 'bold'}}>Wishlist</Text>
        <Icon
          type="AntDesign"
          name="heart"
          color="red"
          size={28}
          style={{color: '#dc0000'}}></Icon>
      </View>
      <View style = {{marginTop: 20}}>
        <PlaceList screen = 'wishlist' />
        <PlaceList screen = 'wishlist' />
        <PlaceList screen = 'wishlist' />
        <PlaceList screen = 'wishlist' />
      </View>
    </View>
  );
};

export default ViewWishlist;
