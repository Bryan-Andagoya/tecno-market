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
    paddingVertical: 12,
  },
  headerText: {
    // backgroundColor: 'antiquewhite',
    fontSize: 50,
    fontWeight: '700',
    textAlign: 'center',
    color: colors.TEXT_PRIMARY,
  },
  logoContainer: {
    // backgroundColor: 'chartreuse',
    flex: 1,
    justifyContent: 'center',
  },
  logo: {
    // backgroundColor: 'deeppink',
    width: '100%',
  },
  buttonsContainer: {
    // backgroundColor: 'gold',
    paddingBottom: 30,
    paddingTop: 15,
  },
  buttonContainer: {
    padding: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: colors.PRIMARY,
    fontSize: 20,
    fontWeight: 'bold',
  },
});
