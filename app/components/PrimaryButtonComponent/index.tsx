import { Text, TouchableOpacity, TouchableOpacityProps } from 'react-native';
import React from 'react';
import { styles } from './style';

interface Props extends TouchableOpacityProps {
  text: string;
  width?: string | number;
}

export const PrimaryButtonComponent = ({ width, text, ...props }: Props) => {
  return (
    <TouchableOpacity
      {...props}
      style={[{ width: width === undefined ? 308 : width }, styles.button]}>
      <Text style={styles.text}>{text}</Text>
    </TouchableOpacity>
  );
};
