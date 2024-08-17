import React from 'react';
import Lottie from 'lottie-react-native';
import { Media } from '../Global/Media';

export const LottieCheck = () => {
  return (
    <Lottie
      source={{ uri: Media.LottieCheck }}
      style={{ width: 120, height: 120 }}
      autoPlay
      loop
    />
  );
};
export const LottieCancelled = () => {
  return (
    <Lottie
      source={{ uri: Media.LottieCancelled }}
      style={{ width: 120, height: 120 }}
      autoPlay
      loop
    />
  );
};
