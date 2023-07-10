import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableHighlight,
  StatusBar,
  Image,
  SafeAreaView,
  Pressable,
} from 'react-native';
import Store from '../models/secureStore';
import { StackActions } from '@react-navigation/native';

const BrokeragePage = ({ navigation }) => {
  

  const handleSignOutPress = () => {
    Store.delete('token');
    navigation.navigate('Welcome');
  };

  const brokerages = [
    {
      id: '1',
      name: 'Alpaca',
      color: '#e8c003', // Alpaca color
      image: require('../../assets/alpaca2.png'),
    },
    // Add more brokerages here
  ];

  const futureBrokerages = [
    {
      id: '1',
      name: 'Robinhood',
      color: '#3B5B4B', // Alpaca color
      image: require('../../assets/robinhood.png'),
    },
    {
      id: '2',
      name: 'TD Ameritrade',
      image: require('../../assets/tdameritrade.png'),
    },
    {
      id: '3',
      name: 'Webull',
      image: require('../../assets/webull.png'),
    }
    // Add more brokerages here
  ];

  const handleBrokeragePress = (name) => {
    // Handle brokerage press here
    navigation.dispatch(StackActions.push(name));
};

  return (
    <SafeAreaView style={styles.wrapper}>
       <StatusBar barStyle="dark-content" />
      <Text style={styles.title}>Connect your Broker</Text>
      <View style={styles.container}>
      {brokerages.map((item) => (
          <View key={item.id}>
            <TouchableHighlight
              onPress={() => {
                handleBrokeragePress(item.name);
              }}
              underlayColor="#e8c003"
              style={[styles.brokerageCard]}
            >
              <View>
                <View style={styles.card}>
                  <Image source={item.image} style={styles.logo} />
                  <Text style={styles.brokerageText}>{item.name}</Text>
                  <View style={styles.arrowContainer}>
                    <Text style={styles.arrow}>&#707;</Text>
                  </View>
                </View>
                <View style={styles.separator} />
              </View>
            </TouchableHighlight>
          </View>
        ))}
        <View style={{
          marginTop: '10%',
        }}>
          <Text style={{
            color: 'gray',
            marginLeft: '5%',
          }}>More to come soon...</Text>
          {futureBrokerages.map((item) => (
          <View key={item.id}>
            <View
              style={[styles.brokerageCard]}
            >
              <View>
                <View style={styles.card}>
                  <Image source={item.image} style={styles.logoNotReady} />
                  <Text style={styles.brokerageTextNotReady}>{item.name}</Text>
                </View>
              </View>
            </View>
          </View>
        ))}
        <View style={styles.separator} />
        <TouchableHighlight 
        onPress={() => {
          handleBrokeragePress('Alpaca');
        }}
        underlayColor={'rgba(114, 109, 109, .5)'}
        style={[styles.brokerageCardHelp]}>
              <View>
                <View style={styles.card}>
                  <Image source={require('../../assets/qmark.webp')} style={styles.logoNotReady} />
                  <Text style={styles.brokerageText}>Don't have a Broker?</Text>
                </View>
              </View>
            </TouchableHighlight>
        </View>
      </View>
      <View style={styles.signOutButton}>
        <Pressable  
         onPress={handleSignOutPress}
        style={({ pressed }) => [
        pressed ? styles.pressedSignOutText : null,]}>
      <Text style={styles.signOutButtonText}>Sign Out</Text>
      </Pressable>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  pressedSignOutText: {
    color: '#ad2139', // Darker color when pressed
  },
  overlay: {
    backgroundColor: 'rgba(128, 128, 128, 0.5)',
  },
  title: {
    fontSize: 16,
    color: '#121212',
    textAlign: 'center',
    marginTop: '15%',
    fontWeight: 'bold',
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
  },
  separator: {
    height: 1,
    width: '90%',
    backgroundColor: 'lightgray',
    alignSelf: 'center',
  },
  wrapper: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  container: {
    flex: 1,
    marginTop: '5%',
  },
  linkBrokerageButton: {
    alignSelf: 'center',
    paddingHorizontal: 30,
    paddingVertical: 15,
    backgroundColor: '#c76982',
    borderRadius: 5,
  },
  linkBrokerageButtonText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#e7a0ae',
  },
  signOutButton: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
    height: 50,
  },
  signOutButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'rgba(200, 10, 10, .7)',
  },
  brokerageCard: {
    justifyContent: 'center',
    marginTop: 10,
  },
  brokerageCardHelp: {
    justifyContent: 'center',
  },
  brokerageText: {
    fontSize: 18,
    color: '#121212',
    marginLeft: 15,
  },
  brokerageCardNotReady: {
    justifyContent: 'center',
    backgroundColor: 'lightgray',
    marginTop: 10,
  },
  brokerageTextNotReady: {
    fontSize: 18,
    color: 'gray',
    marginLeft: 15,
    opacity: 0.5,
  },
  brokerageList: {
    paddingTop: '10%',
  },
  logo: {
    width: 50,
    height: 50,
    borderRadius: 30,
 
  },
  logoNotReady: {
    width: 50,
    height: 50,
    borderRadius: 30,
    opacity: 0.2,
  },
  arrowContainer: {
    flex: 1,
    alignItems: 'flex-end',
    
  },
  arrow: {
    fontSize: 50,
    color: 'lightgray',
    fontWeight: 'bold',
  },
});

export default BrokeragePage;