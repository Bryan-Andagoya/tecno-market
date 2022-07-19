import { Button, View } from 'react-native';
import React from 'react';
import { styles } from './style';
import { signOut } from 'firebase/auth';
import { auth } from 'app/config';
import { CategoryComponent, CategoryProps } from './components';
import {
  DesktopFA5Icon,
  HeadphonesAltFA5Icon,
  LaptopFA5Icon,
  MobileAltFA5Icon,
  TabletAltFA5Icon,
} from 'app/icons';

const categories: CategoryProps[] = [
  {
    text: 'Celulares',
    Icon: MobileAltFA5Icon,
  },
  {
    text: 'Laptops',
    Icon: LaptopFA5Icon,
  },
  {
    text: 'Desktops',
    Icon: DesktopFA5Icon,
  },
  {
    text: 'Tablets',
    Icon: TabletAltFA5Icon,
  },
  {
    text: 'Accesorios',
    Icon: HeadphonesAltFA5Icon,
  },
];

export const HomeScreen = () => {
  const logOut = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles.mainContainer}>
      <View style={styles.categoriesContainer}>
        {categories.map(({ text, Icon }) => (
          <CategoryComponent text={text} Icon={Icon} key={text} />
        ))}
      </View>
      <Button title="Log out" onPress={logOut} />
    </View>
  );
};
