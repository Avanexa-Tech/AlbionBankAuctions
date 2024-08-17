import {Text, TouchableOpacity, View} from 'react-native';
import Color from '../Config/Color';
import Svg, {Rect} from 'react-native-svg';
import NetInfo from '@react-native-community/netinfo';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { setUserData } from '../Redux';
import { useDispatch } from 'react-redux';

export const getCloser = (value, checkOne, checkTwo) =>
  Math.abs(value - checkOne) < Math.abs(value - checkTwo) ? checkOne : checkTwo;

export const NetworkState = ({setNetInfo}) => {
  return (
    <View
      style={{
        position: 'absolute',
        top: 20,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        backgroundColor: Color.black,
        padding: 10,
        borderRadius: 10,
        width: '90%',
        marginHorizontal: 20,
        zIndex: 1,
      }}>
      <Text
        style={{
          flex: 1,
          fontSize: 14,
          fontWeight: '600',
          color: Color.white,
        }}>
        No Internet Connection
      </Text>
      <TouchableOpacity
        onPress={() => setNetInfo()}
        style={{marginHorizontal: 20, alignItems: 'flex-end'}}>
        <Text style={{fontSize: 14, fontWeight: '600', color: Color.primary}}>
          Retry
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export const GoogleIcon = () => {
  return (
    <View>
      <Svg width={100} height={100} viewBox="0 0 100 100">
        <Rect x="0" y="0" width="50" height="100" fill="#4285F4" />
        <Rect x="50" y="0" width="50" height="100" fill="#0F9D58" />
        <Rect x="0" y="0" width="100" height="50" fill="#F4B400" />
        <Rect x="0" y="50" width="100" height="50" fill="#3CB371" />
      </Svg>
    </View>
  );
};

export const profileCompletion = (user_id, username, mobile_number, email) => {
  const totalFields = 3; // Name, Email, Number
  let completedFields = 0;
  if (username?.trim() !== '') {
    completedFields++;
  }
  if (email?.trim() !== '') {
    completedFields++;
  }
  if (mobile_number?.trim() !== '') {
    completedFields++;
  }

  const percentage = (completedFields / totalFields) * 100;

  return percentage;
};

export const getUserData = async () => {
  try {
    const value = await AsyncStorage.getItem('user_data');
    if (value !== null) {
      dispatch(setUserData(JSON.parse(value)));
    }
  } catch (e) {
    console.log(e);
  }
};

export const NetCheck = async setLoading => {
  return await NetInfo.fetch().then(state => {
    return setLoading(state.isConnected);
  });
};

export default GoogleIcon;
