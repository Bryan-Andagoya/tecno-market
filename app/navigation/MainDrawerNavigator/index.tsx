import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import {
  AboutUsScreen,
  CategoriesScreen,
  ContactsScreen,
  FavoritesScreen,
  HelpScreen,
  HomeScreen,
  MyShoppingScreen,
  NotificationsScreen,
  OffersScreen,
  ProfileScreen,
  SettingsScreen,
} from 'app/screens';
import { colors } from 'app/styles';
import { styles } from './style';
import {
  AddressCardFA5Icon,
  BellFA5Icon,
  CogFA5Icon,
  CommentDotsFA5Icon,
  EyeFAIcon,
  HeartFA5Icon,
  HomeFA5Icon,
  ListFA5Icon,
  QuestionCircleFA5Icon,
  ShoppingBagFA5Icon,
  TagFA5Icon,
} from 'app/icons';
import { View } from 'react-native-animatable';
import { Text } from 'react-native';

export type MainDrawerParamList = {
  Home: undefined;
  Notifications: undefined;
  MyShopping: undefined;
  Favorites: undefined;
  Offers: undefined;
  Categories: undefined;
  Profile: undefined;
  Contacts: undefined;
  Settings: undefined;
  Help: undefined;
  AboutUs: undefined;
};

const MainDrawer = createDrawerNavigator<MainDrawerParamList>();

export const MainDrawerNavigator = () => {
  return (
    <MainDrawer.Navigator
      initialRouteName="Home"
      screenOptions={{
        drawerActiveTintColor: colors.PRIMARY,
        drawerInactiveTintColor: 'black',
        drawerLabelStyle: styles.drawerLabelStyle,
        sceneContainerStyle: {
          backgroundColor: 'white',
        },
      }}>
      <MainDrawer.Screen
        name="Home"
        component={HomeScreen}
        options={{
          drawerLabel: 'Inicio',
          drawerIcon: ({ color, size }) => (
            <View style={[styles.iconContainer, { width: size + 5 }]}>
              <HomeFA5Icon size={size} color={color} />
            </View>
          ),
        }}
      />
      <MainDrawer.Screen
        name="Notifications"
        component={NotificationsScreen}
        options={{
          drawerLabel: 'Notificaciones',
          drawerIcon: ({ color, size }) => (
            <View style={[styles.iconContainer, { width: size + 5 }]}>
              <BellFA5Icon size={size} color={color} />
            </View>
          ),
        }}
      />
      <MainDrawer.Screen
        name="MyShopping"
        component={MyShoppingScreen}
        options={{
          drawerLabel: 'Mis compras',
          drawerIcon: ({ color, size }) => (
            <View style={[styles.iconContainer, { width: size + 5 }]}>
              <ShoppingBagFA5Icon size={size} color={color} />
            </View>
          ),
        }}
      />
      <MainDrawer.Screen
        name="Favorites"
        component={FavoritesScreen}
        options={{
          drawerLabel: 'Favoritos',
          drawerIcon: ({ color, size }) => (
            <View style={[styles.iconContainer, { width: size + 5 }]}>
              <HeartFA5Icon size={size} color={color} />
            </View>
          ),
        }}
      />
      <MainDrawer.Screen
        name="Offers"
        component={OffersScreen}
        options={{
          drawerLabel: 'Ofertas',
          drawerIcon: ({ color, size }) => (
            <View style={[styles.iconContainer, { width: size + 5 }]}>
              <TagFA5Icon size={size} color={color} />
            </View>
          ),
        }}
      />
      <MainDrawer.Screen
        name="Categories"
        component={CategoriesScreen}
        options={{
          drawerLabel: 'Categorias',
          drawerIcon: ({ color, size }) => (
            <View style={[styles.iconContainer, { width: size + 5 }]}>
              <ListFA5Icon size={size} color={color} />
            </View>
          ),
        }}
      />
      <MainDrawer.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          drawerLabel: 'Perfil',
          drawerIcon: ({ color, size }) => (
            <View style={[styles.iconContainer, { width: size + 5 }]}>
              <AddressCardFA5Icon size={size} color={color} />
            </View>
          ),
        }}
      />
      <MainDrawer.Screen
        name="Contacts"
        component={ContactsScreen}
        options={{
          drawerLabel: 'Contactos',
          drawerIcon: ({ color, size }) => (
            <View style={[styles.iconContainer, { width: size + 5 }]}>
              <CommentDotsFA5Icon size={size} color={color} />
            </View>
          ),
        }}
      />
      <MainDrawer.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          drawerLabel: 'Ajustes',
          drawerIcon: ({ color, size }) => (
            <View style={[styles.iconContainer, { width: size + 5 }]}>
              <CogFA5Icon size={size} color={color} />
            </View>
          ),
        }}
      />
      <MainDrawer.Screen
        name="Help"
        component={HelpScreen}
        options={{
          drawerLabel: 'Ayuda',
          drawerIcon: ({ color, size }) => (
            <View style={[styles.iconContainer, { width: size + 5 }]}>
              <QuestionCircleFA5Icon size={size} color={color} />
            </View>
          ),
        }}
      />
      <MainDrawer.Screen
        name="AboutUs"
        component={AboutUsScreen}
        options={{
          drawerLabel: 'Acerca de Tecno Market',
          drawerLabelStyle: [styles.drawerLabelStyle, { left: 0 }],
          drawerItemStyle: styles.aboutUs,
        }}
      />
    </MainDrawer.Navigator>
  );
};
