import React, { useEffect, useRef, useState } from "react"
import { Alert, Image, Keyboard, Modal, Platform, Pressable, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View } from "react-native"
import { Button } from "react-native-elements";
import DeviceInfo from "react-native-device-info";
import { useNavigation } from "@react-navigation/native";
import messaging, { firebase } from '@react-native-firebase/messaging';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useDispatch } from "react-redux";
import { profileCompletion } from "../Utils/utils";
import { RESULTS } from "react-native-permissions";
import { KeyboardAvoidingView } from "react-native";
import common_fn from "../../Config/common_fn";
import fetchData from "../../Config/fetchData";
import Color from "../../Config/Color";
import { Media } from "../../Global/Media";
import { setActionUserData, setLoginType } from "../../Redux";
import OTPInput from "../../Components/OTPInput";

const DismissKeyboard = ({ children }) => (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        {children}
    </TouchableWithoutFeedback>
);

const AuctionBottomLogin = ({ login, setLogin }) => {
    const navigation = useNavigation()
    const [number, setNumber] = useState('');
    const [error, setError] = useState(false);
    const [uniqueId, setUniqueId] = useState(false);
    const [userInfo, setUserInfo] = useState(false);
    const [otpVisible, setOTPVisible] = useState(false)
    const [height] = useState(undefined)
    const [visible, setVisible] = useState(false)
    const inputRef = useRef();
    const [otpCode, setOTPCode] = useState('');
    const [isPinReady, setIsPinReady] = useState(false);
    const maximumCodeLength = 4;
    const [minutes, setMinutes] = useState(0);
    const [seconds, setSeconds] = useState(30);
    const [loading, setLoading] = useState(false);
    const [token, setToken] = useState('');
    const dispatch = useDispatch();
    const [percentage, setPercentage] = useState(0);

    const chkNumber = number => {
        setNumber(number);
        if (number.length == 10) {
            Keyboard.dismiss();
        }
    };

    useEffect(() => {
        DeviceInfo.getUniqueId().then(uniqueId => {
            setUniqueId(uniqueId);
        });
    }, [uniqueId]);

    const verifyLoginData = async () => {
        if (number.length == 10) {
            const login = await fetchData.Auction_OTPlogin({
                phone_number: number
            });
            var { message, status } = login;
            if (message == "Success") {
                if (Platform.OS === 'android') {
                    common_fn.showToast('OTP Sent Successfully');
                } else {
                    Alert.alert("OTP Sent Successfully")
                }
                setOTPVisible(true)
                setNumber(number)
            } else {
                var msg = message;
                setError(msg);
                setNumber("")
            }
        } else {
            if (Platform.OS === 'android') {
                common_fn.showToast('Invalid Phone Number, Please Enter Your 10 Digit Phone Number');
            } else {
                Alert.alert("Invalid Phone Number, Please Enter Your 10 Digit Phone Number")
            }
        }
    };

    useEffect(() => {
        const interval = setInterval(() => {
            if (seconds > 0) {
                setSeconds(seconds - 1);
            }
            if (seconds === 0) {
                if (minutes === 0) {
                    clearInterval(interval);
                } else {
                    setSeconds(30);
                    setMinutes(minutes - 1);
                }
            }
        }, 1000);

        return () => {
            clearInterval(interval);
        };
    }, [seconds]);

    const ResendOTP = async number => {
        setSeconds(30);
        const ResendOtpVerify = await fetchData.Auction_OTPlogin({
            phone_number: number
        });
        var { message, user_id } = ResendOtpVerify;
        if (user_id) {
            if (Platform.OS === 'android') {
                common_fn.showToast('OTP Sent Successfully');
            } else {
                Alert.alert('OTP Sent Successfully')
            }
        } else {
            var msg = 'message';
            setError(msg);
        }
    };

    const chkOTPError = OTP => {
        let reg = /^[6-9][0-9]*$/;

        if (OTP.length === 0) {
            setError('Enter Your OTP Code');
        } else if (reg.test(OTP) === false) {
            setError(false);
            setError(false);
        } else if (reg.test(OTP) === true) {
            setError('');
        }
    };

    const requestUserPermission = async () => {
        const authStatus = await messaging().requestPermission({
            alert: true,
            sound: true,
            badge: true,
            provisional: true,
        });
        const enabled =
            authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
            authStatus === messaging.AuthorizationStatus.PROVISIONAL;
        if (enabled) {
            getFCMToken();
        }
    };

    useEffect(() => {
        requestUserPermission();
    }, [token]);

    const getFCMToken = async () => {
        try {
            let fcmToken = await AsyncStorage.getItem('fcmToken');
            if (!fcmToken) {
                try {
                    const refreshToken = await messaging().getToken();
                    if (refreshToken) {
                        setToken(refreshToken);
                        await AsyncStorage.setItem('fcmToken', refreshToken);
                    } else {
                    }
                } catch (error) {
                    console.log('Error fetching token :', error);
                }
            } else {
                await AsyncStorage.setItem('fcmToken', fcmToken);
                setToken(fcmToken);
            }
        } catch (error) {
            console.log('Catch in getFcmToken  : ', error);
        }
    };

    async function locationTrack() {
        try {
            const result = await requestPermissionTransparency();
            if (result === RESULTS.GRANTED) {
                await firebase.analytics().setAnalyticsCollectionEnabled(true);
            } else {
                await firebase.analytics().setAnalyticsCollectionEnabled(false);
            }
        } catch (error) {
            console.log("catch in location_Track :", error);
        }
    }

    const VerifyOTP = async navigation => {
        setLoading(true);
        var { replace } = navigation;
        if (otpCode.length == 4) {
            const VerifyOTP = await fetchData.Auction_VerifyOTP({
                phone_number: number,
                otp: otpCode,
            });
            if (VerifyOTP?.isLoggedin == true) {
                dispatch(setActionUserData(VerifyOTP?.user));
                dispatch(setLoginType('Auction'));
                await AsyncStorage.setItem(
                    'action_user_data',
                    JSON.stringify(VerifyOTP?.user),
                );
                await AsyncStorage.setItem(
                    'action_login_type',
                    JSON.stringify({ login_type: 'Auction' }),
                );
                if (Platform.OS === 'android') {
                    common_fn.showToast(`Welcome to Albion ${VerifyOTP?.user?.name}`);
                } else {
                    Alert.alert(`Welcome to Albion ${VerifyOTP?.user?.name}`)
                }

                common_fn.locationPermission();
                setOTPVisible(false)
                setLoading(false);
                setVisible(false)
                setLogin(false)
                setNumber("")
                replace('ActionHome', VerifyOTP);
            } else {
                setOTPCode('');
                inputRef.current.focus();
                var msg = VerifyOTP?.message;
                setError(msg);
                setLoading(false);
                setVisible(false)
                setOTPVisible(false)
                setNumber("")
            }
        } else {
            if (Platform.OS === 'android') {
                common_fn.showToast('Invalid OTP Code Please Enter Your 4 Digit OTP Code');
            } else {
                Alert.alert('Invalid OTP Code Please Enter Your 4 Digit OTP Code')
            }
            setLoading(false);
            setVisible(false)
        };
    };
    return (
        <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior={Platform.OS === "ios" ? "padding" : null}
            keyboardVerticalOffset={Platform.OS === "ios" ? 40 : 0}
        >
            <DismissKeyboard>
                <View style={{ flex: 1 }}>
                    {otpVisible === true ?
                        <Modal
                            transparent={true}
                            animationType="slide"
                            visible={otpVisible}
                            onRequestClose={() => { }}>
                            <Pressable
                                style={{ flex: 1, backgroundColor: Color.transparantBlack }}
                                onPress={() => {
                                    setOTPVisible(false)
                                    setNumber("")
                                }}
                            />
                            <View
                                style={{
                                    backgroundColor: Color.white,
                                    padding: 10,
                                    borderTopLeftRadius: 10,
                                    borderTopRightRadius: 10,
                                    flex: 1
                                }}>
                                <View
                                    style={{
                                        alignItems: 'center',
                                    }}>
                                    <Image
                                        source={{ uri: Media.logo }}
                                        style={{ width: 100, height: 100, resizeMode: 'contain' }}
                                    />
                                </View>
                                <View
                                    style={{
                                        marginVertical: 20,
                                        justifyContent: 'center',
                                    }}>
                                    <Text
                                        style={{
                                            fontFamily: 'Poppins-SemiBold',
                                            fontSize: 20,
                                            fontWeight: 'bold',
                                            textAlign: 'center',
                                            color: Color.black,
                                            marginRight: 10,
                                            marginVertical: 10,
                                        }}>
                                        Enter OTP
                                    </Text>
                                    <Text style={styles.invalidLogin}>{error}</Text>
                                    <View style={styles.otpInputView}>
                                        <OTPInput
                                            inputRef={inputRef}
                                            code={otpCode}
                                            setCode={setOTPCode}
                                            maximumLength={4}
                                            setIsPinReady={setIsPinReady}
                                            chkOTPError={chkOTPError}
                                        />
                                    </View>
                                    {seconds > 0 || minutes > 0 ? (
                                        <View style={styles.noReceivecodeView}>
                                            <Text style={styles.noReceiveText}>
                                                Time Remaining: {minutes < 10 ? `0${minutes}` : minutes}:
                                                {seconds < 10 ? `0${seconds}` : seconds}
                                            </Text>
                                        </View>
                                    ) : (
                                        <View style={styles.noReceivecodeView}>
                                            <TouchableOpacity onPress={() => ResendOTP(number)}>
                                                <Text style={styles.resendOtp}>Resend OTP</Text>
                                            </TouchableOpacity>
                                        </View>
                                    )}
                                    <Button
                                        title={'Submit'}
                                        titleStyle={{}}
                                        buttonStyle={{
                                            height: 50,
                                            backgroundColor: Color.primary,
                                            borderRadius: 10,
                                            marginVertical: 10,
                                        }}
                                        onPress={() => {
                                            VerifyOTP(navigation);
                                            // checkPermmissions()
                                        }}
                                        loading={loading}
                                    />
                                </View>
                            </View>
                        </Modal>
                        :
                        <Modal
                            transparent={true}
                            animationType="slide"
                            visible={login}
                            onRequestClose={() => { }}
                        >
                            <Pressable
                                style={{ flex: 1, backgroundColor: Color.transparantBlack }}
                                onPress={() => {
                                    setLogin(false);
                                    setNumber("")
                                }}
                            />
                            <View style={{
                                backgroundColor: Color.white,
                                padding: 10,
                                borderTopLeftRadius: 10,
                                borderTopRightRadius: 10,
                                // flex: 1
                            }}>
                                <View
                                    style={{
                                        alignItems: 'center',
                                    }}>
                                    <Image
                                        source={{ uri: Media.logo }}
                                        style={{ width: 100, height: 100, resizeMode: 'contain' }}
                                    />
                                </View>
                                <Text style={styles.title}>Login</Text>
                                <Text style={styles.subtitle}>Please give your mobile number to Get Started</Text>
                                <View style={styles.inputContainer}>
                                    <TextInput
                                        placeholder="Mobile Number"
                                        placeholderTextColor={Color.black}
                                        value={number}
                                        keyboardType="phone-pad"
                                        maxLength={10}
                                        onChangeText={(number) => {
                                            chkNumber(number)
                                        }}
                                        autoFocus={number.length == 10 ? false : true}
                                        style={styles.input}
                                    />
                                </View>
                                {error ? <Text style={styles.error}>{error}</Text> : null}
                                <Button
                                    title="Submit"
                                    buttonStyle={styles.button}
                                    onPress={verifyLoginData}
                                />
                            </View>
                        </Modal>
                    }
                </View>
            </DismissKeyboard>
        </KeyboardAvoidingView>
    )
}

