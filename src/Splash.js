import React, { useState, useEffect, useRef } from 'react';
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  Linking,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import { Media } from './Global/Media';
import Color from './Config/Color';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch, useSelector } from 'react-redux';
import { setActionUserData, setAsync, setLoginType, setUserData } from './Redux';
import NetInfo from '@react-native-community/netinfo';
import { scr_height, scr_width } from './Utils/Dimensions';
import { NetCheck, NetworkState } from './Utils/utils';
import RBSheet from 'react-native-raw-bottom-sheet';
import { Button } from 'react-native-elements';
import { Poppins } from './Global/FontFamily';
import DeviceInfo from 'react-native-device-info';

const SplashScreen = ({ navigation }) => {
  var { replace } = navigation;
  const dispatch = useDispatch();
  const UpdateRBSheet = useRef();
  const [loading, setLoading] = useState(false);
  const [height, setHeight] = useState(undefined);
  const Login_type = useSelector(state => state.UserReducer.Login_type);

  const setNetInfo = () => {
    NetInfo.fetch().then(state => {
      setLoading(state.isConnected);
    });
  };

  const userLogin_type = async () => {
    try {
      const action_login_type = await AsyncStorage.getItem('action_login_type');
      var { login_type } = JSON.parse(action_login_type);
      dispatch(setLoginType(login_type));
    } catch (error) {
      console.log('error', error);
    }
  };

  const getUserData = async () => {
    try {
      const action_value = await AsyncStorage.getItem('action_user_data');
      const value = await AsyncStorage.getItem('user_data');
      console.log('value !== null', value !== null, action_value !== null);
      if (value !== null) {
        dispatch(setLoginType('properties'));
      } else if (action_value !== null) {
        dispatch(setLoginType('Auction'));
      } else {
        dispatch(setLoginType(''));
      }
      if (value == null && action_value == null) {
        replace('OnboardingScreen2');
      } else {
        if (Login_type == 'Auction') {
          var { id } = JSON.parse(action_value);
          if (id == '0') {
            replace('ActionLogin');
          } else {
            dispatch(setActionUserData(action_value));
            replace('ActionHome');
          }
        } else {
          var { user_id } = JSON.parse(value);
          if (user_id == '0') {
            replace('ActionLogin');
          } else {
            dispatch(setUserData(value));
            replace('TabNavigator');
          }
        }
      }
    } catch (e) {
      console.log(e);
    }
  };

  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem('UserState');
      if (value !== null) {
        dispatch(setAsync(JSON.parse(value)));
      }
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    if (loading) {
      const SplashLoad = setTimeout(() => {
        // // checkForUpdates();
        getUserData();
        getData();
      }, 3000);
      return () => {
        clearInterval(SplashLoad);
      };
    }
  }, [loading, Login_type]);

  useEffect(() => {
    setNetInfo();
    const Login_typeLoad = setTimeout(() => {
      userLogin_type();
    }, 1000);
    return () => {
      clearInterval(Login_typeLoad);
    };
  }, [Login_type]);

  // const checkForUpdates = async () => {
  //   try {
  //     const currentVersion = DeviceInfo.getVersion() || 0;
  //     const updateInfo = await VersionCheck.needUpdate();

  //     if (!updateInfo || typeof updateInfo !== 'object' || !updateInfo.latestVersion) {
  //       console.error('Invalid update info:', updateInfo);
  //       return;
  //     }

  //     const latestVersionString = updateInfo.latestVersion;
  //     const numericVersionMatch = latestVersionString.match(/\d+(\.\d+)?/);

  //     if (!numericVersionMatch) {
  //       console.error('Unable to extract numeric version from:', latestVersionString);
  //       return;
  //     }

  //     const latestVersion = parseFloat(numericVersionMatch[0]) || 0

  //     if (latestVersion > currentVersion) {
  //       UpdateRBSheet.current.open();
  //     } else {
  //       getUserData();
  //       getData();
  //     }
  //   } catch (error) {
  //     console.error('Error checking for updates:', error);
  //   }
  // };

  return (
    // <View style={{ flex: 1, width: scr_width, height: scr_height }}>
    <View
      style={{
        width: scr_width, justifyContent: 'center', alignItems: 'center'
      }}>
      {!loading && <NetworkState setNetInfo={setNetInfo} />}
      <Image
        source={{ uri: "https://albion-backend.s3.ap-south-1.amazonaws.com/mainloader.gif" }}
        style={{ width: scr_width, height: scr_height }}
      />
      <RBSheet
        ref={UpdateRBSheet}
        height={height}
        closeDuration={500}
        openDuration={500}
        animationType={'slide'}
        customStyles={{
          container: {
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
          },
        }}>
        <View style={styles.container}>
          <View style={styles.header}>
            <Text style={styles.headerText}>Update Albion</Text>
            <Image source={{ uri: Media.logo }} style={styles.logo} />
          </View>
          <Text style={styles.description}>
            Albion recommends that you update to the Latest Version for an
            enhanced experience.
          </Text>
          <View style={styles.buttonContainer}>
            <Button
              title="Update Now"
              titleStyle={styles.buttonTitle}
              onPress={() => {
                Linking.openURL(
                  'https://play.google.com/store/apps/details?id=com.albion',
                );
              }}
              buttonStyle={styles.updateButton}
            />
          </View>
        </View>
      </RBSheet>
    </View>
    // </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  activityIndicator: {
    alignItems: 'center',
    height: 80,
  },
  container: {
    backgroundColor: 'white',
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  headerText: {
    fontSize: 18,
    color: Color.black,
    fontFamily: Poppins.SemiBold,
  },
  logo: {
    width: 80,
    height: 80,
    resizeMode: 'contain',
  },
  description: {
    marginTop: 10,
    marginBottom: 20,
    color: Color.black,
    fontFamily: Poppins.Medium,
    fontSize: 16,
    lineHeight: 22,
  },
  buttonContainer: {
    flex: 1,
    alignItems: 'flex-end',
  },
  updateButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: Color.primary,
    borderRadius: 8,
  },
  buttonTitle: {
    color: Color.white,
    fontSize: 14,
    fontFamily: Poppins.SemiBold,
    textTransform: 'uppercase',
  },
});
