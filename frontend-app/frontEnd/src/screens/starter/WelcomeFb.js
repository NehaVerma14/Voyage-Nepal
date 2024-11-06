import {View, Text, Image} from 'react-native';
import {Button} from 'native-base';
import React, {useState} from 'react';
import {LoginManager, AccessToken} from 'react-native-fbsdk-next';

const WelcomeFb = ({route, navigation}) => {
  const {user} = route.params;
  const [loggedin, setLoggedin] = useState(true)
  const [token, setToken] = useState('')
  const logout = async() => {
    // try {
    //   LoginManager.logOut();
    //   if (AccessToken.getCurrentAccessToken() == null) {
    //       const {accessToken} = await AccessToken.getCurrentAccessToken();
    //       console.log('log', accessToken);
    //   }
    // } catch (error) {
    //   console.log(error);
    // }
    LoginManager.logOut()

    setLoggedin(false)
    // if(user){

    //     console.log(user);
    // }
    // var token = ''
    AccessToken.getCurrentAccessToken().then(data => {
        const {accessToken} = data
        // console.log('logout', accessToken);
        setToken(accessToken)
    })
    // .then(() => LoginManager.logOut())
    // navigation.navigate('Signin')
    

  };
  return (
    <View>
      <Text>You have successfully signed in</Text>
      <Text>Full Name: {user.userData.name}</Text>
      <Text>EMail: {user.userData.email}</Text>
      <Image
        source={{uri: `${user.userData.profilePicture}`}}
        style={{width: 150, height: 150}}></Image>
      <Button onPress={logout}>
        <Text>Log out</Text>
      </Button>
      {loggedin && console.log('loggedin')}
      {!loggedin && !token && console.log('loggedout')}
      {token && console.log('token')}
    </View>
  );
};

export default WelcomeFb;
