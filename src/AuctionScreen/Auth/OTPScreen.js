import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Platform,
  ScrollView,
  TouchableWithoutFeedback,
  Keyboard, BackHandler,
  PermissionsAndroid,
  KeyboardAvoidingView,
} from 'react-native';
import Color from '../../Config/Color';
import { Media } from '../../Global/Media';
import OTPInput from '../../Components/OTPInput';
import { Button } from 'react-native-elements';
import common_fn from '../../Config/common_fn';
import fetchData from '../../Config/fetchData';
import AsyncStorage from '@react-native-async-storage/async-storage';
import messaging, { firebase } from '@react-native-firebase/messaging';
import RNOtpVerify from 'react-native-otp-verify';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { profileCompletion } from '../../Utils/utils';
import { setActionUserData, setLoginType } from '../../Redux';
import { useDispatch } from 'react-redux';
import { baseUrl } from '../../Config/base_url';
import { data } from '../../Components/content';
import { Poppins } from '../../Global/FontFamily';

const DismissKeyboard = ({ children }) => (
  <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
    {children}
  </TouchableWithoutFeedback>
);

// const AuctionOTPScreen = ({ navigation, route }) => {
//   const [data] = useState(route.params.data);
//   const [register] = useState(route.params.register);
//   const inputRef = useRef();
//   const [otpCode, setOTPCode] = useState('');
//   const [isPinReady, setIsPinReady] = useState(false);
//   const maximumCodeLength = 4;
//   const [error, setError] = useState(false);
//   const [minutes, setMinutes] = useState(0);
//   const [seconds, setSeconds] = useState(30);
//   const [token, setToken] = useState('');
//   const dispatch = useDispatch();

//   useEffect(() => {
//     const interval = setInterval(() => {
//       if (seconds > 0) {
//         setSeconds(seconds - 1);
//       }

//       if (seconds === 0) {
//         if (minutes === 0) {
//           clearInterval(interval);
//         } else {
//           setSeconds(30);
//           setMinutes(minutes - 1);
//         }
//       }
//     }, 1000);

//     return () => {
//       clearInterval(interval);
//     };
//   }, [seconds]);

//   const ResendOTP = async () => {
//     setSeconds(30);
//     const ResendOtpVerify = await fetchData.Auction_register(data);
//     if (ResendOtpVerify?.isRegistered == true) {
//       if (Platform.OS === 'android') {
//         common_fn.showToast('OTP Sent Successfully');
//       } else {
//         alert('OTP Sent Successfully')
//       }
//     } else {
//       if (Platform.OS === 'android') {
//         common_fn.showToast(ResendOtpVerify?.message);
//       } else {
//         alert(ResendOtpVerify?.message)
//       }
//     }
//   };

//   const chkOTPError = OTP => {
//     let reg = /^[6-9][0-9]*$/;

//     if (OTP.length === 0) {
//       setError('Enter Your OTP Code');
//     } else if (reg.test(OTP) === false) {
//       setError(false);
//       setError(false);
//     } else if (reg.test(OTP) === true) {
//       setError('');
//     }
//   };

//   const requestUserPermission = async () => {
//     const authStatus = await messaging().requestPermission({
//       alert: true,
//       sound: true,
//       badge: true,
//       provisional: true,
//     });
//     const enabled =
//       authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
//       authStatus === messaging.AuthorizationStatus.PROVISIONAL;

//     if (enabled) {
//       console.log('Authorization status:', authStatus);
//       getFCMToken();
//     }
//   };

//   const getFCMToken = async () => {
//     try {
//       let fcmToken = await AsyncStorage.getItem('fcmToken');
//       if (!fcmToken) {
//         try {
//           const refreshToken = await messaging().getToken();
//           if (refreshToken) {
//             setToken(refreshToken);
//             await AsyncStorage.setItem('fcmToken', refreshToken);
//           } else {
//           }
//         } catch (error) {
//           console.log('Error fetching token :', error);
//         }
//       } else {
//         await AsyncStorage.setItem('fcmToken', fcmToken);
//         setToken(fcmToken);
//       }
//     } catch (error) {
//       console.log('Catch in getFcmToken  : ', error);
//     }
//   };

//   useEffect(() => {
//     requestUserPermission();
//   }, [token]);

//   const VerifyOTP = async navigation => {
//     if (otpCode.length == 4) {
//       const VerifyOTP = await fetchData.Auction_contact_verify({
//         user_id: register?.id,
//         user_data: otpCode,
//       });
//       if (VerifyOTP?.message == 'Success') {
//         navigation.replace('ActionLogin');
//         if (Platform.OS === 'android') {
//           common_fn.showToast("Your mobile number has now been registered; kindly log in")
//         } else {
//           alert('Your mobile number has now been registered; kindly log in')
//         }

