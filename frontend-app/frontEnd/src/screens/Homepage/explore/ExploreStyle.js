import {StyleSheet} from 'react-native';
import Colors from '../../../constants/Color'
import {Dimensions} from 'react-native'
const {width}=Dimensions.get('screen');
const cardWidth = width / 1.8;

export default StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor:Colors.white
    },
    header: {
        marginTop:35,
        justifyContent:'space-between',
        paddingHorizontal:20,
    },
    headerText: {
        fontSize:  18,
        fontWeight:'600',
        lineHeight:20,
    },
    NextText:{
        fontSize:30,
        fontWeight:'bold',
        lineHeight:30,
        color:Colors.green,
    },
    SearchInput: {
            flexDirection:'row',
    },
    InputContainer:{
        height:50,
        width:'76%',
        backgroundColor:Colors.light,
        marginTop:15,
        marginLeft:18,
        marginRight:10,
        borderRadius:30,
        flexDirection:'row',
        alignItems:'center',
    },
    sort:{
        backgroundColor:Colors.green,
        width: 50,
        height:50,
        borderRadius:10,
        marginTop:15,
        marginLeft:1,
        marginRight:18,
    },
    categoryListContainer:{
        flexDirection:'row',
        justifyContent :'space-between',
        marginHorizontal:20,
        marginTop:30
    },
    categoryListText:{
        fontSize:18,
        fontWeight:'bold',
    },
    categoryLine:{
        height:3,
        width:30,
        backgroundColor:Colors.green,
        marginTop:2,
    },
    placeWrapper:{
        paddingVertical:20,
    },
    PlaceItem:{
            width: 170,
    height: 250,
    justifyContent: 'flex-end',
    paddingHorizontal: 10,
    paddingVertical: 15,
    marginRight: 20,
    },
    PlaceItemImage:{
        borderRadius: 20,
    },
    PlaceItemLocationWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
  },
    PlaceItemText:{
        marginLeft: 5,
        fontSize: 14,
        color: Colors.white,
    }
    
})