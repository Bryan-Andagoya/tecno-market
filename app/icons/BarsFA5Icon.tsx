import React from 'react';
import Icon from '@expo/vector-icons/FontAwesome5';
import { IconProps } from './types';

export const BarsFA5Icon = ({ size, color, solid, style }: IconProps) => {
  return (
    <Icon
      name="bars"
      size={size}
      color={color}
      solid={solid === undefined ? true : solid}
      style={style}
    />
  );
};
