import React, { Component } from 'react';
import {View,Container,Content,Text,CardItem,Thumbnail,Icon,Left,Body, Input,Item } from 'native-base';
import Colors from '../../../constants/Color'
import { useNavigation } from '@react-navigation/native';
 const Hotel=(props)=> {
    const navigation = useNavigation();
    return (
      <Container>
        <Content padder style={{margin: 5, marginTop: 0}} showsVerticalScrollIndicator = {false}>
        {props.hotels.map((hotel, index) => (
          <CardItem key = {index} bordered button onPress = {() => navigation.navigate('ExploreMap',{name: hotel.name})}>
          <Left>
            <Thumbnail
              source={{uri: hotel.hotelPhotoUrl}}
              style={{
                width: 115,
                height: 115,
                marginLeft: -12,
                marginRight: 10,
                borderRadius: 0
              }}></Thumbnail>
            <Body>
              <Text style = {{fontSize: 19, fontWeight: 'bold'}}>{hotel.name}</Text>
              
                <View style = {{flexDirection: 'row'}}>
                  <Icon type="FontAwesome" name="star" style = {{color: Colors.warning, marginRight: 3, fontSize: 22}}/>
                  <Icon type="FontAwesome" name="star" style = {{color: Colors.warning, marginRight: 3, fontSize: 22}}/>
                  <Icon type="FontAwesome" name="star" style = {{color: Colors.warning, marginRight: 3, fontSize: 22}}/>
                  <Icon type="FontAwesome" name="star-half-empty" style = {{color: Colors.warning, marginRight: 3, fontSize: 22}}/>
                  <Icon type="FontAwesome" name="star-o" style = {{color: Colors.warning, marginRight: 3, fontSize: 22}}/>
                </View>
            </Body>
          </Left>
        </CardItem>
        ))}
        
      </Content>
      </Container>
    );
  }

export default Hotel;