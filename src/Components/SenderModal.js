import React, { useState } from 'react'
import RBSheet from 'react-native-raw-bottom-sheet';
import Color from '../Config/Color';
import { Linking, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Button } from 'react-native-elements';
import MIcon from "react-native-vector-icons/MaterialIcons"
import { Poppins } from '../Global/FontFamily';
import Icon from 'react-native-vector-icons/Ionicons';

const SenderModal = ({ SellerRBSheet, item, EmailContactVisible }) => {
    const [height] = useState(undefined)
    return (
        <RBSheet
            ref={SellerRBSheet}
            closeOnDragDown={true}
            closeOnPressMask
            customStyles={{
                wrapper: {
                    backgroundColor: Color.transparantBlack,
                },
                draggableIcon: {
                    backgroundColor: Color.transparantBlack,
                },
                container: {
                    padding: 20,
                    borderTopLeftRadius: 20,
                    borderTopRightRadius: 20,
                    height: height,
                },
            }}>
            <View>
                <TouchableOpacity
                    onPress={() => {
                        SellerRBSheet.current.close();
                    }}
                    style={{
                        position: 'absolute',
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: 40,
                        height: 40,
                        backgroundColor: Color.primary,
                        borderRadius: 100,
                        padding: 10,
                        right: 10,
                        top: 0,
                        zIndex: 1,
                    }}>
                    <MIcon name="close" size={18} color={Color.white} />
                </TouchableOpacity>
                <Text
                    style={{
                        fontFamily: Poppins.SemiBold,
                        color: Color.black,
                        fontSize: 16,
                        marginVertical: 10
                    }}>
                    Seller Details Of this Property
                </Text>
                <View>
                    <View style={styles.commonHeader}>
                        <Text style={styles.textHeader}>User Name:</Text>
                        <Text style={styles.textValue}>{item?.username}</Text>
                    </View>
                    <View style={styles.commonHeader}>
                        <Text style={styles.textHeader}>Email:</Text>
                        <Text style={styles.textValue}>{item?.email}</Text>
                    </View>
                    <View style={styles.commonHeader}>
                        <Text style={styles.textHeader}>Mobile Number:</Text>
                        <Text style={styles.textValue}>{item?.mobile_number}</Text>
                    </View>
                    <View style={styles.commonHeader}>
                        <Text style={styles.textHeader}>User:</Text>
                        <Text style={styles.textValue}>{item?.user_type_id == '1'
                            ? 'Buyer'
                            : item?.user_type_id == '2'
                                ? 'Agent'
                                : 'Builder'}</Text>
                    </View>
                </View>
                <Button
                    title={`Call the ${item?.user_type_id == '1'
                        ? 'Buyer'
                        : item?.user_type_id == '2'
                            ? 'Agent'
                            : 'Builder'}`}
                    buttonStyle={{ backgroundColor: Color.primary }}
                    onPress={() => {
                        Linking.openURL(`tel:${item?.user?.mobile_number}`)
                    }}
                />
            </View>
        </RBSheet>
    )
}

export default SenderModal

const styles = StyleSheet.create({
    textHeader: {
        fontFamily: Poppins.SemiBold,
        fontSize: 12,
        flex: 1,
        color: Color.black
    },
    textValue: {
        fontFamily: Poppins.SemiBold,
        fontSize: 12,
        color: Color.black
    },
    commonHeader: {
        flexDirection: "row",
        alignItems: "center",
        marginVertical: 10
    }
})