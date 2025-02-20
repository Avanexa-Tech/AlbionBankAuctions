import React, { useEffect, useRef, useState } from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Platform,
  ScrollView,
  TouchableWithoutFeedback,
  Keyboard,
  PermissionsAndroid,
} from 'react-native';
import Color from '../../Config/Color';
import { Media } from '../../Global/Media';
import OTPInput from '../../Components/OTPInput';
import { Button } from 'react-native-elements';
import common_fn from '../../Config/common_fn';
import fetchData from '../../Config/fetchData';
import AsyncStorage from '@react-native-async-storage/async-storage';
import messaging from '@react-native-firebase/messaging';
import RNOtpVerify from 'react-native-otp-verify';
import { Poppins } from '../../Global/FontFamily';

const DismissKeyboard = ({ children }) => (
  <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
    {children}
  </TouchableWithoutFeedback>
);

const NumberVerify = ({ navigation, route }) => {
  const [user_id] = useState(route.params.user_id);
  const [data] = useState(route.params.data);
  const inputRef = useRef();
  const [otpCode, setOTPCode] = useState('');
  const [isPinReady, setIsPinReady] = useState(false);
  const [error, setError] = useState(false);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(30);

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

  const ResendOTP = async () => {
    setSeconds(30);
    const ResendOtpVerify = await fetchData.Auction_forgot_password(data);
    if (ResendOtpVerify) {
      if (Platform.OS === 'android') {
        common_fn.showToast('OTP Sent Successfully');
      } else {
        alert('OTP Sent Successfully')
      }
    } else {
      if (Platform.OS === 'android') {
        common_fn.showToast(ResendOtpVerify?.message);
      } else {
        alert(ResendOtpVerify?.message)
      }
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

  const VerifyOTP = async navigation => {
    if (otpCode.length == 4) {
      const VerifyOTP = await fetchData.Auction_contact_verify({
        user_id: user_id,
        user_data: otpCode,
      });
      if (VerifyOTP?.message == 'Success') {
        navigation.navigate('updatepassword', { user_id });
        if (Platform.OS === 'android') {
          common_fn.showToast(VerifyOTP?.message);
        } else {
          alert(VerifyOTP?.message)
        }

      } else {
        setOTPCode('');
        inputRef.current.focus();
        var msg = VerifyOTP?.message;
        setError(msg);
      }
    } else {
      if (Platform.OS === 'android') {
        common_fn.showToast('Invalid OTP Code Please Enter Your 4 Digit OTP Code');
      } else {
        alert('Invalid OTP Code Please Enter Your 4 Digit OTP Code')
      }

    }
  };
  useEffect(() => {
    const requestSMSPermission = async () => {
      try {
        if (Platform.OS === 'android') {
          const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.READ_SMS,
            {
              title: 'SMS Permission',
              message: 'This app needs access to your SMS messages.',
            },
          );
          if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            startListeningForOtp();
          } else {
            console.log('SMS permission denied');
          }
        }
      } catch (err) {
        console.warn(err);
      }
    };

    requestSMSPermission();
  }, []);

  useEffect(() => {
    if (Platform.OS === 'android') {
      RNOtpVerify.getHash()
        .then(e => console.log('hash', e))
        .catch(e => console.log(e));
      startListeningForOtp();
    }
  }, []);

  const otpHandler = message => {
    try {
      const otpMatch = /(\d{4})/g.exec(message);
      if (otpMatch && otpMatch[1]) {
        const otp = otpMatch[1];
        setOTPCode(otp);
        // You can now use the OTP code in your application logic.
      } else {
        console.log('No valid OTP found in the message:', message);
      }
    } catch (e) {
      console.log('Error extracting OTP:', e);
    }
  };

  const startListeningForOtp = () => {
    RNOtpVerify.getOtp()
      .then(
        p => console.log('Received SMS', p),
        RNOtpVerify.addListener(otpHandler.bind(this)),
      )
      .catch(p => console.log('p', p));
  };
  return (
    <ScrollView
      contentContainerStyle={{ justifyContent: 'center', flex: 1 }}
      keyboardShouldPersistTaps="handled">
      <DismissKeyboard>
        <View
          style={{
            flex: 1,
            backgroundColor: Color.white,
            padding: 20,
          }}>
          {/* <View
            style={{
              alignItems: 'center',
              marginVertical: 40,
            }}>
            <Image
              source={Media.logo}
              style={{width: 100, height: 100, resizeMode: 'contain'}}
            />
          </View> */}
          <View
            style={{
              width: '100%',
              alignItems: 'center',
              paddingVertical: 20,
            }}>
            <Image
              source={{ uri: Media.otp }}
              style={{ width: 200, height: 200, resizeMode: 'contain' }}
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
            </View>
            {seconds > 0 || minutes > 0 ? (
              <View style={styles.noReceivecodeView}>
                <Text style={styles.noReceiveText}>
                  Time Remaining: {minutes < 10 ? `0${minutes}` : minutes}:
                  {seconds < 10 ? `0${seconds}` : seconds}
                </Text>
              </View>
            ) : (
              <View style={styles.noReceivecodeView}>
                <TouchableOpacity onPress={() => ResendOTP()}>
                  <Text style={styles.resendOtp}>Resend Otp! </Text>
                </TouchableOpacity>
              </View>
            )}
            <Button
              title={'Verify Number'}
              titleStyle={{}}
              buttonStyle={{
                height: 50,
                backgroundColor: Color.primary,
                borderRadius: 10,
                marginVertical: 10,
              }}
              onPress={() => {
                VerifyOTP(navigation);
              }}
            />
          </View>
        </View>
      </DismissKeyboard>
    </ScrollView>
  );
};

export default NumberVerify;
const styles = StyleSheet.create({
  otpInputView: {
    marginVertical: 10,
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
    fontFamily: 'Poppins-SemiBold',
  },
  resendOtp: {
    color: Color.primary,
    fontSize: 14,
    fontFamily: 'Poppins-SemiBold',
    fontWeight: 'bold',
    textDecorationLine: 'underline',
    textAlign: 'right',
  },
  invalidLogin: {
    fontSize: 14,
    fontFamily: 'Poppins-SemiBold',
    color: Color.red,
    textAlign: 'center',
  },
});
