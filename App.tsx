import { NavigationContainer } from '@react-navigation/native';
import { RootProvider } from 'app/context';
import { AuthStackNavigator } from 'app/navigation';
import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import 'react-native-gesture-handler';

const App = () => {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <RootProvider>
          <AuthStackNavigator />
        </RootProvider>
      </NavigationContainer>
    </SafeAreaProvider>
  );
};

export default App;
