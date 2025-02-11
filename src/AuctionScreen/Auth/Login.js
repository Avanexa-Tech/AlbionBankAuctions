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
import { GoogleSignin } from '@react-native-google-signin/google-signin';

const DismissKeyboard = ({ children }) => (
  <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
    {children}
  </TouchableWithoutFeedback>
);

// const LoginScreen = ({ navigation }) => {
//   const routeName = useRoute();
//   const [emailNumber, setEmailNumber] = useState('');
//   const [Password, setPassword] = useState('');
//   const [error, setError] = useState(false);
//   const [errorPassword, setErrorPassword] = useState(false);
//   const [uniqueId, setUniqueId] = useState(false);
//   const [userInfo, setUserInfo] = useState(false);
//   const [passwordVisible, setPasswordVisible] = useState(false);
//   const userData = useSelector(state => state.UserReducer.userData);
//   var { user_id, username, mobile_number } = userData;

//   const dispatch = useDispatch();
//   useEffect(() => {
//     DeviceInfo.getUniqueId().then(uniqueId => {
//       setUniqueId(uniqueId);
//     });
//   }, [uniqueId]);

//   function handleBackButtonClick() {
//     if (routeName.name == "ActionLogin") {
//       navigation.replace('ActionSelect');
//       return true;
//     }
//     return false;
//   }

//   useEffect(() => {
//     const backHandler = BackHandler.addEventListener('hardwareBackPress', handleBackButtonClick);
//     return () => backHandler.remove();
//   }, [routeName.name, navigation]);

//   const chkNumberError = value => {
//     let reg = /^[6-9][0-9]*$/;

//     if (value.length === 0) {
//       setError('Enter Your Email or Mobile Number');
//     } else if (reg.test(value) === false) {
//       setError(false);
//     } else if (reg.test(value) === true) {
//       setError('');
//     }
//   };
//   const chkPassword = value => {
//     let reg = /^[6-9][0-9]*$/;

//     if (value.length === 0) {
//       setErrorPassword('Enter Your Password');
//     } else if (reg.test(value) === false) {
//       setErrorPassword(false);
//     } else if (reg.test(value) === true) {
//       setErrorPassword('');
//     }
//   };
//   const login = async (navigation) => {
//     try {
//       var data = {
//         username: "8428084814",
//         password: "suhail@123",
//       };
//       if (emailNumber?.trimStart().trimEnd() && Password != '') {
//         const Auction_login = await fetchData.Auction_login(data);
//         // console.log("Login ============= ", Auction_login)

//         if (Auction_login?.isLoggedin == true) {
//           dispatch(setActionUserData(Auction_login?.user));
//           dispatch(setLoginType('Auction'));
//           await AsyncStorage.setItem(
//             'action_user_data',
//             JSON.stringify(Auction_login?.user),
//           );
//           await AsyncStorage.setItem(
//             'action_login_type',
//             JSON.stringify({ login_type: 'Auction' }),
//           );
//           navigation.replace('ActionHome', Auction_login?.user);
//           if (Platform.OS === 'android') {
//             common_fn.showToast(Auction_login?.message);
//           } else {
//             alert(Auction_login?.message)
//           }

//         } else {
//           if (Platform.OS === 'android') {
//             common_fn.showToast(Auction_login?.message);
//           } else {
//             alert(Auction_login?.message)
//           }
//         }
//       } else {
//         if (Platform.OS === 'android') {
//           common_fn.showToast('Invalid Mobile Number Or Email ID');
//         } else {
//           alert('Invalid Mobile Number Or Email ID')
//         }
//       }
//     } catch (error) {
//       console.log('error', error);
//     }
//   };

