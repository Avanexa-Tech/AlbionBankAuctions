import React, { useEffect, useState } from 'react';
import {
  Image,
  TouchableWithoutFeedback,
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

const DismissKeyboard = ({ children }) => (
  <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
    {children}
  </TouchableWithoutFeedback>
);

const UpdatePassword = ({ navigation, route }) => {
  const [user_id] = useState(route.params.user_id);
  const [Password, setPassword] = useState('');
  const [ConfirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState(false);
  const [errorPassword, setErrorPassword] = useState(false);
  const [ConfirmErrorPassword, setConfirmErrorPassword] = useState(false);
  const [uniqueId, setUniqueId] = useState(false);
  const [userInfo, setUserInfo] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [ConfirmpasswordVisible, setConfirmPasswordVisible] = useState(false);

  const chkPassword = value => {
    let reg = /^[6-9][0-9]*$/;

    if (value.length === 0) {
      setErrorPassword('Enter Your Password');
    } else if (reg.test(value) === false) {
      setErrorPassword(false);
    } else if (reg.test(value) === true) {
      setErrorPassword('');
    }
  };
  const chkConfirmPassword = value => {
    let reg = /^[6-9][0-9]*$/;

    if (value.length === 0) {
      setConfirmErrorPassword('Enter Your Password');
    } else if (reg.test(value) === false) {
      setConfirmErrorPassword(false);
    } else if (reg.test(value) === true) {
      setConfirmErrorPassword('');
    }
  };
  const changePassword = async () => {
    try {
      var data = {
        user_id: user_id,
        password: Password,
        cpwd: ConfirmPassword,
      };
      if (Password != '' && ConfirmPassword != '') {
        const updatepassword = await fetchData.Auction_update_password(data);
        if (updatepassword?.message == "Updated successfully") {
          navigation.replace('ActionLogin');
          // navigation.replace('LoginWithEmail')
          if (Platform.OS === 'android') {
            common_fn.showToast(updatepassword?.message);
          } else {
            alert(updatepassword?.message)
          }
        } else {
          if (Platform.OS === 'android') {
            common_fn.showToast(updatepassword?.message);
          } else {
            alert(updatepassword?.message)
          }
        }
      } else {
        if (Platform.OS === 'android') {
          common_fn.showToast('Invalid Mobile Number Or Email ID');
        } else {
          alert('Invalid Mobile Number Or Email ID')
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
          <Text
            style={{
              fontFamily: 'Poppins-SemiBold',
              fontSize: 20,
              fontWeight: 'bold',
              textAlign: 'left',
              color: Color.black,
              marginRight: 10,
              marginVertical: 10,
            }}>
            Change Your Password
          </Text>
          <View style={{ marginVertical: 5 }}>
            <Text
              style={{
                fontFamily: Poppins.Medium,
                fontSize: 14,
                color: Color.cloudyGrey,
                marginVertical: 5,
              }}>
              Password
            </Text>
            <View style={styles.NumberBoxConatiner}>
              <TextInput
                placeholder="Enter Password"
                placeholderTextColor={Color.cloudyGrey}
                value={Password}
                onChangeText={value => {
                  setPassword(value);
                  chkPassword(value);
                }}
                textContentType="password"
                secureTextEntry={!passwordVisible}
                style={styles.numberTextBox}
              />
              <TouchableOpacity
                onPress={() => setPasswordVisible(!passwordVisible)}
                style={{ position: 'absolute', right: 20 }}>
                <FIcon
                  name={passwordVisible ? 'eye' : 'eye-slash'}
                  color={Password?.length > 0 ? Color.black : Color.white}
                  size={20}
                />
              </TouchableOpacity>
            </View>
            {errorPassword && (
              <Text style={styles.invalidLogin}>{errorPassword}</Text>
            )}
          </View>
          <View style={{ marginVertical: 5 }}>
            <Text
              style={{
                fontFamily: Poppins.Medium,
                fontSize: 14,
                color: Color.cloudyGrey,
                marginVertical: 5,
              }}>
              Confirm Password
            </Text>
            <View style={styles.NumberBoxConatiner}>
              <TextInput
                placeholder="Enter Confirm Password"
                placeholderTextColor={Color.cloudyGrey}
                value={ConfirmPassword}
                onChangeText={value => {
                  setConfirmPassword(value);
                  chkConfirmPassword(value);
                }}
                textContentType="password"
                secureTextEntry={!ConfirmpasswordVisible}
                style={styles.numberTextBox}
              />
              <TouchableOpacity
                onPress={() =>
                  setConfirmPasswordVisible(!ConfirmpasswordVisible)
                }
                style={{ position: 'absolute', right: 20 }}>
                <FIcon
                  name={ConfirmpasswordVisible ? 'eye' : 'eye-slash'}
                  color={
                    ConfirmPassword?.length > 0 ? Color.black : Color.white
                  }
                  size={20}
                />
              </TouchableOpacity>
            </View>
            {ConfirmpasswordVisible && (
              <Text style={styles.invalidLogin}>{ConfirmpasswordVisible}</Text>
            )}
          </View>
          <Button
            title={'Change Password'}
            titleStyle={{}}
            buttonStyle={{
              backgroundColor: Color.primary,
              borderRadius: 5,
              height: 50,
              marginVertical: 30,
            }}
            onPress={() => {
              changePassword(navigation);
            }}
          />
        </View>
      </View>
    </DismissKeyboard>
  );
};

export default UpdatePassword;

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
