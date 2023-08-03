import { Text, View, StyleSheet, TouchableOpacity, Image, SafeAreaView} from 'react-native';
import authenticate from '../models/auth';
import { useCallback } from 'react';
import Store from '../models/secureStore';
import axios from 'axios';
import { useFocusEffect } from '@react-navigation/native';

const AuthLogin = ({ navigation }) => {

    const getAccountAlpaca = async (token) => {
        try {
          const response = await axios.get('http://192.168.1.13:8080/trader/account', { headers: { Authorization: `Bearer ${token}` } });
          return true;
        } catch (error) {
          return false;
        }
      };

    const Unlock = async () => {
        var result = await authenticate();
        if (result === 'success') {
            const token = await Store.get('token');
            if (await getAccountAlpaca(token)) {
                navigation.navigate('AppTabs');
            } else {
              navigation.navigate('BrokeragePage');
            }
          } 
    };

    const handleSignOutPress = () => {
        Store.delete('token');
        navigation.navigate('Welcome');
      };

      useFocusEffect(
        useCallback(() => {
          Unlock();
          // Return a cleanup function to remove the effect when the screen is unfocused
          return () => {};
        }, [navigation])
      );
    
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.logoContainer}>
                <Image style={styles.logo} source={require('../../assets/logo.png')}/>
            </View>
            <View style={styles.container}>
                <TouchableOpacity style={styles.buttonContainerUnlock} onPress={Unlock}>
                    <Text style={styles.buttonTitle}>Unlock</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.buttonContainerLogout} onPress={handleSignOutPress}>
                    <Text style={styles.buttonTitle}>Logout</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        flex: 1,
      },

      logoContainer: {
        alignItems: 'center',
        height: '25%',
        marginBottom: '60%'
      },
      logo: {
        width: 200,
        height: 200,
        resizeMode: 'contain',
        marginBottom: 20,
      },
      buttonContainerUnlock: {
        position: 'relative',
        alignSelf: 'center',
        backgroundColor: 'purple',
        marginTop: 20,
        paddingVertical: 20,
        paddingHorizontal: 40,
        borderRadius: 10,
      },
      buttonContainerLogout: {
        position: 'relative',
        alignSelf: 'center',
        backgroundColor: 'grey',
        marginTop: 20,
        paddingVertical: 20,
        paddingHorizontal: 40,
        borderRadius: 10,
      },
      buttonTitle: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
      }
});

export default AuthLogin;