import {LOGOUT_USER} from '../action.types'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useNavigation } from '@react-navigation/native';

export const logout = () => {
    const navigation = useNavigation();
    return async (dispatch) => {
        await AsyncStorage.removeItem('token')
        dispatch({
            type: LOGOUT_USER,
            payload: 1
        })
        navigation.navigate('Signin')
    }
}