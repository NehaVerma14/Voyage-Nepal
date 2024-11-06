import React from 'react';
import {
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  View,
  useWindowDimensions
} from 'react-native';
import COLORS from '../../../constants/Color'
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';

const imagesDetail =(props)=>{
    const imageWidth = useWindowDimensions().width;
    const navigation = useNavigation();
    const placeName = (place) => {
        const _place = place
        const words = _place.split(' ');
  
        for (let i = 0; i < words.length; i++) {
          words[i] = words[i].charAt(0).toUpperCase() + words[i].substr(1);
        }
        return words.join(' ');
      
    };
    
    return(
        
        <ImageBackground style={[style.headerImage, {width: imageWidth}]} source={props.image}>
        <View style={style.header}>
          <Icon
            name="arrow-back-ios"
            size={28}
            color={COLORS.white}
            onPress={navigation.goBack}
          />
          <View style={{marginTop: 20, }}>
          <Text style={{fontSize: 20, fontWeight: 'bold', color: COLORS.white,}}>{placeName(props.name)}</Text>
          <View
            style={{
              flexDirection: 'row',
              
              
            }}>
            <Icon name="place" color={COLORS.white} size={28} />
            <Text style = {{fontSize: 12,
              fontWeight: '400',
              color: COLORS.white,
              marginTop: 5,}}>{props.location}</Text>
          </View>
          </View>
              </View>
          </ImageBackground>
    
    )
}
export default imagesDetail
const style = StyleSheet.create({ 
    headerImage: {
    height: 250,
    borderBottomRightRadius: 15,
    borderBottomLeftRadius: 15,
    overflow: 'hidden',
  },
  header: {
  
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 10,
  },
})
