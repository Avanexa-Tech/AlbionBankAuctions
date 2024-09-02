import React, { useEffect, useState, useRef } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Animated,
  SectionList,
  Linking,
  FlatList,
  Dimensions,
  BackHandler,
} from 'react-native';
import Color from '../../Config/Color';
import Icon from 'react-native-vector-icons/Ionicons';
import FIcon from 'react-native-vector-icons/FontAwesome';
import MIcon from 'react-native-vector-icons/MaterialIcons';
import OIcon from 'react-native-vector-icons/Octicons';
import F6Icon from 'react-native-vector-icons/FontAwesome6';
import { Poppins } from '../../Global/FontFamily';
import fetchData from '../../Config/fetchData';
import { Image } from 'react-native';
import { Media } from '../../Global/Media';
import {
  base_albionbankauctions_url,
  base_auction_image_url,
  base_blogs_properties,
} from '../../Config/base_url';
import moment from 'moment';
import { Categories } from './Content';
import { setActionUserData } from '../../Redux';
import { useDispatch, useSelector } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AuctionItemCard from '../Auctioncomponents/AuctionItemCard';
import { scr_height } from '../../Utils/Dimensions';
import AuctionEnableLogin from '../Auctioncomponents/AuctionEnableLogin';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { useRoute } from '@react-navigation/native';

const { height, width } = Dimensions.get('screen');

