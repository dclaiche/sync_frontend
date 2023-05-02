import React, { useEffect, useState } from 'react';
import { LineChart } from 'react-native-wagmi-charts';
import {
  StyleSheet,
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  ActivityIndicator 
} from 'react-native';
import moment from 'moment';
import * as haptics from 'expo-haptics';
import axios from 'axios';
import Store from '../models/secureStore';




const Investing = () => {
  const [timeframe, setTimeframe] = useState('1M');
  const [buyingPower, setBuyingPower] = useState(0);
  const [equity, setEquity] = useState(0);
  const [baseValue, setBaseValue] = useState(0);
  const [data, setData] = useState([]);

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
      "timeframe": "1D",
      "extended_hours": false
    }
    const headers = { headers: { Authorization: `Bearer ${token}` } }
    
    const data = await axios.post('http://192.168.1.9:8080/user/setup', config, headers)
    setBaseValue(data.data.baseValue);
    setEquity(parseFloat(data.data.equity[data.data.equity.length-1].toFixed(2)));
    const filteredData = filterDataByTimeframe(data.data, '1M');
    setData(filteredData);
  }

  useEffect(() => { 
    loadData();
  }, []);

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
  

//   const test = {
//     "timestamp": [
//         1681257600,
//         1681344000,
//         1681430400,
//         1681516800,
//         1681776000,
//         1681862400,
//         1681948800,
//         1682035200,
//         1682121600,
//         1682380800,
//         1682467200,
//         1682553600,
//         1682640000,
//         1682726400,
//         1682964369
//     ],
//     "equity": [
//         100000,
//         100000,
//         99999.69972361941,
//         99998.62343980902,
//         99998.02175719278,
//         99944.6415883984,
//         99889.68411761933,
//         99815.78920812515,
//         99812.45420758217,
//         99811.51666084577,
//         99656.86021570799,
//         99696.82959104248,
//         100511.35,
//         100511.35,
//         100511.35
//     ],
//     "profit_loss": [
//         0,
//         0,
//         -0.280470457387891,
//         -1.07628381039,
//         -0.60168261624,
//         -53.38016790783,
//         -54.95747077908,
//         -73.89490949417,
//         -3.33500054298,
//         -0.93754673641,
//         -154.65644513777,
//         39.96937533449,
//         814.7156050506295,
//         0,
//         0
//     ],
//     "profit_loss_pct": [
//         0,
//         0,
//         -0.0000028047045739,
//         -0.000013567544809528097,
//         -0.000019584372163645778,
//         -0.0005533861569665882,
//         -0.0011029609736109287,
//         -0.0018419102149153095,
//         -0.0018752602269507283,
//         -0.001884635696171862,
//         -0.003431200453875608,
//         -0.0030315066213639228,
//         0.0051156510428389985,
//         0.0051156510428389985,
//         0
//     ],
//     "base_value": 100000,
//     "timeframe": "1D"
// }



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
    <View style={styles.wrapper}>
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.totalValue}>Total Portfolio Value: ${equity}</Text>
      <Text style={styles.buyingPower}>Buying Power: ${buyingPower}</Text>
      <Text style={styles.dayTraderStatus}>Day Trader Status: False</Text>
      <View style={styles.separator} />
            <View style={styles.graphContainer}>
              {data.length === 0 ? <Text style={styles.emptyText}>No data to display</Text> : <LineChart.Provider data={data} onCurrentIndexChange={onCurrentIndexChange}>
              <LineChart width={Dimensions.get('window').width} height={150}>
                <LineChart.Path />
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
                  <TouchableOpacity key={tf} onPress={() => handleTimeframePress(tf)}>
                    <Text style={[styles.timeframeText, timeframe === tf ? styles.activeTimeframe : null]}>{tf}</Text>
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
    </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
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
    marginBottom: 24
  },
  wrapper: {
      flex: 1,
      backgroundColor: '#fff',
      },
  container: {
    flexGrow: 1,
    justifyContent: 'space-evenly',
    alignItems: 'center',
    backgroundColor: '#fff',
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