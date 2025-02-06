//import liraries
import { useNavigation } from '@react-navigation/native';
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
    LogBox, Linking,
    Modal, Button
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { Iconviewcomponent } from '../../../Components/Icontag';
import Color from '../../../Config/Color';
import RNFetchBlob from 'rn-fetch-blob';
import { base_albionbankauctions_url } from '../../../Config/base_url';
import common_fn from '../../../Config/common_fn';
import { PermissionsAndroid } from 'react-native';
import RNFS from 'react-native-fs';
import { Poppins } from '../../../Global/FontFamily';

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
];


// create a component
const InvoiceList = () => {

    const dispatch = useDispatch();
    const navigation = useNavigation();
    const [netInfo_State, setNetinfo] = useState(true);
    const [invoiceData, setInvoiceData] = useState([]);
    const [selectDataItem, setselectDataItem] = useState('');

    const data = useSelector(
        state => state.UserReducer.auctionUserData,
    );

    console.log("invoiceData -------------- : ", invoiceData?.Invoice);


    useEffect(() => {
        try {
            plan_CheckData();
        } catch (error) {
            console.log("catch in use_Effect:", error);
        }
    }, [])


    const plan_CheckData = async () => {
        try {
            const myHeaders = new Headers();
            myHeaders.append("accept", "*/*");

            const requestOptions = {
                method: "GET",
                headers: myHeaders,
                redirect: "follow"
            };

            // fetch(`http://192.168.29.204:5000/api/plan/user?user_id=${id}`, requestOptions)
            fetch(`https://api.albionbankauctions.com/api/plan/user?user_id=${data?.id}&status=activated`, requestOptions)
                .then((response) => response.json())
                .then((result) => {
                    if (result?.status == true) {
                        // console.log("Invoice List -----------------: ", result?.data)
                        setInvoiceData(result?.data);
                    }
                }
                )
                .catch((error) => console.error("catch in Invoice_List_Api:", error));

        } catch (error) {
            console.log("catch in Invoice_List : ", error);
        }
    }

    function renderInvoiceData(item, index) {
        try {
            // console.log("Invoice Item:", item);  // Log to check structure

            const invoiceDate = item?.Invoice?.invoice_date || "N/A";
            const totalGrossAmount = item?.Invoice?.total_gross_amount || "N/A";
            const totalAmount = item?.Invoice?.total_amount_payable || "N/A";
            const invoice_no = item?.Invoice?.invoice_no || "N/A";
            let plan_name = ""
            switch (item?.Invoice?.plan_id) {
                case 1:
                    plan_name = "Free Plan"
                    break;
                case 2:
                    plan_name = "3 Months Plan"
                    break;
                case 3:
                    plan_name = "6 Months Plan"
                    break;
                case 4:
                    plan_name = "12 Months Plan"
                    break;
            }

            return (
                <View
                    style={{ width: '98%', backgroundColor: Color.softGrey, margin: 5, borderWidth: 0.5, borderColor: '#666', borderRadius: 5, padding: 5 }}>
                    <View style={{ width: '100%', padding: 5 }}>
                        <View style={{ width: '100%', justifyContent: 'flex-start', alignItems: 'flex-start', paddingVertical: 5 }}>
                            <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                <View style={{ flex: 1, justifyContent: 'flex-start', alignItems: 'flex-start' }}>
                                    <Text style={{ textAlign: 'left', fontSize: 13, color: Color.cloudyGrey, fontFamily: Poppins.Medium }}>Plan Type </Text>
                                    <Text style={{ textAlign: 'left', fontSize: 14, color: Color.lightBlack, fontFamily: Poppins.SemiBold }} numberOfLines={1}> {plan_name}</Text>
                                </View>
                                <View style={{ flex: 1, justifyContent: 'flex-end', alignItems: 'flex-end' }}>
                                    <Text style={{ textAlign: 'right', fontSize: 13, color: Color.cloudyGrey, fontFamily: Poppins.Medium }}>Total Amount </Text>
                                    <Text style={{ textAlign: 'right', fontSize: 14, color: Color.lightBlack, fontFamily: Poppins.SemiBold }} numberOfLines={1}> {totalAmount}</Text>
                                </View>
                            </View>
                        </View>
                        <View style={{ width: '100%', justifyContent: 'center', alignItems: 'center', paddingVertical: 5 }}>
                            <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                <View style={{ flex: 1, justifyContent: 'flex-start', alignItems: 'flex-start' }}>
                                    <Text style={{ textAlign: 'left', fontSize: 13, color: Color.cloudyGrey, fontFamily: Poppins.Medium }}>Invoice No </Text>
                                    <Text style={{ textAlign: 'left', fontSize: 14, color: Color.lightBlack, fontFamily: Poppins.SemiBold }} numberOfLines={1}> {invoice_no}</Text>
                                </View>
                                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'flex-end' }}>
                                    <TouchableOpacity onPress={() => downloadImage(item)} style={{ justifyContent: 'center', alignItems: 'center' }}>
                                        <Iconviewcomponent
                                            Icontag={'MaterialCommunityIcons'}
                                            iconname={"file-download"}
                                            icon_size={30}
                                            icon_color={Color.black}
                                        />
                                        <Text style={{ fontSize: 12, color: Color.lightBlack, fontFamily: Poppins.SemiBold }}>Download</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    </View>
                </View>
            );
        } catch (error) {
            console.log('catch in renderAucNotify_Data :', error);
        }
    }


    const downloadImage = async (item) => {
        try {
            const invoicePath = item?.Invoice?.invoice_path;
            if (!invoicePath) {
                Alert.alert("Error", "Invoice file not found.");
                return;
            }

            const fileUrl = base_albionbankauctions_url + invoicePath;
            const fileName = fileUrl.split('/').pop(); // Extract filename
            const downloadDest = `${RNFS.DownloadDirectoryPath}/${fileName}`;

            if (Platform.OS === 'android') {
                const granted = await PermissionsAndroid.request(
                    PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
                    {
                        title: "Storage Permission Required",
                        message: "App needs access to your storage to download files.",
                        buttonPositive: "OK"
                    }
                );
                if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
                    Alert.alert("Permission Denied", "Cannot download without permission.");
                    return;
                }
            }

            // Download file
            const options = {
                fromUrl: fileUrl,
                toFile: downloadDest,
                background: true,
                discretionary: true,
            };

            const response = await RNFS.downloadFile(options).promise;

            if (response.statusCode === 200) {
                console.log("Invoice saved to ", downloadDest);

                common_fn.showToast(`Downloaded successfully! ${downloadDest}`);
                // common_fn.showToast("File downloaded to :", JSON.stringify(response));
            } else {
                common_fn.showToast("Failed to download documents, Try after some times");
                throw new Error("Download failed!");
            }

        } catch (error) {
            console.error("Download Error:", error);
            // Alert.alert("Download Failed", error.message);
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={{ flex: 1, marginVertical: 10 }}>
                <FlatList
                    data={invoiceData}
                    keyExtractor={(item, index) => item + index}
                    renderItem={({ item, index }) => renderInvoiceData(item, index)}
                    style={{ width: '95%' }}
                />
            </View>
        </SafeAreaView>
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        alignItems: 'center',
        backgroundColor: Color.white,
    },
});

//make this component available to the app
export default InvoiceList;
