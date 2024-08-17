import React, { useEffect, useState } from 'react';
import {
  Dimensions,
  FlatList,
  Modal,
  ScrollView,
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Pressable,
} from 'react-native';
import FIcon from 'react-native-vector-icons/FontAwesome';
import Icon from 'react-native-vector-icons/Ionicons';
import { Divider } from 'react-native-elements';
import Color from '../Config/Color';
import { useDispatch, useSelector } from 'react-redux';
import {
  setFilterLocation,
  setFilterLocationRemove,
} from '../Redux/user/UserAction';
import { Image } from 'react-native';
import { Media } from '../Global/Media';
import { setPostPropertyLocation } from '../Redux';
import fetchData from '../Config/fetchData';
import { Searchbar } from 'react-native-paper';
import { Dropdown } from 'react-native-element-dropdown';

const LocationBottomModal = ({ data, city_id }) => {
  const [search, setSearch] = useState('');
  const [cityData, setCityData] = useState([]);
  const [selectedCity, setSelectedCity] = useState({});
  const [selectedLocality, setSelectedLocality] = useState('');
  const [filterLocation, setLocation] = useState([]);
  const [cityVisible, setCityVisible] = useState(false);
  const [localityVisible, setLocalityVisible] = useState(false);
  const filter_data = useSelector(state => state.UserReducer.filterLocation);
  var { city, landmark } = filter_data;

  const dispatch = useDispatch();
  const handleCitySelection = city => {
    setSelectedCity(city);
    dispatch(
      setFilterLocation({
        city: city?.city,
        landmark: null,
      }),
    );
    setCityVisible(false);
  };
  const locationData = async () => {
    var location =
      selectedCity?.city_id?.length > 0 ? selectedCity?.city_id : city_id;
    var data = 'location=' + 'locality' + '&city=' + location;
    const filterloc = await fetchData.Location(data);
    setLocation(filterloc?.locality);
  };

  const propertySearch = search => {
    if (!search) {
      setCityData([...data]); // Create a copy of data
      setLocation([]);
    } else if (!city) {
      const searchLocation = data.filter(item =>
        item.toLowerCase().includes(search.toLowerCase()),
      );
      setCityData([...searchLocation]); // Create a copy of filtered data
      setLocation([]);
    } else {
      const searchLocation = filterLocation.filter(item =>
        item.toLowerCase().includes(search.toLowerCase()),
      );
      setCityData([]);
      setLocation([...searchLocation]); // Create a copy of filtered location
    }

    setSearch(search);
  };

  useEffect(() => {
    setLocation(filterLocation);
    setCityData(data);
    locationData();
  }, [filterLocation, data, filter_data, selectedCity]);

  const localityData = filterLocation?.map(location => ({
    label: location,
    value: location,
  }));

  return (
    // <Modal transparent={true} visible={visible} animationType="fade">
    //   <View style={{ flex: 1, backgroundColor: Color.transparantBlack }}>
    //     <Pressable
    //       style={{ flex: 1 }}
    //       onPress={() => {
    //         setVisible(false);
    //       }}
    //     />
    //     <View
    //       style={{
    //         backgroundColor: Color.white,
    //         flex: 1,
    //         padding: 10,
    //         borderTopRightRadius: 30,
    //         borderTopLeftRadius: 30,
    //       }}>
    //       <ScrollView showsVerticalScrollIndicator={false}>
    //         <View style={styles.modalContent}>
    //           <TouchableOpacity
    //             onPress={() => {
    //               setVisible(false);
    //             }}
    //             style={styles.closeButton}>
    //             <Icon name="close-circle" size={30} color={Color.red} />
    //           </TouchableOpacity>

    //           <View style={{ flexDirection: 'row', alignItems: 'center' }}>
    //             {city != '' && (
    //               <View style={styles.pillContainer}>
    //                 <View
    //                   style={{
    //                     flexDirection: 'row',
    //                     alignItems: 'center',
    //                     backgroundColor: '#d4e9f4',
    //                     paddingHorizontal: 15,
    //                     paddingVertical: 5,
    //                     marginHorizontal: 5,
    //                     borderRadius: 50,
    //                   }}>
    //                   <Text style={styles.pillText}>{city}</Text>
    //                   <TouchableOpacity
    //                     onPress={() => {
    //                       dispatch(
    //                         setFilterLocation({
    //                           city: '',
    //                           landmark: landmark,
    //                         }),
    //                       );
    //                       // setselectLocationItem({
    //                       //   visible: false,
    //                       // });
    //                       setSelectedCity('');
    //                     }}
    //                     hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
    //                     <Icon size={20} name="close-circle" color="#b1cddb" />
    //                   </TouchableOpacity>
    //                 </View>
    //               </View>
    //             )}
    //             {landmark != '' && (
    //               <View style={styles.pillContainer}>
    //                 <View
    //                   style={{
    //                     flexDirection: 'row',
    //                     alignItems: 'center',
    //                     backgroundColor: '#d4e9f4',
    //                     paddingHorizontal: 15,
    //                     paddingVertical: 5,
    //                     marginHorizontal: 5,
    //                     borderRadius: 50,
    //                   }}>
    //                   <Text style={styles.pillText}>{landmark}</Text>
    //                   <TouchableOpacity
    //                     onPress={() => {
    //                       dispatch(
    //                         setFilterLocation({
    //                           city: city,
    //                           landmark: '',
    //                         }),
    //                       );
    //                     }}
    //                     hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
    //                     <Icon size={20} name="close-circle" color="#b1cddb" />
    //                   </TouchableOpacity>
    //                 </View>
    //               </View>
    //             )}
    //           </View>
    //           <Text style={styles.headerText}>Select Your Location</Text>
    //           {!city ? (
    //             <>
    //               <Text style={styles.sectionHeader}>Select City:</Text>
    //               <ScrollView showsVerticalScrollIndicator={false}>
    //                 <View style={styles.selectionContainer}>
    //                   {data && Array.isArray(data) ? (
    //                     data.map((item, index) => (
    //                       <TouchableOpacity
    //                         key={index}
    //                         onPress={() => handleCitySelection(item)}
    //                         style={[
    //                           styles.selectionItem,
    //                           {
    //                             backgroundColor:
    //                               selectedCity?.city_id === item?.city_id
    //                                 ? Color.primary
    //                                 : 'transparent',
    //                           },
    //                         ]}>
    //                         <Text
    //                           style={{
    //                             ...styles.selectionText,
    //                             color:
    //                               selectedCity?.city_id === item?.city_id
    //                                 ? Color.white
    //                                 : Color.black,
    //                           }}>
    //                           {item?.city}
    //                         </Text>
    //                       </TouchableOpacity>
    //                     ))
    //                   ) : (
    //                     <Text>No data available</Text>
    //                   )}
    //                 </View>
    //               </ScrollView>
    //             </>
    //           ) : (
    //             <View>
    //               <Text style={styles.sectionHeader}>Select Locality:</Text>
    //               <View style={styles.selectionContainer}>
    //                 {filterLocation && Array.isArray(filterLocation) ? (
    //                   filterLocation?.map((locality, index) => (
    //                     <TouchableOpacity
    //                       key={index}
    //                       onPress={() => {
    //                         // onSelectLocation(selectedCity, locality.landmark);

    //                         dispatch(
    //                           setFilterLocation({
    //                             city: selectedCity?.city,
    //                             landmark: locality,
    //                           }),
    //                         );
    //                         setVisible(false);
    //                       }}
    //                       style={[
    //                         styles.selectionItem,
    //                         {
    //                           backgroundColor:
    //                             selectedLocality === locality
    //                               ? Color.primary
    //                               : 'transparent',
    //                         },
    //                       ]}>
    //                       <Text
    //                         style={{
    //                           ...styles.selectionText,
    //                           color:
    //                             selectedLocality === locality
    //                               ? Color.white
    //                               : Color.black,
    //                         }}>
    //                         {locality}
    //                       </Text>
    //                     </TouchableOpacity>
    //                   ))
    //                 ) : (
    //                   <Text>No data available</Text>
    //                 )}
    //               </View>
    //             </View>
    //           )}
    //         </View>
    //       </ScrollView>
    //     </View>
    //   </View>
    // </Modal>
    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
      {/* <Dropdown
        style={{
          backgroundColor: Color.white,
          borderColor: Color.cloudyGrey,
          borderWidth: 1,
          paddingHorizontal: 10,
          borderRadius: 5,
          width: '40%',
          marginHorizontal: 10,
        }}
        placeholderStyle={{
          fontSize: 12,
          color: Color.cloudyGrey,
          marginHorizontal: 10,
        }}
        labelField="city"
        valueField="city"
        selectedTextStyle={{
          fontSize: 12,
          color: Color.black,
          marginHorizontal: 10,
        }}
        iconStyle={{width: 20, height: 20}}
        itemTextStyle={{fontSize: 12, color: Color.cloudyGrey}}
        data={cityData}
        maxHeight={300}
        placeholder={'Select City'}
        searchPlaceholder="Search..."
        value={city}
        onChange={item => {
          dispatch(
            setFilterLocation({
              city: null,
              landmark: null,
            }),
          );
          handleCitySelection(item);
        }}
        renderRightIcon={() => (
          <Icon
            style={{width: 20, height: 20}}
            color={Color.cloudyGrey}
            name="chevron-down"
            size={20}
          />
        )}
      /> */}
      <TouchableOpacity
        style={{
          backgroundColor: Color.white,
          borderColor: Color.cloudyGrey,
          borderWidth: 1,
          paddingHorizontal: 10,
          borderRadius: 5,
          width: '40%',
          height: 40,
          marginHorizontal: 10,
          flexDirection: 'row',
          alignItems: 'center',
        }}
        onPress={() => {
          setCityVisible(true);
        }}>
        <Text
          style={{
            flex: 1,
            fontSize: 12,
            color: Color.black,
            marginHorizontal: 10,
          }}>
          {city ? city : 'Select City'}
        </Text>
        <Icon
          style={{ width: 20, height: 20 }}
          color={Color.cloudyGrey}
          name="chevron-down"
          size={20}
        />
      </TouchableOpacity>
      {/* {city && */}
      {/* <Dropdown
        style={{
          backgroundColor: Color.white,
          borderColor: Color.cloudyGrey,
          borderWidth: 1,
          paddingHorizontal: 10,
          borderRadius: 5,
          width: '40%',
          marginHorizontal: 10,
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
        iconStyle={{width: 20, height: 20}}
        itemTextStyle={{fontSize: 12, color: Color.cloudyGrey}}
        data={localityData}
        maxHeight={300}
        labelField="label"
        valueField="value"
        placeholder={'Select Locality'}
        searchPlaceholder="Search..."
        value={landmark}
        onChange={item => {
          dispatch(
            setFilterLocation({
              city: city,
              landmark: item?.value,
            }),
          );
          setSelectedLocality(item?.value);
        }}
        renderRightIcon={() => (
          <Icon
            style={{width: 20, height: 20}}
            color={Color.cloudyGrey}
            name="chevron-down"
            size={20}
          />
        )}
      /> */}

      <TouchableOpacity
        style={{
          backgroundColor: Color.white,
          borderColor: Color.cloudyGrey,
          borderWidth: 1,
          paddingHorizontal: 10,
          borderRadius: 5,
          width: '40%',
          height: 40,
          flexDirection: 'row',
          alignItems: 'center',
          marginHorizontal: 10,
        }}
        onPress={() => {
          setLocalityVisible(true);
        }}>
        <Text
          style={{
            flex: 1,
            fontSize: 12,
            color: Color.black,
            marginHorizontal: 10,
          }}>
          {landmark ? landmark : 'Select Locality'}
        </Text>
        <Icon
          style={{ width: 20, height: 20 }}
          color={Color.cloudyGrey}
          name="chevron-down"
          size={20}
        />
      </TouchableOpacity>
      {/* } */}
      <Modal visible={cityVisible} transparent={true}>
        <Pressable
          style={{ flex: 1, backgroundColor: Color.transparantBlack }}
          onPress={() => {
            setCityVisible(false);
          }}
        />
        <View
          style={{
            flex: 1,
            backgroundColor: 'white',
            padding: 20,
            borderTopLeftRadius: 10,
            borderTopRightRadius: 10,
          }}>
          <Text
            style={{
              fontSize: 18,
              color: Color.darkGrey,
              marginHorizontal: 10,
              marginVertical: 10,
            }}>
            Select a City
          </Text>
          <ScrollView>
            {cityData.map((item, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => {
                  handleCitySelection(item);
                }}>
                <Text
                  style={{
                    fontSize: 14,
                    color: Color.black,
                    marginHorizontal: 10,
                  }}>
                  {item?.city}
                </Text>
                <Divider style={{ height: 1, marginVertical: 10 }} />
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      </Modal>
      <Modal visible={localityVisible} transparent={true}>
        <Pressable
          style={{ flex: 1, backgroundColor: Color.transparantBlack }}
          onPress={() => {
            setLocalityVisible(false);
          }}
        />
        <View
          style={{
            flex: 1,
            backgroundColor: 'white',
            padding: 20,
            borderTopLeftRadius: 10,
            borderTopRightRadius: 10,
          }}>
          <Text
            style={{
              fontSize: 18,
              color: Color.darkGrey,
              marginHorizontal: 10,
              marginVertical: 10,
            }}>
            Select a Locality
          </Text>
          <ScrollView>
            {localityData.map((item, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => {
                  dispatch(
                    setFilterLocation({
                      city: city,
                      landmark: item?.value,
                    }),
                  );
                  setSelectedLocality(item?.value);
                  setLocalityVisible(false);
                }}>
                <Text
                  style={{
                    fontSize: 14,
                    color: Color.black,
                    marginHorizontal: 10,
                  }}>
                  {item?.value}
                </Text>
                <Divider style={{ height: 1, marginVertical: 10 }} />
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      </Modal>
    </View>
  );
};

export const PostPropertyLocationBottomModal = ({
  // visible,
  // setVisible,
  data,
  onSelectLocation,
}) => {
  const [search, setSearch] = useState('');
  const [cityData, setCityData] = useState([]);
  const [selectedCity, setSelectedCity] = useState({});
  const [selectedLocality, setSelectedLocality] = useState('');
  const [postLocation, setLocation] = useState([]);
  const [cityVisible, setCityVisible] = useState(false);
  const [localityVisible, setLocalityVisible] = useState(false);
  const post_data = useSelector(
    state => state.PropertyReducer.propertyLocation,
  );
  var { city, landmark } = post_data;

  const dispatch = useDispatch();
  const handleCitySelection = city => {
    dispatch(
      setPostPropertyLocation({
        city: city?.city,
        landmark: null,
      }),
    );
    setSelectedCity(city);
    setCityVisible(false);
  };
  const locationData = async () => {
    var location = selectedCity?.city_id;
    var data = 'location=' + 'locality' + '&city=' + location;
    const filterloc = await fetchData.Location(data);
    setLocation(filterloc?.locality);
  };

  const propertySearch = search => {
    if (!search) {
      setCityData([...data]); // Create a copy of data
      setLocation([]);
    } else if (!city) {
      const searchLocation = data.filter(item =>
        item.toLowerCase().includes(search.toLowerCase()),
      );
      setCityData([...searchLocation]); // Create a copy of filtered data
      setLocation([]);
    } else {
      const searchLocation = postLocation.filter(item =>
        item.toLowerCase().includes(search.toLowerCase()),
      );
      setCityData([]);
      setLocation([...searchLocation]); // Create a copy of filtered location
    }

    setSearch(search);
  };

  useEffect(() => {
    setLocation(postLocation);
    setCityData(data);
    locationData();
  }, [postLocation, data, post_data, selectedCity]);

  const localityData = postLocation?.map(location => ({
    label: location,
    value: location,
  }));

  return (
    // <Modal transparent={true} visible={visible} animationType="fade">
    //   <View style={{ flex: 1, backgroundColor: Color.transparantBlack }}>
    //     <Pressable
    //       style={{ flex: 1 }}
    //       onPress={() => {
    //         setVisible(false);
    //       }}
    //     />
    //     <View
    //       style={{
    //         backgroundColor: Color.white,
    //         flex: 1,
    //         padding: 10,
    //         borderTopRightRadius: 30,
    //         borderTopLeftRadius: 30,
    //       }}>
    //       <ScrollView showsVerticalScrollIndicator={false}>
    //         <View style={styles.modalContent}>
    //           <TouchableOpacity
    //             onPress={() => {
    //               setVisible(false);
    //             }}
    //             style={styles.closeButton}>
    //             <Icon name="close-circle" size={30} color={Color.red} />
    //           </TouchableOpacity>

    //           <View style={{ flexDirection: 'row', alignItems: 'center' }}>
    //             {city != '' && (
    //               <View style={styles.pillContainer}>
    //                 <View
    //                   style={{
    //                     flexDirection: 'row',
    //                     alignItems: 'center',
    //                     backgroundColor: '#d4e9f4',
    //                     paddingHorizontal: 15,
    //                     paddingVertical: 5,
    //                     marginHorizontal: 5,
    //                     borderRadius: 50,
    //                   }}>
    //                   <Text style={styles.pillText}>{city}</Text>
    //                   <TouchableOpacity
    //                     onPress={() => {
    //                       dispatch(
    //                         setPostPropertyLocation({
    //                           city: '',
    //                           landmark: landmark,
    //                         }),
    //                       );
    //                       // setselectLocationItem({
    //                       //   visible: false,
    //                       // });
    //                       setSelectedCity('');
    //                     }}
    //                     hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
    //                     <Icon size={20} name="close-circle" color="#b1cddb" />
    //                   </TouchableOpacity>
    //                 </View>
    //               </View>
    //             )}
    //             {landmark != '' && (
    //               <View style={styles.pillContainer}>
    //                 <View
    //                   style={{
    //                     flexDirection: 'row',
    //                     alignItems: 'center',
    //                     backgroundColor: '#d4e9f4',
    //                     paddingHorizontal: 15,
    //                     paddingVertical: 5,
    //                     marginHorizontal: 5,
    //                     borderRadius: 50,
    //                   }}>
    //                   <Text style={styles.pillText}>{landmark}</Text>
    //                   <TouchableOpacity
    //                     onPress={() => {
    //                       dispatch(
    //                         setPostPropertyLocation({
    //                           city: city,
    //                           landmark: '',
    //                         }),
    //                       );
    //                     }}
    //                     hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
    //                     <Icon size={20} name="close-circle" color="#b1cddb" />
    //                   </TouchableOpacity>
    //                 </View>
    //               </View>
    //             )}
    //           </View>
    //           <Text style={styles.headerText}>Select Your Location</Text>
    //           {!city ? (
    //             <>
    //               <Text style={styles.sectionHeader}>Select City:</Text>
    //               <ScrollView showsVerticalScrollIndicator={false}>
    //                 <View style={styles.selectionContainer}>
    //                   {data && Array.isArray(data) ? (
    //                     data.map((item, index) => (
    //                       <TouchableOpacity
    //                         key={index}
    //                         onPress={() => handleCitySelection(item)}
    //                         style={[
    //                           styles.selectionItem,
    //                           {
    //                             backgroundColor:
    //                               selectedCity?.city_id === item?.city_id
    //                                 ? Color.primary
    //                                 : 'transparent',
    //                           },
    //                         ]}>
    //                         <Text
    //                           style={{
    //                             ...styles.selectionText,
    //                             color:
    //                               selectedCity?.city_id === item?.city_id
    //                                 ? Color.white
    //                                 : Color.black,
    //                           }}>
    //                           {item?.city}
    //                         </Text>
    //                       </TouchableOpacity>
    //                     ))
    //                   ) : (
    //                     <Text>No data available</Text>
    //                   )}
    //                 </View>
    //               </ScrollView>
    //             </>
    //           ) : (
    //             <View>
    //               <Text style={styles.sectionHeader}>Select Locality:</Text>
    //               <View style={styles.selectionContainer}>
    //                 {filterLocation && Array.isArray(filterLocation) ? (
    //                   filterLocation?.map((locality, index) => (
    //                     <TouchableOpacity
    //                       key={index}
    //                       onPress={() => {
    //                         // onSelectLocation(selectedCity, locality.landmark);

    //                         dispatch(
    //                           setPostPropertyLocation({
    //                             city: selectedCity?.city,
    //                             landmark: locality,
    //                           }),
    //                         );
    //                         setVisible(false);
    //                       }}
    //                       style={[
    //                         styles.selectionItem,
    //                         {
    //                           backgroundColor:
    //                             selectedLocality === locality
    //                               ? Color.primary
    //                               : 'transparent',
    //                         },
    //                       ]}>
    //                       <Text
    //                         style={{
    //                           ...styles.selectionText,
    //                           color:
    //                             selectedLocality === locality
    //                               ? Color.white
    //                               : Color.black,
    //                         }}>
    //                         {locality}
    //                       </Text>
    //                     </TouchableOpacity>
    //                   ))
    //                 ) : (
    //                   <Text>No data available</Text>
    //                 )}
    //               </View>
    //             </View>
    //           )}
    //         </View>
    //       </ScrollView>
    //     </View>
    //   </View>
    // </Modal>
    <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginTop: 10 }}>
      {/* <Dropdown
        style={{
          backgroundColor: Color.white,
          borderColor: Color.cloudyGrey,
          borderWidth: 1,
          paddingHorizontal: 10,
          borderRadius: 5,
          width: '40%',
          marginHorizontal: 10,
        }}
        placeholderStyle={{
          fontSize: 12,
          color: Color.cloudyGrey,
          marginHorizontal: 10,
        }}
        labelField="city"
        valueField="city"
        selectedTextStyle={{
          fontSize: 12,
          color: Color.black,
          marginHorizontal: 10,
        }}
        iconStyle={{width: 20, height: 20}}
        itemTextStyle={{fontSize: 12, color: Color.cloudyGrey}}
        data={cityData}
        maxHeight={300}
        placeholder={'Select City'}
        searchPlaceholder="Search..."
        value={city}
        onChange={item => {
          dispatch(
            setPostPropertyLocation({
              city: null,
              landmark: null,
            }),
          );
          handleCitySelection(item);
        }}
        renderRightIcon={() => (
          <Icon
            style={{width: 20, height: 20}}
            color={Color.cloudyGrey}
            name="chevron-down"
            size={20}
          />
        )}
      /> */}
      <TouchableOpacity
        style={{
          backgroundColor: Color.white,
          borderColor: Color.cloudyGrey,
          borderWidth: 1,
          paddingHorizontal: 10,
          borderRadius: 5,
          width: '45%',
          height: 45,
          // marginHorizontal: 10,
          flexDirection: 'row',
          alignItems: 'center',
        }}
        onPress={() => {
          setCityVisible(true);
        }}>
        <Text
          style={{
            flex: 1,
            fontSize: 12,
            color: Color.black,
            marginHorizontal: 10,
          }}>
          {city ? city : 'Select City'}
        </Text>
        <Icon
          style={{ width: 20, height: 20 }}
          color={Color.cloudyGrey}
          name="chevron-down"
          size={20}
        />
      </TouchableOpacity>
      {/* {city && */}
      {/* <Dropdown
        style={{
          backgroundColor: Color.white,
          borderColor: Color.cloudyGrey,
          borderWidth: 1,
          paddingHorizontal: 10,
          borderRadius: 5,
          width: '40%',
          marginHorizontal: 10,
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
        iconStyle={{width: 20, height: 20}}
        itemTextStyle={{fontSize: 12, color: Color.cloudyGrey}}
        data={localityData}
        maxHeight={300}
        labelField="label"
        valueField="value"
        placeholder={'Select Locality'}
        searchPlaceholder="Search..."
        value={landmark}
        onChange={item => {
          dispatch(
            setPostPropertyLocation({
              city: city,
              landmark: item?.value,
            }),
          );
          setSelectedLocality(item?.value);
        }}
        renderRightIcon={() => (
          <Icon
            style={{width: 20, height: 20}}
            color={Color.cloudyGrey}
            name="chevron-down"
            size={20}
          />
        )}
      /> */}

      <TouchableOpacity
        style={{
          backgroundColor: Color.white,
          borderColor: Color.cloudyGrey,
          borderWidth: 1,
          paddingHorizontal: 10,
          borderRadius: 5,
          width: '45%',
          height: 45,
          flexDirection: 'row',
          alignItems: 'center',
          marginHorizontal: 10,
        }}
        onPress={() => {
          setLocalityVisible(true);
        }}>
        <Text
          style={{
            flex: 1,
            fontSize: 12,
            color: Color.black,
            marginHorizontal: 10,
          }}>
          {landmark ? landmark : 'Select Locality'}
        </Text>
        <Icon
          style={{ width: 20, height: 20 }}
          color={Color.cloudyGrey}
          name="chevron-down"
          size={20}
        />
      </TouchableOpacity>
      {/* } */}
      <Modal visible={cityVisible} transparent={true}>
        <Pressable
          style={{ flex: 1, backgroundColor: Color.transparantBlack }}
          onPress={() => {
            setCityVisible(false);
          }}
        />
        <View
          style={{
            flex: 1,
            backgroundColor: 'white',
            padding: 20,
            borderTopLeftRadius: 10,
            borderTopRightRadius: 10,
          }}>
          <Text
            style={{
              fontSize: 18,
              color: Color.darkGrey,
              marginHorizontal: 10,
              marginVertical: 10,
            }}>
            Select a City
          </Text>
          <ScrollView>
            {cityData.map((item, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => {
                  handleCitySelection(item);
                }}>
                <Text
                  style={{
                    fontSize: 14,
                    color: Color.black,
                    marginHorizontal: 10,
                  }}>
                  {item?.city}
                </Text>
                <Divider style={{ height: 1, marginVertical: 10 }} />
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      </Modal>
      <Modal visible={localityVisible} transparent={true}>
        <Pressable
          style={{ flex: 1, backgroundColor: Color.transparantBlack }}
          onPress={() => {
            setLocalityVisible(false);
          }}
        />
        <View
          style={{
            flex: 1,
            backgroundColor: 'white',
            padding: 20,
            borderTopLeftRadius: 10,
            borderTopRightRadius: 10,
          }}>
          <Text
            style={{
              fontSize: 18,
              color: Color.darkGrey,
              marginHorizontal: 10,
              marginVertical: 10,
            }}>
            Select a Locality
          </Text>
          <ScrollView>
            {localityData.map((item, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => {
                  dispatch(
                    setPostPropertyLocation({
                      city: city,
                      landmark: item?.value,
                    }),
                  );
                  setSelectedLocality(item?.value);
                  setLocalityVisible(false);
                }}>
                <Text
                  style={{
                    fontSize: 14,
                    color: Color.black,
                    marginHorizontal: 10,
                  }}>
                  {item?.value}
                </Text>
                <Divider style={{ height: 1, marginVertical: 10 }} />
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      </Modal>
    </View>
  );
};

export default LocationBottomModal;

const styles = StyleSheet.create({
  ModalDataView: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ModalDataText: {
    // flex: 1,
    fontSize: 16,
    fontFamily: 'Poppins-SemiBold',
    color: Color.black,
    textTransform: 'capitalize',
  },
  Divider: { height: 1, marginVertical: 10 },
  pillContainer: {
    // marginVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  pillText: {
    fontSize: 16,
    color: 'black',
    fontWeight: 'bold',
    flexWrap: 'wrap',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: 10,
  },
  headerText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
    color: Color.grey,
  },
  sectionHeader: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 5,
    color: Color.black,
  },
  selectionContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  selectionItem: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    margin: 5,
    borderRadius: 50,
    borderWidth: 1,
    borderColor: '#d4d4d4',
  },
  selectionText: {
    fontSize: 14,
  },
  closeButton: {
    marginTop: 10,
    alignSelf: 'flex-end',
    marginRight: 10,
    marginBottom: 10,
  },
  closeButtonText: {
    fontSize: 16,
    color: 'blue',
  },
});
