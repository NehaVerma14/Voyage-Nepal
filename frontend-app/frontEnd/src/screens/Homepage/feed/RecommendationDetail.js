import React, {useEffect} from 'react';
import {useWindowDimensions, ActivityIndicator, BackHandler} from 'react-native';
import {
  Container,
  Header,
  Tab,
  Tabs,
  DefaultTabBar,
} from 'native-base';
import ImageDetail from '../../../Components/Home/Explore/ImageDetail';
import Detail from '../../../Components/Home/Explore/Detail';
import Review from '../../../Components/Home/Explore/Review';
import Hotel from '../../../Components/Home/feed/Hotel';
import Colors from '../../../constants/Color';
import {useSelector} from 'react-redux';
const RecommendationDetail = ({navigation}) => {

  const state = useSelector(state => state.getPlaceById);
  const {loading, place, success, error} = state;
  const imageWidth = useWindowDimensions().width;

  useEffect(() => {
    const backAction = () => {
      navigation.goBack();
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove();
  }, []);

  const placeName = () => {
    if (!loading && success) {
      const _place = place.name;
      const words = _place.split(' ');

      for (let i = 0; i < words.length; i++) {
        words[i] = words[i].charAt(0).toUpperCase() + words[i].substr(1);
      }
      return words.join(' ');
    }
  };

  const renderTabBar = props => {
    props.tabStyle = Object.create(props.tabStyle);
    return <DefaultTabBar {...props} />;
  };

  return (
    <Container style = {{marginBottom: 30}}>
      <Header
        style={{
          height: 250,
          width: imageWidth,
          backgroundColor: Colors.themeColor,
        }}>
        {loading ? (
          <ActivityIndicator />
        ) : !loading && !success ? (
          console.log(error)
        ) : (
          <ImageDetail
            image={{uri: place.placePhoto}}
            location={place.location}
            name={placeName()}
          />
        )}
      </Header>

      <Tabs transparent renderTabBar={renderTabBar}>
        <Tab
          heading="Details"
          tabStyle={{backgroundColor: Colors.themeColor}}
          textStyle={{color: '#fff', opacity: 0.8}}
          activeTabStyle={{backgroundColor: Colors.themeColor}}
          activeTextStyle={{color: '#fff', fontSize: 22}}>
          <Detail
            details={
              place.description
            }
          />
        </Tab>
        <Tab
          heading="Review"
          tabStyle={{backgroundColor: Colors.themeColor}}
          textStyle={{color: '#fff', opacity: 0.8}}
          activeTabStyle={{backgroundColor: Colors.themeColor}}
          activeTextStyle={{color: '#fff', fontSize: 22}}>
          <Review
            reviews={
              place.reviews
            }
            placeId={
              place._id
            }
          />
        </Tab>
        <Tab
          heading="Hotels"
          tabStyle={{backgroundColor: Colors.themeColor}}
          textStyle={{color: '#fff', opacity: 0.8}}
          activeTabStyle={{backgroundColor: Colors.themeColor}}
          activeTextStyle={{color: '#fff', fontSize: 22}}>
          <Hotel
            hotels={
              place.stayPlace
            }
            id={
              place._id
            }
          />
        </Tab>
      </Tabs>
    </Container>
  );
};

export default RecommendationDetail;
