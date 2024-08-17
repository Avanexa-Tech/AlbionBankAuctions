import React, { useState, useEffect } from 'react';
import { Text, View, FlatList, TouchableOpacity, Image } from 'react-native';
import Color from '../../Config/Color';
import OIcon from 'react-native-vector-icons/Octicons';
import F6Icon from 'react-native-vector-icons/FontAwesome6';
import { Media } from '../../Global/Media';
import { Poppins } from '../../Global/FontFamily';
import { base_auction_image_url } from '../../Config/base_url';
import moment from 'moment';
import fetchData from '../../Config/fetchData';
import AuctionItemCard from '../Auctioncomponents/AuctionItemCard';

const SimilarAuction = props => {
  var { navigation, AuctionProperty } = props;
  const [AutionData, setAutionData] = useState([]);
  const getApiData = async () => {
    try {
      const getAuction = await fetchData.Auction({});
      setAutionData(getAuction);
    } catch (error) {
      console.log('error', error);
    }
  };

  useEffect(() => {
    getApiData();
  }, [AutionData]);
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: Color.white,
        // marginVertical: 10,
        // alignItems: 'center',
        padding: 10,
      }}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'flex-start',
          marginVertical: 10,
          // marginHorizontal: 10,
        }}>
        <View style={{ flex: 1 }}>
          <Text
            style={{
              fontSize: 16,
              color: Color.black,
              fontFamily: Poppins.SemiBold,
            }}>
            Similar Auctions
          </Text>
        </View>
      </View>
      <FlatList
        data={AutionData}
        horizontal
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
                alignItems: 'center',
                justifyContent: 'center',
                marginVertical: 10,
                width: '100%',
                flex: 1,
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
                No Properties Found
              </Text>
            </View>
          );
        }}
      />
    </View>
  );
};

export default SimilarAuction;
