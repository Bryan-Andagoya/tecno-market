import React from 'react';
import { Image } from 'react-native';
import { ImageProps } from './types';

export const LogoImage = ({ style, resizeMode }: ImageProps) => {
  return (
    <Image
      source={require('assets/images/icon.png')}
      style={style}
      resizeMode={resizeMode || 'contain'}
    />
  );
};
