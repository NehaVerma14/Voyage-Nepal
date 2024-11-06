import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
} from 'react-native';
import {Content, Container, Icon} from 'native-base';
import Colors from '../../../constants/Color';
import PlaceList from '../../../Components/Home/PlanTrip/PlaceList';

const ViewPlans = ({navigation}) => {
  return (
    <Container>
      <Content padder style = {{marginBottom: 40}}>
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            margin: 20,
          }}>
          <Text style={{fontSize: 22, fontWeight: 'bold'}}>My Plans</Text>
          <Icon
            type="AntDesign"
            name="pluscircle"
            color="#000"
            size={28} onPress = {() => navigation.navigate('CreateTrip')}></Icon>
        </View>
        <Image
          style={style.headerImage}
          source={require('./baudhanathStupa.jpg')}
        />
        <View style={style.header}>
          <Text style={{fontSize: 20, fontWeight: 'bold', color: '#000'}}>
            Place Name
          </Text>
          <Text
            style={{
              fontSize: 14,
              // fontWeight: 'bold',
              color: '#000',
              paddingTop: 5,
            }}>
            25 Mar - 30 Mar
          </Text>
          <Text
            style={{
              fontSize: 14,
              fontWeight: 'bold',
              color: Colors.warning,
              paddingTop: 5,
            }}>
            View all Places
          </Text>
          {/* <View
            style={{
              flexDirection: 'row',
            }}>
            <PlaceIcon name="place" color="#000" size={28} />
            <Text
              style={{
                fontSize: 12,
                fontWeight: '400',
                color: '#000',
                marginTop: 5,
              }}>
              Kathmandu
            </Text>
          </View> */}
        </View>
        <View style = {{marginTop: 70}}>
          <PlaceList />
          <PlaceList />
          <PlaceList />
        </View>
      </Content>
    </Container>
  );
};

export default ViewPlans;

const style = StyleSheet.create({
  headerImage: {
    height: 230,
    borderRadius: 15,
    // overflow: 'hidden',
    width: '100%',
    position: 'relative',
  },
  header: {
    marginHorizontal: 10,
    position: 'absolute',
    backgroundColor: '#fff',
    width: '85%',
    elevation: 5,
    borderRadius: 20,
    padding: 20,
    top: 240,
    left: '8%',
    right: '8%',
  },
});
