import React from 'react';
import {
  Dimensions,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  Animated,
  StyleSheet,
} from 'react-native';
import Color from '../../Config/Color';
import {Divider} from 'react-native-elements';
import Icon from 'react-native-vector-icons/Ionicons';
import MIcon from 'react-native-vector-icons/MaterialIcons';
import F6Icon from 'react-native-vector-icons/FontAwesome6';
import {Poppins} from '../../Global/FontFamily';

var {width, height} = Dimensions.get('screen');

export const CommonTabView = (
  index,
  icon,
  text,
  propertyType,
  AutoFilter,
  currentCity,
  currentCityid,
  tabIndex,
) => (
  <TouchableOpacity
    key={index}
    style={{
      ...styles.TabViewServices,
      backgroundColor: tabIndex === index ? Color.primary : Color.white,
    }}
    onPress={() => {
      navigation.navigate('propertyPage', {
        location: AutoFilter?.length !== '' ? AutoFilter : currentCity,
        property_action: 'sell,rent',
        filter: false,
        property_type: propertyType,
        data: {},
        real_estate: 'residential',
        city_id: currentCityid,
      });
      setAgentIndex(index);
    }}>
    {icon &&
      React.createElement(icon, {
        size: 20,
        color: tabIndex === index ? Color.white : Color.cloudyGrey,
      })}
    <Text
      style={{
        ...styles.TabViewName,
        color: tabIndex === index ? Color.white : Color.cloudyGrey,
        fontFamily: tabIndex === index ? Poppins.SemiBold : Poppins.Medium,
      }}>
      {text}
    </Text>
    {tabIndex === index && (
      <Divider
        style={{
          width: width / (index === 3 ? 10 : 15),
          backgroundColor: Color.primary,
          height: 2,
        }}
      />
    )}
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  TabviewContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginTop: 15,
    marginBottom: 10,
  },
  TabViewName: {
    fontSize: 14,
  },
  TabViewServices: {
    marginHorizontal: 10,
    alignItems: 'center',
    width: 100,
    height: 80,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: Color.lightgrey,
    justifyContent: 'center',
  },
  TabViewDivider: {
    width: width / 15,
    backgroundColor: 'black',
    height: 1,
  },
  TabViewAboutus: {marginHorizontal: 20, alignItems: 'center'},
  customRatingBarStyle: {
    justifyContent: 'center',
    flexDirection: 'row',
    marginTop: 30,
  },
  starImageStyle: {
    width: 40,
    height: 40,
    resizeMode: 'cover',
  },

  NumberBoxConatiner: {
    width: '100%',
    borderColor: Color.cloudyGrey,
    borderWidth: 1,
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
    borderRadius: 10,
    backgroundColor: 'white',
  },
  numberCountryCode: {
    color: Color.cloudyGrey,
    marginHorizontal: 10,
    fontSize: 16,
    fontFamily: 'Poppins-SemiBold',
  },
  invalidLogin: {
    width: '100%',
    fontSize: 12,
    color: 'red',
    marginTop: 5,
  },
  numberTextBox: {
    flex: 1,
    height: 50,
    padding: 10,
    borderLeftColor: Color.cloudyGrey,
    borderLeftWidth: 1,
    color: Color.black,
    marginVertical: 10,
    fontSize: 16,
    // fontFamily: 'Poppins-SemiBold',
  },
});
