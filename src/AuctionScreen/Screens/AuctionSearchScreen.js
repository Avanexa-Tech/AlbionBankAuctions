import React, { useEffect, useRef, useState } from 'react';
import {
  Text,
  View,
  FlatList,
  Dimensions,
  TouchableOpacity,
  Image,
  Animated, BackHandler
} from 'react-native';
import OIcon from 'react-native-vector-icons/Octicons';
import F6Icon from 'react-native-vector-icons/FontAwesome6';
import Color from '../../Config/Color';
import { ActivityIndicator, Searchbar } from 'react-native-paper';
import { useSelector } from 'react-redux';
import ItemCard from '../../Components/ItemCard';
import MCIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Poppins } from '../../Global/FontFamily';
import fetchData from '../../Config/fetchData';
import { Media } from '../../Global/Media';
import moment from 'moment';
import { base_auction_image_url } from '../../Config/base_url';
import AuctionItemCard from '../Auctioncomponents/AuctionItemCard';

const { height } = Dimensions.get('screen');

const AuctionSearchScreen = ({ navigation }) => {
  const [search, setSearch] = useState('');
  const [AuctionData, setAuctionData] = useState([]);
  const [loadMore, setLoadMore] = useState(false);
  const [endReached, setEndReached] = useState(false);
  const [page, setPage] = useState(0);

  useEffect(() => {
    const backAction = () => {
      navigation.goBack();  // Navigates to the previous screen
      return true;           // Prevent default behavior (exit app)
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction
    );

    return () => backHandler.remove();  // Clean up the listener on unmount
  }, [navigation]);

  const propertySearch = async () => {

    try {
      var data = search !== '' && 'like=' + search;
      const getAuction = await fetchData.get_Auction(data);
      setPage(1)
      console.log("dfssdfsdfasdfs=======|||||||||||||||||||||||||", getAuction, data)
      setAuctionData(getAuction);
    } catch (error) {
      console.log('error', error);
    }
  };
  useEffect(() => {
    propertySearch()
  }, [search])

  const loadMoreData = async () => {
    if (loadMore || endReached || AuctionData.length < 1) {
      return;
    }
    setLoadMore(true);
    try {
      const nextPage = page + 1;
      var data = search !== '' ? 'like=' + search + '&page_number=' + nextPage : "page_number=" + nextPage;
      console.log("fdkgnkjfdhjjkfdhdkl", data);

      const response = await fetchData.get_Auction(data);
      if (response.length > 0) {
        setPage(nextPage);
        // Only add the new data if it matches the search query
        const updatedData = response.filter(item =>
          item.property_sub_category
            .toLowerCase()
            .includes(search.toLowerCase()),
        );
        console.log("dfssdfsdfasdfs=>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>")
        setAuctionData([...AuctionData, ...updatedData]);
      } else {
        setEndReached(true);
      }
    } catch (error) {
      console.error('Error fetching data:', error.response.data);
    } finally {
      setLoadMore(false);
    }
  };

  return (
    <View
      style={{
        flex: 1,
        paddingHorizontal: 10,
        marginVertical: 10,
        paddingBottom: 5,
        backgroundColor: Color.white,
      }}>
      <Searchbar
        placeholder={`Search by Bank Name, City, ID & Price`}
        placeholderTextColor={Color.cloudyGrey}
        onChangeText={query => setSearch(query)}
        value={search}
        style={{
          borderRadius: 10,
          backgroundColor: Color.white,
          borderWidth: 1,
          borderColor: Color.primary,
          color: Color.black,
        }}
        inputStyle={{ color: Color.black }}
        iconColor={Color.cloudyGrey}
      />

      <FlatList
        data={AuctionData}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item, index) => item + index}
        renderItem={({ item, index }) => (
          <AuctionItemCard navigation={navigation} item={item} index={index} />
        )}
        onEndReached={() => {
          loadMoreData();
        }}
        onEndReachedThreshold={0.1}
        ListFooterComponent={() => {
          return (
            <View style={{ alignItems: 'center', justifyContent: 'center' }}>
              {loadMore && (
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Text
                    style={{
                      fontSize: 12,
                      color: Color.black,
                      marginHorizontal: 10,
                      fontFamily: Poppins.Medium,
                    }}>
                    Loading...
                  </Text>
                  <ActivityIndicator />
                </View>
              )}
            </View>
          );
        }}
        ListEmptyComponent={() => (
          <View
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              marginVertical: 10,
              height: height / 2,
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
              }}>
              No Properties Found
            </Text>
          </View>
        )}
      />
    </View>
  );
};

export default AuctionSearchScreen;
