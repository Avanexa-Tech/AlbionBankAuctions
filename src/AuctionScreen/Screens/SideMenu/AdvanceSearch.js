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
} from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import Icon from 'react-native-vector-icons/Ionicons';
import MCIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import OIcon from 'react-native-vector-icons/Octicons';
import F6Icon from 'react-native-vector-icons/FontAwesome6';
import { Calendar } from 'react-native-calendars';
import moment from 'moment';
import { base_auction_image_url } from '../../Config/base_url';
import { ActivityIndicator } from 'react-native-paper';
import Color from '../../../Config/Color';
import fetchData from '../../../Config/fetchData';
import AuctionItemCard from '../../Auctioncomponents/AuctionItemCard';
import { Categories } from '../Content';
import { Media } from '../../../Global/Media';
import { Poppins } from '../../../Global/FontFamily';
import { useRoute } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { scr_height, scr_width } from '../../../Utils/Dimensions';
import common_fn from '../../../Config/common_fn';
import { Keyboard } from 'react-native';

const { height } = Dimensions.get('screen');

const AdvanceSearch = ({ navigation, route }) => {

    const routeName = useRoute();
    const [selectProperty, setSelectProperty] = useState({});
    const [markDates, setMarkedDates] = useState({});
    const [starttDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [loading, setLoading] = useState(false);
    const [isStartDatePicked, setIsStartDatePicked] = useState(false);
    const [isEndDatePicked, setIsEndDatePicked] = useState(false);
    const animatedOpacityValue = useRef(new Animated.Value(0)).current;
    const [loadMore, setLoadMore] = useState(false);
    const [endReached, setEndReached] = useState(false);
    const [page, setPage] = useState(0);
    const [selectState, setSelectState] = useState({});
    const [currentDistrict, setCurrentDistrict] = useState({});
    const [BankSelected, setBankSelected] = useState({});
    const [minAmount, setMinAmount] = useState('');
    const [maxAmount, setMaxAmount] = useState('');
    const [calenderVisible, setCalenderVisible] = useState(false);
    const [State, setState] = useState([]);
    const [district, setDistrict] = useState([]);
    const [bankDetails, setBankDetails] = useState([]);
    const [AutionData, setAutionData] = useState([]);

    useEffect(() => {
        setLoading(true);
        getApiData().finally(() => {
            setLoading(false);
        });
    }, [
        // starttDate,
        // endDate,
        selectProperty,
        selectState,
        currentDistrict,
        BankSelected,
        // minAmount,
        // maxAmount
    ]);

    useEffect(() => {
        const backHandler = BackHandler.addEventListener('hardwareBackPress', handleBackButtonClick);
        return () => backHandler.remove();
    }, [routeName.name, navigation]);

    // console.log("selectProperty ------------------- : ", selectProperty);

    const onDayPress = day => {
        if (isStartDatePicked == false) {
            let markedDates = {};
            markedDates[day.dateString] = {
                startingDay: true,
                color: '#00B0BF',
                textColor: '#FFFFFF',
            };
            setMarkedDates(markedDates);
            setIsStartDatePicked(true);
            setIsEndDatePicked(false);
            setStartDate(day.dateString);
        } else {
            let markedDates = markDates;
            let startDate = moment(starttDate);
            let endDate = moment(day.dateString);
            let range = endDate.diff(startDate, 'days');
            if (range > 0) {
                for (let i = 1; i <= range; i++) {
                    let tempDate = startDate.add(1, 'day');
                    tempDate = moment(tempDate).format('YYYY-MM-DD');
                    if (i < range) {
                        markedDates[tempDate] = { color: '#00B0BF', textColor: '#FFFFFF' };
                    } else {
                        markedDates[tempDate] = {
                            endingDay: true,
                            color: '#00B0BF',
                            textColor: '#FFFFFF',
                        };
                    }
                }
                setMarkedDates(markedDates);
                setIsStartDatePicked(false);
                setIsEndDatePicked(true);
                setStartDate(starttDate);
                setEndDate(day.dateString);
                setCalenderVisible(false);
            } else {
                setEndDate(starttDate);
                setCalenderVisible(false);
            }
        }
    };

    const dataPayload = () => {
        const payload = {
            property_sub_category: selectProperty?.value,
            event_bank: BankSelected?.bank_name,
            state: selectState?.name,
            district: currentDistrict?.name,
            from: starttDate,
            to: endDate,
            min: minAmount,
            max: maxAmount,
        };

        // Initialize params as a new URLSearchParams instance
        const params = new URLSearchParams();
        for (const key in payload) {
            if (payload[key] != null && payload[key]?.toString().trim().length > 0) {
                params.append(key, payload[key]);
            }
        }
        const queryString = params.toString();
        const query = queryString.replace(/%20/g, ' '); // Replace all occurrences of '%20' with a space
        return query;
    };

    const getApiData = async () => {
        try {
            var data = dataPayload();
            const getAuction = await fetchData.get_Auction(data);
            setAutionData(getAuction);
            //get State
            const getState = await fetchData.Auction_getState({});
            setState(getState);
            //get District
            var districtData = `state=${selectState?.id}`;
            const get_district = await fetchData.Auction_getDistrict(districtData);
            setDistrict(get_district);
            //get District
            const getBankDetails = await fetchData.get_banks({});
            // console.log("Bank List ------------ : ",JSON.stringify(getBankDetails));
            setBankDetails(getBankDetails);
        } catch (error) {
            console.log('error', error);
        }
    };

    const AuctionApiData = async () => {
        try {
            setLoading(true);
            console.log("min ============= :", minAmount + " maxAmount ----------- :", maxAmount);
            // Ensure they are numbers
            const minAmountNum = Number(minAmount);
            const maxAmountNum = Number(maxAmount);

            if (minAmountNum > maxAmountNum) {
                console.log("Please enter a min value is less than or equal to max value");
                common_fn.showToast("Please enter a min value is less than or equal to max value");
            } else {
                const payload = {
                    property_sub_category: selectProperty?.value,
                    event_bank: BankSelected?.bank_name,
                    state: selectState?.name,
                    district: currentDistrict?.name,
                    from: starttDate,
                    to: endDate,
                    min: minAmountNum,
                    max: maxAmountNum,
                };

                // Initialize params as a new URLSearchParams instance
                const params = new URLSearchParams();
                for (const key in payload) {
                    if (payload[key] != null && payload[key]?.toString().trim().length > 0) {
                        params.append(key, payload[key]);
                    }
                }
                const queryString = params.toString();
                const query = queryString.replace(/%20/g, ' '); // Replace all occurrences of '%20' with a space

                // // var data = dataPayload();
                // console.log("query =========== : ", query);
                const getAuction = await fetchData.get_Auction(query);
                // console.log("auctions search =========== : ", getAuction);
                setAutionData(getAuction);
                setLoading(false);
            }

        } catch (error) {
            setLoading(false);
            console.log('catch in AuctionApi_Data', error)
        }
    }

    const clearSearchClick = () => {
        try {
            setSelectProperty({});
            setStartDate('');
            setEndDate('');
            setSelectState('');
            setCurrentDistrict('');
            setBankSelected({})
            setMinAmount('');
            setMaxAmount('')
        } catch (error) {
            console.log('catch in clearSearch_Click :', error)
        }
    }


    function handleBackButtonClick() {
        if (routeName.name == "AdvanceSearch") {
            navigation.goBack();
            return true;
        }
        return false;
    };



    const loadMoreData = async () => {
        if (loadMore || endReached || AutionData.length < 1) {
            return;
        }
        setLoadMore(true);
        try {
            const nextPage = page + 1;
            var data = dataPayload() + '&page_number=' + nextPage;
            const response = await fetchData.get_Auction(data);
            if (response.length > 0) {
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

    return (
        <View style={{ flex: 1, backgroundColor: Color.white }}>
            <View
                style={{
                    width: '100%',
                    backgroundColor: '#FDF0F5',
                    padding: 10, alignItems: 'center',
                }}>
                <View
                    style={{
                        width: '100%',
                        flexDirection: 'row',
                        alignItems: 'center',
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
                            width: '45%',
                            height: 46,
                            marginHorizontal: 2,
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
                        value={selectProperty}
                        onChange={item => {
                            setSelectProperty(item);
                            // setSelectProperty(item.id);
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
                            paddingHorizontal: 5,
                            borderRadius: 5,
                            width: '45%',
                            height: 46,
                            marginHorizontal: 2,
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
                    <View
                        style={{
                            width: '100%',
                            backgroundColor: '#FDF0F5',
                            padding: 0, marginTop: 10
                        }}>
                        <Dropdown
                            style={{
                                backgroundColor: Color.white,
                                borderColor: Color.cloudyGrey,
                                borderWidth: 1,
                                paddingHorizontal: 10,
                                borderRadius: 5,
                                width: '100%',
                                height: 45,
                                // marginHorizontal: 10,
                                marginVertical: 0,
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
                    </View>
                )}
                <Dropdown
                    style={{
                        backgroundColor: Color.white,
                        borderColor: Color.cloudyGrey,
                        borderWidth: 1,
                        paddingHorizontal: 10,
                        borderRadius: 5,
                        width: '100%',
                        height: 45,
                        marginTop: 10,
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
                    data={bankDetails}
                    maxHeight={300}
                    labelField="bank_name"
                    valueField="bank_name"
                    placeholder={'Select Bank Name'}
                    searchPlaceholder="Search..."
                    value={BankSelected}
                    onChange={item => {
                        setBankSelected(item);
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
                <View style={{ width: '100%', marginVertical: 10, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                    <TextInput
                        placeholder="Minimum Price"
                        placeholderTextColor={Color.cloudyGrey}
                        value={minAmount}
                        keyboardType="number-pad"
                        onChangeText={value => {
                            setMinAmount(value)
                        }}
                        onSubmitEditing={() => Keyboard.dismiss()}
                        style={{
                            flex: 1,
                            color: Color.black,
                            padding: 10,
                            width: '45%',
                            height: 45,
                            borderWidth: 1,
                            borderColor: Color.cloudyGrey,
                            backgroundColor: 'white',
                            borderRadius: 5, fontSize: 14
                        }}
                    />
                    <View style={{ width: 4, height: '100%' }}></View>
                    <TextInput
                        placeholder="Maximum Price"
                        placeholderTextColor={Color.cloudyGrey}
                        value={maxAmount}
                        keyboardType="number-pad"
                        onChangeText={value => {
                            setMaxAmount(value)
                        }}
                        onSubmitEditing={() => Keyboard.dismiss()}
                        style={{
                            flex: 1,
                            color: Color.black,
                            padding: 10,
                            width: '45%',
                            height: 45,
                            borderWidth: 1,
                            borderColor: Color.cloudyGrey,
                            backgroundColor: 'white',
                            borderRadius: 5, fontSize: 14
                        }}
                    />
                </View>
                <View style={{ width: '95%', marginVertical: 5, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                    <TouchableOpacity
                        onPress={() => {
                            Keyboard.dismiss();  // Hide keyboard
                            AuctionApiData()
                        }}
                        style={{
                            flex: 1,
                            width: '100%',
                            height: 45,
                            justifyContent: 'center',
                            alignItems: 'center',
                            backgroundColor: Color.primary,
                            borderRadius: 5
                        }}>
                        <Text style={{ fontSize: 16, color: 'white' }}>Search Auction</Text>
                    </TouchableOpacity>
                    <View style={{ width: 10, height: '100%' }}></View>
                    <TouchableOpacity
                        onPress={() => {
                            clearSearchClick()
                        }}
                        style={{
                            flex: 1,
                            width: '100%',
                            height: 45,
                            justifyContent: 'center',
                            alignItems: 'center',
                            backgroundColor: Color.primary,
                            borderRadius: 5
                        }}>
                        <Text style={{ fontSize: 16, color: 'white' }}>Clear</Text>
                    </TouchableOpacity>
                </View>
            </View>

            {calenderVisible && (
                <View
                    style={{
                        backgroundColor: Color.white,
                        shadowColor: Color.black,
                        shadowOffset: {
                            width: 0,
                            height: 2,
                        },
                        shadowOpacity: 0.23,
                        shadowRadius: 2.62,
                        marginVertical: 5,
                        marginHorizontal: 5,
                        elevation: 4,
                    }}>
                    <Calendar
                        monthFormat={'MMMM yyyy'}
                        markedDates={markDates}
                        markingType="period"
                        hideExtraDays={true}
                        hideDayNames={true}
                        onDayPress={day => onDayPress(day)}
                    />
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
                                    // height: height ,
                                }}>
                                <View style={{ width: scr_width, height: scr_height / 2 - 10, justifyContent: 'center', alignItems: 'center' }}>
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
                            </View>
                        );
                    }}
                    showsVerticalScrollIndicator={false}
                />
            )}
        </View>
    );
};

export default AdvanceSearch;
