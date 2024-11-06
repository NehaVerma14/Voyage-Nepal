import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, ActivityIndicator, Dimensions} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator, createSw} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createSwitchNavigator, createAppContainer} from 'react-navigation';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import {Icon} from 'native-base';

import Signin from '../screens/Signin/Signin';
import Signup from '../screens/Signup/Signup';
import Feed from '../screens/Homepage/feed/Feed';
import Explore from '../screens/Homepage/explore/Explore';
import Details from '../screens/Homepage/explore/Details';
import Map from '../screens/Homepage/planTrip/viewPlans';
import Profile from '../screens/Homepage/ProfileScreen/Profile';
import AboutMe from '../screens/Homepage/ProfileScreen/AboutMe';
import Starter from '../screens/starter/Starter';
import Loading from '../screens/LoadingScreen/Loading';
import OTPScreen from '../screens/Signin/forgotPAssword/OTPScreen';
import Email from '../screens/Signin/forgotPAssword/Email';
import ResetPassword from '../screens/Signin/forgotPAssword/ResetPassword';
import Colors from '../constants/Color';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ChangePassword from '../screens/Homepage/ProfileScreen/ChangePassword';
import RecommendationDetail from '../screens/Homepage/feed/RecommendationDetail';
import LoadingScreen from '../screens/LoadingScreen/LoadingScreen';
import FeedMap from '../screens/Homepage/feed/FeedMap';
import Settings from '../screens/Homepage/ProfileScreen/Settings';
import FAQ from '../Components/Home/profile/Settings/FAQ';
import PrivacyPolicy from '../Components/Home/profile/Settings/PrivacyPolicy';
import TermsAndCond from '../Components/Home/profile/Settings/TermsAndCond';
import ChoosePlace from '../screens/starter/ChoosePlace'
import TabComponent from './Tab'
import ViewPlans from '../screens/Homepage/planTrip/viewPlans';
import ViewWishlist from '../screens/Homepage/wishlist/viewWishlist';
import CreatePlans from '../screens/Homepage/planTrip/CreatePlans';
import Dob from '../screens/Homepage/ProfileScreen/Dob';
import Welcome from '../screens/starter/Welcome';
import Company from '../Components/Home/profile/Sponsorship/Company';
import Tiers from '../Components/Home/profile/Sponsorship/Tiers';
import success from '../Components/Home/profile/Sponsorship/success';
import SponsorPage from '../Components/Home/profile/Sponsorship/SponsorPage';
import banner from '../Components/Home/profile/Sponsorship/banner';
import Sponsor from '../Components/Home/profile/Sponsorship/Sponsor';
import WelcomeFb from '../screens/starter/WelcomeFb';
import PlaceList from '../screens/Homepage/PlaceList/PlaceList';

const activeColor = '#CF3838';

const MainStack = createStackNavigator();
const RootStack = createStackNavigator();
const Tab = createBottomTabNavigator();
const Maps = createBottomTabNavigator();
const Explores = createMaterialBottomTabNavigator();
const Plans = createMaterialBottomTabNavigator();
const WishList = createMaterialBottomTabNavigator();
const AccountStack = createMaterialBottomTabNavigator();
const Feeds = createMaterialBottomTabNavigator();

const Home = () => {
  return (
    <Tab.Navigator
    tabBarOptions={{
      keyboardHidesTabBar: true,
      activeTintColor: Colors.green,
      inactiveTintColor: Colors.dimGray,
      showLabel: false,
      style: {
        backgroundColor: 'white',
        borderTopWidth: 0,
        position: 'absolute',
        elevation: 0,
        
      },
    }}
      >
      <Tab.Screen
        name="Feed"
        component={FeedScreen}
        options={{
          tabBarButton: (props)=> <TabComponent label="Home" {...props}/>
      }}
      />
      {/* <Tab.Screen
        name="Explore"
        component={ExploreScreen}
        options={{
          tabBarButton: (props)=> <TabComponent label="Explore" {...props}/>
      }}
      /> */}
      <Tab.Screen
        name="Plan"
        component={TripPlanner}
        options={{
          tabBarButton: (props)=> <TabComponent label="Explore" {...props}/>
      }}
      />
      <Tab.Screen
        name="Wishlist"
        component={WishLists}
        options={{
          tabBarButton: (props)=> <TabComponent label="Explore" {...props}/>
      }}
      />
      {/* <Tab.Screen
        name="Map"
        component={Map}
        options={{
          tabBarIcon: ({focused}) => (
            <Icon
              type="Fontisto"
              name="hotel"
              size={26}
              style={{color: focused ? Colors.themeColor : Colors.dimGray}}
            />
          ),
        }}
      /> */}
      <Tab.Screen
        name="Profile"
        component={AccountScreen}
        options={{
          tabBarButton: (props)=> <TabComponent label="Profile" {...props}/>
      }}
      />
    </Tab.Navigator>
  );
};

