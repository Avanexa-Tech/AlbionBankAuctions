import React, { Component } from 'react';
import { View } from 'react-native';

import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Ionicons from "react-native-vector-icons/Ionicons";
import EvilIcons from "react-native-vector-icons/EvilIcons";
import Entypo from "react-native-vector-icons/Entypo";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import Octicons from "react-native-vector-icons/Octicons";
import AntDesign from "react-native-vector-icons/AntDesign";
import Feather from "react-native-vector-icons/Feather";
import Fontisto from "react-native-vector-icons/Fontisto";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import SimpleLineIcons from "react-native-vector-icons/SimpleLineIcons";


export const Iconviewcomponent = ({ viewstyle, textstyle, textvalue, Icontag, iconstyle, icon_size, icon_color, iconname }) => {
    try {
        Icontag = findIcon_tag(Icontag);

        return (
            <View style={viewstyle}>
                <Icontag
                    size={icon_size}
                    color={icon_color}
                    name={iconname}
                    style={iconstyle} />
                {/* <Text style={textstyle}>{textvalue}</Text> */}
            </View>
        );
    } catch (error) {
        console.log("catch in iconview component ", error);
    }

};


findIcon_tag = (Icontag) => {
    try {
        switch (Icontag) {
            case "AntDesign":
                Icontag = AntDesign;
                break;
            case "Feather":
                Icontag = Feather;
                break;
            case "MaterialIcons":
                Icontag = MaterialIcons;
                break;
            case "SimpleLineIcons":
                Icontag = SimpleLineIcons;
                break;
            case "Ionicons":
                Icontag = Ionicons;
                break;
            case "FontAwesome":
                Icontag = FontAwesome;
                break;
            case "FontAwesome5":
                Icontag = FontAwesome5;
                break;
            case "MaterialCommunityIcons":
                Icontag = MaterialCommunityIcons;
                break;
            case "EvilIcons":
                Icontag = EvilIcons;
                break;
            case "Entypo":
                Icontag = Entypo;
                break;
            case "Octicons":
                Icontag = Octicons;
                break;
            case "Fontisto":
                Icontag = Fontisto;
                break;
        }
        return Icontag;
    } catch (error) {
        console.log("catch in iconview find Icon_tag ", error);
    }
}