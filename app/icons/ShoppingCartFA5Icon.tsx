import React from 'react';
import Icon from '@expo/vector-icons/FontAwesome5';
import { IconProps } from './types';

export const ShoppingCartFA5Icon = ({ size, color, solid, style }: IconProps) => {
  return (
    <Icon
      name="shopping-cart"
      size={size}
      color={color}
      solid={solid === undefined ? true : solid}
      style={style}
    />
  );
};
