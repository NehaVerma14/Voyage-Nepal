import React, {Component} from 'react';
import {
  View,
  Container,
  Content,
  Text,
  CardItem,
  Thumbnail,
  Icon,
  Left,
  Body,
  Input,
  Item,
} from 'native-base';
import Colors from '../../../constants/Color';
import {useNavigation} from '@react-navigation/native';
import StarRating from 'react-native-star-rating';

const Hotel = props => {
  const navigation = useNavigation()
  return (
    <Container>
      <Content
        padder
        style={{margin: 5, marginTop: 0}}
        showsVerticalScrollIndicator={false}>
        {props.hotels.map((hotel, index) => (
          <CardItem
            key={index}
            bordered
            button
            onPress={() => navigation.navigate('FeedMap', {name: hotel.name})}>
            <Left>
              <Thumbnail
                source={{uri: hotel.hotelPhotoUrl}}
                style={{
                  width: 115,
                  height: 115,
                  marginLeft: -12,
                  marginRight: 10,
                  borderRadius: 0,
                }}></Thumbnail>
              <Body>
                <Text style={{fontSize: 19, fontWeight: 'bold'}}>
                  {hotel.name}
                </Text>
                <Text note style={{fontSize: 16}}>
                  Kathmandu, Durbar Marg
                </Text>
                {hotel.rating ? (
                    <View
                    style={{
                      alignItems: 'flex-start'
                    }}>
                    <StarRating
                      disabled={false}
                      emptyStar={'star-o'}
                      fullStar={'star'}
                      halfStar={'star-half-empty'}
                      iconSet={'FontAwesome'}
                      maxStars={5}
                      rating={hotel.rating}
                      fullStarColor={Colors.warning}
                      emptyStarColor={'white'}
                      starSize={20}
                    />
                  </View>
                  ) : <Text style = {{color: Colors.warning}}>'No ratings yet'</Text>}
              </Body>
            </Left>
          </CardItem>
        ))}
      </Content>
    </Container>
  );
};

export default Hotel;
