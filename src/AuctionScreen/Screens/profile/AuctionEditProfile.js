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
  Image,
  StatusBar,
  TouchableOpacity,
  ScrollView,
  Dimensions,
} from 'react-native';

import { primarycolor } from '../../../Utils/Colors';
import Color from '../../../Config/Color';
import { Media } from '../../../Global/Media';
import { Poppins } from '../../../Global/FontFamily';
import { Iconviewcomponent } from '../../../Components/Icontag';
import NetInfo from '@react-native-community/netinfo';
import { useNavigation } from '@react-navigation/native';
import { useSelector, useDispatch } from 'react-redux';
import common_fn from '../../../Config/common_fn';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { baseUrl } from '../../../Config/base_url';

var { width, height } = Dimensions.get('screen');

// create a component
const AuctionEditProfile = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [netInfo_State, setNetinfo] = useState(true);

  const data = useSelector(
    state => state.UserReducer.auctionUserData,
  );

  const [loading, setLoading] = useState(false);
  const [Username, setUsername] = useState("");
  const [errorUsername, setErrorUsername] = useState('');
  const [number, setNumber] = useState("");
  const [error, setError] = useState(false);
  const [Usermail, setUsermail] = useState("");
  const [address, setAddress] = useState("");
  const [emailValidError, setEmailValidError] = useState('');
  const [userData, setUserData] = useState({});
  const [refreshProfile, setRefreshProfile] = useState(false);

  useEffect(() => {
    if (userData) {
      setUsername(userData?.name || "");
      setUsermail(userData?.email || "");
      setNumber(userData?.phone_number || "");
      setAddress(userData?.address || "");
    }
  }, [userData]); // Run when `data` changes

  useEffect(() => {
    if (data?.id) {
      profileShowData();
      setLoading(true);
      const interval = setTimeout(() => {
        setLoading(false);
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [data, refreshProfile]);



  const profileShowData = () => {
    try {
      const requestOptions = {
        method: "GET",
        redirect: "follow"
      };
      fetch(`${baseUrl}api/user/get_user?user_id=${data?.id}&status=activated`, requestOptions)
        .then((response) => response.json())
        .then((result) => {
          if (result?.status === true) {
            setUserData(result?.data)
          } else {
            common_fn.showToast(result?.message);
          }
          // console.log("Profile Data =========== :", result.data);
        })
        .catch((error) => console.error("catch in profileShowData_Api :", error));
    } catch (error) {
      console.log("catch in profileShow_Data:", error);
    }
  }

  function changeUsername(text) {
    try {
      let Username = text;
      if (Username == '') {
        setUsername(Username);
        // setErrorUsername('Enter the name');
      } else {
        // setUsername(Username);
        setErrorUsername('Enter the name');
      }
    } catch (error) {
      console.log('catch in profile change_Username :' + error);
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
      // var updatedata = {
      //   user_id: data?.id,
      //   name: Username,
      //   phone_number: number,
      //   email: Usermail,
      //   address: address,
      // };
      if (Username != '' && Usermail != '' && number != '' && address != '') {
        // console.log("Success ================== :", Username + "   " + Usermail + "   " + number + "   " + address);


        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        const raw = JSON.stringify({
          "user_id": userData?.user_id,
          "name": Username,
          "email": Usermail,
          "phone_number": number,
          "address": address
        });

        const requestOptions = {
          method: "PUT",
          headers: myHeaders,
          body: raw,
          redirect: "follow"
        };

        fetch(`${baseUrl}api/user/edit_user`, requestOptions)
          .then((response) => response.json())
          .then(async (result) => {
            if (result?.status === true) {
              // setUserData(result?.data)
              const UserLogin = {
                ...result?.data,
              };
              await AsyncStorage.setItem('action_user_data', JSON.stringify(UserLogin),);

              // //  Update userData state so UI refreshes
              // setUserData(prevState => ({
              //   ...prevState,
              //   name: Username,
              //   email: Usermail,
              //   phone_number: number,
              //   address: address
              // }));
              common_fn.showToast(result?.message);
              navigation.navigate("AuctionProfile");
              setRefreshProfile(prev => !prev); // Toggle value to trigger useEffect
            }
            else {
              common_fn.showToast(result?.message);
            }
          })
          .catch((error) => console.error("catch in update_profile_api:", error));
        // alert('Success');
      } else {
        common_fn.showToast("Please enter all mandatory fields")
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
            // marginVertical: 20,
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
        {loading ? (
          <View
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              height: height,
            }}>
            <Image
              source={{ uri: Media.loader }}
              style={{ width: 80, height: 80, resizeMode: 'contain' }}
            />
          </View>
        ) : (
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
                Username *
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
                  onChangeText={text => setUsername(text)} 
                  keyboardType="name-phone-pad"
                  returnKeyType={'next'}
                  style={{
                    width: '90%',
                    color: 'black',
                    fontFamily: Poppins.Medium,
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
                Email address *
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
                  value={Usermail}  // ✅ Use state
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
                    fontFamily: Poppins.Medium,
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
                Phone Number *
              </Text>
              <View style={[styles.NumberBoxConatiner11]}>
                <Text style={styles.numberCountryCode}>+91</Text>
                <TextInput
                
                  placeholder="Enter your phone number"
                  placeholderTextColor={Color.cloudyGrey}
                  value={number}  // ✅ Use state
                  keyboardType="phone-pad"
                  maxLength={10}
                  returnKeyType={'next'}
                  onChangeText={num => {
                    setNumber(num);
                    chkNumberError(num);
                  }}
                  editable={false}
                  style={styles.numberTextBox}
                />
                <View style={{ paddingHorizontal: 10 }}>
                  <Iconviewcomponent
                    Icontag={'Entypo'}
                    iconname={'phone'}
                    icon_size={26}
                    icon_color={'black'}
                  />
                </View>
              </View>
            </View>
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
                Address *
              </Text>
              <View style={{
                width: '100%',
                alignItems: 'center',
              }}>
                <TextInput
                  placeholder="Enter your address"
                  placeholderTextColor={Color.cloudyGrey}
                  multiline={true}
                  value={address}  // ✅ Use state
                  onChangeText={value => setAddress(value)}
                  keyboardType="name-phone-pad"
                  returnKeyType={'done'}
                  style={{
                    width: '100%',
                    color: 'black',
                    fontSize: 14,
                    fontFamily: Poppins.Medium,
                    paddingHorizontal: 10,
                    height: 110,
                    maxHeight: 150,
                    textAlignVertical: 'top',
                    borderWidth: 1,
                    borderColor: Color.cloudyGrey,
                    borderRadius: 5,
                  }}
                />
              </View>
            </View>

            <TouchableOpacity
              onPress={() => updateProfile()}
              style={{
                width: '95%',
                height: 45,
                marginVertical: 20,
                backgroundColor: primarycolor,
                borderRadius: 5,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text style={{ fontSize: 16, color: 'white', fontFamily: Poppins.Medium,}}>Update</Text>
            </TouchableOpacity>
          </View>
        )}
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
    borderColor: Color.cloudyGrey,
    borderWidth: 1,
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
    borderRadius: 5,
    backgroundColor: 'white',
  },
  NumberBoxConatiner11: {
    width: '100%',
    borderColor: Color.cloudyGrey,
    borderWidth: 1,
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
    borderRadius: 5,
    backgroundColor: Color.lightgrey,
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
    fontFamily: Poppins.Medium,
  },
});

//make this component available to the app
export default AuctionEditProfile;