const AutionHomeScreen = ({ navigation }) => {
  const [LatestNews, setLatestNews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loginVisible, setLoginVisible] = useState(false);
  const [Banner, setBanner] = useState({});
  const [Section] = useState([
    { id: 1, title: 'Categories', data: ['Categories'] },
    { id: 2, title: 'Banners', data: ['Banners'] },
    { id: 3, title: 'Top Banks', data: ['Top Banks'] },
    { id: 4, title: 'Popular Auctions', data: ['Popular Auctions'] },
    { id: 5, title: 'Albion Auctions', data: ['Albion Auctions'] },
    { id: 6, title: 'Latest News', data: ['Latest News'] },
  ]);
  const dispatch = useDispatch();
  const [AuctionData, setAuctionData] = useState([]);
  const [TopBanks, setTopBanks] = useState([]);
  const [eventBank, seteventBank] = useState([]);
  const routeName = useRoute();

  useEffect(() => {
    const backHandler = BackHandler.addEventListener('hardwareBackPress', handleBackButtonClick);
    return () => backHandler.remove();
  }, [routeName.name, navigation]);


  function handleBackButtonClick() {
    if (routeName.name === 'ActionHome') {
      BackHandler.exitApp();
      return true;
    } else {
      navigation.goBack();
      return true;
    }
  }


  const getApiData = async () => {
    try {
      //Auctions
      const getAuction = await fetchData.Auction({});
      setAuctionData(getAuction);

      //Top Banks
      const getBanks = await fetchData.get_banks({});
      setTopBanks(getBanks);

      //Top Banner
      const getBanner = await fetchData.Auction_get_banners({});
      setBanner(getBanner);

      //Blogs
      const LatestNews = await fetchData.Blogs({});
      setLatestNews(LatestNews);

      //Event Bank 
      // var data = 'event_bank=' + "Albion India";
      // const eventBankData = await fetchData.Auction_eventBankData({ data });

      // seteventBank(eventBankData)


    } catch (error) {
      console.log('error', error);
    }
  };

  const getEventBank = () => {
    try {
      const requestOptions = {
        method: "GET",
        redirect: "follow"
      };

      fetch("https://api.albionbankauctions.com/api/auction/show?event_bank=Albion India", requestOptions)
        .then((response) => response.json())
        .then((result) => {
          // console.log("SUCCESS ============== : ",result);
          seteventBank(result)
        })
        .catch((error) => console.error(error));
    } catch (error) {
      console.log("catch in getEvent_Bank : ", error);
    }
  }




  const Auction_userData = useSelector(
    state => state.UserReducer.auctionUserData,
  );
  var { id, name, email, phone_number, state, district } = Auction_userData;
  console.log("id ================== : ",id);
  
  const animated = useRef(new Animated.Value(0)).current;
  // const tabBarHeight = useBottomTabBarHeight()

  useEffect(() => {
    if (id == undefined ||
      (Auction_userData?.length > 0 && Auction_userData == undefined)) {
      Animated.timing(animated, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(animated, {
        toValue: 0,
        duration: 1000,
        useNativeDriver: true,
      }).start();
    }
  }, []);

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
    getAction_UserData();
    getEventBank();
    setLoading(true);
    getApiData().finally(() => {
      setLoading(false);
    });
  }, []);

  const dataArray = Object.entries(Banner)
    .filter(
      ([key, value]) =>
        key.startsWith('banner_') && !key.endsWith('_info_toggle'),
    )
    .map(([key, value]) => ({
      id: key,
      image: value,
    }));

  useEffect(() => {
    setLoginVisible(
      id == undefined ||
      (Auction_userData?.length > 0 && Auction_userData == undefined),
    );
  }, [Auction_userData]);

  return (
    <View style={{ flex: 1, backgroundColor: Color.white }}>
      {loading ? (
        <View
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            height: height,
          }}>
          <Image
            source={{ uri: Media.loader }}
            style={{ width: 80, height: 80, resizeMode: 'contain' }}
          />
        </View>
      ) : (
        <>
          <View
            style={{
              backgroundColor: Color.primary,
              height: 50,
              alignItems: 'center',
            }}
          />
          <View
            style={{
              alignItems: 'center',
            }}>
            <TouchableOpacity
              style={{
                marginHorizontal: 5,
                marginTop: -30,
                backgroundColor: Color.white,
                borderColor: Color.lightgrey,
                borderWidth: 1,
                flexDirection: 'row',
                alignItems: 'center',
                borderRadius: 5,
                width: '90%',
                height: 50,
                padding: 5,
                justifyContent: 'center',
                zIndex: 1,
              }}
              onPress={() => {
                navigation.navigate('AuctionSearchScreen');
              }}>
              <Icon
                style={{ width: 20, height: 20 }}
                color={Color.primary}
                name="search"
                size={20}
              />
              <Text
                style={{
                  flex: 1,
                  fontSize: 14,
                  marginHorizontal: 10,
                  color: Color.cloudyGrey,
                  fontFamily: Poppins.Medium,
                }}>
                {`Search by Bank Name, City, ID & Price`}
              </Text>
            </TouchableOpacity>
          </View>
          <SectionList
            sections={Section}
            scrollEnabled={true}
            keyExtractor={(item, index) => item + index}
            showsVerticalScrollIndicator={false}
            scrollEventThrottle={1}
            contentContainerStyle={{ padding: 10, flexGrow: 1 }}
            nestedScrollEnabled
            initialNumToRender={5}
            renderItem={({ item, index }) => {
              switch (item) {
                case 'Categories':
                  return (
                    <View style={{ marginVertical: 10 }}>
                      <FlatList
                        data={Categories?.slice(0, 9)}
                        keyExtractor={(item, index) => item + index}
                        numColumns={4}
                        ListHeaderComponent={() => {
                          return (
                            <View
                              style={{
                                flexDirection: 'row',
                                alignItems: 'flex-start',
                                marginHorizontal: 10,
                                justifyContent: 'center',
                              }}>
                              <View style={{ flex: 1 }}>
                                <Text
                                  style={{
                                    fontSize: 16,
                                    color: 'black',
                                    fontFamily: Poppins.SemiBold,
                                  }}>
                                  Categories
                                </Text>
                              </View>
                              <TouchableOpacity
                                style={{
                                  justifyContent: 'center',
                                  alignItems: 'flex-end',
                                }}
                                onPress={() => {
                                  // navigation.navigate('CategoriesList');
                                  navigation.navigate('ListScreen', {
                                    property_sub_category: '',
                                    event_bank: '',
                                  });
                                }}>
                                <Text
                                  style={{
                                    fontSize: 14,
                                    color: Color.primary,
                                    fontStyle: 'normal',
                                    fontFamily: Poppins.SemiBold,
                                  }}>
                                  View all
                                </Text>
                              </TouchableOpacity>
                            </View>
                          );
                        }}
                        renderItem={({ item, index }) => {
                          return (
                            <View
                              style={{
                                flex: 1,
                                margin: 5,
                                paddingTop: 5,
                                borderRadius: 10,
                              }}>
                              <TouchableOpacity
                                key={index}
                                onPress={() => {
                                  // console.log("Item ============== : ", item.value);

                                  navigation.navigate('ListScreen', {
                                    property_sub_category: item?.value,
                                    event_bank: '',
                                  });
                                }}
                                style={{
                                  flex: 1,
                                  alignItems: 'center',
                                }}>
                                <View
                                  style={{
                                    flex: 1,
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    borderRadius: 5,
                                    backgroundColor: '#FCE1EB50',
                                    // shadowColor: '#000',
                                    // shadowOffset: {
                                    //   width: 0,
                                    //   height: 1,
                                    // },
                                    // shadowOpacity: 0.2,
                                    // shadowRadius: 1.41,
                                    // elevation: 2,
                                    padding: 10,
                                  }}>
                                  <Image
                                    source={{ uri: item.image }}
                                    style={{
                                      borderRadius: 10,
                                      height: 30,
                                      width: 30,
                                      resizeMode: 'contain',
                                    }}
                                  />
                                </View>
                                <Text
                                  style={{
                                    fontSize: 11,
                                    color: Color.lightBlack,
                                    fontFamily: Poppins.Medium,
                                    marginTop: 5,
                                  }}>
                                  {item.label?.length > 10
                                    ? item.label?.substring(0, 8).concat('...')
                                    : item?.label}
                                </Text>
                              </TouchableOpacity>
                            </View>
                          );
                        }}
                      />
                    </View>
                  );
                case 'Banners':
                  return (
                    <View style={{ marginVertical: 10 }}>
                      <FlatList
                        data={dataArray}
                        horizontal
                        keyExtractor={(item, index) => item + index}
                        showsHorizontalScrollIndicator={false}
                        renderItem={({ item, index }) => {
                          const imageURL =
                            base_albionbankauctions_url + item.image;
                          return (
                            <TouchableOpacity onPress={() => {
                              // navigation.navigate('CategoriesList');
                              navigation.navigate('ListScreen', {
                                property_sub_category: '',
                                event_bank: '',
                              });
                            }}
                              key={index} style={{ marginHorizontal: 10 }}>
                              <Image
                                source={{ uri: imageURL }}
                                style={{
                                  height: 150,
                                  width: 300,
                                  borderRadius: 5,
                                  resizeMode: 'contain',
                                }}
                              />
                            </TouchableOpacity>
                          );
                        }}
                      />
                    </View>
                  );
                case 'Top Banks':
                  return (
                    <View style={{ marginVertical: 10 }}>
                      <View
                        style={{
                          flexDirection: 'row',
                          alignItems: 'flex-start',
                          marginVertical: 10,
                          marginHorizontal: 10,
                        }}>
                        <View style={{ flex: 1 }}>
                          <View
                            style={{
                              flexDirection: 'row',
                              justifyContent: 'flex-start',
                              alignItems: 'center',
                            }}>
                            <Text
                              style={{
                                fontSize: 16,
                                color: 'black',
                                fontFamily: Poppins.SemiBold,
                              }}>
                              Top Banks
                            </Text>
                            <Text
                              style={{
                                fontSize: 10,
                                paddingHorizontal: 10,
                                padding: 5,
                                marginStart: 10,
                                borderRadius: 50,
                                color: Color.white,
                                fontFamily: Poppins.SemiBold,
                                backgroundColor: Color.sunShade,
                                textAlign: 'center',
                              }}>
                              Auctions
                            </Text>
                          </View>
                        </View>
                      </View>
                      <FlatList
                        data={TopBanks}
                        horizontal
                        keyExtractor={(item, index) => item + index}
                        showsHorizontalScrollIndicator={false}
                        renderItem={({ item, index }) => {
                          return (
                            <TouchableOpacity
                              onPress={() => {
                                navigation.navigate('ListScreen', {
                                  property_sub_category: '',
                                  event_bank: item?.bank_name,
                                });
                              }}
                              key={index}
                              style={{
                                alignItems: 'center',
                                justifyContent: 'flex-start',
                                marginHorizontal: 10,
                                marginVertical: 10,
                              }}>
                              <View
                                style={{
                                  borderWidth: 1,
                                  borderColor: Color.lightgrey,
                                  borderRadius: 100,
                                  padding: 10,
                                }}>
                                <Image
                                  source={{
                                    uri:
                                      base_auction_image_url + item?.bank_logo,
                                  }}
                                  style={{
                                    width: 40,
                                    height: 40,
                                    resizeMode: 'contain',
                                  }}
                                />
                              </View>
                              <Text
                                style={{
                                  color: Color.black,
                                  fontSize: 14,
                                  fontFamily: Poppins.Medium,
                                  marginVertical: 10,
                                }}
                                numberOfLines={2}>
                                {item?.bank_name?.substring(0, 10)}
                              </Text>
                            </TouchableOpacity>
                          );
                        }}
                      />
                    </View>
                  );
                case 'Popular Auctions':
                  return (
                    <View style={{ marginVertical: 10 }}>
                      <View
                        style={{
                          flexDirection: 'row',
                          alignItems: 'flex-start',
                          marginVertical: 10,
                          marginHorizontal: 10,
                        }}>
                        <View style={{ flex: 1 }}>
                          <Text
                            style={{
                              fontSize: 16,
                              color: 'black',
                              fontFamily: Poppins.SemiBold,
                            }}>
                            Recent Auctions
                          </Text>
                        </View>
                      </View>
                      <FlatList
                        data={AuctionData?.slice(0, 10)}
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
                                No Auction Found
                              </Text>
                            </View>
                          );
                        }}
                      />
                    </View>
                  );
                case 'Albion Auctions':
                  return (
                    <View style={{ marginVertical: 10 }}>
                      <View style={{}}>
                        <Image
                          source={{ uri: Media.ActionVehicleBanner }}
                          style={{
                            width: '100%',
                            height: 180,
                            resizeMode: 'cover',
                            borderRadius: 10,
                          }}
                        />
                        <View
                          style={{
                            // width: 340,
                            margin: 5,
                            borderRadius: 10,
                            borderWidth: 1,
                            borderColor: Color.lightgrey,
                            marginHorizontal: 10,
                            marginVertical: 10,
                          }}>
                          <View
                            style={{
                              flexDirection: 'row',
                              alignItems: 'flex-start',
                              marginVertical: 10,
                              marginHorizontal: 10,
                            }}>
                            <View style={{ flex: 1 }}>
                              <View
                                style={{
                                  flexDirection: 'row',
                                  justifyContent: 'flex-start',
                                  alignItems: 'center',
                                }}>
                                <Text
                                  style={{
                                    fontSize: 16,
                                    color: Color.black,
                                    fontFamily: Poppins.SemiBold,
                                  }}>
                                  Albion Auctions
                                </Text>
                                <Text
                                  style={{
                                    fontSize: 10,
                                    paddingHorizontal: 10,
                                    padding: 5,
                                    marginStart: 10,
                                    borderRadius: 50,
                                    color: Color.white,
                                    fontFamily: Poppins.SemiBold,
                                    backgroundColor: Color.sunShade,
                                    textAlign: 'center',
                                  }}>
                                  Banks
                                </Text>
                              </View>
                              <Text
                                style={{
                                  fontSize: 10,
                                  color: Color.cloudyGrey,
                                  fontFamily: Poppins.Medium,
                                  flex: 1,
                                }}>
                                "Albion portal is designed to make eAuction easy
                                and convenient for buyers, bidders and bank
                                users alike." - use that content for auction
                                dashboard
                              </Text>
                            </View>
                            <View
                              style={{
                                flex: 1,
                                flexDirection: 'row',
                                alignItems: 'center',
                                justifyContent: 'center',
                              }}>
                              <View
                                style={{
                                  backgroundColor: Color.white,
                                  borderRadius: 100,
                                  borderWidth: 1,
                                  borderColor: Color.lightgrey,
                                  padding: 10,
                                  position: 'absolute',
                                  right: 50,
                                  top: 0,
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                }}>
                                <Image
                                  source={{ uri: Media.sbisub }}
                                  style={{
                                    width: 30,
                                    height: 30,
                                    resizeMode: 'contain',
                                  }}
                                />
                              </View>
                              <View
                                style={{
                                  backgroundColor: Color.white,
                                  borderRadius: 100,
                                  borderWidth: 1,
                                  borderColor: Color.lightgrey,
                                  padding: 10,
                                  position: 'absolute',
                                  right: 25,
                                  top: 0,
                                  // zIndex: 1,
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                }}>
                                <Image
                                  source={{ uri: Media.icicisub }}
                                  style={{
                                    width: 30,
                                    height: 30,
                                    resizeMode: 'contain',
                                  }}
                                />
                              </View>
                              <View
                                style={{
                                  backgroundColor: Color.white,
                                  borderRadius: 100,
                                  borderWidth: 1,
                                  borderColor: Color.lightgrey,
                                  padding: 10,
                                  position: 'absolute',
                                  right: 0,
                                  top: 0,
                                  zIndex: 1,
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                }}>
                                <Image
                                  source={{ uri: Media.unionsub }}
                                  style={{
                                    width: 30,
                                    height: 30,
                                    resizeMode: 'contain',
                                  }}
                                />
                              </View>
                            </View>
                          </View>
                        </View>
                      </View>
                    </View>
                  );
                case 'Latest News':
                  return (
                    <View style={{ marginVertical: 10 }}>
                      <View
                        style={{
                          flexDirection: 'row',
                          alignItems: 'flex-start',
                          marginVertical: 10,
                          marginHorizontal: 10,
                        }}>
                        <View style={{ flex: 1 }}>
                          <Text
                            style={{
                              fontSize: 16,
                              color: 'black',
                              fontFamily: Poppins.SemiBold,
                            }}>
                            Urgent Sale
                          </Text>
                        </View>
                      </View>
                      <FlatList
                        data={eventBank}
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
                                No Auction Found
                              </Text>
                            </View>
                          );
                        }}
                      />
                    </View>
                  );
              }
            }}
          />
        </>
      )}
      <AuctionEnableLogin
        visible={loginVisible}
        setVisible={setLoginVisible}
        tabBarHeight={0}
        animated={animated}
        width={width}
      />
    </View>
  );
};

export default AutionHomeScreen;
