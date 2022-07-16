import React from 'react';
import Icon from '@expo/vector-icons/FontAwesome5';
import { IconProps } from './types';

export const HomeFA5Icon = ({ size, color, style }: IconProps) => {
  return <Icon name="home" size={size} color={color} style={style} />;
};
