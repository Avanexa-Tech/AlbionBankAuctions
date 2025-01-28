import React, { useState, useRef, useEffect, useLayoutEffect } from 'react';
import {
  StyleSheet,
  Text,
  Animated,
  View,
  FlatList,
  TextInput,
  Keyboard,
  ScrollView,
  Image,
  StatusBar,
  TouchableOpacity,
  Alert,
  Platform,
  UIManager,
  LayoutAnimation,
  LogBox,
  Modal,
  ActivityIndicator,
} from 'react-native';

import { useNavigation } from '@react-navigation/native';
import { useSelector, useDispatch } from 'react-redux';
import NetInfo from '@react-native-community/netinfo';
import { Media } from '../../../Global/Media';
import { primarycolor } from '../../../Utils/Colors';
import Color from '../../../Config/Color';
import common_fn from '../../../Config/common_fn';
import ExpandableComponent from '../../../Utils/ExpandableComponent';
import { scr_height, scr_width } from '../../../Utils/Dimensions';
import { Iconviewcomponent } from '../../../Components/Icontag';
import { Poppins } from '../../../Global/FontFamily';
import { BottomSheet } from 'react-native-btr';
import { Dropdown } from 'react-native-element-dropdown';
import Icon from 'react-native-vector-icons/Ionicons';
import fetchData from '../../../Config/fetchData';
import { Categories } from '../Content';
import AuctionBottomLogin from '../../Auctioncomponents/AuctionBottomLogin';

const freeRentalData = [
  {
    id: '0',
    rent_img: Media.fill,
    rent_title: 'Fill details online',
    rent_subText: 'Fill in your details in a fully customized legal template',
  },
];

const CONTENT = [
  {
    isExpanded: false,
    category_name: 'What are the key features and benefits of home loans?',
    subcategory: [
      { id: 1, val: 'Flexibility to choose a tenure' },
      { id: 2, val: 'Comparatively cheaper than personal loans' },
      { id: 3, val: 'Tax benefits' },
      { id: 3, val: 'Home loan balance transfer' },
    ],
  },
  {
    isExpanded: false,
    category_name: 'What are the different types of home loans available?',
    subcategory: [
      { id: 4, val: 'Home loan for construction' },
      { id: 6, val: 'Home loan for renovation' },
    ],
  },
  {
    isExpanded: false,
    category_name:
      'What are the factors you should know before applying for a  home loan?',
    subcategory: [
      {
        id: 7,
        val: 'Making your credit score is good. Higher the score, the better.',
      },
      {
        id: 8,
        val: 'Check if you can afford to pay monthly EmIs from your current income.',
      },
      {
        id: 9,
        val: 'Research all the loan options available before finalizing an offer.',
      },
    ],
  },
  {
    isExpanded: false,
    category_name:
      'What are the different types of home loan fees and charges?',
    subcategory: [
      { id: 10, val: 'Processing fee' },
      { id: 11, val: 'Prepayment charges' },
      { id: 11, val: 'Loan conversion charges' },
      { id: 11, val: 'Logal and technical chargers' },
    ],
  },
];

const cutData = [
  {
    cus_id: '0',
    cus_name: 'Arunachalam Annamalai',
    cus_desc:
      'Albion made it easier to shortlist the perfect designer to bring my dream vision to life, with in the promise time!',
    cus_rating: '4.5',
  },
  {
    cus_id: '1',
    cus_name: 'Pradeep Ramakrish',
    cus_desc:
      'Albion made it easier to shortlist the perfect designer to bring my dream vision to life, with in the promise time!',
    cus_rating: '4',
  },
  {
    cus_id: '2',
    cus_name: 'Naveen Kumar g',
    cus_desc:
      'Albion made it easier to shortlist the perfect designer to bring my dream vision to life, with in the promise time!',
    cus_rating: '5',
  },
];

