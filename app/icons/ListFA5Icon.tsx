import React from 'react';
import Icon from '@expo/vector-icons/FontAwesome5';
import { IconProps } from './types';

export const ListFA5Icon = ({ size, color, solid, style }: IconProps) => {
  return (
    <Icon
      name="list"
      size={size}
      color={color}
      solid={solid === undefined ? true : solid}
      style={style}
    />
  );
};
