import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Keyboard,
  Image,
  TouchableOpacity,
  ScrollView,
  Alert,
  BackHandler,
} from 'react-native';

import { primarycolor } from '../../../Utils/Colors';
import Color from '../../../Config/Color';
import { Media } from '../../../Global/Media';
import { Poppins } from '../../../Global/FontFamily';
import { Iconviewcomponent } from '../../../Components/Icontag';

import { useNavigation, useRoute } from '@react-navigation/native';
import { useSelector, useDispatch } from 'react-redux';
import { setActionUserData, setLoginType, setUserData } from '../../../Redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MCIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import MIcon from 'react-native-vector-icons/MaterialIcons';
import { Divider } from 'react-native-elements';
import fetchData from '../../../Config/fetchData';
import AuctionBottomLogin from '../../Auctioncomponents/AuctionBottomLogin';

const AuctionProfile = ({ navigation }) => {
  const routeName = useRoute();
  const dispatch = useDispatch();
  const [login, setLogin] = useState(false);
  const Auction_userData = useSelector(
    state => state.UserReducer.auctionUserData,
  );
  var { id, name, email, phone_number, state, district } = Auction_userData;
  const userData = useSelector(state => state.UserReducer.userData);
  var { user_id } = userData;

  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      handleBackButtonClick,
    );
    return () => backHandler.remove();
  }, [routeName.name, navigation]);

  function handleBackButtonClick() {
    if (routeName.name == 'AuctionProfile') {
      navigation.goBack();
      return true;
    }
    return false;
  }

  return (
    <View style={{ flex: 1, backgroundColor: Color.white }}>
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'white',
          marginVertical: 20,
        }}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <View
            style={{
              width: 130,
              height: 130,
              backgroundColor: '#f3f3f3',
              borderRadius: 100,
            }}>
            <Image
              source={{ uri: Media.Userpng }}
              style={{
                width: '100%',
                height: '100%',
                resizeMode: 'contain',
              }}
            />
          </View>
          {id == undefined ||
            (Auction_userData?.length > 0 && Auction_userData == undefined) ? (
            <TouchableOpacity
              onPress={() => {
                setLogin(true);
              }}>
              <Text
                style={{
                  fontSize: 16,
                  color: Color.white,
                  fontFamily: Poppins.Bold,
                  marginHorizontal: 20,
                  backgroundColor: Color.primary,
                  borderRadius: 50,
                  padding: 5,
                  paddingHorizontal: 10,
                }}>
                {'Login'}
              </Text>
            </TouchableOpacity>
          ) : (
            <View />
          )}
        </View>
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            marginVertical: 10,
          }}>
          <Text
            style={{
              fontSize: 20,
              color: Color.black,
              fontFamily: Poppins.Bold,
            }}>
            {id == undefined ||
              (Auction_userData?.length > 0 && Auction_userData == undefined)
              ? 'Guest'
              : name?.length != ''
                ? name
                : '*****'}
          </Text>
          <Text
            style={{
              fontSize: 16,
              color: '#444',
              fontFamily: Poppins.SemiBold,
              marginVertical: 5,
            }}>
            {id == undefined ||
              (Auction_userData?.length > 0 && Auction_userData == undefined)
              ? '******'
              : phone_number}
          </Text>
          <Text
            style={{
              fontSize: 14,
              color: Color.black,
              fontFamily: Poppins.Bold,
            }}>
            {id == undefined ||
              (Auction_userData?.length > 0 && Auction_userData == undefined)
              ? '******&gmail.com'
              : email?.length != ''
                ? email
                : 'Email'}
          </Text>
        </View>
      </View>
      <View style={{ marginVertical: 10 }}>
        <TouchableOpacity
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            marginVertical: 10,
            marginHorizontal: 10,
          }}
          onPress={() => {
            {
              id == undefined ||
                (Auction_userData?.length > 0 && Auction_userData == undefined)
                ? setLogin(true)
                : navigation.navigate('InterestedProperties');
            }
          }}>
          <MCIcon name="home-city" size={25} color={Color.primary} />
          <View
            style={{
              flex: 1,
              justifyContent: 'flex-start',
              alignItems: 'flex-start',
              marginHorizontal: 10,
            }}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Text style={{ fontSize: 16, color: '#333', fontWeight: 'bold' }}>
                Interested properties
              </Text>
            </View>
            <Text style={{ fontSize: 12, color: '#666' }}>
              Your Interested property details
            </Text>
          </View>
          <Iconviewcomponent
            Icontag={'Ionicons'}
            iconname={'chevron-forward'}
            icon_size={20}
            icon_color={'#666'}
          />
        </TouchableOpacity>
        <Divider style={{ height: 1, marginVertical: 10 }} />      

        {id == undefined ||
          (Auction_userData?.length > 0 && Auction_userData == undefined) ? (
          <View />
        ) : (
          <TouchableOpacity
            onPress={() => {
              var data = {
                id: id,
              };
              Alert.alert(
                '',
                'Do You like to remove your account',
                [
                  {
                    text: 'No',
                    onPress: async () => { },
                  },
                  {
                    text: 'Yes',
                    onPress: async () => {
                      const usersData = await fetchData.Auction_deleteData(
                        data,
                      );
                      // console.log("deleted user ------------- :", usersData);
                      if (usersData?.message == 'Success') {
                        AsyncStorage.clear();
                        navigation.replace('ActionLogin');
                        dispatch(setActionUserData({}));
                        dispatch(setLoginType(''));
                      }
                    },
                  },
                ],
                { cancelable: false },
              );
            }}
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              marginVertical: 10,
              marginHorizontal: 10,
            }}>
            {/* <Icon name="heart-outline" size={25} color={Color.primary} /> */}
            <Iconviewcomponent
              Icontag={'AntDesign'}
              iconname={'deleteuser'}
              icon_size={24}
              icon_color={Color.primary}
            />
            <View
              style={{
                flex: 1,
                justifyContent: 'flex-start',
                alignItems: 'flex-start',
                marginHorizontal: 10,
              }}>
              <Text style={{ fontSize: 16, color: '#333', fontWeight: 'bold' }}>
                Delete User
              </Text>
              <Text style={{ fontSize: 12, color: '#666' }}>
                Removing Your Account
              </Text>
            </View>
            <Iconviewcomponent
              Icontag={'Ionicons'}
              iconname={'chevron-forward'}
              icon_size={20}
              icon_color={'#666'}
            />
          </TouchableOpacity>
        )}

        <Divider style={{ height: 1, marginVertical: 10 }} />

        <TouchableOpacity
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            marginVertical: 10,
            marginHorizontal: 10,
          }}
          onPress={() => {
            AsyncStorage.clear();
            navigation.replace('ActionLogin');
            dispatch(setActionUserData({}));
            dispatch(setLoginType(''));
          }}>
          <Iconviewcomponent
            Icontag={'Ionicons'}
            iconname={'log-out'}
            icon_size={24}
            icon_color={Color.primary}
          />
          <View
            style={{
              flex: 1,
              justifyContent: 'flex-start',
              alignItems: 'flex-start',
              marginHorizontal: 10,
            }}>
            <Text
              style={{ fontSize: 16, color: '#333', fontWeight: 'bold' }}>
              Logout
            </Text>
          </View>
          <Iconviewcomponent
            Icontag={'Ionicons'}
            iconname={'chevron-forward'}
            icon_size={20}
            icon_color={'#666'}
          />
        </TouchableOpacity>
        <Divider style={{ height: 1, marginVertical: 10 }} />

      </View>
      <AuctionBottomLogin login={login} setLogin={setLogin} />
    </View>
  );
};

export default AuctionProfile;
