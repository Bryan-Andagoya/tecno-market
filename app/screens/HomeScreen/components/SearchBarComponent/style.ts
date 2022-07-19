import { colors } from 'app/styles';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  inputContainer: {
    // backgroundColor: 'bisque',
    borderWidth: 2,
    borderRadius: 30,
    borderColor: colors.PRIMARY,
    height: 44,
    fontSize: 20,
    paddingHorizontal: 15,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    // backgroundColor: 'chartreuse',
    fontSize: 20,
    fontWeight: 'bold',
    flex: 1,
    height: '100%',
    paddingLeft: 15,
  },
});
