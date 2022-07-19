import { TextInput, View } from 'react-native';
import React from 'react';
import { styles } from './style';
import { SearchFA5Icon } from 'app/icons';
import { colors } from 'app/styles';

export const SearchBarComponent = () => {
  return (
    <View style={styles.mainContainer}>
      <View style={styles.inputContainer}>
        <SearchFA5Icon size={20} />
        <TextInput
          style={styles.input}
          placeholder="Buscar producto"
          placeholderTextColor={colors.MEDIUM_GRAY}
        />
      </View>
    </View>
  );
};
