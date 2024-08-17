import * as React from 'react';
import {CommonActions, StackActions} from '@react-navigation/native';

export const navigationRef = React.createRef();

export const navigate = (name, params) => {
  navigationRef.current?.navigate(name, params);
};

export function replace(routeName, params) {
  navigationRef.current?.dispatch(StackActions.replace(routeName, params));
}

export function resetRoot(routeName) {
  navigationRef.current?.dispatch(
    CommonActions.reset({
      index: 0,
      routes: [{name: routeName}],
    }),
  );
}
