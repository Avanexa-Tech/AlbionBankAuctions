import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Keyboard,
  TextInput,
  ScrollView,
  Text,
  View,
  Platform,
  BackHandler,
} from 'react-native';
import { Button } from 'react-native-elements';
import { Poppins } from '../../Global/FontFamily';
import Color from '../../Config/Color';
import { Dropdown } from 'react-native-element-dropdown';
import Icon from 'react-native-vector-icons/Ionicons';
import FIcon from 'react-native-vector-icons/FontAwesome';
import fetchData from '../../Config/fetchData';
import common_fn from '../../Config/common_fn';
import { useRoute } from '@react-navigation/native';

const { height } = Dimensions.get('window');

const Register = ({ navigation }) => {
  const routeName = useRoute();
  const [NameError, setNameError] = useState(false);
  const [NumError, setNumError] = useState(false);
  const [emailerror, setEmailError] = useState(false);
  const [stateError, setStateError] = useState(false);
  const [DistrictError, setDistrictError] = useState(false);
  const [passworderror, setPasswordError] = useState(false);
  const [number, setNumber] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [currentState, setCurrentState] = useState({});
  const [currentDistrict, setCurrentDistrict] = useState({});
  const [state, setState] = useState([]);
  const [district, setDistrict] = useState([]);
  const [passwordVisible, setPasswordVisible] = useState(false);

  // Fetch states when the component mounts
  useEffect(() => {
    fetchStates();
  }, []);

  useEffect(() => {
    if (currentState?.id) {
      fetchDistricts();
    }
  }, [currentState]);


  const fetchStates = async () => {
    try {
      const getState = await fetchData.Auction_getState({});
      console.log("STATE ----------------- :", getState);
      setState(getState);
    } catch (error) {
      console.log('Error fetching states: ', error);
    }
  };

  const fetchDistricts = async () => {
    try {
      const districtData = `state=${currentState?.id}`;
      console.log("districtData ----------------- :", districtData);
      const get_district = await fetchData.Auction_getDistrict(districtData);
      console.log("DISTRICT ----------------- :", get_district);
      setDistrict(get_district);
    } catch (error) {
      console.log('Error fetching districts: ', error);
    }
  };

  // useEffect(() => {
  //     getApiData();
  // }, []);


  // const getApiData = async () => {
  //   try {
  //     //State
  //     const getState = await fetchData.Auction_getState({});
  //     console.log("STATE ----------------- :", getState);
  //     setState(getState);
  //     // District
  //     var districtData = `state=${currentState?.id}`;
  //     console.log("districtData ----------------- :", districtData);
  //     const get_district = await fetchData.Auction_getDistrict(districtData);
  //     console.log("DISTRICT ----------------- :", get_district);
  //     setDistrict(get_district);
  //   } catch (error) {
  //     console.log('catch in getApiData_Register: ', error);
  //   }
  // };



  const checkTextInput = () => {
    if (!username.trim()) {
      var msg = 'Please Enter Name';
      setNameError(msg);
      return;
    } else {
      setNameError(false);
    }
    if (!number.trim()) {
      var msg = 'Please Enter Number';
      setNumError(msg);
      return;
    } else {
      setNumError(false);
    }
    if (!email.trim()) {
      var msg = 'Please Enter Your Email';
      setEmailError(msg);
      return;
    } else {
      setEmailError(false);
    }
    if (!currentState?.name) {
      var msg = 'Please Select Your State';
      setStateError(msg);
      return;
    } else {
      setStateError(false);
    }
    if (!currentDistrict?.name) {
      var msg = 'Please Select Your District';
      setDistrictError(msg);
      return;
    } else {
      setDistrictError(false);
    }
    if (!password.trim()) {
      var msg = 'Please Enter Your Password';
      setPasswordError(msg);
      return;
    } else {
      setPasswordError(false);
    }
  };

  const chkNumber = number => {
    setNumber(number);
    if (number.length == 10) {
      Keyboard.dismiss();
    }
  };

  const sendDemo = async () => {
    try {
      checkTextInput();
      var data = {
        name: username,
        email: email,
        phone_number: number,
        password: password,
        state: currentState?.name,
        district: currentDistrict?.name,
      };
      if (
        username?.trimStart().trimEnd() &&
        number != '' &&
        email != '' &&
        password != '' &&
        currentDistrict?.name != '' &&
        currentState?.name != ''
      ) {
        const Auction_register = await fetchData.Auction_register(data);
        if (Auction_register?.isRegistered == true) {
          navigation.replace('AuctionOTPScreen', {
            data: data,
            register: Auction_register,
          });
          // navigation.replace("ActionLogin")
          if (Platform.OS === 'android') {
            common_fn.showToast(Auction_register?.message);
          } else {
            alert(Auction_register?.message)
          }
        } else {
          if (Platform.OS === 'android') {
            common_fn.showToast(Auction_register?.message);
          } else {
            alert(Auction_register?.message)
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


  const handleTextChange = (value) => {
    // Allow only alphabets and spaces
    const filteredValue = value.replace(/[^a-zA-Z\s]/g, '');
    setUsername(filteredValue);
  };


  function handleBackButtonClick() {
    if (routeName.name == "ActionRegister") {
      navigation.replace('ActionLogin');
      return true;
    }
    return false;
  }

  useEffect(() => {
    const backHandler = BackHandler.addEventListener('hardwareBackPress', handleBackButtonClick);
    return () => backHandler.remove();
  }, [routeName.name, navigation]);

  return (
    <View style={styles.DemoContainer}>
      <ScrollView
        showsVerticalScrollIndicator={false}>
        <View style={styles.Container}>
          <Text style={styles.demoTitle}>Register to your Account</Text>
          <Text
            style={{
              fontSize: 16,
              fontFamily: Poppins.Medium,
              color: Color.lightBlack,
              textAlign: 'left',
              marginBottom: 20,
            }}>
            Find your dream property
          </Text>
          <View style={{ marginVertical: 0 }}>
            <Text
              style={{
                fontFamily: Poppins.Medium,
                fontSize: 12,
                color: Color.lightBlack,
                marginVertical: 5,
              }}>
              Full Name
            </Text>
            <TextInput
              placeholder="Name"
              value={username}
              placeholderTextColor={Color.cloudyGrey}
              // onChangeText={value => setUsername(value)}
              onChangeText={handleTextChange}
              style={styles.demoNameTextInput}
            />
            {NameError && <Text style={styles.errorMsg}>{NameError}</Text>}
          </View>
          <View style={{ marginVertical: 5 }}>

            <Text
              style={{
                fontFamily: Poppins.Medium,
                fontSize: 12,
                color: Color.lightBlack,
                marginVertical: 5,
              }}>
              Phone Number
            </Text>
            <View style={styles.phoneView}>
              <Text style={styles.PhoneCodeText}>+91</Text>
              <TextInput
                placeholder="Enter your Number"
                placeholderTextColor={Color.cloudyGrey}
                maxLength={10}
                value={number}
                autoFocus={number.length == 10 ? true : false}
                onChangeText={number => {
                  chkNumber(number);
                }}
                keyboardType="phone-pad"
                style={styles.phoneTextInput}
              />
            </View>
            {NumError && <Text style={styles.errorMsg}>{NumError}</Text>}
          </View>
          <View style={{ marginVertical: 5 }}>

            <Text
              style={{
                fontFamily: Poppins.Medium,
                fontSize: 12,
                color: Color.lightBlack,
                marginVertical: 5,
              }}>
              Email ID
            </Text>
            <TextInput
              placeholder="Email"
              value={email}
              placeholderTextColor={Color.cloudyGrey}
              onChangeText={value => setEmail(value)}
              textContentType="emailAddress"
              style={styles.EmailTextInput}
            />
            {emailerror && <Text style={styles.errorMsg}>{emailerror}</Text>}
          </View>
          <View style={{ marginVertical: 5 }}>

            <Text
              style={{
                fontFamily: Poppins.Medium,
                fontSize: 12,
                color: Color.lightBlack,
                marginVertical: 5,
              }}>
              State
            </Text>
            <Dropdown
              style={{
                backgroundColor: Color.white,
                borderColor: Color.cloudyGrey,
                borderWidth: 1,
                padding: 10,
                borderRadius: 5,
                height: 45,
              }}
              placeholderStyle={{
                fontSize: 14,
                color: Color.black,
                marginHorizontal: 10,
              }}
              selectedTextStyle={{
                fontSize: 14,
                color: Color.black,
              }}
              iconStyle={{ width: 20, height: 20 }}
              itemTextStyle={{ fontSize: 12, color: Color.cloudyGrey }}
              data={state}
              maxHeight={250}
              labelField="name"
              valueField="name"
              placeholder="Select State"
              searchPlaceholder="Search..."
              value={currentState}
              onChange={item => {
                setCurrentState(item);
              }}
              renderRightIcon={() => (
                <Icon
                  style={{ width: 20, height: 20 }}
                  color={Color.black}
                  name="caret-down"
                  size={20}
                />
              )}
            />
            {stateError && <Text style={styles.errorMsg}>{stateError}</Text>}
          </View>
          <View style={{ marginVertical: 5 }}>

            <Text
              style={{
                fontFamily: Poppins.Medium,
                fontSize: 12,
                color: !currentState?.name ? Color.lightgrey : Color.lightBlack,
                marginVertical: 5,
              }}>
              District
            </Text>
            <Dropdown
              style={{
                backgroundColor: Color.white,
                borderColor: !currentState?.name
                  ? Color.lightgrey
                  : Color.cloudyGrey,
                borderWidth: 1,
                padding: 10,
                borderRadius: 5,
                height: 45,
              }}
              placeholderStyle={{
                fontSize: 14,
                color: !currentState?.name ? Color.lightgrey : Color.black,
                marginHorizontal: 10,
              }}
              disable={!currentState?.name}
              selectedTextStyle={{
                fontSize: 14,
                color: Color.black,
              }}
              iconStyle={{ width: 20, height: 20 }}
              itemTextStyle={{ fontSize: 12, color: Color.cloudyGrey }}
              data={district}
              maxHeight={200}
              labelField="name"
              valueField="name"
              placeholder="Select District"
              searchPlaceholder="Search..."
              value={currentDistrict}
              onChange={item => {
                setCurrentDistrict(item);
              }}
              renderRightIcon={() => (
                <Icon
                  style={{ width: 20, height: 20 }}
                  color={!currentState?.name ? Color.lightgrey : Color.black}
                  name="caret-down"
                  size={20}
                />
              )}
            />
            {DistrictError && (
              <Text style={styles.errorMsg}>{DistrictError}</Text>
            )}
          </View>
          <View style={{ marginVertical: 5 }}>

            <Text
              style={{
                fontFamily: Poppins.Medium,
                fontSize: 12,
                color: Color.lightBlack,
                marginVertical: 5,
              }}>
              Password
            </Text>
            <View style={styles.NumberBoxConatiner}>
              <TextInput
                placeholder="Password"
                value={password}
                placeholderTextColor={Color.cloudyGrey}
                onChangeText={value => setPassword(value)}
                textContentType="password"
                secureTextEntry={!passwordVisible}
                style={styles.numberTextBox}
              />
              <TouchableOpacity
                onPress={() => setPasswordVisible(!passwordVisible)}
                style={{ position: 'absolute', right: 20 }}>
                <FIcon
                  name={passwordVisible ? 'eye' : 'eye-slash'}
                  color={password?.length > 0 ? Color.black : Color.white}
                  size={18}
                />
              </TouchableOpacity>
            </View>
            {passworderror && (
              <Text style={styles.errorMsg}>{passworderror}</Text>
            )}
          </View>
          <Button
            title={'Sign Up'}
            titleStyle={{
              fontFamily: Poppins.SemiBold,
              fontSize: 14,
              color: Color.white,
            }}
            onPress={() => {
              checkTextInput();
              sendDemo();
            }}
            buttonStyle={styles.buttonStyle}
            containerStyle={styles.containerStyle}
          />
          <View style={styles.RequestView}>
            <Text style={styles.requestTextTitle}>
              Already have an account?
            </Text>
            <TouchableOpacity
              onPress={() => navigation.navigate('ActionLogin')}>
              <Text style={styles.DemoText}>login</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default Register;
const styles = StyleSheet.create({
  errorMsg: {
    fontSize: 14,
    fontFamily: Poppins.Medium,
    color: Color.red,
    marginTop: 5,
  },
  DemoContainer: { flex: 1, backgroundColor: Color.white, padding: 10 },
  ImageContainer: {
    height: height / 2,
    backgroundColor: Color.logoBackground,
    justifyContent: 'center',
    alignItems: 'center',
  },
  NumberBoxConatiner: {
    borderColor: Color.cloudyGrey,
    borderWidth: 1,
    height: 45,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 5,
  },
  numberTextBox: {
    flex: 1,
    height: 45,
    padding: 10,
    color: Color.black,
    marginVertical: 10,
    fontSize: 12,
    fontFamily: Poppins.Medium,
  },
  ImageView: { width: 300, height: 200, resizeMode: 'contain' },
  Container: { padding: 10 },
  demoTitle: {
    fontSize: 25,
    fontFamily: Poppins.SemiBold,
    color: Color.lightBlack,
    textAlign: 'left',
  },
  demoNameTextInput: {
    height: 45,
    fontSize: 14,
    borderColor: Color.cloudyGrey,
    borderWidth: 1,
    borderRadius: 5,
    color: Color.black,
    padding: 10,
  },
  phoneView: {
    borderColor: Color.cloudyGrey,
    borderWidth: 1,
    height: 45,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 5,
  },
  PhoneCodeText: {
    color: Color.cloudyGrey,
    marginHorizontal: 10,
  },
  phoneTextInput: {
    height: 45,
    padding: 10,
    fontSize: 14,
    borderLeftColor: Color.cloudyGrey,
    color: Color.black,
    borderLeftWidth: 1,
    marginVertical: 10,
  },
  EmailTextInput: {
    height: 45,
    fontSize: 14,
    borderColor: Color.cloudyGrey,
    borderWidth: 1,
    borderRadius: 5,
    color: Color.black,
    padding: 10,
  },
  AddressTextInput: {
    height: 100,
    borderColor: Color.cloudyGrey,
    borderWidth: 1,
    color: Color.black,
    borderRadius: 5,
    padding: 10,
  },
  buttonStyle: {
    borderRadius: 10,
    backgroundColor: Color.primary,
    // marginHorizontal: 40,
    height: 45,
  },
  containerStyle: { marginVertical: 15 },
  LoginbtnText: {
    fontSize: 14,
    fontFamily: Poppins.Medium,
    textAlign: 'center',
    color: Color.black,
    textDecorationLine: 'underline',
  },
  RequestView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 0,
  },
  requestTextTitle: {
    color: Color.cloudyGrey,
    fontSize: 12,
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
