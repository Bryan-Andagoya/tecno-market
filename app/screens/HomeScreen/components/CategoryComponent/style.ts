import { colors } from 'app/styles';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  mainContainer: {
    // backgroundColor: 'coral',
    alignItems: 'center',
  },
  iconContainer: {
    backgroundColor: colors.LIGHT_GRAY,
    alignItems: 'center',
    justifyContent: 'center',
    width: 45,
    height: 45,
    borderRadius: 50,
    elevation: 5,
    shadowColor: 'black',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 35,
    shadowRadius: 5,
  },
  text: {
    fontSize: 12,
    color: colors.TEXT_PRIMARY,
  },
});
