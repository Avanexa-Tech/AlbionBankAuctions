import React, { useEffect, useState } from 'react';
import {
  Dimensions,
  FlatList,
  Image,
  Text,
  TouchableOpacity,
  View,
  BackHandler,
  Platform,
} from 'react-native';
import Color from './Config/Color';
import { Media } from './Global/Media';
import { Poppins } from './Global/FontFamily';
import { scr_height, scr_width } from './Utils/Dimensions';
import { useRoute } from '@react-navigation/native';
import { setLoginType } from './Redux';
import { useDispatch } from 'react-redux';

const { height } = Dimensions.get('screen');

const ActionSelect = ({ navigation }) => {
  const dispatch = useDispatch();
  const routeName = useRoute();
  const [ActionSelect, setActionSelect] = useState([
    {
      id: 1,
      name: 'Property',
      image: Media.propertyMain,
      subImage: "https://albion-backend.s3.ap-south-1.amazonaws.com/Mobile+Apk+Banners/assets/assets/Auction/Property_banner.png",
    },
    {
      id: 2,
      name: 'Actions',
      image: Media.AuctionMain,
      subImage: "https://albion-backend.s3.ap-south-1.amazonaws.com/Mobile+Apk+Banners/assets/assets/Auction/Auction_banner.png",
    },
  ]);
  function handleBackButtonClick() {
    if (routeName.name === 'ActionSelect') {
      BackHandler.exitApp();
      return true;
    } else {
      navigation.goBack();
      return true;
    }
  }

  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      handleBackButtonClick,
    );
    return () => backHandler.remove();
  }, [routeName.name, navigation]);

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: Color.white,
        padding: 10,
        justifyContent: 'center',
        alignContent: 'center',
      }}>
      <View
        style={{
          alignItems: 'center',
          marginVertical: Platform.OS == 'ios' ? 40 : 0,
        }}>
        <Image
          source={{ uri: Media.logo }}
          style={{ width: 100, height: 100, resizeMode: 'contain' }}
        />
        <Text
          style={{
            color: Color.cloudyGrey,
            fontFamily: Poppins.SemiBold,
            fontSize: 16,
            marginVertical: 10,
          }}>
          Select Your Action
        </Text>
      </View>
      <FlatList
        data={ActionSelect}
        keyExtractor={(item, index) => item + index}
        renderItem={({ item, index }) => {
          return (
            <TouchableOpacity
              key={index}
              onPress={() => {
                if (item?.name == 'Property') {
                  navigation.replace('TabNavigator');
                  dispatch(setLoginType('properties'));
                } else {
                  navigation.replace('ActionLogin');
                  dispatch(setLoginType('Auction'));
                }
              }}
              style={{
                width: '100%',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexDirection: 'row',
                flex: 1,
                marginVertical: 20,
                paddingHorizontal: 20,
                borderColor: Color.lightgrey,
                borderWidth: 1,
                padding: 5,
                borderRadius: 10,
              }}>
              <Image
                source={{ uri: item.image }}
                style={{
                  width: 200,
                  height: 200,
                  resizeMode: 'contain',
                }}
              />
              <Image
                source={{ uri: item.subImage }}
                style={{ width: 120, height: 120, resizeMode: 'contain' }}
              />
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
};

export default ActionSelect;
