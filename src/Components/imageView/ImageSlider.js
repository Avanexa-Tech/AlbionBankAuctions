import React, {Component} from 'react';
import {Animated, View, Image, TouchableOpacity} from 'react-native';
import { base_image_properties } from '../../Config/base_url';
import Color from '../../Config/Color';
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
    var {images, width} = this.props;
    var {animScrollXVal} = this.state;
    var scrollXVal = animScrollXVal.interpolate({
      inputRange: [0, width * (images.length - 1)],
      outputRange: [0, (width / images.length) * (images.length - 1)],
      extrapolate: 'clamp',
    });
    this.setState({images, scrollXVal, width});
  }

  setImageRef = node => {
    if (node) {
      this.imageRef = node;
    }
  };

  render() {
    var {showModal} = this.props;
    var {images, animScrollBarOpacityVal, animScrollXVal, scrollXVal, width} =
      this.state;
    return (
      <View
        style={{
          flex: 1,
          flexGrow: 1,
          alignItems: 'center',
          justifyContent: 'flex-start',
        }}>
        <View style={{height: 220, zIndex: 1}}>
          <Animated.ScrollView
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            scrollEventThrottle={10}
            style={{flex: 1}}
            onScroll={Animated.event(
              [{nativeEvent: {contentOffset: {x: animScrollXVal}}}],
              {useNativeDriver: true},
            )}>
            {images.map((image, i) => {
              return (
                <TouchableOpacity key={i} onPress={() => showModal(i)}>
                  <Image
                    source={{
                      uri: image?.image_url,
                    }}
                    resizeMode="cover"
                    style={{flex: 1, width, height: '100%'}}
                  />
                </TouchableOpacity>
              );
            })}
          </Animated.ScrollView>
          <Animated.View style={{width: width / 5, height: 5}}>
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
                    transform: [{translateX: scrollXVal}],
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
