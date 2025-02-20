import React, { useState, useEffect, useRef } from 'react';
import {
  Text,
  View,
  FlatList,
  Dimensions,
  TouchableOpacity,
  Image,
  BackHandler,
  Animated,
  TextInput,
  Modal, ActivityIndicator,
  useColorScheme
} from 'react-native';
import DatePicker from 'react-native-ui-datepicker';
import { Dropdown } from 'react-native-element-dropdown';
import Color from '../../Config/Color';
import Icon from 'react-native-vector-icons/Ionicons';
import MCIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import OIcon from 'react-native-vector-icons/Octicons';
import F6Icon from 'react-native-vector-icons/FontAwesome6';
import { Media } from '../../Global/Media';
import { Poppins } from '../../Global/FontFamily';
import { Calendar } from 'react-native-calendars';
import moment from 'moment';
import fetchData from '../../Config/fetchData';
import { base_auction_image_url, baseUrl } from '../../Config/base_url';
import { Categories } from './Content';
import AuctionItemCard from '../Auctioncomponents/AuctionItemCard';
import { useRoute } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import common_fn from '../../Config/common_fn';
import dayjs from 'dayjs';
import { Alert } from 'react-native';
import { enGB } from 'date-fns/locale';
import { Iconviewcomponent } from '../../Components/Icontag';
import { ScrollView } from 'react-native-gesture-handler';


const { height } = Dimensions.get('screen');

