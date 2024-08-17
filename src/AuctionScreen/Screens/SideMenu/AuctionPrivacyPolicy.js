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

const AuctionPrivacyPolicy = () => {

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
                            source={{ uri: Media.about_banner }}
                            style={{
                                width: scr_width,
                                height: 220, resizeMode: 'contain'
                            }}
                        />
                    </View>

                    <View style={{ width: '100%', padding: 10 }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10 }}>
                            <Text style={{ fontSize: 20, color: primarycolor, fontFamily: 'Poppins-Bold' }}>Bank Auctions - Privacy Policy</Text>
                        </View>
                        <Text style={{ fontSize: 14, color: '#333', fontFamily: 'Poppins-Regular', lineHeight: 25, paddingVertical: 10, textAlign: 'justify' }}>These terms and conditions outline the rules and regulations for the use of Company Name's Website, located at Website.com</Text>
                        <Text style={{ fontSize: 14, color: '#333', fontFamily: 'Poppins-Regular', lineHeight: 25, paddingVertical: 10, textAlign: 'justify' }}>By accessing this website we assume you accept these terms and conditions. Do not continue to use Website Name if you do not agree to take all of the terms and conditions stated on this page.</Text>
                        <Text style={{ fontSize: 14, color: '#333', fontFamily: 'Poppins-Regular', lineHeight: 25, textAlign: 'justify' }}>The following terminology applies to these Terms and Conditions, Privacy Statement and Disclaimer Notice and all Agreements: “Client”, “You” and “Your” refers to you, the person log on this website and compliant to the Company's terms and conditions. “The Company”, “Ourselves”, “We”, “Our” and “Us”, refers to our Company. “Party”, “Parties”, or “Us”, refers to both the Client and ourselves. All terms refer to the offer, acceptance and consideration of payment necessary to undertake the process of our assistance to the Client in the most appropriate manner for the express purpose of meeting the Client's needs in respect of provision of the Company's stated services, in accordance with and subject to, prevailing law of Netherlands. Any use of the above terminology or other words in the singular, plural, capitalization and/or he/she or they, are taken as interchangeable and therefore as referring to same.</Text>
                    </View>

                    <View style={{ width: '100%', padding: 10 }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Text style={{ fontSize: 18, color: 'black', fontFamily: 'Poppins-SemiBold' }}>Cookies</Text>
                        </View>
                        <Text style={{ fontSize: 14, color: '#333', fontFamily: 'Poppins-Regular', lineHeight: 25, paddingVertical: 10, textAlign: 'justify' }}>We employ the use of cookies. By accessing Website Name, you agreed to use cookies in agreement with the Company Name's Privacy Policy.</Text>
                        <Text style={{ fontSize: 14, color: '#333', fontFamily: 'Poppins-Regular', lineHeight: 25, paddingVertical: 10, textAlign: 'justify' }}>Most interactive websites use cookies to let us retrieve the user's details for each visit. Cookies are used by our website to enable the functionality of certain areas to make it easier for people visiting our website. Some of our affiliate/advertising partners may also use cookies.</Text>
                    </View>

                    <View style={{ width: '100%', padding: 10 }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Text style={{ fontSize: 18, color: 'black', fontFamily: 'Poppins-SemiBold' }}>License</Text>
                        </View>
                        <Text style={{ fontSize: 14, color: '#333', fontFamily: 'Poppins-Regular', lineHeight: 25, paddingVertical: 10, textAlign: 'justify' }}>Unless otherwise stated, Company Name and/or its licensors own the intellectual property rights for all material on Website Name. All intellectual property rights are reserved. You may access this from Website Name for your own personal use subjected to restrictions set in these terms and conditions.</Text>
                        <Text style={{ fontSize: 14, color: '#333', fontFamily: 'Poppins-SemiBold', lineHeight: 25, paddingVertical: 10, textAlign: 'justify' }}>You must not:</Text>

                        <View style={{ width: '95%', paddingVertical: 5, paddingHorizontal: 10 }}>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <View style={{ width: 5, height: 5, backgroundColor: '#666', borderRadius: 50 }}></View>
                                <Text style={{ fontSize: 14, color: '#333', textAlign: 'justify', marginHorizontal: 10, fontFamily: 'Poppins-Regular', }}>Republish material from Website Name </Text>
                            </View>
                        </View>

                        <View style={{ width: '95%', paddingVertical: 5, paddingHorizontal: 10 }}>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <View style={{ width: 5, height: 5, backgroundColor: '#666', borderRadius: 50 }}></View>
                                <Text style={{ fontSize: 14, color: '#333', textAlign: 'justify', marginHorizontal: 10, fontFamily: 'Poppins-Regular', }}>Sell, rent or sub-license material from Website Name</Text>
                            </View>
                        </View>
                        <View style={{ width: '95%', paddingVertical: 5, paddingHorizontal: 10 }}>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <View style={{ width: 5, height: 5, backgroundColor: '#666', borderRadius: 50 }}></View>
                                <Text style={{ fontSize: 14, color: '#333', textAlign: 'justify', marginHorizontal: 10, fontFamily: 'Poppins-Regular', }}>Reproduce, duplicate or copy material from Website Name</Text>
                            </View>
                        </View>
                        <View style={{ width: '95%', paddingVertical: 5, paddingHorizontal: 10 }}>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <View style={{ width: 5, height: 5, backgroundColor: '#666', borderRadius: 50 }}></View>
                                <Text style={{ fontSize: 14, color: '#333', textAlign: 'justify', marginHorizontal: 10, fontFamily: 'Poppins-Regular', }}>Redistribute content from Website Name</Text>
                            </View>
                        </View>
                        <View style={{ width: '95%', paddingVertical: 5, paddingHorizontal: 10 }}>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <View style={{ width: 5, height: 5, backgroundColor: '#666', borderRadius: 50 }}></View>
                                <Text style={{ fontSize: 14, color: '#333', textAlign: 'justify', marginHorizontal: 10, fontFamily: 'Poppins-Regular', }}>This Agreement shall begin on the date hereof.</Text>
                            </View>
                        </View>


                        <Text style={{ fontSize: 14, color: '#333', fontFamily: 'Poppins-Regular', lineHeight: 25, paddingVertical: 10, textAlign: 'justify' }}>Parts of this website offer an opportunity for users to post and exchange opinions and information in certain areas of the website. Company Name does not filter, edit, publish or review Comments prior to their presence on the website. Comments do not reflect the views and opinions of Company Name,its agents and/or affiliates. Comments reflect the views and opinions of the person who post their views and opinions. To the extent permitted by applicable laws, Company Name shall not be liable for the Comments or for any liability, damages or expenses caused and/or suffered as a result of any use of and/or posting of and/or appearance of the Comments on this website.</Text>
                        <Text style={{ fontSize: 14, color: '#333', fontFamily: 'Poppins-Regular', lineHeight: 25, paddingVertical: 10, textAlign: 'justify' }}>Company Name reserves the right to monitor all Comments and to remove any Comments which can be considered inappropriate, offensive or causes breach of these Terms and Conditions.</Text>


                    </View>


                </View>
            );
        } catch (error) {
            console.log("catch in renderHeader_Item's Home_Free_Rent : ", error);
        }
    }

    function renderfooterItem() {
        try {
            return (
                <View style={{ width: '100%', height: height, alignItems: 'center', backgroundColor: 'white' }}>

                    <View style={{ width: '100%', padding: 10 }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Text style={{ fontSize: 18, color: 'black', fontFamily: 'Poppins-SemiBold' }}>iFrames</Text>
                        </View>
                        <Text style={{ fontSize: 14, color: '#333', fontFamily: 'Poppins-Regular', lineHeight: 25, paddingVertical: 10, textAlign: 'justify' }}>Without prior approval and written permission, you may not create frames around our Webpages that alter in any way the visual presentation or appearance of our Website.</Text>
                    </View>

                    <View style={{ width: '100%', padding: 10 }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Text style={{ fontSize: 18, color: 'black', fontFamily: 'Poppins-SemiBold' }}>Content Liability</Text>
                        </View>
                        <Text style={{ fontSize: 14, color: '#333', fontFamily: 'Poppins-Regular', lineHeight: 25, paddingVertical: 10, textAlign: 'justify' }}>We shall not be hold responsible for any content that appears on your Website. You agree to protect and defend us against all claims that is rising on your Website. No link(s) should appear on any Website that may be interpreted as libelous, obscene or criminal, or which infringes, otherwise violates, or advocates the infringement or other violation of, any third party rights.</Text>
                    </View>

                    <View style={{ width: '100%', padding: 10 }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Text style={{ fontSize: 18, color: 'black', fontFamily: 'Poppins-SemiBold' }}>Reservation of Rights</Text>
                        </View>
                        <Text style={{ fontSize: 14, color: '#333', fontFamily: 'Poppins-Regular', lineHeight: 25, paddingVertical: 10, textAlign: 'justify' }}>We reserve the right to request that you remove all links or any particular link to our Website. You approve to immediately remove all links to our Website upon request. We also reserve the right to amen these terms and conditions and it's linking policy at any time. By continuously linking to our Website, you agree to be bound to and follow these linking terms and conditions.</Text>
                    </View>

                    <View style={{ width: '100%', padding: 10 }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Text style={{ fontSize: 18, color: 'black', fontFamily: 'Poppins-SemiBold' }}>Removal of links from our website</Text>
                        </View>
                        <Text style={{ fontSize: 14, color: '#333', fontFamily: 'Poppins-Regular', lineHeight: 25, paddingVertical: 10, textAlign: 'justify' }}>If you find any link on our Website that is offensive for any reason, you are free to contact and inform us any moment. We will consider requests to remove links but we are not obligated to or so or to respond to you directly.</Text>
                        <Text style={{ fontSize: 14, color: '#333', fontFamily: 'Poppins-Regular', lineHeight: 25, paddingVertical: 10, textAlign: 'justify' }}>We do not ensure that the information on this website is correct, we do not warrant its completeness or accuracy; nor do we promise to ensure that the website remains available or that the material on the website is kept up to date.</Text>
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

                    <View style={{ width: '95%', justifyContent: 'center', alignItems: 'center' }}>
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


            <View style={{ width: scr_width, height: height, justifyContent: 'center', alignItems: 'center', backgroundColor: 'white' }}>
                <FlatList
                    data={freeRentalData}
                    keyExtractor={(item, index) => item + index}
                    ListHeaderComponent={() => renderHeaderItem()}
                    // renderItem={({ item, index }) => renderFreeRentalItem(item, index)}
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
        alignItems: 'center',
        backgroundColor: 'white'
    },
});


//make this component available to the app
export default AuctionPrivacyPolicy;
