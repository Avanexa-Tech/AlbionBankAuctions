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
    StatusBar, SafeAreaView,
    TouchableOpacity, SectionList,
    Alert,
    Platform,
    UIManager,
    LayoutAnimation,
    LogBox,
    Modal, Linking
} from 'react-native';

import { useNavigation } from '@react-navigation/native';
import { useSelector, useDispatch } from "react-redux";
import NetInfo from "@react-native-community/netinfo";
import { Media } from '../../../Global/Media';
import { primarycolor } from '../../../Utils/Colors';
import Color from '../../../Config/Color';
import common_fn from '../../../Config/common_fn';
import ExpandableComponent from '../../../Utils/ExpandableComponent';
import { scr_height, scr_width } from '../../../Utils/Dimensions';
import { Iconviewcomponent } from '../../../Components/Icontag';
import { Poppins } from '../../../Global/FontFamily';

const freeRentalData = [
    {
        'id': '0',
        'rent_img': Media.fill,
        'rent_title': 'Fill details online',
        'rent_subText': 'Fill in your details in a fully customized legal template'
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
        category_name: 'What are the factors you should know before applying for a  home loan?',
        subcategory: [
            { id: 7, val: 'Making your credit score is good. Higher the score, the better.' },
            { id: 8, val: 'Check if you can afford to pay monthly EmIs from your current income.' },
            { id: 9, val: 'Research all the loan options available before finalizing an offer.' },
        ],
    },
    {
        isExpanded: false,
        category_name: 'What are the different types of home loan fees and charges?',
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
        'cus_id': '0',
        'cus_name': 'Arunachalam Annamalai',
        'cus_desc': 'Albion made it easier to shortlist the perfect designer to bring my dream vision to life, with in the promise time!',
        'cus_rating': '4.5',
    },
    {
        'cus_id': '1',
        'cus_name': 'Pradeep Ramakrish',
        'cus_desc': 'Albion made it easier to shortlist the perfect designer to bring my dream vision to life, with in the promise time!',
        'cus_rating': '4',
    },
    {
        'cus_id': '2',
        'cus_name': 'Naveen Kumar g',
        'cus_desc': 'Albion made it easier to shortlist the perfect designer to bring my dream vision to life, with in the promise time!',
        'cus_rating': '5',
    },
];

LogBox.ignoreAllLogs();

