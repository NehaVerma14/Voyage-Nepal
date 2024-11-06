import {StyleSheet} from 'react-native';
import Colors from '../../../constants/Color';

export default StyleSheet.create({
  img: {
    width: 175,
    height: 175,
    borderRadius: 400 / 2,
    overlayColor: 'transparent',
    top: '50%',
  },

  userName: {
    fontSize: 25,
    fontWeight: '300',
    color: Colors.themeColor,
    fontFamily: 'GentiumBookBasic-Bold',
    marginTop: '15%',
    marginBottom: 10
  },

  listStyle: {
    fontSize: 25,
    fontWeight: '200',
    color: '#000000',
    fontFamily: 'GentiumBookBasic-Bold',
    marginLeft: 15
  },

  divider: {
    backgroundColor: '#ffffff',
    height: 1,
    marginBottom: 10
  },

  signoutContainer: {
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'row',
      marginTop: 20,
  },

  signoutText: {
    fontSize: 25,
    fontWeight: '200',
    color: '#000000',
  }
});
