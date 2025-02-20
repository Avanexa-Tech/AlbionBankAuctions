//import liraries
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { Component } from 'react';
import { Linking, TouchableOpacity } from 'react-native';
import { View, Text, StyleSheet, Alert } from 'react-native';
import { useDispatch } from 'react-redux';
import { Iconviewcomponent } from '../../../Components/Icontag';
import Color from '../../../Config/Color';
import { Poppins } from '../../../Global/FontFamily';

// create a component
const DeleteProfile = ({
    navigation,
    data
}) => {
    const dispatch = useDispatch();
    return (

        <TouchableOpacity
            onPress={() => {
                Alert.alert(
                    '',
                    'Do You like to remove your account',
                    [
                        {
                            text: 'No',
                            onPress: async () => { },
                        },
                        {
                            text: 'Yes',
                            onPress: async () => {
                                Linking.openURL(`https://albionbankauctions.com/web/user/delete/${data?.id}`,);
                                AsyncStorage.clear();
                                // navigation.replace('OnboardingScreen2');
                                navigation.reset({
                                    index: 0,
                                    routes: [{ name: 'OnboardingScreen2' }],
                                })
                            },
                        },
                    ],
                    { cancelable: false },
                );
            }}
            style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                marginVertical: 10,
                marginHorizontal: 10,
            }}>
            {/* <Icon name="heart-outline" size={25} color={Color.primary} /> */}
            <Iconviewcomponent
                Icontag={'AntDesign'}
                iconname={'deleteuser'}
                icon_size={22}
                icon_color={Color.primary}
            />
            <View
                style={{
                    flex: 1,
                    justifyContent: 'flex-start',
                    alignItems: 'flex-start',
                    marginHorizontal: 10,
                }}>
                <Text style={{ fontSize: 14, color: '#333', fontFamily: Poppins?.Medium }}>
                    Delete User
                </Text>
                <Text style={{ fontSize: 12, color: '#666', fontFamily: Poppins?.Medium }}>
                    Removing Your Account
                </Text>
            </View>
            <Iconviewcomponent
                Icontag={'Ionicons'}
                iconname={'chevron-forward'}
                icon_size={18}
                icon_color={'#666'}
            />
        </TouchableOpacity>
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#2c3e50',
    },
});

//make this component available to the app
export default DeleteProfile;
