//import liraries
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
    Modal, Button
} from 'react-native';


import { useNavigation } from '@react-navigation/native';
import { useSelector, useDispatch } from "react-redux";
import { primarycolor } from '../../../Utils/Colors';

const DATA = [
    {
        'id': '0',
        'notify_Title': 'House Villa Bunglow Appartment Flat for Sale in a prime location in Coimbatore',
        'notify_Id': '16407',
        'notify_Bank': 'HDFC Bank',
        'notify_Auction_Date': '07/12/2023',
        'notify_Price': '₹29,85,000',
        'notify_Area': '111.48,Sq Feet',
    },
    {
        'id': '1',
        'notify_Title': 'House Villa Bunglow Appartment Flat for Sale in a prime location in Coimbatore',
        'notify_Id': '16456',
        'notify_Bank': 'Canara Bank',
        'notify_Auction_Date': '05/12/2023',
        'notify_Price': '₹2,81,00,000',
        'notify_Area': '11107,Sq Feet',
    },
    {
        'id': '2',
        'notify_Title': 'Land Agri Commercial Residential Industrial Farm for Sale in a prime location in Coimbatore',
        'notify_Id': '16457',
        'notify_Bank': 'City Union Bank',
        'notify_Auction_Date': '21/11/2023',
        'notify_Price': '₹2,10,00,000',
        'notify_Area': '4.95,Acre',
    },
    {
        'id': '3',
        'notify_Title': 'House Villa Bunglow Appartment Flat for Sale in a prime location in Coimbatore',
        'notify_Id': '16407',
        'notify_Bank': 'HDFC Bank',
        'notify_Auction_Date': '07/12/2023',
        'notify_Price': '₹29,85,000',
        'notify_Area': '111.48,Sq Feet',
    },
    {
        'id': '4',
        'notify_Title': 'House Villa Bunglow Appartment Flat for Sale in a prime location in Coimbatore',
        'notify_Id': '16407',
        'notify_Bank': 'HDFC Bank',
        'notify_Auction_Date': '22/12/2023',
        'notify_Price': '₹29,85,000',
        'notify_Area': '111.48,Sq Feet',
    },
    {
        'id': '5',
        'notify_Title': 'House Villa Bunglow Appartment Flat for Sale in a prime location in Coimbatore',
        'notify_Id': '16407',
        'notify_Bank': 'SBI Bank',
        'notify_Auction_Date': '17/12/2023',
        'notify_Price': '₹55,85,000',
        'notify_Area': '211.48,Sq Feet',
    },
];


// create a component
const AuctionNotificationList = () => {

    const dispatch = useDispatch();
    const navigation = useNavigation();
    const [netInfo_State, setNetinfo] = useState(true);
    const [notifyData, setnotifyData] = useState(DATA);
    const [selectDataItem, setselectDataItem] = useState('');

    function renderAucNotifyData(item, index) {
        try {
            return (
                <TouchableOpacity onPress={() => sinleItemClick(item)} style={{ width: '97%', backgroundColor: selectDataItem === item.id ? '#CCC' : 'white', margin: 5, borderWidth: 0.5, borderColor: '#666', borderRadius: 5, padding: 5 }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 10 }}>
                        <Text style={{ fontSize: 12, color: primarycolor }}>{item.notify_Id}</Text>
                        <Text style={{ fontSize: 14, color: '#666', fontWeight: '800' }}>{item.notify_Bank}</Text>
                    </View>
                    <Text style={{ padding: 5, fontSize: 14, color: 'black', fontWeight: '600' }}>{item.notify_Title}</Text>
                    <Text style={{ padding: 5, fontSize: 14, color: primarycolor, fontWeight: 'bold' }}>{item.notify_Price}</Text>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 10 }}>
                        <Text style={{ fontSize: 12, color: '#666' }}>{item.notify_Area}</Text>
                        <Text style={{ fontSize: 12, color: '#666', fontStyle: 'italic' }}>{item.notify_Auction_Date}</Text>
                    </View>
                </TouchableOpacity>
            );
        } catch (error) {
            console.log('catch in renderAucNotify_Data :', error);
        }
    }

    function sinleItemClick(item, index) {
        try {
            setselectDataItem(item.id);
        } catch (error) {
            console.log('catch in sinleItem_Click :', error);
        }
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={{ flex: 1, marginVertical: 10 }}>
                <FlatList
                    data={notifyData}
                    keyExtractor={(item, index) => item + index}
                    renderItem={({ item, index }) => renderAucNotifyData(item, index)}
                />
            </View>
        </SafeAreaView>
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
export default AuctionNotificationList;
