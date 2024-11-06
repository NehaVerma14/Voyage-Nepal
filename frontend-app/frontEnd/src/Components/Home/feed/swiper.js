import React from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';
import Swiper from 'react-native-swiper';
import {SafeAreaView} from 'react-navigation';

const Carousel = () => {
  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={styles.sliderContainer}>
        <Swiper height={210} autoplay>
          <View style={styles.slide}>
            <Image
              source={require('../../../assets/pictures/SliderImages/cocacola.jpg')}
              resizeMode="cover"
              style={styles.sliderImage}
            />
          </View>
          <View style={styles.slide}>
            <Image
              source={require('../../../assets/pictures/SliderImages/Hotel.jpg')}
              resizeMode="cover"
              style={styles.sliderImage}
            />
          </View>
          <View style={styles.slide}>
            <Image
              source={require('../../../assets/pictures/SliderImages/SliderImg1.jpg')}
              resizeMode="cover"
              style={styles.sliderImage}
            />
          </View>
          <View style={styles.slide}>
            <Image
              source={require('../../../assets/pictures/SliderImages/TajHotel.png')}
              resizeMode="cover"
              style={styles.sliderImage}
            />
          </View>
        </Swiper>
      </View>
    </SafeAreaView>
  );
};

export default Carousel;

const styles = StyleSheet.create({
  sliderContainer: {
    height: 240,
    marginTop: 20,
    marginBottom: 10,
    justifyContent: 'center',
    alignSelf: 'center',
  },
  slide: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },
  sliderImage: {
    height: '100%',
    width: '100%',
    alignSelf: 'center',
  },
});
