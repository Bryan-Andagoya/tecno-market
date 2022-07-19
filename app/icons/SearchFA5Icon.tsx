import React from 'react';
import Icon from '@expo/vector-icons/FontAwesome5';
import { IconProps } from './types';

export const SearchFA5Icon = ({ size, color, solid, style }: IconProps) => {
  return (
    <Icon
      name="search"
      size={size}
      color={color}
      solid={solid === undefined ? true : solid}
      style={style}
    />
  );
};
