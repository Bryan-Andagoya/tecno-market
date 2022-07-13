import { ColorValue, StyleProp, TextStyle } from 'react-native';

export interface IconProps {
  size: number;
  solid?: boolean;
  style?: StyleProp<TextStyle>;
  color?: ColorValue;
}
