// AppNavigator.js
import { createStackNavigator } from '@react-navigation/stack';
import Signin from '../screens/signin';
import TabNavigator from './TabNavigator';
import BrokeragePage from '../screens/brokeragePage';
import Signup from '../screens/signup';
import Alpaca from '../screens/alpaca';
import Store from '../models/secureStore';
import AuthLogin from '../screens/authLogin';
import { useRef, useEffect, useState } from 'react';
import { AppState } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import Welcome from '../screens/welcome';


const Stack = createStackNavigator();

const AppNavigator = () => {
  const [initialRoute, setInitialRoute] = useState(null); // Declare the initialRoute state with a default value of null

  const appState = useRef(AppState.currentState);
  const [appStateVisible, setAppStateVisible] = useState(appState.current);
  const navigation = useNavigation(); // Add this line to get the navigation object


    const checkToken = async () => {
      const token = await Store.get('token');
      if (token) {
        const status = await checkAccount(token);
        if (status.status === 'none' || status.status === 'User not found') {
          setInitialRoute('Welcome');
        } else if (status.status === 'Missing key or secret') {
          setInitialRoute('BrokeragePage');
        } else if (status.status === 'both') {
          setInitialRoute('AuthLogin');
        } else {
          setInitialRoute('Signin');
        }
      } else {
        setInitialRoute('Welcome');
      }
    };

    const checkAccount = async (token) => {
      try {
        const response = await axios.get('http://192.168.1.9:8080/user/check-account', { headers: { Authorization: `Bearer ${token}` } });
        return {status: 'both'};
      } catch (error) {
        if (error.response) {
            return {status: error.response.data.error};
        } else {
            return {status: 'none'};
        }
      }
    };

    useEffect(() => {
      checkToken();
    }, []);

    useEffect(() => {
      const subscription = AppState.addEventListener('change', async nextAppState => {
        if (
          appState.current.match(/background/) &&
          nextAppState === 'active'
        ) {
          const token = await Store.get('token');
          if (token) {
            const status = await checkAccount(token)
            if (status.status === 'none' || status.status === 'User not found') {
              navigation.navigate('Signup');
            } else if (status.status === 'Missing key or secret') {
              // Do nothing and stay on BrokeragePage
            } else if (status.status === 'both') {
              navigation.navigate('AuthLogin');
            } else {
              navigation.navigate('Signin');
            }
          } else {
            navigation.navigate('Signin');
          }
        }
        appState.current = nextAppState;
        setAppStateVisible(appState.current);
        console.log('AppState', appState.current);
      });
  
      return () => {
        subscription.remove();
      };
    }, [appState]);

    if (initialRoute === null) {
      return null;
    }
 
  return (
    <Stack.Navigator initialRouteName={initialRoute} screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Signin" component={Signin} />
      <Stack.Screen name="Signup" component={Signup} />
      <Stack.Screen name="BrokeragePage" component={BrokeragePage} />
      <Stack.Screen name="Alpaca" component={Alpaca} />
      <Stack.Screen name="AppTabs" component={TabNavigator} />
      <Stack.Screen name="AuthLogin" component={AuthLogin}/>
      <Stack.Screen name="Welcome" component={Welcome}/>
    </Stack.Navigator>
  );
};

export default AppNavigator;
