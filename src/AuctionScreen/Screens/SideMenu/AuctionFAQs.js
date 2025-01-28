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
import { Poppins } from '../../../Global/FontFamily';

const freeRentalData = [
    {
        'id': '0',
        'rent_img': Media.fill,
        'rent_title': 'Fill details online',
        'rent_subText': 'Fill in your details in a fully customized legal template'
    },
];

LogBox.ignoreAllLogs();

const AuctionFAQs = () => {

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

    function renderHeaderItem() {
        try {
            return (
                <View style={{ width: '100%', alignItems: 'center' }}>
                    <View style={{ width: scr_width }}>
                        <Image
                            source={{ uri: Media.faqsBanner }}
                            style={{
                                width: scr_width,
                                height: 220, resizeMode: 'cover'
                            }}
                        />
                    </View>

                    <View style={{ width: '97%', alignItems: 'center', paddingHorizontal: 10 }}>
                        <View style={{ width: '100%', paddingTop: 10 }}>
                            <Text style={{ fontSize: 20, color: primarycolor, fontFamily: 'Poppins-Bold' }}>Bank Auctions - FAQs</Text>
                            <Text style={{ textAlign: 'justify', fontSize: 14, color: '#333', fontFamily: Poppins.Medium, lineHeight: 25, paddingVertical: 10, letterSpacing: 0.5 }}>Albion is the most trusted portal in India for auction of bank foreclosed properties including movable and immovable properties. Almost all the leading public sector as well as private banks have used our portal for auctioning their NPAs. For buyers, our portal provides opportunity to own a property at a price substantially lower than market price.</Text>
                        </View>

                        <View style={{ width: '100%', paddingTop: 10 }}>
                            <Text style={{ fontSize: 18, color: 'black', fontFamily: 'Poppins-SemiBold' }}>Why Albion Bank Auctions?</Text>
                            <View style={{ width: '95%', flexDirection: 'row', alignItems: 'center', paddingTop: 10 }}>
                                <Text style={{ fontSize: 14, color: '#000' }}>1. </Text>
                                <Text style={{ fontSize: 14, color: '#000', textAlign: 'justify', fontFamily: 'Poppins-SemiBold', }}>What is e-Auction? When should Forward and Reverse Auction be used?</Text>
                            </View>
                            <Text style={{ fontSize: 13, color: '#666', textAlign: 'justify', paddingTop: 10, fontFamily: 'Poppins-Regular', lineHeight: 22, letterSpacing: 0.5 }}>e-Auctions are negotiations conducted via an online platform where Suppliers get the possibility of improving their proposals based on market feedback (e.g. rank in negotiation) and are considered to be the most transparent way of conducting negotiations. Basically, there are two types of Auctions.</Text>

                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <View style={{ width: 5, height: 5, backgroundColor: '#666', borderRadius: 50 }}></View>
                                <Text style={{ fontSize: 14, color: '#333', textAlign: 'justify', marginHorizontal: 5, fontFamily: 'Poppins-Regular', }}>Forward Auction</Text>
                            </View>
                            <Text style={{ fontSize: 13, color: '#666', textAlign: 'justify', paddingVertical: 5, fontFamily: 'Poppins-Regular', lineHeight: 22 }}>Forward Auctions are sales oriented auctions, where Auctioneers are trying to sell their products or services. In a forward auction, the buyer bids on the seller's item and the prices of the item increases by a fixed increment amount during the auction and in a forward Auction the highest bid price during the Auction is the one which wins.</Text>
                            <Text style={{ fontSize: 13, color: '#666', textAlign: 'justify', fontFamily: 'Poppins-Regular', lineHeight: 22 }}>For example, when a Bank or a Debt Recovery Tribunal (DRT) hold an auction to sell a property or an asset - it will use Forward Auction mechanism.</Text>

                            <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10 }}>
                                <View style={{ width: 5, height: 5, backgroundColor: '#666', borderRadius: 50 }}></View>
                                <Text style={{ fontSize: 14, color: '#333', textAlign: 'justify', marginHorizontal: 5, fontFamily: 'Poppins-Regular', }}>Reverse Auction</Text>
                            </View>
                            <Text style={{ fontSize: 13, color: '#666', textAlign: 'justify', paddingVertical: 5, fontFamily: 'Poppins-Regular', lineHeight: 22 }}>Reverse Auctions are Purchase oriented auctions, where Auctioneers are trying to purchase products or services. In a reverse auction, the seller bids on the Buyer's item and the prices of the item decreases by a fixed decrement amount during the auction. In a Reverse Auction the lowest bid price during the Auction is the one which wins.</Text>
                            <Text style={{ fontSize: 13, color: '#666', textAlign: 'justify', paddingVertical: 5, fontFamily: 'Poppins-Regular', lineHeight: 22 }}>For example, if a bank (or any organization) wants to buy computer systems or even transportation services, it can hold a reverse auction to procure goods and services at the best possible price.</Text>
                        </View>

                        <View style={{ width: '100%', }}>
                            <View style={{ width: '95%', flexDirection: 'row', alignItems: 'center' }}>
                                <Text style={{ fontSize: 14, color: '#000' }}>2. </Text>
                                <Text style={{ fontSize: 14, color: '#000', textAlign: 'justify', fontFamily: 'Poppins-SemiBold', }}>Who is a Bidder?</Text>
                            </View>
                            <Text style={{ fontSize: 13, color: '#666', textAlign: 'justify', paddingVertical: 10, fontFamily: 'Poppins-Regular', lineHeight: 22 }}>Anyone be an executive of a company or an individual wishing to bid or participate in an online Auction event is a Bidder. On Bank or DRT Auctions, a Bidder will be bidding in the Auctions he has been qualified for. By responding in an Auction, the Bidder commits to buy or sell items at prices submitted by him during Auction.</Text>
                        </View>

                        <View style={{ width: '100%', }}>
                            <View style={{ width: '95%', flexDirection: 'row', alignItems: 'center' }}>
                                <Text style={{ fontSize: 14, color: '#000' }}>3. </Text>
                                <Text style={{ fontSize: 14, color: '#000', textAlign: 'justify', fontFamily: 'Poppins-SemiBold', }}>Are the Auction Events Private or public? How confidential is the Auction data?</Text>
                            </View>
                            <Text style={{ fontSize: 13, color: '#666', textAlign: 'justify', paddingVertical: 5, fontFamily: 'Poppins-Regular', lineHeight: 22 }}>Each Auction is a highly confidential event conducted between the Auctioneer and a set of qualified Bidders on the Bank or DRT Auctions platform. No outsider can view any aspect of an Auction event without proper authentication by Auctioneer. And even then, a qualified Bidder can only view details of his own bids.</Text>
                            <Text style={{ fontSize: 13, color: '#666', textAlign: 'justify', paddingVertical: 5, fontFamily: 'Poppins-Regular', lineHeight: 22 }}>Therefore all data like Items' specifications, pricing, Bidders' information and bid data are all confidential and available to respective Auctioneers only.</Text>
                        </View>

                        <View style={{ width: '100%', paddingVertical: 10 }}>
                            <View style={{ width: '95%', flexDirection: 'row', alignItems: 'center' }}>
                                <Text style={{ fontSize: 14, color: '#000' }}>4. </Text>
                                <Text style={{ fontSize: 14, color: '#000', textAlign: 'justify', fontFamily: 'Poppins-SemiBold', }}>Can an individual who is not a registered company or an organization, register as a Bidder?</Text>
                            </View>
                            <Text style={{ fontSize: 13, color: '#666', textAlign: 'justify', paddingVertical: 10, fontFamily: 'Poppins-Regular', lineHeight: 22 }}>Yes, an Individual can register as a Bidder on Bank or DRT Auctions platform. While registering, please write "Individual" in the Organization Name Field.</Text>
                        </View>

                        <View style={{ width: '100%', paddingVertical: 10 }}>
                            <View style={{ width: '95%', flexDirection: 'row', alignItems: 'center' }}>
                                <Text style={{ fontSize: 14, color: '#000' }}>5. </Text>
                                <Text style={{ fontSize: 14, color: '#000', textAlign: 'justify', fontFamily: 'Poppins-SemiBold', }}>Forgotten user name and / or password: How to retrieve the same?</Text>
                            </View>
                            <Text style={{ fontSize: 13, color: '#666', textAlign: 'justify', paddingVertical: 10, fontFamily: 'Poppins-Regular', lineHeight: 22 }}>Click on "Forgot Password" link provided on Login page. You will be required to provide your registered email id and OTP will be sent to Bidder registered Mobile number. After Entering the OTP Bidder can generate their new Password.</Text>
                        </View>

                        <View style={{ width: '100%', paddingVertical: 10 }}>
                            <View style={{ width: '95%', flexDirection: 'row', alignItems: 'center' }}>
                                <Text style={{ fontSize: 14, color: '#000' }}>6. </Text>
                                <Text style={{ fontSize: 14, color: '#000', textAlign: 'justify', fontFamily: 'Poppins-SemiBold', }}>Which Internet Browser should be used? Which is the most suitable Internet Browser for Bank or DRT Auctions?</Text>
                            </View>
                            <Text style={{ fontSize: 13, color: '#666', textAlign: 'justify', paddingVertical: 10, fontFamily: 'Poppins-Regular', lineHeight: 22 }}>Auction portal works well with all major browsers available. For Better compatibility Bidder can use "Google Chrome" browser.</Text>
                        </View>

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
                    <View style={{ width: '100%', paddingVertical: 10 }}>
                        <Text style={{ fontSize: 18, color: 'black', fontFamily: 'Poppins-SemiBold' }}>Why Albion Bank Auctions?</Text>
                        <View style={{ width: '100%', flexDirection: 'row', alignItems: 'center' }}>
                            <Text style={{ fontSize: 14, color: '#000' }}>1. </Text>
                            <Text style={{ fontSize: 14, color: '#000', textAlign: 'justify', marginHorizontal: 5, fontFamily: 'Poppins-SemiBold', }}>What is e-Auction? When should Forward and Reverse Auction be used?</Text>
                        </View>
                        <Text style={{ width: '100%', fontSize: 13, color: '#666', textAlign: 'justify', paddingVertical: 10, fontFamily: 'Poppins-Regular', lineHeight: 22, letterSpacing: 0.5 }}>e-Auctions are negotiations conducted via an online platform where Suppliers get the possibility of improving their proposals based on market feedback (e.g. rank in negotiation) and are considered to be the most transparent way of conducting negotiations. Basically, there are two types of Auctions.</Text>

                        <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10 }}>
                            <View style={{ width: 5, height: 5, backgroundColor: '#666', borderRadius: 50 }}></View>
                            <Text style={{ fontSize: 14, color: '#333', textAlign: 'justify', marginHorizontal: 5, fontFamily: 'Poppins-Regular', }}>Forward Auction</Text>
                        </View>
                        <Text style={{ width: '100%', fontSize: 13, color: '#666', textAlign: 'justify', paddingVertical: 5, fontFamily: 'Poppins-Regular', lineHeight: 20 }}>Forward Auctions are sales oriented auctions, where Auctioneers are trying to sell their products or services. In a forward auction, the buyer bids on the seller's item and the prices of the item increases by a fixed increment amount during the auction and in a forward Auction the highest bid price during the Auction is the one which wins.</Text>
                        <Text style={{ width: '100%', fontSize: 13, color: '#666', textAlign: 'justify', fontFamily: 'Poppins-Regular', lineHeight: 20 }}>For example, when a Bank or a Debt Recovery Tribunal (DRT) hold an auction to sell a property or an asset - it will use Forward Auction mechanism.</Text>

                        <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10 }}>
                            <View style={{ width: 5, height: 5, backgroundColor: '#666', borderRadius: 50 }}></View>
                            <Text style={{ fontSize: 14, color: '#333', textAlign: 'justify', marginHorizontal: 5, fontFamily: 'Poppins-Regular', }}>Reverse Auction</Text>
                        </View>
                        <Text style={{ width: '100%', fontSize: 13, color: '#666', textAlign: 'justify', paddingVertical: 5, fontFamily: 'Poppins-Regular', lineHeight: 20 }}>Reverse Auctions are Purchase oriented auctions, where Auctioneers are trying to purchase products or services. In a reverse auction, the seller bids on the Buyer's item and the prices of the item decreases by a fixed decrement amount during the auction. In a Reverse Auction the lowest bid price during the Auction is the one which wins.</Text>
                        <Text style={{ width: '100%', fontSize: 13, color: '#666', textAlign: 'justify', paddingVertical: 5, fontFamily: 'Poppins-Regular', lineHeight: 20 }}>For example, if a bank (or any organization) wants to buy computer systems or even transportation services, it can hold a reverse auction to procure goods and services at the best possible price.</Text>
                    </View>

                    <View style={{ width: '100%', }}>
                        <View style={{ width: '100%', flexDirection: 'row', alignItems: 'center' }}>
                            <Text style={{ fontSize: 14, color: '#000' }}>2. </Text>
                            <Text style={{ fontSize: 14, color: '#000', textAlign: 'justify', marginHorizontal: 5, fontFamily: 'Poppins-SemiBold', }}>Who is a Bidder?</Text>
                        </View>
                        <Text style={{ width: '100%', fontSize: 13, color: '#666', textAlign: 'justify', paddingVertical: 10, fontFamily: 'Poppins-Regular', lineHeight: 20 }}>Anyone be an executive of a company or an individual wishing to bid or participate in an online Auction event is a Bidder. On Bank or DRT Auctions, a Bidder will be bidding in the Auctions he has been qualified for. By responding in an Auction, the Bidder commits to buy or sell items at prices submitted by him during Auction.</Text>
                    </View>

                    <View style={{ width: '100%', }}>
                        <View style={{ width: '100%', flexDirection: 'row', alignItems: 'center' }}>
                            <Text style={{ fontSize: 14, color: '#000' }}>3. </Text>
                            <Text style={{ fontSize: 14, color: '#000', textAlign: 'justify', marginHorizontal: 5, fontFamily: 'Poppins-SemiBold', }}>Are the Auction Events Private or public? How confidential is the Auction data?</Text>
                        </View>
                        <Text style={{ width: '100%', fontSize: 13, color: '#666', textAlign: 'justify', paddingVertical: 5, fontFamily: 'Poppins-Regular', lineHeight: 20 }}>Each Auction is a highly confidential event conducted between the Auctioneer and a set of qualified Bidders on the Bank or DRT Auctions platform. No outsider can view any aspect of an Auction event without proper authentication by Auctioneer. And even then, a qualified Bidder can only view details of his own bids.</Text>
                        <Text style={{ width: '100%', fontSize: 13, color: '#666', textAlign: 'justify', paddingVertical: 5, fontFamily: 'Poppins-Regular', lineHeight: 20 }}>Therefore all data like Items' specifications, pricing, Bidders' information and bid data are all confidential and available to respective Auctioneers only.</Text>
                    </View>

                    <View style={{ width: '100%', paddingVertical: 10 }}>
                        <View style={{ width: '100%', flexDirection: 'row', alignItems: 'center' }}>
                            <Text style={{ fontSize: 14, color: '#000' }}>4. </Text>
                            <Text style={{ fontSize: 14, color: '#000', textAlign: 'justify', marginHorizontal: 5, fontFamily: 'Poppins-SemiBold', }}>Can an individual who is not a registered company or an organization, register as a Bidder?</Text>
                        </View>
                        <Text style={{ width: '100%', fontSize: 13, color: '#666', textAlign: 'justify', paddingVertical: 10, fontFamily: 'Poppins-Regular', lineHeight: 20 }}>Yes, an Individual can register as a Bidder on Bank or DRT Auctions platform. While registering, please write "Individual" in the Organization Name Field.</Text>
                    </View>

                    <View style={{ width: '100%', paddingVertical: 10 }}>
                        <View style={{ width: '100%', flexDirection: 'row', alignItems: 'center' }}>
                            <Text style={{ fontSize: 14, color: '#000' }}>5. </Text>
                            <Text style={{ fontSize: 14, color: '#000', textAlign: 'justify', marginHorizontal: 5, fontFamily: 'Poppins-SemiBold', }}>Forgotten user name and / or password: How to retrieve the same?</Text>
                        </View>
                        <Text style={{ width: '100%', fontSize: 13, color: '#666', textAlign: 'justify', paddingVertical: 10, fontFamily: 'Poppins-Regular', lineHeight: 20 }}>Click on "Forgot Password" link provided on Login page. You will be required to provide your registered email id and OTP will be sent to Bidder registered Mobile number. After Entering the OTP Bidder can generate their new Password.</Text>
                    </View>

                    <View style={{ width: '100%', paddingVertical: 10 }}>
                        <View style={{ width: '100%', flexDirection: 'row', alignItems: 'center' }}>
                            <Text style={{ fontSize: 14, color: '#000' }}>6. </Text>
                            <Text style={{ fontSize: 14, color: '#000', textAlign: 'justify', marginHorizontal: 5, fontFamily: 'Poppins-SemiBold', }}>Which Internet Browser should be used? Which is the most suitable Internet Browser for Bank or DRT Auctions?</Text>
                        </View>
                        <Text style={{ width: '100%', fontSize: 13, color: '#666', textAlign: 'justify', paddingVertical: 10, fontFamily: 'Poppins-Regular', lineHeight: 20 }}>Auction portal works well with all major browsers available. For Better compatibility Bidder can use "Google Chrome" browser.</Text>
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
                <View style={{ width: '97%', height: height, alignItems: 'center', backgroundColor: 'white' }}>
                    <View style={{ width: '97%', marginVertical: 0, alignItems: 'center' }}>
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

                    <View style={{ width: '95%', justifyContent: 'center', alignItems: 'center', marginVertical: 15 }}>
                        <Text style={{ width: '95%', fontSize: 16, color: '#000', fontFamily: 'Poppins-SemiBold', textAlign: 'justify', lineHeight: 22 }}>Bank Auctions simplified </Text>
                        <Text style={{ width: '95%', fontSize: 14, color: '#666', fontFamily: 'Poppins-Regular', textAlign: 'justify', lineHeight: 22, paddingVertical: 10 }}>Albion is a super convenient portal designed and developed to help private and public banks to auction their NPAs in the most effective and easiest approach. Participating in auction is no more burdensome.</Text>
                    </View>

                    <View style={{ width: '95%', alignItems: 'center', paddingHorizontal: 10, marginVertical: 10 }}>
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

    return (
        <View style={styles.container}>
            <StatusBar
                hidden={false}
                backgroundColor={primarycolor}
                translucent={false}
                barStyle='dark-content'
                networkActivityIndicatorVisible={true} />

            {netInfo_State ? null :
                <Animated.View animation="fadeInRight" style={{ position: 'absolute', zIndex: 9999, width: '100%', alignItems: 'center', backgroundColor: '#626262', opacity: 0.5, padding: 20 }}>
                    <Text style={{ color: 'white' }}>No Internet Connection</Text>
                </Animated.View>
            }

            <View style={{ width: scr_width, height: height, justifyContent: 'center', alignItems: 'center', backgroundColor: 'white' }}>
                <FlatList
                    data={freeRentalData}
                    keyExtractor={(item, index) => item + index}
                    ListHeaderComponent={() => renderHeaderItem()}
                    // renderItem={({ item, index }) => renderFreeRentalItem(item, index)}
                    ListFooterComponent={() => renderfooterItem()}
                    style={{ width: '100%' }}
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
});

//make this component available to the app
export default AuctionFAQs;
