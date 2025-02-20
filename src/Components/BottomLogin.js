import React, {useEffect, useRef, useState} from 'react';
import {
  Alert,
  Image,
  Keyboard,
  Modal,
  Platform,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import Color from '../Config/Color';
import MIcon from 'react-native-vector-icons/MaterialIcons';
import {Button} from 'react-native-elements';
import {Poppins} from '../Global/FontFamily';
import DeviceInfo from 'react-native-device-info';
import fetchData from '../Config/fetchData';
import common_fn from '../Config/common_fn';
import {useNavigation} from '@react-navigation/native';
import messaging, {firebase} from '@react-native-firebase/messaging';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useDispatch} from 'react-redux';
import OTPInput from './OTPInput';
import {setLoginType, setUserData} from '../Redux';
import {profileCompletion} from '../Utils/utils';
import {RESULTS} from 'react-native-permissions';
import {KeyboardAvoidingView} from 'react-native';
import {Media} from '../Global/Media';
import {scr_width} from '../Utils/Dimensions';
import {Iconviewcomponent} from './Icontag';
import {
  getHash,
  removeListener,
  startOtpListener,
} from 'react-native-otp-verify';

import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from '@react-native-google-signin/google-signin';

const DismissKeyboard = ({children}) => (
  <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
    {children}
  </TouchableWithoutFeedback>
);

