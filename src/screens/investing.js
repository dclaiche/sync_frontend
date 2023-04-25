import React, { useState } from 'react';
import {
  StyleSheet,
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  Image,
} from 'react-native';

const Investing = () => {
  const [timeframe, setTimeframe] = useState('1D');

  const handleTimeframePress = (newTimeframe) => {
    setTimeframe(newTimeframe);
  };

  const handleAddCreatorPress = () => {
    // Empty onPress handler for the "+" button
  };

  return (
    <View style={styles.wrapper}>
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.totalValue}>Total Portfolio Value: $5000</Text>
      <Text style={styles.buyingPower}>Buying Power: $1000</Text>
      <Text style={styles.dayTraderStatus}>Day Trader Status: False</Text>

      <View style={styles.separator} />

      <View style={styles.graphContainer}>
        {/* Replace this View with a graph component to display the portfolio gain/loss over time */}
        <View style={styles.graphPlaceholder} />
        <View style={styles.timeframeTabs}>
          {['1D', '3D', '7D', '1M', '3M', '6M', 'All'].map((tf) => (
            <TouchableOpacity key={tf} onPress={() => handleTimeframePress(tf)}>
              <Text style={[styles.timeframeText, timeframe === tf ? styles.activeTimeframe : null]}>{tf}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <View style={styles.separator} />

      <View style={styles.creatorList}>
        {/* Replace this array with your actual list of creators */}
        {Array(3).fill().map((_, i) => (
          <View key={i} style={styles.creatorCard}>
            <View style={styles.profile}>
              {/* Replace this View with an Image component for the profile picture */}
              <View style={styles.profilePicture} />
              <Text style={styles.username}>Username {i + 1}</Text>
            </View>
            <Text style={styles.gainLoss}>Gain/Loss: $0</Text>
            <Text style={styles.ordersToday}>Orders Today: 0</Text>
          </View>
        ))}
        <View style={styles.creatorCard}>
        <TouchableOpacity onPress={handleAddCreatorPress} style={styles.addButton}>
          <Text style={styles.addButtonText}>+</Text>
        </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        backgroundColor: '#2f1412',
        },
  container: {
    flexGrow: 1,
    justifyContent: 'space-evenly',
    alignItems: 'center',
    backgroundColor: '#2f1412',
    paddingVertical: 20,
  },
  totalValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#e7a0ae',
  },
  buyingPower: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#c76982',
  },
  dayTraderStatus: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ad2139',
  },
  separator: {
    height: 1,
    width: '80%',
    backgroundColor: '#c76982',
    marginVertical: 20,
  },
  graphContainer: {
    alignItems: 'center',
    width: '100%',
  },
  graphPlaceholder: {
    fontSize: 16,
    color: '#c76982',
  },
  scaleTabs: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
    timeframeTabs: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    paddingHorizontal: 50,
    },
    timeframeText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#c76982',
    },
    activeTimeframe: {
    color: '#e7a0ae',
    },
    creatorList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-evenly',
    width: '100%',
    },
    creatorCard: {
    width: '50%',
    height: 150,
    backgroundColor: '#2f1412',
    borderRadius: 10,
    marginVertical: 10,
    padding: 10,
    justifyContent: 'space-evenly',
    alignItems: 'center',
    },
    profile: {
    flexDirection: 'row',
    alignItems: 'center',
    },
    profilePicture: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#c76982',
    },
    username: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#e7a0ae',
    marginLeft: 10,
    },
    gainLoss: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#c76982',
    },
    ordersToday: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#ad2139',
    },
    addButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#c76982',
    justifyContent: 'center',
    alignItems: 'center',
    },
    addButtonText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#2f1412',
    },
});

export default Investing;