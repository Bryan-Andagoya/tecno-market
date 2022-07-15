import {
  Alert,
  EmitterSubscription,
  GestureResponderEvent,
  Keyboard,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useContext, useLayoutEffect, useRef, useState } from 'react';
import { styles } from './style';
import { FacebookLogoImage, GoogleLogoImage, LogoImage } from 'app/images';
import { InputComponent, PrimaryButtonComponent } from 'app/components';
import * as Animatable from 'react-native-animatable';
import * as Yup from 'yup';
import { FormikProps, useFormik } from 'formik';
import { signInWithEmailAndPassword, AuthError } from 'firebase/auth';
import { auth } from 'app/config';
import { UserContext } from 'app/context';

interface Values {
  email: string;
  password: string;
}

export const LoginScreen = () => {
  const [keyboardShown, setKeyboardShown] = useState<boolean>(false);
  const submitRef = useRef<View>(null);
  const emailRef = useRef<Animatable.View & View>(null);
  const passwordRef = useRef<Animatable.View & View>(null);
  const { loading, setLoading } = useContext(UserContext);

  const formik: FormikProps<Values> = useFormik<Values>({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: Yup.object({
      email: Yup.string().trim().required('Campo requerido').email('Correo inválido'),
      password: Yup.string().required('Campo requerido'),
    }),
    onSubmit: async ({ email, password }: Values) => {
      setLoading(true);
      email = email.trim();

      try {
        await signInWithEmailAndPassword(auth, email, password);
      } catch (error) {
        let errorCode = (error as AuthError).code;

        switch (errorCode) {
          case 'auth/invalid-email':
            Alert.alert('¡Algo salió mal!', 'Correo electrónico inválido');
            break;
          case 'auth/user-disabled':
            Alert.alert('¡Algo salió mal!', 'Usuario deshabilitado');
            break;
          case 'auth/user-not-found':
            Alert.alert('¡Algo salió mal!', 'Usuario no encontrado');
            break;
          case 'auth/wrong-password':
            Alert.alert('¡Algo salió mal!', 'Contraseña incorrecta');
            break;
          default:
            Alert.alert('¡Algo salió mal!', 'Error al iniciar sisión, inténtelo más tarde');
            break;
        }

        setLoading(false);
      }
    },
  });

  useLayoutEffect(() => {
    const showSubscription: EmitterSubscription = Keyboard.addListener(
      'keyboardDidShow',
      (): void => {
        setKeyboardShown(true);
        submitRef.current?.setNativeProps({
          style: { flexGrow: 0 },
        });
      }
    );

    const hideSubscription: EmitterSubscription = Keyboard.addListener(
      'keyboardDidHide',
      (): void => {
        setKeyboardShown(false);
        submitRef.current?.setNativeProps({
          style: { flexGrow: 1 / 5 },
        });
      }
    );

    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, []);

  const handleSubmit: (event: GestureResponderEvent) => void = () => {
    formik.errors.email && emailRef.current?.tada?.();
    formik.errors.password && passwordRef.current?.tada?.();
    formik.submitForm();
  };

  const handleFacebookButtonPress = () => {};
  const handleGoogleButtonPress = () => {};

  return (
    <View style={styles.mainContainer}>
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>{'Tecno\nMarket'}</Text>
      </View>
      {keyboardShown || (
        <View style={styles.logoContainer}>
          <LogoImage style={styles.logo} />
        </View>
      )}
      <ScrollView
        contentContainerStyle={styles.inputsContentContainer}
        keyboardShouldPersistTaps="always">
        <View style={styles.inputContainer}>
          <InputComponent
            placeholder="Correo electrónico"
            name="email"
            handleChange={formik.handleChange}
            handleBlur={formik.handleBlur}
            value={formik.values.email}
            touched={formik.touched.email}
            error={formik.errors.email}
            autoComplete="email"
            textContentType="emailAddress"
            keyboardType="email-address"
            ref={emailRef}
          />
        </View>
        <View>
          <InputComponent
            placeholder="Contraseña"
            name="password"
            handleChange={formik.handleChange}
            handleBlur={formik.handleBlur}
            value={formik.values.password}
            touched={formik.touched.password}
            error={formik.errors.password}
            autoComplete="off"
            variant="password"
            textContentType="password"
            ref={passwordRef}
          />
        </View>
      </ScrollView>
      <View style={styles.buttonsContainer} ref={submitRef}>
        <View style={styles.buttonContainer}>
          <PrimaryButtonComponent text="Iniciar sesión" onPress={handleSubmit} loading={loading} />
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity onPress={() => console.log('hello')} disabled={loading}>
            <Text style={styles.buttonText}>Olvidé mi contraseña</Text>
          </TouchableOpacity>
        </View>
      </View>
      {keyboardShown || (
        <View style={styles.logosContainer}>
          <View style={styles.facebookLogoContainer}>
            <TouchableOpacity onPress={handleFacebookButtonPress}>
              <FacebookLogoImage style={styles.facebookLogo} />
            </TouchableOpacity>
          </View>
          <View style={styles.orTextContainer}>
            <Text style={styles.orText}>o</Text>
          </View>
          <View style={styles.googleLogoContainer}>
            <TouchableOpacity onPress={handleGoogleButtonPress}>
              <GoogleLogoImage style={styles.googleLogo} />
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  );
};
