// SlideScreen.js
import React, { useState } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, Linking, Modal, Button } from 'react-native';

const SlideScreen2 = () => {
  const handleOpenLink = async () => {
    const supported = await Linking.canOpenURL('https://app.alpaca.markets/brokerage/dashboard/overview');

    if (supported) {
      await Linking.openURL('https://app.alpaca.markets/brokerage/dashboard/overview');
      
    } else {
      Alert.alert("Can't open the URL");
    }
  };

  return (
    <View style={styles.container}>
        <Text style={styles.textBold}>Generate API Key and Secret</Text>
        <Text style={styles.textMessage}>Next, go to the</Text>
        <TouchableOpacity onPress={handleOpenLink}>
        <Text style={styles.textLink}>Alpaca Dashboard</Text>
        </TouchableOpacity>
        <Text style={styles.textMessage}>then click</Text>
        <Text style={styles.textOther}>1. "View API Keys"</Text>
        <Text style={styles.textOther}>{'>'}</Text>
        <Text style={styles.textOther}>2. "Generate New Key"</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  textMessage: {
    fontSize: 24,
    margin: 20
  },
  textLink: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#e8c003'
  },
  textBold: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  textOther: {
    fontSize: 24
  }
  
});

export default SlideScreen2;
