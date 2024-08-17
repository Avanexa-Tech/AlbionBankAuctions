import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Color from '../Config/Color';
import MCIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import { Poppins } from '../Global/FontFamily';

const CheckboxData = ({ label, checked, onPress }) => {
  return (
    <TouchableOpacity style={styles.checkboxContainer} onPress={onPress}>
      {/* <View style={[styles.checkbox, checked && styles.checkedBox]} /> */}
      <MCIcon
        name={!checked ? 'checkbox-blank-outline' : 'checkbox-marked'}
        size={25}
        color={!checked ? Color.cloudyGrey : Color.primary}
      />
      <Text style={styles.TextData}>{label}</Text>
    </TouchableOpacity>
  );
};

export const AmenitiesCheckbox = ({ label, checked, onPress }) => {
  return (
    <TouchableOpacity style={styles.checkboxContainer} onPress={onPress}>
      <Text style={styles.TextData}>{label}</Text>
      <MCIcon
        name={!checked ? 'checkbox-blank-outline' : 'checkbox-marked'}
        size={25}
        color={!checked ? Color.cloudyGrey : Color.primary}
      />
    </TouchableOpacity>
  );
};

export const RightCheckBox = ({ label, checked, onPress }) => {
  return (
    <TouchableOpacity style={styles.checkboxContainer} onPress={onPress}>
      <Text style={styles.TextData}>{label}</Text>
      <MCIcon
        name={!checked ? 'checkbox-blank-outline' : 'checkbox-marked'}
        size={25}
        color={!checked ? Color.cloudyGrey : Color.primary}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    marginVertical: 5
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: '#000',
    marginRight: 10,
  },
  checkedBox: {
    backgroundColor: '#000',
  },
  TextData: {
    flex: 1,
    fontSize: 14,
    color: Color.black,
    marginHorizontal: 10,
    fontFamily: Poppins.Medium,
  },
});

export default CheckboxData;
