import React, { useState, useEffect, useCallback } from 'react';
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
import { RefreshControl } from 'react-native';

const HEIGHT = Dimensions.get('screen').height;

const InterestedProperties = ({ navigation }) => {
  const routeName = useRoute()
  const dispatch = useDispatch();
  const [AuctionData, setAuctionData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const userData = useSelector(state => state.UserReducer.userData || {});
  var { user_id } = userData;
  // const Auction_userData = useSelector(
  //   state => state.UserReducer.auctionUserData,
  // );
  // var { id, name, phone_number, email } = Auction_userData;

  const data = useSelector(
    state => state.UserReducer.auctionUserData,
  );

  useEffect(() => {
    // getAction_UserData();
    setLoading(true);

    const interval = setInterval(() => {
      getApiData().finally(() => {
        setLoading(false);
      });
    }, 1000); // Adjust the interval as needed

    return () => clearInterval(interval); // Cleanup interval on unmount

  }, []);

  const getApiData = useCallback(
    async (isRefreshing = false) => {
      if (isRefreshing) {
        setRefreshing(true);
      }
      try {
        const getdata = `user_id=` + data?.id;
        // console.log("User Data ----------- : ", getdata);

        const check_interestData = await fetchData.Auction_interest_show(getdata);
        console.log("check_interestData ================== : ", check_interestData);
        // const sortArrayData = check_interestData?.sort((a,b) => a.created_at -b.created_at);
        setAuctionData(check_interestData);
      } catch (error) {
        console.log('error', error);
      } finally {
        if (isRefreshing) {
          setRefreshing(false);
        }
      }
    },
    [data?.id]
  )

  const handleRefresh = () => {
    getApiData();
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
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={handleRefresh}
            />
          }
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
                    fontSize: 16,
                    padding: 5,
                    paddingHorizontal: 20,
                    marginStart: 5,
                    borderRadius: 5,
                    marginVertical: 10,
                    color: Color.primary,
                    fontFamily:Poppins.Regular
                  }}>
                  No Properties Found
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
