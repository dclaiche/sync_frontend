// AppNavigator.js
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Signin from '../screens/signin';
import TabNavigator from './TabNavigator';
import LandingPage from '../screens/landingPage';
import Signup from '../screens/signup';
import ModalContent from '../modals/alpaca';


const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="Signup" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Signin" component={Signin} />
      <Stack.Screen name="Signup" component={Signup} />
      <Stack.Screen name="LandingPage" component={LandingPage} />
      <Stack.Screen name="Alpaca" component={ModalContent} />
      <Stack.Screen name="AppTabs" component={TabNavigator} />
    </Stack.Navigator>
  );
};

export default AppNavigator;