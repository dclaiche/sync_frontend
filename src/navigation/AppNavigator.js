// AppNavigator.js
import { createStackNavigator } from '@react-navigation/stack';
import Signin from '../screens/signin';
import TabNavigator from './TabNavigator';
import LandingPage from '../screens/landingPage';
import Signup from '../screens/signup';
import Alpaca from '../screens/alpaca';
import Store from '../models/secureStore';
import AuthLogin from '../screens/authLogin';
import authenticate from '../models/auth';
import { useRef, useEffect, useState, useCallback } from 'react';
import { AppState } from 'react-native';
import { useNavigation, useFocusEffect, useIsFocused } from '@react-navigation/native';
import axios from 'axios';


const Stack = createStackNavigator();

const AppNavigator = () => {
  const [initialRoute, setInitialRoute] = useState(null); // Declare the initialRoute state with a default value of null

  const appState = useRef(AppState.currentState);
  const [appStateVisible, setAppStateVisible] = useState(appState.current);
  const navigation = useNavigation(); // Add this line to get the navigation object
  const [tabbedOut, setTabbedOut] = useState(false);
  const isFocused = useIsFocused();

    const checkToken = async () => {
      const token = await Store.get('token');
      if (token) {
        if (await getAccountAlpaca(token)) {
        setInitialRoute('AuthLogin');
        } else {
          setInitialRoute('LandingPage');
        }
      } else {
        setInitialRoute('Signin');
      }
    };

    const getAccountAlpaca = async (token) => {
      try {
        const response = await axios.get('http://192.168.1.9:8080/trader/account', { headers: { Authorization: `Bearer ${token}` } });
        return true;
      } catch (error) {
        return false;
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
            if (await getAccountAlpaca(token)) {
              navigation.navigate('AuthLogin');
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
      <Stack.Screen name="LandingPage" component={LandingPage} />
      <Stack.Screen name="Alpaca" component={Alpaca} />
      <Stack.Screen name="AppTabs" component={TabNavigator} />
      <Stack.Screen name="AuthLogin" component={AuthLogin}/>
    </Stack.Navigator>
  );
};

export default AppNavigator;
