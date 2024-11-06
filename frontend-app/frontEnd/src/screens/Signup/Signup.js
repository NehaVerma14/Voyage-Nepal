import React, {useState, useEffect} from 'react';
import {
  ScrollView,
  SafeAreaView,
  Image,
  useWindowDimensions,
  Alert,
  ActivityIndicator,
} from 'react-native';
import api from '../../services/ApiServices';
import axios from 'axios';
import {
  Container,
  Content,
  Text,
  Button,
  View,
  Icon,
  Input,
  Item,
  Form,
} from 'native-base';
import DateTimePicker from '@react-native-community/datetimepicker';
import {Select, Option} from 'react-native-chooser';
import {
  FormInput,
  ActionButton,
  Account,
  GifComponent,
  ActionText,
  Title,
} from '../../Components/FormComponents/FormCompponents';
import {GenderCheckbox} from '../../Components/Signup/Signup';
import signupStyles from '../../Components/Signup/signup.styles';
import Colors from '../../constants/Color';
import GoBack from '../../Components/Signin/GoBack';

import {registerUser} from '../../redux/action/register/registerUser';
import {useDispatch, useSelector} from 'react-redux';
import LoadingModal from '../../utils/Modal';

const Signup = ({navigation}, props) => {
  const width = useWindowDimensions().width;

  const state = useSelector(state => state.authReducer);

  const [error, setError] = useState('');

  useEffect(() => {
    if (state.success) {
      setError('');
      Alert.alert('Voyage Nepal', state.success.message, [
        {text: 'YES', onPress: () => null},
      ]);
      // Alert.alert(state.success.message)
    } else if (state.errors) {
      // alert('error')
      // console.log(state);
      setError(state.errors);
      console.log(state.errors);
    }
  }, [state.success, state.errors]);

  const dispatch = useDispatch();

  const today = new Date();

  const [hidePassword, setHidePassword] = useState(true);
  const [hideConfirmPassword, setHideConfirmPassword] = useState(true);
  const [gender, setGender] = useState('');
  const [city, setCity] = useState('');
  const [dob, setDob] = useState('');
  const [date, setDate] = useState(new Date(today));
  const [showCalendar, setShowCalendar] = useState(false);
  const [dobError, setDobError] = useState(false);
  const [data, setData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',

    check_textInputChange: false,
    isValidName: true,
    isValidEmail: true,
    isValidPassword: true,
    isValidConfirmPassword: true,
  });

  const onChangeDate = (event, selectedDate) => {
    // console.log(gender);
    const currentDate = selectedDate || date;

    setShowCalendar(Platform.OS === 'ios');
    setDate(currentDate);
    // console.log(currentDate);

    var dateSelected = currentDate
      .toISOString()
      .replace('-', '/')
      .split('T')[0]
      .replace('-', '/');
    // console.log(dateSelected);
    getDOB(dateSelected);
    // setDob(dateSelected);
    yearRange: '-99:-18';
  };

  const getName = _name => {
    setData({...data, name: _name, isValidName: true});
  };
  const getEmail = _email => {
    setData({...data, email: _email, isValidEmail: true});
  };
  const getPassword = _password => {
    setData({...data, password: _password, isValidPassword: true});
  };
  const getConfirmPassword = _confirmPassword => {
    setData({
      ...data,
      confirmPassword: _confirmPassword,
      isValidConfirmPassword: true,
    });
  };
  const getGender = _gender => {
    setGender(_gender);
  };

  const getCity = _city => {
    setCity(_city);
  };

  const getDOB = _dob => {
    setDob(_dob);
  };

  const handleValidName = () => {
    if (data.name.trim().length >= 2) {
      setData({
        ...data,
        isValidName: true,
      });
    } else {
      setData({
        ...data,
        isValidName: false,
      });
    }
  };

  const handleValidEmail = () => {
    if (data.email.includes('@')) {
      setData({
        ...data,
        isValidEmail: true,
      });
    } else {
      setData({
        ...data,
        isValidEmail: false,
      });
    }
  };
  const handleValidPassword = () => {
    if (data.password.length >= 6) {
      setData({
        ...data,
        isValidPassword: true,
      });
    } else {
      setData({
        ...data,
        isValidPassword: false,
      });
    }
  };
  const handleValidConfirmPassword = () => {
    if (data.password === data.confirmPassword) {
      setData({
        ...data,
        isValidConfirmPassword: true,
      });
    } else {
      setData({
        ...data,
        isValidConfirmPassword: false,
      });
    }
  };

  const handleValidDOB = () => {
    if (dob.length !== 10) {
      setDobError(true);
    }
  };

  const dobOnFocus = () => {
    setShowCalendar(true);
    setDobError(false);
  };

  var newUser = {
    name: data.name,
    email: data.email,
    password: data.password,
    gender: gender.name,
    isAdmin: false,
    city: city,
    dob: dob,
  };

  const submitValues = () => {
    if (
      data.name !== '' &&
      data.email !== '' &&
      data.password !== '' &&
      data.confirmPassword !== '' &&
      dob !== '' &&
      gender !== '' &&
      city !== ''
    ) {
      dispatch(registerUser(newUser));
    } else {
      Alert.alert(
        'Voyage Nepal',
        'All fields are mandatory; Please fill up the form correctly',
        [{text: 'OK', onPress: () => null}],
      );
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
          {error == '' ? null : (
            <Text
              style={{
                color: Colors.error,
                fontSize: 14,
                marginBottom: 10,
                fontWeight: 'bold',
              }}>
              {error}
            </Text>
          )}
          <FormInput
            icon="pencil"
            placeholder="Full Name"
            onChangeText={getName}
            value={data.name}
            onBlur={() => handleValidName()}
          />
          {data.isValidName ? null : (
            <Text style={{color: '#FF0000', fontSize: 14, marginBottom: 10}}>
              Please Provide Valid Full Name
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
            <Text style={{color: '#FF0000', fontSize: 14, marginBottom: 10}}>
              Please Provide Valid Email
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
            <Text style={{color: '#FF0000', fontSize: 14, marginBottom: 10}}>
              Password must be 6 characters long
            </Text>
          )}
          <FormInput
            icon="key"
            placeholder="Confirm Password"
            value={data.confirmPassword}
            onChangeText={getConfirmPassword}
            onBlur={() => handleValidConfirmPassword()}
            rightIcon={hideConfirmPassword ? 'eye-off-outline' : 'eye-outline'}
            showPassword={() => setHideConfirmPassword(!hideConfirmPassword)}
            secureText={hideConfirmPassword ? true : false}
          />
          {data.isValidConfirmPassword ? null : (
            <Text style={{color: '#FF0000', fontSize: 14, marginBottom: 10}}>
              Password and confirm password doesn't match
            </Text>
          )}
          {/* <FormInput
            icon="calendar"
            placeholder="Date of Birth"
            value={dob}
            onChangeText={getDOB}
            onFocus={() => dobOnFocus()}
            onBlur={() => handleValidDOB()}
            showCalendar={() => dobOnFocus()}
          />

          {showCalendar ? (
            <DateTimePicker
              testID="dateTimePicker"
              value={date}
              mode="date"
              is24Hour={true}
              display="default"
              onChange={onChangeDate}
              yearRange="-99:-18"
            />
          ) : null}
          {dobError === false ? null : (
            <Text style={{color: '#FF0000', fontSize: 14, marginBottom: 10}}>
              Please Enter your valid date of birth
            </Text>
          )} */}
          {/* <Text
            style={{
              alignSelf: 'flex-start',
              marginBottom: 10,
              fontSize: 19,
              color: '#000000',
              fontWeight: '600',
            }}>
            Gender
          </Text>
          <GenderCheckbox setGender={setGender} /> */}
          {/* <Text
            style={{
              alignSelf: 'flex-start',
              marginBottom: 10,
              fontSize: 19,
              color: '#000000',
              fontWeight: '600',
            }}>
            Select your City
          </Text> */}

          {/* <Select
            onSelect={val => getCity(val)}
            defaultText="Select City"
            style={{
              borderWidth: 0.75,
              borderRadius: 27,
              padding: 13,
              paddingLeft: 20,
              borderColor: Colors.themeColor,
              width: width - 60,
              marginLeft: 30,
              marginRight: 30,
            }}
            textStyle={{fontSize: 17}}
            backdropStyle={{backgroundColor: 'transparent'}}
            optionListStyle={[
              signupStyles.dropdownItem,
              {height: 'auto', maxHeight: '80%'},
            ]}
            transparent={true}
            selected={city}
            selectedStyle={{
              backgroundColor: '#f0f0f0',
              borderRadius: 20,
            }}>
            <Option value={{name: 'pkr'}}>Pokhara</Option>
            <Option value="ktm">Kathmandu</Option>
            <Option value="brt">Biratnagar</Option>
            <Option value="jnk">Janakpur</Option>
            <Option value="Dharan">Dharan</Option>
            <Option value="Dhulikhel">Dhulikhel</Option>
            <Option value="jhapa">Jhapa</Option>
            <Option value="lalitpur">Lalitpur</Option>
            <Option value="Birgunj">Birgunj</Option>
          </Select> */}

          <ActionButton
            mt={30}
            buttonName={
              state.loading ? <ActivityIndicator color="#ffffff" /> : 'Sign up'
            }
            home={() => submitValues()}
          />
          <Account
            text="Already have an Account? "
            action="Login"
            signup={() => navigation.navigate('Signin')}
          />
        </View>
      </Content>
    </Container>
  );
};

export default Signup;
