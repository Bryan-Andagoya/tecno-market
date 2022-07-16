import React from 'react';
import Icon from '@expo/vector-icons/FontAwesome';
import { colors } from 'app/styles';
import { IconProps } from './types';

export const EyeFAIcon = ({ size, color }: IconProps) => {
  return <Icon name="eye" size={size} color={color || colors.PRIMARY} />;
};
