import { Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { styles } from './style';
import { BarsFA5Icon } from 'app/icons';
import { DrawerHeaderProps } from '@react-navigation/drawer';

interface Props extends DrawerHeaderProps {
  leftComponent?: (() => React.ReactNode) | 'none';
  rightComponent?: () => React.ReactNode;
  centerComponent?: () => React.ReactNode;
  title?: string;
}

export const ScreenHeaderComponent = ({
  rightComponent,
  leftComponent,
  centerComponent,
  title,
  navigation,
}: Props) => {
  const { top } = useSafeAreaInsets();

  const openDrawer = () => {
    navigation.openDrawer();
  };

  return (
    <View style={[styles.mainContainer, { marginTop: top }]}>
      {leftComponent === 'none' ? (
        <View style={styles.emptyContainer} />
      ) : leftComponent ? (
        <View style={styles.componentContainer}>{leftComponent()}</View>
      ) : (
        <View style={styles.componentContainer}>
          <TouchableOpacity onPress={openDrawer}>
            <BarsFA5Icon size={20} />
          </TouchableOpacity>
        </View>
      )}
      <View style={styles.centerComponentContainer}>
        {centerComponent ? (
          centerComponent()
        ) : (
          <View style={styles.titleContainer}>
            <Text style={styles.titleText}>{title || ''}</Text>
          </View>
        )}
      </View>
      {rightComponent ? (
        <View style={styles.componentContainer}>{rightComponent()}</View>
      ) : (
        <View style={styles.emptyContainer} />
      )}
    </View>
  );
};
