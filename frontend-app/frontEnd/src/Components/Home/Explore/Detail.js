import React, { Component } from 'react';
import {View,Text,Stylesheet, ScrollView} from 'react-native';
import {Content} from 'native-base'
import Colors from '../../../constants/Color'
import Icon from 'react-native-vector-icons'
import { useNavigation } from '@react-navigation/native';

const Detail =(props)=>{
    const navigation = useNavigation();
    return(
        <Content showsVerticalScrollIndicator={false}>
            <View style={{margin: 20}}>
                <Text style={{fontSize: 18}}>{props.details}</Text>
            </View>
        </Content>
    )
}

export default Detail
