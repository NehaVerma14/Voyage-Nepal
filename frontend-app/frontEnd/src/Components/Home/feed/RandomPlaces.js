import React, {useState, useEffect} from 'react';
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
import {Button, Card, CardItem, Left, Accordion} from 'native-base';
import {useSelector} from 'react-redux';
import Colors from '../../../constants/Color';
import StarRating from 'react-native-star-rating';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {useNavigation} from '@react-navigation/native';

const {width} = Dimensions.get('window');

const RandomPlaces = () => {
  const navigation = useNavigation();
  const [expanded, setExpanded] = React.useState(false);
  const [arrow, setArrow] = useState(false);

  const handlePress = () => setExpanded(!expanded);

  const places = useSelector(state => state.place);
  const [randPlaces, setRandPlaces] = useState();
  const [loading, setLoading] = useState(true);
  const newArray = [];
  useEffect(() => {
    const array = places.map(place => {
      return place
    });
    for (var i = 0; i < 6; i++) {
      var random = array[Math.floor(Math.random() * 20)];
      newArray.push(random);
    }
    setRandPlaces(newArray);
    setLoading(false);
    // console.log(randPlaces);
  }, []);
  const displayPlace = () => {
    for (var i = 0; i < 6; i++) {
      var random = places[Math.floor(Math.random() * 20)];
      newArray.push(random);
      //   newArray.push({name: random.name, photo: random.placePhoto, description: random.description});
      //   console.log(random);
    }
    setRandPlaces(newArray);
    setLoading(false);
    // console.log(randPlaces);
  };

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
        <View>
          <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            data={randPlaces}
            keyExtractor={item => item._id}
            renderItem={({item, index}) => (
              <Pressable
                onPress={() =>
                  navigation.navigate('Details', {
                    image: item.placePhoto,
                    location: item.location,
                    name: item.name,
                    details: item.description,
                    reviews: item.reviews,
                    hotel: item.stayPlace,
                    id: item._id,
                    ratings: item.ratings,
                  })
                }>
                <Card place={item} key = {index.toString()} />
              </Pressable>
            )}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default RandomPlaces;

const styles = StyleSheet.create({
  header: {
    justifyContent: 'space-between',
  },
  headerText: {
    fontSize: 25,
    fontWeight: 'bold',
    color: '#000000',
    margin: 25,
    marginTop: 35,
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
    marginTop: 2
  },
});

