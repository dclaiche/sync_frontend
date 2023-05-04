import React from 'react';
import { useState, useRef } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  KeyboardAvoidingView,
  Platform,
  Dimensions
} from 'react-native';
import axios from 'axios';
import Store from '../models/secureStore';

const { width, height } = Dimensions.get('window');

const Signin = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const passwordInputRef = useRef(null);

  const getAccountAlpaca = async (token) => {
    try {
      const response = await axios.get('http://192.168.1.9:8080/trader/account', { headers: { Authorization: `Bearer ${token}` } });
      return true;
    } catch (error) {
      return false;
    }
  };

  const handleSignIn = async () => {
    try {
        const config = {
            email: email,
            password: password
        }
        const response = await axios.post('http://192.168.1.9:8080/auth/login', config);
        Store.delete('token');
        Store.save('token', response.data);
        if (await getAccountAlpaca(response.data)) {
          navigation.navigate('AppTabs');
        } else {
        navigation.navigate('BrokeragePage');
        }
    } catch (error) {
        console.log(error);
    }
  };

  const handleRegister = () => {
    navigation.navigate('Signup');
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <View style={styles.logoContainer}>
          <Image
            style={styles.logo}
            source={require('../../assets/logo.png')}
          />
        </View>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Sync</Text>
        </View>
      <View style={styles.innerContainer}>
        <TextInput
          style={styles.input}
          onChangeText={setEmail}
          value={email}
          placeholder="Email Address"
          keyboardType="email-address"
          autoCompleteType="email"
          returnKeyType="next"
          onSubmitEditing={() => passwordInputRef.current.focus()}
        />
        <TextInput
          ref={passwordInputRef}
          style={styles.input}
          onChangeText={setPassword}
          value={password}
          placeholder="Password"
          secureTextEntry={true}
          autoCompleteType="password"
          returnKeyType="done"
        />
        <TouchableOpacity style={styles.button} onPress={handleSignIn}>
          <Text style={styles.buttonText}>Sign In</Text>
        </TouchableOpacity>
        <View style={styles.registerContainer}>
          <Text>Don't have an account? </Text>
          <TouchableOpacity onPress={handleRegister}>
            <Text style={styles.registerText}>Register now</Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  logoContainer: {
    alignItems: 'center',
    marginTop: height * 0.1,
  },
  logo: {
    width: 50,
    height: 50,
    resizeMode: 'contain',
  },
  titleContainer: {
    alignItems: 'center',
    marginTop: height * 0.05,
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#8a2be2',
  },
  container: {
    flex: 1,
  },
  innerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  input: {
    width: '100%',
    height: 50,
    borderColor: 'gray',
    borderWidth: 1,
    paddingHorizontal: 10,
    marginBottom: 15,
  },
  button: {
    backgroundColor: '#2196F3',
    width: '100%',
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
  },
  registerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  registerText: {
    color: '#2196F3',
    fontWeight: 'bold',
  },
});


export default Signin;