const priceData = [
  {
    price_id: '0',
    price_range: '₹0 - ₹50,000',
  },
  {
    price_id: '1',
    price_range: '₹50,000 - ₹1,00,000',
  },
  {
    price_id: '2',
    price_range: '₹1,00,000 - ₹5,00,000',
  },
  {
    price_id: '3',
    price_range: '₹5,00,000 - ₹10,00,000',
  },
  {
    price_id: '4',
    price_range: '₹10,00,000 - ₹25,00,000',
  },
  {
    price_id: '5',
    price_range: '₹25,00,000 - ₹50,00,000',
  },
  {
    price_id: '6',
    price_range: '₹50,00,000 - ₹75,00,000',
  },
  {
    price_id: '7',
    price_range: '₹75,00,000 - ₹1,00,00,000',
  },
  {
    price_id: '8',
    price_range: '₹1,00,00,000 - ₹1,25,00,000',
  },
  {
    price_id: '9',
    price_range: '₹1,25,00,000 - ₹1,50,00,000',
  },
  {
    price_id: '10',
    price_range: '₹1,50,00,000 - ₹1,75,00,000',
  },
  {
    price_id: '9',
    price_range: '₹1,75,00,000 - ₹2,00,00,000',
  },
  {
    price_id: '10',
    price_range: '₹2,00,00,000 - ₹2,25,00,000',
  },
  {
    price_id: '9',
    price_range: '₹2,25,00,000 - ₹2,50,00,000',
  },
  {
    price_id: '10',
    price_range: '₹2,50,00,000 - ₹2,75,00,000',
  },
  {
    price_id: '9',
    price_range: '₹2,75,00,000 - ₹3,00,00,000',
  },
];

const stateData = [
  {
    state_id: '0',
    notify_state: 'Andra',
  },
  {
    state_id: '1',
    notify_state: 'Bengalore',
  },
  {
    state_id: '2',
    notify_state: 'Goa',
  },
  {
    state_id: '3',
    notify_state: 'Kerala',
  },
  {
    state_id: '4',
    notify_state: 'Tamil nadu',
  },
];

const districtData = [
  {
    district_id: '0',
    notify_district: 'Erode',
  },
  {
    district_id: '1',
    notify_district: 'Coimbatore',
  },
  {
    district_id: '2',
    notify_district: 'Chennai',
  },
  {
    district_id: '3',
    notify_district: 'Salem',
  },
  {
    district_id: '4',
    notify_district: 'Namakkal',
  },
];

const propertyData = [
  {
    property_id: '0',
    notify_property_type: 'House, Villa, Bunglow, Appartment, and Flat',
  },
  {
    property_id: '1',
    notify_property_type:
      'Land, Agri, Commercial, Residential, Industrial, Farm Land & Estate',
  },
  {
    property_id: '2',
    notify_property_type: 'Commercial Building, Shop, and Office',
  },
  {
    property_id: '3',
    notify_property_type:
      'Industrial Property, Industrialshed, Godown, and Factory',
  },
  {
    property_id: '4',
    notify_property_type: 'Gold Jewellery',
  },
  {
    property_id: '4',
    notify_property_type: 'Others',
  },
];

LogBox.ignoreAllLogs();

