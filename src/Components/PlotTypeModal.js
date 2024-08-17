import React,{ useState } from "react";
import { Pressable, Text, TouchableOpacity, View } from "react-native";
import { Modal } from "react-native";
import Color from "../Config/Color";
import { Poppins } from "../Global/FontFamily";

export const PlotTypeModal = ({visible, data, onClose, onBuyPress, onRentPress}) => {
    const [cardHeight, setCardHeight] = useState(undefined);
  return (
    <Modal visible={visible} transparent={true} animationType="slide">
      <View style={{flex: 1, backgroundColor: Color.transparantBlack}}>
        <Pressable style={{flex: 1}} onPress={onClose} />
        <View
          style={{
            backgroundColor: Color.white,
            height: cardHeight,
            padding: 20,
            borderTopRightRadius: 30,
            borderTopLeftRadius: 30,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <TouchableOpacity onPress={onBuyPress} style={{marginHorizontal: 20}}>
            <Text
              style={{
                fontFamily: Poppins.SemiBold,
                fontSize: 16,
                color: Color.black,
              }}>
              Buy
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={onRentPress}
            style={{marginHorizontal: 20}}>
            <Text
              style={{
                fontFamily: Poppins.SemiBold,
                fontSize: 16,
                color: Color.black,
              }}>
              Rent
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};
