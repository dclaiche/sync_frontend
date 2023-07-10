import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, View, FlatList, Text, Image, TouchableHighlight, SafeAreaView, ScrollView, TouchableOpacity} from 'react-native';
import { Searchbar, Button } from 'react-native-paper';
import Graph from '../components/graph';
import TestGraph from '../components/testGraph';


const Sensei = ({navigation, route}) => {

    const handleScroll = (event) => {
        const { contentOffset, contentInset } = event.nativeEvent;
        console.log(contentOffset.y);
        const scrollY = contentOffset.y;
        // Do something with the scroll position
        if (scrollY <= 0) {
          // Scrolled down
          navigation.setOptions({ headerStyle: { 
            elevation: 0, // remove shadow on Android
            shadowOpacity: 0, // remove shadow on iOS
            } 
        })
        } else {
          // At the top
          navigation.setOptions({ headerStyle: { 
            elevation: 1, // remove shadow on Android
            shadowOpacity: 1, // remove shadow on iOS
            backgroundColor: '#F8F8F8',
            opacity: 0.2,
            }, headerTintColor: 'blue' })
        }
      };

      
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar backgroundColor="transparent" translucent={true} style="auto" />
        <ScrollView contentContainerStyle={styles.scrollContainer} onScroll={handleScroll} scrollEventThrottle={16}>
          <View style={styles.profileContainer}>
            <Image
              style={styles.profilePic}
              source={route.params.profilePic} // Replace with actual image source
            />
            <View style={styles.profileInfo}>
              <Text style={styles.profileName}>{route.params.name}</Text>
              <Text style={styles.profileDescription}>Profile Description</Text>
            </View>
          </View>
          <View style={styles.graphContainer}>
            <Text>Graph</Text>
            <TestGraph />
          </View>
          <View style={styles.holdingsContainer}>
            <Text style={styles.sectionTitle}>Current Holdings</Text>
            {/* Placeholder for List of Holdings */}
            <Text>Holding 1</Text>
            <Text>Holding 2</Text>
            <Text>Holding 3</Text>
            {/* ... */}
          </View>
        </ScrollView>
        <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={{}}>
            <Text style={styles.buttonText}>Select Tracker</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  };
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'white',
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
    scrollContainer: {
      flexGrow: 1,
      paddingBottom: 60, // To account for button height
    },
    profileContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: 20,
      paddingVertical: 20,
    },
    profilePic: {
      width: 50,
      height: 50,
      borderRadius: 25,
    },
    profileInfo: {
      marginLeft: 10,
    },
    profileName: {
      fontSize: 20,
      fontWeight: 'bold',
    },
    profileDescription: {
      fontSize: 14,
      color: 'gray',
    },
    graphContainer: {
      paddingHorizontal: 20,
      paddingVertical: 20,
    },
    holdingsContainer: {
      paddingHorizontal: 20,
      paddingVertical: 20,
    },
    sectionTitle: {
      fontSize: 16,
      fontWeight: 'bold',
      marginBottom: 10,
    },
    buttonContainer: {
      position: 'absolute',
      bottom: 0,
      left: 0,
      right: 0,
      backgroundColor: 'black',
      alignItems: 'center',
      paddingVertical: 15,
    },
  });
  
  export default Sensei;