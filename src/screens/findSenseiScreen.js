import React, { useState } from 'react';
import { StyleSheet, View, FlatList, Text, Image, TouchableHighlight } from 'react-native';
import { Searchbar, Button } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
import { StackActions } from '@react-navigation/native';

const DATA = [
  // Add your data here, each item should have id, name, and profit properties
  {
    id : 1,
    profilePic : require('../../assets/alpaca2.png'),
    name : 'John Doe',
    profit : 20,
    period : '1 month'
  },
  {
    id : 2,
    profilePic : require('../../assets/alpaca2.png'),
    name : 'Baby Yoda',
    profit : 100,
    period : 'year'
  },
];

const FindSenseiScreen = ({navigation}) => {
  const [color, setColor] = useState('#e8c003'); // Alpaca color
  const [searchQuery, setSearchQuery] = useState('');
  const [filter, setFilter] = useState('Popular');

  const onChangeSearch = query => setSearchQuery(query);

  const onSenseiPress = (senseiData) => {
    // Handle sensei press here
    navigation.dispatch(StackActions.push('Sensei', senseiData));
  };

  const renderItem = ({ item }) => (
      <View key={item.id}>
        <View style={[styles.brokerageCard]}>
          <View style={styles.cardContainer}>
            <TouchableHighlight 
            onPress={() => {
                onSenseiPress(item);
              }}>
            <View style={styles.card}>
              <Image source={item.profilePic} style={styles.logo}/>
              <View style={styles.cardText}>
                <Text style={styles.brokerageText}>{item.name}</Text>
                <View style={styles.average}>
                  <Text style={[item.profit < 0 ? {color : '#ff3903'} : {color: '#32d142'} ]}>{Math.abs(item.profit)}% </Text>
                  <Text>avg. {item.period}</Text>
                </View>
              </View>
              <View style={styles.arrowContainer}>
                <Text style={styles.arrow}>&#707;</Text>
              </View>
            </View>
            </TouchableHighlight>
            <View style={styles.separator}/>
          </View>
        </View>
      </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Find a Sensei</Text>
      <View style={styles.searchSection}>
        <Ionicons name="ios-search" size={20} color="grey" onPress={() => {}} />
        <Searchbar
          placeholder="Search"
          onChangeText={onChangeSearch}
          value={searchQuery}
        />
      </View>
      <View style={styles.filterSection}>
        <Button mode={filter === 'Popular' ? "contained" : "outlined"} onPress={() => setFilter('Popular')}>Popular</Button>
        <Button mode={filter === 'Profit' ? "contained" : "outlined"} onPress={() => setFilter('Profit')}>Profit</Button>
        <Button mode={filter === 'Newest' ? "contained" : "outlined"} onPress={() => setFilter('Newest')}>Newest</Button>
      </View>
      <FlatList
        data={DATA}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  average: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  cardText: {
    marginLeft: 20,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
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
  searchSection: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  filterSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  brokerageText: {
    fontSize: 18,
    color: '#121212',
    marginLeft: 0,
  },
  logo: {
    width: 50,
    height: 50,
    borderRadius: 30,
 
  },
  arrowContainer: {
    flex: 1,
    alignItems: 'flex-end',
    
  },
  brokerageCard: {
    justifyContent: 'center',
    marginTop: 10,
  },
  arrow: {
    fontSize: 50,
    color: 'lightgray',
    fontWeight: 'bold',
  },
});

export default FindSenseiScreen;

// TODO Setup needs to be rearranged to signin/signup -> find sensei -> 
// Show sensei's portfolio and allow user to subscribe to sensei (sensei's portfolio to show invesnting graph and all current positions)
// At the bottom should be subscribe button. Pressing this brings you to choose brokerage -> if connected show portfolio value on brokerage otherwise show connect 
// after connecting (or not if you are already connected) bring you to apptabs which will show your current sensei, your portfolio, and your profile.
// Investing tab should contain portfolio value, buying power, list of current positions, and performance graph since subscribing to sensei