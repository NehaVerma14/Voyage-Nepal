import {StyleSheet} from 'react-native';
import Colors from '../../../constants/Color'

export default StyleSheet.create({
  helloUSer: {
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    marginLeft: 20
  },

  welcomeContainer: {
    justifyContent: 'flex-start',
    backgroundColor: Colors.gray
  },

  userImg: {
    width: 150,
    height: 150,
    borderRadius: 400 / 2,
    overlayColor: 'transparent',
    marginLeft: 20,
    alignSelf: 'flex-end',
    marginTop: '-10%',
    marginRight: 20
  },

  userName: {
    fontSize: 22,
    fontWeight: 'bold',
  },
});
