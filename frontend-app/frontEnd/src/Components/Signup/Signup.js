import React, { useState } from "react";
import {  Text, View, TouchableOpacity } from "react-native";
import CheckBox from 'react-native-vector-icons/MaterialCommunityIcons';
import signUpStyles from './signup.styles'
import Colors from '../../constants/Color'

const Button = ({ onPress, selected, children }) => {
  return (
    <View style={signUpStyles.checkBoxContainer}>
      <TouchableOpacity onPress={onPress} style = {{ alignSelf: 'flex-start'}}>
        {selected ? (
          <CheckBox name="checkbox-marked" size={25} color = {Colors.primary}/>
        ) : (
          <CheckBox name="checkbox-blank-outline" size={25} color = {Colors.primary} />
        )}
      </TouchableOpacity>
      <TouchableOpacity onPress={onPress} style = {{alignItems: 'center', justifyContent: 'center'}}>
        <Text style={signUpStyles.descriptionText}>{children}</Text>
      </TouchableOpacity>
    </View>
  );
};

export const GenderCheckbox = (props) => {
  const [isChecked, setIsChecked] = useState([
    {id: 1, value: true, name: 'Male', selected: false},
    {id: 2, value: false, name: 'Female', selected: false},
    {id: 3, value: false, name: 'Other', selected: false},
    
  ]);
  const onBtnClick = (item) => {
    let updatedState = isChecked.map((isCheckedItem) => {
      if (isCheckedItem.id === item.id) {
        props.setGender(isCheckedItem);

        return {...isCheckedItem, selected: true};
      } else {
        return {...isCheckedItem, selected: false};
      }
    });
    setIsChecked(updatedState);
    // console.log(isChecked);
  };
  return (
    <View
      style={{
        flexDirection: 'row',
      }}>
      {isChecked.map((item) => (
        <Button
          onPress={() => onBtnClick(item)}
          selected={item.selected}
          key={item.id}>
          {item.name}
        </Button>
      ))}
    </View>
  );
};