//   return (
//     // <DismissKeyboard>
//     <View
//       style={{
//         flex: 1,
//         backgroundColor: Color.white,
//         padding: 20,
//         justifyContent: 'center',
//       }}>
//       <View
//         style={{
//           alignItems: 'center',
//         }}>
//         <Image
//           source={{ uri: Media.logo }}
//           style={{ width: 100, height: 100, resizeMode: 'contain' }}
//         />
//       </View>
//       <View
//         style={{
//           marginVertical: 20,
//         }}>
//         <Text
//           style={{
//             fontFamily: 'Poppins-SemiBold',
//             fontSize: 20,
//             fontWeight: 'bold',
//             textAlign: 'left',
//             color: Color.black,
//             marginRight: 10,
//             marginVertical: 10,
//           }}>
//           Login to your Account
//         </Text>
//         <View style={{ marginVertical: 5 }}>
//           <Text
//             style={{
//               fontFamily: Poppins.Medium,
//               fontSize: 14,
//               color: Color.cloudyGrey,
//               marginVertical: 5,
//             }}>
//             Email/Enter Mobile Number
//           </Text>
//           <View style={styles.NumberBoxConatiner}>
//             <TextInput
//               placeholder="Enter your Mobile Number"
//               placeholderTextColor={Color.cloudyGrey}
//               value={emailNumber}
//               onChangeText={value => {
//                 setEmailNumber(value);
//                 // chkNumberError(value);
//               }}
//               maxLength={10}
//               style={styles.numberTextBox}
//             />
//           </View>
//           {error && <Text style={styles.invalidLogin}>{error}</Text>}
//         </View>
//         <View style={{ marginVertical: 5 }}>
//           <Text
//             style={{
//               fontFamily: Poppins.Medium,
//               fontSize: 14,
//               color: Color.cloudyGrey,
//               marginVertical: 5,
//             }}>
//             Password
//           </Text>
//           <View style={styles.NumberBoxConatiner}>
//             <TextInput
//               placeholder="Enter your Password"
//               placeholderTextColor={Color.cloudyGrey}
//               value={Password}
//               onChangeText={value => {
//                 setPassword(value);
//                 chkPassword(value);
//               }}
//               textContentType="password"
//               secureTextEntry={!passwordVisible}
//               style={styles.numberTextBox}
//             />
//             <TouchableOpacity
//               onPress={() => setPasswordVisible(!passwordVisible)}
//               style={{ position: 'absolute', right: 20 }}>
//               <FIcon
//                 name={passwordVisible ? 'eye' : 'eye-slash'}
//                 color={Password?.length > 0 ? Color.black : Color.white}
//                 size={20}
//               />
//             </TouchableOpacity>
//           </View>
//           {errorPassword && (
//             <Text style={styles.invalidLogin}>{errorPassword}</Text>
//           )}
//         </View>
//         <TouchableOpacity
//           onPress={() => {
//             navigation.navigate('ForgotPassword');
//           }}>
//           <Text
//             style={{
//               fontFamily: Poppins.Medium,
//               fontSize: 14,
//               color: Color.primary,
//               marginVertical: 10,
//               textAlign: 'right',
//               textDecorationLine: 'underline',
//             }}>
//             Forgot Password ?
//           </Text>
//         </TouchableOpacity>
//         <Button
//           title={'Login'}
//           titleStyle={{}}
//           buttonStyle={{
//             backgroundColor: Color.primary,
//             borderRadius: 5,
//             height: 50,
//           }}
//           onPress={() => {
//             login(navigation);
//           }}
//         />
//         <View style={styles.RequestView}>
//           <Text style={styles.requestTextTitle}>Don’t have an account?</Text>
//           <TouchableOpacity
//             onPress={() => navigation.navigate('ActionRegister')}>
//             <Text style={styles.DemoText}>Sign up</Text>
//           </TouchableOpacity>
//         </View>
//       </View>
//     </View>
//     // </DismissKeyboard>
//   );
// };


