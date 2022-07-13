import { colors } from 'app/styles';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    // backgroundColor: 'khaki',
    width: '100%',
    alignItems: 'center',
  },
  inputContainer: {
    // backgroundColor: 'lightcoral',
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  animatableInput: {
    // backgroundColor: 'yellow',
    width: '78%',
    alignItems: 'center',
  },
  input: {
    borderWidth: 2,
    borderRadius: 30,
    borderColor: colors.PRIMARY,
    height: 50,
    fontSize: 20,
    textAlign: 'center',
    paddingHorizontal: 20,
    fontWeight: 'bold',
    width: '100%',
  },
  viewPasswordIcon: {
    right: '2%',
    position: 'absolute',
    alignSelf: 'center',
  },
  errorContainer: {
    // backgroundColor: 'paleturquoise',
    flexGrow: 0,
    maxWidth: '78%',
  },
  errorText: {
    color: colors.ERROR_MAIN,
    fontSize: 17,
    textAlign: 'center',
  },
});
