import { colors } from 'app/styles';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  mainContainer: {
    // backgroundColor: 'azure',
    flex: 1,
  },
  headerContainer: {
    // backgroundColor: 'coral',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 5,
  },
  headerText: {
    // backgroundColor: 'antiquewhite',
    fontSize: 40,
    fontWeight: '700',
    textAlign: 'center',
    color: colors.TEXT_PRIMARY,
  },
  logoContainer: {
    // backgroundColor: 'chartreuse',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 5,
  },
  logo: {
    // backgroundColor: 'deeppink',
    width: 144,
    height: 144,
    borderRadius: 20,
  },
  inputsContentContainer: {
    // backgroundColor: 'blue',
    justifyContent: 'center',
    flexGrow: 1,
  },
  inputContainer: {
    paddingVertical: 15,
  },
  buttonContainer: {
    // backgroundColor: 'gold',
    paddingTop: 10,
    flexGrow: 1,
    flexBasis: 75,
    alignItems: 'center',
  },
});
