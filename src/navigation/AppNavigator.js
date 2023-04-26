// AppNavigator.js
import React, { useState, useEffect } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Signin from '../screens/signin';
import TabNavigator from './TabNavigator';
import LandingPage from '../screens/landingPage';
import Signup from '../screens/signup';
import Alpaca from '../screens/alpaca';
import Store from '../models/secureStore';

const Stack = createStackNavigator();

const AppNavigator = () => {
  const [initialRoute, setInitialRoute] = useState(null); // Declare the initialRoute state with a default value of null

  const checkToken = async () => {
    const token = await Store.get('token');
    console.log(token);
    if (token) {
      setInitialRoute('LandingPage');
    } else {
      setInitialRoute('Signin');
    }
  };

  useEffect(() => {
    checkToken();
  }, []);

  if (initialRoute === null) {
    return null;
  }

  return (
    <Stack.Navigator initialRouteName={initialRoute} screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Signin" component={Signin} />
      <Stack.Screen name="Signup" component={Signup} />
      <Stack.Screen name="LandingPage" component={LandingPage} />
      <Stack.Screen name="Alpaca" component={Alpaca} />
      <Stack.Screen name="AppTabs" component={TabNavigator} />
    </Stack.Navigator>
  );
};

export default AppNavigator;
