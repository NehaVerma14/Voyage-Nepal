import React from 'react'
import {Button, Icon, View} from 'native-base'
import Color from '../../constants/Color'

const GoBack = (props) => {
    return (
        <View>
            <Button transparent onPress = {props.goBack} large ><Icon name = 'arrow-back-circle-sharp' style = {{color: '#52c0b4', fontSize: 38}} /></Button>
        </View>
    )
}

export default GoBack