const BottomLogin = ({login, setLogin}) => {
  const navigation = useNavigation();
  const [number, setNumber] = useState('');
  const [error, setError] = useState(false);
  const [uniqueId, setUniqueId] = useState(false);
  const [userInfo, setUserInfo] = useState(false);
  const [otpVisible, setOTPVisible] = useState(false);
  const [height] = useState(undefined);
  const [visible, setVisible] = useState(false);
  const inputRef = useRef();
  const [otpCode, setOTPCode] = useState('');
  const [isPinReady, setIsPinReady] = useState(false);
  const maximumCodeLength = 4;
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(30);
  const [loading, setLoading] = useState(false);
  const [token, setToken] = useState('');
  const dispatch = useDispatch();
  const [percentage, setPercentage] = useState(0);
  const [otp, setOtp] = useState('');

  const chkNumber = number => {
    setNumber(number);
    if (number.length == 10) {
      Keyboard.dismiss();
    }
  };

  useEffect(() => {
    try {
      GoogleSignin.configure({
        scopes: ['email', 'profile'],
        webClientId:
          '1071623549220-vgptladnqlmd7uamrbit97mi6tnta037.apps.googleusercontent.com',
        offlineAccess: false,
        // webClientId: '1080007356916-6amrf74qvgd060rprqqeegs06s168dn1.apps.googleusercontent.com',
        // offlineAccess: true,
        // hostedDomain: '',
        // forceConsentPrompt: true,
      });
    } catch (error) {
      console.log('error ----------- : ', error);
    }
  }, []);

  useEffect(() => {
    getHash()
      .then(hash => {
        console.log('Hash ================ :-----------------------', hash);
      })
      .catch('error  ----------', console.log);

    startOtpListener(message => {
      if (message != null) {
        const otp = /(\d{4})/g.exec(message)[1];
        setOTPCode(otp);
      }
    });
    return () => removeListener();
  }, []);

  useEffect(() => {
    DeviceInfo.getUniqueId().then(uniqueId => {
      setUniqueId(uniqueId);
    });
  }, [uniqueId]);

  const verifyLoginData = async () => {
    if (number.length == 10) {
      const login = await fetchData.login({
        mobile_number: number,
        device_id: 2,
      });
      var {message, user_id} = login;
      if (user_id) {
        if (Platform.OS === 'android') {
          common_fn.showToast('OTP Sent Successfully');
        } else {
          Alert.alert('OTP Sent Successfully');
        }
        setOTPVisible(true);
        setNumber(number);
      } else {
        var msg = message;
        setError(msg);
        setNumber('');
      }
    } else {
      if (Platform.OS === 'android') {
        common_fn.showToast(
          'Invalid Phone Number, Please Enter Your 10 Digit Phone Number',
        );
      } else {
        Alert.alert(
          'Invalid Phone Number, Please Enter Your 10 Digit Phone Number',
        );
      }
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (seconds > 0) {
        setSeconds(seconds - 1);
      }
      if (seconds === 0) {
        if (minutes === 0) {
          clearInterval(interval);
        } else {
          setSeconds(30);
          setMinutes(minutes - 1);
        }
      }
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [seconds]);

  const ResendOTP = async number => {
    setSeconds(30);
    const ResendOtpVerify = await fetchData.login({mobile_number: number});
    var {message, user_id} = ResendOtpVerify;
    if (user_id) {
      if (Platform.OS === 'android') {
        common_fn.showToast('OTP Sent Successfully');
      } else {
        Alert.alert('OTP Sent Successfully');
      }
    } else {
      var msg = 'message';
      setError(msg);
    }
  };

  const chkOTPError = OTP => {
    let reg = /^[6-9][0-9]*$/;

    if (OTP.length === 0) {
      setError('Enter Your OTP Code');
    } else if (reg.test(OTP) === false) {
      setError(false);
      setError(false);
    } else if (reg.test(OTP) === true) {
      setError('');
    }
  };

  const requestUserPermission = async () => {
    const authStatus = await messaging().requestPermission({
      alert: true,
      sound: true,
      badge: true,
      provisional: true,
    });
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;
    if (enabled) {
      getFCMToken();
    }
  };

  useEffect(() => {
    requestUserPermission();
  }, [token]);

  const getFCMToken = async () => {
    try {
      let fcmToken = await AsyncStorage.getItem('fcmToken');
      if (!fcmToken) {
        try {
          const refreshToken = await messaging().getToken();
          if (refreshToken) {
            setToken(refreshToken);
            await AsyncStorage.setItem('fcmToken', refreshToken);
          } else {
          }
        } catch (error) {
          console.log('Error fetching token :', error);
        }
      } else {
        await AsyncStorage.setItem('fcmToken', fcmToken);
        setToken(fcmToken);
      }
    } catch (error) {
      console.log('Catch in getFcmToken  : ', error);
    }
  };

  const VerifyOTP = async navigation => {
    setLoading(true);
    var {replace} = navigation;
    if (otpCode.length == 4) {
      const VerifyOTP = await fetchData.verify_OTP({
        mobile_number: number,
        otp: otpCode,
        token: token,
      });
      if (VerifyOTP?.message == 'Success') {
        var {user_id, username, mobile_number, email} = VerifyOTP?.data;
        const percentage = profileCompletion(
          user_id,
          username,
          mobile_number,
          email,
        );
        setPercentage(percentage);
        const UserLogin = {
          ...VerifyOTP?.data,
        };
        await AsyncStorage.setItem(
          'user_data',
          JSON.stringify(VerifyOTP?.data),
        );
        await AsyncStorage.setItem(
          'action_login_type',
          JSON.stringify({login_type: 'properties'}),
        );
        dispatch(setLoginType('properties'));
        replace('TabNavigator', UserLogin);
        setLoading(false);
        setVisible(false);
        setLogin(false);
        // setOTPVisible(false);
        setNumber('');
        common_fn.locationPermission();
        if (Platform.OS === 'android') {
          common_fn.showToast(`Welcome to Albion ${VerifyOTP?.data?.username}`);
        } else {
          Alert.alert(`Welcome to Albion ${VerifyOTP?.data?.username}`);
        }
      } else {
        setOTPCode('');
        inputRef.current.focus();
        var msg = VerifyOTP?.message;
        setError(msg);
        setLoading(false);
        setVisible(false);
        setOTPVisible(false);
        setNumber('');
      }
    } else {
      if (Platform.OS === 'android') {
        common_fn.showToast(
          'Invalid OTP Code Please Enter Your 4 Digit OTP Code',
        );
      } else {
        Alert.alert('Invalid OTP Code Please Enter Your 4 Digit OTP Code');
      }
      setLoading(false);
      setVisible(false);
    }
  };

  const googleSignIn = async navigation => {
    try {
      const replace = navigation;
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      if (userInfo) {
        var data = {
          email: userInfo?.user?.email,
        };
        const updateProfiledata = await fetchData.login_with_gmail(data);
        if (updateProfiledata.message) {
          dispatch(setUserData(updateProfiledata?.users));

          setPercentage(percentage);
          const UserLogin = {
            ...updateProfiledata?.users,
          };
          await AsyncStorage.setItem(
            'user_data',
            JSON.stringify(updateProfiledata?.users),
          );
          await AsyncStorage.setItem(
            'action_login_type',
            JSON.stringify({login_type: 'properties'}),
          );
          dispatch(setLoginType('properties'));
          replace('TabNavigator', UserLogin);
          setLogin(false);
          setOTPVisible(false);
          // locationTrack();
        }
      }
    } catch (error) {
      console.log(error);
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // user cancelled the login flow
      } else if (error.code === statusCodes.IN_PROGRESS) {
        // operation (e.g. sign in) is in progress already
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        // play services not available or outdated
      } else {
        // some other error happened
      }
    }
  };

  return (
    <KeyboardAvoidingView
      style={{flex: 1}}
      behavior={Platform.OS === 'ios' ? 'position' : null}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 40 : 0}>
      {/* <DismissKeyboard> */}
      <View style={{flex: 1}}>
        {otpVisible === true ? (
          <Modal
            transparent={true}
            animationType="slide"
            visible={otpVisible}
            onRequestClose={() => {}}
            style={{alignItems: 'center', justifyContent: 'center'}}>
            <View
              style={{
                flex: 1,
                backgroundColor: Color.transparantBlack,
                // alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Pressable
                style={{flex: 1, backgroundColor: Color.transparantBlack}}
                onPress={() => {
                  setOTPVisible(false);
                  setNumber('');
                }}
              />
              <View
                style={{
                  backgroundColor: Color.white,
                  padding: 10,
                  borderTopLeftRadius: 10,
                  borderTopRightRadius: 10,
                }}>
                <View
                  style={{
                    alignItems: 'center',
                  }}>
                  <Image
                    source={{uri: Media.logo}}
                    style={{width: 100, height: 100, resizeMode: 'contain'}}
                  />
                </View>
                <View
                  style={{
                    marginVertical: 20,
                    justifyContent: 'center',
                  }}>
                  <Text
                    style={{
                      fontSize: 20,
                      fontWeight: 'bold',
                      textAlign: 'center',
                      color: Color.black,
                      marginRight: 10,
                      marginVertical: 10,
                      fontFamily: Poppins.Light,
                    }}>
                    Enter OTP
                  </Text>
                  <Text style={styles.invalidLogin}>{error}</Text>
                  <View style={styles.otpInputView}>
                    <OTPInput
                      inputRef={inputRef}
                      code={otpCode}
                      setCode={setOTPCode}
                      maximumLength={4}
                      setIsPinReady={setIsPinReady}
                      chkOTPError={chkOTPError}
                    />

                    {/* <TextInput placeholder='Enter otp' onChangeText={text => { setOtp() }} value={otp} /> */}
                  </View>
                  {seconds > 0 || minutes > 0 ? (
                    <View style={styles.noReceivecodeView}>
                      <Text style={styles.noReceiveText}>
                        Time Remaining: {minutes < 10 ? `0${minutes}` : minutes}
                        :{seconds < 10 ? `0${seconds}` : seconds}
                      </Text>
                    </View>
                  ) : (
                    <View style={styles.noReceivecodeView}>
                      <TouchableOpacity onPress={() => ResendOTP(number)}>
                        <Text style={styles.resendOtp}>Resend OTP</Text>
                      </TouchableOpacity>
                    </View>
                  )}
                  <Button
                    title={'Submit'}
                    titleStyle={{}}
                    buttonStyle={{
                      height: 50,
                      backgroundColor: Color.primary,
                      borderRadius: 10,
                      marginVertical: 10,
                      fontFamily: Poppins.Light,
                    }}
                    onPress={() => {
                      VerifyOTP(navigation);
                    }}
                    loading={loading}
                  />
                </View>
              </View>
            </View>
          </Modal>
        ) : (
          <Modal
            transparent={true}
            animationType="slide"
            visible={login}
            onRequestClose={() => {
              setOTPVisible(false);
            }}
            style={{alignItems: 'center', justifyContent: 'center'}}>
            <View
              style={{
                flex: 1,
                backgroundColor: Color.transparantBlack,
                // alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Pressable
                style={{flex: 1, backgroundColor: Color.transparantBlack}}
                onPress={() => {
                  setLogin(false);
                  setNumber('');
                }}
              />
              <View
                style={{
                  backgroundColor: Color.white,
                  padding: 10,
                  borderTopLeftRadius: 10,
                  borderTopRightRadius: 10,
                }}>
                <View
                  style={{
                    width: '100%',
                    justifyContent: 'flex-end',
                    alignItems: 'flex-end',
                    top: 0,
                  }}>
                  <TouchableOpacity onPress={() => setLogin(false)}>
                    <Iconviewcomponent
                      Icontag={'AntDesign'}
                      iconname={'closecircle'}
                      icon_size={26}
                      icon_color={'black'}
                    />
                  </TouchableOpacity>
                </View>
                <View
                  style={{
                    alignItems: 'center',
                  }}>
                  <Image
                    source={{uri: Media.logo}}
                    style={{width: 100, height: 100, resizeMode: 'contain'}}
                  />
                </View>
                <Text style={styles.title}>Login</Text>
                <Text style={styles.subtitle}>
                  Please give your mobile number to Get Started
                </Text>
                <View style={styles.inputContainer}>
                  <TextInput
                    placeholder="Mobile Number"
                    placeholderTextColor={Color.black}
                    value={number}
                    keyboardType="phone-pad"
                    maxLength={10}
                    onChangeText={number => {
                      chkNumber(number);
                    }}
                    autoFocus={number.length == 10 ? false : true}
                    style={styles.input}
                  />
                </View>
                {error ? <Text style={styles.error}>{error}</Text> : null}
                <Button
                  title="Submit"
                  buttonStyle={styles.button}
                  onPress={verifyLoginData}
                />
                <Text
                  style={{
                    fontFamily: Poppins.Medium,
                    fontSize: 14,
                    textAlign: 'center',
                    color: Color.black,
                    marginVertical: 20,
                  }}>
                  (or)
                </Text>
                <View
                  style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginVertical: 10,
                  }}>
                  <Button
                    title={'Login With Google'}
                    titleStyle={{
                      width: '85%',
                      color: Color.cloudyGrey,
                      fontSize: 14,
                      fontFamily: Poppins.SemiBold,
                    }}
                    icon={() => (
                      <Image
                        source={{uri: Media.googlebg}}
                        style={{width: 30, height: 30}}
                      />
                    )}
                    onPress={() => {
                      googleSignIn(navigation);
                    }}
                    buttonStyle={{
                      marginVertical: 10,
                      backgroundColor: Color.white,
                      borderColor: Color.cloudyGrey,
                      borderWidth: 1,
                    }}
                  />
                </View>
              </View>
            </View>
          </Modal>
        )}
      </View>
      {/* </DismissKeyboard> */}
    </KeyboardAvoidingView>
  );
};

export default BottomLogin;
const styles = StyleSheet.create({
  modalContainer: {
    backgroundColor: Color.white,
    padding: 10,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  title: {
    fontFamily: Poppins.SemiBold,
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'left',
    color: Color.black,
    marginRight: 10,
    marginVertical: 10,
  },
  subtitle: {
    fontFamily: Poppins.Medium,
    fontSize: 14,
    textAlign: 'left',
    color: Color.cloudyGrey,
    marginRight: 10,
  },
  inputContainer: {
    marginVertical: 30,
    borderColor: Color.cloudyGrey,
    borderWidth: 1,
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 5,
  },
  input: {
    flex: 1,
    height: 50,
    color: Color.black,
    fontSize: 14,
    padding: 5,
    fontFamily: Poppins.SemiBold,
    alignItems: 'flex-start',
  },
  error: {
    fontSize: 12,
    fontFamily: Poppins.SemiBold,
    color: Color.red,
    textAlign: 'left',
    marginTop: 10,
  },
  button: {
    backgroundColor: Color.primary,
    borderRadius: 5,
    height: 50,
  },
  otpInputView: {
    marginVertical: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  noReceivecodeView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginVertical: 15,
    marginRight: 10,
  },
  noReceiveText: {
    color: Color.black,
    fontSize: 12,
    fontFamily: Poppins.SemiBold,
  },
  resendOtp: {
    color: Color.primary,
    fontSize: 14,
    fontFamily: Poppins.SemiBold,
    fontWeight: 'bold',
    textDecorationLine: 'underline',
    textAlign: 'right',
  },
  invalidLogin: {
    fontSize: 14,
    fontFamily: Poppins.SemiBold,
    color: Color.red,
    textAlign: 'center',
  },
});