export default AuctionBottomLogin

const styles = StyleSheet.create({
    modalContainer: {
        backgroundColor: Color.white,
        padding: 10,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
    },
    title: {
        fontFamily: 'Poppins-SemiBold',
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'left',
        color: Color.black,
        marginRight: 10,
        marginVertical: 10,
    },
    subtitle: {
        fontFamily: 'Poppins-Medium',
        fontSize: 14,
        textAlign: 'left',
        color: Color.cloudyGrey,
        marginRight: 10,
    },
    inputContainer: {
        marginVertical: 30,
        borderColor: Color.cloudyGrey,
        borderWidth: 1,
        height: 50,
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 5,
    },
    input: {
        flex: 1,
        height: 50,
        color: Color.black,
        fontSize: 14,
        padding: 5,
        fontFamily: 'Poppins-SemiBold',
        alignItems: 'flex-start',
    },
    error: {
        fontSize: 12,
        fontFamily: 'Poppins-SemiBold',
        color: Color.red,
        textAlign: 'left',
        marginTop: 10,
    },
    button: {
        backgroundColor: Color.primary,
        borderRadius: 5,
        height: 50,
    },
    otpInputView: {
        marginVertical: 10,
        alignItems: "center", justifyContent: "center"
    },
    noReceivecodeView: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end',
        marginVertical: 15,
        marginRight: 10,
    },
    noReceiveText: {
        color: Color.black,
        fontSize: 12,
        fontFamily: 'Poppins-SemiBold',
    },
    resendOtp: {
        color: Color.primary,
        fontSize: 14,
        fontFamily: 'Poppins-SemiBold',
        fontWeight: 'bold',
        textDecorationLine: 'underline',
        textAlign: 'right',
    },
    invalidLogin: {
        fontSize: 14,
        fontFamily: 'Poppins-SemiBold',
        color: Color.red,
        textAlign: 'center',
    },
});