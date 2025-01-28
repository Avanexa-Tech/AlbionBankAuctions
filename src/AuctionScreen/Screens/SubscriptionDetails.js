//import liraries
import React, { useEffect, useState } from 'react';
import {
    View,
    StyleSheet,
    Text,
    ScrollView, TouchableOpacity,
    Alert,
    Image,
    Dimensions
} from 'react-native';
import Color from '../../Config/Color';
import { scr_height, scr_width } from '../../Utils/Dimensions';
import { Poppins } from '../../Global/FontFamily';
import { Iconviewcomponent } from '../../Components/Icontag';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import moment from 'moment';
import { Media } from '../../Global/Media';

const { height, width } = Dimensions.get('screen');

// create a component
const SubscriptionDetails = () => {

    // const Auction_userData = useSelector(
    //     state => state.UserReducer.auctionUserData,
    // );
    // var { id, name, email, phone_number, state, district } = Auction_userData;

    const data = useSelector(
        state => state.UserReducer.auctionUserData,
    );

    const navigation = useNavigation();
    const [expireDate, setExpireDate] = useState('')
    const [planStatus, setPlanStatus] = useState('')
    const [planDayStatus, setPlanDayStatus] = useState('')
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        plan_CheckData().finally(() => {
            setLoading(false);
        });
    }, []);

    const plan_CheckData = async () => {
        try {
            setLoading(true);
            const myHeaders = new Headers();
            myHeaders.append("accept", "*/*");

            const requestOptions = {
                method: "GET",
                headers: myHeaders,
                redirect: "follow"
            };
            // console.log("plan check -------------", data?.id);

            // fetch(`http://192.168.29.204:5000/api/plan/user?user_id=${data?.id}`, requestOptions)
            fetch(`https://api.albionbankauctions.com/api/plan/user?user_id=${data?.id}`, requestOptions)
                .then((response) => response.json())
                .then((result) => {
                    // console.log("resultdata -----------------:", result)
                    if (result?.status == true) {
                        // console.log("subscription data -----------------:", result?.data[0]?.Plan)
                        setExpireDate(moment(result?.data[0]?.expires_at).format('DD-MM-YYYY'));
                        setPlanStatus(result?.data[0]?.plan_id);
                        setPlanDayStatus(result?.data[0]?.Plan);
                        setLoading(false);
                    }
                }
                )
                .catch((error) => console.error(error));

        } catch (error) {
            console.log("catch in plan_CheckData_Home : ", error);
            setLoading(false);
        }
    }


    const cancelMemberClick = () => {
        try {
            Alert.alert(
                'Cancel Membership',
                'Do You Want To Cancel The Membership Plan?',
                [
                    { text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel' },
                    { text: 'OK', onPress: () => console.log('OK Pressed') },
                ]
            )
        } catch (error) {
            console.log("catch in cancelMember_Click : ", error);

        }
    }

    // console.log("PLAN DATA =---------------------- : ", planDayStatus?.whatsapp_alert);


    return (
        <ScrollView
            contentContainerStyle={styles.scrollContent}
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false} >
            {loading ? (
                <View
                    style={{
                        alignItems: 'center',
                        justifyContent: 'center',
                        height: height,
                    }}>
                    <Image
                        source={{ uri: Media.loader }}
                        style={{ width: 80, height: 80, resizeMode: 'contain' }}
                    />
                </View>
            ) : (
                <View style={styles.container}>
                    <View style={{ width: '95%', padding: 10, marginTop: 10 }}>
                        <Text style={{ textAlign: 'left', fontSize: 16, color: Color.lightBlack, fontFamily: Poppins.SemiBold, letterSpacing: 0.5 }}>Current Plan</Text>
                        <Text style={{ textAlign: 'justify', fontSize: 13, color: Color.lightBlack, fontFamily: Poppins.Medium, letterSpacing: 0.5, lineHeight: 22 }}>Thank you for being a valued member of the Auction family.</Text>
                    </View>
                    <View style={{ width: '95%', padding: 10, justifyContent: 'flex-start', alignItems: 'flex-start', borderWidth: 2, borderColor: '#F3EAE4', borderRadius: 5, marginVertical: 10 }}>
                        <View style={{ padding: 7, paddingHorizontal: 20, backgroundColor: '#E5EAEE', borderRadius: 50, marginVertical: 10 }}>
                            <Text style={{ fontSize: 13, color: Color.black, fontFamily: Poppins.SemiBold }}> {planStatus == 1 ? "Free Plan" : planStatus == 2 ? "3 Months Plan" : planStatus == 3 ? "6 Months Plan" : planStatus == 4 ? "12 Months Plan" : null}</Text>
                        </View>
                        <View style={{ margin: 5 }}>
                            <Text style={{ fontSize: 14, color: Color.black, fontFamily: Poppins.SemiBold, letterSpacing: 0.5, paddingVertical: 5 }}>{planDayStatus?.name}</Text>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <Text style={{ fontSize: 13, color: Color.cloudyGrey, fontFamily: Poppins.Medium, letterSpacing: 0.5 }}>Expiring on - </Text>
                                <Text style={{ fontSize: 14, color: Color.lightBlack, fontFamily: Poppins.SemiBold, letterSpacing: 0.5 }}>{expireDate}</Text>
                            </View>
                        </View>
                        <View style={{ width: '100%', height: 1, backgroundColor: '#F3EAE4', marginVertical: 10 }}></View>
                        <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginVertical: 10 }}>
                            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                                <TouchableOpacity onPress={() => cancelMemberClick()}>
                                    <Text style={{ fontSize: 13, color: Color.cloudyGrey, fontFamily: Poppins.SemiBold, letterSpacing: 0.5 }}>Cancel Membership</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                                <TouchableOpacity onPress={() => navigation.navigate("AuctionPrime")} style={{ width: '90%', height: 45, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', backgroundColor: Color.primary, borderRadius: 30 }}>
                                    <Text style={{ fontSize: 13, color: Color.white, fontFamily: Poppins.SemiBold, paddingHorizontal: 5 }}>Upgrade Plan</Text>
                                    <Iconviewcomponent
                                        Icontag={'Ionicons'}
                                        iconname={"chevron-forward-outline"}
                                        icon_size={20}
                                        icon_color={Color.white}
                                    />
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                    <View style={{ width: '95%', padding: 10, marginVertical: 5 }}>
                        <Text style={{ textAlign: 'left', fontSize: 16, color: Color.primary, fontFamily: Poppins.SemiBold, letterSpacing: 0.5 }}>Plan Benefits</Text>

                        <View style={{ width: '100%', marginVertical: 10 }}>
                            <View style={{ width: '100%', flexDirection: 'row', alignItems: 'center', paddingVertical: 10 }}>
                                <Iconviewcomponent
                                    Icontag={'Ionicons'}
                                    iconname={planDayStatus?.whatsapp_alert != "--" ? 'checkmark-sharp' : "close"}
                                    icon_size={25}
                                    icon_color={Color.black}
                                />
                                <Text style={{ textAlign: 'justify', fontSize: 14, color: Color.black, fontFamily: Poppins.Medium, letterSpacing: 0.5, paddingHorizontal: 10 }} numberOfLines={1}>
                                    {planDayStatus?.whatsapp_alert != "--" ? planDayStatus?.whatsapp_alert : "WhatsApp Alert"}</Text>
                            </View>

                            <View style={{ width: '100%', flexDirection: 'row', alignItems: 'center', paddingVertical: 10 }}>
                                <Iconviewcomponent
                                    Icontag={'Ionicons'}
                                    iconname={planDayStatus?.daily_notification != "--" ? 'checkmark-sharp' : "close"}
                                    icon_size={25}
                                    icon_color={Color.black}
                                />
                                <Text style={{ textAlign: 'justify', fontSize: 14, color: Color.black, fontFamily: Poppins.Medium, letterSpacing: 0.5, paddingHorizontal: 10 }} numberOfLines={1}>{planDayStatus?.daily_notification != "--" ? planDayStatus?.daily_notification : "Daily Notification Via App"}</Text>
                            </View>

                            <View style={{ width: '100%', flexDirection: 'row', alignItems: 'center', paddingVertical: 10 }}>
                                <Iconviewcomponent
                                    Icontag={'Ionicons'}
                                    iconname={planDayStatus?.complete_auction != "--" ? 'checkmark-sharp' : "close"}
                                    icon_size={25}
                                    icon_color={Color.black}
                                />
                                <Text style={{ textAlign: 'justify', fontSize: 14, color: Color.black, fontFamily: Poppins.Medium, letterSpacing: 0.5, paddingHorizontal: 10 }} numberOfLines={1}>{planDayStatus?.complete_auction != "--" ? planDayStatus?.complete_auction : "Complete Auction Details"}</Text>
                            </View>

                            <View style={{ width: '100%', flexDirection: 'row', alignItems: 'center', paddingVertical: 10 }}>
                                <Iconviewcomponent
                                    Icontag={'Ionicons'}
                                    iconname={planDayStatus?.auction_document != "--" ? 'checkmark-sharp' : "close"}
                                    icon_size={25}
                                    icon_color={Color.black}
                                />
                                <Text style={{ textAlign: 'justify', fontSize: 14, color: Color.black, fontFamily: Poppins.Medium, letterSpacing: 0.5, paddingHorizontal: 10 }} numberOfLines={1}>{planDayStatus?.auction_document != "--" ? planDayStatus?.auction_document : "Auction Document & Notification"}</Text>
                            </View>

                            <View style={{ width: '100%', flexDirection: 'row', alignItems: 'center', paddingVertical: 10 }}>
                                <Iconviewcomponent
                                    Icontag={'Ionicons'}
                                    iconname={planDayStatus?.download_property != "--" ? 'checkmark-sharp' : "close"}
                                    icon_size={25}
                                    icon_color={Color.black}
                                />
                                <Text style={{ textAlign: 'justify', fontSize: 14, color: Color.black, fontFamily: Poppins.Medium, letterSpacing: 0.5, paddingHorizontal: 10 }} numberOfLines={1}>{planDayStatus?.download_property != "--" ? planDayStatus?.download_property : "Download Property Pictures"}</Text>
                            </View>

                            <View style={{ width: '100%', flexDirection: 'row', alignItems: 'center', paddingVertical: 10 }}>
                                <Iconviewcomponent
                                    Icontag={'Ionicons'}
                                    iconname={planDayStatus?.property_location != "--" ? 'checkmark-sharp' : "close"}
                                    icon_size={25}
                                    icon_color={Color.black}
                                />
                                <Text style={{ textAlign: 'justify', fontSize: 14, color: Color.black, fontFamily: Poppins.Medium, letterSpacing: 0.5, paddingHorizontal: 10 }} numberOfLines={1}>{planDayStatus?.property_location != "--" ? planDayStatus?.property_location : "Property Location"}</Text>
                            </View>

                            <View style={{ width: '100%', flexDirection: 'row', alignItems: 'center', paddingVertical: 10 }}>
                                <Iconviewcomponent
                                    Icontag={'Ionicons'}
                                    iconname={planDayStatus?.email_support != "--" ? 'checkmark-sharp' : "close"}
                                    icon_size={25}
                                    icon_color={Color.black}
                                />
                                <Text style={{ textAlign: 'justify', fontSize: 14, color: Color.black, fontFamily: Poppins.Medium, letterSpacing: 0.5, paddingHorizontal: 10 }} numberOfLines={1}>{planDayStatus?.email_support != "--" ? planDayStatus?.email_support : "Email Support"}</Text>
                            </View>

                            <View style={{ width: '100%', flexDirection: 'row', alignItems: 'center', paddingVertical: 10 }}>
                                <Iconviewcomponent
                                    Icontag={'Ionicons'}
                                    iconname={planDayStatus?.auction_history != "--" ? 'checkmark-sharp' : "close"}
                                    icon_size={25}
                                    icon_color={Color.black}
                                />
                                <Text style={{ textAlign: 'justify', fontSize: 14, color: Color.black, fontFamily: Poppins.Medium, letterSpacing: 0.5, paddingHorizontal: 10 }} numberOfLines={1}>{planDayStatus?.auction_history != "--" ? planDayStatus?.auction_history : "Auction History"}</Text>
                            </View>

                            <View style={{ width: '100%', flexDirection: 'row', alignItems: 'center', paddingVertical: 10 }}>
                                <Iconviewcomponent
                                    Icontag={'Ionicons'}
                                    iconname={planDayStatus?.relationship_manager != "--" ? 'checkmark-sharp' : "close"}
                                    icon_size={25}
                                    icon_color={Color.black}
                                />
                                <Text style={{ textAlign: 'justify', fontSize: 14, color: Color.black, fontFamily: Poppins.Medium, letterSpacing: 0.5, paddingHorizontal: 10 }} numberOfLines={1}>{planDayStatus?.relationship_manager != "--" ? planDayStatus?.relationship_manager : "Relationship Manager Assist"}</Text>
                            </View>
                        </View>
                    </View>
                </View>
            )}
        </ScrollView >
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: scr_width,
        height: scr_height,
        alignItems: 'center',
        backgroundColor: Color.white,
        marginBottom: 50
    },
    scrollContent: {
        flexGrow: 1, // Ensures the content can grow and scroll when necessary
        alignItems: 'center', // Centers child components horizontally
        justifyContent: 'flex-start', // Aligns child components at the top
        padding: 0, // Adds padding inside the ScrollView
        backgroundColor: Color.white, // Keeps the background consistent
    },
});

//make this component available to the app
export default SubscriptionDetails;
