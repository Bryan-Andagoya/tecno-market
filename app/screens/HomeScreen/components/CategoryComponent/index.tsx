import { Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { IconProps } from 'app/icons';
import { styles } from './style';

export interface CategoryProps {
  text: string;
  Icon: React.ElementType<IconProps>;
}

export const CategoryComponent = ({ text, Icon }: CategoryProps) => {
  return (
    <View style={styles.mainContainer}>
      <TouchableOpacity>
        <View style={styles.iconContainer}>
          <Icon size={24} />
        </View>
      </TouchableOpacity>
      <Text style={styles.text}>{text}</Text>
    </View>
  );
};
