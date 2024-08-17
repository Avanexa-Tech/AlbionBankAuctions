import React, {useEffect, useRef, useState} from 'react';
import {
  Dimensions,
  Image,
  PermissionsAndroid,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
// import Carousel, {Pagination} from 'react-native-snap-carousel';
import {Button} from 'react-native-elements';
import Icon from 'react-native-vector-icons/Ionicons';
import Color from '../../Config/Color';
import {Media} from '../../Global/Media';

const {width, height} = Dimensions.get('screen');
const WIDTH_IMAGE = width - 80;
const HEIGHT_IMAGE = (WIDTH_IMAGE * 390) / 375;

const OnboardingScreen1 = ({navigation}) => {
  // const carouselRef = useRef();
  // const carouselRef1 = useRef();
  const [activeItem, setActiveItem] = useState(0);
  const [FirstactiveItem, setFirstActiveItem] = useState(0);
  var {replace} = navigation;

  // const moveNext = () => {
  //   activeItem == 0 ? setActiveItem(1) : carouselRef.current.snapToNext();
  // };

  // const movePrev = () => {
  //   activeItem == 1 ? setActiveItem(0) : carouselRef.current.snapToPrev();
  // };


  const data = [
    {
      image: Media.cityBackground,
      title: '“Right destination',
      subTitle: '',
    },
    {
      image: Media.cityBackground,
      title: '“To Own a Property',
      subTitle: '',
    },
    {
      image: Media.location,
      title: 'Enable Location',
      subTitle: 'Please turn on your current location for better search...',
    },
  ];

  const animateData = [
    {
      image: Media.GetStart1,
      title: 'Looking For Home',
      subTitle: 'Lorem Ipsum...',
    },
    {
      image: Media.GetStart2,
      title: 'Rent For Home',
      subTitle: 'Lorem Ipsum...',
    },
    {
      image: Media.GetStart3,
      title: 'Get Key From The Home',
      subTitle: 'Lorem Ipsum...',
    },
  ];

  const checkPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION,
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      }
    } catch (err) {
      console.log('location  ', err);
    }
  };

  return (
    <SafeAreaView
      edges={['top']}
      style={{
        ...styles.container,
        backgroundColor: Color.white,
      }}>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('OnboardingScreen2');
        }}>
        <Text
          style={{
            fontFamily: 'Poppins-SemiBold',
            fontSize: 16,
            textAlign: 'right',
            color: Color.black,
            fontWeight: 'bold',
            marginRight: 10,
            marginVertical: 10,
          }}>
          Skip
        </Text>
      </TouchableOpacity>
      {/* <Carousel
        ref={carouselRef1}
        onSnapToItem={index => setFirstActiveItem(index)}
        data={animateData}
        renderItem={({item, index}) => {
          var {image, title, subTitle} = item;
          var colorText = title.split(' ').map((word, i) => (
            <Text key={i}>
              <Text
                style={{
                  color:
                    (word == '“Right' && Color.primary) ||
                    (word == 'Own' && Color.primary),
                }}>
                {word}{' '}
              </Text>
            </Text>
          ));
          return (
            <View key={index} style={styles.viewItem}>
              <Image source={image} style={styles.image} />
              <View style={styles.viewInfo}>
                <Text
                  style={{
                    ...styles.text,
                    color: Color.black,
                  }}>
                  {colorText}
                </Text>
                <Text
                  style={{
                    ...styles.subtext,
                    color: Color.cloudyGrey,
                  }}>
                  {subTitle}
                </Text>
              </View>
            </View>
          );
        }}
        loop={true}
        autoplay={true}
        autoplayInterval={5000}
        sliderWidth={width}
        itemWidth={width}
      />
      <Pagination
        dotsLength={animateData.length}
        activeDotIndex={FirstactiveItem}
        containerStyle={{backgroundColor: 'transparent'}}
        dotStyle={{
          width: 15,
          height: 10,
          borderRadius: 5,
          backgroundColor: Color.primary,
        }}
        inactiveDotStyle={{
          width: 10,
          height: 10,
          borderRadius: 5,
          backgroundColor: Color.black,
        }}
      /> */}
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: 10,
        }}>
        <View style={{flex: 1}} />
        <View style={styles.viewButton}>
          <Button
            title={'Next'}
            titleStyle={{
              fontSize: 14,
              fontFamily: 'Poppins-SemiBold',
              marginHorizontal: 10,
            }}
            buttonStyle={{
              width: 120,
              backgroundColor: Color.primary,
              borderRadius: 50,
            }}
            iconRight={true}
            containerStyle={{...styles.buttonContainer}}
            onPress={() => {
              navigation.navigate('OnboardingScreen2');
            }}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default OnboardingScreen1;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  carousel: {
    flex: 1,
    alignSelf: 'center',
    justifyContent: 'center',
  },
  viewItem: {
    marginTop: 40,
    padding: 10,
  },
  image: {
    width: '100%',
    height: HEIGHT_IMAGE,
    resizeMode: 'contain',
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
  viewButton: {
    // marginBottom: 20,
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
});