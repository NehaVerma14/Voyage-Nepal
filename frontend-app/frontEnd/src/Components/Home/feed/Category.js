import {View, Text, TouchableWithoutFeedback, Pressable} from 'react-native';
import React from 'react';
import {Content, Icon} from 'native-base';
// import Icon from 'react-native-vector-icons';
import Colors from '../../../constants/Color';
import {useNavigation} from '@react-navigation/native';
import {useSelector} from 'react-redux';

const Category = () => {
  const navigation = useNavigation();
  const category = useSelector(state => state.category);
  const handleClick = (name, id) => {
    navigation.navigate('PlaceList', {categoryName: name, categoryId: id})
  }
  return (
    <Content style={{marginBottom: 30}}>
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-around',
          flexWrap: 'wrap',
          marginBottom: 30,
          marginTop: 0,
        }}>
        {category &&
          category.map(cat => (
            <Pressable key={cat._id} onPress={() => handleClick(cat.name, cat._id)}>
              <View
                key={cat._id}
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Icon
                  name="mountain"
                  type="FontAwesome5"
                  size={38}
                  color={Colors.themeColor}
                  style={{
                    backgroundColor: '#52c0b450',
                    padding: 18,
                    borderRadius: 10,
                  }}
                />
                <Text style={{marginTop: 8}}>{cat.name}</Text>
              </View>
            </Pressable>
          ))}
        {/* <View
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Icon
            name="mountain"
            type='FontAwesome5'
            size={38}
            color={Colors.themeColor}
            style={{
              backgroundColor: '#52c0b450',
              padding: 18,
              borderRadius: 10,
            }}
          />
          <Text style={{marginTop: 8}}>Adventure</Text>
        </View>
        <View
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Icon
            name="building"
            type='FontAwesome5'
            size={38}
            color={Colors.themeColor}
            style={{
              backgroundColor: '#52c0b450',
              padding: 18,
              borderRadius: 10,
            }}
          />
          <Text style={{marginTop: 8}}>Meuseums</Text>
        </View>
        <View
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Icon
            name="park"
            type='MaterialIcons'
            size={38}
            color={Colors.themeColor}
            style={{
              backgroundColor: '#52c0b450',
              padding: 18,
              borderRadius: 10,
            }}
          />
          <Text style={{marginTop: 8}}>Parks</Text>
        </View> */}
      </View>
      {/* <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-around',
          flexWrap: 'wrap',
          marginBottom: 15,
        }}>
        <View
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Icon
            name="snowboarding"
            type='FontAwesome5'
            size={38}
            color={Colors.themeColor}
            style={{
              backgroundColor: '#52c0b450',
              padding: 18,
              borderRadius: 10,
            }}
          />
          <Text style={{marginTop: 8}}>Adventure</Text>
        </View>
        <View
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Icon
            name="playstation"
            type='Fontisto'
            size={38}
            color={Colors.themeColor}
            style={{
              backgroundColor: '#52c0b450',
              padding: 18,
              borderRadius: 10,
            }}
          />
          <Text style={{marginTop: 8}}>Adventure</Text>
        </View>
        <View
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Icon
            name="nature"
            type='MaterialIcons'
            size={38}
            color={Colors.themeColor}
            style={{
              backgroundColor: '#52c0b450',
              padding: 18,
              borderRadius: 10,
            }}
          />
          <Text style={{marginTop: 8}}>Adventure</Text>
        </View>
      </View> */}
      <TouchableWithoutFeedback onPress={() => navigation.navigate('Explore')}>
        <View
          style={{
            // marginRight: 20,
            marginTop: 20,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text
            style={{
              fontWeight: 'bold',
              color: '#fff',
              backgroundColor: Colors.themeColor,
              padding: 10,
              borderRadius: 8,
              paddingLeft: 15,
              paddingRight: 15,
            }}>
            View all
          </Text>
        </View>
      </TouchableWithoutFeedback>
    </Content>
  );
};

export default Category;
