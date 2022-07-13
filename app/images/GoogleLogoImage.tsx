import React from 'react';
import { Image } from 'react-native-animatable';
import { ImageProps } from './types';

export const GoogleLogoImage = ({ style }: ImageProps) => {
  return (
    <Image source={require('assets/images/google-logo.png')} style={style} resizeMode="contain" />
  );
};
