import React, { useState } from 'react';
import { StyleSheet, View, FlatList } from 'react-native';
import { Searchbar, Button } from 'react-native-paper';
import { ListItem, Avatar, Text } from 'react-native-elements';
import { Ionicons } from '@expo/vector-icons';

const DATA = [
  // Add your data here, each item should have id, name, and profit properties
];

const FindSenseiScreen = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filter, setFilter] = useState('Popular');

  const onChangeSearch = query => setSearchQuery(query);

  const renderItem = ({ item }) => (
    <ListItem bottomDivider>
      <Avatar source={{uri: item.profilePic}} />
      <ListItem.Content>
        <ListItem.Title>{item.name}</ListItem.Title>
        <ListItem.Subtitle>{item.profit}% yearly average profit</ListItem.Subtitle>
      </ListItem.Content>
    </ListItem>
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
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'left',
    marginBottom: 10,
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
});

export default FindSenseiScreen;

// TODO Setup needs to be rearranged to signin/signup -> find sensei -> 
// Show sensei's portfolio and allow user to subscribe to sensei (sensei's portfolio to show invesnting graph and all current positions)
// At the bottom should be subscribe button. Pressing this brings you to choose brokerage -> if connected show portfolio value on brokerage otherwise show connect 
// after connecting (or not if you are already connected) bring you to apptabs which will show your current sensei, your portfolio, and your profile.
// Investing tab should contain portfolio value, buying power, list of current positions, and performance graph since subscribing to sensei