import React, {useState, useEffect} from 'react';
import {Image, ActivityIndicator} from 'react-native';
import {Container, Content, View, Text, Button, Icon} from 'native-base';
import {useDispatch, useSelector} from 'react-redux';
import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Colors from '../../constants/Color';
import {loginUser} from '../../redux/action/Login/loginUser';
import {
  FormInput,
  ActionButton,
  Account,
} from '../../Components/FormComponents/FormCompponents';
import {ForgotPassword} from '../../Components/Signin/Signin';
import {LoginManager, AccessToken, GraphRequest} from 'react-native-fbsdk-next';
import LoginIcon from 'react-native-vector-icons/MaterialCommunityIcons';

const Signin = ({navigation}) => {
  const state = useSelector(state => state.loginUser);

  const dispatch = useDispatch();

  const [hidePassword, setHidePassword] = useState(true);
  const [error, setError] = useState('');
  const [data, setData] = useState({
    email: '',
    password: '',
    isValidEmail: true,
    isValidPassword: true,
  });
  const [user, setUser] = useState({});

  useEffect(() => {
    GoogleSignin.configure({
      webClientId:
        '942468371176-c982abr7i767nobbkbu0lb1qglnfk71i.apps.googleusercontent.com',
      offlineAccess: true,
      forceCodeForRefreshToken: true,
    });
    isSignedIn();
  }, []);

  const facebookSignUp = async () => {
    LoginManager.logInWithPermissions(['public_profile', 'email'])
      .then(function (result) {
        if (result.isCancelled) {
          alert('Login Cancelled ' + JSON.stringify(result));
        } else {
          AccessToken.getCurrentAccessToken().then(data => {
            const {accessToken} = data;
            initUser(accessToken);
          });
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const GoogleSignUp = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      const {data} = await axios.post(
        'http://192.168.10.110:8080/api/user/google/signin',
        {idToken: `${userInfo.idToken}`},
      );
      AsyncStorage.setItem('token', data.accessToken);
      AsyncStorage.setItem('id', userInfo.user.id);
      setUser(userInfo);
      console.log('data token', userInfo.user);
      navigation.navigate('LoadingScreen1', {
        id: userInfo.user.id,
        token: data.accessToken,
      });
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // user cancelled the login flow
        alert('User cancelled the login flow !');
      } else if (error.code === statusCodes.IN_PROGRESS) {
        alert('Signin in progress');
        // operation (f.e. sign in) is in progress already
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        alert('Google play services not available or outdated !');
        // play services not available or outdated
      } else {
        console.log(error);
      }
    }
  };

  const isSignedIn = async () => {
    const isSignedIn = await GoogleSignin.isSignedIn();
    if (!!isSignedIn) {
      getCurrentUserInfo();
    } else {
      console.log('Please Login');
    }
  };

  const getCurrentUserInfo = async () => {
    try {
      const userInfo = await GoogleSignin.signInSilently();
      console.log('edit..', user);
      setUser(userInfo);
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_REQUIRED) {
        console.log('User has not signed in yet');
      } else {
        console.log('Something went wrong');
      }
    }
  };

  const signOut = async () => {
    try {
      await GoogleSignin.revokeAccess();
      await GoogleSignin.signOut();
      setUser({});
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(async () => {
    const userEmail = await AsyncStorage.getItem('email');
    if (userEmail !== null) {
      setData({...data, email: userEmail});
    }
  }, []);

  useEffect(() => {
    if (state.user && !state.loading) {
      setData({
        ...data,
        password: '',
        isValidEmail: true,
        isValidPassword: true,
      });
      setError('');
      navigation.navigate('LoadingScreen1', {
        id: state.user.userData.id,
        token: state.user.token,
      });
      setError('');
    } else if (state.errors) {
      setError(state.errors);
    }
  }, [state.user, state.errors, state]);

  const getEmail = _email => {
    setData({...data, email: _email});
  };

  const getPassword = _password => {
    setData({...data, password: _password});
  };

  const handleValidEmail = () => {
    if (data.email !== '') {
      setData({...data, isValidEmail: true});
    } else {
      setData({...data, isValidEmail: false});
    }
  };

  const handleValidPassword = () => {
    if (data.password !== '') {
      setData({...data, isValidPassword: true});
    } else {
      setData({...data, isValidPassword: false});
    }
  };

  var signinUser = {
    email: data.email,
    password: data.password,
  };

  const submitValues = async () => {
    if (data.email !== '' && data.password !== '') {
      dispatch(loginUser(signinUser));
    } else {
      setError('All the fields are required');
    }
  };

  const handleForgotPAssword = () => {
    navigation.navigate('Dob');
  };

  const initUser = async token => {
    try {
      const {data} = await axios.get(
        `https://graph.facebook.com/v2.5/me?fields=email,name,picture.type(large)&access_token=${token}`,
      );
      const {
        email,
        id: facebook_id,
        name,
        picture: {
          data: {url},
        },
      } = data;
      const constructData = {
        accessToken: token,
        userData: {
          email,
          name,
          facebook_id,
          profilePicture: url,
        },
      };
      const fbData = await axios.post(
        'http://192.168.10.110:8080/api/user/facebook/signin',
        {data: constructData},
      );
      AsyncStorage.setItem('token', fbData.data.accessToken);
      AsyncStorage.setItem('id', constructData.userData.facebook_id);
      console.log('fbData', fbData.data.accessToken);
      navigation.navigate('LoadingScreen1', {
        id: constructData.userData.facebook_id,
        token: fbData.data.accessToken,
      });
    } catch (error) {
      console.log('err', error);
    }
  };

  return (
    <Container style={{display: 'flex', flex: 1, backgroundColor: '#ffffff'}}>
      <Button transparent onPress={() => navigation.goBack()} large>
        <Icon
          name="arrow-back-circle-sharp"
          style={{color: Colors.themeColor, fontSize: 38}}
        />
      </Button>
      <Content keyboardShouldPersistTaps={'handled'}>
        <Image
          source={require('../../assets/pictures/newlogo.png')}
          style={{
            width: 160,
            height: 160,
            alignSelf: 'center',
            marginBottom: 30,
          }}></Image>

        <Text
          style={{
            fontSize: 18,
            textTransform: 'uppercase',
            textAlign: 'center',
          }}>
          sign in to continue
        </Text>
        <View style={{alignItems: 'center', margin: 30}}>
          {error === '' ? null : (
            <Text
              style={{
                color: Colors.error,
                fontSize: 14,
                marginBottom: 10,
                fontWeight: 'bold',
              }}>
              {'Error: ' + error + '!!'}
            </Text>
          )}
          <FormInput
            icon="mail-outline"
            placeholder="Email Address"
            value={data.email}
            onChangeText={getEmail}
            onBlur={() => handleValidEmail()}
          />
          {data.isValidEmail ? null : (
            <Text
              style={{
                color: '#FF0000',
                fontSize: 14,
                marginBottom: 10,
                alignSelf: 'flex-end',
              }}>
              Required!
            </Text>
          )}
          <FormInput
            icon="key"
            placeholder="Password"
            value={data.password}
            onChangeText={getPassword}
            onBlur={() => handleValidPassword()}
            rightIcon={hidePassword ? 'eye-off-outline' : 'eye-outline'}
            showPassword={() => setHidePassword(!hidePassword)}
            secureText={hidePassword ? true : false}
          />
          {data.isValidPassword ? null : (
            <Text
              style={{
                color: '#FF0000',
                fontSize: 14,
                marginBottom: 10,
                alignSelf: 'flex-end',
              }}>
              Required!
            </Text>
          )}
          <ForgotPassword forgotPassword={() => handleForgotPAssword()} />

          <ActionButton
            mt={20}
            buttonName={
              state.loading ? <ActivityIndicator color="#ffffff" /> : 'Login'
            }
            home={() => submitValues()}
          />
          <View
            style={{display: 'flex', flexDirection: 'row', marginBottom: 14}}>
            <Icon
              name="logo-google"
              onPress={GoogleSignUp}
              size={18}
              style={{marginRight: 15, color: Colors.google, fontSize: 34}}>
              <Image
                source={require('../../assets/icons/google.svg')}
                style={{width: 20, height: 20}}></Image>
            </Icon>
            <Icon
              name="logo-facebook"
              size={18}
              onPress={facebookSignUp}
              style={{color: Colors.facebook, fontSize: 34}}
            />
          </View>
          <Account
            text="Don't have an Account? "
            action="Signup"
            signup={() => navigation.navigate('Signup')}
          />
        </View>
      </Content>
    </Container>
  );
};

export default Signin;
