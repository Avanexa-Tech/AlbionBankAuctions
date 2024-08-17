import React, {useState, useEffect} from 'react';
import {StyleSheet} from 'react-native';
import {Pressable, TextInput, View, Keyboard, Text} from 'react-native';
import Color from '../Config/Color';
import {Poppins} from '../Global/FontFamily';

const OTPInput = ({
  inputRef,
  code,
  setCode,
  maximumLength,
  setIsPinReady,
  chkOTPError,
}) => {
  const boxArray = new Array(maximumLength).fill(0);

  const [isInputBoxFocused, setIsInputBoxFocused] = useState(false);

  const handleOnPress = () => {
    setIsInputBoxFocused(true);
    inputRef.current.focus();
  };

  const handleOnBlur = () => {
    setIsInputBoxFocused(false);
  };

  useEffect(() => {
    setIsPinReady(code.length === maximumLength);
    return () => {
      setIsPinReady(false);
    };
  }, [code]);

  useEffect(() => {
    const otpTimeout = setTimeout(() => inputRef.current.focus(), 0);
    return () => {
      clearInterval(otpTimeout);
    };
  }, []);

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
          ...styles.BoxInputView,
          borderColor: digit ? Color.green : Color.black,
        }}>
        <Text style={styles.BoxInputValue}>{digit}</Text>
      </View>
    );
  };
  useEffect(() => {
    if (code.length === 4) {
      Keyboard.dismiss();
    }
  }, [code.length]);
  return (
    <View style={styles.OtpContainer}>
      <Pressable style={styles.otpPressable} onPress={handleOnPress}>
        {boxArray.map(boxDigit)}
      </Pressable>
      <TextInput
        autoComplete="sms-otp"
        textContentType="oneTimeCode"
        style={styles.TextInputValue}
        keyboardType="numeric"
        value={code}
        // onFocus={code.length == 4 ? Keyboard.dismiss() : setCode}
        autoFocus={true}
        onChangeText={value => {
          setCode(value);
          chkOTPError(value);
        }}
        maxLength={maximumLength}
        ref={inputRef}
        onBlur={handleOnBlur}
      />
    </View>
  );
};

export default OTPInput;

const styles = StyleSheet.create({
  BoxInputView: {
    borderColor: Color.cloudyGrey,
    borderWidth: 1,
    borderRadius: 10,
    padding: 12,
    minWidth: 60,
    height: 60,
    justifyContent: 'center',
    marginHorizontal: 30,
  },
  BoxInputValue: {
    fontSize: 18,
    fontFamily: Poppins.SemiBold,
    textAlign: 'center',
    color: Color.black,
    paddingTop: 5,
  },
  OtpContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  otpPressable: {
    width: '80%',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  TextInputValue: {
    position: 'absolute',
    opacity: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
