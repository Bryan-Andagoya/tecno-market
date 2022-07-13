import { GestureResponderEvent, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import React, { useRef, useState } from 'react';
import { styles } from './style';
import { FacebookLogoImage, GoogleLogoImage, LogoImage } from 'app/images';
import { InputComponent, PrimaryButtonComponent } from 'app/components';
import * as Animatable from 'react-native-animatable';
import * as Yup from 'yup';
import { FormikHelpers, FormikProps, useFormik } from 'formik';

interface Values {
  email: string;
  password: string;
}

export const LoginScreen = () => {
  const [keyboardShown, setKeyboardShown] = useState<boolean>(false);
  const headerRef = useRef<View>(null);
  const submitRef = useRef<View>(null);
  const emailRef = useRef<Animatable.View & View>(null);
  const passwordRef = useRef<Animatable.View & View>(null);

  const formik: FormikProps<Values> = useFormik<Values>({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: Yup.object({
      email: Yup.string().trim().required('Campo requerido').email('Correo inválido'),
      password: Yup.string().required('Campo requerido'),
    }),
    onSubmit: async ({ email, password }: Values, { resetForm }: FormikHelpers<Values>) => {
      const trimmedValues = { email: email.trim(), password };
      console.log(trimmedValues);
      resetForm();
    },
  });

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
      <View style={styles.logoContainer}>
        <LogoImage style={styles.logo} />
      </View>
      <ScrollView contentContainerStyle={styles.inputsContentContainer}>
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
      <View style={styles.buttonsContainer}>
        <View style={styles.buttonContainer}>
          <PrimaryButtonComponent text="Iniciar sesión" onPress={handleSubmit} />
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity onPress={() => console.log('hello')}>
            <Text style={styles.buttonText}>Olvidé mi contraseña</Text>
          </TouchableOpacity>
        </View>
      </View>
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
    </View>
  );
};
