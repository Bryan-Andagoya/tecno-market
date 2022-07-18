import { colors } from 'app/styles';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  headerContainer: {
    backgroundColor: colors.PRIMARY,
    flexDirection: 'row',
    alignItems: 'center',
  },
  userIconContainer: {
    // backgroundColor: 'gold',
    padding: 10,
  },
  userIcon: {
    backgroundColor: 'white',
    borderRadius: 50,
    width: 50,
    height: 50,
    textAlign: 'center',
    paddingTop: 13,
  },
  userImage: {
    borderRadius: 50,
    width: 50,
    height: 50,
  },
  userText: {
    // backgroundColor: 'green',
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
