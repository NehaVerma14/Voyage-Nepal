import React from 'react'
import { Image, ImageBackground, useWindowDimensions, StyleSheet } from 'react-native'
import { View, Text } from "native-base";
//var ScrollableTabView = require('react-native-scrollable-tab-view');
import feedStyles from './feed.styles'

export const HelloUser = (props) => {
    return (
        <View style={feedStyles.helloUSer}>
            <Text style = {feedStyles.userName}>Hello, {props.name}!</Text>
        </View>
    )
}

export const UserImage = () => {
    return(
        <Image source = {require('../../../assets/pictures/face.jpg')} style = {feedStyles.userImg} />
    )
}


export const WelcomeContainer = (props) => {
    const imageWidth = useWindowDimensions().width;
  const imageHeight = Math.round(imageWidth * (1105 / 2004));
    return(
        <View style = {feedStyles.welcomeContainer}>
            <ImageBackground source = {require('../../../assets/pictures/bgMountains.jpg')} style = {{width: imageWidth, height: imageHeight}}>
            <HelloUser name = {props.user} />
            <UserImage />
            </ImageBackground>
            
        </View>
    )
}
