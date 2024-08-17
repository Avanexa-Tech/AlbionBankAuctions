import React, {Component, createRef} from 'react';
import {Animated, View} from 'react-native';
//Component
import ZoomView from './zoom_view';
import {base_image_properties} from '../../Config/base_url';
import Color from '../../Config/Color';

export default class ImageZoom extends Component {
  scrollView = createRef();

  constructor(props) {
    super(props);
    this.state = {
      images: [],
      width: 0,
      height: 0,
      index: 0,
      animScrollBarOpacityVal: new Animated.Value(1),
      animScrollXVal: new Animated.Value(0),
      scrollXVal: 0,
    };
  }

  componentDidMount() {
    var {images, width, height, index} = this.props;
    this.setState({images, width, height, index});
  }

  render() {
    var {
      images,
      animScrollBarOpacityVal,
      animScrollXVal,
      width,
      height,
      index,
    } = this.state;
    var x = width * index;
    var val = 0;
    switch (images.length) {
      case 1:
      case 2:
        val = 0;
        break;
      case 3:
        val = 33;
        break;
      case 4:
        val = 50;
        break;
      case 5:
        val = 59;
        break;
      case 6:
        val = 65;
        break;
      case 7:
        val = 70;
        break;
      case 8:
        val = 74;
        break;
    }
    var scrollXVal = animScrollXVal.interpolate({
      inputRange: [0, width * (images.length - 1)],
      outputRange: [
        0,
        (width / images.length) * (images.length - 1) - (100 + val),
      ],
      extrapolate: 'clamp',
    });
    if (index > 0) {
      setTimeout(
        () => this.scrollView.current.scrollTo({x, y: 0, animated: true}),
        1,
      );
    }

    return (
      <View
        style={{
          flex: 1,
          flexGrow: 1,
          alignItems: 'center',
          justifyContent: 'flex-start',
          backgroundColor: '#00000080',
        }}>
        <Animated.ScrollView
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          scrollEventThrottle={10}
          style={{flex: 1}}
          ref={this.scrollView}
          onScroll={Animated.event(
            [{nativeEvent: {contentOffset: {x: animScrollXVal}}}],
            {useNativeDriver: true},
          )}>
          {images.map((image, i) => {
            return (
              <ZoomView
                key={i}
                initialData={{
                  uri:  image?.image_url,
                }}
                width={width}
                height={height}
              />
            );
          })}
        </Animated.ScrollView>
        <View
          style={{
            position: 'absolute',
            bottom: 0,
            flexDirection: 'row',
            width: width - 200,
            height: 50,
          }}>
          {images.map((image, i) => {
            return (
              <View
                key={i}
                style={{
                  flex: 1,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <View
                  style={{
                    backgroundColor: Color.transparantBlack,
                    width: 10,
                    height: 10,
                    borderRadius: 5,
                  }}
                />
              </View>
            );
          })}
        </View>
        <Animated.View style={{width, height: 50, justifyContent: 'center'}}>
          {images.length > 0 && (
            <Animated.View
              style={{
                backgroundColor: 'transparent',
                opacity: animScrollBarOpacityVal,
                width: width - (width / images.length + 1) - (90 + val),
                alignSelf: 'center',
              }}>
              <Animated.View
                style={{
                  backgroundColor: 'white',
                  width: 10,
                  height: 10,
                  borderRadius: 5,
                  transform: [{translateX: scrollXVal}],
                }}
              />
            </Animated.View>
          )}
        </Animated.View>
      </View>
    );
  }
}
