//import liraries
import React, { useState, useRef, useEffect, useLayoutEffect } from 'react';
import {
  StyleSheet,
  Text,
  Animated,
  View,
  TextInput,
  Keyboard,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Image,
  StatusBar,
  TouchableOpacity,
  Alert,
  Platform,
  PermissionsAndroid,
  ScrollView,
} from 'react-native';

import { primarycolor } from '../../../Utils/Colors';
import Color from '../../../Config/Color';
import { Media } from '../../../Global/Media';
import { Poppins } from '../../../Global/FontFamily';
import { Iconviewcomponent } from '../../../Components/Icontag';

import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import NetInfo from '@react-native-community/netinfo';
import { useNavigation } from '@react-navigation/native';
import { useSelector, useDispatch } from 'react-redux';

// create a component
const AuctionEditProfile = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [netInfo_State, setNetinfo] = useState(true);

  const Auction_userData = useSelector(
    state => state.UserReducer.auctionUserData,
  );
  var { id, name, email, phone_number, state, district } = Auction_userData;

  const [Username, setUsername] = useState(name);
  const [errorUsername, setErrorUsername] = useState('');
  const [number, setNumber] = useState(phone_number);
  const [error, setError] = useState(false);
  const [Usermail, setUsermail] = useState(email);
  const [emailValidError, setEmailValidError] = useState('');

  function changeUsername(text) {
    try {
      let Username = text;
      if (Username == '') {
        setUsername(Username);
        setErrorUsername('Enter the name');
      } else {
        setUsername(Username);
        setErrorUsername('');
      }
    } catch (error) {
      console.log('catch in profile change_Username ' + error);
    }
  }

  const handleValidEmail = val => {
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;

    if (val.length === 0) {
      setEmailValidError('Enter email address');
    } else if (reg.test(val) === false) {
      setEmailValidError('Enter valid email address');
    } else if (reg.test(val) === true) {
      setEmailValidError('');
    }
  };

  const chkNumberError = number => {
    let reg = /^[6-9][0-9]*$/;

    if (number.length === 0) {
      setError('Enter mobile number');
    } else if (reg.test(number) === false) {
      setError(false);
      setError(false);
    } else if (reg.test(number) === true) {
      setError('');
    }
  };

  const chkNumber = number => {
    setNumber(number);
    if (number.length == 10) {
      Keyboard.dismiss();
    }
  };

  const updateProfile = async () => {
    try {
      // var data = {
      //     user_id: user_id,
      //     username: Username,
      //     mobile_number: number,
      //     email: Usermail,
      //     user_type_id: currentStatus?.value,
      // };
      if (Username != '' && Usermail != '' && number != '') {
        alert('Success');
      } else {
        setErrorUsername('Enter the name');
        setEmailValidError('Enter email address');
        setError('Enter mobile number');
      }
    } catch (error) {
      console.log('catch in update_Profile :', error);
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            marginVertical: 20,
          }}>
          <View
            style={{
              backgroundColor: '#f3f3f3',
              borderRadius: 100,
            }}>
            <Image
              source={{ uri: Media.Userpng }}
              style={{
                width: 130,
                height: 130,
                resizeMode: 'contain',
              }}
            />
          </View>
        </View>
        <View
          style={{
            flex: 1,
            justifyContent: 'flex-start',
            alignItems: 'center',
          }}>
          <View
            style={{
              width: '95%',
              marginVertical: 10,
            }}>
            <Text
              style={{
                fontSize: 14,
                color: 'black',
                fontFamily: Poppins.Regular,
                textAlign: 'left',
              }}
              numberOfLines={1}>
              Username
            </Text>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                height: 50,
                marginTop: 5,
                backgroundColor: 'white',
                borderWidth: 1,
                borderColor: Color.cloudyGrey,
                borderRadius: 5,
              }}>
              <TextInput
                placeholder="Enter your name"
                placeholderTextColor={Color.cloudyGrey}
                multiline={false}
                value={Username}
                onChangeText={text => changeUsername(text)}
                returnKeyType={'next'}
                style={{
                  width: '90%',
                  color: 'black',
                  fontFamily: Poppins.SemiBold,
                  fontSize: 16,
                  paddingHorizontal: 10,
                  flexDirection: 'row',
                }}
              />

              <Iconviewcomponent
                Icontag={'FontAwesome5'}
                iconname={'user-edit'}
                icon_size={20}
                icon_color={'black'}
              />
            </View>
          </View>
          {!Username && (
            <Text
              style={{
                width: '100%',
                fontSize: 12,
                color: 'red',
                marginVertical: 1,
                paddingHorizontal: 10,
              }}>
              {errorUsername}
            </Text>
          )}
          <View
            style={{
              width: '95%',
              marginVertical: 15,
            }}>
            <Text
              style={{
                fontSize: 14,
                color: 'black',
                fontFamily: Poppins.Regular,
                textAlign: 'left',
              }}
              numberOfLines={1}>
              Email address
            </Text>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                height: 50,
                marginTop: 5,
                backgroundColor: 'white',
                borderWidth: 1,
                borderColor: Color.cloudyGrey,
                borderRadius: 5,
              }}>
              <TextInput
                placeholder="Enter your Email"
                placeholderTextColor={Color.cloudyGrey}
                multiline={false}
                value={Usermail}
                onChangeText={value => {
                  setUsermail(value);
                  handleValidEmail(value);
                }}
                keyboardType="email-address"
                returnKeyType={'next'}
                style={{
                  width: '90%',
                  color: 'black',
                  fontSize: 16,
                  fontFamily: Poppins.SemiBold,
                  paddingHorizontal: 10,
                  flexDirection: 'row',
                }}
              />

              <Iconviewcomponent
                Icontag={'MaterialCommunityIcons'}
                iconname={'email-edit'}
                icon_size={26}
                icon_color={'black'}
              />
            </View>
            {emailValidError ? (
              <Text
                style={{
                  width: '100%',
                  fontSize: 12,
                  color: 'red',
                  marginTop: 10,
                  paddingHorizontal: 5,
                }}>
                {emailValidError}
              </Text>
            ) : null}
          </View>
          <View
            style={{
              width: '95%',
              marginVertical: 5,
            }}>
            <Text
              style={{
                fontSize: 14,
                color: 'black',
                fontFamily: Poppins.Regular,
                textAlign: 'left',
              }}
              numberOfLines={1}>
              Phone Number
            </Text>
            <View style={styles.NumberBoxConatiner}>
              <Text style={styles.numberCountryCode}>+91</Text>
              <TextInput
                placeholder="Enter your phone number"
                placeholderTextColor={Color.cloudyGrey}
                value={number}
                keyboardType="phone-pad"
                maxLength={10}
                returnKeyType={'done'}
                onChangeText={number => {
                  chkNumber(number);
                  chkNumberError(number);
                }}
                style={styles.numberTextBox}
              />
            </View>
            {error && <Text style={styles.invalidLogin}>{error}</Text>}
          </View>
          <TouchableOpacity
            onPress={() => updateProfile()}
            disabled={true}
            style={{
              width: '95%',
              height: 45,
              marginVertical: 30,
              backgroundColor: primarycolor,
              borderRadius: 5,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text style={{ fontSize: 16, color: 'white' }}>Update</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: 'white',
  },
  NumberBoxConatiner: {
    width: '100%',
    // flex:1,
    borderColor: Color.cloudyGrey,
    borderWidth: 1,
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
    borderRadius: 5,
    backgroundColor: 'white',
  },
  numberCountryCode: {
    color: Color.cloudyGrey,
    marginHorizontal: 10,
    fontSize: 16,
    fontFamily: 'Poppins-SemiBold',
  },
  invalidLogin: {
    width: '100%',
    fontSize: 12,
    color: 'red',
    marginTop: 5,
  },
  numberTextBox: {
    flex: 1,
    height: 50,
    padding: 10,
    borderLeftColor: Color.cloudyGrey,
    borderLeftWidth: 1,
    color: Color.black,
    marginVertical: 10,
    fontSize: 16,
    fontFamily: Poppins.SemiBold,
  },

  searchSection: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  searchIcon: {
    padding: 10,
  },
  input: {
    flex: 1,
    paddingTop: 10,
    paddingRight: 10,
    paddingBottom: 10,
    paddingLeft: 0,
    backgroundColor: '#fff',
    color: '#424242',
  },
});

//make this component available to the app
export default AuctionEditProfile;
