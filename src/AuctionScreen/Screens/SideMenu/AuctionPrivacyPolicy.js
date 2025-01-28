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
                                height: 220, resizeMode: 'cover'
                            }}
                        />
                    </View>

                    <View style={{ width: '100%', padding: 10 }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10 }}>
                            <Text style={{ fontSize: 20, color: primarycolor, fontFamily: 'Poppins-Bold' }}>Bank Auctions - Privacy Policy</Text>
                        </View>
                        <Text style={{ fontSize: 14, color: '#333', fontFamily: 'Poppins-Regular', lineHeight: 25, paddingVertical: 10, textAlign: 'justify' }}>This Privacy Policy, for Albion Bank Auctions ('we', 'us', or 'our'), describes how and why we might access, collect, store, use, and/or share ('process') your personal information when you use our services ('Services'), including when you: Download and use our mobile application (Albion Bank Auctions), or any other application of ours that links to this Privacy Policy.</Text>
                        <Text style={{ fontSize: 14, color: '#333', fontFamily: 'Poppins-Regular', lineHeight: 25, paddingVertical: 10, textAlign: 'justify' }}>Engage with us in other related ways, including any sales, marketing, or events Questions or concerns? Reading this Privacy policy will help you understand your privacy rights and choices. We are responsible for making decisions about how your personal information is processed. If you do not agree with our policies and practices, please do not use our Services. If you still have any questions or concerns, please contact us at support@albionbankauctions.com </Text>

                        <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10 }}>
                            <Text style={{ fontSize: 18, color: 'black', fontFamily: 'Poppins-SemiBold' }}>SUMMARY OF KEY POINTS</Text>
                        </View>

                        <Text style={{ fontSize: 14, color: '#333', fontFamily: 'Poppins-Regular', lineHeight: 25, textAlign: 'justify' }}>This summary provides key points from our Privacy Policy: </Text>

                        <View style={{ paddingVertical: 10, }}>
                            <Text style={{ fontSize: 15, color: Color.lightBlack, fontFamily: Poppins.SemiBold, lineHeight: 25, textAlign: 'justify', paddingVertical: 5 }}>What personal information do we process?</Text>
                            <Text style={{ fontSize: 14, color: Color.cloudyGrey, fontFamily: Poppins.Medium, lineHeight: 25, textAlign: 'justify' }}>When you visit, use, or navigate our Services, we may process personal information depending on how you interact with us and the Services, the choices you make, and the products and features you use. Learn more about the personal information you disclose to us.</Text>
                        </View>

                        <View >
                            <Text style={{ fontSize: 15, color: Color.lightBlack, fontFamily: Poppins.SemiBold, lineHeight: 25, textAlign: 'justify', paddingVertical: 5 }}>Do we process any sensitive personal information?</Text>
                            <Text style={{ fontSize: 14, color: Color.cloudyGrey, fontFamily: Poppins.Medium, lineHeight: 25, textAlign: 'justify' }}>Some of the information may be considered 'special' or 'sensitive' in certain jurisdictions, for example, your racial or ethnic origins, sexual orientation, and religious beliefs. We may process sensitive personal information when necessary with your consent or as otherwise permitted by applicable law. Learn more about the sensitive information we process.</Text>
                        </View>
                        <View style={{ paddingVertical: 10, }}>
                            <Text style={{ fontSize: 15, color: Color.lightBlack, fontFamily: Poppins.SemiBold, lineHeight: 25, textAlign: 'justify', paddingVertical: 5 }}>Do we collect any information from third parties?</Text>
                            <Text style={{ fontSize: 14, color: Color.cloudyGrey, fontFamily: Poppins.Medium, lineHeight: 25, textAlign: 'justify' }}>We do not collect any information from third parties.</Text>
                        </View>
                        <View >
                            <Text style={{ fontSize: 15, color: Color.lightBlack, fontFamily: Poppins.SemiBold, lineHeight: 25, textAlign: 'justify', paddingVertical: 5 }}>How do we process your information?</Text>
                            <Text style={{ fontSize: 14, color: Color.cloudyGrey, fontFamily: Poppins.Medium, lineHeight: 25, textAlign: 'justify' }}>We process your information to provide, improve, and administer our Services, communicate with you, for security and fraud prevention, and to comply with law. We may also process your information for other purposes with your consent. We process your information only when we have a valid legal reason to do so. Learn more about how we process your information.</Text>
                        </View>
                        <View style={{ paddingVertical: 10, }}>
                            <Text style={{ fontSize: 15, color: Color.lightBlack, fontFamily: Poppins.SemiBold, lineHeight: 25, textAlign: 'justify', paddingVertical: 5 }}>In what situations and with which types of parties do we share personal information?</Text>
                            <Text style={{ fontSize: 14, color: Color.cloudyGrey, fontFamily: Poppins.Medium, lineHeight: 25, textAlign: 'justify' }}>We may share information in specific situations and with specific categories of third parties. Learn more about when and with whom we share your personal information.                            </Text>
                        </View>
                        <View >
                            <Text style={{ fontSize: 15, color: Color.lightBlack, fontFamily: Poppins.SemiBold, lineHeight: 25, textAlign: 'justify', paddingVertical: 5 }}>How do we keep your information safe?</Text>
                            <Text style={{ fontSize: 14, color: Color.cloudyGrey, fontFamily: Poppins.Medium, lineHeight: 25, textAlign: 'justify' }}>We have adequate organisational and technical processes and procedures in place to protect your personal information. However, no electronic transmission over the internet or information storage technology can be guaranteed to be 100% secure, so we cannot promise or guarantee that hackers, cybercriminals, or other unauthorised third parties will not be able to defeat our security and improperly collect, access, steal, or modify your information. Learn more about how we keep your information safe.</Text>
                        </View>
                        <View style={{ paddingVertical: 10, }}>
                            <Text style={{ fontSize: 15, color: Color.lightBlack, fontFamily: Poppins.SemiBold, lineHeight: 25, textAlign: 'justify', paddingVertical: 5 }}>What are your rights?</Text>
                            <Text style={{ fontSize: 14, color: Color.cloudyGrey, fontFamily: Poppins.Medium, lineHeight: 25, textAlign: 'justify' }}>Depending on where you are located geographically, the applicable privacy law may mean you have certain rights regarding your personal information. Learn more about your privacy rights.</Text>
                        </View>
                        <View >
                            <Text style={{ fontSize: 15, color: Color.lightBlack, fontFamily: Poppins.SemiBold, lineHeight: 25, textAlign: 'justify', paddingVertical: 5 }}>How do you exercise your rights?</Text>
                            <Text style={{ fontSize: 14, color: Color.cloudyGrey, fontFamily: Poppins.Medium, lineHeight: 25, textAlign: 'justify' }}>The easiest way to exercise your rights is by visiting https://albionbankauctions.com/, or by contacting us. We will consider and act upon any request following applicable data protection laws.</Text>
                            <Text style={{ fontSize: 14, color: Color.cloudyGrey, fontFamily: Poppins.Medium, lineHeight: 25, textAlign: 'justify', paddingVertical: 5 }}>Want to learn more about what we do with any information we collect? Review the Privacy Policy in full.</Text>
                        </View>

                        <View style={{ width: '100%', alignItems: 'center', paddingVertical: 10, }}>
                            <Text style={{ width: '100%', fontSize: 18, color: 'black', fontFamily: 'Poppins-SemiBold' }}>1. WHAT INFORMATION DO WE COLLECT?</Text>
                            <Text style={{ width: '100%', fontSize: 14, color: Color.cloudyGrey, fontFamily: Poppins.Medium, lineHeight: 25, textAlign: 'justify' }}>Personal information you disclose to us</Text>

                            <View style={{ width: '100%', }}>
                                <Text style={{ fontSize: 15, color: Color.lightBlack, fontFamily: Poppins.SemiBold, lineHeight: 25, textAlign: 'justify', paddingVertical: 5 }}>In Short:</Text>
                                <Text style={{ fontSize: 14, color: Color.cloudyGrey, fontFamily: Poppins.Medium, lineHeight: 25, textAlign: 'justify' }}>We collect personal information that you provide to us.</Text>
                                <Text style={{ fontSize: 14, color: Color.cloudyGrey, fontFamily: Poppins.Medium, lineHeight: 25, textAlign: 'justify', paddingVertical: 5 }}>We collect personal information that you voluntarily provide to us when you register on the Services, express an interest in obtaining information about us or our products and Services when participate in activities on the Services, or otherwise when you contact us.</Text>
                                <Text style={{ fontSize: 14, color: Color.cloudyGrey, fontFamily: Poppins.Medium, lineHeight: 25, textAlign: 'justify' }}>Personal Information Provided by You. The personal information that we collect depends on the context of your interactions with us and the Services, the choices you make, and the products and features you use. The personal information we collect may include the following:</Text>

                                <View style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: 10, }}>
                                    <Iconviewcomponent
                                        Icontag={'AntDesign'}
                                        iconname={'checkcircle'}
                                        icon_size={20}
                                        icon_color={Color.primary}
                                        iconstyle={{ marginTop: 0 }}
                                    />
                                    <Text style={{ width: '100%', paddingHorizontal: 10, fontSize: 13, color: Color.cloudyGrey, fontFamily: Poppins.Regular, textAlign: 'justify', letterSpacing: 0.5, lineHeight: 22, }}>Names</Text>
                                </View>
                                <View style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: 10, }}>
                                    <Iconviewcomponent
                                        Icontag={'AntDesign'}
                                        iconname={'checkcircle'}
                                        icon_size={20}
                                        icon_color={Color.primary}
                                        iconstyle={{ marginTop: 0 }}
                                    />
                                    <Text style={{ width: '100%', paddingHorizontal: 10, fontSize: 13, color: Color.cloudyGrey, fontFamily: Poppins.Regular, textAlign: 'justify', letterSpacing: 0.5, lineHeight: 22, }}>Phone numbers</Text>
                                </View>
                                <View style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: 10, }}>
                                    <Iconviewcomponent
                                        Icontag={'AntDesign'}
                                        iconname={'checkcircle'}
                                        icon_size={20}
                                        icon_color={Color.primary}
                                        iconstyle={{ marginTop: 0 }}
                                    />
                                    <Text style={{ width: '100%', paddingHorizontal: 10, fontSize: 13, color: Color.cloudyGrey, fontFamily: Poppins.Regular, textAlign: 'justify', letterSpacing: 0.5, lineHeight: 22, }}>Email addresses </Text>
                                </View>
                                <View style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: 10, }}>
                                    <Iconviewcomponent
                                        Icontag={'AntDesign'}
                                        iconname={'checkcircle'}
                                        icon_size={20}
                                        icon_color={Color.primary}
                                        iconstyle={{ marginTop: 0 }}
                                    />
                                    <Text style={{ width: '100%', paddingHorizontal: 10, fontSize: 13, color: Color.cloudyGrey, fontFamily: Poppins.Regular, textAlign: 'justify', letterSpacing: 0.5, lineHeight: 22, }}>Usernames</Text>
                                </View>
                                <View style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: 10, }}>
                                    <Iconviewcomponent
                                        Icontag={'AntDesign'}
                                        iconname={'checkcircle'}
                                        icon_size={20}
                                        icon_color={Color.primary}
                                        iconstyle={{ marginTop: 0 }}
                                    />
                                    <Text style={{ width: '100%', paddingHorizontal: 10, fontSize: 13, color: Color.cloudyGrey, fontFamily: Poppins.Regular, textAlign: 'justify', letterSpacing: 0.5, lineHeight: 22, }}>Contact Preferences</Text>
                                </View>
                                <View style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: 10, }}>
                                    <Iconviewcomponent
                                        Icontag={'AntDesign'}
                                        iconname={'checkcircle'}
                                        icon_size={20}
                                        icon_color={Color.primary}
                                        iconstyle={{ marginTop: 0 }}
                                    />
                                    <Text style={{ width: '100%', paddingHorizontal: 10, fontSize: 13, color: Color.cloudyGrey, fontFamily: Poppins.Regular, textAlign: 'justify', letterSpacing: 0.5, lineHeight: 22, }}>Contact or authentication data</Text>
                                </View>
                                <View style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: 10, }}>
                                    <Iconviewcomponent
                                        Icontag={'AntDesign'}
                                        iconname={'checkcircle'}
                                        icon_size={20}
                                        icon_color={Color.primary}
                                        iconstyle={{ marginTop: 0 }}
                                    />
                                    <Text style={{ width: '100%', paddingHorizontal: 10, fontSize: 13, color: Color.cloudyGrey, fontFamily: Poppins.Regular, textAlign: 'justify', letterSpacing: 0.5, lineHeight: 22, }}>Debit/Credit card numbers</Text>
                                </View>
                            </View>
                            <View style={{ width: '100%', paddingVertical: 10 }}>
                                <Text style={{ fontSize: 15, color: Color.lightBlack, fontFamily: Poppins.SemiBold, lineHeight: 25, textAlign: 'justify', }}>Sensitive Information :</Text>
                                <Text style={{ fontSize: 14, color: Color.cloudyGrey, fontFamily: Poppins.Medium, lineHeight: 25, textAlign: 'justify' }}>When necessary, with your consent or as otherwise permitted by applicable law, we process the following categories of sensitive information: financial data.</Text>
                            </View>
                            <View>
                                <Text style={{ fontSize: 15, color: Color.lightBlack, fontFamily: Poppins.SemiBold, lineHeight: 25, textAlign: 'justify', paddingVertical: 5 }}>Payment Data :</Text>
                                <Text style={{ fontSize: 14, color: Color.cloudyGrey, fontFamily: Poppins.Medium, lineHeight: 25, textAlign: 'justify' }}>We may collect data necessary to process your payment if you choose to make purchases, such as your payment instrument number, and the security code associated with your payment instrument. All payment data is handled and stored by Razorpay. You may find their privacy policy link(s) here: https://razorpay.com/privacy/</Text>
                            </View>
                            <View style={{ width: '100%', paddingVertical: 10 }}>
                                <Text style={{ fontSize: 15, color: Color.lightBlack, fontFamily: Poppins.SemiBold, lineHeight: 25, textAlign: 'justify', paddingVertical: 5 }}>Application Data :</Text>
                                <Text style={{ fontSize: 14, color: Color.cloudyGrey, fontFamily: Poppins.Medium, lineHeight: 25, textAlign: 'justify' }}>If you use our application(s), we also may collect the following information if you choose to provide us with access or permission:</Text>
                            </View>
                            <View>
                                <Text style={{ fontSize: 15, color: Color.lightBlack, fontFamily: Poppins.SemiBold, lineHeight: 25, textAlign: 'justify', paddingVertical: 5 }}>Push Notifications :</Text>
                                <Text style={{ fontSize: 14, color: Color.cloudyGrey, fontFamily: Poppins.Medium, lineHeight: 25, textAlign: 'justify' }}>We may request to send you push notifications regarding your account or certain features of the application(s). If you wish to opt-out from receiving these types of communications, you may turn them off in your device's settings.</Text>
                                <Text style={{ fontSize: 14, color: Color.cloudyGrey, fontFamily: Poppins.Medium, lineHeight: 25, textAlign: 'justify', paddingVertical: 5 }}>This information is primarily needed to maintain the security and operation of our application(s), for troubleshooting, and for our internal analytics and reporting purposes.</Text>
                                <Text style={{ fontSize: 14, color: Color.cloudyGrey, fontFamily: Poppins.Medium, lineHeight: 25, textAlign: 'justify' }}>All personal information that you provide to us must be true, complete, and accurate, and you must notify us of any changes to such personal information.</Text>
                            </View>
                        </View>

                        <View style={{ width: '100%', alignItems: 'center', marginTop: 10 }}>
                            <Text style={{ width: '100%', fontSize: 18, color: 'black', fontFamily: 'Poppins-SemiBold' }}>Information automatically collected </Text>
                            <View>
                                <Text style={{ fontSize: 15, color: Color.lightBlack, fontFamily: Poppins.SemiBold, lineHeight: 25, textAlign: 'justify', paddingVertical: 5 }}>In Short:</Text>
                                <Text style={{ fontSize: 14, color: Color.cloudyGrey, fontFamily: Poppins.Medium, lineHeight: 25, textAlign: 'justify' }}>Some information — such as your Internet Protocol (IP) address and/or browser and device characteristics — is collected automatically when you visit our Services.</Text>
                                <Text style={{ fontSize: 14, color: Color.cloudyGrey, fontFamily: Poppins.Medium, lineHeight: 25, textAlign: 'justify', paddingVertical: 5 }}>We automatically collect certain information when you visit, use, or navigate the Services. This information does not reveal your specific identity (like your name or contact information) but may include device and usage information, such as your IP address, browser and device characteristics, operating system, language preferences, referring URLs, device name, country, location, information about how and when you use our Services, and other technical information. This information is primarily needed to maintain the security and operation of our Services, and for our internal analytics and reporting purposes.</Text>
                                <Text style={{ fontSize: 14, color: Color.cloudyGrey, fontFamily: Poppins.Medium, lineHeight: 25, textAlign: 'justify' }}>Like many businesses, we also collect information through cookies and similar technologies</Text>
                            </View>
                        </View>
                        <View style={{ width: '100%', alignItems: 'center', marginTop: 10 }}>
                            <Text style={{ width: '100%', fontSize: 18, color: 'black', fontFamily: 'Poppins-SemiBold' }}>The information we collect includes:</Text>
                            <View>
                                <Text style={{ fontSize: 15, color: Color.lightBlack, fontFamily: Poppins.SemiBold, lineHeight: 25, textAlign: 'justify', paddingVertical: 5 }}>Log and Usage Data</Text>
                                <Text style={{ fontSize: 14, color: Color.cloudyGrey, fontFamily: Poppins.Medium, lineHeight: 25, textAlign: 'justify' }}>Log and usage data is service-related, diagnostic, usage, and performance information our servers automatically collect when you access or use our Services and which we record in log files. Depending on how you interact with us, this log data may include your IP address, device information, browser type, and settings and information about your activity in the Services (such as the date/time stamps associated with your usage, pages and files viewed, searches, and other actions you take such as which features you use), device event information (such as system activity, error reports (sometimes called 'crash dumps'), and hardware settings)</Text>
                            </View>
                            <View style={{ marginTop: 5 }}>
                                <Text style={{ fontSize: 15, color: Color.lightBlack, fontFamily: Poppins.SemiBold, lineHeight: 25, textAlign: 'justify', paddingVertical: 5 }}>Device Data</Text>
                                <Text style={{ fontSize: 14, color: Color.cloudyGrey, fontFamily: Poppins.Medium, lineHeight: 25, textAlign: 'justify' }}>We collect device data such as information about your computer, phone, tablet, or other device you use to access the Services. Depending on the device used, this device data may include information such as your IP address (or proxy server), device and application identification numbers, location, browser type, hardware model, Internet service provider and/or mobile carrier, operating system, and system configuration information. </Text>
                            </View>
                            <View style={{ marginTop: 5 }}>
                                <Text style={{ fontSize: 15, color: Color.lightBlack, fontFamily: Poppins.SemiBold, lineHeight: 25, textAlign: 'justify', paddingVertical: 5 }}>Location Data</Text>
                                <Text style={{ fontSize: 14, color: Color.cloudyGrey, fontFamily: Poppins.Medium, lineHeight: 25, textAlign: 'justify' }}>We collect location data such as information about your device's location, which can be either precise or imprecise. How much information we collect depends on the type and settings of the device you use to access the Services. For example, we may use GPS and other technologies to collect geolocation data that tells us your current location (based on your IP address). You can opt out of allowing us to collect this information either by refusing access to the information or by disabling your Location setting on your device. However, if you choose to opt-out, you may not be able to use certain aspects of the Services.</Text>
                            </View>
                            <View style={{ marginTop: 0 }}>
                                <Text style={{ fontSize: 15, color: Color.lightBlack, fontFamily: Poppins.SemiBold, lineHeight: 25, textAlign: 'justify', paddingVertical: 5 }}>Google API</Text>
                                <Text style={{ fontSize: 14, color: Color.cloudyGrey, fontFamily: Poppins.Medium, lineHeight: 25, textAlign: 'justify' }}>Our use of information received from Google APIs will adhere to Google API Services User Data Policy, including the Limited Use requirements.</Text>
                            </View>
                        </View>

                        <View style={{ width: '100%', alignItems: 'center', marginTop: 10 }}>
                            <Text style={{ width: '100%', fontSize: 18, color: 'black', fontFamily: 'Poppins-SemiBold' }}>2. HOW DO WE PROCESS YOUR INFORMATION?</Text>
                            <View>
                                <Text style={{ fontSize: 15, color: Color.lightBlack, fontFamily: Poppins.SemiBold, lineHeight: 25, textAlign: 'justify', paddingVertical: 5 }}>In Short:</Text>
                                <Text style={{ fontSize: 14, color: Color.cloudyGrey, fontFamily: Poppins.Medium, lineHeight: 25, textAlign: 'justify' }}>We process your information to provide, improve, and administer our Services, communicate with you, for security and fraud prevention, and comply with the law. We may also process your information for other purposes with your consent.</Text>
                            </View>

                            <View style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: 10, }}>
                                <Iconviewcomponent
                                    Icontag={'Entypo'}
                                    iconname={'dot-single'}
                                    icon_size={25}
                                    icon_color={Color.primary}
                                />
                                <Text style={{ width: '100%', paddingHorizontal: 5, fontSize: 13, color: Color.cloudyGrey, fontFamily: Poppins.Regular, textAlign: 'justify', letterSpacing: 0.5, lineHeight: 22, }}>We process your personal information for a variety of reasons, depending on how you interact with our Services, including.</Text>
                            </View>
                            <View style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: 10, }}>
                                <Iconviewcomponent
                                    Icontag={'Entypo'}
                                    iconname={'dot-single'}
                                    icon_size={25}
                                    icon_color={Color.primary}
                                />
                                <Text style={{ width: '100%', paddingHorizontal: 5, fontSize: 13, color: Color.cloudyGrey, fontFamily: Poppins.Regular, textAlign: 'justify', letterSpacing: 0.5, lineHeight: 22, }}>To facilitate account creation and authentication and otherwise manage user accounts. We may process your information so you can create and log in to your account, as well as keep your account in working order.</Text>
                            </View>
                            <View style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: 10, }}>
                                <Iconviewcomponent
                                    Icontag={'Entypo'}
                                    iconname={'dot-single'}
                                    icon_size={25}
                                    icon_color={Color.primary}
                                />
                                <Text style={{ width: '100%', paddingHorizontal: 5, fontSize: 13, color: Color.cloudyGrey, fontFamily: Poppins.Regular, textAlign: 'justify', letterSpacing: 0.5, lineHeight: 22, }}>To deliver and facilitate the delivery of services to the user. We may process your information to provide you with the requested service.</Text>
                            </View>
                            <View style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: 10, }}>
                                <Iconviewcomponent
                                    Icontag={'Entypo'}
                                    iconname={'dot-single'}
                                    icon_size={25}
                                    icon_color={Color.primary}
                                />
                                <Text style={{ width: '100%', paddingHorizontal: 5, fontSize: 13, color: Color.cloudyGrey, fontFamily: Poppins.Regular, textAlign: 'justify', letterSpacing: 0.5, lineHeight: 22, }}>To respond to user inquiries/offer support to users. We may process your information to respond to your inquiries and solve any potential issues you might have with the requested service.</Text>
                            </View>
                            <View style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: 10, }}>
                                <Iconviewcomponent
                                    Icontag={'Entypo'}
                                    iconname={'dot-single'}
                                    icon_size={25}
                                    icon_color={Color.primary}
                                />
                                <Text style={{ width: '100%', paddingHorizontal: 5, fontSize: 13, color: Color.cloudyGrey, fontFamily: Poppins.Regular, textAlign: 'justify', letterSpacing: 0.5, lineHeight: 22, }}>To send administrative information to you. We may process your information to send you details about our products and services, changes to our terms and policies, and other similar information.</Text>
                            </View>
                            <View style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: 10, }}>
                                <Iconviewcomponent
                                    Icontag={'Entypo'}
                                    iconname={'dot-single'}
                                    icon_size={25}
                                    icon_color={Color.primary}
                                />
                                <Text style={{ width: '100%', paddingHorizontal: 5, fontSize: 13, color: Color.cloudyGrey, fontFamily: Poppins.Regular, textAlign: 'justify', letterSpacing: 0.5, lineHeight: 22, }}>To fulfil and manage your orders. We may process your information to fulfil and manage your orders, payments, returns, and exchanges made through the Services.</Text>
                            </View>
                            <View style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: 10, }}>
                                <Iconviewcomponent
                                    Icontag={'Entypo'}
                                    iconname={'dot-single'}
                                    icon_size={25}
                                    icon_color={Color.primary}
                                />
                                <Text style={{ width: '100%', paddingHorizontal: 5, fontSize: 13, color: Color.cloudyGrey, fontFamily: Poppins.Regular, textAlign: 'justify', letterSpacing: 0.5, lineHeight: 22, }}>To enable user-to-user communications. We may process your information if you choose to use any of our offerings that allow for communication with another user.</Text>
                            </View>
                            <View style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: 10, }}>
                                <Iconviewcomponent
                                    Icontag={'Entypo'}
                                    iconname={'dot-single'}
                                    icon_size={25}
                                    icon_color={Color.primary}
                                />
                                <Text style={{ width: '100%', paddingHorizontal: 5, fontSize: 13, color: Color.cloudyGrey, fontFamily: Poppins.Regular, textAlign: 'justify', letterSpacing: 0.5, lineHeight: 22, }}>To request feedback. We may process your information when necessary to request feedback and to contact you about your use of our Services.</Text>
                            </View>
                            <View style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: 10, }}>
                                <Iconviewcomponent
                                    Icontag={'Entypo'}
                                    iconname={'dot-single'}
                                    icon_size={25}
                                    icon_color={Color.primary}
                                />
                                <Text style={{ width: '100%', paddingHorizontal: 5, fontSize: 13, color: Color.cloudyGrey, fontFamily: Poppins.Regular, textAlign: 'justify', letterSpacing: 0.5, lineHeight: 22, }}>To send you marketing and promotional communications. We may process the personal information you send to us for our marketing purposes if this is under your marketing preferences. You can opt out of our marketing emails at any time.</Text>
                            </View>
                            <View style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: 10, }}>
                                <Iconviewcomponent
                                    Icontag={'Entypo'}
                                    iconname={'dot-single'}
                                    icon_size={25}
                                    icon_color={Color.primary}
                                />
                                <Text style={{ width: '100%', paddingHorizontal: 5, fontSize: 13, color: Color.cloudyGrey, fontFamily: Poppins.Regular, textAlign: 'justify', letterSpacing: 0.5, lineHeight: 22, }}>For more information, see  'WHAT ARE YOUR PRIVACY RIGHTS?' below.</Text>
                            </View>
                            <View style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: 10, }}>
                                <Iconviewcomponent
                                    Icontag={'Entypo'}
                                    iconname={'dot-single'}
                                    icon_size={25}
                                    icon_color={Color.primary}
                                />
                                <Text style={{ width: '100%', paddingHorizontal: 5, fontSize: 13, color: Color.cloudyGrey, fontFamily: Poppins.Regular, textAlign: 'justify', letterSpacing: 0.5, lineHeight: 22, }}>To deliver targeted advertising to you. We may process your information to develop and display personalised content and advertising tailored to your interests, location, and more.</Text>
                            </View>
                            <View style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: 10, }}>
                                <Iconviewcomponent
                                    Icontag={'Entypo'}
                                    iconname={'dot-single'}
                                    icon_size={25}
                                    icon_color={Color.primary}
                                />
                                <Text style={{ width: '100%', paddingHorizontal: 5, fontSize: 13, color: Color.cloudyGrey, fontFamily: Poppins.Regular, textAlign: 'justify', letterSpacing: 0.5, lineHeight: 22, }}>To evaluate and improve our Services, products, marketing, and your experience. We may process your information when we believe it is necessary to identify usage trends, determine the effectiveness of our promotional campaigns, and to evaluate and improve our Services, products, marketing, and your experience.</Text>
                            </View>
                            <View style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: 10, }}>
                                <Iconviewcomponent
                                    Icontag={'Entypo'}
                                    iconname={'dot-single'}
                                    icon_size={25}
                                    icon_color={Color.primary}
                                />
                                <Text style={{ width: '100%', paddingHorizontal: 5, fontSize: 13, color: Color.cloudyGrey, fontFamily: Poppins.Regular, textAlign: 'justify', letterSpacing: 0.5, lineHeight: 22, }}>To identify usage trends. We may process information about how you use our Services to better understand how they are being used so we can improve them.</Text>
                            </View>
                            <View style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: 10, }}>
                                <Iconviewcomponent
                                    Icontag={'Entypo'}
                                    iconname={'dot-single'}
                                    icon_size={25}
                                    icon_color={Color.primary}
                                />
                                <Text style={{ width: '100%', paddingHorizontal: 5, fontSize: 13, color: Color.cloudyGrey, fontFamily: Poppins.Regular, textAlign: 'justify', letterSpacing: 0.5, lineHeight: 22, }}>To determine the effectiveness of our marketing and promotional campaigns. We may process your information to better understand how to provide marketing and promotional campaigns that are most relevant to you.</Text>
                            </View>
                            <View style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: 10, }}>
                                <Iconviewcomponent
                                    Icontag={'Entypo'}
                                    iconname={'dot-single'}
                                    icon_size={25}
                                    icon_color={Color.primary}
                                />
                                <Text style={{ width: '100%', paddingHorizontal: 5, fontSize: 13, color: Color.cloudyGrey, fontFamily: Poppins.Regular, textAlign: 'justify', letterSpacing: 0.5, lineHeight: 22, }}>To comply with our legal obligations. We may process your information to comply with our legal obligations, respond to legal requests, and exercise, establish, or defend our legal rights.</Text>
                            </View>
                        </View>

                        <View style={{ width: '100%', alignItems: 'center', marginTop: 10 }}>
                            <Text style={{ width: '100%', fontSize: 18, color: 'black', fontFamily: 'Poppins-SemiBold' }}>3. WHEN AND WITH WHOM DO WE SHARE YOUR PERSONAL INFORMATION?</Text>
                            <View style={{ width: '100%' }}>
                                <Text style={{ fontSize: 15, color: Color.lightBlack, fontFamily: Poppins.SemiBold, lineHeight: 25, textAlign: 'justify', paddingVertical: 5 }}>In Short:</Text>
                                <Text style={{ fontSize: 14, color: Color.cloudyGrey, fontFamily: Poppins.Medium, lineHeight: 25, textAlign: 'justify' }}>We may share information in specific situations described in this section and/or with the following categories of third parties.</Text>
                                <Text style={{ fontSize: 14, color: Color.cloudyGrey, fontFamily: Poppins.Medium, lineHeight: 25, textAlign: 'justify', paddingVertical: 5 }}>Vendors, Consultants, and Other Third-Party Service Providers. We may share your data with third-party vendors, service providers, contractors, or agents ('third parties') who perform services for us or on our behalf and require access to such information to do that work. We have contracts in place with our third parties, which are designed to help safeguard your personal information. This means that they cannot do anything with your personal information unless we have instructed them to do it. They will also not share your personal information with any organisation apart from us. They also commit to protect the data they hold on our behalf and to retain it for the period we instruct.</Text>
                                <Text style={{ fontSize: 14, color: Color.cloudyGrey, fontFamily: Poppins.Medium, lineHeight: 25, textAlign: 'justify' }}>The categories of third parties we may share personal information with are as follows:</Text>

                                <View style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: 10, }}>
                                    <Iconviewcomponent
                                        Icontag={'Entypo'}
                                        iconname={'dot-single'}
                                        icon_size={25}
                                        icon_color={Color.primary}
                                    />
                                    <Text style={{ width: '100%', paddingHorizontal: 5, fontSize: 13, color: Color.cloudyGrey, fontFamily: Poppins.Regular, textAlign: 'justify', letterSpacing: 0.5, lineHeight: 22, }}>Affiliate Marketing Programs</Text>
                                </View>
                                <View style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: 10, }}>
                                    <Iconviewcomponent
                                        Icontag={'Entypo'}
                                        iconname={'dot-single'}
                                        icon_size={25}
                                        icon_color={Color.primary}
                                    />
                                    <Text style={{ width: '100%', paddingHorizontal: 5, fontSize: 13, color: Color.cloudyGrey, fontFamily: Poppins.Regular, textAlign: 'justify', letterSpacing: 0.5, lineHeight: 22, }}>Sales & Marketing Tools</Text>
                                </View>
                                <Text style={{ fontSize: 14, color: '#333', fontFamily: 'Poppins-Regular', lineHeight: 25, paddingVertical: 10, textAlign: 'justify' }}>We also may need to share your personal information in the following situations:</Text>
                            </View>
                            <View>
                                <Text style={{ fontSize: 15, color: Color.lightBlack, fontFamily: Poppins.SemiBold, lineHeight: 25, textAlign: 'justify', paddingVertical: 5 }}>Business Transfers</Text>
                                <Text style={{ fontSize: 14, color: Color.cloudyGrey, fontFamily: Poppins.Medium, lineHeight: 25, textAlign: 'justify' }}>We may share or transfer your information in connection with, or during negotiations of, any merger, sale of company assets, financing, or acquisition of all or a portion of our business to another company.</Text>
                                <Text style={{ fontSize: 14, color: Color.cloudyGrey, fontFamily: Poppins.Medium, lineHeight: 25, textAlign: 'justify', paddingVertical: 5 }}>When we use Google Maps Platform APIs. We may share your information with certain Google Maps Platform APIs (e.g. Google Maps API, Places API). Google Maps uses GPS, Wi-Fi, and cell towers to estimate your location. GPS is accurate to about 20 meters, while Wi-Fi and cell towers help improve accuracy when GPS signals are weak, like indoors. This data helps Google Maps provide directions, but it is not always perfectly precise.</Text>
                                <Text style={{ fontSize: 14, color: Color.cloudyGrey, fontFamily: Poppins.Medium, lineHeight: 25, textAlign: 'justify' }}>Affiliates. We may share your information with our affiliates, in which case we will require those affiliates to honour this Privacy Policy. Affiliates include our parent company and any subsidiaries, joint venture partners, or other companies that we control or that are under common control with us.</Text>
                            </View>
                        </View>
                        <View style={{ width: '100%', alignItems: 'center', marginTop: 10 }}>
                            <Text style={{ width: '100%', fontSize: 18, color: 'black', fontFamily: 'Poppins-SemiBold' }}>4. DO WE USE COOKIES AND OTHER TRACKING TECHNOLOGIES?</Text>
                            <View>
                                <Text style={{ fontSize: 15, color: Color.lightBlack, fontFamily: Poppins.SemiBold, lineHeight: 25, textAlign: 'justify', paddingVertical: 5 }}>In Short:</Text>
                                <Text style={{ fontSize: 14, color: Color.cloudyGrey, fontFamily: Poppins.Medium, lineHeight: 25, textAlign: 'justify' }}>We may use cookies and other tracking technologies to collect and store your information.</Text>
                                <Text style={{ fontSize: 14, color: Color.cloudyGrey, fontFamily: Poppins.Medium, lineHeight: 25, textAlign: 'justify', paddingVertical: 5 }}>We may use cookies and similar tracking technologies (like web beacons and pixels) to gather information when you interact with our Services. Some online tracking technologies help us maintain the security of our Services and your account, prevent crashes, fix bugs, save your preferences, and assist with basic site functions.</Text>
                                <Text style={{ fontSize: 14, color: Color.cloudyGrey, fontFamily: Poppins.Medium, lineHeight: 25, textAlign: 'justify' }}>We also permit third parties and service providers to use online tracking technologies on our Services for analytics and advertising, including to help manage and display advertisements, to tailor advertisements to your interests, or to send abandoned shopping cart reminders (depending on your communication preferences). The third parties and service providers use their technology to provide advertising about products and services tailored to your interests which may appear either on our Services or on other websites.</Text>
                                <Text style={{ fontSize: 14, color: Color.cloudyGrey, fontFamily: Poppins.Medium, lineHeight: 25, textAlign: 'justify', paddingVertical: 5 }}>Specific information about how we use such technologies and how you can refuse certain cookies is set out in our Cookie Policies.</Text>

                                <Text style={{ fontSize: 15, color: Color.lightBlack, fontFamily: Poppins.SemiBold, lineHeight: 25, textAlign: 'justify', paddingVertical: 5 }}>Google Analytics</Text>
                                <Text style={{ fontSize: 14, color: Color.cloudyGrey, fontFamily: Poppins.Medium, lineHeight: 25, textAlign: 'justify' }}>Google AnalyticsWe may share your information with Google Analytics to track and analyse the use of the Services. To opt out of being tracked by Google Analytics across the Services, visit https://tools.google.com/dlpage/gaoptout. For more information on the privacy practices of Google, please visit the Google Privacy & Terms page</Text>
                            </View>
                        </View>

                        <View style={{ width: '100%', alignItems: 'center', marginTop: 10 }}>
                            <Text style={{ width: '100%', fontSize: 18, color: 'black', fontFamily: 'Poppins-SemiBold' }}>5. HOW LONG DO WE KEEP YOUR INFORMATION?</Text>
                            <View>
                                <Text style={{ fontSize: 15, color: Color.lightBlack, fontFamily: Poppins.SemiBold, lineHeight: 25, textAlign: 'justify', paddingVertical: 5 }}>In Short:</Text>
                                <Text style={{ fontSize: 14, color: Color.cloudyGrey, fontFamily: Poppins.Medium, lineHeight: 25, textAlign: 'justify' }}>We keep your information for as long as necessary to fulfil the purposes outlined in this Privacy Policy, unless otherwise required by law.</Text>
                                <Text style={{ fontSize: 14, color: Color.cloudyGrey, fontFamily: Poppins.Medium, lineHeight: 25, textAlign: 'justify', paddingVertical: 5 }}>We will only keep your personal information for as long as it is necessary for the purposes set out in this Privacy Policy unless a longer retention period is required or permitted by law (such as tax, accounting, or other legal requirements). No purpose in this policy will require us to keep your personal information for longer than the period of time in which users have an account with us.</Text>
                                <Text style={{ fontSize: 14, color: Color.cloudyGrey, fontFamily: Poppins.Medium, lineHeight: 25, textAlign: 'justify' }}>When we have no ongoing legitimate business need to process your personal information, we will either delete or anonymise such information, or, if this is not possible (for example, because your personal information has been stored in backup archives), then we will securely store your personal information and isolate it from any further processing until deletion is possible.</Text>
                            </View>
                        </View>

                        <View style={{ width: '100%', alignItems: 'center', marginTop: 10 }}>
                            <Text style={{ width: '100%', fontSize: 18, color: 'black', fontFamily: 'Poppins-SemiBold' }}>6. HOW DO WE KEEP YOUR INFORMATION SAFE?</Text>
                            <View>
                                <Text style={{ fontSize: 15, color: Color.lightBlack, fontFamily: Poppins.SemiBold, lineHeight: 25, textAlign: 'justify', paddingVertical: 5 }}>In Short:</Text>
                                <Text style={{ fontSize: 14, color: Color.cloudyGrey, fontFamily: Poppins.Medium, lineHeight: 25, textAlign: 'justify' }}>We aim to protect your personal information through a system of organisational and technical security measures.</Text>
                                <Text style={{ fontSize: 14, color: Color.cloudyGrey, fontFamily: Poppins.Medium, lineHeight: 25, textAlign: 'justify', paddingVertical: 5 }}>We have implemented appropriate and reasonable technical and organisational security measures designed to protect the security of any personal information we process. However, despite our safeguards and efforts to secure your information, no electronic transmission over the Internet or information storage technology can be guaranteed to be 100% secure, so we cannot promise or guarantee that hackers, cybercriminals, or other unauthorised third parties will not be able to defeat our security and improperly collect, access, steal, or modify your information. Although we will do our best to protect your personal information, transmission of personal information to and from our Services is at your own risk. You should only access the Services within a secure environment.</Text>
                            </View>
                        </View>

                        <View style={{ width: '100%', alignItems: 'center', marginTop: 0 }}>
                            <Text style={{ width: '100%', fontSize: 18, color: 'black', fontFamily: 'Poppins-SemiBold' }}>7. DO WE COLLECT INFORMATION FROM MINORS?</Text>
                            <View>
                                <Text style={{ fontSize: 15, color: Color.lightBlack, fontFamily: Poppins.SemiBold, lineHeight: 25, textAlign: 'justify', paddingVertical: 5 }}>In Short:</Text>
                                <Text style={{ fontSize: 14, color: Color.cloudyGrey, fontFamily: Poppins.Medium, lineHeight: 25, textAlign: 'justify' }}>We do not knowingly collect data from or market to children under 18 years of age.</Text>
                                <Text style={{ fontSize: 14, color: Color.cloudyGrey, fontFamily: Poppins.Medium, lineHeight: 25, textAlign: 'justify', paddingVertical: 5 }}>We do not knowingly collect, solicit data from, or market to children under 18 years of age, nor do we knowingly sell such personal information. By using the Services, you represent that you are at least 18 or that you are the parent or guardian of such a minor and consent to such minor dependent’s use of the Services. If we learn that personal information from users less than 18 years of age has been collected, we will deactivate the account and take reasonable measures to promptly delete such data from our records.</Text>
                                <Text style={{ fontSize: 14, color: Color.cloudyGrey, fontFamily: Poppins.Medium, lineHeight: 25, textAlign: 'justify' }}>If you become aware of any data we may have collected from children under the age of 18, please contact us at support@albionbankauctions.com</Text>
                            </View>
                        </View>

                        <View style={{ width: '100%', alignItems: 'center', marginTop: 10 }}>
                            <Text style={{ width: '100%', fontSize: 18, color: 'black', fontFamily: 'Poppins-SemiBold' }}>8. WHAT ARE YOUR PRIVACY RIGHTS?</Text>
                            <View>
                                <Text style={{ fontSize: 15, color: Color.lightBlack, fontFamily: Poppins.SemiBold, lineHeight: 25, textAlign: 'justify', paddingVertical: 5 }}>In Short:</Text>
                                <Text style={{ fontSize: 14, color: Color.cloudyGrey, fontFamily: Poppins.Medium, lineHeight: 25, textAlign: 'justify' }}>You may review, change, or terminate your account at any time, depending on your country, province, or state of residence</Text>
                            </View>
                            <View>
                                <Text style={{ fontSize: 15, color: Color.lightBlack, fontFamily: Poppins.SemiBold, lineHeight: 25, textAlign: 'justify', paddingVertical: 10 }}>Withdrawing your consent :</Text>
                                <Text style={{ fontSize: 14, color: Color.cloudyGrey, fontFamily: Poppins.Medium, lineHeight: 25, textAlign: 'justify' }}>If we are relying on your consent to process your personal information, which may be express and/or implied consent depending on the applicable law, you have the right to withdraw your consent at any time. You can withdraw your consent at any time by contacting us using the contact details provided in the section 'HOW CAN YOU CONTACT US ABOUT THIS POLICY?' below.</Text>
                                <Text style={{ fontSize: 14, color: Color.cloudyGrey, fontFamily: Poppins.Medium, lineHeight: 25, textAlign: 'justify', paddingVertical: 5 }}>However, please note that this will not affect the lawfulness of the processing before its withdrawal nor when applicable law allows, will it affect the processing of your personal information conducted in reliance on lawful processing grounds other than consent.</Text>
                                <Text style={{ fontSize: 14, color: Color.cloudyGrey, fontFamily: Poppins.Medium, lineHeight: 25, textAlign: 'justify' }}>Opting out of marketing and promotional communications: You can unsubscribe from our marketing and promotional communications at any time by replying 'STOP' or 'UNSUBSCRIBE' to the SMS messages that we send, or by contacting us using the details provided in the section 'HOW CAN YOU CONTACT US ABOUT THIS POLICY?' below. You will then be removed from the marketing lists. However, we may still communicate with you — for example, to send you service-related messages that are necessary for the administration and use of your account, to respond to service requests, or for other non-marketing purposes.</Text>
                            </View>
                        </View>

                        <View style={{ width: '100%', alignItems: 'center', marginTop: 10 }}>
                            <Text style={{ width: '100%', fontSize: 18, color: 'black', fontFamily: 'Poppins-SemiBold' }}>Account Information</Text>
                            <View>
                                <Text style={{ fontSize: 14, color: Color.cloudyGrey, fontFamily: Poppins.Medium, lineHeight: 25, textAlign: 'justify', paddingVertical: 5 }}>If you would at any time like to review or change the information in your account or terminate your account, you can</Text>
                                <Text style={{ fontSize: 14, color: Color.cloudyGrey, fontFamily: Poppins.Medium, lineHeight: 25, textAlign: 'justify' }}>Log in to your account settings and update your user account</Text>
                                <Text style={{ fontSize: 14, color: Color.cloudyGrey, fontFamily: Poppins.Medium, lineHeight: 25, textAlign: 'justify', paddingVertical: 5 }}>Contact us using the contact information provided</Text>
                                <Text style={{ fontSize: 14, color: Color.cloudyGrey, fontFamily: Poppins.Medium, lineHeight: 25, textAlign: 'justify', paddingVertical: 5 }}>Upon your request to terminate your account, we will deactivate or delete your account and information from our active databases. However, we may retain some information in our files to prevent fraud, troubleshoot problems, assist with any investigations, enforce our legal terms and/or comply with applicable legal requirements</Text>
                            </View>
                            <View>
                                <Text style={{ fontSize: 15, color: Color.lightBlack, fontFamily: Poppins.SemiBold, lineHeight: 25, textAlign: 'justify', paddingVertical: 5 }}>Withdrawing your consent :</Text>
                                <Text style={{ fontSize: 14, color: Color.cloudyGrey, fontFamily: Poppins.Medium, lineHeight: 25, textAlign: 'justify' }}>If we are relying on your consent to process your personal information, which may be express and/or implied consent depending on the applicable law, you have the right to withdraw your consent at any time. You can withdraw your consent at any time by contacting us using the contact details provided in the section 'HOW CAN YOU CONTACT US ABOUT THIS POLICY?' below.</Text>
                                <Text style={{ fontSize: 14, color: Color.cloudyGrey, fontFamily: Poppins.Medium, lineHeight: 25, textAlign: 'justify', paddingVertical: 5 }}>However, please note that this will not affect the lawfulness of the processing before its withdrawal nor when applicable law allows, will it affect the processing of your personal information conducted in reliance on lawful processing grounds other than consent.</Text>
                                <Text style={{ fontSize: 14, color: Color.cloudyGrey, fontFamily: Poppins.Medium, lineHeight: 25, textAlign: 'justify' }}>Opting out of marketing and promotional communications: You can unsubscribe from our marketing and promotional communications at any time by replying 'STOP' or 'UNSUBSCRIBE' to the SMS messages that we send, or by contacting us using the details provided in the section 'HOW CAN YOU CONTACT US ABOUT THIS POLICY?' below. You will then be removed from the marketing lists. However, we may still communicate with you — for example, to send you service-related messages that are necessary for the administration and use of your account, to respond to service requests, or for other non-marketing purposes.</Text>
                            </View>
                        </View>

                        <View style={{ width: '100%', alignItems: 'center', marginTop: 10 }}>
                            <Text style={{ width: '100%', fontSize: 18, color: 'black', fontFamily: 'Poppins-SemiBold' }}>Cookies and similar technologies :</Text>
                            <View>
                                <Text style={{ fontSize: 14, color: Color.cloudyGrey, fontFamily: Poppins.Medium, lineHeight: 25, textAlign: 'justify', paddingVertical: 5 }}>Most Web browsers are set to accept cookies by default. If you prefer, you can usually choose to set your browser to remove cookies and to reject cookies. If you choose to remove cookies or reject cookies, this could affect certain features or services of our Services.</Text>
                                <Text style={{ fontSize: 14, color: Color.cloudyGrey, fontFamily: Poppins.Medium, lineHeight: 25, textAlign: 'justify' }}>If you have questions or comments about your privacy rights, you may email us at support@albionbankauctions.com</Text>
                            </View>
                        </View>
                        <View style={{ width: '100%', alignItems: 'center', marginTop: 10 }}>
                            <Text style={{ width: '100%', fontSize: 18, color: 'black', fontFamily: 'Poppins-SemiBold' }}>9. CONTROLS FOR DO-NOT-TRACK FEATURES</Text>
                            <Text style={{ fontSize: 14, color: Color.cloudyGrey, fontFamily: Poppins.Medium, lineHeight: 25, textAlign: 'justify', paddingVertical: 5 }}>Most web browsers and some mobile operating systems and mobile applications include a Do-Not-Track ('DNT') feature or setting you can activate to signal your privacy preference not to have data about your online browsing activities monitored and collected. At this stage, no uniform technology standard for recognising and implementing DNT signals has been finalised. As such, we do not currently respond to DNT browser signals or any other mechanism that automatically communicates your choice not to be tracked online. If a standard for online tracking is adopted that we must follow in the future, we will inform you about that practice in a revised version of this Privacy Policy.</Text>
                        </View>

                        <View style={{ width: '100%', alignItems: 'center' }}>
                            <Text style={{ width: '100%', fontSize: 18, color: 'black', fontFamily: 'Poppins-SemiBold' }}>10. DO WE MAKE UPDATES TO THIS POLICY?</Text>
                            <View style={{ width: '100%' }}>
                                <Text style={{ fontSize: 15, color: Color.lightBlack, fontFamily: Poppins.SemiBold, lineHeight: 25, textAlign: 'justify', paddingVertical: 5 }}>In Short:</Text>
                                <Text style={{ fontSize: 14, color: Color.cloudyGrey, fontFamily: Poppins.Medium, lineHeight: 25, textAlign: 'justify' }}>Yes, we will update this policy as necessary to stay compliant with relevant laws.</Text>
                            </View>
                            <Text style={{ width: '100%', fontSize: 14, color: Color.cloudyGrey, fontFamily: Poppins.Medium, lineHeight: 25, textAlign: 'justify', paddingVertical: 5 }}>We may update this Privacy Policy from time to time. The updated version will be indicated by an updated 'Revised' date at the top of this Privacy Policy. If we make material changes to this Privacy Policy, we may notify you either by prominently posting a policy of such changes or by directly sending you a notification. We encourage you to review this Privacy Policy frequently to be informed of how we are protecting your information.</Text>
                        </View>

                        <View style={{ width: '100%', alignItems: 'center', marginTop: 10 }}>
                            <Text style={{ width: '100%', fontSize: 18, color: 'black', fontFamily: 'Poppins-SemiBold' }}>11. HOW CAN YOU CONTACT US ABOUT THIS POLICY?</Text>
                            <Text style={{ width: '100%', fontSize: 14, color: Color.cloudyGrey, fontFamily: Poppins.Medium, lineHeight: 25, textAlign: 'justify', paddingVertical: 5 }}>If you have questions or comments about this policy, you may email us at support@albionbankauctions.com  or contact us by post at</Text>

                            <View style={{ width: '100%' }}>
                                <Text style={{ fontSize: 15, color: Color.lightBlack, fontFamily: Poppins.SemiBold, lineHeight: 25, textAlign: 'justify', paddingVertical: 5 }}>Albion Bank Auctions</Text>
                                <Text style={{ fontSize: 15, color: Color.lightBlack, fontFamily: Poppins.SemiBold, lineHeight: 25, textAlign: 'justify', paddingVertical: 5 }}>Level 5, S.P Plot No:16, TAMARAI TECH PARK, 19 & 20-A, 100 Feet Rd, Thiru Vi Ka Industrial</Text>
                                <Text style={{ fontSize: 15, color: Color.lightBlack, fontFamily: Poppins.SemiBold, lineHeight: 25, textAlign: 'justify', paddingVertical: 5 }}>Estate, SIDCO Industrial Estate, Guindy,</Text>
                                <Text style={{ fontSize: 15, color: Color.lightBlack, fontFamily: Poppins.SemiBold, lineHeight: 25, textAlign: 'justify', paddingVertical: 5 }}>Chennai, Tamil Nadu 600032</Text>
                                <Text style={{ fontSize: 15, color: Color.lightBlack, fontFamily: Poppins.SemiBold, lineHeight: 25, textAlign: 'justify', paddingVertical: 5 }}>India</Text>
                            </View>
                        </View>

                        <View style={{ width: '100%', marginTop: 10 }}>
                            <Text style={{ width: '100%', fontSize: 18, color: 'black', fontFamily: 'Poppins-SemiBold' }}>12. HOW CAN YOU REVIEW, UPDATE, OR DELETE THE DATA WE COLLECT FROM YOU?</Text>
                            <Text style={{ fontSize: 14, color: Color.cloudyGrey, fontFamily: Poppins.Medium, lineHeight: 25, textAlign: 'justify', paddingVertical: 5 }}>You have the right to request access to the personal information we collect from you, details about how we have processed it, correct inaccuracies, or delete your personal information. You may also have the right to withdraw your consent to our processing of your personal information. These rights may be limited in some circumstances by applicable law.</Text>
                            <Text style={{ fontSize: 14, color: Color.cloudyGrey, fontFamily: Poppins.Medium, lineHeight: 25, textAlign: 'justify' }}>To request to review, update, or delete your personal information, please visit: https://albionbankauctions.com/ </Text>


                            <Text style={{ fontSize: 14, color: '#333', fontFamily: 'Poppins-Regular', lineHeight: 25, textAlign: 'justify', paddingVertical: 5 }}>These terms and conditions outline the rules and regulations for the use of Company Name's Website, located at Website.com</Text>
                            <Text style={{ fontSize: 14, color: '#333', fontFamily: 'Poppins-Regular', lineHeight: 25, textAlign: 'justify' }}>By accessing this website we assume you accept these terms and conditions. Do not continue to use Website Name if you do not agree to take all of the terms and conditions stated on this page.</Text>
                            <Text style={{ fontSize: 14, color: '#333', fontFamily: 'Poppins-Regular', lineHeight: 25, textAlign: 'justify', paddingVertical: 5, }}>The following terminology applies to these Terms and Conditions, Privacy Statement and Disclaimer Notice and all Agreements: “Client”, “You” and “Your” refers to you, the person log on this website and compliant to the Company's terms and conditions. “The Company”, “Ourselves”, “We”, “Our” and “Us”, refers to our Company. “Party”, “Parties”, or “Us”, refers to both the Client and ourselves. All terms refer to the offer, acceptance and consideration of payment necessary to undertake the process of our assistance to the Client in the most appropriate manner for the express purpose of meeting the Client's needs in respect of provision of the Company's stated services, in accordance with and subject to, prevailing law of Netherlands. Any use of the above terminology or other words in the singular, plural, capitalization and/or he/she or they, are taken as interchangeable and therefore as referring to same.</Text>
                        </View>
                        <View style={{ width: '100%', }}>
                            <Text style={{ fontSize: 18, color: 'black', fontFamily: 'Poppins-SemiBold' }}>Cookies</Text>
                            <Text style={{ fontSize: 14, color: '#333', fontFamily: 'Poppins-Regular', lineHeight: 25, paddingVertical: 10, textAlign: 'justify' }}>We employ the use of cookies. By accessing Website Name, you agreed to use cookies in agreement with the Company Name's Privacy Policy.</Text>
                            <Text style={{ fontSize: 14, color: '#333', fontFamily: 'Poppins-Regular', lineHeight: 25, paddingVertical: 10, textAlign: 'justify', paddingVertical: 5 }}>Most interactive websites use cookies to let us retrieve the user's details for each visit. Cookies are used by our website to enable the functionality of certain areas to make it easier for people visiting our website. Some of our affiliate/advertising partners may also use cookies.</Text>
                        </View>
                    </View>

                    <View style={{ width: '100%', padding: 10 }}>
                        <Text style={{ fontSize: 18, color: 'black', fontFamily: 'Poppins-SemiBold' }}>License</Text>
                        <Text style={{ fontSize: 14, color: '#333', fontFamily: 'Poppins-Regular', lineHeight: 25, paddingVertical: 10, textAlign: 'justify', paddingVertical: 5 }}>Unless otherwise stated, Company Name and/or its licensors own the intellectual property rights for all material on Website Name. All intellectual property rights are reserved. You may access this from Website Name for your own personal use subjected to restrictions set in these terms and conditions.</Text>
                        <Text style={{ fontSize: 14, color: '#333', fontFamily: 'Poppins-SemiBold', lineHeight: 25, textAlign: 'justify' }}>You must not:</Text>

                        <View style={{ width: '100%', paddingVertical: 5, paddingHorizontal: 10 }}>
                            <View style={{ width: '100%', flexDirection: 'row', alignItems: 'center' }}>
                                <View style={{ width: 5, height: 5, backgroundColor: '#666', borderRadius: 50 }}></View>
                                <Text style={{ fontSize: 14, color: '#333', textAlign: 'justify', marginHorizontal: 10, fontFamily: 'Poppins-Regular', }}>Republish material from Website Name </Text>
                            </View>
                        </View>

                        <View style={{ width: '100%', paddingVertical: 5, paddingHorizontal: 10 }}>
                            <View style={{ width: '100%', flexDirection: 'row', alignItems: 'center' }}>
                                <View style={{ width: 5, height: 5, backgroundColor: '#666', borderRadius: 50 }}></View>
                                <Text style={{ fontSize: 14, color: '#333', textAlign: 'justify', marginHorizontal: 10, fontFamily: 'Poppins-Regular', }}>Sell, rent or sub-license material from Website Name</Text>
                            </View>
                        </View>
                        <View style={{ width: '100%', paddingVertical: 5, paddingHorizontal: 10 }}>
                            <View style={{ width: '100%', flexDirection: 'row', alignItems: 'center' }}>
                                <View style={{ width: 5, height: 5, backgroundColor: '#666', borderRadius: 50 }}></View>
                                <Text style={{ fontSize: 14, color: '#333', textAlign: 'justify', marginHorizontal: 10, fontFamily: 'Poppins-Regular', }}>Reproduce, duplicate or copy material from Website Name</Text>
                            </View>
                        </View>
                        <View style={{ width: '100%', paddingVertical: 5, paddingHorizontal: 10 }}>
                            <View style={{ width: '100%', flexDirection: 'row', alignItems: 'center' }}>
                                <View style={{ width: 5, height: 5, backgroundColor: '#666', borderRadius: 50 }}></View>
                                <Text style={{ fontSize: 14, color: '#333', textAlign: 'justify', marginHorizontal: 10, fontFamily: 'Poppins-Regular', }}>Redistribute content from Website Name</Text>
                            </View>
                        </View>
                        <View style={{ width: '100%', paddingVertical: 5, paddingHorizontal: 10 }}>
                            <View style={{ width: '100%', flexDirection: 'row', alignItems: 'center' }}>
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

                    <View style={{ width: '95%', padding: 0 }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Text style={{ fontSize: 18, color: 'black', fontFamily: 'Poppins-SemiBold' }}>iFrames</Text>
                        </View>
                        <Text style={{ fontSize: 14, color: '#333', fontFamily: 'Poppins-Regular', lineHeight: 25, paddingVertical: 10, textAlign: 'justify' }}>Without prior approval and written permission, you may not create frames around our Webpages that alter in any way the visual presentation or appearance of our Website.</Text>
                    </View>

                    <View style={{ width: '95%', padding: 0 }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Text style={{ fontSize: 18, color: 'black', fontFamily: 'Poppins-SemiBold' }}>Content Liability</Text>
                        </View>
                        <Text style={{ fontSize: 14, color: '#333', fontFamily: 'Poppins-Regular', lineHeight: 25, paddingTop: 10, textAlign: 'justify' }}>We shall not be hold responsible for any content that appears on your Website. You agree to protect and defend us against all claims that is rising on your Website. No link(s) should appear on any Website that may be interpreted as libelous, obscene or criminal, or which infringes, otherwise violates, or advocates the infringement or other violation of, any third party rights.</Text>
                    </View>

                    <View style={{ width: '95%', padding: 0 }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Text style={{ fontSize: 18, color: 'black', fontFamily: 'Poppins-SemiBold' }}>Reservation of Rights</Text>
                        </View>
                        <Text style={{ fontSize: 14, color: '#333', fontFamily: 'Poppins-Regular', lineHeight: 25, paddingVertical: 10, textAlign: 'justify' }}>We reserve the right to request that you remove all links or any particular link to our Website. You approve to immediately remove all links to our Website upon request. We also reserve the right to amen these terms and conditions and it's linking policy at any time. By continuously linking to our Website, you agree to be bound to and follow these linking terms and conditions.</Text>
                    </View>

                    <View style={{ width: '95%', padding: 0 }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Text style={{ fontSize: 18, color: 'black', fontFamily: 'Poppins-SemiBold' }}>Removal of links from our website</Text>
                        </View>
                        <Text style={{ fontSize: 14, color: '#333', fontFamily: 'Poppins-Regular', lineHeight: 25, paddingVertical: 10, textAlign: 'justify' }}>If you find any link on our Website that is offensive for any reason, you are free to contact and inform us any moment. We will consider requests to remove links but we are not obligated to or so or to respond to you directly.</Text>
                        <Text style={{ fontSize: 14, color: '#333', fontFamily: 'Poppins-Regular', lineHeight: 25, paddingVertical: 10, textAlign: 'justify' }}>We do not ensure that the information on this website is correct, we do not warrant its completeness or accuracy; nor do we promise to ensure that the website remains available or that the material on the website is kept up to date.</Text>
                    </View>


                    <View style={{ width: '100%', alignItems: 'center' }}>
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

                    <View style={{ width: '95%', flexDirection: 'row', alignItems: 'center', marginTop: 0 }}>
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

                    <View style={{ width: '95%', justifyContent: 'center', alignItems: 'center', marginTop: 10 }}>
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
});


//make this component available to the app
export default AuctionPrivacyPolicy;
