import React, { useState } from 'react';
import { Modal, SafeAreaView } from 'react-native';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import Store from '../models/secureStore';

const LandingPage = ({ navigation }) => {
  const [showBrokerages, setShowBrokerages] = useState(false);

  const handleLinkBrokeragePress = () => {
    setShowBrokerages(true);
  };

  const handleSignOutPress = () => {
    Store.delete('token');
    navigation.navigate('Signin');
  };

  const brokerages = [
    {
      id: '1',
      name: 'Alpaca',
      color: '#3c3c3c', // Alpaca color
    },
    // Add more brokerages here
  ];

  const handleBrokeragePress = (name) => {
    // Handle brokerage press here
    console.log("damn", name)
    navigation.navigate(name);
};

  const renderItem = ({ item }) => (
    <TouchableOpacity style={[styles.brokerageCard, { backgroundColor: item.color }]}>
      <Text style={styles.brokerageText} onPress={() => {handleBrokeragePress(item.name)}}>{item.name}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.wrapper}>
      <View style={styles.container}>
        {!showBrokerages && (
          <TouchableOpacity style={styles.linkBrokerageButton} onPress={handleLinkBrokeragePress}>
            <Text style={styles.linkBrokerageButtonText}>Link Brokerage</Text>
          </TouchableOpacity>
        )}
        {showBrokerages && (
        
          <FlatList
            data={brokerages}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
            contentContainerStyle={styles.brokerageList}
          />
        )}
      </View>
      <TouchableOpacity style={styles.signOutButton} onPress={handleSignOutPress}>
        <Text style={styles.signOutButtonText}>Sign Out</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#2f1412',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
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
    backgroundColor: '#ad2139',
    height: 60,
  },
  signOutButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#e7a0ae',
  },
  brokerageCard: {
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10,
    borderRadius: 5,
    padding: 20,
  },
  brokerageText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  brokerageList: {
    paddingTop: '25%',
  }
});

export default LandingPage;