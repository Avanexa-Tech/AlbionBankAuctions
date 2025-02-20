import React, { useEffect, useState, useRef, useCallback } from 'react';
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
  Modal,
  Alert,
  ActivityIndicator,
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
  baseUrl,
} from '../../Config/base_url';
import moment from 'moment';
import { Categories } from './Content';
import { setActionUserData, setPaySuccessVisible } from '../../Redux';
import { useDispatch, useSelector } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AuctionItemCard from '../Auctioncomponents/AuctionItemCard';
import { scr_height, scr_width } from '../../Utils/Dimensions';
import AuctionEnableLogin from '../Auctioncomponents/AuctionEnableLogin';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { useFocusEffect, useNavigation, useRoute } from '@react-navigation/native';
import { Iconviewcomponent } from '../../Components/Icontag';
import { ImageBackground } from 'react-native';
import { color } from 'react-native-elements/dist/helpers';
import common_fn from '../../Config/common_fn';
import PostCompletedModal from './OrderCompletionModal';
import { RefreshControl } from 'react-native';

const { height, width } = Dimensions.get('screen');

const AutionHomeScreen = () => {
  const navigation = useNavigation();
  const [LatestNews, setLatestNews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loginVisible, setLoginVisible] = useState(false);
  const [Banner, setBanner] = useState({});
  const [Section] = useState([
    { id: 1, title: 'Categories', data: ['Categories'] },
    { id: 2, title: 'Banners', data: ['Banners'] },
    { id: 3, title: 'Top Banks', data: ['Top Banks'] },
    { id: 4, title: 'Popular Auctions', data: ['Popular Auctions'] },
    { id: 5, title: 'Recent Auction', data: ['Recent Auction'] },
    { id: 6, title: 'Albion Auctions', data: ['Albion Auctions'] },
    { id: 7, title: 'Latest News', data: ['Latest News'] },
  ]);
  const dispatch = useDispatch();
  const [AuctionData, setAuctionData] = useState([]);
  const [RecentData, setRecentData] = useState([]);
  const [TopBanks, setTopBanks] = useState([]);
  const [eventBank, seteventBank] = useState([]);
  const routeName = useRoute();
  const [imageVisible, setImageVisible] = useState(false);
  const [planExpiredStatus, setPlanExpiredStatus] = useState(false);
  const [plan,setPlan]=useState(null);

  const [planStatus, setPlanStatus] = useState("");
  const [refreshing, setRefreshing] = useState(false);
  const [fetchingItems, setFetchingItems] = useState({
    upComing : false,
    recentAuction : false,
    banks:false
  })

  const data = useSelector(
    state => state.UserReducer.auctionUserData,
  );

  // useEffect(() => {
  //   if (data?.id == null && data?.id == undefined) {  // Using optional chaining to prevent errors
  //     navigation.replace("OnboardingScreen2");
  //   }
  // }, [data.id])


  useEffect(() => {
    getAction_UserData();
    getEventBank();
    getApiData();
  }, []);

  useFocusEffect(useCallback(() => {
    plan_CheckData();
  }, []))

  useEffect(() => {
    if (data?.id) {  // Using optional chaining to prevent errors
      user_CheckData();
    }
    else {
      navigation.replace("OnboardingScreen2");  // Use replace to prevent going back
    }
  }, [data.id])

  const animated = useRef(new Animated.Value(0)).current;
  // const tabBarHeight = useBottomTabBarHeight()

  // useEffect(() => {
  //   if (id == undefined ||
  //     (Auction_userData?.length > 0 && Auction_userData == undefined)) {
  //     Animated.timing(animated, {
  //       toValue: 1,
  //       duration: 1000,
  //       useNativeDriver: true,
  //     }).start();
  //   } else {
  //     Animated.timing(animated, {
  //       toValue: 0,
  //       duration: 1000,
  //       useNativeDriver: true,
  //     }).start();
  //   }
  // }, []);

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

 
  const plan_CheckData = async () => {
    try {
      const myHeaders = new Headers();
      myHeaders.append("accept", "*/*");

      const requestOptions = {
        method: "GET",
        headers: myHeaders,
        redirect: "follow"
      };

      // fetch(`http://192.168.29.204:5000/api/plan/user?user_id=${data?.id}`, requestOptions)
      fetch(`${baseUrl}api/plan/user?user_id=${data?.id}&status=activated`, requestOptions)
        // fetch(`https://api.albionbankauctions.com/api/plan/user?user_id=${data?.id}&status=activated`, requestOptions)
        .then((response) => response.json())
        .then((result) => {
          if (result?.status) {
            setPlan(result?.data)
          }
        }
        )
        .catch((error) => console.error(error));

    } catch (error) {
      console.log("catch in plan_CheckData_Home : ", error);
    }
  }
  // const plan_CheckData = async () => {
  //   console.log("triggered");
  //   try {
  //     const myHeaders = new Headers();
  //     myHeaders.append("accept", "*/*");

  //     const requestOptions = {
  //       method: "GET",
  //       headers: myHeaders,
  //       redirect: "follow"
  //     };
  //     // fetch(`https://api.albionbankauctions.com/api/plan/check/${data?.id}`, requestOptions)
  //     fetch(`https://testapi.albionbankauctions.com/api/plan/check/${data?.id}`, requestOptions)
  //       .then((response) => response.json())
  //       .then((result) => {
  //         console.log("Plan Status =============== :", result);
  //         setImageVisible(!result.status)
  //       })
  //       .catch((error) => console.error("catch in plan_CheckData_API:", error))
  //       .finally(() => {
  //         setLoading(false); // Mark loading as complete
  //       });
  //   } catch (error) {
  //     console.log("catch in plan_CheckData_Home : ", error);
  //     setLoading(false); // Ensure loading is stopped even on error
  //   }
  // }

  const user_CheckData = async () => {
    try {
      const myHeaders = new Headers();
      myHeaders.append("accept", "*/*");
      const requestOptions = {
        method: "GET",
        headers: myHeaders,
        redirect: "follow"
      };
      // fetch(`http://192.168.29.204:5000/api/plan/user?user_id=${id}`, requestOptions) 
      fetch(`${baseUrl}api/plan/user?user_id=${data?.id}&status=activated`, requestOptions)
        // fetch(`https://api.albionbankauctions.com/api/plan/user?user_id=${data?.id}&status=activated`, requestOptions)
        .then((response) => response.json())
        .then((result) => {
          if (result?.status == true) {
            setPlanStatus(result?.data[0]?.status);
            if (result.data.length) {
              if (result?.data[0]?.status == null || result?.data[0]?.status === "expired") {
                setPlanExpiredStatus(true);
              }
            } else {
              setImageVisible(true)
            }
          }
        }
        )
        .catch((error) => console.error(error));

    } catch (error) {
      console.log("catch in plan_CheckData_Home : ", error);
    }
  }


  const dataArray = Object.entries(Banner)
    .filter(
      ([key, value]) =>
        key.startsWith('banner_') && !key.endsWith('_info_toggle'),
    )
    .map(([key, value]) => ({
      id: key,
      image: value,
    }));

  // useEffect(() => {
  //   setLoginVisible(
  //     id == undefined ||
  //     (Auction_userData?.length > 0 && Auction_userData == undefined),
  //   );
  // }, [Auction_userData]);


  const getApiData = useCallback(async (isRefreshing = false) => {
    if (isRefreshing) {
      setRefreshing(true);
    }
    try {
      setFetchingItems({...fetchingItems, upComing: true})
      const getAuction = await fetchData.Auction({});
      setAuctionData(getAuction);
      setFetchingItems({...fetchingItems, upComing: false})
      //Auctions
      setFetchingItems({...fetchingItems, recentAuction: true})
      const Recent_Auction = await fetchData.Recent_Auction({});
      setRecentData(Recent_Auction);
      setFetchingItems({...fetchingItems, recentAuction: false})

      //Top Banks
      setFetchingItems({...fetchingItems, banks: true})
      const getBanks = await fetchData.get_banks({});
      // console.log("Banks ------------ :", getBanks);

      setTopBanks(getBanks);
      setFetchingItems({...fetchingItems, banks: false})

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
      console.log('catch in getApiData_HomeScreen:', error);
    } finally {
      if (isRefreshing) {
        setRefreshing(false);
      }
    }
  }, [])

  const handleRefresh = () => {
    getApiData();
  };

  const getEventBank = () => {
    try {
      const requestOptions = {
        method: "GET",
        redirect: "follow"
      };

      fetch(`${baseUrl}api/auction/show?event_bank=Albion India`, requestOptions)
        // fetch("https://api.albionbankauctions.com/api/auction/show?event_bank=Albion India", requestOptions)
        .then((response) => response.json())
        .then((result) => {
          // console.log("SUCCESS BANK============== : ", result);
          seteventBank(result);
        })
        .catch((error) => console.error(error));
    } catch (error) {
      console.log("catch in getEvent_Bank : ", error);
    }
  }


  const claimFreePlanClick = async () => {
    try {

      const myHeaders = new Headers();
      myHeaders.append("accept", "*/*");
      myHeaders.append("Content-Type", "application/json");

      const raw = JSON.stringify({
        "plan_id": 1,
        "user_id": data?.id
      });

      const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
      };

      const response = await fetch(`${baseUrl}api/plan`, requestOptions)
      let result = await response.json();

      if(result?.status == true)
      {
        common_fn.showToast("7 Days Plan Activated");
        await AsyncStorage.removeItem("logindetails")
      }
      setImageVisible(false)
    }
    catch (error) {
      console.log("catch in claimFree_Plan_Click_HomeScreen : ", error);
    }
  }


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
                justifyContent: 'center', alignItems: 'center',
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
                  fontSize: 12,
                  marginHorizontal: 10,
                  color: Color.cloudyGrey,
                  fontFamily: Poppins.Medium,
                }}>
                Search by Bank Name, City, ID & Price
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
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
            }
            renderItem={({ item, index }) => {
              switch (item) {
                case 'Categories':
                  return (
                    <View>
                      <View
                        style={{
                          flexDirection: 'row',
                          alignItems: 'flex-start',
                          margin: 10,
                          justifyContent: 'center',
                        }}>
                        <View style={{ flex: 1 }}>
                          <Text
                            style={{
                              fontSize: 16,
                              color: Color.black,
                              fontFamily: Poppins.SemiBold,
                            }}>
                            Categories
                          </Text>
                        </View>
                        {/* <TouchableOpacity
                          style={{
                            justifyContent: 'center',
                            alignItems: 'flex-end',
                          }}
                          onPress={() => {
                            navigation.navigate('ListScreen', {
                              property_sub_category: '',
                              event_bank: '',
                            });
                          }}>
                          <Text
                            style={{
                              fontSize: 14,
                              color: Color.primary,
                              fontFamily: Poppins.Bold,
                            }}>
                            View all
                          </Text>
                        </TouchableOpacity> */}
                      </View>
                      <View
                        style={{
                          flexDirection: 'row',
                          flexWrap: 'wrap',
                          justifyContent: 'space-between',
                          alignItems: 'flex-start',
                          paddingHorizontal: 5,
                        }}>
                        {Categories?.slice(0, 7)?.map((item, index) => {
                          return (
                            <TouchableOpacity
                              key={index}
                              onPress={() => {
                                // console.log("item?.value =============== :", item?.value);

                                navigation.navigate('ListScreen', {
                                  property_sub_category: item?.value,
                                  event_bank: '',
                                });
                              }}
                              style={{
                                justifyContent: 'flex-start',
                                alignItems: 'center', marginHorizontal: 0, marginVertical: 10,
                                width: '21%',
                              }}>
                              <View
                                style={{
                                  backgroundColor: '#FCE1EB50',
                                  borderRadius: 100,
                                  width: 60,
                                  height: 60,
                                  justifyContent: 'center', alignItems: 'center'
                                }}>
                                <Image
                                  source={{ uri: item.image }}
                                  style={{
                                    width: 45,
                                    height: 45,
                                    resizeMode: 'contain',
                                    borderRadius: 100,
                                  }}
                                />
                              </View>
                              <Text
                                style={{
                                  textAlign: 'center',
                                  fontSize: 11,
                                  color: Color.lightBlack,
                                  fontFamily: Poppins.Medium,
                                  marginTop: 5,
                                }} numberOfLines={1} ellipsizeMode='tail'>
                                {item?.label}
                                {/* {item.label?.length > 15
                                  ? item.label?.substring(0, 10).concat('...')
                                  : item?.label} */}
                              </Text>
                            </TouchableOpacity>
                          );
                        })}
                        <TouchableOpacity
                          key={index}
                          onPress={() => {
                            navigation.navigate('CategoriesList');
                          }}
                          style={{
                            justifyContent: 'flex-start',
                            alignItems: 'center',
                            width: '21%',
                          }}>
                          <View
                            style={{
                              backgroundColor: '#FCE1EB50',
                              borderRadius: 100,
                              width: 60,
                              height: 60,
                              justifyContent: 'center', alignItems: 'center'
                            }}>
                            <Image
                              source={{ uri: 'https://albion-backend.s3.ap-south-1.amazonaws.com/Mobile+Apk+Banners/assets/assets/Icon_others.png' }}
                              // source={require('../../assets/image/viewall.png')}
                              style={{
                                width: 40,
                                height: 40,
                                resizeMode: 'contain',
                                borderRadius: 100,
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
                            View All
                          </Text>
                        </TouchableOpacity>
                      </View>

                      {/* <FlatList
                        data={Categories?.slice(0, 7)}
                        keyExtractor={(item, index) => item + index}
                        numColumns={4}
                        ListHeaderComponent={() => {
                          return (
                            <View
                              style={{
                                flexDirection: 'row',
                                alignItems: 'flex-start',
                                margin: 10,
                                justifyContent: 'center',
                              }}>
                              <View style={{ flex: 1 }}>
                                <Text
                                  style={{
                                    fontSize: 18,
                                    color: Color.black,
                                    fontFamily: Poppins.Bold,
                                    fontWeight: '700'
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
                                    fontFamily: Poppins.Bold,
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
                                    padding: 10,
                                  }}>
                                  <Image
                                    source={{ uri: item.image }}
                                    style={{
                                      borderRadius: 10,
                                      height: 50,
                                      width: 50,
                                      resizeMode: 'contain',
                                    }}
                                  />
                                </View>
                                <Text
                                  style={{
                                    fontSize: 14,
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
                      /> */}
                      {/* <TouchableOpacity
                        onPress={() => {
                          navigation.navigate('category');
                        }}
                        style={{
                          justifyContent: 'center',
                          alignItems: 'center',
                          marginVertical: 10,
                          width: '20%',
                        }}>
                        <View style={{ alignItems: 'center' }}>
                          <View
                            style={{
                              backgroundColor: '#FCE1EB50',
                              borderRadius: 100,
                              width: 50,
                              height: 50,
                            }}>
                            <Image
                              source={Media.Icon_others}
                              style={{
                                width: 50,
                                height: 50,
                                resizeMode: 'contain',
                              }}
                            />
                          </View>
                          <Text
                            style={{
                              fontSize: 12,
                              color: Color.black,
                              font: Poppins.SemiBold,
                              paddingVertical: 5,
                            }}>
                            View All
                          </Text>
                        </View>
                      </TouchableOpacity> */}
                    </View>
                  );
                case 'Banners':
                  return (
                    <View style={{ marginVertical: 0 }}>
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
                                color: Color.black,
                                fontFamily: Poppins.SemiBold,
                              }}>
                              Top Banks
                            </Text>
                            <Text
                              style={{
                                fontSize: 11,
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
                            showsHorizontalScrollIndicator={true}
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
                                      fontSize: 12,
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
                    <View style={{ marginVertical: 0 }}>
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
                              color: Color.black,
                              fontFamily: Poppins.SemiBold,
                            }}>
                              Upcoming Auctions
                          </Text>
                        </View>
                      </View>
                      {
                        fetchingItems.upComing ? <View
                          style={{
                            display: "flex",
                            width: scr_width,
                            justifyContent: "center",
                            alignItems: "center"
                          }}
                        >
                          <Text style={{ fontFamily: Poppins.Light, fontSize: 14, textAlign: "center" }}><ActivityIndicator
                            color={Color.primary}
                            size={'large'}
                          /></Text></View> : (
                          <FlatList
                            data={AuctionData?.slice(0, 10)}
                            keyExtractor={(item, index) => item + index}
                            renderItem={({ item, index }) => {
                              return (
                                <AuctionItemCard
                                  navigation={navigation}
                                  item={item}
                                  index={index}
                                  isExpired={!!plan && plan.length ? plan[0].status == 'activated' && plan[0].plan_id > 1 ? false : true : true}
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
                            refreshControl={
                              <RefreshControl
                                refreshing={refreshing}
                                onRefresh={handleRefresh}
                              />
                            }
                          />
                        )
                      }
                    </View>
                  );
                case 'Recent Auction':
                  return (
                    <View style={{ marginVertical: 0 }}>
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
                              color: Color.black,
                              fontFamily: Poppins.SemiBold,
                            }}>
                    Recent Auctions
                          </Text>
                        </View>
                      </View>
                      {
                        fetchingItems.recentAuction ? <View
                          style={{
                            display: "flex",
                            width: scr_width,
                            justifyContent: "center",
                            alignItems: "center"
                          }}
                        >
                          <Text style={{ fontFamily: Poppins.Light, fontSize: 14, textAlign: "center" }}><ActivityIndicator
                            color={Color.primary}
                            size={'large'}
                          /></Text></View> :
                          <FlatList
                            data={RecentData?.slice(0, 10)}
                            keyExtractor={(item, index) => item + index}
                            renderItem={({ item, index }) => {
                              // let userHaveActivePlan = expireStatus !== 'expired' && planStatus > 1                          
                              return (
                                <AuctionItemCard
                                  navigation={navigation}
                                  item={item}
                                  index={index}
                                  isExpired={!!plan && plan.length ? plan[0].status == 'activated' && plan[0].plan_id > 1 ? false : true : true}
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
                            refreshControl={
                              <RefreshControl
                                refreshing={refreshing}
                                onRefresh={handleRefresh}
                              />
                            }
                          />
                      }
                    </View>
                  );
                
                case 'Latest News':
                  return (
                    <View style={{ marginVertical: 0 }}>
                     {
                      eventBank?.length == 0 ?
                      null:(
                        <>
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
                              color: Color.black,
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
                              isExpired={!!plan && plan.length ? plan[0].status == 'activated' && plan[0].plan_id > 1 ? false : true : true}
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
                                  resizeMode: 'contai',
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
                        </>
                      )
                     } 
                    </View>
                  );
              }
            }}
          />
          <AuctionEnableLogin
            visible={loginVisible}
            setVisible={setLoginVisible}
            tabBarHeight={0}
            animated={animated}
            width={width}
          />
          <Modal transparent={true} animationType="fade" visible={imageVisible}>
            <View style={{ backgroundColor: 'rgba(0, 0, 0, 0.8)', flex: 1 }}>
              <View
                style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ImageBackground
                  source={require('../../assets/image/claim.png')}
                  style={{
                    width: 300,
                    height: 400,
                    justifyContent: 'center',
                    alignItems: 'center',
                    resizeMode: 'contain',
                  }}
                >
                  <TouchableOpacity
                    onPress={() => {
                      claimFreePlanClick();
                    }}
                    style={{
                      position: 'absolute', bottom: 20,
                      width: '90%', height: 50, backgroundColor: Color.primary, borderRadius: 30, justifyContent: 'center', alignItems: 'center'
                    }}>
                    <Text style={{ fontSize: 18, fontFamily: Poppins.Bold, color: Color.white }}>Claim Now</Text>
                  </TouchableOpacity>
                </ImageBackground>
              </View>
            </View>
          </Modal>

          {planExpiredStatus && (
            <Modal transparent={true} animationType="fade" visible={planExpiredStatus}>
              <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.8)', flex: 1 }}>
                <View
                  style={{ width: 300, height: 350, justifyContent: 'center', alignItems: 'center', backgroundColor: Color.white, borderRadius: 5 }}>
                  <Text style={{ fontSize: 14, color: Color.lightBlack, fontFamily: Poppins.SemiBold, paddingVertical: 5 }}>Your Plan is Expired! Please Purchase</Text>
                  <ImageBackground
                    source={require('../../assets/image/free.jpg')}
                    style={{
                      width: 200,
                      height: 220,
                      justifyContent: 'center',
                      alignItems: 'center',
                      resizeMode: 'contain',
                    }}
                  >
                  </ImageBackground>
                  <TouchableOpacity
                    onPress={() => {
                      setPlanExpiredStatus(false);
                      navigation.navigate("AuctionPrime");
                    }}
                    style={{
                      // position: 'absolute', bottom: 20,
                      width: '80%', height: 45, backgroundColor: Color.primary, borderRadius: 30, justifyContent: 'center', alignItems: 'center'
                    }}>
                    <Text style={{ fontSize: 12, fontFamily: Poppins.Bold, color: Color.white }}>Purchase Plan Now</Text>
                  </TouchableOpacity>

                </View>
              </View>
            </Modal>
          )}

        </>
      )}
      <PostCompletedModal navigation={navigation} />
    </View >
  );
};

export default AutionHomeScreen;
