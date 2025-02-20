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
import DatePicker from 'react-native-ui-datepicker';
import { Dropdown } from 'react-native-element-dropdown';
import { enGB } from 'date-fns/locale';
import Icon from 'react-native-vector-icons/Ionicons';
import MCIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Calendar } from 'react-native-calendars';
import moment from 'moment';
import { ActivityIndicator } from 'react-native-paper';
import Color from '../../../Config/Color';
import fetchData from '../../../Config/fetchData';
import AuctionItemCard from '../../Auctioncomponents/AuctionItemCard';
import { Categories } from '../Content';
import { Media } from '../../../Global/Media';
import { Poppins } from '../../../Global/FontFamily';
import { useRoute } from '@react-navigation/native';
import { scr_height, scr_width } from '../../../Utils/Dimensions';
import common_fn from '../../../Config/common_fn';
import { Keyboard } from 'react-native';
import dayjs from 'dayjs';

const { height } = Dimensions.get('screen');

const AdvanceSearch = ({ navigation, route }) => {

    const routeName = useRoute();
    const [selectProperty, setSelectProperty] = useState(null);
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
    const [selectState, setSelectState] = useState({});
    const [currentDistrict, setCurrentDistrict] = useState(null);
    const [BankSelected, setBankSelected] = useState(null);
    const [minAmount, setMinAmount] = useState('');
    const [maxAmount, setMaxAmount] = useState('');
    const [calenderVisible, setCalenderVisible] = useState(false);
    const [State, setState] = useState([]);
    const [district, setDistrict] = useState([]);
    const [bankDetails, setBankDetails] = useState([]);
    const [AutionData, setAutionData] = useState([]);

    useEffect(() => {
        getApiData()
    }, [selectState])


    useEffect(() => {
        setLoading(true);
        if (minAmount && maxAmount && minAmount <= maxAmount) {
            AuctionApiData();
        }
    }, [
        minAmount,
        maxAmount
    ]);
    useEffect(() => {
            AuctionApiData();
    }, [
        selectProperty,
        selectState,
        currentDistrict,
        BankSelected,
        starttDate,
        endDate,
        district
    ]);

    useEffect(() => {
        const backHandler = BackHandler.addEventListener('hardwareBackPress', handleBackButtonClick);
        return () => backHandler.remove();
    }, [routeName.name, navigation]);

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
            from: starttDate ? dayjs(starttDate).format('YYYY-MM-DD') : undefined,
            to: endDate ? dayjs(endDate).format('YYYY-MM-DD') : undefined,
            min: minAmount,
            max: maxAmount,
        };
      console.log("ddddddddddd");
      console.log("payload",payload);
      
        // Initialize params as a new URLSearchParams instance
        const params = new URLSearchParams();
        for (const key in payload) {
            if (payload[key] != null && payload[key]?.toString().trim().length > 0) {
                params.append(key, payload[key]);
            }
        }
        const queryString = params.toString();
        const query = queryString.replace(/%20/g, ' '); // Replace all occurrences of '%20' with a space
        console.log("query",query);
        return query;
    };

    const getApiData = async () => {
        try {
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
            const minAmountNum = Number(minAmount);
            const maxAmountNum = Number(maxAmount);

            const payload = {
                property_sub_category: selectProperty?.value,
                event_bank: BankSelected?.bank_name,
                state: selectState?.name,
                district: currentDistrict?.name,
                from: starttDate ? dayjs(starttDate).format('YYYY-MM-DD') : undefined,
                to: endDate ? dayjs(endDate).format('YYYY-MM-DD') : undefined,
                min: minAmountNum ? minAmountNum : undefined,
                max: maxAmountNum ? maxAmountNum : undefined
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

            const getAuction = await fetchData.get_Auction(query);
            setAutionData(getAuction);
            setLoading(false);

        } catch (error) {
            setLoading(false);
        }
    }

    const clearSearchClick = () => {
        try {
            setSelectProperty(null);
            setStartDate('');
            setEndDate('');
            setSelectState('');
            setCurrentDistrict('');
            setBankSelected(null)
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
                console.log("gggggggggggggggggggffff",response);
                
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
                            borderRadius: 5,
                            paddingHorizontal: 10,
                            width: '45%',
                            height: 46,
                            marginHorizontal: 2,
                        }}
                        placeholderStyle={{
                            fontSize: 11,
                            color: Color.cloudyGrey,
                            marginHorizontal: 10,
                            fontFamily: Poppins.Regular
                        }}
                        selectedTextStyle={{
                            fontSize: 12,
                            color: Color.black,
                            marginHorizontal: 10,
                            fontFamily: Poppins.Regular
                        }}
                        iconStyle={{ width: 20, height: 20 }}
                        itemTextStyle={{ fontSize: 12, color: Color.cloudyGrey, fontFamily: Poppins.Regular }}
                        data={Categories}
                        maxHeight={300}
                        labelField="label"
                        valueField="value"
                        placeholder="Select property"
                        searchPlaceholder="Search..."
                        value={selectProperty}
                        onChange={item => {
                            setSelectProperty(item);
                        }}
                        renderRightIcon={() => (
                            selectProperty ? <Icon
                                style={{ width: 20, height: 20 }}
                                color={Color.cloudyGrey}
                                name="close"
                                onPress={() => setSelectProperty(null)}
                                size={20}
                            /> :
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
                            fontSize: 11,
                            color: Color.cloudyGrey,
                            marginHorizontal: 10,
                            fontFamily: Poppins.Regular
                        }}
                        selectedTextStyle={{
                            fontSize: 12,
                            color: Color.black,
                            marginHorizontal: 10,
                            fontFamily: Poppins.Regular
                        }}
                        iconStyle={{ width: 20, height: 20 }}
                        itemTextStyle={{ fontSize: 12, color: Color.cloudyGrey, fontFamily: Poppins.Regular }}
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
                        renderRightIcon={() => (selectState?.name ? <Icon
                            style={{ width: 20, height: 20 }}
                            color={Color.cloudyGrey}
                            name="close"
                            onPress={() => {
                                setSelectState({
                                ...selectState,
                                name: null
                            })
                            setCurrentDistrict(null)
                        }}
                            size={20}
                        /> :
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
                                fontSize: 11,
                                color: Color.cloudyGrey,
                                marginHorizontal: 10,
                                fontFamily: Poppins.Regular
                            }}
                            selectedTextStyle={{
                                fontSize: 12,
                                color: Color.black,
                                marginHorizontal: 10,
                                fontFamily: Poppins.Regular
                            }}
                            iconStyle={{ width: 20, height: 20 }}
                            itemTextStyle={{ fontSize: 12, color: Color.cloudyGrey, fontFamily: Poppins.Regular }}
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
                            renderRightIcon={() => (currentDistrict != null ? 
                            <Icon
                                style={{ width: 20, height: 20 }}
                                color={Color.cloudyGrey}
                                name="close"
                                onPress={() => setCurrentDistrict(null)}
                                size={20}
                            /> :
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
                        marginVertical: 8,
                    }}
                    placeholderStyle={{
                        fontSize: 11,
                        color: Color.cloudyGrey,
                        marginHorizontal: 10,
                        fontFamily: Poppins.Regular
                    }}
                    selectedTextStyle={{
                        fontSize: 12,   
                        color: Color.black,
                        marginHorizontal: 10,
                        fontFamily: Poppins.Regular
                    }}
                    iconStyle={{ width: 20, height: 20 }}
                    itemTextStyle={{ fontSize: 12, color: Color.cloudyGrey, fontFamily: Poppins.Regular }}
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
                    renderRightIcon={() => (BankSelected ? <Icon
                        style={{ width: 20, height: 20 }}
                        color={Color.cloudyGrey}
                        name="close"
                        onPress={() => setBankSelected(null)}
                        size={20}
                    />  :
                        <Icon
                            style={{ width: 20, height: 20 }}
                            color={Color.cloudyGrey}
                            name="chevron-down"
                            size={20}
                        />
                    )}
                />
                <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                    <TextInput
                        placeholder="Minimum Price"
                        placeholderTextColor={Color.cloudyGrey}
                        value={minAmount}
                        keyboardType="number-pad"
                        onChangeText={value => {
                            setMinAmount(value)
                            // setTimeout(() => {
                            // }, 1000);
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
                            borderRadius: 5, fontSize: 11,
                            fontFamily: Poppins.Regular
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
                            // setTimeout(() => {
                            // }, 1000);
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
                            borderRadius: 5, fontSize: 11,
                            fontFamily: Poppins.Regular
                        }}
                    />
                </View>
                <View style={{ width: '95%', marginVertical: 5, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                    <TouchableOpacity
                        onPress={() => {
                            clearSearchClick()
                        }}
                        style={{
                            marginTop: 5,
                            width: '100%',padding:10,
                            justifyContent: 'center',
                            alignItems: 'center',
                            backgroundColor: Color.primary,
                            borderRadius: 5,
                        }}>
                        <Text style={{ fontSize: 12, color: 'white', fontFamily: Poppins.Light }}>Clear</Text>
                    </TouchableOpacity>
                    <View style={{ width: 10, height: '100%' }}></View>
                    {/* <TouchableOpacity
                        onPress={() => {
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
                        <Text style={{ fontSize: 12, color: 'white', fontFamily: Poppins.Light }}>Search Auction</Text>
                    </TouchableOpacity> */}
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
                        backgroundColor: "white",
                        position: "absolute"
                    }}>
                    <DatePicker
                        mode='range'
                        locale={enGB}
                        displayFullDays='true'
                        startDate={starttDate}
                        endDate={endDate}
                        onChange={(e) => {
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
