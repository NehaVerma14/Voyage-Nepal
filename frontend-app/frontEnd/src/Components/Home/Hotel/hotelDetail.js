import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TextInput,
  ImageBackground,
  Image,
  Dimensions,
  FlatList,
  SafeAreaView,
} from 'react-native';
import Colors from '../../../constants/Color';
import hotels from '../../../constants/hotels';
const {width} = Dimensions.get('window');
import Icon from 'react-native-vector-icons/MaterialIcons';

const HotelDetails = ({navigation}) => {
  const Card = ({hotel}) => {
    return (
      <ImageBackground
        style={styles.cardImage}
        source={hotel.images}></ImageBackground>
    );
  };
  return (
    <SafeAreaView style={{flex: 1}}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.headerText}>Find your Hotel </Text>
          <View style={styles.Container}>
            <TextInput
              placeholder="Select your hotel"
              style={styles.SearchText}
            />
            <View style={styles.searchIcon}>
              <Icon
                name="search"
                size={28}
                style={{color: Colors.themeColor}}
              />
            </View>
          </View>
        </View>

        <View>
          <Text style={styles.placeText}>Hotels in Kathmandu</Text>
          <View>
            <FlatList
              vertical
              data={hotels}
              renderItem={({item}) => <Card hotel={item} />}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default HotelDetails;

const styles = StyleSheet.create({
  header: {
    justifyContent: 'space-between',
  },
  headerText: {
    fontSize: 30,
    fontWeight: '700',
    color: Colors.themeColor,
  },
  cardImage: {
    height: 220,
    width: width / 2,
    marginRight: 20,
    marginTop: 10,
    padding: 10,
    overflow: 'hidden',
    borderRadius: 10,
  },
  Container: {
    marginTop: 15,
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 3,
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 40,
  },
  placeText: {
    fontSize: 22,
    color: Colors.themeColor,
    marginTop: 10,
    fontWeight: 'bold',
  },
  SearchText: {
    fontSize: 16,
    paddingLeft: 10,
  },
  searchIcon: {
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 5,
  },
});