const LoginScreen = ({ navigation }) => {
  const routeName = useRoute();
  const [number, setNumber] = useState('');
  const [error, setError] = useState(false);
  const [uniqueId, setUniqueId] = useState(false);
  const [userInfo, setUserInfo] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    try {
      GoogleSignin.configure({
        scopes: ['email', 'profile'],
        webClientId: '1071623549220-vgptladnqlmd7uamrbit97mi6tnta037.apps.googleusercontent.com',
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

  const chkNumber = number => {
    setNumber(number);
    if (number.length == 10) {
      Keyboard.dismiss();
    }
  };

  useEffect(() => {
    DeviceInfo.getUniqueId().then(uniqueId => {
      setUniqueId(uniqueId);
    });
  }, [uniqueId]);

  function handleBackButtonClick() {
    if (routeName.name == "ActionLogin") {
      // navigation.replace('ActionLogin');
      BackHandler.exitApp();
      return true;
    }
    return false;
  }

  useEffect(() => {
    const backHandler = BackHandler.addEventListener('hardwareBackPress', handleBackButtonClick);
    return () => backHandler.remove();
  }, [routeName.name, navigation]);

  const chkNumberError = number => {
    let reg = /^[6-9][0-9]*$/;

    if (number.length === 0) {
      setError('Enter Your Mobile Number');
    } else if (reg.test(number) === false) {
      setError(false);
      setError(false);
    } else if (reg.test(number) === true) {
      setError('');
    }
  };

  const login = async () => {
    try {
      setLoading(true);
      if (number.length == 10) {
        const login = await fetchData.Auction_OTPlogin({
          phone_number: number
        });
        console.log("login ================= :", login);

        var { message, status } = login;
        console.log("login",login);
        
        if (message == "Success") {
          if (Platform.OS === 'android') {
            common_fn.showToast('OTP Sent Successfully');
          } else {
            alert("OTP Sent Successfully")
          }
          navigation.navigate('AuctionOTPScreen', { number });
          setLoading(false);
        } else {
          var msg = message;
          setError(msg);
          common_fn.showToast(message);
          setLoading(false);
        }
      } else {
        if (Platform.OS === 'android') {
          common_fn.showToast('Invalid Phone Number, Please Enter Your 10 Digit Phone Number');
        } else {
          alert("Invalid Phone Number, Please Enter Your 10 Digit Phone Number")
        }
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      console.log("catch in  login_catch ================= :", error);
    }
  };

  async function requestSMSPermission() {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.READ_SMS,
        {
          title: 'SMS Permission',
          message: 'This app needs access to your SMS messages to verify OTP.',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        login(navigation);
      } else {
        console.log('SMS permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  }

  const signIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
    } catch (error) {
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

  const getInfoFromToken = token => {
    const PROFILE_REQUEST_PARAMS = {
      fields: {
        string: 'id, name,  first_name, last_name',
      },
    };
    const profileRequest = new GraphRequest(
      '/me',
      { token, parameters: PROFILE_REQUEST_PARAMS },
      (error, result) => {
        if (error) {
          console.log('login info has error: ' + error);
        } else {
          setUserInfo(result);
        }
      },
    );
    new GraphRequestManager().addRequest(profileRequest).start();
  };

  // const loginWithFacebook = () => {
  //   // Attempt a login using the Facebook login dialog asking for default permissions.
  //   LoginManager.logInWithPermissions(['public_profile']).then(
  //     login => {
  //       if (login.isCancelled) {
  //         console.log('Login cancelled');
  //       } else {
  //         AccessToken.getCurrentAccessToken().then(data => {
  //           const accessToken = data.accessToken.toString();
  //           getInfoFromToken(accessToken);
  //         });
  //       }
  //     },
  //     error => {
  //       console.log('Login fail with error: ' + error);
  //     },
  //   );
  // };
  return (
    <DismissKeyboard>
      <View style={{
        flex: 1,

      }}>
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
              style={{ width: 120, height: 120, resizeMode: 'contain' }}
            />
          </View>
          <View
            style={{
              marginVertical: 20,
            }}>
            <Text
              style={{
                fontFamily: 'Poppins-SemiBold',
                fontSize: 18,
                fontWeight: 'bold',
                textAlign: 'left',
                color: Color.black,
                marginRight: 10,
                marginVertical: 10,
              }}>
              Login
            </Text>
            <Text
              style={{
                fontFamily: Poppins.Medium,
                fontSize: 12,
                textAlign: 'left',
                color: Color.cloudyGrey,
                marginRight: 10,
              }} numberOfLines={2}>
              Please give your whatsapp mobile number to Get Started
            </Text>
            <View style={{ marginVertical: 20 }}>
              <View style={styles.NumberBoxConatiner}>
                <Text style={styles.numberCountryCode}>+91</Text>
                <TextInput
                  placeholder="Mobile Number"
                  placeholderTextColor={Color.black}
                  value={number}
                  keyboardType="phone-pad"
                  maxLength={10}
                  autoFocus={number.length == 10 ? false : true}
                  onChangeText={number => {
                    chkNumber(number);
                    chkNumberError(number);
                  }}
                  style={styles.numberTextBox}
                />
              </View>
              {error && <Text style={styles.invalidLogin}>{error}</Text>}
            </View>
            <Button
              title={'Submit'}
              titleStyle={{ fontSize: 14, }}
              buttonStyle={{
                backgroundColor: Color.primary,
                borderRadius: 5,
                height: 50, marginVertical: 10
              }}
              onPress={() => {
                login(navigation);
                // requestSMSPermission();
              }}
              loading={loading}
            />
          </View>
          {/* <Text
          style={{
            fontFamily: Poppins.Medium,
            fontSize: 14,
            textAlign: 'center',
            color: Color.black,
            marginVertical: 20,
          }}>
          Or Sign Up With
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
              <Image source={Media.googlebg} style={{width: 30, height: 30}} />
            )}
            onPress={() => signIn()}
            buttonStyle={{
              marginVertical: 10,
              backgroundColor: Color.white,
              borderColor: Color.cloudyGrey,
              borderWidth: 1,
            }}
          />
        </View> */}

          <View style={styles.RequestView}>
            <Text style={styles.requestTextTitle}>Don’t have an account?</Text>
            <TouchableOpacity
              onPress={() => navigation.navigate('ActionRegister')}>
              <Text style={styles.DemoText}>Sign up</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.RequestView}>
          <Text
            style={{
              fontSize: 12,
              color: '#666',
              fontFamily: Poppins.Medium,
              textAlign: "center",
              paddingHorizontal: 10
            }}>
            Copyright @ 2025 Albion Investments and Holdings Pvt Ltd - All Rights Reserved
          </Text>
        </View>

      </View>
    </DismissKeyboard>
  );
};



export default LoginScreen;

const styles = StyleSheet.create({
  NumberBoxConatiner: {
    display: "flex",
    borderColor: Color.cloudyGrey,
    borderWidth: 1,
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 5,
  },
  numberCountryCode: {
    color: Color.black,
    marginHorizontal: 10,
    fontSize: 12,
    fontFamily: Poppins.SemiBold,
    textAlign: "center",
    alignItems: "center",
    padding: 5,
    paddingTop: 7,
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
    display: "flex",
    height: 50,
    borderLeftColor: Color.Venus,
    borderLeftWidth: 1,
    color: Color.black,
    fontSize: 12,
    padding: 5,
    paddingTop: 7,
    fontFamily: Poppins.SemiBold,
    alignItems: "flex-start",
  },
  RequestView: {
    alignItems: 'center',
    justifyContent: 'center',
    // position: 'absolute',
    flexDirection: "row",
    bottom: 0,
    top: 0,
    right: 0,
    left: 0,
    backgroundColor: Color.white,
    padding: 10
  },
  requestTextTitle: {
    color: Color.black,
    fontSize: 13,
    fontFamily: Poppins.SemiBold,
  },
  DemoText: {
    color: Color.primary,
    fontSize: 14,
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
