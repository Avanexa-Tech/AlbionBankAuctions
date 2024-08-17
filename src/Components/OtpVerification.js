import React, {useRef, useState, useEffect} from 'react';
import {Keyboard, Text} from 'react-native';
import {Pressable, TextInput, View} from 'react-native';
import {useSelector} from 'react-redux';
import Color from '../Config/Color';

const OtpVerification = ({
  inputRef,
  code,
  setCode,
  maximumLength,
  setIsPinReady,
}) => {
  const boxArray = new Array(maximumLength).fill(0);
  //   const inputRef = useRef();

  const [isInputBoxFocused, setIsInputBoxFocused] = useState(false);

  const handleOnPress = () => {
    setIsInputBoxFocused(true);
    inputRef.current.focus();
  };

  const handleOnBlur = () => {
    setIsInputBoxFocused(false);
  };

  useEffect(() => {
    // update pin ready status
    setIsPinReady(code.length === maximumLength);
    // clean up function
    return () => {
      setIsPinReady(false);
    };
  }, [code]);
  useEffect(() => {
    if (code.length == 4) {
      Keyboard.dismiss();
    }
  }, [code]);
  useEffect(() => {
    const kListener = Keyboard.addListener('keyboardDidHide', () => {
      Keyboard.dismiss();
    });

    return () => {
      kListener.remove();
    };
  }, []);
  const boxDigit = (_, index) => {
    const emptyInput = '';
    const digit = code[index] || emptyInput;
    return (
      <View
        key={index}
        style={{
          borderColor: digit ? Color.green : Color.black,
          borderWidth: 1,
          borderRadius: 5,
          padding: 10,
          minWidth: 40,
          marginVertical: 20,
          marginHorizontal: 20,
        }}>
        <Text
          style={{
            fontSize: 14,
            textAlign: 'center',
            color: Color.black,
          }}>
          {digit}
        </Text>
      </View>
    );
  };

  return (
    <View
      style={{
        justifyContent: 'center',
      }}>
      <Pressable
        style={{
          width: '80%',
          flexDirection: 'row',
          justifyContent: 'space-evenly',
        }}
        onPress={handleOnPress}>
        {boxArray.map(boxDigit)}
      </Pressable>
      <TextInput
        style={{
          position: 'absolute',
          opacity: 0,
        }}
        keyboardType="number-pad"
        value={code}
        onChangeText={setCode}
        maxLength={maximumLength}
        ref={inputRef}
        onBlur={handleOnBlur}
      />
    </View>
  );
};

export default OtpVerification;
