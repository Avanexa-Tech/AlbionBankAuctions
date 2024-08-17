import React, {useState, useCallback} from 'react';
import {View, TextInput} from 'react-native';
import Thumb from './Slider/Thumb';
import Rail from './Slider/Rail';
import RailSelected from './Slider/RailSelected';
import Color from '../Config/Color';

const CustomRange = props => {
  const {
    low,
    setLow,
    high,
    setHigh,
    min,
    setMin,
    max,
    setMax,
    handleValueChange,
  } = props;

  // State for text input values
  const [textInputLow, setTextInputLow] = useState(low.toString());
  const [textInputHigh, setTextInputHigh] = useState(high.toString());

  // Callbacks to handle text input changes
  const handleTextInputLowChange = value => {
    setTextInputLow(value);
    setLow(parseInt(value));
    if (parseInt(value) > high) {
      setHigh(parseInt(value));
      setTextInputHigh(value);
    }
  };

  const handleTextInputHighChange = value => {
    setTextInputHigh(value);
    setHigh(parseInt(value));
    if (parseInt(value) < low) {
      setLow(parseInt(value));
      setTextInputLow(value);
    }
  };

  // Render functions for range slider components
  const renderThumb = useCallback(() => <Thumb />, []);
  const renderRail = useCallback(() => <Rail />, []);
  const renderRailSelected = useCallback(() => <RailSelected />, []);

  return (
    <View>
      {/* Text inputs for min and max values */}
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          marginVertical: 10,
        }}>
        <TextInput
          placeholder="Enter your Min Amount"
          placeholderTextColor={Color.cloudyGrey}
          value={textInputLow}
          onChangeText={handleTextInputLowChange}
          style={{
            backgroundColor: 'white',
            borderColor: 'gray',
            borderWidth: 1,
            paddingHorizontal: 10,
            borderRadius: 5,
            width: '45%',
            marginHorizontal: 10,
            color: Color.black,
          }}
        />
        <TextInput
          placeholder="Enter your Max Amount"
          placeholderTextColor={Color.cloudyGrey}
          value={textInputHigh}
          onChangeText={handleTextInputHighChange}
          style={{
            backgroundColor: 'white',
            borderColor: 'gray',
            borderWidth: 1,
            paddingHorizontal: 10,
            borderRadius: 5,
            width: '45%',
            marginHorizontal: 10,
            color: Color.black,
          }}
        />
      </View>

      {/* Range slider */}
      {/* <RangeSlider
        style={{marginTop: 15}}
        min={min || 0}
        max={max || 100}
        step={1}
        low={low}
        high={high}
        renderThumb={renderThumb}
        renderRail={renderRail}
        renderRailSelected={renderRailSelected}
        onValueChanged={(low, high) => {
          setLow(low);
          setHigh(high);
          setTextInputLow(low.toString());
          setTextInputHigh(high.toString());
          handleValueChange(low, high);
        }}
      /> */}
    </View>
  );
};

export default CustomRange;
