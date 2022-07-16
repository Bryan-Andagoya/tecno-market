import { ActivityIndicator, Text, TouchableOpacity, TouchableOpacityProps } from 'react-native';
import React from 'react';
import { styles } from './style';

interface Props extends TouchableOpacityProps {
  text: string;
  width?: string | number;
  loading?: boolean;
}

export const PrimaryButtonComponent = ({ width, text, loading, ...props }: Props) => {
  return (
    <TouchableOpacity
      {...props}
      style={[{ width: width === undefined ? 308 : width }, styles.button]}
      disabled={loading}>
      {loading ? (
        <ActivityIndicator color={'white'} size="large" />
      ) : (
        <Text style={styles.text}>{text}</Text>
      )}
    </TouchableOpacity>
  );
};
