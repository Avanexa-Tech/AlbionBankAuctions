import React, { useState, useEffect } from 'react';
import { Text, View, FlatList, Image } from 'react-native';
import Color from '../../Config/Color';
import { Media } from '../../Global/Media';
import { Poppins } from '../../Global/FontFamily';
import fetchData from '../../Config/fetchData';
import AuctionItemCard from '../Auctioncomponents/AuctionItemCard';

const SimilarAuction = props => {
 console.log(props.AuctionProperty,"<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<");
 
  const { id } = props.AuctionProperty;
  var { navigation, AuctionProperty } = props;
  const [AutionData, setAutionData] = useState([]);
  const getApiData = async () => {
    try {
      const getAuction = await fetchData.Similar_Auction({district:props.AuctionProperty.district});
      setAutionData(getAuction.filter(auction => auction.id != id));
    } catch (error) {
      console.log('error', error);
    }
  };
  useEffect(() => {
    getApiData();
  }, []);
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: Color.white,
      }}>
      <View
        style={{
          width: '100%', paddingHorizontal: 15, marginTop: -10
        }}>
        <Text
          style={{
            fontSize: 16,
            color: Color.black,
            fontFamily: Poppins.SemiBold,
          }}>
          Similar Auctions
        </Text>
      </View>
      <View style={{ width: '100%', alignItems: 'center', marginVertical: 10 }}>
        <FlatList
          data={AutionData.filter(item => item.id !== id)}
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
                    fontFamily:Poppins.Regular
                  }}>
                  No Properties Found
                </Text>
              </View>
            );
          }}
          style={{ width: '95%' }}
        />
      </View>
    </View>
  );
};

export default SimilarAuction;