const AuctionContactUs = () => {

    const dispatch = useDispatch();
    const navigation = useNavigation();
    const [netInfo_State, setNetinfo] = useState(true);

    const [height, setHeight] = useState(undefined);

    const [listDataSource, setListDataSource] = useState(CONTENT);
    const [multiSelect, setMultiSelect] = useState(false);
    const animatedOpacityValue = useRef(new Animated.Value(0)).current;


    const [username, setUsername] = useState('');
    const [message, setMessage] = useState('');
    const [NameError, setNameError] = useState(false);
    const [NumError, setNumError] = useState(false);
    const [AddError, setAddError] = useState(false);
    const [number, setNumber] = useState('');

    const [textInputNumber, setTextInputNumber] = useState('');
    const [textInputEmail, setTextInputEmail] = useState('');

    const [HomeLoanVisible, setHomeLoanVisible] = useState(false);


    const [selectcity, setselectcity] = useState('Select City');
    const [selectCityItem, setSelectCityItem] = useState('');


    const [phoneno, setPhoneno] = useState('');
    const [income, setIncome] = useState('');
    const [error, setError] = useState(false);


    let listRefArr = useRef([]);
    let isListGliding = useRef(false);
    let listOffset = useRef({});
    const [tabIndex, setIndex] = useState(0);

    const [routes] = useState([
        { id: 1, title: 'Buy' },
        { id: 2, title: 'Rent' },
        { id: 3, title: 'Rent' },
        { id: 4, title: 'Rent' },
        { id: 5, title: 'Rent' },
    ]);

    const scrollY = useRef(new Animated.Value(0)).current;

    const [BuySection] = useState([
        { id: 1, title: 'Auction Intro', data: ['Auction Intro'] },
        { id: 2, title: 'Auction Advantage', data: ['Auction Advantage'] },
        { id: 3, title: 'Auction Contact', data: ['Auction Contact'] },
    ]);



    useEffect(() => {
        try {
            const unsubscribe = NetInfo.addEventListener(state => {
                setNetinfo(state.isConnected)
            });
            return () => unsubscribe;

        } catch (error) {
            console.log("catch in use_effect's Free_rental : ", error);
        }
    }, []);


    useEffect(() => {
        scrollY.addListener(({ value }) => {
            const curRoute = routes[tabIndex].key;
            listOffset.current[curRoute] = value;
        });
        return () => {
            scrollY.removeAllListeners();
        };
    }, []);

    const onMomentumScrollBegin = () => {
        isListGliding.current = true;
    };

    const onMomentumScrollEnd = () => {
        isListGliding.current = false;
        syncScrollOffset();
    };

    const onScrollEndDrag = () => {
        syncScrollOffset();
    };

    const syncScrollOffset = () => {
        // const curRouteKey = routes[tabIndex].key;
        listRefArr.current.forEach(item => {
            if (item.key !== curRouteKey) {
                if (scrollY._value < HeaderHeight && scrollY._value >= 0) {
                    if (item.value) {
                        item.value.scrollToOffset({
                            offset: scrollY._value,
                            animated: false,
                        });
                        listOffset.current[item.key] = scrollY._value;
                    }
                } else if (scrollY._value >= HeaderHeight) {
                    if (
                        listOffset.current[item.key] < HeaderHeight ||
                        listOffset.current[item.key] == null
                    ) {
                        if (item.value) {
                            item.value.scrollToOffset({
                                offset: HeaderHeight,
                                animated: false,
                            });
                            listOffset.current[item.key] = HeaderHeight;
                        }
                    }
                }
            }
        });
    };


    const checkTextInput = () => {
        if (!username.trim()) {
            var msg = 'Please Enter Name';
            setNameError(msg);
            return;
        } else {
            setNameError(false);
        }
        if (!textInputNumber.trim()) {
            var msg = 'Please Enter Number';
            setNumError(msg);
            return;
        } else {
            setNumError(false);
        }
        if (!textInputAddress.trim()) {
            var msg = 'Please Enter Address';
            setAddError(msg);
            return;
        } else {
            setAddError(false);
        }
    };
    const chkNumber = number => {
        setNumber(number);
        if (number.length == 10) {
            Keyboard.dismiss();
        }
    };

    if (Platform.OS === 'android') {
        UIManager.setLayoutAnimationEnabledExperimental(true);
    }

    const updateLayout = (index) => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        const array = [...listDataSource];
        if (multiSelect) {
            // If multiple select is enabled
            array[index]['isExpanded'] = !array[index]['isExpanded'];
        } else {
            // If single select is enabled
            array.map((value, placeindex) =>
                placeindex === index
                    ? (array[placeindex]['isExpanded'] =
                        !array[placeindex]['isExpanded'])
                    : (array[placeindex]['isExpanded'] = false),
            );
        }
        setListDataSource(array);
    };


    function renderHeaderItem() {
        try {
            return (
                <View style={{ width: '100%', alignItems: 'center' }}>
                    <View style={{ width: scr_width }}>
                        <Image
                            source={{ uri: Media.aboutUsBanner }}
                            style={{
                                width: scr_width,
                                height: 220, resizeMode: 'contain'
                            }}
                        />
                    </View>

                    <View style={{ width: '95%' }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10 }}>
                            <Text style={{ fontSize: 20, color: primarycolor, fontFamily: 'Poppins-Bold' }}>Bank Auctions simplified</Text>
                        </View>
                        <Text style={{ fontSize: 14, color: '#333', fontFamily: 'Poppins-SemiBold', lineHeight: 25, paddingVertical: 10 }}>Albion portal is the right place to find foreclosed properties listed by leading private and public banks</Text>
                        <Text style={{ fontSize: 14, color: '#333', fontFamily: 'Poppins-SemiBold', lineHeight: 25 }}>As a most trusted eAcution portal we make it possible for you to own a property.</Text>
                        <Text style={{ fontSize: 14, color: '#333', fontFamily: 'Poppins-SemiBold', lineHeight: 25, paddingVertical: 10 }}>Experience effortless bidding in an easy-to-use and legally safe eAuction platform.</Text>
                    </View>

                    <View style={{ width: '95%', alignItems: 'center' }}>

                        <View style={{ width: '95%', marginVertical: 5 }}>
                            {NameError && <Text style={styles.errorMsg}>{NameError}</Text>}
                            <Text
                                style={{
                                    fontFamily: Poppins.Medium,
                                    fontSize: 14,
                                    color: Color.black,
                                    marginVertical: 5,
                                }}>
                                Full Name
                            </Text>
                            <TextInput
                                placeholder="Name"
                                placeholderTextColor={Color.cloudyGrey}
                                onChangeText={(text) => setUsername(text)}
                                style={styles.demoNameTextInput}
                                value={username}
                            />
                        </View>

                        <View style={{ width: '95%', marginVertical: 5 }}>
                            {NumError && <Text style={styles.errorMsg}>{NumError}</Text>}
                            <Text
                                style={{
                                    fontFamily: Poppins.Medium,
                                    fontSize: 14,
                                    color: Color.black,
                                    marginVertical: 5,
                                }}>
                                Phone Number
                            </Text>
                            <View style={styles.phoneView}>
                                <Text style={styles.PhoneCodeText}>+91</Text>
                                <TextInput
                                    placeholder="Enter your Number"
                                    placeholderTextColor={Color.cloudyGrey}
                                    maxLength={10}
                                    autoFocus={number.length == 10 ? true : false}
                                    onChangeText={number => {
                                        chkNumber(number);
                                        setTextInputNumber(number);
                                    }}
                                    keyboardType="phone-pad"
                                    style={styles.phoneTextInput}
                                />
                            </View>
                        </View>

                        <View style={{ width: '95%', marginVertical: 5 }}>
                            <Text
                                style={{
                                    fontFamily: Poppins.Medium,
                                    fontSize: 14,
                                    color: Color.black,
                                    marginVertical: 5,
                                }}>
                                Email ID
                            </Text>
                            <TextInput
                                placeholder="Email"
                                placeholderTextColor={Color.cloudyGrey}
                                onChangeText={value => setTextInputEmail(value)}
                                textContentType="emailAddress"
                                style={styles.EmailTextInput}
                            />
                        </View>

                        <View style={{ width: '95%', marginVertical: 5 }}>
                            <Text
                                style={{
                                    fontFamily: Poppins.Medium,
                                    fontSize: 14,
                                    color: Color.black,
                                    marginVertical: 5,
                                }}>
                                Message
                            </Text>
                            <TextInput
                                placeholder="Enter your comments"
                                placeholderTextColor={Color.cloudyGrey}
                                onChangeText={(text) => setMessage(text)}
                                style={styles.demoNameTextInput}
                                value={message}
                            />
                        </View>

                        <TouchableOpacity style={{ width: '95%', height: 45, backgroundColor: primarycolor, borderRadius: 5, marginVertical: 20, justifyContent: 'center', alignItems: 'center' }}>
                            <Text style={{ fontSize: 14, color: 'white' }}>Submit</Text>
                        </TouchableOpacity>

                    </View>

                    <View style={{ width: '100%', flexDirection: 'row', alignItems: 'center' }}>
                        <Text style={{ paddingHorizontal: 10, fontSize: 18, color: 'black', fontFamily: 'Poppins-SemiBold' }}>Why Albion Bank Auctions?</Text>
                    </View>

                </View>
            );
        } catch (error) {
            console.log("catch in renderHeader_Item's Home_Free_Rent : ", error);
        }
    }

    function renderFreeRentalItem(item, index) {
        try {
            return (
                <View style={{ width: '100%', alignItems: 'center', paddingHorizontal: 10, paddingBottom: 20 }}>
                    <View style={{ width: '100%', paddingVertical: 10, paddingHorizontal: 10 }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <View style={{ width: 5, height: 5, backgroundColor: '#666', borderRadius: 50 }}></View>
                            <Text style={{ fontSize: 14, color: '#333', textAlign: 'justify', marginHorizontal: 10, fontFamily: 'Poppins-Regular', }}>Get data of over 10000+ properties at single click. </Text>
                        </View>
                    </View>

                    <View style={{ width: '100%', paddingVertical: 5, paddingHorizontal: 10 }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <View style={{ width: 5, height: 5, backgroundColor: '#666', borderRadius: 50 }}></View>
                            <Text style={{ fontSize: 14, color: '#333', textAlign: 'justify', marginHorizontal: 10, fontFamily: 'Poppins-Regular', }}>Get data of Past Auctions as well as future auctions. </Text>
                        </View>
                    </View>

                    <View style={{ width: '100%', paddingVertical: 5, paddingHorizontal: 10 }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <View style={{ width: 5, height: 5, backgroundColor: '#666', borderRadius: 50 }}></View>
                            <Text style={{ fontSize: 14, color: '#333', textAlign: 'justify', marginHorizontal: 10, fontFamily: 'Poppins-Regular', }}>Our services are available 24x7. </Text>
                        </View>
                    </View>

                    <View style={{ width: '100%', paddingVertical: 5, paddingHorizontal: 10 }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <View style={{ width: 5, height: 5, backgroundColor: '#666', borderRadius: 50 }}></View>
                            <Text style={{ fontSize: 14, color: '#333', textAlign: 'justify', marginHorizontal: 10, fontFamily: 'Poppins-Regular', }}>Get professionally sorted data at one platform.</Text>
                        </View>
                    </View>

                    <View style={{ width: '100%', paddingVertical: 5, paddingHorizontal: 10 }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <View style={{ width: 5, height: 5, backgroundColor: '#666', borderRadius: 50 }}></View>
                            <Text style={{ fontSize: 14, color: '#333', textAlign: 'justify', marginHorizontal: 10, fontFamily: 'Poppins-Regular', }}>Great opportunity to buy cheaper residential & commercial properties.</Text>
                        </View>
                    </View>
                </View>
            );
        } catch (error) {
            console.log('catch in render FreeRental_Item : ', error);
        }
    }

    function renderfooterItem() {
        try {
            return (
                <View style={{ width: '95%', height: scr_height * 1.5 - 100, alignItems: 'center', backgroundColor: 'white' }}>
                    <View style={{ width: '95%', justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={{ width: '100%', fontSize: 16, color: '#000', fontFamily: 'Poppins-SemiBold', textAlign: 'justify', lineHeight: 20 }}>Bank Auctions simplified </Text>
                        <Text style={{ width: '100%', fontSize: 14, color: '#666', fontFamily: 'Poppins-Regular', textAlign: 'justify', lineHeight: 20, paddingVertical: 10 }}>Albion is a super convenient portal designed and developed to help private and public banks to auction their NPAs in the most effective and easiest approach. Participating in auction is no more burdensome.</Text>
                    </View>

                    <View style={{ width: '100%', marginVertical: 10, alignItems: 'center' }}>
                        <Text style={{ width: '95%', fontSize: 16, color: 'black', fontFamily: 'Poppins-SemiBold' }}>Contact Us</Text>

                        <Text style={{ width: '95%', fontSize: 14, color: '#666', fontFamily: 'Poppins-Regular', paddingTop: 10 }}>For any other queries and feedback can reach us with below address </Text>

                        <TouchableOpacity style={{ width: '95%', flexDirection: 'row', alignItems: 'center', marginTop: 20 }}>
                            <View style={{ width: 40, height: 40, justifyContent: 'center', alignItems: 'center', borderRadius: 50, borderColor: primarycolor, borderWidth: 1 }}>
                                <Iconviewcomponent
                                    Icontag={'Feather'}
                                    iconname={'phone-call'}
                                    icon_size={22}
                                    iconstyle={{ color: primarycolor }}
                                />
                            </View>
                            <Text style={{ fontSize: 16, color: 'black', fontFamily: 'Poppins-SemiBold', paddingHorizontal: 10 }}>+91 9943300700</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={{ width: '95%', flexDirection: 'row', alignItems: 'center', marginVertical: 20 }}>
                            <View style={{ width: 40, height: 40, justifyContent: 'center', alignItems: 'center', borderRadius: 50, borderColor: primarycolor, borderWidth: 1 }}>
                                <Iconviewcomponent
                                    Icontag={'Ionicons'}
                                    iconname={'mail'}
                                    icon_size={22}
                                    iconstyle={{ color: primarycolor }}
                                />
                            </View>
                            <Text style={{ width: '95%', fontSize: 16, color: 'black', fontFamily: 'Poppins-SemiBold', paddingHorizontal: 10 }}>support@albionbankauctions.com</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={{ width: '95%', flexDirection: 'row', alignItems: 'center' }}>
                            <View style={{ width: 40, height: 40, justifyContent: 'center', alignItems: 'center', borderRadius: 50, borderColor: primarycolor, borderWidth: 1 }}>
                                <Iconviewcomponent
                                    Icontag={'Fontisto'}
                                    iconname={'map-marker-alt'}
                                    icon_size={22}
                                    iconstyle={{ color: primarycolor }}
                                />
                            </View>
                            <View>
                                <Text style={{ width: '95%', fontSize: 15, color: '#333', fontFamily: 'Poppins-SemiBold', paddingHorizontal: 10 }}>Albion Investments and Holdings Pvt Ltd,</Text>
                                <Text style={{ width: '95%', fontSize: 14, color: '#666', fontFamily: 'Poppins-Regular', paddingHorizontal: 10, lineHeight: 20 }}>Level 5, Thamarai Tech Park,</Text>
                                <Text style={{ width: '95%', fontSize: 14, color: '#666', fontFamily: 'Poppins-Regular', paddingHorizontal: 10, lineHeight: 20 }}>S.P Plot No:16-19 & 20-A,</Text>
                                <Text style={{ width: '95%', fontSize: 14, color: '#666', fontFamily: 'Poppins-Regular', paddingHorizontal: 10, lineHeight: 20 }}>Thiru Vi Ka Industrial Estate,</Text>
                                <Text style={{ width: '95%', fontSize: 14, color: '#666', fontFamily: 'Poppins-Regular', paddingHorizontal: 10, lineHeight: 20 }}>Inner Ring Road, Guindy,</Text>
                                <Text style={{ width: '95%', fontSize: 14, color: '#666', fontFamily: 'Poppins-Regular', paddingHorizontal: 10, lineHeight: 20 }}>Chennai- 600032, Tamilnadu.</Text>
                            </View>
                        </TouchableOpacity>
                    </View>

                    <View style={{ width: '95%', flexDirection: 'row', alignItems: 'center', marginVertical: 20 }}>
                        <View style={{ flex: 0, justifyContent: 'center', alignItems: 'center' }}>
                            <Image
                                source={{ uri: Media.albionlogo }}
                                style={{ width: 50, height: 50, resizeMode: 'contain' }}
                            />
                        </View>
                        <View style={{ flex: 2, justifyContent: 'center', alignItems: 'center', paddingHorizontal: 10 }}>
                            <Text style={{ fontSize: 18, color: primarycolor, fontFamily: 'Poppins-SemiBold' }}>Albion Bank Auctions Pvt Ltd</Text>
                            <Text style={{ width: '95%', textAlign: 'justify', fontSize: 14, color: '#666', fontFamily: 'Poppins-SemiBold', paddingVertical: 10 }} numberOfLines={2} >India’s No.1 Property Site is now a Superband</Text>
                        </View>
                    </View>

                    <View style={{ width: '95%', alignItems: 'center', paddingHorizontal: 10, marginVertical: 20 }}>
                        <View style={{ width: '95%', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                            <TouchableOpacity style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center' }}>
                                <View style={{ width: 5, height: 5, backgroundColor: '#666', borderRadius: 50 }}></View>
                                <Text style={{ fontSize: 16, color: '#333', fontFamily: 'Poppins-Regular', paddingHorizontal: 5, textDecorationLine: 'underline' }}>About Us</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center' }}>
                                <View style={{ width: 5, height: 5, backgroundColor: '#666', borderRadius: 50 }}></View>
                                <Text style={{ fontSize: 16, color: '#333', fontFamily: 'Poppins-Regular', paddingHorizontal: 5, textDecorationLine: 'underline' }}>Privacy Policy</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={{ width: '95%', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginVertical: 30 }}>
                            <TouchableOpacity style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center' }}>
                                <View style={{ width: 5, height: 5, backgroundColor: '#666', borderRadius: 50 }}></View>
                                <Text style={{ fontSize: 16, color: '#333', fontFamily: 'Poppins-Regular', paddingHorizontal: 5, textDecorationLine: 'underline' }}>Terms & Conditions</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center' }}>
                                <View style={{ width: 5, height: 5, backgroundColor: '#666', borderRadius: 50 }}></View>
                                <Text style={{ fontSize: 16, color: '#333', fontFamily: 'Poppins-Regular', paddingHorizontal: 5, textDecorationLine: 'underline' }}>Website</Text>
                            </TouchableOpacity>
                        </View>
                    </View>

                </View>
            );
        } catch (error) {
            console.log('catch in renderfooter_Item : ', error);
        }
    }

    function renderCusReviewItem(item, index) {
        try {
            return (
                <View style={{ width: 320, height: 160, alignItems: 'center', justifyContent: 'center', marginHorizontal: 10, paddingHorizontal: 10, backgroundColor: 'white', elevation: 2, marginVertical: 10, borderRadius: 10 }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: 10 }}>
                        <View style={{ flex: 0, justifyContent: 'center', alignItems: 'center' }}>
                            <Image
                                source={{ uri: Media.home_banner }}
                                style={{
                                    width: 80, height: 80, resizeMode: 'contain', borderRadius: 50
                                }}
                            />
                        </View>
                        <View style={{ flex: 1, justifyContent: 'flex-start', alignItems: 'flex-start', paddingHorizontal: 10 }}>
                            <Text style={{ fontSize: 16, color: 'black', fontFamily: 'Poppins-SemiBold' }} numberOfLines={1}>{item.cus_name}</Text>
                            <Text style={{ fontSize: 14, color: '#666', textAlign: 'justify', fontFamily: 'Poppins-Regular' }} numberOfLines={5}>{item.cus_desc}</Text>
                        </View>
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-start', paddingHorizontal: 30, alignItems: 'center' }}>
                            <Text style={{ fontSize: 14, color: 'black', fontFamily: 'Poppins-SemiBold' }}>{item.cus_rating} </Text>
                            <Text style={{ fontSize: 13, color: '#666', fontFamily: 'Poppins-SemiBold', textAlign: 'justify' }}>/5</Text>
                        </View>
                        <View style={{ flex: 1 }}>
                        </View>
                    </View>
                </View>
            );
        } catch (error) {
            console.log('catch in renderCus_ReviewItem : ', error);
        }
    }


    function renderFooterItem(item, index) {
        try {
            return (
                <View style={{ width: '97%', height: scr_height * 1.8 - 100, alignItems: 'center', backgroundColor: 'white' }}>


                    <View style={{ width: '95%', marginVertical: 10, alignItems: 'center' }}>
                        <Text style={{ width: '95%', paddingVertical: 10, fontSize: 18, color: 'black', fontFamily: 'Poppins-SemiBold' }}>Any Questions? We are here to help</Text>

                        <View style={{ width: '100%' }}>
                            {listDataSource.map((item, key) => (
                                <ExpandableComponent
                                    key={item.category_name}
                                    onClickFunction={() => {
                                        updateLayout(key);
                                    }}
                                    item={item}
                                />
                            ))}
                        </View>
                    </View>

                    <View style={{ width: '95%', marginVertical: 10, alignItems: 'center' }}>
                        <Text style={{ width: '95%', fontSize: 18, color: 'black', fontFamily: 'Poppins-Bold' }}>Customer Review</Text>

                        <View style={{ width: '100%', alignItems: 'center', marginVertical: 10 }}>
                            <ScrollView
                                horizontal={true}
                                showsHorizontalScrollIndicator={false}
                                scrollEventThrottle={200}
                                decelerationRate="normal"
                            // pagingEnabled
                            >
                                <FlatList
                                    horizontal
                                    data={cutData}
                                    keyExtractor={(item, index) => item + index}
                                    renderItem={({ item, index }) => renderCusReviewItem(item, index)}
                                    style={{ width: '95%' }}
                                    showsHorizontalScrollIndicator={false}
                                />
                            </ScrollView>
                        </View>
                    </View>





                    {/* <View style={{ width: '95%', flexDirection: 'row', alignItems: 'center', marginVertical: 10, backgroundColor: '#FFF4DE', paddingVertical: 15, paddingHorizontal: 10 }}>
                        <View style={{ flex: 2, justifyContent: 'center', alignItems: 'flex-start', padding: 10 }}>
                            <Text style={{ fontSize: 16, color: 'black', fontFamily: 'Poppins-SemiBold' }}>Download the App</Text>
                            <Text style={{ fontSize: 15, color: '#666', fontFamily: 'Poppins-Regular' }}>Get alerts for best matches on App</Text>
                        </View>
                        <TouchableOpacity style={{ flex: 1, justifyContent: 'center', alignItems: 'center', paddingHorizontal: 10, borderRadius: 40, padding: 7, backgroundColor: '#FFAD09' }}>
                            <Text style={{ fontSize: 14, color: 'white', fontFamily: 'Poppins-Bold' }}>Get App</Text>
                        </TouchableOpacity>
                    </View> */}

                    <View style={{ width: '95%', flexDirection: 'row', alignItems: 'center', marginVertical: 30 }}>
                        <View style={{ flex: 0, justifyContent: 'center', alignItems: 'center' }}>
                            <Image
                                source={{ uri: Media.albionlogo }}
                                style={{ width: 60, height: 60, resizeMode: 'contain' }}
                            />
                        </View>
                        <View style={{ flex: 2, justifyContent: 'center', alignItems: 'center', paddingHorizontal: 10 }}>
                            <Text style={{ fontSize: 19, color: primarycolor, fontFamily: 'Poppins-SemiBold' }}>Albion Bank Auctions Pvt Ltd</Text>
                            <Text style={{ width: '95%', textAlign: 'justify', fontSize: 14, color: '#666', fontFamily: 'Poppins-SemiBold' }} numberOfLines={2} >India’s No.1 Property Site is now a Superband</Text>
                        </View>
                    </View>

                    <View style={{ width: '95%', alignItems: 'center', paddingHorizontal: 10, marginVertical: 30 }}>
                        <View style={{ width: '95%', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                            <View style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center' }}>
                                <View style={{ width: 5, height: 5, backgroundColor: '#666', borderRadius: 50 }}></View>
                                <Text style={{ fontSize: 16, color: '#333', fontFamily: 'Poppins-Regular', paddingHorizontal: 5, textDecorationLine: 'underline' }}>About Us</Text>
                            </View>
                            <View style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center' }}>
                                <View style={{ width: 5, height: 5, backgroundColor: '#666', borderRadius: 50 }}></View>
                                <Text style={{ fontSize: 16, color: '#333', fontFamily: 'Poppins-Regular', paddingHorizontal: 5, textDecorationLine: 'underline' }}>Privacy Policy</Text>
                            </View>
                        </View>
                        <View style={{ width: '95%', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginVertical: 10 }}>
                            <View style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center' }}>
                                <View style={{ width: 5, height: 5, backgroundColor: '#666', borderRadius: 50 }}></View>
                                <Text style={{ fontSize: 16, color: '#333', fontFamily: 'Poppins-Regular', paddingHorizontal: 5, textDecorationLine: 'underline' }}>Terms & Conditions</Text>
                            </View>
                            <View style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center' }}>
                                <View style={{ width: 5, height: 5, backgroundColor: '#666', borderRadius: 50 }}></View>
                                <Text style={{ fontSize: 16, color: '#333', fontFamily: 'Poppins-Regular', paddingHorizontal: 5, textDecorationLine: 'underline' }}>Website</Text>
                            </View>
                        </View>
                    </View>


                </View>
            );
        } catch (error) {
            console.log("catch in renderFooterItem's Free_rental : ", error);
        }
    }
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


    function submitClick() {
        try {

            if (username != '' && textInputNumber != '' && textInputEmail != '' && message != '') {
                setHomeLoanVisible(true);
            }
            else {
                if (Platform.OS === 'ios') {
                    Alert.alert("Please enter all mandatory fields");
                } else {
                    common_fn.showToast('Please enter all mandatory fields');
                }
                console.log("else enter fields");
            }

        } catch (error) {
            console.log('catch in submitClick : ', error);
        }
    }

    return (
        <View style={styles.container}>
            {/* {netInfo_State ? null :
                  <Animated.View animation="fadeInRight" style={{ position: 'absolute', zIndex: 9999, width: '100%', alignItems: 'center', backgroundColor: '#626262', opacity: 0.5, padding: 10, marginTop: Platform.OS == "ios" ? 80 : 45 }}>
                      <Text style={{ color: 'white' }}>No Internet Connection</Text>
                  </Animated.View>
              } */}

            <Animated.SectionList
                sections={BuySection}
                scrollEnabled={true}
                keyExtractor={(item, index) => item + index}
                showsVerticalScrollIndicator={false}
                scrollEventThrottle={1}
                onScroll={Animated.event(
                    [{ nativeEvent: { contentOffset: { y: scrollY } } }],
                    {
                        useNativeDriver: true,
                    },
                )}
                onMomentumScrollBegin={onMomentumScrollBegin}
                onScrollEndDrag={onScrollEndDrag}
                onMomentumScrollEnd={onMomentumScrollEnd}
                nestedScrollEnabled
                // initialNumToRender={5}
                renderItem={({ item }) => {
                    switch (item) {
                        case 'Auction Intro':
                            return (
                                <View style={{ width: scr_width, alignItems: 'center' }}>
                                    <View style={{ width: scr_width }}>
                                        <Image
                                            source={{ uri: Media.contactUsBanner }}
                                            style={{
                                                width: scr_width,
                                                height: 220, resizeMode: 'contain'
                                            }}
                                        />
                                    </View>

                                    <View style={{ width: '90%' }}>
                                        <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10 }}>
                                            <Text style={{ fontSize: 20, color: primarycolor, fontFamily: 'Poppins-Bold' }}>Bank Auctions simplified</Text>
                                        </View>
                                        <Text style={{ fontSize: 14, color: '#333', fontFamily: 'Poppins-SemiBold', lineHeight: 25, paddingVertical: 10 }}>Albion portal is the right place to find foreclosed properties listed by leading private and public banks</Text>
                                        <Text style={{ fontSize: 14, color: '#333', fontFamily: 'Poppins-SemiBold', lineHeight: 25 }}>As a most trusted eAcution portal we make it possible for you to own a property.</Text>
                                        <Text style={{ fontSize: 14, color: '#333', fontFamily: 'Poppins-SemiBold', lineHeight: 25, paddingVertical: 10 }}>Experience effortless bidding in an easy-to-use and legally safe eAuction platform.</Text>
                                    </View>

                                    <View style={{ width: '95%', alignItems: 'center' }}>

                                        <View style={{ width: '95%', marginVertical: 5 }}>
                                            {NameError && <Text style={styles.errorMsg}>{NameError}</Text>}
                                            <Text
                                                style={{
                                                    fontFamily: Poppins.Medium,
                                                    fontSize: 14,
                                                    color: Color.black,
                                                    marginVertical: 5,
                                                }}>
                                                Full Name *
                                            </Text>
                                            <TextInput
                                                placeholder="Enter you Name"
                                                placeholderTextColor={Color.cloudyGrey}
                                                onChangeText={(text) => setUsername(text)}
                                                style={styles.demoNameTextInput}
                                                keyboardType='name-phone-pad'
                                                value={username}
                                            />
                                        </View>

                                        <View style={{ width: '95%', marginVertical: 5 }}>
                                            {NumError && <Text style={styles.errorMsg}>{NumError}</Text>}
                                            <Text
                                                style={{
                                                    fontFamily: Poppins.Medium,
                                                    fontSize: 14,
                                                    color: Color.black,
                                                    marginVertical: 5,
                                                }}>
                                                Phone Number *
                                            </Text>
                                            <View style={styles.phoneView}>
                                                <Text style={styles.PhoneCodeText}>+91</Text>
                                                <TextInput
                                                    placeholder="Enter your Phone number"
                                                    placeholderTextColor={Color.cloudyGrey}
                                                    maxLength={10}
                                                    autoFocus={number.length == 10 ? true : false}
                                                    onChangeText={number => {
                                                        chkNumber(number);
                                                        setTextInputNumber(number);
                                                    }}
                                                    keyboardType="phone-pad"
                                                    style={styles.phoneTextInput}
                                                />
                                            </View>
                                        </View>

                                        <View style={{ width: '95%', marginVertical: 5 }}>
                                            <Text
                                                style={{
                                                    fontFamily: Poppins.Medium,
                                                    fontSize: 14,
                                                    color: Color.black,
                                                    marginVertical: 5,
                                                }}>
                                                Email ID *
                                            </Text>
                                            <TextInput
                                                placeholder="Enter you Email"
                                                placeholderTextColor={Color.cloudyGrey}
                                                onChangeText={value => setTextInputEmail(value)}
                                                textContentType="emailAddress"
                                                keyboardType='email-address'
                                                style={styles.EmailTextInput}
                                            />
                                        </View>

                                        <View style={{ width: '95%', marginVertical: 5 }}>
                                            <Text
                                                style={{
                                                    fontFamily: Poppins.Medium,
                                                    fontSize: 14,
                                                    color: Color.black,
                                                    marginVertical: 5,
                                                }}>
                                                Message *
                                            </Text>
                                            <TextInput
                                                onChangeText={(text) => setMessage(text)}
                                                placeholder="Enter your comments"
                                                placeholderTextColor={Color.cloudyGrey}
                                                // value={msg}
                                                multiline={true}
                                                numberOfLines={5}
                                                keyboardType={
                                                    Platform.OS == 'ios' ? 'ascii-capable' : 'visible-password'
                                                }
                                                style={{
                                                    alignItems: 'center',
                                                    height: 120,
                                                    width: '100%', fontSize: 14,
                                                    backgroundColor: 'white',
                                                    borderRadius: 5, padding: 10, fontFamily: 'Poppins-Regular', paddingVertical: 5,
                                                    textAlignVertical: 'top', borderWidth: 1, borderColor: Color.cloudyGrey,
                                                    borderRadius: 5,
                                                }}
                                            />
                                        </View>

                                        <TouchableOpacity onPress={() => submitClick()} style={{ width: '95%', height: 45, backgroundColor: primarycolor, borderRadius: 5, marginVertical: 20, justifyContent: 'center', alignItems: 'center' }}>
                                            <Text style={{ fontSize: 14, color: 'white' }}>Submit</Text>
                                        </TouchableOpacity>

                                    </View>

                                    <View style={{ width: '95%', flexDirection: 'row', alignItems: 'center' }}>
                                        <Text style={{ paddingHorizontal: 10, fontSize: 18, color: 'black', fontFamily: 'Poppins-SemiBold' }}>Why Albion Bank Auctions?</Text>
                                    </View>

                                </View>
                            );
                        case 'Auction Advantage':
                            return (
                                <View style={{ width: scr_width, alignItems: 'center', paddingHorizontal: 10, paddingBottom: 20 }}>
                                    <View style={{ width: '95%', paddingVertical: 10, paddingHorizontal: 10 }}>
                                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                            <View style={{ width: 5, height: 5, backgroundColor: '#666', borderRadius: 50 }}></View>
                                            <Text style={{ fontSize: 14, color: '#333', textAlign: 'justify', marginHorizontal: 10, fontFamily: 'Poppins-Regular', }}>Get data of over 10000+ properties at single click. </Text>
                                        </View>
                                    </View>

                                    <View style={{ width: '95%', paddingVertical: 5, paddingHorizontal: 10 }}>
                                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                            <View style={{ width: 5, height: 5, backgroundColor: '#666', borderRadius: 50 }}></View>
                                            <Text style={{ fontSize: 14, color: '#333', textAlign: 'justify', marginHorizontal: 10, fontFamily: 'Poppins-Regular', }}>Get data of Past Auctions as well as future auctions. </Text>
                                        </View>
                                    </View>

                                    <View style={{ width: '95%', paddingVertical: 5, paddingHorizontal: 10 }}>
                                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                            <View style={{ width: 5, height: 5, backgroundColor: '#666', borderRadius: 50 }}></View>
                                            <Text style={{ fontSize: 14, color: '#333', textAlign: 'justify', marginHorizontal: 10, fontFamily: 'Poppins-Regular', }}>Our services are available 24x7. </Text>
                                        </View>
                                    </View>

                                    <View style={{ width: '95%', paddingVertical: 5, paddingHorizontal: 10 }}>
                                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                            <View style={{ width: 5, height: 5, backgroundColor: '#666', borderRadius: 50 }}></View>
                                            <Text style={{ fontSize: 14, color: '#333', textAlign: 'justify', marginHorizontal: 10, fontFamily: 'Poppins-Regular', }}>Get professionally sorted data at one platform.</Text>
                                        </View>
                                    </View>

                                    <View style={{ width: '95%', paddingVertical: 5, paddingHorizontal: 10 }}>
                                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                            <View style={{ width: 5, height: 5, backgroundColor: '#666', borderRadius: 50 }}></View>
                                            <Text style={{ fontSize: 14, color: '#333', textAlign: 'justify', marginHorizontal: 10, fontFamily: 'Poppins-Regular', }}>Great opportunity to buy cheaper residential & commercial properties.</Text>
                                        </View>
                                    </View>
                                </View>
                            );
                        case 'Auction Contact':
                            return (
                                <View style={{ width: scr_width, height: height, alignItems: 'center', backgroundColor: 'white' }}>
                                    <View style={{ width: '95%', alignItems: 'center' }}>
                                        <Text style={{ width: '95%', fontSize: 16, color: 'black', fontFamily: 'Poppins-SemiBold' }}>Contact Us</Text>

                                        <Text style={{ width: '95%', fontSize: 14, color: '#666', fontFamily: 'Poppins-Regular', paddingTop: 10 }}>For any other queries and feedback can reach us with below address </Text>

                                        <TouchableOpacity style={{ width: '95%', flexDirection: 'row', alignItems: 'center', marginTop: 20 }}>
                                            <View style={{ width: 40, height: 40, justifyContent: 'center', alignItems: 'center', borderRadius: 50, borderColor: primarycolor, borderWidth: 1 }}>
                                                <Iconviewcomponent
                                                    Icontag={'Feather'}
                                                    iconname={'phone-call'}
                                                    icon_size={22}
                                                    iconstyle={{ color: primarycolor }}
                                                />
                                            </View>
                                            <Text style={{ fontSize: 16, color: 'black', fontFamily: 'Poppins-SemiBold', paddingHorizontal: 10 }}>+91 9943300700</Text>
                                        </TouchableOpacity>

                                        <TouchableOpacity style={{ width: '95%', flexDirection: 'row', alignItems: 'center', marginVertical: 20 }}>
                                            <View style={{ width: 40, height: 40, justifyContent: 'center', alignItems: 'center', borderRadius: 50, borderColor: primarycolor, borderWidth: 1 }}>
                                                <Iconviewcomponent
                                                    Icontag={'Ionicons'}
                                                    iconname={'mail'}
                                                    icon_size={22}
                                                    iconstyle={{ color: primarycolor }}
                                                />
                                            </View>
                                            <Text style={{ width: '95%', fontSize: 16, color: 'black', fontFamily: 'Poppins-SemiBold', paddingHorizontal: 10 }}>support@albionbankauctions.com</Text>
                                        </TouchableOpacity>

                                        <TouchableOpacity style={{ width: '95%', flexDirection: 'row', alignItems: 'center', marginVertical: 10 }}>
                                            <View style={{ width: 40, height: 40, justifyContent: 'center', alignItems: 'center', borderRadius: 50, borderColor: primarycolor, borderWidth: 1 }}>
                                                <Iconviewcomponent
                                                    Icontag={'Fontisto'}
                                                    iconname={'map-marker-alt'}
                                                    icon_size={22}
                                                    iconstyle={{ color: primarycolor }}
                                                />
                                            </View>
                                            <View>
                                                <Text style={{ width: '95%', fontSize: 15, color: '#333', fontFamily: 'Poppins-SemiBold', paddingHorizontal: 10 }}>Albion Investments and Holdings Pvt Ltd,</Text>
                                                <Text style={{ width: '95%', fontSize: 14, color: '#666', fontFamily: 'Poppins-Regular', paddingHorizontal: 10, lineHeight: 20 }}>Level 5, Thamarai Tech Park,</Text>
                                                <Text style={{ width: '95%', fontSize: 14, color: '#666', fontFamily: 'Poppins-Regular', paddingHorizontal: 10, lineHeight: 20 }}>S.P Plot No:16-19 & 20-A,</Text>
                                                <Text style={{ width: '95%', fontSize: 14, color: '#666', fontFamily: 'Poppins-Regular', paddingHorizontal: 10, lineHeight: 20 }}>Thiru Vi Ka Industrial Estate,</Text>
                                                <Text style={{ width: '95%', fontSize: 14, color: '#666', fontFamily: 'Poppins-Regular', paddingHorizontal: 10, lineHeight: 20 }}>Inner Ring Road, Guindy,</Text>
                                                <Text style={{ width: '95%', fontSize: 14, color: '#666', fontFamily: 'Poppins-Regular', paddingHorizontal: 10, lineHeight: 20 }}>Chennai- 600032, Tamilnadu.</Text>
                                            </View>
                                        </TouchableOpacity>
                                    </View>

                                    <View style={{ width: '95%', flexDirection: 'row', alignItems: 'center', marginVertical: 20 }}>
                                        <View style={{ flex: 0, justifyContent: 'center', alignItems: 'center' }}>
                                            <Image
                                                source={{ uri: Media.albionlogo }}
                                                style={{ width: 50, height: 50, resizeMode: 'contain' }}
                                            />
                                        </View>
                                        <View style={{ flex: 2, justifyContent: 'center', alignItems: 'center', paddingHorizontal: 10 }}>
                                            <Text style={{ fontSize: 18, color: primarycolor, fontFamily: 'Poppins-SemiBold' }}>Albion Bank Auctions Pvt Ltd</Text>
                                            <Text style={{ width: '95%', textAlign: 'justify', fontSize: 14, color: '#666', fontFamily: 'Poppins-SemiBold', paddingVertical: 10 }} numberOfLines={2} >India’s No.1 Property Site is now a Superband</Text>
                                        </View>
                                    </View>

                                    <View style={{ width: '90%', justifyContent: 'center', alignItems: 'center' }}>
                                        <Text style={{ width: '100%', fontSize: 16, color: '#000', fontFamily: 'Poppins-SemiBold', textAlign: 'justify', lineHeight: 20 }}>Bank Auctions simplified </Text>
                                        <Text style={{ width: '100%', fontSize: 14, color: '#666', fontFamily: 'Poppins-Regular', textAlign: 'justify', lineHeight: 20, paddingVertical: 10 }}>Albion is a super convenient portal designed and developed to help private and public banks to auction their NPAs in the most effective and easiest approach. Participating in auction is no more burdensome.</Text>
                                    </View>

                                    <View style={{ width: '95%', alignItems: 'center', paddingHorizontal: 10, marginVertical: 20 }}>
                                        <View style={{ width: '95%', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                            <TouchableOpacity onPress={() => navigation.replace("AuctionAboutUs")} style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center' }}>
                                                <View style={{ width: 5, height: 5, backgroundColor: '#666', borderRadius: 50 }}></View>
                                                <Text style={{ fontSize: 16, color: '#333', fontFamily: 'Poppins-Regular', paddingHorizontal: 5, textDecorationLine: 'underline' }}>About Us</Text>
                                            </TouchableOpacity>
                                            <TouchableOpacity onPress={() => navigation.replace("AuctionPrivacyPolicy")} style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center' }}>
                                                <View style={{ width: 5, height: 5, backgroundColor: '#666', borderRadius: 50 }}></View>
                                                <Text style={{ fontSize: 16, color: '#333', fontFamily: 'Poppins-Regular', paddingHorizontal: 5, textDecorationLine: 'underline' }}>Privacy Policy</Text>
                                            </TouchableOpacity>
                                        </View>
                                        <View style={{ width: '95%', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginVertical: 30 }}>
                                            <TouchableOpacity onPress={() => navigation.replace("AuctionTermsConditions")} style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center' }}>
                                                <View style={{ width: 5, height: 5, backgroundColor: '#666', borderRadius: 50 }}></View>
                                                <Text style={{ fontSize: 16, color: '#333', fontFamily: 'Poppins-Regular', paddingHorizontal: 5, textDecorationLine: 'underline' }}>Terms & Conditions</Text>
                                            </TouchableOpacity>
                                            <TouchableOpacity onPress={() => Linking.openURL('https://albionbankauctions.com/')} style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center' }}>
                                                <View style={{ width: 5, height: 5, backgroundColor: '#666', borderRadius: 50 }}></View>
                                                <Text style={{ fontSize: 16, color: '#333', fontFamily: 'Poppins-Regular', paddingHorizontal: 5, textDecorationLine: 'underline' }}>Website</Text>
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                </View>
                            );
                    }
                }}
            />



            <Modal visible={HomeLoanVisible} transparent animationType="slide">
                <View
                    style={{
                        flex: 1,
                        backgroundColor: Color.transparantBlack,
                        justifyContent: 'center',
                        padding: 15,
                    }}>
                    <View
                        style={{
                            backgroundColor: 'white',
                            padding: 20,
                            borderRadius: 10,
                        }}>
                        <Text
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
                            }}>Great! Now sit back and relax!</Text>

                        <View
                            style={{ alignItems: 'center', justifyContent: 'center' }}>
                            <Image
                                source={{ uri: "https://albion-backend.s3.ap-south-1.amazonaws.com/Mobile+Apk+Banners/assets/assets/Auction/legalService.jpg" }}
                                style={{ width: '100%', height: 200, resizeMode: 'contain' }}
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
                            Albion Auctions team will call you shortly
                        </Text>
                        <TouchableOpacity onPress={() => { navigation.replace('TabNavigator'), setHomeLoanVisible(false) }}
                            style={{ width: '95%', height: 45, justifyContent: 'center', alignItems: 'center', backgroundColor: primarycolor, borderRadius: 40, }}>
                            <Text style={{ fontSize: 14, color: 'white' }}>GoTo Home Page</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>

        </View>
    )
};



const styles = StyleSheet.create({
    container: {
        // width: scr_width,
        // height: scr_height,
        flex: 1,
        alignItems: 'center',
        backgroundColor: 'white'
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
        fontSize: 13, marginHorizontal: 10,
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
    phoneView: {
        borderColor: Color.cloudyGrey,
        borderWidth: 1,
        height: 40,
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 5,
    },
    PhoneCodeText: {
        color: Color.cloudyGrey,
        marginHorizontal: 10,
    },
    phoneTextInput: {
        height: 40,
        padding: 10,
        borderLeftColor: Color.cloudyGrey,
        color: Color.black,
        borderLeftWidth: 1,
        marginVertical: 10,
    },
    EmailTextInput: {
        height: 40,
        borderColor: Color.cloudyGrey,
        borderWidth: 1,
        borderRadius: 5,
        color: Color.black,
        padding: 10,
    },
});


//make this component available to the app
export default AuctionContactUs;