//       } else {
//         setOTPCode('');
//         inputRef.current.focus();
//         var msg = VerifyOTP?.message;
//         setError(msg);
//       }
//     } else {
//       if (Platform.OS === 'android') {
//         common_fn.showToast('Invalid OTP Code Please Enter Your 4 Digit OTP Code');
//       } else {
//         alert('Invalid OTP Code Please Enter Your 4 Digit OTP Code')
//       }
//     }
//   };
//   useEffect(() => {
//     const requestSMSPermission = async () => {
//       try {
//         if (Platform.OS === 'android') {
//           const granted = await PermissionsAndroid.request(
//             PermissionsAndroid.PERMISSIONS.READ_SMS,
//             {
//               title: 'SMS Permission',
//               message: 'This app needs access to your SMS messages.',
//             },
//           );
//           if (granted === PermissionsAndroid.RESULTS.GRANTED) {
//             console.log('SMS permission granted');
//             startListeningForOtp();
//           } else {
//             console.log('SMS permission denied');
//           }
//         }
//       } catch (err) {
//         console.warn(err);
//       }
//     };

//     requestSMSPermission();
//   }, []);

//   useEffect(() => {
//     if (Platform.OS === 'android') {
//       RNOtpVerify.getHash()
//         .then(e => console.log('hash', e))
//         .catch(e => console.log(e));
//       startListeningForOtp();
//     }
//   }, []);

//   const otpHandler = message => {
//     try {
//       const otpMatch = /(\d{4})/g.exec(message);
//       if (otpMatch && otpMatch[1]) {
//         const otp = otpMatch[1];
//         setOTPCode(otp);
//         // You can now use the OTP code in your application logic.
//       } else {
//         console.log('No valid OTP found in the message:', message);
//       }
//     } catch (e) {
//       console.log('Error extracting OTP:', e);
//     }
//   };

//   const startListeningForOtp = () => {
//     RNOtpVerify.getOtp()
//       .then(
//         p => console.log('Received SMS', p),
//         RNOtpVerify.addListener(otpHandler.bind(this)),
//       )
//       .catch(p => console.log('p', p));
//   };
//   return (
//     <ScrollView
//       contentContainerStyle={{ justifyContent: 'center', flex: 1 }}
//       keyboardShouldPersistTaps="handled">
//       <DismissKeyboard>
//         <View
//           style={{
//             flex: 1,
//             backgroundColor: Color.white,
//             padding: 20,
//           }}>
//           {/* <View
//             style={{
//               alignItems: 'center',
//               marginVertical: 40,
//             }}>
//             <Image
//               source={Media.logo}
//               style={{width: 100, height: 100, resizeMode: 'contain'}}
//             />
//           </View> */}
//           <View
//             style={{
//               width: '100%',
//               alignItems: 'center',
//               paddingVertical: 20,
//             }}>
//             <Image
//               source={{ uri: Media.otp }}
//               style={{ width: 200, height: 200, resizeMode: 'contain' }}
//             />
//           </View>
//           <View
//             style={{
//               marginVertical: 20,
//               justifyContent: 'center',
//             }}>
//             <Text
//               style={{
//                 fontFamily: 'Poppins-SemiBold',
//                 fontSize: 20,
//                 fontWeight: 'bold',
//                 textAlign: 'center',
//                 color: Color.black,
//                 marginRight: 10,
//                 marginVertical: 10,
//               }}>
//               Enter OTP
//             </Text>
//             <Text style={styles.invalidLogin}>{error}</Text>
//             <View style={styles.otpInputView}>
//               <OTPInput
//                 inputRef={inputRef}
//                 code={otpCode}
//                 setCode={setOTPCode}
//                 maximumLength={4}
//                 setIsPinReady={setIsPinReady}
//                 chkOTPError={chkOTPError}
//               />
//             </View>
//             {seconds > 0 || minutes > 0 ? (
//               <View style={styles.noReceivecodeView}>
//                 <Text style={styles.noReceiveText}>
//                   Time Remaining: {minutes < 10 ? `0${minutes}` : minutes}:
//                   {seconds < 10 ? `0${seconds}` : seconds}
//                 </Text>
//               </View>
//             ) : (
//               <View style={styles.noReceivecodeView}>
//                 <TouchableOpacity onPress={() => ResendOTP()}>
//                   <Text style={styles.resendOtp}>Resend Otp! </Text>
//                 </TouchableOpacity>
//               </View>
//             )}
//             <Button
//               title={'Submit'}
//               titleStyle={{}}
//               buttonStyle={{
//                 height: 50,
//                 backgroundColor: Color.primary,
//                 borderRadius: 10,
//                 marginVertical: 10,
//               }}
//               onPress={() => {
//                 VerifyOTP(navigation);
//               }}
//             />
//           </View>
//         </View>
//       </DismissKeyboard>
//     </ScrollView>
//   );
// };


