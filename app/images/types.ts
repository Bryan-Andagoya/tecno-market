import { ImageResizeMode, ImageStyle, StyleProp } from 'react-native';

export interface ImageProps {
  style?: StyleProp<ImageStyle>;
  resizeMode?: ImageResizeMode;
}
