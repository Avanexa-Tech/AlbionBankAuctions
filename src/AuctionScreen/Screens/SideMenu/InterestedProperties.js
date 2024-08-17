import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  Dimensions,
  BackHandler,
} from 'react-native';

import { useSelector, useDispatch } from 'react-redux';
import { Poppins } from '../../../Global/FontFamily';
import Color from '../../../Config/Color';
import { Media } from '../../../Global/Media';
import AuctionItemCard from '../../Auctioncomponents/AuctionItemCard';
import fetchData from '../../../Config/fetchData';
import { setActionUserData } from '../../../Redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRoute } from '@react-navigation/native';

const HEIGHT = Dimensions.get('screen').height;

const InterestedProperties = ({ navigation }) => {
  const routeName = useRoute()
  const dispatch = useDispatch();
  const [AuctionData, setAuctionData] = useState([]);
  const [loading, setLoading] = useState(false);
  const userData = useSelector(state => state.UserReducer.userData);
  var { user_id } = userData;
  const Auction_userData = useSelector(
    state => state.UserReducer.auctionUserData,
  );
  var { id, name, phone_number, email } = Auction_userData;

  useEffect(() => {
    getAction_UserData();
    setLoading(true);
    getApiData().finally(() => {
      setLoading(false);
    });
  }, []);

  const getApiData = async () => {
    try {
      var data = `user_id=` + id;
      const check_interestData = await fetchData.Auction_interest_show(data);
      setAuctionData(check_interestData);
    } catch (error) {
      console.log('error', error);
    }
  };

  const getAction_UserData = async () => {
    try {
      const action_value = await AsyncStorage.getItem('action_user_data');
      if (action_value !== null) {
        dispatch(setActionUserData(JSON.parse(action_value)));
      }
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    const backHandler = BackHandler.addEventListener('hardwareBackPress', handleBackButtonClick);
    return () => backHandler.remove();
  }, [routeName.name, navigation]);

  function handleBackButtonClick() {
    if (routeName.name == "InterestedProperties") {
      navigation.goBack();
      return true;
    }
    return false;
  }

  return (
    <View style={{ flex: 1, backgroundColor: Color.white, padding: 5 }}>
      {loading ? (
        <View
          style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Image
            source={{ uri: Media.loader }}
            style={{ width: 80, height: 80, resizeMode: 'contain' }}
          />
        </View>
      ) : (
        <FlatList
          data={AuctionData}
          keyExtractor={(item, index) => item + index}
          renderItem={({ item, index }) => {
            return (
              <AuctionItemCard
                navigation={navigation}
                item={item}
                index={index}
              />
            );
          }}
          ListEmptyComponent={() => {
            return (
              <View
                style={{
                  flex: 1,
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginVertical: 10,
                  height: HEIGHT / 1.5,
                }}>
                <Image
                  source={{ uri: Media.noProperty }}
                  style={{
                    width: 100,
                    height: 80,
                    resizeMode: 'contain',
                  }}
                />
                <Text
                  style={{
                    fontSize: 12,
                    padding: 5,
                    paddingHorizontal: 20,
                    marginStart: 5,
                    borderRadius: 5,
                    marginVertical: 10,
                    color: Color.primary,
                    fontFamily: Poppins.SemiBold,
                  }}>
                  No Properties
                </Text>
              </View>
            );
          }}
          showsVerticalScrollIndicator={false}
        />
      )}
    </View>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Color.white,
  },
});

//make this component available to the app
export default InterestedProperties;
