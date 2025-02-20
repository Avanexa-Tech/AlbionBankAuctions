import React, { Component } from 'react';
import { Animated, View, Image, TouchableOpacity, Text, ToastAndroid } from 'react-native';
import Color from '../../../Config/Color';
import { base_albionbankauctions_url } from '../../../Config/base_url';
import { Iconviewcomponent } from '../../../Components/Icontag';
//Config

export default class ImageSlider extends Component {
  constructor(props) {
    
    super(props);
    this.state = {
      images: [],
      animScrollBarOpacityVal: new Animated.Value(1),
      animScrollXVal: new Animated.Value(0),
      scrollXVal: 0,
      width: 0,
    };
  }



  componentDidMount() {
    var { images, width, planStatus, expiredStatus, active } = this.props;
    var { animScrollXVal } = this.state;
    var scrollXVal = animScrollXVal.interpolate({
      inputRange: [0, width * (images.length - 1)],
      outputRange: [0, (width / images.length) * (images.length - 1)],
      extrapolate: 'clamp',
    });
    this.setState({ images, scrollXVal, width });
  }

  setImageRef = node => {
    if (node) {
      this.imageRef = node;
    }
  };

  render() {
    var { showModal,planStatus,active,expiredStatus } = this.props;
    var { images, animScrollBarOpacityVal, animScrollXVal, scrollXVal, width } =
      this.state;
    
    return (
      <View
        style={{
          flex: 1,
          flexGrow: 1,
          alignItems: 'center',
          justifyContent: 'flex-start',
        }}>
        <View style={{ height: 220, zIndex: 1 }}>
          <Animated.ScrollView
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            scrollEventThrottle={10}
            style={{ flex: 1 }}
            onScroll={Animated.event(
              [{ nativeEvent: { contentOffset: { x: animScrollXVal } } }],
              { useNativeDriver: true },
            )}>

            {images.map((image, i) => {
              // const isRestricted = active === 1 || (planStatus > 1 && expiredStatus !== "expired");
              const isRestricted = !(planStatus > 1 && expiredStatus !== 'expired')
              
              // console.log("isRestricted --------------", isRestricted);
              return (
                <TouchableOpacity key={i}
                  onPress={() => {
                    //  !isRestricted && showModal(i)
                    if (isRestricted) {
                      // Navigate to a specific screen or show an alert if restricted
                      // navigation.navigate('RestrictedScreen'); // Replace 'RestrictedScreen' with your desired route
                      this.props.navigation.navigate('AuctionPrime');
                      // ToastAndroid.show('Modal not open', ToastAndroid.LONG,);
                    } else {
                      showModal(i); // Show the modal if not restricted
                    }
                  }}
                >
                  <Image
                    source={{
                      uri: base_albionbankauctions_url + image?.image_url,
                    }}
                    resizeMode="cover"
                    style={[
                      { flex: 1, width, height: '100%' },
                    ]}
                    blurRadius={isRestricted ? 25 : 0}
                  />
                  {isRestricted && (
                    <View
                      style={{
                        position: "absolute",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        height: "100%",
                        width: "100%"
                      }}
                    >
                      <Iconviewcomponent
                        Icontag={'MaterialCommunityIcons'}
                        iconname={"shield-crown"}
                        icon_size={60}
                        icon_color={"#F6C324"}
                      />
                    </View>
                  )}
                </TouchableOpacity>
              );
            })}
          </Animated.ScrollView>
          <Animated.View style={{ width: width / 5, height: 5 }}>
            {images.length > 0 && (
              <Animated.View
                style={{
                  backgroundColor: '#E5E5E5',
                  opacity: animScrollBarOpacityVal,
                }}>
                <Animated.View
                  style={{
                    backgroundColor: Color.primary,
                    width: width / images.length,
                    height: 5,
                    transform: [{ translateX: scrollXVal }],
                  }}
                />
              </Animated.View>
            )}
          </Animated.View>
        </View>
      </View>
    );
  }
}
