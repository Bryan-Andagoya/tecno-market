import { Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { styles } from './style';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LogoImage } from 'app/images';
import { PrimaryButtonComponent } from 'app/components';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { AuthStackParamList } from 'app/navigation';

interface Props extends NativeStackScreenProps<AuthStackParamList, 'Welcome'> {}

export const WelcomeScreen = ({ navigation }: Props) => {
  return (
    <SafeAreaView style={styles.mainContainer}>
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>{'Tecno\nMarket'}</Text>
      </View>
      <View style={styles.logoContainer}>
        <LogoImage style={styles.logo} resizeMode="cover" />
      </View>
      <View style={styles.buttonsContainer}>
        <View style={styles.buttonContainer}>
          <PrimaryButtonComponent
            text="Iniciar sesión"
            onPress={() => navigation.navigate('Login')}
          />
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity onPress={() => navigation.navigate('Register')}>
            <Text style={styles.buttonText}>Registrarse</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};
