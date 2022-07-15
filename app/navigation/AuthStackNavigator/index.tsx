import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { UserContext } from 'app/context';
import { HomeScreen, LoginScreen, RegisterScreen, WelcomeScreen } from 'app/screens';
import { colors } from 'app/styles';
import React, { useContext } from 'react';
import { ActivityIndicator, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { styles } from './style';

export type AuthStackParamList = {
  Welcome: undefined;
  Login: undefined;
  Register: undefined;
  MainDrawer: undefined;
};

const AuthStack = createNativeStackNavigator<AuthStackParamList>();

export const AuthStackNavigator = () => {
  const { user, initializing } = useContext(UserContext);

  if (initializing) {
    return (
      <SafeAreaView style={styles.mainContainer}>
        <ActivityIndicator color={colors.PRIMARY} size="large" />
      </SafeAreaView>
    );
  }

  return (
    <AuthStack.Navigator
      screenOptions={{
        headerBackTitleVisible: false,
        headerShadowVisible: false,
        contentStyle: {
          backgroundColor: 'white',
        },
      }}>
      {user ? (
        <AuthStack.Screen name="MainDrawer" component={HomeScreen} />
      ) : (
        <>
          <AuthStack.Screen
            name="Welcome"
            component={WelcomeScreen}
            options={{
              headerShown: false,
            }}
          />
          <AuthStack.Screen
            name="Login"
            component={LoginScreen}
            options={{
              title: '',
            }}
          />
          <AuthStack.Screen
            name="Register"
            component={RegisterScreen}
            options={{
              title: '',
            }}
          />
        </>
      )}
    </AuthStack.Navigator>
  );
};
