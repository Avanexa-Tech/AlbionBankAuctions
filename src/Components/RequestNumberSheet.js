import React, { useRef, useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import RBSheet from 'react-native-raw-bottom-sheet';
import OtpVerification from './OtpVerification';
import Color from '../Config/Color';
import { Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/Ionicons';
import MIcon from 'react-native-vector-icons/MaterialIcons';
import MCIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import F6Icon from 'react-native-vector-icons/FontAwesome6';
import FIcon from 'react-native-vector-icons/FontAwesome';
import F5Icon from 'react-native-vector-icons/FontAwesome5';
import common_fn from '../Config/common_fn';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Iconviewcomponent } from './Icontag';

const RequestNumberSheet = props => {
  var {
    NumberRBSheet,
    setOtpVisible,
    otpVisible,
    verifyOtp,
  } = props;
  const [height, setHeight] = useState(undefined);
  const [code, setCode] = useState('');
  const [isPinReady, setIsPinReady] = useState(false);
  const inputRef = useRef();

  return (
    <RBSheet
      ref={NumberRBSheet}
      closeOnDragDown={false}
      closeOnPressMask={false}
      customStyles={{
        wrapper: {
          backgroundColor: Color.transparantBlack,
        },
        draggableIcon: {
          backgroundColor: Color.transparantBlack,
        },
        container: {
          padding: 15,
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          height: height,
        },
      }}
      onClose={() => {
        NumberRBSheet?.current?.close();
      }}>
      <View style={{ marginVertical: 10 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
          <Text
            style={{
              fontFamily: 'Poppins-Bold',
              fontSize: 16,
              fontWeight: '700',
              color: Color.black,
              marginHorizontal: 10,
            }}>
            Enter Your OTP Code
          </Text>

          <TouchableOpacity onPress={() => NumberRBSheet?.current?.close()}>
            <Iconviewcomponent
              Icontag={'AntDesign'}
              iconname={'closecircleo'}
              icon_size={24}
              icon_color={Color.primary}
            />
          </TouchableOpacity>
        </View>

        <View style={{ alignItems: 'center', marginVertical: 10 }}>
          <OtpVerification
            code={code}
            setCode={setCode}
            maximumLength={4}
            inputRef={inputRef}
            setIsPinReady={setIsPinReady}
          />
        </View>
        <Button
          title={'SUBMIT'}
          onPress={() => {
            verifyOtp(code);
          }}
          buttonStyle={{ backgroundColor: Color.primary }}
        />
      </View>
    </RBSheet>
  );
};

export default RequestNumberSheet;
