import React from 'react';
import {
  Image,
  ScrollView,
  TouchableOpacity,
  useWindowDimensions,
} from 'react-native';
import {Text, Button, View, Icon, Container, Content} from 'native-base';
import Colors from '../../constants/Color';
import LinearGradient from 'react-native-linear-gradient';
import {ActionButton} from '../../Components/FormComponents/FormCompponents';

const Starter = ({navigation}) => {
  const width = useWindowDimensions().width;
  const height = Math.round((width * 251) / 458);
  return (
    <Container style={{display: 'flex', flex: 1}}>
      <Content>
        <View
          style={{
            flexDirection: 'row',
            margin: 30,
            marginTop: 45,
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <View style={{flexDirection: 'column'}}>
            <Text style={{fontSize: 40, fontWeight: 'bold'}}>Travel</Text>
            <Text style={{fontSize: 20}}>In Digital Way..</Text>
          </View>
          <Image
            source={require('../../assets/pictures/newlogo.png')}
            style={{width: 130, height: 130}}
          />
        </View>
        <View style={{marginTop: 100}}>
          <LinearGradient
            start={{x: 0, y: 1}}
            end={{x: 1, y: 0}}
            colors={['#87f3e6', '#208378']}
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 15,
              height: 450,
              justifyContent: 'center',
            }}>
            <Image
              source={require('../../assets/images/start.png')}
              style={{position: 'absolute', top: -100}}></Image>
            <Button
              onPress={() => navigation.navigate('Signin')}
              rounded
              block
              style={{
                marginBottom: 15,
                backgroundColor: Colors.warning,
                marginTop: 120,
                marginLeft: 30, 
                marginRight: 30
              }}>
              <Text
                style={{fontSize: 20}}>
                Login
              </Text>
            </Button>
            <Button
              onPress={() => navigation.navigate('Signup')}
              rounded
              block
              style={{
                marginBottom: 15,
                backgroundColor: Colors.warning,
                
                marginLeft: 30, 
                marginRight: 30
              }}>
              <Text
                style={{fontSize: 20}}>
                Sign up
              </Text>
            </Button>
          </LinearGradient>
        </View>
      </Content>
    </Container>
  );
};

export default Starter;
