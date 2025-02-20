import { Dimensions, FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { ScrollView } from 'react-native-gesture-handler'
import Color from '../../../Config/Color'
import { Iconviewcomponent } from '../../../Components/Icontag'
import fetchData from '../../../Config/fetchData'
import { useFocusEffect } from '@react-navigation/native'
import common_fn from '../../../Config/common_fn'
import { useSelector } from 'react-redux'
import { Image } from 'react-native'
import { Media } from '../../../Global/Media'
import { Poppins } from '../../../Global/FontFamily'
const { height, width } = Dimensions.get('screen');
const ListNotifyProperties = ({ navigation }) => {
    const [data, setData] = useState([]);
    const [loader, setloader] = useState(false);
    const userdata = useSelector(
        state => state.UserReducer.auctionUserData,
    );
    useFocusEffect(
        React.useCallback(() => {
            setloader(true)
            getdata()
        }, []))
        const getRecentData = (data) => {
            if (!data || data.length === 0) return [];
            const sortedData = data.sort((a, b) => new Date(b?.created_at) - new Date(a?.created_at));
            const recentDate = new Date(sortedData[0]?.created_at)?.toISOString()?.split('T')[0];  
            const recentData = sortedData?.filter(item => new Date(item?.created_at)?.toISOString()?.split('T')[0] === recentDate);
            return recentData;
        }
    const getdata = async () => {
        try {
            const getdata = await fetchData?.Auction_Notifylist(userdata?.id)
            console.log("Getdta",getdata);
            const recentData = getRecentData(getdata); 
            setData(recentData);
            setloader(false)
        } catch (error) {
            setData([]);
            setloader(false)
        }
    }
    const DeleteNotify = async (item) => {
        try {
            const deleteApi = await fetchData?.DeleteNotify(item?.id);
            if (deleteApi?.message == "Data Deleted successful") {
                common_fn.showToast("Deleted Successfully")
                getdata()
            }
        } catch (error) {
            console.log('error', error);
        }
    }

    // <TouchableOpacity style={{ width: '10%', alignItems: 'center' }}
    //                                         onPress={() => {
    //                                             DeleteNotify(item)
    //                                         }}>
    //                                         <Iconviewcomponent
    //                                             Icontag={'AntDesign'}
    //                                             iconname={"delete"}
    //                                             icon_size={20}
    //                                             icon_color={Color.primary}
    //                                         />
    //                                     </TouchableOpacity>

    return (
        <View style={{ flex: 1 }}>
            {loader ? (
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
            ) :
                <View style={{ flex: 1 }}>
                    <ScrollView showsVerticalScrollIndicator={false}>
                        <FlatList
                            data={data}
                            renderItem={({ item, index }) => {
                                return (
                                    <View style={{
                                        marginVertical: 5,marginHorizontal: 15, borderRadius: 10, padding: 20, backgroundColor: Color?.white,
                                        shadowColor: '#000',
                                        shadowOffset: { width: 0, height: 4 },
                                        shadowOpacity: 0.1,
                                        shadowRadius: 5,
                                        elevation: 5,
                                        marginTop:15
                                    }}>
                                        <View
                                            style={{
                                                display:"flex",
                                                flexDirection:"row",
                                                justifyContent:"space-between",
                                                alignItems:"center"
                                            }}
                                        >
                                            <Text style={{fontSize:12,fontFamily:Poppins.Light}}>From Reserve Price</Text>
                                            <Text style={{fontSize:14,fontFamily:Poppins.SemiBold,color:"#000"}}>₹ {parseInt(item?.from_reserve_price)?.toLocaleString('en-IN')}</Text>
                                        </View>
                                        <View
                                            style={{
                                                display:"flex",
                                                flexDirection:"row",
                                                justifyContent:"space-between",
                                                alignItems:"center"
                                            }}
                                        >
                                            <Text style={{fontSize:12,fontFamily:Poppins.Light}}>To Reserve Price</Text>
                                            <Text style={{fontSize:14,fontFamily:Poppins.SemiBold,color:"#000"}}>₹ {parseInt(item?.to_reserve_price)?.toLocaleString('en-IN')}</Text>
                                        </View>
                                        <View
                                            style={{
                                                display:"flex",
                                                flexDirection:"row",
                                                justifyContent:"space-between",
                                                alignItems:"center"
                                            }}
                                        >
                                            <Text style={{fontSize:12,fontFamily:Poppins.Light}}>Type Of Property</Text>
                                            <Text style={{fontSize:14,fontFamily:Poppins.SemiBold,color:"#000"}}>{item?.type_of_property}</Text>
                                        </View>
                                        <View
                                            style={{
                                                display:"flex",
                                                flexDirection:"row",
                                                justifyContent:"space-between",
                                                alignItems:"center"
                                            }}
                                        >
                                            <Text style={{fontSize:12,fontFamily:Poppins.Light}}>District</Text>
                                            <Text style={{fontSize:14,fontFamily:Poppins.SemiBold,color:"#000"}}>{item?.district}</Text>
                                        </View>
                                        <TouchableOpacity
                                            style={{
                                                borderWidth:1,
                                                borderColor:Color.primary,
                                                backgroundColor:Color.white,
                                                width:"100%",
                                                display:"flex",
                                                justifyContent:"center",
                                                alignItems:"center",
                                                borderRadius:4,
                                                padding:8,
                                                marginTop:5
                                            }}
                                            onPress={() => {
                                                DeleteNotify(item)
                                            }}
                                        >
                                            <Text
                                                style={{
                                                    color:Color.primary,
                                                    fontFamily:Poppins.Medium
                                                }}
                                            >
                                                Delete Interest
                                            </Text>
                                        </TouchableOpacity>
                                        {/* <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end' }}>
                                            <TouchableOpacity style={{ width: '10%', alignItems: 'center' }}
                                                onPress={() => {
                                                    DeleteNotify(item)
                                                }}>
                                                <Iconviewcomponent
                                                    Icontag={'AntDesign'}
                                                    iconname={"delete"}
                                                    icon_size={20}
                                                    icon_color={Color.primary}
                                                />
                                            </TouchableOpacity>
                                        </View>
                                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                                            <Text style={{ fontSize: 16, textTransform: 'capitalize', color: Color?.black, textTransform: 'capitalize' }}>from reserve price : </Text>
                                            <Text style={{ fontSize: 16, color: Color?.black, textTransform: 'capitalize' }}>{item?.from_reserve_price}</Text>
                                        </View>
                                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                                            <Text style={{ fontSize: 16, textTransform: 'capitalize', color: Color?.black, textTransform: 'capitalize' }}>to reserve price : </Text>
                                            <Text style={{ fontSize: 16, color: Color?.black, textTransform: 'capitalize' }}>{item?.to_reserve_price}</Text>
                                        </View>
                                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                                            <Text style={{ fontSize: 16, textTransform: 'capitalize', color: Color?.black, textTransform: 'capitalize' }}>type of property : </Text>
                                            <Text style={{ fontSize: 16, color: Color?.black, textTransform: 'capitalize' }}>{item?.type_of_property}</Text>
                                        </View>
                                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                                            <Text style={{ fontSize: 16, textTransform: 'capitalize', color: Color?.black, textTransform: 'capitalize' }}>district : </Text>
                                            <Text style={{ fontSize: 16, color: Color?.black, textTransform: 'capitalize' }}>{item?.district}</Text>
                                        </View> */}
                                    </View>
                                )
                            }}
                            ListEmptyComponent={() => {
                                return (
                                    <View style={{ alignItems: 'center', justifyContent: 'center', flex: 1, marginTop: height / 2.5 }}>
                                        <Text style={{ color: Color?.primary, fontSize: 16, fontFamily: Poppins?.Medium }}>No Notify Property</Text>
                                    </View>
                                )
                            }}
                        />
                    </ScrollView>
                    <TouchableOpacity style={{ position: 'absolute', bottom: 40, right: 30,backgroundColor:Color?.white,borderRadius:10 }}
                        onPress={() => {
                            navigation.navigate('AuctionNotifyProperties');
                        }}
                    >
                        <Iconviewcomponent
                            Icontag={'AntDesign'}
                            iconname={"plussquare"}
                            icon_size={50}
                            icon_color={Color.primary}
                        />
                    </TouchableOpacity></View>}
        </View>
    )
}

export default ListNotifyProperties

const styles = StyleSheet.create({})