import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  ImageBackground,
  Image,
  Dimensions,
  FlatList,
  SafeAreaView,
  Pressable,
  TouchableOpacity,
} from 'react-native';
import {Button, Icon} from 'native-base';
import SearchContainer from '../feed/searchContainer';
import Colors from '../../../constants/Color';
const {width} = Dimensions.get('window');
import LocationIcon from 'react-native-vector-icons/MaterialIcons';
import {useNavigation} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import api from '../../../services/ApiServices';
import StarRating from 'react-native-star-rating';

const TravelList = props => {
  const navigation = useNavigation();

  const category = useSelector(state => state.category);
  const state = useSelector(state => state.loginUser);
  const places = useSelector(state => state.place);

  // console.log(places);
  const placeName = name => {
    const _place = name;
    const words = _place.split(' ');

    for (let i = 0; i < words.length; i++) {
      words[i] = words[i].charAt(0).toUpperCase() + words[i].substr(1);
    }

    return words.join(' ');
  };

  const Card = ({place}) => {
    return (
      <View style={styles.card} key={place + place._id.toString()}>
        <ImageBackground
          style={styles.cardImage}
          source={{uri: place.images.featuredImg}}></ImageBackground>
        <View style={styles.cardDetails}>
          <Text style={styles.cardText}>{placeName(place.name)}</Text>
          <Text style={styles.location}>
            <LocationIcon name="location-on" size={12} />
            {place.location}
          </Text>
          {place.ratings ? (
            <View
              style={{
                alignItems: 'flex-start',
              }}>
              <StarRating
                disabled={false}
                emptyStar={'star-o'}
                fullStar={'star'}
                halfStar={'star-half-empty'}
                iconSet={'FontAwesome'}
                maxStars={5}
                rating={place.ratings}
                fullStarColor={Colors.warning}
                emptyStarColor={'white'}
                starSize={20}
              />
            </View>
          ) : (
            <Text style={{color: Colors.warning}}>'No ratings yet'</Text>
          )}
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={{flex: 1, marginBottom: 30}}>
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          // justifyContent: 'center',
          margin: 20
        }}>
        <Icon
          name="arrow-back-circle-sharp"
          style={{color: Colors.themeColor, fontSize: 38}}
          onPress={() => navigation.goBack()}
        />
        {/* <Button primary onPress={() => navigation.goBack()} large>
          <Icon
            name="arrow-back-circle-sharp"
            style={{color: Colors.themeColor, fontSize: 38}}
          />
        </Button> */}
        <Text style={styles.headerText}>Explore Destinations </Text>
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <SearchContainer />
        {category.map((category, index) => (
          <View key={category._id}>
            <Text style={styles.activityText}>{category.name}</Text>

            <FlatList
              horizontal
              showsHorizontalScrollIndicator={false}
              data={places}
              keyExtractor={(item, index) => index.toString() + item}
              renderItem={({item, index}) => (
                <Pressable
                  onPress={() =>
                    navigation.navigate('Details', {
                      image: item.images,
                      location: item.location,
                      name: item.name,
                      details: item.description,
                      reviews: item.reviews,
                      hotel: item.stayPlace,
                      id: item._id,
                      ratings: item.ratings,
                    })
                  }>
                  {item.category.includes(category._id) ? (
                    <Card key={index.toString()} place={item} />
                  ) : null}
                </Pressable>
              )}
            />
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

export default TravelList;

const styles = StyleSheet.create({
  // header: {
  //   justifyContent: 'space-between',
  // },
  headerText: {
    fontSize: 25,
    fontWeight: 'bold',
    color: '#000000',
    marginLeft: 25,
    // marginTop: 35,
  },
  cardImage: {
    height: 220,
    width: width / 2,
    marginRight: 20,
    padding: 10,
    overflow: 'hidden',
    borderRadius: 10,
  },
  activityText: {
    fontSize: 22,
    color: '#000000',
    fontWeight: 'bold',
    marginLeft: 25,
    marginBottom: 25,
    marginTop: 25,
  },
  card: {
    height: 300,
    width: width / 1.8,
    padding: 10,
    shadowColor: '#000000',
    borderColor: 'black',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.3,
    shadowRadius: 3.84,
    backgroundColor: 'white',
    borderRadius: 10,
    elevation: 3,
    marginRight: 9,
    marginLeft: 25,
    marginBottom: 30,
  },
  cardImage: {
    height: 180,
    width: width / 2,
    marginRight: 20,
    marginTop: 3,
    padding: 10,
    overflow: 'hidden',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  recommendText: {
    fontSize: 22,
    color: Colors.themeColor,
    marginTop: 10,
    fontWeight: 'bold',
  },
  cardText: {
    color: '#000',
    fontSize: 18,
    fontWeight: 'bold',
  },
  cardDetails: {
    height: 70,
    borderRadius: 0,
    backgroundColor: 'white',
    position: 'absolute',
    bottom: 30,
    padding: 5,
    marginLeft: 10,
    width: width / 2,
    justifyContent: 'space-between',
    borderBottomColor: 'black',
  },
  location: {
    fontSize: 13,
  },
  ratings: {
    flexDirection: 'row',
    marginTop: 2,
  },
});