const AuctionNotifyProperties = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [netInfo_State, setNetinfo] = useState(true);

  const [listDataSource, setListDataSource] = useState(CONTENT);
  const [multiSelect, setMultiSelect] = useState(false);
  const animatedOpacityValue = useRef(new Animated.Value(0)).current;

  const [username, setUsername] = useState('');

  const [HomeLoanVisible, setHomeLoanVisible] = useState(false);
  const [salebottomSheetVisible, setSaleBottomSheetVisible] = useState(false);
  const [selectCitybottomSheetVisible, setSelectCitybottomSheetVisible] =
    useState(false);

  const [selectBottom, setSelectBottom] = useState('');
  const [selectPrice, setSelectPrice] = useState('₹ 00');
  // const [selectState, setSelectState] = useState('Tamil nadu');
  const [selectedDistrict, setSelectedDistrict] = useState('Coimbatore');
  const [selectPropertyType, setSelectPropertyType] = useState('Villa');

  const [State, setState] = useState([]);
  const [district, setDistrict] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectState, setSelectState] = useState({});
  const [selectProperty, setSelectProperty] = useState({});
  const [currentDistrict, setCurrentDistrict] = useState({});
  const [AutionData, setAutionData] = useState([]);
  const [loginEnable, setLoginEnable] = useState(false);

  const Auction_userData = useSelector(
    state => state.UserReducer.auctionUserData,
  );
  var { id, name, phone_number, email } = Auction_userData;
  const [ReservedPriceFrom, setReservedPriceFrom] = useState('');
  const [ReservedPriceTo, setReservedPriceTo] = useState('');

  const starImageCorner = Media.starOutline;
  const [defaultRating, setDefaultRating] = useState(null);
  const starImageFilled = Media.star;

  const [updateLoader, setUpdateLoader] = useState(false);
  const [comments, setComments] = useState('');
  const [maxRating, setMaxRating] = useState([
    {
      id: 1,
      rating: 1,
      experience: 'Poor',
    },
    {
      id: 2,
      rating: 2,
      experience: 'Bad',
    },
    {
      id: 3,
      rating: 3,
      experience: 'Okay',
    },
    {
      id: 4,
      rating: 4,
      experience: 'Average',
    },
    {
      id: 5,
      rating: 5,
      experience: 'Good',
    },
  ]);


  const handleRatingPress = item => {
    console.log("Item ------------- : ", item);

    if (defaultRating === item) {
      setDefaultRating(null);
    } else {
      setDefaultRating(item);
    }
  };

  useEffect(() => {
    try {
      const unsubscribe = NetInfo.addEventListener(state => {
        setNetinfo(state.isConnected);
      });
      return () => unsubscribe;
    } catch (error) {
      console.log("catch in use_effect's Free_rental : ", error);
    }
  }, []);

  useEffect(() => {
    if (!netInfo_State) {
      const interval = setTimeout(() => {
        if (Platform.OS === 'android') {
          common_fn.showToast("can't connect.Please Check Your Internet Connection");
        } else {
          alert("can't connect.Please Check Your Internet Connection")
        }
      }, 500);
      return () => {
        clearInterval(interval);
      };
    }
  }, [netInfo_State]);

  const dataPayload = () => {
    const params = new URLSearchParams();
    const payload = {
      state: selectState?.name,
      district: currentDistrict?.name,
    };

    for (const key in payload) {
      if (payload[key] != null && payload[key]?.length > 0) {
        params.append(key, payload[key]);
      }
    }

    const queryString = params.toString();
    const query = queryString.replace('%20', ' ');
    return query;
  };

  const getApiData = async () => {
    try {
      var data = dataPayload();
      // console.log('data', data);
      const getAuction = await fetchData.get_Auction(data);
      setAutionData(getAuction);
      //get State
      const getState = await fetchData.Auction_getState({});
      setState(getState);
      //get District
      var districtData = `state=${selectState?.id}`;
      const get_district = await fetchData.Auction_getDistrict(districtData);
      setDistrict(get_district);
    } catch (error) {
      console.log('error', error);
    }
  };

  useEffect(() => {
    setLoading(true);
    getApiData().finally(() => {
      setLoading(false);
    });
  }, [selectProperty, selectState, currentDistrict]);

  // Validation function for individual fields
  const validateFields = () => {
    if (!selectState?.name || selectState.name.trim() === '') {
      common_fn.showToast("Please select a state");
      return false;
    }
    if (!currentDistrict?.name || currentDistrict.name.trim() === '') {
      common_fn.showToast("Please select a district");
      return false;
    }
    if (!selectProperty?.label || selectProperty.label.trim() === '') {
      common_fn.showToast("Please select a property type");
      return false;
    }
    if (!ReservedPriceFrom || isNaN(parseFloat(ReservedPriceFrom))) {
      common_fn.showToast("Please enter a valid 'Reserved Price From'");
      return false;
    }
    if (!ReservedPriceTo || isNaN(parseFloat(ReservedPriceTo))) {
      common_fn.showToast("Please enter a valid 'Reserved Price To'");
      return false;
    }
    if (parseFloat(ReservedPriceFrom) <= 0 || parseFloat(ReservedPriceTo) <= 0) {
      if (Platform.OS === 'android') {
        common_fn.showToast("Reserve Price cannot be zero or negative");
      } else {
        alert("Reserve Price cannot be zero or negative");
      }
      return;
    }

    if (parseFloat(ReservedPriceFrom) >= parseFloat(ReservedPriceTo)) {
      common_fn.showToast("Reserved Price From must be less than Reserved Price To");
      return false;
    }
    return true;
  };

  async function submitClick() {
    try {
      const data = {
        user_id: id,
        from_reserve_price: ReservedPriceFrom,
        to_reserve_price: ReservedPriceTo,
        state: selectState?.name,
        district: currentDistrict?.name,
        type_of_property: selectProperty?.label,
      };

      // Validate fields
      if (!validateFields()) {
        return; // Exit if validation fails
      }

      console.log("data ----------- : ", data);
      const notifyProperties = await fetchData.Auction_notify_properties(data);
      console.log("Getting Response ----------- : ", JSON.stringify(notifyProperties));

      if (notifyProperties) {
        if (Platform.OS === 'android') {
          common_fn.showToast(notifyProperties?.message);
        } else {
          alert(notifyProperties?.message);
        }

        setHomeLoanVisible(true);
      }
    } catch (error) {
      console.log("catch in renderHeader_Item's submitClick : ", error);
    }
  }


  const feedbackSubmitClick = async () => {
    try {
      if (defaultRating != null && comments != '') {
        setUpdateLoader(true);
        var data = {
          user_id: id,
          rating: defaultRating,
          feedback: comments
        };

        const feedbackresponse = await fetchData.Auction_feedbackData(data);
        console.log("SUCCESS ------------- :", feedbackresponse);

        if (feedbackresponse?.status == true) {
          common_fn.showToast(feedbackresponse?.message);
          navigation.navigate("ActionHome");
          setUpdateLoader(false);
        } else {
          common_fn.showToast(feedbackresponse?.message);
          navigation.navigate("ActionHome");
          setUpdateLoader(false);
        }

      } else {
        common_fn.showToast("Please select your rating and enter your comments");
        setUpdateLoader(false);
        console.log("********Please fill the details *************");
      }

    } catch (error) {
      console.log("catch in feedbackSubmit_Click : ", error);
    }
  }


  function sale_toggleBottomView(type) {
    try {
      setSelectBottom(type);
      setSaleBottomSheetVisible(!salebottomSheetVisible);
    } catch (error) {
      console.log('Catch in Ads sale_toggleBottomView :', error);
    }
  }

  function sale_BottomSheetmenu() {
    try {
      return (
        <View>
          <BottomSheet
            visible={salebottomSheetVisible}
            onBackButtonPress={sale_toggleBottomView}
            onBackdropPress={sale_toggleBottomView}>
            <View
              style={{
                backgroundColor: 'white',
                width: '100%',
                height:
                  selectBottom === 'Price'
                    ? 400
                    : 'State'
                      ? 300
                      : 'District'
                        ? 300
                        : 280,
                minHeight: 200,
                alignItems: 'center',
                borderTopStartRadius: 20,
                borderTopEndRadius: 20,
              }}>
              <View
                style={{
                  width: '100%',
                  flexDirection: 'row',
                  padding: 15,
                  paddingStart: 30,
                  backgroundColor: '#FBE9EF',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  borderTopStartRadius: 30,
                  borderTopEndRadius: 30,
                }}>
                <Text
                  style={{
                    fontSize: 18,
                    color: 'black',
                    fontFamily: 'Poppins-SemiBold',
                  }}>
                  {selectBottom === 'Price'
                    ? 'Select Price Range'
                    : selectBottom === 'State'
                      ? 'Select State'
                      : selectBottom === 'District'
                        ? 'Select District'
                        : 'Select Property Type'}
                </Text>
                <TouchableOpacity
                  onPress={() => setSaleBottomSheetVisible(false)}>
                  <Iconviewcomponent
                    Icontag={'AntDesign'}
                    iconname={'closecircleo'}
                    icon_size={22}
                    iconstyle={{ color: primarycolor, marginRight: 10 }}
                  />
                </TouchableOpacity>
              </View>

              <View style={{ width: '100%', alignItems: 'center' }}>
                {selectBottom === 'Price' ? (
                  <View style={styles.container}>
                    <ScrollView>
                      <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
                        {/* <FlatList
                                                data={priceData}
                                                keyExtractor={(item, index) => item + index}
                                                renderItem={({ item, index }) =>
                                                    renderPriceItem(item, index)
                                                }
                                                style={{ width: '95%' }}
                                                showsVerticalScrollIndicator={false}
                                            /> */}
                        {priceData.map((item, index) => {
                          return (
                            //     <TouchableOpacity style={{ paddingHorizontal: 20, padding: 8,margin:5, backgroundColor: selectPrice === item.price_range ? primarycolor : '#f3f3f3' }}>
                            //         <Text
                            //             style={{
                            //                 fontSize: 12,
                            //                 color: Color.black,
                            //                 marginHorizontal: 10,
                            //                 fontFamily: Poppins.Medium,
                            //             }}>
                            //             {item.price_range}
                            //         </Text>
                            //     </TouchableOpacity>
                            // )

                            <TouchableOpacity
                              onPress={() => selectedPrice(item)}
                              style={[
                                styles.gridIngredients,
                                {
                                  backgroundColor:
                                    selectPrice === item.price_range
                                      ? primarycolor
                                      : '#f3f3f3',
                                },
                              ]}>
                              <Text
                                style={[
                                  styles.ingredientsText,
                                  {
                                    color:
                                      selectPrice === item.price_range
                                        ? Color.white
                                        : Color.black,
                                  },
                                ]}>
                                {item.price_range}
                              </Text>
                            </TouchableOpacity>
                          );
                        })}
                      </View>
                    </ScrollView>
                  </View>
                ) : null}

                {selectBottom === 'State' ? (
                  <FlatList
                    data={stateData}
                    keyExtractor={(item, index) => item + index}
                    renderItem={({ item, index }) => renderStateItem(item, index)}
                    style={{ width: '95%' }}
                    showsVerticalScrollIndicator={false}
                  />
                ) : null}

                {selectBottom === 'District' ? (
                  <FlatList
                    data={districtData}
                    keyExtractor={(item, index) => item + index}
                    renderItem={({ item, index }) =>
                      renderDistrictItem(item, index)
                    }
                    style={{ width: '95%' }}
                    showsVerticalScrollIndicator={false}
                  />
                ) : null}

                {selectBottom === 'Property_Type' ? (
                  <FlatList
                    data={propertyData}
                    keyExtractor={(item, index) => item + index}
                    renderItem={({ item, index }) =>
                      renderPropertyItem(item, index)
                    }
                    style={{ width: '95%' }}
                    showsVerticalScrollIndicator={false}
                  />
                ) : null}
              </View>
            </View>
          </BottomSheet>
        </View>
      );
    } catch (error) {
      console.log('catch in addImage_BottomSheet menu ', error);
    }
  }

  function renderPriceItem(item, index) {
    try {
      return (
        <View style={{ width: '95%', alignItems: 'center' }}>
          <TouchableOpacity
            onPress={() => selectedPrice(item)}
            style={{
              width: '100%',
              alignItems: 'center',
              padding: 15,
              backgroundColor: 'white',
            }}>
            <Text style={{ fontSize: 14, color: 'black' }}>
              {item.price_range}
            </Text>
          </TouchableOpacity>
          <View
            style={{
              width: '95%',
              height: 1,
              backgroundColor: '#666',
              marginVertical: 1,
            }}></View>
        </View>
      );
    } catch (error) {
      console.log('catch in Home_interior renderCity_Item :', error);
    }
  }

  function selectedPrice(item, index) {
    try {
      setSelectPrice(item.price_range);
      setSaleBottomSheetVisible(false);
    } catch (error) {
      console.log('catch in Home_interior select_City :', error);
    }
  }

  function renderStateItem(item, index) {
    try {
      return (
        <View style={{ width: '95%', alignItems: 'center' }}>
          <TouchableOpacity
            onPress={() => selectedState(item)}
            style={{
              width: '100%',
              alignItems: 'center',
              padding: 15,
              backgroundColor: 'white',
            }}>
            <Text style={{ fontSize: 14, color: 'black' }}>
              {item.notify_state}
            </Text>
          </TouchableOpacity>
          <View
            style={{
              width: '95%',
              height: 1,
              backgroundColor: '#666',
              marginVertical: 1,
            }}></View>
        </View>
      );
    } catch (error) {
      console.log('catch in Home_interior renderCity_Item :', error);
    }
  }

  function selectedState(item, index) {
    try {
      setSelectState(item.notify_state);
      setSaleBottomSheetVisible(false);
    } catch (error) {
      console.log('catch in Home_interior select_City :', error);
    }
  }

  function renderDistrictItem(item, index) {
    try {
      return (
        <View style={{ width: '95%', alignItems: 'center' }}>
          <TouchableOpacity
            onPress={() => selectDistrict(item)}
            style={{
              width: '100%',
              alignItems: 'center',
              padding: 15,
              backgroundColor: 'white',
            }}>
            <Text style={{ fontSize: 14, color: 'black' }}>
              {item.notify_district}
            </Text>
          </TouchableOpacity>
          <View
            style={{
              width: '95%',
              height: 1,
              backgroundColor: '#666',
              marginVertical: 1,
            }}></View>
        </View>
      );
    } catch (error) {
      console.log('catch in Home_interior renderCity_Item :', error);
    }
  }

  function selectDistrict(item, index) {
    try {
      setSelectedDistrict(item.notify_district);
      setSaleBottomSheetVisible(false);
    } catch (error) {
      console.log('catch in Home_interior select_City :', error);
    }
  }

  function renderPropertyItem(item, index) {
    try {
      return (
        <View style={{ width: '95%', alignItems: 'center' }}>
          <TouchableOpacity
            onPress={() => selectedPropertyType(item)}
            style={{
              width: '100%',
              alignItems: 'center',
              padding: 15,
              backgroundColor: 'white',
            }}>
            <Text style={{ fontSize: 14, color: 'black' }}>
              {item.notify_property_type} 11111111111
            </Text>
          </TouchableOpacity>
          <View
            style={{
              width: '95%',
              height: 1,
              backgroundColor: 'red',
              marginVertical: 1,
            }}></View>
        </View>
      );
    } catch (error) {
      console.log('catch in Home_interior renderCity_Item :', error);
    }
  }

  function selectedPropertyType(item, index) {
    try {
      setSelectPropertyType(item.notify_property_type);
      setSaleBottomSheetVisible(false);
    } catch (error) {
      console.log('catch in Home_interior select_City :', error);
    }
  }

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}>
      <View style={styles.container}>
        <View style={{ marginVertical: 0, overflow: 'visible' }}>
          <Text
            style={{
              fontFamily: Poppins.SemiBold,
              fontSize: 20,
              color: Color.lightBlack, paddingVertical: 5
            }}>
            Interested Price
          </Text>
          <Text
            style={{
              fontSize: 14,
              color: '#333',
              fontFamily: 'Poppins-SemiBold',
              textAlign: 'justify', paddingVertical: 2
            }}>
            We will send you notifications of new property based on your interests
            & below inputs
          </Text>
          <View style={{ marginVertical: 5 }}>
            <Text
              style={{
                color: Color.cloudyGrey,
                fontFamily: Poppins.Medium,
                fontSize: 14,
              }}>
              Reserve Price From :
            </Text>
            <TextInput
              placeholder="₹ 00,00,000"
              placeholderTextColor={Color.cloudyGrey}
              value={ReservedPriceFrom}
              onChangeText={value => {
                setReservedPriceFrom(value);
              }}
              keyboardType="number-pad"
              style={{
                width: '100%', height: 50,
                borderColor: Color.lightgrey,
                borderWidth: 1,
                borderRadius: 5,
                paddingHorizontal: 10,
                fontSize: 14,
                color: Color.cloudyGrey,
                fontFamily: Poppins.Medium,
                marginRight: 10, marginVertical: 5
              }}
            />
          </View>
          <View style={{ marginVertical: 5 }}>
            <Text
              style={{
                color: Color.cloudyGrey,
                fontFamily: Poppins.Medium,
                fontSize: 14,
              }}>
              Reserve Price To :
            </Text>
            <TextInput
              placeholder="₹ 00,00,000"
              placeholderTextColor={Color.cloudyGrey}
              value={ReservedPriceTo}
              onChangeText={value => {
                setReservedPriceTo(value);
              }}
              keyboardType="number-pad"
              style={{
                width: '100%', height: 50,
                borderColor: Color.lightgrey,
                borderWidth: 1,
                borderRadius: 5,
                paddingHorizontal: 10,
                fontSize: 14,
                color: Color.cloudyGrey,
                fontFamily: Poppins.Medium,
                marginRight: 10, marginVertical: 5
              }}
            />
          </View>
          <View style={{ marginVertical: 5 }}>
            <Text
              style={{
                fontFamily: Poppins.Medium,
                fontSize: 14,
                color: Color.cloudyGrey,
              }}>
              Select State *
            </Text>
            <Dropdown
              style={{
                justifyContent: 'space-between',
                alignItems: 'center',
                width: '100%',
                padding: 15, height: 50,
                paddingHorizontal: 20,
                backgroundColor: Color.white,
                borderRadius: 5,
                borderColor: '#666',
                borderWidth: 0.5, marginVertical: 5
              }}
              placeholderStyle={{
                fontSize: 14,
                color: Color.cloudyGrey,
                marginHorizontal: 10,
              }}
              selectedTextStyle={{
                fontSize: 14,
                color: Color.black,
                marginHorizontal: 10,
              }}
              iconStyle={{ width: 20, height: 20 }}
              itemTextStyle={{ fontSize: 14, color: Color.cloudyGrey }}
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
          </View>
          <View style={{ marginVertical: 5 }}>
            <Text
              style={{
                fontFamily: Poppins.Medium,
                fontSize: 14,
                color: Color.cloudyGrey,
              }}>
              Select District *
            </Text>
            <Dropdown
              style={{
                justifyContent: 'space-between',
                alignItems: 'center',
                marginVertical: 5,
                padding: 15, height: 50,
                paddingHorizontal: 20,
                backgroundColor: Color.white,
                borderRadius: 5,
                borderColor: !selectState?.name
                  ? Color.lightgrey
                  : Color.cloudyGrey,
                borderWidth: 0.5,
              }}
              placeholderStyle={{
                fontSize: 14,
                color: !selectState?.name ? Color.lightgrey : Color.cloudyGrey,
                marginHorizontal: 10,
              }}
              selectedTextStyle={{
                fontSize: 14,
                color: Color.black,
                marginHorizontal: 10,
              }}
              disable={!selectState?.name}
              iconStyle={{ width: 20, height: 20 }}
              itemTextStyle={{ fontSize: 14, color: Color.cloudyGrey }}
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
                  color={!selectState?.name ? Color.lightgrey : Color.cloudyGrey}
                  name="chevron-down"
                  size={20}
                />
              )}
            />
          </View>
          <View style={{ marginVertical: 5, flex: 1, overflow: 'visible', position: 'relative' }}>
            <Text
              style={{
                fontFamily: Poppins.Medium,
                fontSize: 14,
                color: Color.cloudyGrey,
              }}>
              Select Property Type *
            </Text>
            <Dropdown
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                marginVertical: 5,
                padding: 15,
                height: 50,
                paddingHorizontal: 20,
                backgroundColor: Color.white,
                borderRadius: 5,
                borderColor: '#666',
                borderWidth: 0.5,
                zIndex: 1000,
              }}
              containerStyle={{
                // position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                zIndex: 1000,
              }}
              placeholderStyle={{
                fontSize: 14,
                color: Color.cloudyGrey,
                marginHorizontal: 10,
              }}
              selectedTextStyle={{
                fontSize: 14,
                color: Color.black,
                marginHorizontal: 10,
              }}
              iconStyle={{ width: 20, height: 20 }}
              itemTextStyle={{ fontSize: 14, color: Color.cloudyGrey }}
              data={Categories}
              maxHeight={200}
              labelField="label"
              valueField="value"
              placeholder="Select property"
              searchPlaceholder="Search..."
              value={selectProperty}
              dropdownPosition="auto"
              onChange={item => {
                setSelectProperty(item);
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
          </View>
          <TouchableOpacity
            activeOpacity={0.5}
            onPress={() => {
              id == undefined ||
                (Auction_userData?.length > 0 && Auction_userData == undefined) ?
                setLoginEnable(true)
                :
                submitClick()
            }}
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              marginVertical: 10,
              height: 50,
              paddingHorizontal: 20,
              backgroundColor: Color.primary,
              borderRadius: 5,
              borderColor: '#666',
              borderWidth: 0.5,
            }}>
            <Text style={{ fontSize: 14, color: Color.white }}>Notify Me</Text>
          </TouchableOpacity>
        </View>

        <Modal visible={HomeLoanVisible} transparent animationType="slide">
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
              {/* <Text
              style={{
                color: 'black',
                fontFamily: Poppins.Bold,
                fontSize: 20,
                textAlign: 'center',
              }}>
              Thank You
            </Text>
            <Text
              style={{
                color: '#666',
                fontFamily: Poppins.Medium,
                fontSize: 14,
                textAlign: 'center',
                marginVertical: 10,
              }}>
              Great! Now sit back and relax!
            </Text>

            <View
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 200,
              }}>
              <Image
               source={{ uri: "https://albion-backend.s3.ap-south-1.amazonaws.com/Mobile+Apk+Banners/assets/assets/Auction/legalService.jpg" }}
                style={{
                  width: 130,
                  height: 130,
                  resizeMode: 'contain',
                  borderRadius: 200,
                }}
              />
            </View>
            <Text
              style={{
                color: '#666',
                fontFamily: Poppins.Medium,
                fontSize: 14,
                textAlign: 'center',
                marginVertical: 10,
              }}>
              You will get notification on WhatsApp regularly
            </Text> */}

              {/* <Text
              style={{
                color: 'black',
                fontFamily: Poppins.Bold,
                fontSize: 20,
                textAlign: 'center',
              }}>
              Rate and Reviews
            </Text> */}

              <View style={{ width: '100%', justifyContent: 'flex-start', alignItems: 'center', borderRadius: 5 }}>
                <View style={{ width: '100%', justifyContent: 'center', alignItems: 'center', backgroundColor: '#F3EAE4', paddingVertical: 20, borderTopRightRadius: 10, borderTopLeftRadius: 10 }}>
                  <Image
                    source={require('../../../assets/image/feedback.png')}
                    style={{ width: '100%', height: 120, resizeMode: 'contain', padding: 2, }}
                  />
                  <View style={{ position: 'absolute', right: 10, top: 10 }}>
                    <TouchableOpacity onPress={() => setHomeLoanVisible(false)}>
                      <Iconviewcomponent
                        Icontag={'AntDesign'}
                        iconname={"closecircle"}
                        icon_size={30}
                        icon_color={Color.primary}
                      />
                    </TouchableOpacity>
                  </View>
                </View>

                <View style={{ width: '100%', marginHorizontal: 10, marginTop: 20 }}>
                  <Text style={{ width: '100%', fontSize: 16, color: Color.black, fontFamily: Poppins.SemiBold, paddingHorizontal: 20 }}>Rate Your Experience ?</Text>
                  <View style={styles.customRatingBarStyle}>
                    {maxRating.map((item, index) => {
                      return (
                        <TouchableOpacity
                          activeOpacity={0.7}
                          key={index}
                          onPress={() => handleRatingPress(item.rating)}
                          style={{
                            marginHorizontal: 10,
                            alignItems: 'center',
                          }}>
                          <Image
                            style={styles.starImageStyle}
                            source={{
                              uri:
                                item.rating <= defaultRating
                                  ? starImageFilled
                                  : starImageCorner,
                            }}
                          />
                          <Text
                            style={{
                              textAlign: 'center',
                              fontSize: 14,
                              color: Color.cloudyGrey,
                              marginVertical: 10,
                              fontFamily: Poppins.SemiBold,
                            }}>
                            {item.experience}
                          </Text>
                        </TouchableOpacity>
                      );
                    })}
                  </View>
                </View>
                <View style={{ width: '95%', height: 1, backgroundColor: '#EAEAEF', borderRadius: 30, marginVertical: 10 }}></View>
                <View style={{ width: '100%', justifyContent: 'flex-start', alignItems: 'center', marginVertical: 10 }}>
                  <Text style={{ width: '100%', fontSize: 16, color: Color.black, fontFamily: Poppins.SemiBold, paddingHorizontal: 20 }}>Share your experience</Text>

                  <View style={{ width: '95%', backgroundColor: Color.white, borderWidth: 1, borderColor: Color.lightgrey, borderRadius: 5, marginTop: 10 }}>
                    <TextInput
                      placeholder="Enter your comments here ..."
                      placeholderTextColor={Color.cloudyGrey}
                      value={comments}
                      multiline={true}
                      onChangeText={text => {
                        setComments(text);
                      }}
                      keyboardType="name-phone-pad"
                      returnKeyType='done'
                      style={styles.phoneTextInput}
                    />
                  </View>
                </View>
                <TouchableOpacity onPress={() => feedbackSubmitClick()}
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


              {/* <TouchableOpacity
              onPress={() => {
                navigation.replace('ActionHome'), setHomeLoanVisible(false);
              }}
              style={{
                width: '95%',
                height: 45,
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: primarycolor,
                borderRadius: 40,
              }}>
              <Text style={{ fontSize: 14, color: 'white' }}>GoTo Home Page</Text>
            </TouchableOpacity> */}
            </View>
          </View>
        </Modal>

        {sale_BottomSheetmenu()}
        {
          loginEnable == true &&
          <AuctionBottomLogin login={loginEnable} setLogin={setLoginEnable} />
        }
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    alignItems: 'center',
    backgroundColor: 'white',
  },
  NumberBoxConatiner: {
    width: '95%',
    borderColor: '#666',
    marginVertical: 10,
    borderWidth: 0.5,
    paddingStart: 10,
    height: 50,
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    borderRadius: 5,
  },
  incomeBoxConatiner: {
    width: '95%',
    borderColor: '#666',
    marginVertical: 0,
    borderWidth: 0.5,
    paddingStart: 10,
    height: 50,
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    borderRadius: 5,
  },
  numberTextBox: {
    width: '100%',
    height: 50,
    color: Color.black,
    fontSize: 16,
    fontFamily: 'Poppins-SemiBold',
  },
  invalidLogin: {
    width: '90%',
    fontSize: 13,
    marginHorizontal: 10,
    fontFamily: 'Poppins-SemiBold',
    color: Color.red,
  },

  demoNameTextInput: {
    height: 40,
    borderColor: Color.cloudyGrey,
    borderWidth: 1,
    borderRadius: 5,
    color: Color.black,
    padding: 10,
  },

  ingredientsText: {
    //fontFamily: AppFonts.Primary.Sans.Regular,
    fontStyle: 'normal',
    alignSelf: 'center',
    fontSize: 13,
    padding: 3,

    fontFamily: Poppins.Medium,
  },

  gridIngredients: {
    marginVertical: 5,
    width: '30%',
    margin: 3,
    flexDirection: 'row',
    justifyContent: 'center',
    // paddingStart: 16,
    // paddingEnd: 16,
    // paddingTop: 8,
    // marginRight: 10,
    // paddingBottom: 8,
    borderRadius: 8,
  },

  ingredientImage: {
    width: 15,
    alignSelf: 'center',
    height: 15,
  },
  customRatingBarStyle: {
    justifyContent: 'center',
    flexDirection: 'row',
    marginVertical: 10,
  },
  starImageStyle: {
    width: 35,
    height: 35,
    resizeMode: 'cover',
  },
  phoneTextInput: {
    width: '100%',
    minHeight: 100,
    padding: 10,
    color: Color.black,
    textAlignVertical: 'top',
    maxHeight: 200
  },
});

//make this component available to the app
export default AuctionNotifyProperties;
