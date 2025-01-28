import React, { Component } from 'react';
import { Animated, View, Image, TouchableOpacity, Text } from 'react-native';
import Color from '../../../Config/Color';
import { base_albionbankauctions_url } from '../../../Config/base_url';
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
    var { showModal } = this.props;
    var { images, animScrollBarOpacityVal, animScrollXVal, scrollXVal, width, active, planStatus, expiredStatus } =
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
              console.log("isRestricted --------------", isRestricted);

              return (
                <TouchableOpacity key={i} onPress={() => !isRestricted && showModal(i)}>
                  <Image
                    source={{
                      uri: base_albionbankauctions_url + image?.image_url,
                    }}
                    resizeMode="cover"
                    style={[
                      { flex: 1, width, height: '100%' },
                      isRestricted && { opacity: 0.2 }, // Apply transparency
                    ]}
                  />
                  {isRestricted && (
                    <View
                      style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        backgroundColor: 'rgba(58, 58, 58, 0.1)', // Add semi-transparent overlay
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}
                    >
                      <View style={{ flex: 1, width, height: '100%', justifyContent: 'center', alignItems: 'center' }}>
                        <Image
                          source={require('../../../assets/image/crown.png')}
                          style={{
                            width: '40%',
                            height: '40%',
                            resizeMode: 'center',
                            borderRadius: 100,
                          }}
                        />
                      </View>
                      {/* <Text style={{ color: '#000', fontSize: 16, fontWeight: 'bold', textAlign: 'center' }}>
                        Access to this image requires an active plan.
                      </Text> */}
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
