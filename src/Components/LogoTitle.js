import React from 'react';
import { View, Text, Image } from 'react-native';
import { Media } from '../Global/Media';

const LogoTitle = () => {
  return (
    <Image
      source={{ uri: Media.mainlogo }}
      style={{ width: 150, height: 40, resizeMode: 'contain' }}
    />
  );
};

export const PrimeLogoTitle = () => {
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
      <Image
        source={{ uri: Media.prime }}
        style={{
          width: 35,
          height: 35,
          resizeMode: 'contain',
        }}
      />
      <View
        style={{
          paddingHorizontal: 5,
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'row',
        }}>
        <Text style={{ fontSize: 18, color: 'black', fontWeight: 'bold' }}>
          ALBION{' '}
        </Text>
        <Text style={{ fontSize: 18, color: '#F28622', fontWeight: 'bold' }}>
          Prime
        </Text>
      </View>
    </View>
  );
};

export default LogoTitle;
