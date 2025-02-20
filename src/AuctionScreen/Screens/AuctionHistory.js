import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import Color from '../../Config/Color';
import { scr_width } from '../../Utils/Dimensions';
import { Poppins } from '../../Global/FontFamily';
import { base_auction_image_url } from '../../Config/base_url';
import dayjs from 'dayjs';
import moment from 'moment';
import { Iconviewcomponent } from '../../Components/Icontag';

const AuctionHistory = ({ item, navigation }) => {
    console.log("auction History", item);
    const imageurl = `${base_auction_image_url}${item?.bank_logo}`
    console.log("imageurl", imageurl);

    return (
        <View style={{ borderWidth: 1, borderColor: Color?.primary, borderRadius: 10, width: scr_width - 50 }}>
            <View style={{ padding: 20, gap: 10 }}>
                <Text style={{ color: Color?.primary, fontFamily: Poppins?.SemiBold, fontSize: 13 }}>{`${item?.property_sub_category?.split('_')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')} in ${item?.district}, ${item?.country}`}</Text>
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
                    <Text style={{ color: Color?.black, fontFamily: Poppins?.Medium, fontSize: 12, textTransform: 'capitalize' }}>bank name</Text>
                    <View style={{ width: "40%" }}>
                        <Text style={{ color: Color?.cloudyGrey, fontFamily: Poppins?.Regular, fontSize: 12, textTransform: 'capitalize', textAlign: 'left' }}>{item?.event_bank}</Text>
                    </View>
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
                    <Text style={{ color: Color?.black, fontFamily: Poppins?.Medium, fontSize: 12, textTransform: 'capitalize' }}>Auction Date</Text>
                    <View style={{ width: "40%" }}>
                        <Text style={{ color: Color?.cloudyGrey, fontFamily: Poppins?.Regular, fontSize: 12, textTransform: 'capitalize', textAlign: 'left' }}>{moment(item?.created_at).format('DD/MM/YYYY')}</Text>
                    </View>
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
                    <Text style={{ color: Color?.black, fontFamily: Poppins?.Medium, fontSize: 12, textTransform: 'uppercase' }}>Emd</Text>
                    <View style={{ width: "40%" }}>
                        <Text style={{ color: Color?.cloudyGrey, fontFamily: Poppins?.Regular, fontSize: 12, textTransform: 'capitalize', textAlign: 'left' }}> ₹ {item?.emd_amount?.toLocaleString('en-IN')}</Text>
                    </View>
                </View>
                <TouchableOpacity style={{ borderRadius: 5, borderWidth: 1, borderColor: Color?.primary, justifyContent: 'center', alignItems: 'center', flexDirection: 'row', padding: 5, gap: 10 }}
                    onPress={() => {
                        navigation.push('ActionSingleProperty', {
                            item: item,
                            history:true
                        });
                    }}
                >
                    <Text style={{ color: Color?.primary, fontSize: 14, fontFamily: Poppins?.Medium }}>View Auction</Text>
                    <Iconviewcomponent
                        Icontag={'AntDesign'}
                        iconname={"arrowright"}
                        icon_size={20}
                        icon_color={Color?.primary}
                    />
                </TouchableOpacity>

            </View>
        </View>
    )
}

export default AuctionHistory

const styles = StyleSheet.create({})