import React from 'react';
import {View, Text} from 'react-native';
import {Icon, Button} from 'native-base';
import Colors from '../../../constants/Color';
import {
  FormInput,
  ActionButton,
} from '../../../Components/FormComponents/FormCompponents';

const CreatePlans = ({navigation}) => {
  return (
    <View style={{margin: 20}}>
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginLeft: 0,
        }}>
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Button transparent onPress={() => navigation.goBack()} large>
            <Icon name="arrow-back" style={{color: '#52c0b4', fontSize: 25}} />
          </Button>
          <Text style={{fontSize: 22, fontWeight: 'bold'}}>
            Create New Plan
          </Text>
        </View>
        <Icon
          type="AntDesign"
          name="pluscircle"
          color="#000"
          size={28}
          onPress={() => navigation.navigate('CreateTrip')}></Icon>
      </View>
      <FormInput placeholder="Select City" />
      <FormInput placeholder="Select Destination" />
      <FormInput placeholder="Select Date" />
      <View style = {{marginTop: 20}}>
        <ActionButton buttonName="Create" />
      </View>
    </View>
  );
};

export default CreatePlans;
