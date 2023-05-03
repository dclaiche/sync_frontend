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
} from 'react-native';
import axios from 'axios';
import Store from '../models/secureStore';
import DatabaseManager from '../models/databaseManager';
import UserDTO from '../models/userDTO';

const Signup = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(true);

  const passwordInputRef = useRef(null);

  const handleSignUp = async () => {
    try {
      const response = await axios.post('http://192.168.1.9:8080/user/signup', {
      email: email,
      password: password,
      phone: null
    });
    const databaseManager = DatabaseManager.getInstance();
    // Insert User info into database
    const user = new UserDTO(response.data.user.id, response.data.user.email, response.data.user.phone, response.data.user.creator_status);
    const result = databaseManager.insertUser(user);
    console.log(result);
    Store.save('userid', response.data.user.id.toString());
    Store.save('token', response.data.token);
    navigation.navigate('LandingPage');
    } catch (error) {
        console.log(error);
    }
  };

  const handleLogin = () => {
    navigation.navigate('Signin');
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <View style={styles.innerContainer}>
        <Image
          style={styles.logo}
          source={require('../../assets/logo.png')}
        />
        <Text style={styles.welcome}>Sign up for Sync!</Text>
        <TextInput
          style={styles.input}
          onChangeText={setEmail}
          value={email}
          placeholder="Email"
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
          secureTextEntry
          autoCompleteType="password"
          returnKeyType="done"
        />
        <TouchableOpacity style={styles.button} onPress={handleSignUp}>
          <Text style={styles.buttonText}>Create Account</Text>
        </TouchableOpacity>
        <View style={styles.registerContainer}>
          <Text>Already have an account? </Text>
          <TouchableOpacity onPress={handleLogin}>
            <Text style={styles.registerText}>Sign in</Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  innerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  logo: {
    width: 200,
    height: 200,
    resizeMode: 'contain',
    marginBottom: 20,
  },
  welcome: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    height: 40,
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


export default Signup;