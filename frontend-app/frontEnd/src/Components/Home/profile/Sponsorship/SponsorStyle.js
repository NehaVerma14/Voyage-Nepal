import {StyleSheet} from 'react-native';
import Colors from '../../../../constants/Color';

export default StyleSheet.create({
  img: {
    width: 130,
    height: 120,
    position: 'absolute',
    top: 50,
    marginBottom: 30,
  },

  text: {
    fontWeight: 'bold',
    marginTop: 110,
    lineHeight: 40,
    fontSize: 20,
  },

  text2: {
    textAlign: 'left',
    lineHeight: 50,
    fontSize: 18,
  },
  text3: {
    fontWeight: 'bold',
    marginTop: 130,
    lineHeight: 30,
    fontSize: 20,
  },
  form: {
    marginLeft: 50,
    paddingLeft: 40,
  },
  listContainer: {
    borderRadius: 10,
    padding: 15,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderColor: 'black',
    shadowColor: '#000',
    width: 350,
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 3,
    marginBottom: 15,
  },
  box: {
    width: 160,
    height: 150,
    padding: 5,
    marginLeft: 20,
    marginBottom: 30,
    backgroundColor: Colors.themeColor,
    alignItems: 'center',
  },
  inner: {
    width: 160,
    height: 150,
    padding: 5,
    marginLeft: 380,
    marginTop: -4,
    marginBottom: 30,
    backgroundColor: Colors.themeColor,
    alignItems: 'center',
  },
  box: {
    width: '50%',
    height: '20%',
    padding: 5,
    backgroundColor: Colors.themeColor,
    marginRight: 20,
  },
  inner: {
    flex: 1,
    alignItems: 'center',
    marginRight: 30,
  },
});