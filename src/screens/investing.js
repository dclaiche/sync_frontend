import React, { useEffect, useState } from 'react';
import { LineChart } from 'react-native-wagmi-charts';
import {
  StyleSheet,
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  SafeAreaView,
  StatusBar
} from 'react-native';
import moment from 'moment';
import * as haptics from 'expo-haptics';
import axios from 'axios';
import Store from '../models/secureStore';

const Investing = () => {
  const [timeframe, setTimeframe] = useState('1M');
  const [buyingPower, setBuyingPower] = useState(0);
  const [equity, setEquity] = useState(parseFloat(0.00));
  const [baseValue, setBaseValue] = useState(0.00);
  const [data, setData] = useState([]);
  const [LineChartColor, setLineChartColor] = useState('#32d142');

  function getCurrentDate() {
    const date = new Date();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const year = date.getFullYear();
  
    return `${year}-${month}-${day}`;
  }

  const loadData = async () => {
    const token = await Store.get('token');
    
    const config = {
      'date_end': getCurrentDate(),
      "period": "all",
      "extended_hours": false
    }
    const headers = { headers: { Authorization: `Bearer ${token}` } }
    
    const data = await axios.post('http://192.168.1.9:8080/user/setup', config, headers)
    setBaseValue(data.data.baseValue);
    setEquity(parseFloat(data.data.equity[data.data.equity.length-1].toFixed(2)));
    const filteredData = filterDataByTimeframe(data.data, timeframe);
    console.log(filteredData)
    if (filteredData[filteredData.length-1].value >= filteredData[0].value) {
      setLineChartColor('#32d142');
    } else {
      setLineChartColor('#ff3903');
    }
    const filledData = fillMissingData(filteredData, timeframe);
    setData(filledData);
  }

  useEffect(() => { 
    loadData();
  }, [timeframe]);

  const handleTimeframePress = (newTimeframe) => {
    setTimeframe(newTimeframe);
  };

  const handleAddCreatorPress = () => {
    // Empty onPress handler for the "+" button
  };

  const filterDataByTimeframe = (data, timeframe) => {
    const now = new Date().getTime() / 1000;
    let cutoff;
  
    switch (timeframe) {
      case '1D':
        cutoff = now - 24 * 60 * 60;
        break;
      case '3D':
        cutoff = now - 3 * 24 * 60 * 60;
        break;
      case '7D':
        cutoff = now - 7 * 24 * 60 * 60;
        break;
      case '1M':
        cutoff = now - 30 * 24 * 60 * 60;
        break;
      case '3M':
        cutoff = now - 3 * 30 * 24 * 60 * 60;
        break;
      case '6M':
        cutoff = now - 6 * 30 * 24 * 60 * 60;
        break;
      case 'All':
      default:
        cutoff = -Infinity;
    }
    
    const filteredTimestamps = data.timestamp.filter((timestamp) => timestamp >= cutoff);
    const filteredEquity = data.equity.filter((_, index) => data.timestamp[index] >= cutoff);
    const result = filteredTimestamps.map((timestamp, index) => {
      return {
        timestamp: timestamp,
        value: filteredEquity[index],
      };
    });
    return result;
  };

  function fillMissingData(data, timeframe) {
    const startDate = data[0].timestamp * 1000; // Convert to milliseconds
    const endDate = data[data.length - 1].timestamp * 1000;
  
    const newData = [];
  
    const oneDay = 24 * 60 * 60 * 1000; // Milliseconds in one day
  
    let currentIndex = 0;
  
    for (let currentDate = startDate; currentDate <= endDate; currentDate += oneDay) {
      if (currentIndex < data.length - 1 && currentDate >= data[currentIndex + 1].timestamp * 1000) {
        currentIndex++;
      }
  
      if (timeframe === '1M' && new Date(currentDate).getMonth() !== new Date(data[currentIndex].timestamp * 1000).getMonth()) {
        continue;
      }
  
      newData.push({
        timestamp: Math.floor(currentDate / 1000),
        value: data[currentIndex].value
      });
    }
  
    return newData;
  }

const invokeHaptic = () => {
  haptics.impactAsync(haptics.ImpactFeedbackStyle.Light);
}

const endTouch = () => {
  setEquity(parseFloat(data[data.length-1].value.toFixed(2)));
  haptics.impactAsync(haptics.ImpactFeedbackStyle.Light);
}

function formatDateLong(timestamp) {
  'worklet';
  const date = new Date(timestamp*1000);
  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  const month = months[date.getMonth()];
  const day = String(date.getDate()).padStart(2, '0');
  const year = date.getFullYear();

  return `${month}, ${day} ${year}`;
}

const onCurrentIndexChange = (index) => {
  setEquity(parseFloat(data[index].value.toFixed(2)));
}

  return (
    <SafeAreaView style={styles.wrapper}>
      <StatusBar barStyle="dark-content" />
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.valueBox}>
      <Text style={styles.totalValueTitle}>Investing</Text>
      <Text style={styles.totalValue}>${equity}</Text>
      </View>
        <View style={styles.bottomContainer}>
            <View style={styles.graphContainer}>
              {data.length === 0 ? <Text style={styles.emptyText}>No data to display</Text> : <LineChart.Provider data={data} onCurrentIndexChange={onCurrentIndexChange}>
              <LineChart width={Dimensions.get('window').width} height={150}>
                <LineChart.Path color={LineChartColor}/>
                <LineChart.CursorLine />
                <LineChart.CursorCrosshair onActivated={invokeHaptic} onEnded={endTouch}>
                <LineChart.Tooltip position="bottom">
                  <LineChart.DatetimeText format={({value}) => {'worklet'; 
                  const newdate = formatDateLong(value)
                  return newdate}}/>
                </LineChart.Tooltip>
              </LineChart.CursorCrosshair>
              </LineChart>
            </LineChart.Provider>}
              </View>
              <View style={styles.timeframeTabs}>
                {['1D', '3D', '7D', '1M', '3M', '6M', 'All'].map((tf) => (
                  <TouchableOpacity key={tf} style={[{ borderRadius: 5 }, timeframe === tf ? styles.activeTimeframe && {backgroundColor: LineChartColor}: styles.activeTimeframe && {backgroundColor: "transparent"}]} onPress={() => handleTimeframePress(tf)}>
                    <Text style={[styles.timeframeText, timeframe === tf ? { color: "#fff"} : {color: LineChartColor}]}>{tf}</Text>
                  </TouchableOpacity>
                ))}
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
      </View>
    </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  valueBox: {
    flex: 1,
    flexDirection: 'column',
    marginLeft: 16,
    alignItems: 'flex-start',
  },
  tooltip: {
    backgroundColor: 'black',
    borderRadius: 4,
    color: 'white',
    fontSize: 18,
    padding: 4,
  },
  graphContainer: {
    width: 170,
    alignItems: 'center',
    height: 170,
    marginTop: 64,
    marginBottom: 0
  },
  wrapper: {
      flex: 1,
      backgroundColor: '#fff',
      },
  container: {
    flexGrow: 1,
    justifyContent: 'space-around',
    backgroundColor: '#fff',
    paddingVertical: 20,
  },
  bottomContainer: {
    justifyContent: 'space-evenly',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  totalValueTitle: {
    marginBottom: 10,
    marginTop: 20,
    fontSize: 32,
    color: '#121212',
  },
  totalValue: {
    fontSize: 32,
    color: '#121212',
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
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: 50,
    },
    timeframeText: {
    borderRadius: 5,
    padding: 4,
    fontSize: 16,
    fontWeight: 'bold',
    },
    activeTimeframe: {
    backgroundColor: '#c76982',
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
    graph: {
      alignSelf: 'center',
      width: '100%',
      aspectRatio: 1.4,
      marginVertical: 20,
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