function FeedScreen() {
  return (
    <Feeds.Navigator barStyle={{display: 'none'}}>
      {/* <Feeds.Screen name = 'Loading' component = {Loading} /> */}
      <Feeds.Screen name="Feed" component={Feed} />
      <Feeds.Screen name="Explore" component={ExploreScreen} />
      <Feeds.Screen name = 'PlaceList' component={PlaceList} />
      <Feeds.Screen
        name="RecommendationDetail"
        component={RecommendationDetail}
      />
      <Feeds.Screen name="FeedMap" component={FeedMap} />
    </Feeds.Navigator>
  );
}

function ExploreScreen() {
  return (
    <Explores.Navigator barStyle={{display: 'none'}}>
      <Explores.Screen name="Explore" component={Explore} />
      <Explores.Screen name="Details" component={Details} />
      <Explores.Screen name="ExploreMap" component={Map} />
    </Explores.Navigator>
  );
}

function TripPlanner() {
  return (
    <Plans.Navigator barStyle={{display: 'none'}}>
      <Plans.Screen name="TripPlans" component={ViewPlans} />
      <Plans.Screen name="CreateTrip" component={CreatePlans} />
    </Plans.Navigator>
  );
}

function WishLists() {
  return (
    <WishList.Navigator barStyle={{display: 'none'}}>
      <WishList.Screen name="Wishlist" component={ViewWishlist} />
    </WishList.Navigator>
  );
}

function AccountScreen() {
  return (
    <AccountStack.Navigator barStyle={{display: 'none'}}>
      <AccountStack.Screen name="Account" component={Profile} />
      <AccountStack.Screen name="About me" component={AboutMe} />
      <AccountStack.Screen name="Change Password" component={ChangePassword} />
      <AccountStack.Screen name="Settings" component={Settings} />
      <AccountStack.Screen name="FAQ" component={FAQ} />
      <AccountStack.Screen name="Policy" component={PrivacyPolicy} />
      <AccountStack.Screen name="Terms" component={TermsAndCond} />
      <AccountStack.Screen name="Sponsor" component={Sponsor} />
      <AccountStack.Screen name="Company" component={Company} />
      <AccountStack.Screen name="Tiers" component={Tiers} />
      <AccountStack.Screen name="success" component={success} />
      <AccountStack.Screen name="SponsorPage" component={SponsorPage} />
      <AccountStack.Screen name="banner" component={banner} />
    </AccountStack.Navigator>
  );
}

function MainStackScreen() {
  // const [userToken, setUserToken] = useState(null);
  // const [isLoading, setIsLoading] = useState(true);
  // useEffect(async () => {
  //   const token = await AsyncStorage.getItem('token');
  //   if (token !== null) {
  //     setUserToken(token);
  //     setIsLoading(false);
  //   } else {
  //     setIsLoading(false);
  //   }
  // }, []);
  return (
    <MainStack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <MainStack.Screen
        name="Starter"
        component={Starter}
        options={{
          title: 'Starter',
          headerStyle: {
            backgroundColor: '#1597bb',
          },
        }}
      />
      <MainStack.Screen
        name="Signin"
        component={Signin}
        options={{
          title: 'Signin',
          headerStyle: {
            backgroundColor: '#1597bb',
          },
        }}
      />
      <MainStack.Screen
        name="LoadingScreen1"
        component={LoadingScreen}
        options={{
          title: 'LoadingScreen',
          headerStyle: {
            backgroundColor: '#1597bb',
          },
        }}
      />
      <MainStack.Screen
        name="LoadingScreen2"
        component={Loading}
        options={{
          title: 'Loading',
          headerStyle: {
            backgroundColor: '#1597bb',
          },
        }}
      />
      <MainStack.Screen
        name="Signup"
        component={Signup}
        options={{
          title: 'Signup',
          headerStyle: {
            backgroundColor: '#5eaaa8',
          },
        }}
      />
      <MainStack.Screen
        name="Home"
        component={Home}
        options={{
          title: 'Home',
          headerStyle: {
            backgroundColor: '#5eaaa8',
          },
        }}
      />
    </MainStack.Navigator>
  );
}

const linking = {
  prefixes: ["app://deeplink/"],
  config: {
    screens:{
      Dob: {
        path: 'Dob'
      }
    }
  }
}

function App() {
  return (
    <NavigationContainer linking={linking}>
      <RootStack.Navigator mode="modal" headerMode="none">
        <RootStack.Screen name="Main" component={MainStackScreen} />
        <RootStack.Screen name="Email" component={Email} />
        <RootStack.Screen name="Dob" component={Dob} />
        <RootStack.Screen name="MyModal" component={OTPScreen} />
        <RootStack.Screen name="Reset" component={ResetPassword} />
        <RootStack.Screen name="ChoosePlace" component={ChoosePlace} />
        <RootStack.Screen name="Welcome" component={Welcome} />
        <RootStack.Screen name="WelcomeFb" component={WelcomeFb} />
      </RootStack.Navigator>
    </NavigationContainer>
  );
}

export default App;
