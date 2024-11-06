import {StyleSheet} from 'react-native';
import Colors from '../../constants/Color'

export default StyleSheet.create({
  checkBoxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    marginRight: 50,
    justifyContent: 'center',
  },
  text: {
    lineHeight: 30,
    fontSize: 20,
    marginVertical: 5,
  },
  descriptionText: {
    color: 'gray',
    fontSize: 13,
  },
  dropdown:{
    backgroundColor: '#ffffff',
    borderColor: Colors.themeColor,
    borderWidth: 0.75,
    padding: 4,
    paddingLeft: 10,
    borderRadius: 27,
    alignItems: 'center',
    alignSelf:'flex-start',
    marginBottom: 30
  },
  dropdownItem: {
    borderWidth: 0,
    backgroundColor: '#ffffff',
    padding: 10,
    borderColor: Colors.themeColor,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.4,
    shadowRadius: 3.84,

    elevation: 7,
    width: '80%',
    height: '70%',
  },
});
