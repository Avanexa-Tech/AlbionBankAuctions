import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity, Pressable, KeyboardAvoidingView, ScrollView, Keyboard, ToastAndroid } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Media } from '../../Global/Media'
import Color from '../../Config/Color'
import { scr_width } from '../../Utils/Dimensions'
import { Poppins } from '../../Global/FontFamily'
import { TouchableWithoutFeedback } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';
import messaging, { firebase } from '@react-native-firebase/messaging';
import fetchData from '../../Config/fetchData';
import { useDispatch, useSelector } from 'react-redux';
import { setActionUserData, setLoginType } from '../../Redux'
import { ActivityIndicator } from 'react-native'
import common_fn from '../../Config/common_fn'

const LoginWithEmail = ({ navigation }) => {
    const dispatch = useDispatch();
    const [data, setdata] = useState({
        email: null,
        password: null,
        loader: false
    })
    const [token, setToken] = useState('');
    const [isKeyboardVisible, setIsKeyboardVisible] = useState(false);
    useEffect(() => {
        // Add listeners for keyboard events
        const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', () => {
            setIsKeyboardVisible(true); // Set state to true when keyboard is shown
        });
        const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => {
            setIsKeyboardVisible(false); // Set state to false when keyboard is hidden
        });

        // Clean up listeners on unmount
        return () => {
            keyboardDidHideListener.remove();
            keyboardDidShowListener.remove();
        };
    }, []);
    const loginfunction = async () => {
        try {
            setdata({ ...data, loader: true })
            if (data?.email == "" || data?.password == "" || data?.email == null || data?.password == null) {
                ToastAndroid.show("Please Enter email and password", ToastAndroid.SHORT);
                setdata({ ...data, loader: false })
            } else {
                if (data?.password?.length < 8) {
                    ToastAndroid.show("Password should be at least 8 characters long", ToastAndroid.SHORT);
                } else {
                    const payload = {
                        username: data?.email,
                        password: data?.password,
                        fcm_token: token
                    }
                    const VerifyOTP = await fetchData.loginWithEmail(payload);
                    if (VerifyOTP?.success == false) {
                        common_fn.showToast(VerifyOTP?.message)
                        setdata({ ...data, loader: false })

                    } else {
                        dispatch(setActionUserData(VerifyOTP?.user));
                        dispatch(setLoginType('Auction'));
                        await AsyncStorage.setItem('action_user_data', JSON.stringify(VerifyOTP?.user),);
                        await AsyncStorage.setItem('logindetails', JSON.stringify(VerifyOTP));
                        await AsyncStorage.setItem('action_login_type', JSON.stringify({ login_type: 'Auction' }),);
                        navigation.dispatch(navigation.replace('ActionHome', VerifyOTP?.user));
                        common_fn.showToast(`Welcome to Albion ${VerifyOTP?.user?.name}`);
                        setdata({ ...data, loader: false })
                    }
                }
            }
        } catch (error) {

        }
    }
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
    return (
        <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior="padding"
        >
            <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()} style={{ flex: 1 }}>
                <View style={{ flex: 1, backgroundColor: Color.white }}>
                    <ScrollView style={{ flex: 1 }} contentContainerStyle={{ justifyContent: 'center', alignItems: 'center', flex: 1 }}>
                        <Image
                            source={{ uri: Media.logo }}
                            style={{ width: 120, height: 120, resizeMode: 'contain' }}
                        />
                        <View style={{ gap: 20, width: scr_width - 20, marginTop: 20 }}>
                            <Text style={{ color: Color?.black, fontSize: 18, fontFamily: Poppins.Medium, fontWeight: 'bold' }}>Login</Text>

                            <View style={{ gap: 15 }}>
                                <View style={{ gap: 10 }}>
                                    <Text style={{ color: Color?.black, fontSize: 16, fontFamily: Poppins.Medium, }}> Email ID / Phone Number</Text>
                                    <TextInput
                                        value={data?.email}
                                        placeholder='Enter Your Email ID / Phone Number'
                                        onChangeText={value => setdata({ ...data, email: value })}
                                        style={{
                                            borderWidth: 1,
                                            borderColor: Color?.cloudyGrey,
                                            borderRadius: 10,
                                            paddingLeft: 5
                                        }}
                                    />
                                </View>
                                <View style={{ gap: 10 }}>
                                    <Text style={{ color: Color?.black, fontSize: 16, fontFamily: Poppins.Medium, }}>Password</Text>
                                    <TextInput
                                        value={data?.password}
                                        placeholder='Enter Your Password'
                                        onChangeText={value => setdata({ ...data, password: value })}
                                        style={{
                                            borderWidth: 1,
                                            borderColor: Color?.cloudyGrey,
                                            borderRadius: 10,
                                            paddingLeft: 5
                                        }}
                                    />
                                </View>
                            </View>
                            <View></View>
                        </View>
                        <View>
                            <View style={{ gap: 10 }}>

                                <TouchableOpacity style={{ backgroundColor: Color?.primary, borderRadius: 10, width: scr_width - 20, padding: 10, justifyContent: 'center', alignItems: 'center' }}
                                    onPress={() => {
                                        loginfunction()
                                    }}
                                    disabled={data?.loader}
                                >
                                    {
                                        data?.loader ? <ActivityIndicator color={Color?.white} size={'small'} style={{ padding: 5 }} /> :
                                            <Text style={{ color: Color?.white, fontFamily: Poppins?.Medium, fontSize: 18 }}>Login</Text>
                                    }
                                </TouchableOpacity>
                                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 5, justifyContent: 'center' }}>
                                    <Text style={{ color: Color?.black, fontFamily: Poppins?.Medium, fontSize: 14 }}>If you don’t have an account?</Text>
                                    <Pressable onPress={() => {
                                        navigation.navigate('ActionRegister')
                                    }}>
                                        <Text style={{ color: Color?.primary, fontFamily: Poppins?.Medium, fontSize: 14, textDecorationLine: 'underline' }}>Register</Text>
                                    </Pressable>
                                </View>
                            </View>
                        </View>
                    </ScrollView>
                    {isKeyboardVisible == true ? null :
                        <View>
                            <Text
                                style={{
                                    fontSize: 12,
                                    color: '#666',
                                    fontFamily: Poppins.Medium,
                                    textAlign: "center",
                                    padding: 10
                                }}
                            >Copyright @ 2025 Albion Investments and Holdings Pvt Ltd - All Rights Reserved</Text>
                        </View>}
                </View>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    )
}

export default LoginWithEmail

const styles = StyleSheet.create({})