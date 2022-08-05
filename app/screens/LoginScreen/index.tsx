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
import React, { useContext, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { styles } from './style';
import { FacebookLogoImage, GoogleLogoImage, LogoImage } from 'app/images';
import { InputComponent, PrimaryButtonComponent } from 'app/components';
import * as Animatable from 'react-native-animatable';
import * as Yup from 'yup';
import { FormikProps, useFormik } from 'formik';
import {
  signInWithEmailAndPassword,
  AuthError,
  sendPasswordResetEmail,
  FacebookAuthProvider,
  signInWithCredential,
  GoogleAuthProvider,
} from 'firebase/auth';
import { auth } from 'app/config';
import { UserContext } from 'app/context';
import * as Facebook from 'expo-facebook';
import * as Google from 'expo-auth-session/providers/google';
import * as WebBrowser from 'expo-web-browser';

interface Values {
  email: string;
  password: string;
}

WebBrowser.maybeCompleteAuthSession();

export const LoginScreen = () => {
  const [keyboardShown, setKeyboardShown] = useState<boolean>(false);
  const submitRef = useRef<View>(null);
  const emailRef = useRef<Animatable.View & View>(null);
  const passwordRef = useRef<Animatable.View & View>(null);
  const { loading, setLoading } = useContext(UserContext);

  const [_, response, promptAsync] = Google.useIdTokenAuthRequest({
    clientId: '777187985018-2in1d31nu67oeqgkd1hie2ksr9ddu7au.apps.googleusercontent.com',
  });

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
        let errorMessage: string;

        switch (errorCode) {
          case 'auth/invalid-email':
            errorMessage = 'Correo electrónico inválido.';
            break;
          case 'auth/user-disabled':
            errorMessage = 'Usuario deshabilitado.';
            break;
          case 'auth/user-not-found':
            errorMessage = 'Usuario no encontrado.';
            break;
          case 'auth/wrong-password':
            errorMessage = 'Contraseña incorrecta.';
            break;
          default:
            errorMessage = 'Error al iniciar sisión, inténtelo más tarde.';
            break;
        }

        Alert.alert('¡Algo salió mal!', errorMessage);

        setLoading(false);
      }
    },
  });

  useEffect(() => {
    const logInWithGoogle = async () => {
      try {
        if (response?.type === 'success') {
          const { id_token } = response.params;
          const credential = GoogleAuthProvider.credential(id_token);
          await signInWithCredential(auth, credential);
        }
      } catch (error) {
        Alert.alert('¡Algo salió mal!', 'Error al iniciar sesión con Google');
      }

      setLoading(false);
    };

    logInWithGoogle();
  }, [response]);

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

  const sendEmailToResetPassword = async () => {
    if (formik.errors.email) {
      emailRef.current?.tada?.();
    } else {
      let email = formik.values.email;

      if (email) {
        setLoading(true);

        try {
          await sendPasswordResetEmail(auth, email);
          Alert.alert(
            '¡Éxito!',
            'Hemos enviado un enlace para restablecer su contraseña a su correo electrónico'
          );
        } catch (error) {
          let errorCode = (error as AuthError).code;
          let errorMessage: string;

          switch (errorCode) {
            case 'auth/invalid-email':
              errorMessage = 'Correo electrónico inválido.';
              break;
            case 'auth/missing-android-pkg-name':
              errorMessage =
                'Se debe proporcionar un nombre de paquete de Android si se requiere instalar la aplicación de Android.';
              break;
            case 'auth/missing-continue-uri':
              errorMessage = 'Se debe proporcionar una URL de continuación en la solicitud.';
              break;
            case 'auth/missing-ios-bundle-id':
              errorMessage =
                'Se debe proporcionar un ID de paquete de iOS si se proporciona un ID de App Store.';
              break;
            case 'auth/invalid-continue-uri':
              errorMessage = 'La URL de continuación proporcionada en la solicitud no es válida.';
              break;
            case 'auth/unauthorized-continue-uri':
              errorMessage =
                'El dominio de la URL de continuación no está en la lista blanca. Incluya el dominio en la lista blanca en Firebase console.';
              break;
            case 'auth/user-not-found':
              errorMessage = 'Usuario no encontrado.';
              break;
            default:
              errorMessage = 'Error al restablecer la contraseña, inténtelo más tarde.';
              break;
          }

          Alert.alert('¡Algo salió mal!', errorMessage);
        }

        setLoading(false);
      } else {
        formik.setFieldTouched('email', true, true);
      }
    }
  };

  const handleFacebookButtonPress = async () => {
    try {
      setLoading(true);

      await Facebook.initializeAsync({
        appId: '1102507887009979',
      });

      const loginResult = await Facebook.logInWithReadPermissionsAsync({
        permissions: ['public_profile', 'email'],
      });

      if (loginResult.type === 'success') {
        const credential = FacebookAuthProvider.credential(loginResult.token);

        await signInWithCredential(auth, credential);
      }
    } catch (error) {
      Alert.alert('¡Algo salió mal!', 'Error al iniciar sesión con Facebook');
    }

    setLoading(false);
  };

  const handleGoogleButtonPress = () => {
    setLoading(true);
    promptAsync();
  };

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
          <TouchableOpacity onPress={sendEmailToResetPassword} disabled={loading}>
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
