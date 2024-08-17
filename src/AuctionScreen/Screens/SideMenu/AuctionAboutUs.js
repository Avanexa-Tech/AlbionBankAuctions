import React, { useState, useRef, useEffect, useLayoutEffect } from 'react';
import {
    StyleSheet, Text, Animated, View, FlatList, TextInput, Keyboard, ScrollView, Image, StatusBar,
    TouchableOpacity, Alert, Platform, UIManager, LayoutAnimation, LogBox, Linking
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

const freeRentalData = [
    {
        'id': '0',
        'rent_img': Media.fill,
        'rent_title': 'Fill details online',
        'rent_subText': 'Fill in your details in a fully customized legal template'
    },
];

LogBox.ignoreAllLogs();

const AuctionAboutUs = () => {

    const dispatch = useDispatch();
    const navigation = useNavigation();
    const [netInfo_State, setNetinfo] = useState(true);
    const [height, setHeight] = useState(undefined);

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
                        <Text style={{ fontSize: 14, color: '#333', fontFamily: 'Poppins-Regular', lineHeight: 25, paddingVertical: 10 }}>Albion portal is designed to make eAuction easy and convenient for buyers, bidders and bank users alike.</Text>
                        <Text style={{ fontSize: 14, color: '#333', fontFamily: 'Poppins-Regular', lineHeight: 25 }}>We have been in the market for several years and built up trust over the years by setting up a hassle-free eAuction process which is legally safe and user-friendly.</Text>


                        <View style={{ marginVertical: 10 }}>
                            <Text style={{ width: '100%', fontSize: 16, color: '#000', fontFamily: 'Poppins-SemiBold', textAlign: 'justify', lineHeight: 20 }}>Our Services: Beyond Bank Auctions</Text>
                            <Text style={{ width: '100%', fontSize: 14, color: '#666', fontFamily: 'Poppins-Regular', textAlign: 'justify', lineHeight: 20, paddingVertical: 10 }}>Albion Investments and Holdings Pvt Ltd - Auctions provides information to the clients related to all types of properties auctioned (to be auctioned) by all Banks/NBFCs at one place and at single click. we are performing as Resolution /Recovery/Sales/Security Agents on behalf of various banks and financial institutions under the Securitization and Reconstruction of Financial Assets and Enforcement of Security Interest under (SARFAESI) Act 2002 for recovery/solution of bad debts through Resolution /Enforcement/Recovery Agency with the support of our dedicated team of consisting of ex-bankers and chartered accountants etc.</Text>
                            <Text style={{ width: '100%', fontSize: 14, color: '#666', fontFamily: 'Poppins-Regular', textAlign: 'justify', lineHeight: 20, paddingVertical: 10 }}>We are already empanelled with various public sector banks and are successfully handling their NPA cases assigned to us. Our team of highly skilled and experienced professionals has established a veritable track record of success in resolution of Banks NPA case through OTS or SALE of such assets, with our excellent credentials, strong relationship with banks and work knowledge of various verticals.</Text>
                        </View>

                        <View style={{ marginVertical: 10 }}>
                            <Text style={{ width: '100%', fontSize: 16, color: '#000', fontFamily: 'Poppins-SemiBold', textAlign: 'justify', lineHeight: 20 }}>Our Vision </Text>
                            <Text style={{ width: '100%', fontSize: 14, color: '#666', fontFamily: 'Poppins-Regular', textAlign: 'justify', lineHeight: 20, paddingVertical: 10 }}>In our portal www.albionbankauctions.com, we have tried our best to provide all details of NPA properties that are put to E-auction under (SARFAESI) Act 2002 to assist the prospective buyers in all ways. We assist the Banks in all process of taking over the Physical Possession of such properties and also materializes sale of these successfully through auction /private treaty etc.</Text>
                        </View>

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
                <View style={{ width: '95%', height: height, alignItems: 'center', backgroundColor: 'white' }}>
                    <View style={{ width: '95%', justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={{ width: '100%', fontSize: 16, color: '#000', fontFamily: 'Poppins-SemiBold', textAlign: 'justify', lineHeight: 20 }}>Bank Auctions simplified </Text>
                        <Text style={{ width: '100%', fontSize: 14, color: '#666', fontFamily: 'Poppins-Regular', textAlign: 'justify', lineHeight: 20, paddingVertical: 10 }}>Albion is a super convenient portal designed and developed to help private and public banks to auction their NPAs in the most effective and easiest approach. Participating in auction is no more burdensome.</Text>
                    </View>

                    <View style={{ width: '100%', marginVertical: 10, alignItems: 'center' }}>
                        <Text style={{ width: '95%', fontSize: 16, color: 'black', fontFamily: 'Poppins-SemiBold' }}>Contact Us</Text>

                        <Text style={{ width: '95%', fontSize: 14, color: '#666', fontFamily: 'Poppins-Regular', paddingTop: 10 }}>For any other queries and feedback can reach us with below address </Text>

                        <TouchableOpacity style={{ width: '95%', flexDirection: 'row', alignItems: 'center', marginTop: 30 }}>
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
        } catch (error) {
            console.log('catch in renderfooter_Item : ', error);
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


    return (
        <View style={styles.container}>
            <StatusBar
                hidden={false}
                backgroundColor={primarycolor}
                translucent={false}
                barStyle='dark-content'
                networkActivityIndicatorVisible={true} />

            {/* {netInfo_State ? null :
                <Animated.View animation="fadeInRight" style={{ position: 'absolute', zIndex: 9999, width: '100%', alignItems: 'center', backgroundColor: '#626262', opacity: 0.5, padding: 10, marginTop: Platform.OS == "ios" ? 80 : 45 }}>
                    <Text style={{ color: 'white' }}>No Internet Connection</Text>
                </Animated.View>
            } */}


            <View style={{ justifyContent: 'center', alignItems: 'center', backgroundColor: 'white' }}>
                <FlatList
                    data={freeRentalData}
                    keyExtractor={(item, index) => item + index}
                    ListHeaderComponent={() => renderHeaderItem()}
                    renderItem={({ item, index }) => renderFreeRentalItem(item, index)}
                    ListFooterComponent={() => renderfooterItem()}
                    style={{ width: '95%' }}
                    showsVerticalScrollIndicator={false}
                />
            </View>

        </View>
    )
};



const styles = StyleSheet.create({
    container: {
        // width: scr_width,
        // height: scr_height,
        flex: 1,
        // alignItems: 'center',
        backgroundColor: 'white'
    },
});

//make this component available to the app
export default AuctionAboutUs;