const ListScreen = ({ navigation, route }) => {
  const colorScheme = useColorScheme();
  const routeName = useRoute();
  const [property_sub_category, setPropertySubCategory] = useState(route.params.property_sub_category);
  const [event_bank, setEvent_bank] = useState(route.params.event_bank);
  const [calenderVisible, setCalenderVisible] = useState(false);
  const sortdata = useSelector(state => state.PropertyReducer.AuctionSort);
  const [Location, setLocation] = useState([]);
  const [AutionFilterData, setAutionFilterData] = useState([]);
  const [markDates, setMarkedDates] = useState({});
  const [starttDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const [loading, setLoading] = useState(false);
  const animatedOpacityValue = useRef(new Animated.Value(0)).current;
  const [loadMore, setLoadMore] = useState(false);
  const [endReached, setEndReached] = useState(false);
  const [page, setPage] = useState(0);
  const [dateRange, setDateRange] = useState({});
  const [property] = useState([
    { label: '50,000', value: '50,000' },
    { label: '1,00,000', value: '1,00,000' },
    { label: '1,50,000', value: '1,50,000' },
    { label: '2,00,000', value: '2,00,000' },
  ]);
  const [minAmount, setMinAmount] = useState('');
  const [maxAmount, setMaxAmount] = useState('');
  const [selectState, setSelectState] = useState({});
  const [currentDistrict, setCurrentDistrict] = useState({});
  const [State, setState] = useState([]);
  const [district, setDistrict] = useState([]);
  const [AutionData, setAutionData] = useState([]);
  const [requestModal, setRequestModal] = useState(false);
  const [updateLoader, setUpdateLoader] = useState(false);
  const [cleardata, setcleardata] = useState(false);
  const [plan, setPlan] = useState(null);

  // const Auction_userData = useSelector(
  //   state => state.UserReducer.auctionUserData,
  // );
  // var { id, name, phone_number, email } = Auction_userData;

  const data = useSelector(
    state => state.UserReducer.auctionUserData,
  );

  useEffect(() => {
    setLoading(true);
    getApiData()
    plan_CheckData()
  }, [
    // selectProperty,
    property_sub_category,
    selectState,
    currentDistrict,
    event_bank,
    sortdata,
    starttDate,
    endDate
  ]);

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
            setTimeout(() => {              
              setLoading(false);
            }, 1000);
          }
        }
        )
        .catch((error) => {console.error(error),setLoading(false)});

    } catch (error) {
      console.log("catch in plan_CheckData_Home : ", error);
    }
  }

  // useEffect(() => {
  //   if (!property_sub_category) {
  //     setEvent_bank(""); // Reset bank selection if category is cleared
  //   }
  // }, [property_sub_category]);

  // console.log("property_sub_category ========= :" + property_sub_category + " selectProperty  " + selectProperty);


  const dataPayload = () => {
    const params = new URLSearchParams();
    let payload = {
      property_sub_category: property_sub_category,
      // selectProperty: selectProperty,
      event_bank: event_bank,
      state: selectState?.name,
      district: currentDistrict?.name,
      sort: sortdata?.value,
      order: sortdata?.order,
      min: minAmount,
      max: maxAmount,
      from: dayjs(starttDate).format('YYYY-MM-DD'),
      to: dayjs(endDate).format('YYYY-MM-DD'),
    };

    for (const key in payload) {
      if (!!payload[key]) {
        params.append(key, payload[key]);
      }
    }
    const queryString = params.toString();
    const query = queryString.replace('%20', ' ');

    return query;
  };

  const getApiData = async () => {
    try {
      let payload = {
        property_sub_category: property_sub_category,
        // selectProperty: selectProperty,
        event_bank: event_bank,
        state: selectState?.name,
        district: currentDistrict?.name,
        sort: sortdata?.value,
        order: sortdata?.order,
        min: minAmount,
        max: maxAmount,
        from: starttDate,
        to: endDate
      };
      const params = new URLSearchParams();

      for (const key in payload) {
        if (payload[key] != null && payload[key]?.toString().trim().length > 0) {
          params.append(key, payload[key]);
        }
      }

      const queryString = params.toString();
      const query = queryString.replace(/%20/g, ' ');


      const getAuction = await fetchData.get_Auction(query);
      setAutionData(getAuction);

      //get State
      const getState = await fetchData.Auction_getState({});
      setState(getState);
      //get District
      var districtData = `state=${selectState?.id}`;
      const get_district = await fetchData.Auction_getDistrict(districtData);
      setDistrict(get_district);
    } catch (error) {
      console.log('catch in getApiData_Api :', error);
    }
  };


  const onDayPress = (day) => {
    let newMarkedDates = {};

    // if (!isStartDatePicked) {
    //   // If start date is not picked yet
    //   setStartDate(day.dateString);
    //   setEndDate(null);
    //   newMarkedDates[day.dateString] = {
    //     startingDay: true,
    //     color: '#00B0BF',
    //     textColor: '#FFFFFF',
    //   };
    //   setIsStartDatePicked(true);
    // } else {
    // If start date is already picked, set end date
    const start = moment(starttDate);
    const end = moment(day.dateString);
    const range = end.diff(start, 'days');

    if (range > 0) {
      for (let i = 0; i <= range; i++) {
        const tempDate = start.clone().add(i, 'days').format('YYYY-MM-DD');

        newMarkedDates[tempDate] = {
          color: '#00B0BF',
          textColor: '#FFFFFF',
        };

        if (i === 0) {
          newMarkedDates[tempDate].startingDay = true;
        } else if (i === range) {
          newMarkedDates[tempDate].endingDay = true;
        }
      }

      setStartDate(start.format('YYYY-MM-DD'));
      setEndDate(end.format('YYYY-MM-DD'));
    } else {
      // If end date is before start date, reset selection
      setStartDate(day.dateString);
      // setEndDate(null);
      newMarkedDates[day.dateString] = {
        startingDay: true,
        color: '#00B0BF',
        textColor: '#FFFFFF',
      };
    }
    setMarkedDates(newMarkedDates);
    // setIsStartDatePicked(false);
    if (starttDate && endDate) {
      setCalenderVisible(false);
    }
    // }

    // setMarkedDates(newMarkedDates);
    // setCalenderVisible(false);
  };

  // const onDayPress = day => {
  //   if (isStartDatePicked == false) {
  //     let markedDates = {};
  //     markedDates[day.dateString] = {
  //       startingDay: true,
  //       color: '#00B0BF',
  //       textColor: '#FFFFFF',
  //     };
  //     setMarkedDates(markedDates);
  //     setIsStartDatePicked(true);
  //     setIsEndDatePicked(false);
  //     setStartDate(day.dateString);
  //   } else {
  //     let markedDates = markDates;
  //     let startDate = moment(starttDate);
  //     let endDate = moment(day.dateString);
  //     let range = endDate.diff(startDate, 'days');
  //     if (range > 0) {
  //       for (let i = 1; i <= range; i++) {
  //         let tempDate = startDate.clone().add(1, 'day');
  //         // tempDate = moment(tempDate).format('YYYY-MM-DD');
  //         if (i < range) {
  //           markedDates[tempDate.toISOString()] = { color: '#00B0BF', textColor: '#FFFFFF' };
  //         } else {
  //           markedDates[tempDate.toISOString()] = {
  //             endingDay: true,
  //             color: '#00B0BF',
  //             textColor: '#FFFFFF',
  //           };
  //         }
  //       }

  //       // console.log("starttDate ============ :", starttDate + "day.dateString ============= : " + day.dateString);

  //       setMarkedDates(markedDates);
  //       setIsStartDatePicked(false);
  //       setIsEndDatePicked(true);
  //       setStartDate(starttDate);
  //       setEndDate(day.dateString);
  //       setCalenderVisible(false);
  //     } else {
  //       setEndDate(starttDate);
  //       setCalenderVisible(false);
  //     }
  //   }
  // };

  function handleBackButtonClick() {
    if (routeName.name == "ListScreen") {
      navigation.goBack();
      return true;
    }
    return false;
  }

  useEffect(() => {
    const backHandler = BackHandler.addEventListener('hardwareBackPress', handleBackButtonClick);
    return () => backHandler.remove();
  }, [routeName.name, navigation]);

  const loadMoreData = async () => {
    if (loadMore || endReached) {
      return;
    }
    setLoadMore(true);
    try {
      const nextPage = page + 1;
      var data = dataPayload() + '&page_number=' + nextPage;
      const response = await fetchData.get_Auction(data);
      if (response.length) {
        setPage(nextPage);
        const updatedData = [...AutionData, ...response];
        setAutionData(updatedData);
        // await AsyncStorage.setItem('buyData', JSON.stringify(updatedData));
      } else {
        setEndReached(true);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      // Indicate that loading has finished
      setLoadMore(false);
    }
  };


  const requestSubmitClick = async () => {
    try {

      setUpdateLoader(true);
      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");

      const raw = JSON.stringify({
        "email": data?.email,
        "state": selectState?.name !== "" && selectState?.name,
        "district": currentDistrict?.name !== "" && currentDistrict?.name,
        "propertySubCategory": property_sub_category !== "" && property_sub_category
      });
      console.log('raw', raw);

      const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow"
      };

      // console.log("Request Prop requestOptions ============== :", requestOptions);
      const value = `${baseUrl}api/auction/request-property`;
      console.log("value", value, "https://api.albionbankauctions.com/api/auction/request-property");

      fetch(`https://api.albionbankauctions.com/api/auction/request-property`, requestOptions)
        .then((response) => response.json())
        .then((result) => {
          if (result?.status == true) {
            console.log("result", result);

            common_fn.showToast("Property Requested Successfully, Thank You!");
            setRequestModal(false);
            setUpdateLoader(false);
          } else {
            console.log("xx", result?.message);

            common_fn.showToast(result?.message);
            setUpdateLoader(false);
            setRequestModal(false);
          }
        })
        .catch((error) => console.error("catch in requestSubmitClick_api:", error));
    } catch (error) {
      setRequestModal(false);
    }
  }

  const submitClick = async () => {
    try {
      const data = dataPayload();

      const submitAuction = await fetchData.get_Auction(data);
      // console.log("submitAuction res========= : ", submitAuction);
      setAutionData(submitAuction);

    } catch (error) {
      console.log("catch in  submitClick_Api :", error);
    }
  }

  const clearListClick = () => {
    try {
      setcleardata(false);
      if (!property_sub_category) {
        setEvent_bank("");
      }
      setPropertySubCategory(route.params.property_sub_category);
      setEvent_bank(route.params.event_bank)
      setCalenderVisible(false);
      setSelectState({});
      setCurrentDistrict({});
      setMarkedDates({});
      setStartDate('');
      setEndDate('');

    } catch (error) {
      console.log("catch in  clearList_Click :", error);
    }
  }



  return (
    <View style={{ flex: 1, backgroundColor: Color.white, alignItems: 'center', }}>
      <View
        style={{
          width: '100%',
          backgroundColor: '#FDF0F5',
          alignItems: 'center',
          position: "relative"

        }}>
        <View
          style={{
            width: '95%',
            flexDirection: 'row', justifyContent: 'space-around',
            alignItems: 'center', marginVertical: 10, marginTop: 15
          }}>
          <Dropdown
            style={{
              backgroundColor: Color.white,
              borderColor: Color.cloudyGrey,
              borderWidth: 1,
              // padding: 10,
              borderRadius: 5,
              // paddingHorizontal: 5,
              paddingHorizontal: 10,
              // height: 50,
              width: '42%',
              height: 45,
            }}
            placeholderStyle={{
              fontSize: 10,
              color: Color.cloudyGrey,
              marginHorizontal: 5,
              fontFamily: Poppins.Light
            }}
            selectedTextStyle={{
              fontSize: 10,
              color: Color.black,
              marginHorizontal: 5,
              fontFamily: Poppins.Light
            }}
            iconStyle={{ width: 20, height: 20 }}
            itemTextStyle={{ fontSize: 12, color: Color.cloudyGrey, fontFamily: Poppins.Light }}
            data={Categories}
            maxHeight={300}
            labelField="label"
            valueField="value"
            placeholder="Select property"
            searchPlaceholder="Search..."
            value={property_sub_category}
            onChange={item => {
              setcleardata(true);
              setPropertySubCategory(item?.value)
            }}
            renderRightIcon={() => (
              <Icon
                style={{ width: 20, height: 20 }}
                color={Color.cloudyGrey}
                name="chevron-down"
                size={20}
              />
            )}
          />
          <Dropdown
            style={{
              backgroundColor: Color.white,
              borderColor: Color.cloudyGrey,
              borderWidth: 1,
              paddingHorizontal: 10,
              borderRadius: 5,
              width: '42%',
              height: 45,
            }}
            placeholderStyle={{
              fontSize: 10,
              color: Color.cloudyGrey,
              marginHorizontal: 5,
              fontFamily: Poppins.Light
            }}
            selectedTextStyle={{
              fontSize: 10,
              color: Color.black,
              marginHorizontal: 5,
              fontFamily: Poppins.Light
            }}
            iconStyle={{ width: 20, height: 20 }}
            itemTextStyle={{ fontSize: 12, color: Color.cloudyGrey, fontFamily: Poppins.Light }}
            data={State}
            maxHeight={300}
            labelField="name"
            valueField="name"
            placeholder={selectState?.name ? 'Select City' : 'Select State'}
            searchPlaceholder="Search..."
            value={selectState}
            onChange={item => {
              setcleardata(true);
              setSelectState(item);
              setCurrentDistrict(null)
            }}
            renderRightIcon={() => (
              <Icon
                style={{ width: 20, height: 20 }}
                color={Color.cloudyGrey}
                name="chevron-down"
                size={20}
              />
            )}
          />
          <TouchableOpacity
            onPress={() => {

              setCalenderVisible(!calenderVisible);
            }}>
            <MCIcon
              name="sort-calendar-ascending"
              size={30}
              color={Color.primary}
            />
          </TouchableOpacity>
        </View>
        {selectState?.name && (
          <Dropdown
            style={{
              backgroundColor: Color.white,
              borderColor: Color.cloudyGrey,
              borderWidth: 1,
              paddingHorizontal: 10,
              borderRadius: 5,
              width: '92%',
              height: 45,
            }}
            placeholderStyle={{
              fontSize: 10,
              color: Color.cloudyGrey,
              marginHorizontal: 5,
              fontFamily: Poppins.Light
            }}
            selectedTextStyle={{
              fontSize: 10,
              color: Color.black,
              marginHorizontal: 5,
              fontFamily: Poppins.Light
            }}
            iconStyle={{ width: 20, height: 20 }}
            itemTextStyle={{ fontSize: 12, color: Color.cloudyGrey, fontFamily: Poppins.Light }}
            data={district}
            maxHeight={300}
            labelField="name"
            valueField="name"
            placeholder={'Select District'}
            searchPlaceholder="Search..."
            value={currentDistrict}
            onChange={item => {
              setcleardata(true);
              setCurrentDistrict(item);
            }}
            renderRightIcon={() => (
              <Icon
                style={{ width: 20, height: 20 }}
                color={Color.cloudyGrey}
                name="chevron-down"
                size={20}
              />
            )}
          />
        )}
        <ScrollView
          horizontal // Set to horizontal if you want horizontal scrolling
          showsHorizontalScrollIndicator={false} // Optional: hides the horizontal scroll indicator
          contentContainerStyle={{
            display: "flex",
            justifyContent: "flex-start",
            alignItems: "flex-start",
            borderWidth: 1,
            borderColor: "#000",
            minWidth: "100%",
            gap: 5
          }}
        >
          <View
            style={{
              display: "flex",
              justifyContent: "flex-start",
              alignItems: "center",
              gap: 5,
              width: "100%",
              flexDirection: "row",
              paddingHorizontal: 20,
              paddingVertical: 10,
              overflow: "scroll"
            }}
          >
            {
              selectState?.name &&
              <View
                style={{
                  backgroundColor: Color?.primary,
                  padding: 4,
                  paddingHorizontal: 20,
                  borderRadius: 50,
                  gap: 4,
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between"
                }}
              >
                <Text
                  style={{
                    fontFamily: Poppins.Light,
                    fontSize: 12,
                    color: Color?.white
                  }}
                >
                  {selectState?.name}
                </Text>
                  <TouchableOpacity
                    onPress={() => {
                      setSelectState({
                        ...selectState,
                        name: null
                      });
                      setCurrentDistrict(null)
                    }}
                  >
                  <Iconviewcomponent
                    Icontag={'MaterialCommunityIcons'}
                    iconname={"close"}
                    icon_size={18}
                    icon_color={Color.white}
                  />
                </TouchableOpacity>
              </View>
            }
            {
              property_sub_category &&
              <View
                style={{
                  backgroundColor: Color?.primary,
                  padding: 4,
                  paddingHorizontal: 20,
                  borderRadius: 50,
                  gap: 4,
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between"
                }}
              >
                <Text
                  style={{
                    fontFamily: Poppins.Light,
                    fontSize: 12,
                    display: "flex",
                    alignItems: "center",
                    color: Color?.white
                  }}
                >
                  {Categories.find(item => item.value === property_sub_category).label}
                </Text>
                <TouchableOpacity
                  onPress={() => setPropertySubCategory(route.params.property_sub_category)}
                >
                  <Iconviewcomponent
                    Icontag={'MaterialCommunityIcons'}
                    iconname={"close"}
                    icon_size={18}
                    icon_color={Color.white}
                  />
                </TouchableOpacity>
              </View>
            }
            {
              currentDistrict?.name &&
              <View
                style={{
                  backgroundColor: Color?.primary,
                  padding: 4,
                  paddingHorizontal: 20,
                  borderRadius: 50,
                  gap: 4,
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between"
                }}
              >
                <Text
                  style={{
                    fontFamily: Poppins.Light,
                    fontSize: 12,
                    display: "flex",
                    alignItems: "center",
                    color: Color?.white
                  }}
                >
                  {currentDistrict?.name}
                </Text>
                <TouchableOpacity
                  onPress={() => setCurrentDistrict({})}
                >
                  <Iconviewcomponent
                    Icontag={'MaterialCommunityIcons'}
                    iconname={"close"}
                    icon_size={18}
                    icon_color={Color.white}
                  />
                </TouchableOpacity>
              </View>
            }
            {
              starttDate && endDate && <View
                style={{
                  backgroundColor: Color?.primary,
                  padding: 4,
                  paddingHorizontal: 20,
                  borderRadius: 50,
                  gap: 4,
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between"
                }}
              >
                <Text
                  style={{
                    fontFamily: Poppins.Light,
                    fontSize: 12,
                    display: "flex",
                    alignItems: "center",
                    color: Color?.white
                  }}
                >
                  {`${dayjs(starttDate).format('DD-MM-YYYY')} - ${dayjs(endDate).format('DD-MM-YYYY')}`}
                </Text>
                <TouchableOpacity
                  onPress={() => {
                    setStartDate(null)
                    setEndDate(null)
                  }}
                >
                  <Iconviewcomponent
                    Icontag={'MaterialCommunityIcons'}
                    iconname={"close"}
                    icon_size={18}
                    icon_color={Color.white}
                  />
                </TouchableOpacity>
              </View>
            }
          </View>
        </ScrollView>
        <View style={{ width: '95%', flexDirection: 'row', alignItems: 'center', marginVertical: 10 }}>
          <View style={{ width: 5, height: '100%', backgroundColor: Color.white }}></View>
          {
            !!property_sub_category || !!selectState?.name || starttDate && endDate ?
              <TouchableOpacity onPress={() => clearListClick()}
                style={{ width: '95%', height: 40, borderRadius: 5, justifyContent: 'center', alignItems: 'center', backgroundColor: Color.primary }}>
                <Text style={{ fontSize: 14, color: Color.white, fontFamily: Poppins.SemiBold }}>Clear</Text>
              </TouchableOpacity> : null
          }
        </View>
      </View>
      {calenderVisible && (
        <View
          style={{
            padding: 10, marginHorizontal: 15,
            borderRadius: 10,
            shadowColor: Color.black,
            shadowOpacity: 0.2,
            shadowRadius: 3,
            elevation: 5,
            top: 70,
            zIndex: 10,
            backgroundColor: "#fff",
            position: "absolute"
          }}>
          <DatePicker
            mode='range'
            locale={enGB}
            displayFullDays='true'
            startDate={starttDate}
            theme="auto"
            endDate={endDate}
            onChange={(e) => {
              setcleardata(true);
              setStartDate(e.startDate);
              setEndDate(e.endDate);
              if (e.startDate && e.endDate) {
                setCalenderVisible(false)
              }
            }}
            selectedTextStyle={{
              fontWeight: 'bold',
            }}
            selectedItemColor={Color.primary}
            headerTextStyle={{
              color: Color.primary,
            }}
            weekDaysTextStyle={{
              color: Color.primary,
            }}
            dayTextStyle={{
              color: Color.primary,
            }}
            calendarTextStyle={{
              color: Color.primary
            }}
          />
          {/* <Calendar
            monthFormat={'MMMM yyyy'}
            markedDates={markDates}
            markingType="period"
            hideExtraDays={true}
            hideDayNames={true}
            onDayPress={day => onDayPress(day)}
          /> */}
        </View>
      )}
      {loading ? (
        <View
          style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            // height: height,
          }}>
          <Image
            source={{ uri: Media.loader }}
            style={{ width: 80, height: 80, resizeMode: 'contain' }}
          />
        </View>
      ) : (
        <FlatList
          data={AutionData}
          keyExtractor={(item, index) => item + index}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { y: animatedOpacityValue } } }],
            { useNativeDriver: false },
          )}
          renderItem={({ item, index }) => {
            return (
              <>
                <AuctionItemCard
                  navigation={navigation}
                  item={item}
                  index={index}
                  isExpired={plan[0].status == 'activated' && plan[0].plan_id > 1 ? false : true}
                />
              </>
            );
          }}
          // onEndReached={() => {
          //   loadMoreData();
          // }}
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
          ListEmptyComponent={() => {
            return (
              <View
                style={{
                  flex: 1,
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginVertical: 10,
                  height: height / 1.5,
                }}>
                <Image
                  source={{ uri: Media.noProperty }}
                  style={{
                    width: 100,
                    height: 80,
                    resizeMode: 'contain',
                  }}
                />
                <TouchableOpacity onPress={() => setRequestModal(true)}
                  style={{ padding: 10, paddingVertical: 15, paddingHorizontal: 20, backgroundColor: Color.primary, borderRadius: 5, marginVertical: 20 }}>
                  <Text
                    style={{
                      fontSize: 14,
                      marginStart: 5,
                      borderRadius: 5,
                      color: Color.white,
                      fontFamily: Poppins.SemiBold,
                    }}>
                    Request a property
                  </Text>
                </TouchableOpacity>
              </View>
            );
          }}
          showsVerticalScrollIndicator={false}
          style={{ width: '95%', }}
        />
      )}
      <Modal visible={requestModal} transparent animationType="slide">
        <View
          style={{
            flex: 1,
            backgroundColor: Color.transparantBlack,
            justifyContent: 'center',
            padding: 20, backgroundColor: 'rgba(0, 0, 0, 0.8)',
          }}>
          <View
            style={{
              backgroundColor: 'white',
              padding: 1,
              borderRadius: 10,
            }}>

            <View style={{ width: '100%', justifyContent: 'flex-start', alignItems: 'center' }}>
              <View style={{ flexDirection: 'row', alignItems: 'center', paddingHorizontal: 10, paddingRight: 25 }}>
                <Text style={{ width: '100%', fontSize: 20, color: Color.black, fontFamily: Poppins.SemiBold, paddingHorizontal: 20, paddingVertical: 10 }}>Request This Property</Text>
                <TouchableOpacity onPress={() => {
                  setRequestModal(false);
                }}>
                  <Iconviewcomponent
                    Icontag={'AntDesign'}
                    iconname={"closecircleo"}
                    icon_size={25}
                    icon_color={Color.black}
                  />
                </TouchableOpacity>
              </View>

              <View style={{ width: '95%', justifyContent: 'flex-start', alignItems: 'center', marginVertical: 10, }}>
                <Text style={{ fontSize: 14, color: Color.cloudyGrey, fontFamily: Poppins.Medium, letterSpacing: 0.5, lineHeight: 22 }}>Thank you for your request! We will notify you shortly with the details of
                  <Text style={{ fontSize: 16, color: Color.black, fontFamily: Poppins.SemiBold, letterSpacing: 0.5 }}> {property_sub_category?.split('_')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')}</Text> properties in
                  <Text style={{ fontSize: 16, color: Color.black, fontFamily: Poppins.SemiBold, letterSpacing: 0.5 }}>{' '}{selectState?.name} {' '}</Text>
                  <Text style={{ fontSize: 16, color: Color.black, fontFamily: Poppins.SemiBold, letterSpacing: 0.5 }}>{currentDistrict?.name}</Text>.
                  We greatly appreciate your patience</Text>
              </View>

              <TouchableOpacity onPress={() => requestSubmitClick()}
                style={{ width: '95%', height: 50, backgroundColor: Color.primary, borderRadius: 40, justifyContent: 'center', alignItems: 'center', marginVertical: 10 }}>
                {updateLoader ? (
                  <ActivityIndicator color={Color.white} />
                ) : (
                  <Text
                    style={{
                      textAlign: 'center',
                      fontSize: 14,
                      color: Color.white,
                      fontFamily: Poppins.Medium,
                    }}>
                    Submit
                  </Text>
                )}
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

    </View>
  );
};

export default ListScreen;