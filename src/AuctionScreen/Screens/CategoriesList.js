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
        // numColumns={4}
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
                  width: '100%',
                  display:"flex",
                  flexDirection: 'row',
                  alignItems: 'center', backgroundColor: '#FCE1EB50', paddingVertical: 10, borderRadius: 5
                }}>
                <View
                  style={{
                    flex: 1,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <Image
                    source={{ uri: item.image }}
                    style={{
                      borderRadius: 10,
                      height: 70,
                      width: 70,
                      resizeMode: 'contain',
                    }}
                  />
                </View>
                <View style={{ flex: 3, justifyContent: 'center', alignItems: 'flex-start' }}>
                  <Text
                    style={{
                      fontSize: 16,
                      color: Color.lightBlack,
                      fontFamily: Poppins.SemiBold,
                    }}>
                    {item?.label}
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          );
        }}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

export default CategoriesList;