const AuctionOTPScreen = ({ route }) => {
  const navigation = useNavigation()
  const [number] = useState(route?.params?.register?.isRegistered == true ? route.params?.data?.phone_number : route?.params?.data);
  const inputRef = useRef();
  const [otpCode, setOTPCode] = useState('');
  const [isPinReady, setIsPinReady] = useState(false);
  const maximumCodeLength = 4;
  const [error, setError] = useState(false);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(30);
  const [loading, setLoading] = useState(false);
  const [token, setToken] = useState('');
  const [data, setdata] = useState(null)
  const [accesstoken, setAccesstoken] = useState(null)
  const dispatch = useDispatch();

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     if (seconds > 0) {
  //       setSeconds(seconds - 1);
  //     }

  //     if (seconds === 0) {
  //       if (minutes === 0) {
  //         clearInterval(interval);
  //       } else {
  //         setSeconds(30);
  //         setMinutes(minutes - 1);
  //       }
  //     }
  //   }, 1000);

  //   return () => {
  //     clearInterval(interval);
  //   };
  // }, [seconds]);

  useEffect(() => {
    if (minutes === 0 && seconds === 0) {
      return; // Timer has expired
    }

    const interval = setInterval(() => {
      if (seconds > 0) {
        setSeconds(prev => prev - 1);
      } else if (minutes > 0) {
        setMinutes(prev => prev - 1);
        setSeconds(59);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [minutes, seconds]);

  // useEffect(() => {
  //   const backAction = () => {
  //     console.log("number =========== :",number);

  //     if (number == true) {
  //       navigation.navigate("ActionLogin");
  //     } else {
  //       navigation.goBack();
  //     }
  //   };

  //   const backHandler = BackHandler.addEventListener(
  //     'hardwareBackPress',
  //     backAction
  //   );

  //   return () => backHandler.remove();  // Clean up the listener on unmount
  // }, [navigation]);

  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      handleBackButtonClick,
    );
    return () => backHandler.remove();
  }, [navigation]);

  function handleBackButtonClick() {
    if (!number) {
      navigation.navigate("ActionLogin");
      // navigation.navigate('LoginWithEmail')
      return true;
    } else {
      navigation.goBack();
      return true;
    }
  }

  const ResendOTP = async number => {
    setMinutes(0); // Reset timer to 30 seconds
    setSeconds(30);
    const emailpayload = {
      email: number
    }
    const numberpayload = {
      phone_number: number
    }
    const payload = number?.includes('@') ? emailpayload : numberpayload
    console.log("payload", payload);
    const ResendOtpVerify = await fetchData.Auction_OTPlogin(payload);
    const { message, user_id, status } = ResendOtpVerify || {};
    if (status) {
      if (Platform.OS == 'android') {
        common_fn.showToast('OTP Sent Successfully');
      } else {
        alert('OTP Sent Successfully');
      }
    } else {
      common_fn.showToast(message || 'Failed to resend OTP');
    }

    // if (ResendOtpVerify?.status == true) {
    //   if (Platform.OS === 'android') {
    //     common_fn.showToast('OTP Sent Successfully');
    //   } else {
    //     alert('OTP Sent Successfully')
    //   }
    // } else {
    //   common_fn.showToast(ResendOtpVerify?.message);
    // }
  };
  const ResendRegister = async (item) => {
    try {
      setMinutes(0); // Reset timer to 30 seconds
      setSeconds(30);
      var payload = {
        email: item?.data?.email,
        phone_number: item?.data?.phone_number
      };
      const Auction_register = await fetchData.Auction_register(payload);
      if (Auction_register?.isRegistered == true) {
        setdata(item)
        setAccesstoken(Auction_register?.token)
        common_fn.showToast("OTP Sent Successfully")
      }
    } catch (error) {
      console.log("Catch in Error", error);

    }
  }

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

  const VerifyOTP = async () => {
    try {

      // const myHeaders = new Headers();
      // myHeaders.append("accept", "*/*");
      // myHeaders.append("Content-Type", "application/json");

      // const raw = JSON.stringify({
      //   "phone_number": 8825659803,
      //   "otp": 2721
      // });

      // const requestOptions = {
      //   method: "POST",
      //   headers: myHeaders,
      //   body: raw,
      //   redirect: "follow"
      // };

      // fetch("https://testapi.albionbankauctions.com/api/login/verify_otp", requestOptions)
      //   .then((response) => response.text())
      //   .then(async(VerifyOTP) => {
      //     if (VerifyOTP?.isLoggedin == true) {
      //       dispatch(setActionUserData(VerifyOTP?.user));
      //       dispatch(setLoginType('Auction'));
      //       await AsyncStorage.setItem('action_user_data', JSON.stringify(VerifyOTP?.user),);
      //       await AsyncStorage.setItem('action_login_type', JSON.stringify({ login_type: 'Auction' }),);
      //       navigation.replace('ActionHome', VerifyOTP?.user);
      //       if (Platform.OS === 'android') {
      //         common_fn.showToast(`Welcome to Albion ${VerifyOTP?.user?.name}`);
      //       } else {
      //         alert(`Welcome to Albion ${VerifyOTP?.user?.name}`)
      //       }

      //       common_fn.locationPermission();
      //       setLoading(false);
      //     } else {
      //       setOTPCode('');
      //       inputRef.current.focus();
      //       var msg = VerifyOTP?.message;
      //       setError(msg);
      //       setLoading(false);
      //     }
      //   })
      //   .catch((error) => console.error(error));


      if (otpCode.length == 4) {
        const emailpayload = {
          email: number,
          otp: Number(otpCode),
          fcm_token: token,
        }
        const numberpayload = {
          phone_number: number,
          otp: Number(otpCode),
          fcm_token: token,
        }
        const payload = number?.includes('@') ? emailpayload : numberpayload
        console.log("payload", payload);

        const VerifyOTP = await fetchData.Auction_VerifyOTP(payload);
        // console.log("STATUS ============== :", VerifyOTP);

        if (VerifyOTP?.isLoggedin == true) {
          dispatch(setActionUserData(VerifyOTP?.user));
          dispatch(setLoginType('Auction'));
          await AsyncStorage.setItem('action_user_data', JSON.stringify(VerifyOTP?.user),);
          await AsyncStorage.setItem('logindetails', JSON.stringify(VerifyOTP));
          await AsyncStorage.setItem('action_login_type', JSON.stringify({ login_type: 'Auction' }),);
          // navigation.replace('ActionHome', VerifyOTP?.user);
          navigation.dispatch(navigation.replace('ActionHome', VerifyOTP?.user));
          if (Platform.OS === 'android') {
            common_fn.showToast(`Welcome to Albion ${VerifyOTP?.user?.name}`);
          } else {
            alert(`Welcome to Albion ${VerifyOTP?.user?.name}`)
          }

          common_fn.locationPermission();
          setLoading(false);
        } else {
          setOTPCode('');
          inputRef.current.focus();
          // var msg = VerifyOTP?.message;
          // setError(msg);
          common_fn.showToast(VerifyOTP?.message);
          setLoading(false);
        }
      } else {
        if (Platform.OS === 'android') {
          common_fn.showToast('Invalid OTP Code Please Enter Your 4 Digit OTP Code');
        } else {
          alert('Invalid OTP Code Please Enter Your 4 Digit OTP Code')
        }
        setLoading(false);
      }
    } catch (error) {
      console.log("catch in VerifyOTP_error:", error);

    }
  };
  const RegisterOTP = async () => {
    try {
      // if (otpCode.length == 4) {
      //   const VerifyOTP = await fetchData.Auction_VerifyOTP({
      //     phone_number: route?.params?.data?.phone_number,
      //     otp: Number(otpCode),
      //     fcm_token: token,
      //   });
      //   console.log("STATUS ============== :", VerifyOTP);

      //   if (VerifyOTP?.isLoggedin == true) {
      //     navigation.replace("ActionLogin");
      //     // navigation.navigate('LoginWithEmail')
      //     setLoading(false);
      //   } else {
      //     setOTPCode('');
      //     inputRef.current.focus();
      //     // var msg = VerifyOTP?.message;
      //     // setError(msg);
      //     common_fn.showToast(VerifyOTP?.message);
      //     setLoading(false);
      //   }
      // } else {
      //   if (Platform.OS === 'android') {
      //     common_fn.showToast('Invalid OTP Code Please Enter Your 4 Digit OTP Code');
      //   } else {
      //     alert('Invalid OTP Code Please Enter Your 4 Digit OTP Code')
      //   }
      //   setLoading(false);
      // }
      setLoading(true);
      const myHeaders = new Headers();
      myHeaders.append("accept", "*/*");
      myHeaders.append("Content-Type", "application/json");
      myHeaders.append("Authorization", `Bearer ${accesstoken == null ? route?.params?.register?.token : accesstoken}`);
      const requestBody =
      {
        name: route?.params?.data?.name,
        email: route?.params?.data?.email,
        phone_number: route?.params?.data?.phone_number,
        address: route?.params?.data?.password,
        state: route?.params?.data?.state,
        password: "",
        district: route?.params?.data?.district,
        user_data: Number(otpCode)
      }
      const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: JSON.stringify(requestBody),
        redirect: "follow"
      };
      fetch(`${baseUrl}api/login/verify_user`, requestOptions)
        .then((response) => response.json())
        .then((result) => {
          if (result?.message == "Registered successfully") {
            navigation.replace("ActionLogin");
          } else {
            setOTPCode('')
            common_fn.showToast("Invalid Otp")
          }
          setLoading(false);
        })
        .catch((error) => { console.error(error), setLoading(false) });
    } catch (error) {
      console.log("catch in VerifyOTP_error:", error);
      setLoading(false);
    }
  };

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

  useEffect(() => {
    requestSMSPermission();
  }, []);

  useEffect(() => {
    if (Platform.OS === 'android') {
      RNOtpVerify.getHash()
        .then(hash => console.log('Hash:', hash))
        .catch(error => console.error('Error getting hash:', error));

      startListeningForOtp();
    }
  }, []);

  useEffect(() => {
    console.log('OTPCode changed:', otpCode);
  }, [otpCode]);

  const otpHandler = message => {
    try {
      const otpMatch = /(\d{4})/g.exec(message);
      if (otpMatch && otpMatch[1]) {
        const otpDigit = otpMatch[1];

        setOTPCode(prevOTP => prevOTP + otpDigit);


        if (otpCode.length + otpDigit.length === 4) {
          console.log('Complete OTP received:', otpCode + otpDigit);
          // Do any further processing or validation here
        }
      } else {
        console.log('No valid OTP found in the message:', message);
      }
    } catch (e) {
      console.error('Error extracting OTP:', e);
    }
  };

  const startListeningForOtp = () => {
    RNOtpVerify.getOtp()
      .then(receivedSMS => {
        // setOTPCode('1234'); 
        RNOtpVerify.addListener(otpHandler.bind(this));
      })
      .catch(error => console.error('Error getting SMS:', error));

  };
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      style={styles.container}>
      <ScrollView
        contentContainerStyle={{ justifyContent: 'center', padding: 20, }}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}>
        {/* <DismissKeyboard> */}
        {/* <View
          style={{
            flex: 1,
            backgroundColor: Color.white,
          }}> */}
        <View
          style={{
            width: '100%',
            alignItems: 'center',
            paddingVertical: 20,
          }}>
          <Image
            source={{ uri: Media.otp }}
            style={{ width: 180, height: 180, resizeMode: 'contain' }}
          />
        </View>
        <View
          style={{
            marginVertical: 20,
            justifyContent: 'center',
          }}>
          <Text
            style={{
              fontSize: 18,
              textAlign: 'center',
              color: Color.black,
              marginRight: 10,
              marginVertical: 10,
              fontFamily: Poppins.Medium,
            }}>
            Enter OTP
          </Text>
          {/* <Text style={styles.invalidLogin}>{error}</Text> */}
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
              {/* <TouchableOpacity onPress={() => {ResendOTP(number)}}> */}
              <TouchableOpacity onPress={() => {
                if (route?.params?.register?.isRegistered == true) {
                  setOTPCode('')
                  ResendRegister(route?.params);
                } else {
                  setOTPCode('')
                  ResendOTP(number)
                }
              }
              }>
                <Text style={styles.resendOtp}>Resend OTP</Text>
              </TouchableOpacity>
            </View>
          )}
          <Button
            title={'Submit'}
            titleStyle={{ fontSize: 14, fontFamily: Poppins.Light }}
            buttonStyle={{
              height: 50,
              backgroundColor: Color.primary,
              borderRadius: 10,
              marginVertical: 10,
            }}
            onPress={() => {
              if (route?.params?.register?.isRegistered == true) {
                RegisterOTP();
              } else {

                VerifyOTP(navigation);
              }
            }}
            loading={loading}
          />

        </View>
        {/* </View> */}
        {/* </DismissKeyboard> */}
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default AuctionOTPScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.white,
  },
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
    fontSize: 13,
    textDecorationLine: 'underline',
    textAlign: 'right',
    fontFamily: Poppins.Light
  },
  invalidLogin: {
    fontSize: 14,
    fontFamily: 'Poppins-SemiBold',
    color: Color.red,
    textAlign: 'center',
  },
});
