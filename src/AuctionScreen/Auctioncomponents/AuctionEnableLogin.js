import React, {useState} from 'react';
import {
  Animated,
  Modal,
  Pressable,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Color from '../../Config/Color';
import MIcon from 'react-native-vector-icons/MaterialIcons';
import AIcon from 'react-native-vector-icons/AntDesign';
import {Button} from 'react-native-elements';
import {Poppins} from '../../Global/FontFamily';
import AuctionBottomLogin from './AuctionBottomLogin';

const AuctionEnableLogin = ({
  visible,
  setVisible,
  tabBarHeight,
  animated,
  width,
}) => {
  const [login, setLogin] = useState(false);
  return (
    <>
      {visible ? (
        <Animated.View
          style={{
            tabBarHeight,
            width,
            transform: [
              {
                translateY: animated.interpolate({
                  inputRange: [0, 1],
                  outputRange: [600, 0],
                }),
              },
            ],
            borderWidth: 1,
            borderColor: Color.lightgrey,
            paddingHorizontal: 10,
          }}>
          <Pressable style={{flex: 1}} />
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              paddingHorizontal: 10,
            }}>
            <AIcon
              name="login"
              size={18}
              color={Color.primary}
              style={{marginHorizontal: 10}}
            />
            <Text
              style={{
                flex: 1,
                fontFamily: Poppins.SemiBold,
                fontSize: 14,
                color: Color.black,
              }}
              numberOfLines={2}>
              Uncover suggestions personalized to your liking
            </Text>
            <Button
              title={'Login'}
              titleStyle={{
                fontSize: 16,
                fontFamily: Poppins.SemiBold,
                color: Color.primary,
              }}
              buttonStyle={{
                marginVertical: 20,
                borderColor: Color.primary,
                backgroundColor: Color.white,
                borderWidth: 1,
                borderRadius: 10,
                marginHorizontal: 10,
              }}
              containerStyle={{width: '30%'}}
              onPress={() => {
                setLogin(true);
              }}
            />
            <View
              style={{
                alignItems: 'flex-end',
              }}>
              <TouchableOpacity
                onPress={() => {
                  setVisible(false);
                }}
                style={{
                  // position: 'absolute',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: 30,
                  height: 30,
                  backgroundColor: Color.primary,
                  borderRadius: 100,
                  zIndex: 1,
                }}>
                <MIcon name="close" size={12} color={Color.white} />
              </TouchableOpacity>
            </View>
          </View>
        </Animated.View>
      ) : (
        <View />
      )}
      {login && <AuctionBottomLogin login={login} setLogin={setLogin} />}
    </>
  );
};

export default AuctionEnableLogin;
