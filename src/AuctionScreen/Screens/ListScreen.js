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
  Modal, ActivityIndicator
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
import { base_auction_image_url } from '../../Config/base_url';
import { Categories } from './Content';
import AuctionItemCard from '../Auctioncomponents/AuctionItemCard';
import { useRoute } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import common_fn from '../../Config/common_fn';
import dayjs from 'dayjs';
import { Alert } from 'react-native';
import { enGB } from 'date-fns/locale';


const { height } = Dimensions.get('screen');

const ListScreen = ({ navigation, route }) => {
  const routeName = useRoute();
  // const [property_sub_category] = useState(route.params.property_sub_category);
  // console.log("property_sub_category -**************** :", route.params);

  const [property_sub_category, setPropertySubCategory] = useState(route.params.property_sub_category);
  const [event_bank, setEvent_bank] = useState(route.params.event_bank);
  // const [selectProperty, setSelectProperty] = useState("");
  const [calenderVisible, setCalenderVisible] = useState(false);
  const sortdata = useSelector(state => state.PropertyReducer.AuctionSort);
  const [Location, setLocation] = useState([]);
  const [AutionFilterData, setAutionFilterData] = useState([]);

  const [markDates, setMarkedDates] = useState({});
  const [starttDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const [loading, setLoading] = useState(false);
  const [isStartDatePicked, setIsStartDatePicked] = useState(false);
  const [isEndDatePicked, setIsEndDatePicked] = useState(false);
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

  // const Auction_userData = useSelector(
  //   state => state.UserReducer.auctionUserData,
  // );
  // var { id, name, phone_number, email } = Auction_userData;

  const data = useSelector(
    state => state.UserReducer.auctionUserData,
  );


  // console.log(dateRange,"<<-------------------dateRange");


  useEffect(() => {
    setLoading(true);
    getApiData().finally(() => {
      setLoading(false);
    });
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

    // console.log("payload1212 ========================= :", payload);
    for (const key in payload) {
      if (!!payload[key]) {
        params.append(key, payload[key]);
      }
    }
    // console.log("params1212 ========================= :", params);
    const queryString = params.toString();
    const query = queryString.replace('%20', ' ');
    // console.log("query1212 ========================= :", query);

    return query;
  };

  const getApiData = async () => {
    // console.log(starttDate, endDate, "------------------------------>>>>>>>>>>>>>>>>>");

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


      // Initialize params as a new URLSearchParams instance
      const params = new URLSearchParams();
      // console.log(payload, "payload before structure__________________________________");

      for (const key in payload) {
        if (payload[key] != null && payload[key]?.toString().trim().length > 0) {
          params.append(key, payload[key]);
        }
      }

      const queryString = params.toString();
      const query = queryString.replace(/%20/g, ' '); // Replace all occurrences of '%20' with a space

      // console.log("Query ======================= :", query);

      const getAuction = await fetchData.get_Auction(query);
      // console.log("resp ------------------- :", getAuction);
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


  const datePicker = () => {

  }

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

      const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow"
      };

      // console.log("Request Prop requestOptions ============== :", requestOptions);
      fetch("https://api.albionbankauctions.com/api/auction/request-property", requestOptions)
        .then((response) => response.json())
        .then((result) => {
          console.log("Request Prop resp ============== :", result);
          if (result?.status == true) {
            common_fn.showToast(result?.message);
            setRequestModal(false);
            setUpdateLoader(false);
          } else {
            common_fn.showToast(result?.message);
            setUpdateLoader(false);
            setRequestModal(false);
          }
        })
        .catch((error) => console.error("catch in requestSubmitClick_api:", error));
    } catch (error) {
      setRequestModal(false);
      console.log("catch in  requestSubmitClick================= :", error);
    }
  }

  const submitClick = async () => {
    try {
      const data = dataPayload();
      console.log("payload data----------------- :", data);

      const submitAuction = await fetchData.get_Auction(data);
      // console.log("submitAuction res========= : ", submitAuction);
      setAutionData(submitAuction);

    } catch (error) {
      console.log("catch in  submitClick_Api :", error);
    }
  }

  const clearListClick = () => {
    try {
      // If category is cleared, reset the bank selection
      if (!property_sub_category) {
        setEvent_bank("");
      }

      // If bank is cleared, reset the category (optional)

      setPropertySubCategory(route.params.property_sub_category);

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
          // padding: 10, 
          alignItems: 'center',

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
              fontSize: 12,
              color: Color.cloudyGrey,
              marginHorizontal: 10,
            }}
            selectedTextStyle={{
              fontSize: 12,
              color: Color.black,
              marginHorizontal: 10,
            }}
            iconStyle={{ width: 20, height: 20 }}
            itemTextStyle={{ fontSize: 12, color: Color.cloudyGrey }}
            data={Categories}
            maxHeight={300}
            labelField="label"
            valueField="value"
            placeholder="Select property"
            searchPlaceholder="Search..."
            value={property_sub_category}
            onChange={item => {
              // console.log("item ============= : ", item);
              setPropertySubCategory(item?.value)
              // setSelectProperty(item?.value);
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
              fontSize: 12,
              color: Color.cloudyGrey,
              marginHorizontal: 10,
            }}
            selectedTextStyle={{
              fontSize: 12,
              color: Color.black,
              marginHorizontal: 10,
            }}
            iconStyle={{ width: 20, height: 20 }}
            itemTextStyle={{ fontSize: 12, color: Color.cloudyGrey }}
            data={State}
            maxHeight={300}
            labelField="name"
            valueField="name"
            placeholder={selectState?.name ? 'Select City' : 'Select State'}
            searchPlaceholder="Search..."
            value={selectState}
            onChange={item => {
              setSelectState(item);
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
              // marginHorizontal: 10,
              marginVertical: 5,
            }}
            placeholderStyle={{
              fontSize: 12,
              color: Color.cloudyGrey,
              marginHorizontal: 10,
            }}
            selectedTextStyle={{
              fontSize: 12,
              color: Color.black,
              marginHorizontal: 10,
            }}
            iconStyle={{ width: 20, height: 20 }}
            itemTextStyle={{ fontSize: 12, color: Color.cloudyGrey }}
            data={district}
            maxHeight={300}
            labelField="name"
            valueField="name"
            placeholder={'Select District'}
            searchPlaceholder="Search..."
            value={currentDistrict}
            onChange={item => {
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

        <View style={{ width: '95%', flexDirection: 'row', alignItems: 'center', marginVertical: 10 }}>
          {/* <TouchableOpacity onPress={() => submitClick()}
            style={{ width: '50%', height: 50, borderRadius: 5, justifyContent: 'center', alignItems: 'center', backgroundColor: Color.primary }}>
            <Text style={{ fontSize: 14, color: Color.white, fontFamily: Poppins.SemiBold }}>Submit</Text>
          </TouchableOpacity> */}
          <View style={{ width: 5, height: '100%', backgroundColor: Color.white }}></View>
          <TouchableOpacity onPress={() => clearListClick()}
            style={{ width: '95%', height: 50, borderRadius: 5, justifyContent: 'center', alignItems: 'center', backgroundColor: Color.primary }}>
            <Text style={{ fontSize: 14, color: Color.white, fontFamily: Poppins.SemiBold }}>Clear</Text>
          </TouchableOpacity>
        </View>
        {/* <View style={{ width: '100%', marginVertical: 10, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
          <TextInput
            placeholder="Minimum Price"
            placeholderTextColor={Color.cloudyGrey}
            value={minAmount}
            keyboardType="number-pad"
            onChangeText={value => {
              setMinAmount(value)
            }}
            style={{
              flex: 1,
              color: Color.black,
              padding: 10,
              width: '45%',
              height: 45,
              borderWidth: 1,
              borderColor: Color.cloudyGrey,
              backgroundColor: 'white',
              borderRadius: 5,
            }}
          />
          <View style={{ width: 2, height: '100%' }}></View>
          <TextInput
            placeholder="Maximum Price"
            placeholderTextColor={Color.cloudyGrey}
            value={maxAmount}
            keyboardType="number-pad"
            onChangeText={value => {
              setMaxAmount(value)
            }}
            style={{
              flex: 1,
              color: Color.black,
              padding: 10,
              width: '45%',
              height: 45,
              borderWidth: 1,
              borderColor: Color.cloudyGrey,
              backgroundColor: 'white',
              borderRadius: 5,
            }}
          />
        </View> */}
      </View>
      {calenderVisible && (
        <View
          style={{
            backgroundColor: Color.primary, // Change background here
            padding: 10, marginHorizontal: 15,
            borderRadius: 10,
            shadowColor: Color.black,
            shadowOpacity: 0.2,
            shadowRadius: 3,
            elevation: 5,
          }}>
          <DatePicker
            mode='range'
            locale={enGB}
            displayFullDays='true'
            // headerContainerStyle={{ color: Color.primary }}
            startDate={starttDate}
            endDate={endDate}
            onChange={(e) => {
              // console.log(e, "6516511231221123dasdasdsdsadasdsad");

              setStartDate(e.startDate);
              setEndDate(e.endDate);
              if (e.startDate && e.endDate) {
                setCalenderVisible(false)
              }
            }
            }
            headerContainerStyle={{
              backgroundColor: Color.primary, // Custom header background
            }}
            dayContainerStyle={(date) => ({
              backgroundColor: starttDate && endDate && date >= starttDate && date <= endDate
                ? Color.primary
                : 'transparent',
            })}
            dayTextStyle={(date) => {
              const today = new Date();
              const isToday = date.toDateString() === today.toDateString();

              return {
                color: isToday
                  ? Color.white // Color for today's date
                  : starttDate && endDate && date >= starttDate && date <= endDate
                    ? '#fff' // Color for selected dates
                    : '#000', // Default text color
                fontWeight: isToday ? Poppins.Bold : Poppins.Medium,
              };
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
          // data={AutionData.filter(item => item.id !== data?.id)}
          keyExtractor={(item, index) => item + index}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { y: animatedOpacityValue } } }],
            { useNativeDriver: false },
          )}
          renderItem={({ item, index }) => {
            return (
              <AuctionItemCard
                navigation={navigation}
                item={item}
                index={index}
              />
            );
          }}
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
              <Text style={{ width: '100%', fontSize: 20, color: Color.black, fontFamily: Poppins.SemiBold, paddingHorizontal: 20, paddingVertical: 10 }}>Request This Property</Text>

              <View style={{ width: '95%', justifyContent: 'flex-start', alignItems: 'center', marginVertical: 10, }}>
                <Text style={{ fontSize: 14, color: Color.cloudyGrey, fontFamily: Poppins.Medium, letterSpacing: 0.5, lineHeight: 22 }}>Thank you for your request! We will notify you shortly with the details of
                  <Text style={{ fontSize: 16, color: Color.black, fontFamily: Poppins.SemiBold, letterSpacing: 0.5 }}> {property_sub_category}</Text> properties in
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