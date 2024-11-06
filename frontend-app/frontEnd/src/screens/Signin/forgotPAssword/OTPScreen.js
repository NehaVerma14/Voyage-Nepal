import React, {useState, useEffect, useRef} from 'react';
import {
  Animated,
  BackHandler,
  Image,
  SafeAreaView,
  Text,
  View,
  Alert,
  ActivityIndicator,
} from 'react-native';
import {Button} from 'native-base';
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field';
import styles, {
  ACTIVE_CELL_BG_COLOR,
  CELL_BORDER_RADIUS,
  CELL_SIZE,
  DEFAULT_CELL_BG_COLOR,
  NOT_EMPTY_CELL_BG_COLOR,
} from './OTP.styles';
import GoBack from '../../../Components/Signin/GoBack';
// import CountDown from '../../Components/Signin/CountDown';
import Colors from '../../../constants/Color';
import {
  FormInput,
  ActionButton,
} from '../../../Components/FormComponents/FormCompponents';

import {resetPassword} from '../../../redux/action/Login/resetPassword';
import {getUserEmail} from '../../../redux/action/Login/email';
import {useDispatch, useSelector} from 'react-redux';
import LoadingModal from '../../../utils/Modal';

const {Value, Text: AnimatedText} = Animated;

const CELL_COUNT = 6;
const source = {
  uri: 'https://user-images.githubusercontent.com/4661784/56352614-4631a680-61d8-11e9-880d-86ecb053413d.png',
};

const animationsColor = [...new Array(CELL_COUNT)].map(() => new Value(0));
const animationsScale = [...new Array(CELL_COUNT)].map(() => new Value(1));
const animateCell = ({hasValue, index, isFocused}) => {
  Animated.parallel([
    Animated.timing(animationsColor[index], {
      useNativeDriver: false,
      toValue: isFocused ? 1 : 0,
      duration: 250,
    }),
    Animated.spring(animationsScale[index], {
      useNativeDriver: false,
      toValue: hasValue ? 0 : 1,
      duration: hasValue ? 300 : 250,
    }),
  ]).start();
};

const OTPScreen = ({navigation}) => {
  const state = useSelector(state => state.userEmail);
  const otp = useSelector(state => state.resetOtp);
  const dispatch = useDispatch();
  const [value, setValue] = useState('');
  const [loading, setLoading] = useState(false);
  const ref = useBlurOnFulfill({value, cellCount: CELL_COUNT});
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  });

  useEffect(() => {
    if(!otp.loading && otp.success){
      navigation.navigate('Reset')
    }
  }, [otp])

  const handleSubmit = async () => {
    setLoading(true);
    if (value.length === 6) {
      dispatch(resetPassword(value));
      
    }
  };

  const resendOtp = () => {
    const userEmail = state.email;
    console.log(state);
    dispatch(getUserEmail(userEmail)).then(
      Alert.alert('Voyage Nepal', 'Please Check email for otp', [
        {text: 'OK', onPress: () => null},
      ]),
    );
  };

  const renderCell = ({index, symbol, isFocused}) => {
    const hasValue = Boolean(symbol);
    const animatedCellStyle = {
      backgroundColor: hasValue
        ? animationsScale[index].interpolate({
            inputRange: [0, 1],
            outputRange: [NOT_EMPTY_CELL_BG_COLOR, ACTIVE_CELL_BG_COLOR],
          })
        : animationsColor[index].interpolate({
            inputRange: [0, 1],
            outputRange: [DEFAULT_CELL_BG_COLOR, ACTIVE_CELL_BG_COLOR],
          }),
      borderRadius: animationsScale[index].interpolate({
        inputRange: [0, 1],
        outputRange: [CELL_SIZE, CELL_BORDER_RADIUS],
      }),
      transform: [
        {
          scale: animationsScale[index].interpolate({
            inputRange: [0, 1],
            outputRange: [0.2, 1],
          }),
        },
      ],
    };

    setTimeout(() => {
      animateCell({hasValue, index, isFocused});
    }, 0);

    return (
      <AnimatedText
        key={index}
        style={styles.cell}
        onLayout={getCellOnLayoutHandler(index)}>
        {symbol || (isFocused ? <Cursor /> : null)}
      </AnimatedText>
    );
  };

  return (
    <View style={{backgroundColor: 'white', flex: 1}}>
      <GoBack goBack={() => navigation.goBack()} />
      <SafeAreaView style={styles.root}>
        <Text style={styles.title}>Verification</Text>
        <Image style={styles.icon} source={source} />
        <Text style={styles.subTitle}>
          Please enter the verification code{'\n'}
          we sent to your email address
        </Text>
        {!otp.loading && otp.error && (
          <Text
            style={{
              color: Colors.error,
              fontSize: 14,
              marginBottom: 2,
              fontWeight: 'bold',
              textAlign: 'center',
              marginTop: 10
            }}>
            {otp.error}
          </Text>
        )}

        <CodeField
          ref={ref}
          {...props}
          value={value}
          onChangeText={setValue}
          cellCount={CELL_COUNT}
          rootStyle={styles.codeFiledRoot}
          keyboardType="number-pad"
          textContentType="oneTimeCode"
          renderCell={renderCell}
        />
        <ActionButton
          mt={30}
          buttonName={
            otp.loading ? <ActivityIndicator color="#ffffff" /> : 'Verify'
          }
          home={() => handleSubmit()}
        />
        {/* <CountDown /> */}
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Text style={{fontSize: 16}}>Didn't Receive OTP? </Text>
          <Text
            style={{color: Colors.themeColor, fontSize: 16}}
            onPress={() => resendOtp()}>
            Resend
          </Text>
        </View>
        {/* {loading ? (
          <LoadingModal visibility={true} />
        ) : (
          <LoadingModal visibility={false} />
        )} */}
      </SafeAreaView>
    </View>
  );
};

export default OTPScreen;
