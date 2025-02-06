//import liraries
import { useNavigation, useRoute } from '@react-navigation/native';
import React, { useEffect, useState, useRef } from 'react';
import { ActivityIndicator, Image, Modal, StyleSheet } from 'react-native';
import {
    View,
    Text,
    TouchableOpacity,
    Animated,
    SectionList,
    Linking,
    FlatList,
    Dimensions,
    BackHandler,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import Color from '../../Config/Color';
import { Poppins } from '../../Global/FontFamily';
import { scr_height, scr_width } from '../../Utils/Dimensions';
import { Iconviewcomponent } from '../../Components/Icontag';
import { color } from 'react-native-elements/dist/helpers';
import { Media } from '../../Global/Media';
import { setPayCancelVisible, setPaySuccessVisible } from '../../Redux';
import common_fn from '../../Config/common_fn';
import RazorpayCheckout from 'react-native-razorpay';
import fetchData from '../../Config/fetchData';
import { Alert } from 'react-native';
import PostCompletedModal from './OrderCompletionModal';
import { base_auctionUrl } from '../../Config/base_url';

const { height, width } = Dimensions.get('screen');

// create a component
const AuctionPrime = () => {

    const routeName = useRoute();
    const dispatch = useDispatch();
    const navigation = useNavigation();
    const [loading, setLoading] = useState(true);
    const [requestModal, setRequestModal] = useState(false);
    const [selectedPlan, setSelectedPlan] = useState("");
    const [updateLoader, setUpdateLoader] = useState(false);

    const Auction_userData = useSelector(
        state => state.UserReducer.auctionUserData,
    );
    // var { id, name, email, phone_number, state, district } = Auction_userData;
    // console.log("id Prime ================== : ", id);

    const data = useSelector(
        state => state.UserReducer.auctionUserData,
    );

    const [Section] = useState([
        { id: 1, title: 'Categories', data: ['Categories'] },
        { id: 2, title: 'Banners', data: ['Banners'] },
    ]);

    const [planData, setPlanData] = useState([]);
    const [currentPlanId, setCurrentPlanId] = useState("");
    const [currentPlanStatus, setCurrentPlanStatus] = useState("");


    useEffect(() => {
        const backHandler = BackHandler.addEventListener('hardwareBackPress', handleBackButtonClick);
        return () => backHandler.remove();
    }, []);


    useEffect(() => {
        setLoading(true);
        getApiData().finally(() => {
            setLoading(false);
        });
    }, []);

    const getApiData = async () => {
        try {
            const myHeaders = new Headers();
            myHeaders.append("accept", "*/*");

            const requestOptions = {
                method: "GET",
                headers: myHeaders,
                redirect: "follow"
            };

            // fetch("http://192.168.29.204:5000/api/plan", requestOptions)
            fetch(`https://api.albionbankauctions.com/api/plan/${data?.id}`, requestOptions)
                .then((response) => response.json())
                .then((result) => {
                    console.log("Plan Data ------------------: ", result?.current_plan);
                    if (result?.message == "Data Fetched Successfully") {
                        setPlanData(result?.data);
                        setCurrentPlanId(result?.current_plan?.plan_id)
                        setCurrentPlanStatus(result?.current_plan?.status)
                        setLoading(false);
                    }
                    else {
                        setPlanData([]);
                        common_fn.showToast(result?.message);
                        setLoading(false);
                        console.log("Data cannot Fetch ", result?.message);
                    }
                })
                .catch((error) => console.error("catch in getApiData_APi", error));
        } catch (error) {
            console.log('catch in getApiData_Prime : ', error);
        }
    };

    function handleBackButtonClick() {
        if (routeName.name === 'ActionHome') {
            BackHandler.exitApp();
            return true;
        } else {
            navigation.goBack();
            return true;
        }
    }

    const subscribePlanClick = async (item, index) => {
        try {
            console.log("ITEM ================ :", JSON.stringify(item) + "INDEX --------------- :" + index);
            // if (item.id == 1) {

            if (item.id == 1) {
                const myHeaders = new Headers();
                myHeaders.append("accept", "*/*");
                myHeaders.append("Content-Type", "application/json");

                const raw = JSON.stringify({
                    "plan_id": item.id,
                    "user_id": data?.id
                });

                const requestOptions = {
                    method: "POST",
                    headers: myHeaders,
                    body: raw,
                    redirect: "follow"
                };

                fetch("https://api.albionbankauctions.com/api/plan", requestOptions)
                    .then((response) => response.json())
                    .then((result) => {
                        console.log("SUCCESS ================ :", result)
                        common_fn.showToast(result?.message);
                        dispatch(setPaySuccessVisible(true))
                    })
                    .catch((error) => console.error(error));

            }
            else {
                console.log("****************** Subscription plans ******************");
                try {
                    console.log("--------------------MONTH PLAN ---------------------");

                    setLoading(true);
                    const myHeaders = new Headers();
                    myHeaders.append("accept", "*/*");
                    myHeaders.append("Content-Type", "application/json");

                    var raw = JSON.stringify({
                        "plan_id": item.id,
                        "user_id": data?.id,
                        "total_gross_amount": item.price,
                        "gst": (item.price * 18) / 100,
                        "total_amount_payable": item.price + (item.price * 18) / 100
                    });

                    var requestOptions = {
                        method: "POST",
                        headers: myHeaders,
                        body: raw,
                        redirect: "follow"
                    };
                    console.log("FORM data ------------- : ", requestOptions);

                    // fetch("http://192.168.29.204:5000/api/plan", requestOptions)
                    fetch(base_auctionUrl + "api/plan", requestOptions)
                        .then((response) => response.json())
                        .then((result) => {
                            console.log("RESULT ============== : ", result);

                            if (result?.status == true) {
                                var razorpayOptions = result?.data?.data;
                                var plan_id = result?.data?.plan_id
                                var invoice_id = result?.data?.invoice_id
                                console.log("response data-------------:", result);
                                setLoading(true);
                                RazorpayCheckout.open(razorpayOptions)
                                    .then(async ({ razorpay_signature, razorpay_payment_id }) => {
                                        const myHeaders = new Headers();
                                        myHeaders.append("accept", "*/*");
                                        myHeaders.append("x-razorpay-signature", razorpay_signature);
                                        myHeaders.append("Content-Type", "application/json");

                                        const raw = JSON.stringify({
                                            "order_id": razorpayOptions?.order_id,
                                            "payment_id": razorpay_payment_id,
                                            "plan_id": plan_id,
                                            "invoice_id": invoice_id
                                        });

                                        const requestOptions = {
                                            method: "PUT",
                                            headers: myHeaders,
                                            body: raw,
                                            redirect: "follow"
                                        };

                                        console.log("requestOptions ********************* : ", requestOptions);

                                        // fetch("http://192.168.29.204:5000/api/plan/verify", requestOptions)
                                        fetch(base_auctionUrl + "api/plan/verify", requestOptions)
                                            .then((response) => response.json())
                                            .then((result) => {
                                                console.log("placeOrder ======================:", result);
                                                dispatch(setPaySuccessVisible(true));
                                                common_fn.showToast(result?.message);
                                                navigation?.replace('ActionHome');
                                                setLoading(false);
                                            })
                                            .catch((error) => {
                                                console.error('Error in RazorpayCheckout:', error);
                                                dispatch(setPayCancelVisible(true));
                                                common_fn.showToast('Payment failed. Please try again.');
                                                navigation?.replace('ActionHome');
                                                setLoading(false);
                                            });
                                    })
                                    .catch((error) => {
                                        // Alert.alert("Payment Failed", error.description);
                                        console.error("Payment Failed:", error);
                                        dispatch(setPayCancelVisible(true));
                                        common_fn.showToast('Payment failed. Please try again.');
                                        navigation?.replace('ActionHome');
                                        setLoading(false);
                                    });

                            } else {
                                console.log("result?.message===========================", result)
                                common_fn.showToast(result?.message);
                                setLoading(false);
                            }
                            // console.log("SUCCESS RESP =============: ", result)
                        })
                        .catch((error) => {
                            setLoading(false);
                            console.error("catch in ", error);
                        });

                } catch (error) {
                    setLoading(false);
                    console.error("Unexpected Error:", error);
                }
            }

        } catch (error) {
            console.log('catch in subscribe_PlanClick_Prime : ', error);
        }
    }


    return (
        <View style={styles.container}>
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
                <SectionList
                    sections={Section}
                    scrollEnabled={true}
                    keyExtractor={(item, index) => item + index}
                    showsVerticalScrollIndicator={false}
                    scrollEventThrottle={1}
                    contentContainerStyle={{ padding: 5, flexGrow: 1 }}
                    nestedScrollEnabled
                    initialNumToRender={5}
                    renderItem={({ item, index }) => {
                        switch (item) {
                            case 'Categories':
                                return (
                                    <View style={{ width: '100%', alignItems: 'center' }}>
                                        <Text style={{ textAlign: 'justify', fontSize: 14, color: Color.cloudyGrey, fontFamily: Poppins.Medium, letterSpacing: 0.5, lineHeight: 22, paddingHorizontal: 5, marginTop: 10 }}>Gain access to premium features and detailed property insights with your subscription plan.</Text>
                                        <View style={{ width: '100%', alignItems: 'center', marginVertical: 10 }}>
                                            <FlatList
                                                data={planData}
                                                keyExtractor={(item, index) => item + index}
                                                renderItem={({ item, index }) => {
                                                    const isActive = item.id === currentPlanId; // Check if the plan is active
                                                    console.log("isActive-------------------- :", isActive + " item.description ============ :" + item.description);

                                                    const getBackgroundColor = (description) => {
                                                        switch (description) {
                                                            case "Free plan":
                                                                return "#008B89";
                                                            case "plan_3M":
                                                                return "#BF2156"; // Ensure Color.primary is defined
                                                            case "plan_6M":
                                                                return "#DFA53C";
                                                            case "plan_12M":
                                                                return "#9D53D4";
                                                            default:
                                                                return Color.white; // Fallback color
                                                        }
                                                    };

                                                    return (
                                                        <View style={{ width: '100%', alignItems: 'center', backgroundColor: isActive ? Color.primary : Color.white, borderWidth: 1, borderColor: Color.cloudyGrey, borderRadius: 5, margin: 5, marginVertical: 10, padding: 10 }}>
                                                            <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 5 }}>
                                                                <View style={{ flex: 1, justifyContent: 'flex-start', alignItems: 'flex-start' }}>
                                                                    <Text style={{ fontSize: 18, color: isActive ? Color.white : Color.black, fontWeight: 'bold' }}>{item.name}</Text>
                                                                </View>
                                                                <View style={{ backgroundColor: "#D49727", padding: 7, paddingHorizontal: 20, borderRadius: 30 }}>
                                                                    <Text style={{ fontSize: 14, color: Color.white }}>{item.description == "Free plan" ? "Free" : "Pro"}</Text>
                                                                </View>
                                                            </View>
                                                            <View style={{ width: '100%', paddingVertical: 5 }}>
                                                                <View style={{ width: '100%', flexDirection: 'row', alignItems: 'center', paddingVertical: 5 }}>
                                                                    <Iconviewcomponent
                                                                        Icontag={'Ionicons'}
                                                                        iconname={item.whatsapp_alert != "--" ? 'checkmark-sharp' : "close"}
                                                                        icon_size={25}
                                                                        icon_color={isActive ? Color.white : Color.black}
                                                                    />
                                                                    <Text style={{ textAlign: 'justify', fontSize: 14, color: isActive ? Color.white : Color.black, fontFamily: Poppins.Medium, letterSpacing: 0.5, paddingHorizontal: 10 }} numberOfLines={1}>{item.whatsapp_alert != "--" && item.whatsapp_alert.trim() ? item.whatsapp_alert : "WhatsApp Alert"}</Text>
                                                                </View>
                                                                <View style={{ width: '100%', flexDirection: 'row', alignItems: 'center', paddingVertical: 5 }}>
                                                                    <Iconviewcomponent
                                                                        Icontag={'Ionicons'}
                                                                        iconname={item.daily_notification != "--" ? 'checkmark-sharp' : "close"}
                                                                        icon_size={25}
                                                                        icon_color={isActive ? Color.white : Color.black}
                                                                    />
                                                                    <Text style={{ textAlign: 'left', fontSize: 14, color: isActive ? Color.white : Color.black, fontFamily: Poppins.Medium, letterSpacing: 0.5, paddingHorizontal: 10 }} numberOfLines={1}>{item.daily_notification != "--" ? item.daily_notification : "Daily Notification Via App"}</Text>
                                                                </View>
                                                                <View style={{ width: '100%', flexDirection: 'row', alignItems: 'center', paddingVertical: 5 }}>
                                                                    <Iconviewcomponent
                                                                        Icontag={'Ionicons'}
                                                                        iconname={item.complete_auction != "--" && item.complete_auction.trim() !== "" ? 'checkmark-sharp' : "close"}
                                                                        icon_size={25}
                                                                        icon_color={isActive ? Color.white : Color.black}
                                                                    />
                                                                    <Text style={{ textAlign: 'justify', fontSize: 14, color: isActive ? Color.white : Color.black, fontFamily: Poppins.Medium, letterSpacing: 0.5, paddingHorizontal: 10 }} numberOfLines={1}>
                                                                        {item.complete_auction != "--" && item.complete_auction.trim() !== "" ? item.complete_auction : "Complete Auction Details"}
                                                                    </Text>
                                                                </View>
                                                                <View style={{ width: '100%', flexDirection: 'row', alignItems: 'center', paddingVertical: 5 }}>
                                                                    <Iconviewcomponent
                                                                        Icontag={'Ionicons'}
                                                                        iconname={item.auction_document != "--" ? 'checkmark-sharp' : "close"}
                                                                        icon_size={25}
                                                                        icon_color={isActive ? Color.white : Color.black}
                                                                    />
                                                                    <Text style={{ textAlign: 'justify', fontSize: 14, color: isActive ? Color.white : Color.black, fontFamily: Poppins.Medium, letterSpacing: 0.5, paddingHorizontal: 10 }} numberOfLines={1}>{item.auction_document != "--" ? item.auction_document : "Auction Document & Notice"}</Text>
                                                                </View>
                                                                <View style={{ width: '100%', flexDirection: 'row', alignItems: 'center', paddingVertical: 5 }}>
                                                                    <Iconviewcomponent
                                                                        Icontag={'Ionicons'}
                                                                        iconname={item.download_property != "--" ? 'checkmark-sharp' : "close"}
                                                                        icon_size={25}
                                                                        icon_color={isActive ? Color.white : Color.black}
                                                                    />
                                                                    <Text style={{ textAlign: 'justify', fontSize: 14, color: isActive ? Color.white : Color.black, fontFamily: Poppins.Medium, letterSpacing: 0.5, paddingHorizontal: 10 }} numberOfLines={1}>{item.download_property != "--" ? item.download_property : "Download Property Pictures"}</Text>
                                                                </View>
                                                                <View style={{ width: '100%', flexDirection: 'row', alignItems: 'center', paddingVertical: 5 }}>
                                                                    <Iconviewcomponent
                                                                        Icontag={'Ionicons'}
                                                                        iconname={item.property_location != "--" ? 'checkmark-sharp' : "close"}
                                                                        icon_size={25}
                                                                        icon_color={isActive ? Color.white : Color.black}
                                                                    />
                                                                    <Text style={{ textAlign: 'justify', fontSize: 14, color: isActive ? Color.white : Color.black, fontFamily: Poppins.Medium, letterSpacing: 0.5, paddingHorizontal: 10 }} numberOfLines={1}>{item.property_location != "--" ? item.property_location : "Property Location"}</Text>
                                                                </View>
                                                                <View style={{ width: '100%', flexDirection: 'row', alignItems: 'center', paddingVertical: 5 }}>
                                                                    <Iconviewcomponent
                                                                        Icontag={'Ionicons'}
                                                                        iconname={item.email_support != "--" ? 'checkmark-sharp' : "close"}
                                                                        icon_size={25}
                                                                        icon_color={isActive ? Color.white : Color.black}
                                                                    />
                                                                    <Text style={{ textAlign: 'justify', fontSize: 14, color: isActive ? Color.white : Color.black, fontFamily: Poppins.Medium, letterSpacing: 0.5, paddingHorizontal: 10 }} numberOfLines={1}>{item.email_support != "--" ? item.email_support : "Email Support"}</Text>
                                                                </View>
                                                                <View style={{ width: '100%', flexDirection: 'row', alignItems: 'center', paddingVertical: 5 }}>
                                                                    <Iconviewcomponent
                                                                        Icontag={'Ionicons'}
                                                                        iconname={item.auction_history != "--" ? 'checkmark-sharp' : "close"}
                                                                        icon_size={25}
                                                                        icon_color={isActive ? Color.white : Color.black}
                                                                    />
                                                                    <Text style={{ textAlign: 'justify', fontSize: 14, color: isActive ? Color.white : Color.black, fontFamily: Poppins.Medium, letterSpacing: 0.5, paddingHorizontal: 10 }} numberOfLines={1}>{item.auction_history != "--" ? item.auction_history : "Auction History"}</Text>
                                                                </View>
                                                                <View style={{ width: '100%', flexDirection: 'row', alignItems: 'center', paddingVertical: 5 }}>
                                                                    <Iconviewcomponent
                                                                        Icontag={'Ionicons'}
                                                                        iconname={item.relationship_manager != "--" ? 'checkmark-sharp' : "close"}
                                                                        icon_size={25}
                                                                        icon_color={isActive ? Color.white : Color.black}
                                                                    />
                                                                    <Text style={{ textAlign: 'justify', fontSize: 14, color: isActive ? Color.white : Color.black, fontFamily: Poppins.Medium, letterSpacing: 0.5, paddingHorizontal: 10 }} numberOfLines={1}>{item.relationship_manager != "--" ? item.relationship_manager : "Relationship Manager Assist"}</Text>
                                                                </View>
                                                            </View>
                                                            <View style={{ width: '100%', height: 0.5, backgroundColor: Color.cloudyGrey, marginVertical: 10 }}></View>
                                                            <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginVertical: 5 }}>
                                                                <View style={{ flex: 1, justifyContent: 'flex-start', alignItems: 'flex-start' }}>
                                                                    <Text style={{ paddingHorizontal: 20, fontSize: 22, color: isActive ? Color.white : Color.black, fontFamily: Poppins.SemiBold }}>₹ {item.price}</Text>
                                                                </View>
                                                                <View style={{ flex: 1, width: '100%', justifyContent: 'flex-end', alignItems: 'flex-end' }}>
                                                                    <TouchableOpacity
                                                                        disabled={item.description === "Free plan"}
                                                                        onPress={() => {
                                                                            setSelectedPlan(item);
                                                                            setRequestModal(true);
                                                                            // subscribePlanClick(item, index)
                                                                        }}
                                                                        style={{ width: '90%', height: 45, backgroundColor: isActive ? Color.white : Color.primary, borderRadius: 30, justifyContent: 'center', alignItems: 'center' }}>
                                                                        <Text style={{ fontSize: 14, color: isActive ? Color.black : Color.white, fontFamily: Poppins.SemiBold }}>{isActive ? "Activated" : "Subscribe"}</Text>
                                                                    </TouchableOpacity>
                                                                </View>
                                                            </View>
                                                        </View>
                                                    )
                                                }}
                                                ListEmptyComponent={() => {
                                                    return (
                                                        <View
                                                            style={{
                                                                alignItems: 'center',
                                                                justifyContent: 'center',
                                                                marginVertical: 10,
                                                                width: '100%',
                                                                height: scr_height / 1.5
                                                            }}>
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
                                                                Plan Details Not Found
                                                            </Text>
                                                        </View>
                                                    );
                                                }}
                                                style={{ width: '95%' }}
                                            />
                                        </View>
                                    </View>
                                );
                        }
                    }}
                />


            )}

            <Modal visible={requestModal} transparent animationType="slide">
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
                            padding: 5,
                            borderRadius: 10,
                        }}>

                        <View style={{ width: '100%', justifyContent: 'flex-start', alignItems: 'center' }}>
                            <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 10 }}>
                                <View style={{ flex: 2, justifyContent: 'flex-start', alignItems: 'flex-start' }}>
                                    <Text style={{ width: '100%', fontSize: 20, color: Color.black, fontFamily: Poppins.SemiBold, paddingHorizontal: 10 }}>Proceed to Pay</Text>
                                </View>
                                <View style={{ flex: 1, justifyContent: 'flex-end', alignItems: 'flex-end', paddingHorizontal: 10 }}>
                                    <TouchableOpacity onPress={() => {
                                        setRequestModal(false);
                                    }}>
                                        <Iconviewcomponent
                                            Icontag={'AntDesign'}
                                            iconname={"closecircleo"}
                                            icon_size={25}
                                            icon_color={Color.black}
                                        />
                                    </TouchableOpacity>
                                </View>
                            </View>
                            <View style={{ width: '95%', alignItems: 'center', }}>
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <View style={{ flex: 1, justifyContent: 'flex-start', alignItems: 'flex-start' }}>
                                        <Text style={{ fontSize: 14, color: Color.cloudyGrey, fontFamily: Poppins.SemiBold, letterSpacing: 0.5 }}>Plan Price</Text>
                                    </View>
                                    <View style={{ flex: 1, justifyContent: 'flex-start', alignItems: 'flex-start' }}>
                                        <Text style={{ fontSize: 15, color: Color.lightBlack, fontFamily: Poppins.SemiBold, letterSpacing: 0.5 }}>{selectedPlan?.price}</Text>
                                    </View>
                                </View>
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 5 }}>
                                    <View style={{ flex: 1, justifyContent: 'flex-start', alignItems: 'flex-start' }}>
                                        <Text style={{ fontSize: 14, color: Color.cloudyGrey, fontFamily: Poppins.SemiBold, letterSpacing: 0.5 }}>GST</Text>
                                    </View>
                                    <View style={{ flex: 1, justifyContent: 'flex-start', alignItems: 'flex-start' }}>
                                        <Text style={{ fontSize: 15, color: Color.lightBlack, fontFamily: Poppins.SemiBold, letterSpacing: 0.5 }}>{(selectedPlan?.price * 18) / 100}</Text>
                                    </View>
                                </View>
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 5 }}>
                                    <View style={{ flex: 1, justifyContent: 'flex-start', alignItems: 'flex-start' }}>
                                        <Text style={{ fontSize: 14, color: Color.cloudyGrey, fontFamily: Poppins.SemiBold, letterSpacing: 0.5 }}>Total Price</Text>
                                    </View>
                                    <View style={{ flex: 1, justifyContent: 'flex-start', alignItems: 'flex-start' }}>
                                        <Text style={{ fontSize: 15, color: Color.lightBlack, fontFamily: Poppins.SemiBold, letterSpacing: 0.5 }}>{selectedPlan?.price + (selectedPlan?.price * 18) / 100}</Text>
                                    </View>
                                </View>
                            </View>

                            <TouchableOpacity onPress={() => {
                                setRequestModal(false);
                                subscribePlanClick(selectedPlan)
                            }}
                                style={{ width: '95%', height: 50, backgroundColor: Color.primary, borderRadius: 40, justifyContent: 'center', alignItems: 'center', marginVertical: 10 }}>
                                {loading ? (
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
                    </View>
                </View>
            </Modal>
            {/* <PostCompletedModal navigation={navigation} /> */}
        </View>
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
    },
});

//make this component available to the app
export default AuctionPrime;