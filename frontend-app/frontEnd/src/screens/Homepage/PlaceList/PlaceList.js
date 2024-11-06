import {View, Text} from 'react-native';
import React, {useEffect} from 'react';
import {H3, Container, Content, Button, Icon} from 'native-base';
import SearchContainer from '../../../Components/Home/feed/searchContainer';
import Place from '../../../Components/Home/PlaceList/PlaceList';
// import GoBack from '../../../Components/Signin/GoBack';

const PlaceList = ({route, navigation}) => {
  const {categoryName, categoryId} = route.params;

  return (
    <Container>
      <View style = {{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
        <Button transparent onPress={() => navigation.goBack()} large>
          <Icon name="arrow-back" style={{color: '#52c0b4', fontSize: 25}} />
        </Button>
        <H3 style={{fontWeight: 'bold'}}>{categoryName}</H3>
      </View>
      <Content padder>
        <SearchContainer align="vertical" />
        <Place category={categoryId} />
      </Content>
    </Container>
  );
};

export default PlaceList;
