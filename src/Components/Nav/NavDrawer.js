import React from 'react';
import {TouchableOpacity} from 'react-native';
import F5Icon from 'react-native-vector-icons/FontAwesome5';
import Color from '../../Config/Color';

export const NavigationDrawerStructure =({navigation}) => {
  var {toggleDrawer} = navigation;
  return (
    <TouchableOpacity
      onPress={() => toggleDrawer()}
      style={{borderColor: Color.smokeyGrey}}>
      <F5Icon
        name={'align-left'}
        color={Color.white}
        size={25}
        style={{marginStart: 15}}
      />
    </TouchableOpacity>
  );
};
