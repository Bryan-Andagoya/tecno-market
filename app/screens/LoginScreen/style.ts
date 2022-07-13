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
    paddingVertical: 10,
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
    paddingVertical: 10,
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
  buttonsContainer: {
    // backgroundColor: 'gold',
    paddingBottom: 15,
    paddingTop: 15,
  },
  buttonContainer: {
    padding: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: colors.PRIMARY,
    fontSize: 20,
    fontWeight: 'bold',
  },
  logosContainer: {
    // backgroundColor: 'cyan',
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: 15,
  },
  facebookLogoContainer: {
    // backgroundColor: 'greenyellow',
    flex: 1,
    alignItems: 'flex-end',
  },
  facebookLogo: {
    width: 60,
  },
  googleLogoContainer: {
    // backgroundColor: 'deeppink',
    flex: 1,
    alignItems: 'flex-start',
  },
  googleLogo: {
    width: 60,
  },
  orTextContainer: {
    // backgroundColor: 'lightblue',
    flex: 0.7,
    justifyContent: 'center',
    alignItems: 'center',
  },
  orText: {
    // backgroundColor: 'tomato',
    color: colors.TEXT_PRIMARY,
    fontSize: 20,
    textAlign: 'center',
    fontWeight: 'bold',
  },
});
