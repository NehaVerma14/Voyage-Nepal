import React, {useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  FlatList,
  Pressable,
  ImageBackground,
  Dimensions,
} from 'react-native';
import Colors from '../../../constants/Color';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {Item, Input} from 'native-base';
import StarRating from 'react-native-star-rating';
import {useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';

const {width} = Dimensions.get('window');

const SearchContainer = ({align}) => {
  const navigation = useNavigation();

  const places = useSelector(state => state.place);

  const [allPlaces, setAllPlaces] = useState(places);
  const [filteredData, setFilteredData] = useState(places);
  const [showList, setShowList] = useState(false);

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
      <View style={styles.card} key={place._id}>
        <ImageBackground
          style={styles.cardImage}
          source={{uri: place.images.featuredImg}}></ImageBackground>
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

  const searchPlace = place => {
    setFilteredData(
      allPlaces.filter(data =>
        data.name.toLowerCase().includes(place.toLowerCase()),
      ),
    );
  };

  return (
    <SafeAreaView>
      <Item
        rounded
        style={{
          marginLeft: 25,
          marginRight: 25,
          marginBottom: 20,
          marginTop: 10,
          paddingLeft: 10,
          paddingRight: 10,
        }}>
        <Input
          placeholder="Search your destination"
          onChangeText={text => searchPlace(text)}
          // onFocus={() => setShowList(true)}
          // onBlur={() => setShowList(false)}
        />
        <Icon name="search" style={{color: Colors.gray}} size={28} />
      </Item>
      {!align ? (
        <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        data={filteredData}
        keyExtractor={item => item._id}
        renderItem={({item}) => (
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
            <Card key={item._id} place={item} />
          </Pressable>
        )}
      />
      ) : null}

      {/* <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        data={filteredData}
        keyExtractor={item => item._id}
        renderItem={({item}) => (
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
            <Card key={item._id} place={item} />
          </Pressable>
        )}
      /> */}
    </SafeAreaView>
  );
};

export default SearchContainer;

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
    marginTop: 2,
  },
});
