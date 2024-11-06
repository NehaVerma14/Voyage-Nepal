import React from 'react';
import {Text, SafeAreaView} from 'react-native';
import {
  Button,
  Icon,
  View,
  Container,
  List,
  ListItem,
  Left,
  Body,
  Content,
} from 'native-base';

const FAQ = ({navigation}) => {
  return (
    <Container style={{flex: 1, display: 'flex', marginBottom: 35}}>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <Button transparent onPress={() => navigation.goBack()} large>
          <Icon name="arrow-back" style={{color: '#52c0b4', fontSize: 25}} />
        </Button>
        <Text style={{fontSize: 20, fontWeight: '800'}}>Help and FAQ</Text>
      </View>

      <Content padder style={{marginRight: 10, marginLeft: 10}}>
        <Text style={{fontSize: 18, marginBottom: 5}}>General questions</Text>
        <Text style={{marginBottom: 30}}>
          Here you can find all the answers to general questions.
        </Text>
        <Text style={{fontSize: 20, fontWeight: 'bold', marginBottom: 5}}>
          General Information
        </Text>
        <List>
          <ListItem>
            <View style={{flexDirection: 'row', flex: 1, flexWrap: 'wrap'}}>
              {/* <Text style = {{marginRight: 10, fontSize: 18, flex: 1, flexWrap: 'wrap'}}>1.</Text> */}
              <View>
                <Text
                  style={{
                    marginBottom: 10,
                    fontSize: 18,
                    flex: 1,
                    flexWrap: 'wrap',
                  }}>
                  What is Voyage Nepal?
                </Text>
                <Text style={{fontSize: 16, flex: 1, flexWrap: 'wrap'}}>
                  Voyage Nepal is a native mobile app designed on top of React
                  Native which recommends the iconic travel destination nearby
                  the user location. If you are a traveller, it's the best app
                  for your travel planner, based on your location and what type
                  of places you like.
                </Text>
              </View>
            </View>
          </ListItem>
          <ListItem>
            <View style={{flexDirection: 'row', flex: 1, flexWrap: 'wrap'}}>
              {/* <Text style = {{marginRight: 10, fontSize: 18, flex: 1, flexWrap: 'wrap'}}>2.</Text> */}
              <View>
                <Text
                  style={{
                    marginBottom: 10,
                    fontSize: 18,
                    flex: 1,
                    flexWrap: 'wrap',
                  }}>
                  How do I sign up?
                </Text>
                <Text style={{fontSize: 16, flex: 1, flexWrap: 'wrap'}}>
                  {' '}
                  Signing up in Voyage Nepal is easy. You just have to go on
                  sign up page on Voyage Nepal app and provide your Email, Name
                  and password and check your Email for confirming.{' '}
                </Text>
              </View>
            </View>
          </ListItem>
          <ListItem>
            <View style={{flexDirection: 'row', flex: 1, flexWrap: 'wrap'}}>
              {/* <Text style = {{marginRight: 10, fontSize: 18, flex: 1, flexWrap: 'wrap'}}>3.</Text> */}
              <View>
                <Text
                  style={{
                    marginBottom: 10,
                    fontSize: 18,
                    flex: 1,
                    flexWrap: 'wrap',
                  }}>
                  How do I use it?
                </Text>
                <Text style={{fontSize: 16, flex: 1, flexWrap: 'wrap'}}>
                  {' '}
                  Using Voyage Nepal is simple. All you have to do it sign up,
                  get your email verified and provide few informations and based
                  on those datas, we recommend travelling places for you and
                  show you list of accomodations to stay.{' '}
                </Text>
              </View>
            </View>
          </ListItem>
          <ListItem>
            <View
              style={{
                flexDirection: 'row',
                flex: 1,
                flexWrap: 'wrap',
                flex: 1,
                flexWrap: 'wrap',
              }}>
              {/* <Text style = {{marginRight: 10, fontSize: 18}}>4.</Text> */}
              <View>
                <Text style={{marginBottom: 10, fontSize: 18}}>
                  What is Near You?
                </Text>
                <Text style={{fontSize: 16}}>
                  {' '}
                  Near you shows you the nearest place from you based on your
                  GPS location.
                </Text>
              </View>
            </View>
          </ListItem>
          <ListItem>
            <View style={{flexDirection: 'row', flex: 1, flexWrap: 'wrap'}}>
              {/* <Text style = {{marginRight: 10, fontSize: 18}}>5.</Text> */}
              <View>
                <Text style={{marginBottom: 10, fontSize: 18}}>
                  Are my datas safe?
                </Text>
                <Text style={{fontSize: 16}}>
                  Yes, your datas are completely safe. We don't ask for your
                  crucial information. Only some datas such as your Name, Email,
                  Location (GPS), Age, and Place you like are collected for our
                  algorithm to provide you with best recommendation for you.
                </Text>
              </View>
            </View>
          </ListItem>
          <ListItem>
            <View style={{flexDirection: 'row', flex: 1, flexWrap: 'wrap'}}>
              {/* <Text style = {{marginRight: 10, fontSize: 18}}>6.</Text> */}
              <View>
                <Text style={{marginBottom: 10, fontSize: 18}}>
                  How do I know about the place?
                </Text>
                <Text style={{fontSize: 16}}>
                  We have integrated review system for places. Meaning, you can
                  see the review of place before going and read the place
                  description and photos to know about it.
                </Text>
              </View>
            </View>
          </ListItem>
          <ListItem>
            <View style={{flexDirection: 'row', flex: 1, flexWrap: 'wrap'}}>
              {/* <Text style = {{marginRight: 10, fontSize: 18}}>7.</Text> */}
              <View>
                <Text style={{marginBottom: 10, fontSize: 18}}>
                  How do reviews work?
                </Text>
                <Text style={{fontSize: 16}}>
                  All the reviews on Voyage Nepal are written by users who have
                  completed a trip using Voyage Nepal. In addition to a written
                  review, users are also asked to provide star ratings. You’ll
                  see the star rating out of 5 at the top which is an average of
                  all reviews submitted.
                </Text>
              </View>
            </View>
          </ListItem>
          <ListItem>
            <View style={{flexDirection: 'row', flex: 1, flexWrap: 'wrap'}}>
              {/* <Text style = {{marginRight: 10, fontSize: 18}}>8.</Text> */}
              <View>
                <Text style={{marginBottom: 10, fontSize: 18}}>
                  Does Voyage Nepal charge fees?
                </Text>
                <Text style={{fontSize: 16}}>
                  No, Voyage Nepal is completely free.
                </Text>
              </View>
            </View>
          </ListItem>
          <ListItem>
            <View style={{flexDirection: 'row', flex: 1, flexWrap: 'wrap'}}>
              {/* <Text style = {{marginRight: 10, fontSize: 18}}>9.</Text> */}
              <View>
                <Text style={{marginBottom: 10, fontSize: 18}}>
                  How can I reach customer support?
                </Text>
                <Text style={{fontSize: 16}}>
                  There are several ways you can get in contact with us. Email
                  us at voyagenepal@outlook.com Call us, or chat over
                  Whatsapp/Viber: +9779861068895 Or reach out over Facebook,
                  Instagram, LinkedIn, or Twitter.
                </Text>
              </View>
            </View>
          </ListItem>
        </List>
      </Content>
    </Container>
  );
};

export default FAQ;
