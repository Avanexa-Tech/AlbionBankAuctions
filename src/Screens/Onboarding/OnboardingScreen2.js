import React, { useState, useCallback, useRef } from 'react';
import {
  Dimensions,
  FlatList,
  ScrollView,
  TextInput,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Image,
  View,
} from 'react-native';
import { Button } from 'react-native-elements';
import Color from '../../Config/Color';
import { Media } from '../../Global/Media';
import { primarycolor } from '../../Utils/Colors';
import { useDispatch } from 'react-redux';
import { setLoginType } from '../../Redux';

const { width, height } = Dimensions.get('screen');
const WIDTH_IMAGE = width - 80;
const HEIGHT_IMAGE = (WIDTH_IMAGE * 390) / 375;

const OnboardingScreen2 = ({ navigation }) => {
  const dispatch = useDispatch();
  const videoPlayer = useRef(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [paused, setPaused] = useState(false);
  const [screenType, setScreenType] = useState('contain');

  return (
    <SafeAreaView
      edges={['top']}
      style={{
        ...styles.container,
        backgroundColor: Color.white,
      }}>

      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Image source={require('../../assets/Gif/onboard.gif')} style={{ width: "100%", height: "100%", resizeMode: "contain" }} />
      </View>

      <View
        style={{
          width: '100%',
          flexDirection: 'row',
          alignItems: 'flex-end',
          justifyContent: 'flex-end',
          padding: 10,
        }}>
        <Button
          title={'Next'}
          titleStyle={{
            fontSize: 12,
            fontFamily: 'Poppins-SemiBold',
          }}
          buttonStyle={{
            width: 100,
            height: 40,
            backgroundColor: Color.primary,
            borderRadius: 50,
            alignItems: "center", justifyContent: "center"
          }}
          iconRight={true}
          containerStyle={styles.buttonContainer}
          onPress={() => {
            // navigation.replace('TabNavigator');
            // dispatch(setLoginType('properties'));

            // navigation.navigate('ActionSelect');

            navigation.replace('ActionLogin');
            dispatch(setLoginType('Auction'));
          }}
        />
      </View>
    </SafeAreaView>
  );
};

export default OnboardingScreen2;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  viewItem: {
    marginTop: 40,
    padding: 10,
  },
  image: {
    width: '100%',
    height: HEIGHT_IMAGE,
  },
  viewInfo: {
    marginVertical: 10,
    alignItems: 'center',
  },
  text: {
    fontFamily: 'Poppins-Bold',
    fontSize: 25,
    textAlign: 'center',
    fontWeight: '700',
  },
  subtext: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 14,
    textAlign: 'center',
    marginVertical: 20,
    lineHeight: 20,
  },
  viewPagination: {
    justifyContent: 'center',
  },
  buttonTitle: {
    marginVertical: 2,
    fontFamily: 'Poppins-Medium',
    fontSize: 15,
  },
  button: {
    backgroundColor: '#2B2A28',
  },
  buttonContainer: {
    marginHorizontal: 20,
    // width:"40%",
    alignItems: 'flex-end',
  },
  mediaPlayer: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
