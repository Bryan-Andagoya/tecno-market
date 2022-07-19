import { colors } from 'app/styles';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  mainContainer: {
    // backgroundColor: 'gold',
    flexDirection: 'row',
  },
  componentContainer: {
    // backgroundColor: 'cyan',
    padding: 15,
  },
  emptyContainer: {
    width: 48,
    height: 53,
  },
  centerComponentContainer: {
    // backgroundColor: 'coral',
    flex: 1,
  },
  titleContainer: {
    // backgroundColor: 'greenyellow',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.TEXT_PRIMARY,
    textAlign: 'center',
  },
});
