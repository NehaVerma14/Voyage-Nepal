import React, {useState, useEffect} from 'react';
import {
  FlatList,
  ScrollView,
  ImageBackground,
  Dimensions,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Pressable,
} from 'react-native';
import Colors from '../../../constants/Color';
const {width} = Dimensions.get('window');
import Icon from 'react-native-vector-icons/MaterialIcons';
import {useDispatch, useSelector} from 'react-redux';
import StarRating from 'react-native-star-rating';
import {useNavigation} from '@react-navigation/native';
import api from '../../../services/ApiServices';
import {GetPlaceByID} from '../../../redux/action/Data/getPlaceById';

const Popular = () => {
  const places = useSelector(state => state.place);
  const {user} = useSelector(state => state.loginUser);

  const dispatch = useDispatch();

  const [loading, setLoading] = useState(true);

  const navigation = useNavigation();

  const {recommendedPlaceDetails, nearByPlaceDetails} = useSelector(
    state => state.recommendedPlace,
  );
  const recommendedPlace = useSelector(state => state.recommendedPlace);

  const getPlacesById = async id => {
    dispatch(GetPlaceByID(id));
    navigation.navigate('RecommendationDetail');
  };

  const placeName = (name) => {
    
      const _place = name;
      const words = _place.split(' ');

      for (let i = 0; i < words.length; i++) {
        words[i] = words[i].charAt(0).toUpperCase() + words[i].substr(1);
      }
      return words.join(' ');
    
  };


  const Card = ({place}) => {
    return (
      <View style={styles.card} key={place._id}>
        <ImageBackground
          style={styles.cardImage}
          source={{uri: place.placePhoto}}></ImageBackground>
        <View style={styles.cardDetails}>
          <Text style={styles.cardText}>{placeName(place.name)}</Text>
          <Text style={styles.location}>
            <Icon name="location-on" size={12} />
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
    <SafeAreaView
      style={{paddingTop: 10, backgroundColor: 'white', marginBottom: 30}}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View>
          <Text style={styles.headingText}>Places Near You</Text>
        </View>
        {/* <View>
          {recommendedPlace.nearByPlaceDetails.length !== 0 ? (
            <FlatList
              horizontal
              showsHorizontalScrollIndicator={false}
              data={recommendedPlace.nearByPlaceDetails}
              keyExtractor={item => item._id}
              renderItem={({item}) => (
                <Pressable onPress={() => getPlacesById(item._id)}>
                  <Card place={item} />
                </Pressable>
              )}
            />
          ) : (
            <Text style={{color: Colors.warning, marginLeft: 25}}>
              Sorry, No nearby places found in Database.
            </Text>
          )}
        </View> */}

        <View>
          <View>
            <Text style={styles.recommendText}>Recommended For You</Text>
          </View>
          {/* <View>
            {recommendedPlace.recommendedPlaceDetails.length !== 0 ? (
              <FlatList
                horizontal
                showsHorizontalScrollIndicator={false}
                data={recommendedPlace.recommendedPlaceDetails}
                keyExtractor={item => item._id}
                renderItem={({item}) => (
                  <Pressable onPress={() => getPlacesById(item._id)}>
                    <Card place={item} key={item._id} />
                  </Pressable>
                )}
              />
            ) : (
              <Text style={{color: Colors.warning, marginLeft: 25}}>
                Sorry, No recemmnded places found in Database.
              </Text>
            )}
          </View> */}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Popular;

const styles = StyleSheet.create({
  headingText: {
    fontSize: 22,
    color: '#000000',
    fontWeight: 'bold',
    marginLeft: 25,
    marginBottom: 15,
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
    color: '#000000',
    marginTop: 40,
    fontWeight: 'bold',
    marginLeft: 25,
    marginBottom: 15,
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
  },
});
