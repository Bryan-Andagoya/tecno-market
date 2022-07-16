import {
  Alert,
  EmitterSubscription,
  GestureResponderEvent,
  Keyboard,
  ScrollView,
  Text,
  View,
} from 'react-native';
import React, { useContext, useLayoutEffect, useRef, useState } from 'react';
import { styles } from './style';
import { LogoImage } from 'app/images';
import { InputComponent, PrimaryButtonComponent } from 'app/components';
import * as Animatable from 'react-native-animatable';
import { FormikErrors, FormikProps, useFormik } from 'formik';
import { AuthError, createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from 'app/config';
import { UserContext } from 'app/context';

interface Values {
  email: string;
  password: string;
  confirmPassword: string;
}

export const RegisterScreen = () => {
  const [keyboardShown, setKeyboardShown] = useState<boolean>(false);
  const submitRef = useRef<View>(null);
  const emailRef = useRef<Animatable.View & View>(null);
  const passwordRef = useRef<Animatable.View & View>(null);
  const confirmPasswordRef = useRef<Animatable.View & View>(null);
  const { loading, setLoading } = useContext(UserContext);

  const validate = ({ email, password, confirmPassword }: Values): FormikErrors<Values> => {
    const errors: FormikErrors<Values> = {};

    if (!email.trim()) {
      errors.email = 'Campo requerido';
    } else if (!/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(email.trim())) {
      errors.email = 'Correo inválido';
    }

    if (!password) {
      errors.password = 'Campo requerido';
    } else if (password.length < 8) {
      errors.password = 'Mínimo 8 caracteres';
    } else if (!/^(?=.*[a-zñ])/.test(password)) {
      errors.password = 'Incluya letras minúsculas';
    } else if (!/^(?=.*[A-ZÑ])/.test(password)) {
      errors.password = 'Incluya letras mayúsculas';
    } else if (!/^(?=.*\d)/.test(password)) {
      errors.password = 'Incluya números';
    } else if (!/^(?=.*[!@#$%^&*])/.test(password)) {
      errors.password = 'Incluya caracteres especiales';
    }

    if (!confirmPassword) {
      errors.confirmPassword = 'Campo requerido';
    } else if (confirmPassword !== password) {
      errors.confirmPassword = 'Las contraseñas no coinciden';
    }

    return errors;
  };

  const formik: FormikProps<Values> = useFormik<Values>({
    initialValues: {
      email: '',
      password: '',
      confirmPassword: '',
    },
    validate,
    onSubmit: async ({ email, password }: Values) => {
      setLoading(true);
      email = email.trim();

      try {
        await createUserWithEmailAndPassword(auth, email, password);
      } catch (error) {
        let errorCode = (error as AuthError).code;
        let errorMessage: string;

        switch (errorCode) {
          case 'auth/email-already-in-use':
            errorMessage = 'Ya existe una cuenta con esa dirección de correo electrónico.';
            break;
          case 'auth/invalid-email':
            errorMessage = 'Correo electrónico inválido.';
            break;
          case 'auth/operation-not-allowed':
            errorMessage = 'Las cuentas de correo electrónico/contraseña no están habilitadas.';
            break;
          case 'auth/weak-password':
            errorMessage = 'La contraseña no es lo suficientemente segura.';
            break;
          default:
            errorMessage = 'Error al registrar usuario, inténtelo más tarde.';
            break;
        }

        Alert.alert('¡Algo salió mal!', errorMessage);

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
          style: { flexGrow: 1 },
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
    formik.errors.confirmPassword && confirmPasswordRef.current?.tada?.();
    formik.submitForm();
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
        <View style={styles.inputContainer}>
          <InputComponent
            placeholder="Confirmar contraseña"
            name="confirmPassword"
            handleChange={formik.handleChange}
            handleBlur={formik.handleBlur}
            value={formik.values.confirmPassword}
            touched={formik.touched.confirmPassword}
            error={formik.errors.confirmPassword}
            autoComplete="off"
            variant="password"
            textContentType="password"
            ref={confirmPasswordRef}
          />
        </View>
      </ScrollView>
      <View style={styles.buttonContainer} ref={submitRef}>
        <PrimaryButtonComponent text="Registrarse" onPress={handleSubmit} loading={loading} />
      </View>
    </View>
  );
};
