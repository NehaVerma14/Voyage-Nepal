import {View, Text} from 'react-native';
import React from 'react';
import {List, ListItem, Thumbnail, Body} from 'native-base';
import StarRating from 'react-native-star-rating';
import Colors from '../../../constants/Color';

export default function PlaceList(props) {
  return (
    <List>
      <ListItem>
        <Body
          style={{
            marginBottom: 20,
            flexDirection: 'row',
            alignItems: 'center',
            borderColor: 'transparent'
          }}>
          <Thumbnail
            square
            large
            source={require('../../../screens/Homepage/planTrip/baudhanathStupa.jpg')}
            style={{width: 100, height: 100, marginRight: 15, borderRadius: 10}}
          />
          <View style={{width: '80%'}}>
            <Text
              style={{
                fontSize: 20,
                // color: Colors.themeColor,
                paddingBottom: 6,
                // fontWeight: 'bold',
                color: '#00000a'
              }}>
              Kathmandu
            </Text>
            <Text
              style={{
                fontSize: 14,
                // color: Colors.themeColor,
                paddingBottom: 6,
              }}>
              25 Mar - 30 Mar
            </Text>
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
                rating={5}
                fullStarColor={Colors.warning}
                emptyStarColor={'white'}
                starSize={20}
              />
            </View>
          </View>
        </Body>
      </ListItem>
    </List>
  );
}
