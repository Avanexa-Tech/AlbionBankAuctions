import React, { useEffect, useState } from 'react';
import {
  Image,
  TouchableWithoutFeedback,
  BackHandler,
  StyleSheet,
  TextInput,
  Keyboard,
  Text,
  TouchableOpacity,
  View,
  Platform,
} from 'react-native';
import { Media } from '../../Global/Media';
import Color from '../../Config/Color';
import { Button } from 'react-native-elements';
import common_fn from '../../Config/common_fn';
import fetchData from '../../Config/fetchData';
import { Poppins } from '../../Global/FontFamily';
import DeviceInfo from 'react-native-device-info';
import { useDispatch, useSelector } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { setActionUserData, setLoginType, setUserData } from '../../Redux';
import FIcon from 'react-native-vector-icons/FontAwesome';
import { useRoute } from '@react-navigation/native';

const DismissKeyboard = ({ children }) => (
  <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
    {children}
  </TouchableWithoutFeedback>
);

const ForgotPassword = ({ navigation }) => {
  const routeName = useRoute();
  const [emailNumber, setEmailNumber] = useState('');
  const [error, setError] = useState(false);

  useEffect(() => {
    const backHandler = BackHandler.addEventListener('hardwareBackPress', handleBackButtonClick);
    return () => backHandler.remove();
  }, [routeName.name, navigation]);

  function handleBackButtonClick() {
    if (routeName.name == "ForgotPassword") {
      navigation.goBack();
      return true;
    }
    return false;
  }


  const chkNumberError = value => {
    let reg = /^[6-9][0-9]*$/;

    if (value.length === 0) {
      setError('Enter Your Email or Mobile Number');
    } else if (reg.test(value) === false) {
      setError(false);
    } else if (reg.test(value) === true) {
      setError('');
    }
  };
  const forgotfn = async () => {
    try {
      var data = {
        phone_number: emailNumber,
      };
      if (emailNumber?.trimStart().trimEnd()) {
        const forgot_password = await fetchData.Auction_forgot_password(data);
        if (forgot_password) {
          navigation.navigate('NumberVerify', {
            user_id: forgot_password?.user,
            data: data,
          });
        } else {
          if (Platform.OS === 'android') {
            common_fn.showToast(forgot_password?.message);
          } else {
            alert(forgot_password?.message)
          }          
        }
      } else {
        if (Platform.OS === 'android') {
          common_fn.showToast('Enter Mobile Number Or Email ID');
        } else {
          alert('Enter Mobile Number Or Email ID')
        } 
       
      }
    } catch (error) {
      console.log('error', error);
    }
  };

  return (
    <DismissKeyboard>
      <View
        style={{
          flex: 1,
          backgroundColor: Color.white,
          padding: 20,
          justifyContent: 'center',
        }}>
        <View
          style={{
            alignItems: 'center',
          }}>
          <Image
            source={{ uri: Media.logo }}
            style={{ width: 100, height: 100, resizeMode: 'contain' }}
          />
        </View>
        <View
          style={{
            marginVertical: 20,
          }}>
          <View style={{ marginVertical: 5 }}>
            <Text
              style={{
                fontFamily: Poppins.Medium,
                fontSize: 14,
                color: Color.cloudyGrey,
                marginVertical: 5,
              }}>
              Email/Enter Mobile Number
            </Text>
            <View style={styles.NumberBoxConatiner}>
              <TextInput
                placeholder="Email/Mobile Number"
                placeholderTextColor={Color.cloudyGrey}
                value={emailNumber}
                onChangeText={value => {
                  setEmailNumber(value);
                  chkNumberError(value);
                }}
                style={styles.numberTextBox}
              />
            </View>
            {error && <Text style={styles.invalidLogin}>{error}</Text>}
          </View>

          <Button
            title={'Forgot Password'}
            titleStyle={{}}
            buttonStyle={{
              backgroundColor: Color.primary,
              borderRadius: 5,
              height: 50,
              marginVertical: 30,
            }}
            onPress={() => {
              forgotfn(navigation);
            }}
          />
        </View>
      </View>
    </DismissKeyboard>
  );
};

export default ForgotPassword;

const styles = StyleSheet.create({
  NumberBoxConatiner: {
    borderColor: Color.cloudyGrey,
    borderWidth: 1,
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 5,
  },
  numberCountryCode: {
    color: Color.cloudyGrey,
    marginHorizontal: 10,
    fontSize: 14,
    fontFamily: Poppins.SemiBold,
  },
  invalidLogin: {
    fontSize: 12,
    fontFamily: Poppins.SemiBold,
    color: Color.red,
    textAlign: 'left',
    marginTop: 10,
  },
  numberTextBox: {
    flex: 1,
    height: 50,
    padding: 10,
    color: Color.black,
    marginVertical: 10,
    fontSize: 12,
    fontFamily: Poppins.Medium,
  },
  RequestView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 30,
  },
  requestTextTitle: {
    color: Color.cloudyGrey,
    fontSize: 15,
    fontFamily: Poppins.SemiBold,
  },
  DemoText: {
    color: Color.primary,
    fontSize: 15,
    fontFamily: Poppins.SemiBold,
    textDecorationLine: 'underline',
    marginStart: 5,
  },
  noInternetText: {
    backgroundColor: Color.black,
    color: Color.white,
    paddingVertical: 10,
    padding: 10,
    borderRadius: 5,
    justifyContent: 'flex-end',
    marginVertical: 10,
    marginHorizontal: 10,
  },
});
