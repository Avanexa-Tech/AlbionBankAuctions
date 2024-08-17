import React from 'react';
import { Text, View, FlatList, TouchableOpacity, Image } from 'react-native';
import { Categories } from './Content';
import Color from '../../Config/Color';
import { Poppins } from '../../Global/FontFamily';

const CategoriesList = ({ navigation }) => {
  return (
    <View style={{ flex: 1, backgroundColor: Color.white, padding: 10 }}>
      <FlatList
        data={Categories}
        keyExtractor={(item, index) => item + index}
        numColumns={4}
        renderItem={({ item, index }) => {
          return (
            <View
              style={{
                flex: 1,
                margin: 5,
                paddingTop: 5,
                borderRadius: 10,
              }}>
              <TouchableOpacity
                key={index}
                onPress={() => {
                  navigation.navigate('ListScreen', {
                    property_sub_category: item?.value,
                    event_bank: '',
                  });
                }}
                style={{
                  flex: 1,
                  alignItems: 'center',
                }}>
                <View
                  style={{
                    flex: 1,
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: 5,
                    backgroundColor: '#FCE1EB50',
                    // shadowColor: '#000',
                    // shadowOffset: {
                    //   width: 0,
                    //   height: 1,
                    // },
                    // shadowOpacity: 0.2,
                    // shadowRadius: 1.41,
                    // elevation: 2,
                    padding: 10,
                  }}>
                  <Image
                    source={{ uri: item.image }}
                    style={{
                      // width: 30,
                      // height: 30,
                      // resizeMode: 'contain',
                      borderRadius: 10,
                      height: 40,
                      width: 40,
                      resizeMode: 'contain',
                    }}
                  />
                </View>
                <Text
                  style={{
                    fontSize: 12,
                    color: Color.lightBlack,
                    fontFamily: Poppins.Medium,
                    marginTop: 5,
                  }}>
                  {item.label?.length > 10
                    ? item.label?.substring(0, 8).concat('...')
                    : item?.label}
                </Text>
              </TouchableOpacity>
            </View>
          );
        }}
      />
    </View>
  );
};

export default CategoriesList;
