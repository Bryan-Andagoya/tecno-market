import {
  KeyboardTypeOptions,
  Platform,
  Text,
  TextInput,
  TextInputAndroidProps,
  TextInputIOSProps,
  TextInputProps,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { ForwardedRef, forwardRef, useState } from 'react';
import { FormikHandlers } from 'formik';
import * as Animatable from 'react-native-animatable';
import { styles } from './style';
import { colors } from 'app/styles';
import { EyeFAIcon, EyeSlashFAIcon } from 'app/icons';

interface Props {
  placeholder: string;
  name: string;
  handleChange: FormikHandlers['handleChange'];
  handleBlur: FormikHandlers['handleBlur'];
  value: string;
  touched: boolean | undefined;
  error: string | undefined;
  variant?: 'password';
  autoComplete?: TextInputAndroidProps['autoComplete'];
  textContentType?: TextInputIOSProps['textContentType'];
  keyboardType?: KeyboardTypeOptions;
  autoCapitalize?: TextInputProps['autoCapitalize'];
}

export const InputComponent = forwardRef(
  (
    {
      placeholder,
      name,
      handleChange,
      handleBlur,
      value,
      touched,
      error,
      variant,
      autoComplete,
      textContentType,
      keyboardType,
      autoCapitalize,
    }: Props,
    inputRef: ForwardedRef<Animatable.View & View>
  ) => {
    const [passwordShown, setPasswordShown] = useState<boolean>(false);

    return (
      <View style={styles.container}>
        <View style={styles.inputContainer}>
          <Animatable.View ref={inputRef} style={styles.animatableInput}>
            <TextInput
              placeholder={placeholder}
              placeholderTextColor={colors.MEDIUM_GRAY}
              style={styles.input}
              onChangeText={handleChange(`${name}`)}
              onBlur={handleBlur(`${name}`)}
              value={value}
              autoComplete={Platform.OS === 'android' && autoComplete ? autoComplete : undefined}
              secureTextEntry={variant === 'password' ? !passwordShown : false}
              textContentType={
                Platform.OS === 'ios' && textContentType ? textContentType : undefined
              }
              keyboardType={keyboardType || undefined}
              blurOnSubmit={true}
              autoCapitalize={autoCapitalize || 'none'}
            />
          </Animatable.View>
          {variant === 'password' && (
            <TouchableOpacity
              style={styles.viewPasswordIcon}
              onPress={() => setPasswordShown((shown) => !shown)}>
              {passwordShown ? <EyeSlashFAIcon size={30} /> : <EyeFAIcon size={30} />}
            </TouchableOpacity>
          )}
        </View>
        {touched && error && (
          <View style={styles.errorContainer}>
            <Text style={styles.errorText}>{error}</Text>
          </View>
        )}
      </View>
    );
  }
);
