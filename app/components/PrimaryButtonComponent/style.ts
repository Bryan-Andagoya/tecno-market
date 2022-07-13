import { colors } from 'app/styles';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  button: {
    backgroundColor: colors.PRIMARY,
    borderRadius: 40,
    height: 58,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: colors.TEXT_PRIMARY_BUTTON,
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
