import React, { memo } from 'react';
import {StyleSheet, View} from 'react-native';
import Color from '../../Config/Color';

const RailSelected = () => {
  return (
    <View style={styles.root}/>
  );
};

export default memo(RailSelected);

const styles = StyleSheet.create({
  root: {
    height: 6,
    backgroundColor: Color.primary,
    borderRadius: 2,
  },
});