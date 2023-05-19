import React, { useEffect, useState, useCallback, useRef  } from 'react';
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
import * as haptics from 'expo-haptics';
import axios from 'axios';
import Store from '../models/secureStore';
import AntDesign from '@expo/vector-icons/AntDesign';
import Graph from '../components/graph';


const Investing = () => {
  const [period, setPeriod] = useState('1W');
  const [equity, setEquity] = useState(0);
  const [data, setData] = useState([]);
  const [LineChartColor, setLineChartColor] = useState('#32d142');
  const [profitLossData , setProfitLossData] = useState(0);
  const [profitLossPercentData, setProfitLossPercentData] = useState(0);
  const [profitLoss, setProfitLoss] = useState(0);
  const [profitLossPercent, setProfitLossPercent] = useState(0);
  const dataRef = useRef(data);
  const profitLossDataRef = useRef(profitLossData);
  const profitLossPercentDataRef = useRef(profitLossPercentData);
  const [prompt, setPrompt] = useState('Past Week');
  const [baseValue, setBaseValue] = useState(0);
  const [isTouching, setIsTouching] = useState(false);
  const isTouchingRef = useRef(isTouching);


  const loadData = async () => {
    const filteredData = await filterDataByPeriod();
    setEquity(parseFloat(filteredData[filteredData.length-1].value.toFixed(2)));
    if (filteredData[filteredData.length-1].value >= filteredData[0].value) {
      setLineChartColor('#32d142');
    } else {
      setLineChartColor('#ff3903');
    }
    setData(filteredData);
  }

  useEffect(() => { 
    loadData();
  }, [period]);

  useEffect(() => {
    dataRef.current = data;
  }, [data]); 

  useEffect(() => {
    profitLossDataRef.current = profitLossData;
  }, [profitLossData]);

  useEffect(() => {
    profitLossPercentDataRef.current = profitLossPercentData;
  }, [profitLossPercentData]);


  const handleTimeframePress = (newTimeframe) => {
    setPeriod(newTimeframe);
  };

  const filterDataByPeriod = async () => {
    // Figure out the cutoff date base on what period is selected
    const now = new Date().getTime() / 1000;
    let timeframe;
    switch (period) {
      case '1D':
        setPrompt('Today');
        timeframe = '5Min';
        break;
      case '1W':
        setPrompt('Past Week');
        timeframe = '15Min';
        break;
      case '1M':
        setPrompt('Past Month');
        timeframe = '1D';
        break;
      case '3M':
        setPrompt('Past 3 Months');
        timeframe = '1D';
        break;
      case '1Y':
        setPrompt('Past Year');
        timeframe = '1D';
        break;
      case 'All':
        setPrompt('All Time');
        timeframe = '1D';
      default:
    }
    // calculate end date
    const nowFormatted = new Date(now*1000).toISOString().slice(0, 10);
    // setup config for the request
    const token = await Store.get('token');
    const config = {
      "period": period === '1Y' ? '1A' : period,
      "timeframe": timeframe,
      "extended_hours": false
    }
    const headers = { headers: { Authorization: `Bearer ${token}` } }
    // make request
    const response = await axios.post('http://192.168.1.9:8080/user/setup', config, headers)
    // format data
    setProfitLossData(response.data.profit_loss);
    setProfitLossPercentData(response.data.profit_loss_pct);
    setBaseValue(response.data.base_value);
    setProfitLoss(parseFloat(response.data.equity[response.data.equity.length-1] - response.data.base_value).toFixed(2));
    const result = response.data.timestamp.map((timestamp, index) => {
      return {
        timestamp: timestamp,
        value: response.data.equity[index],
      };
    }).filter(item => item.value !== null);
    return result;
  };

const invokeHaptic = () => {
  setIsTouching(true);
  haptics.impactAsync(haptics.ImpactFeedbackStyle.Light);
}


const endTouch = () => {
  setIsTouching(false);
  setEquity(parseFloat(data[data.length-1].value.toFixed(2)));
  setProfitLoss(parseFloat(data[data.length-1].value - baseValue).toFixed(2));
  setProfitLossPercent(0)
  switch (period) {
    case '1D':
      setPrompt('Today');
      break;
    case '1W':
      setPrompt('Past Week');
      break;
    case '1M':
      setPrompt('Past Month');
      break;
    case '3M':
      setPrompt('Past 3 Months');
      break;
    case '1Y':
      setPrompt('Past Year');
      break;
    case 'All':
      setPrompt('All Time');
    default:
  haptics.impactAsync(haptics.ImpactFeedbackStyle.Light);
}
}

function formatDateLong(timestamp, period) {
  'worklet'
  let displayTime;
  let date;
  let months;
  let month;
  let day;
  let year;
  let hours;
  let minutes;
  let ampm;
  let formattedHours;
  let formattedMinutes;
  switch (period) {
    case '1D':
      date = new Date(timestamp*1000);
      hours = date.getHours();
      minutes = date.getMinutes();
      ampm = hours >= 12 ? 'PM' : 'AM';
      formattedHours = hours % 12 || 12;
      formattedMinutes = minutes < 10 ? '0' + minutes : minutes;
      displayTime = `${formattedHours}:${formattedMinutes} ${ampm}`;
      break;
    case '1W':
      date = new Date(timestamp*1000);
      months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
      hours = date.getHours();
      minutes = date.getMinutes();
      ampm = hours >= 12 ? 'PM' : 'AM';
      formattedHours = hours % 12 || 12;
      formattedMinutes = minutes < 10 ? '0' + minutes : minutes;
      displayTime = `${formattedHours}:${formattedMinutes} ${ampm}, ${months[date.getMonth()]} ${date.getDate()}`;;
      break;
    case '1M':
      date = new Date(timestamp*1000);
      months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
      month = months[date.getMonth()];
      day = String(date.getDate()).padStart(2, '0');
      year = date.getFullYear();
      displayTime = `${month}, ${day} ${year}`;
      break;
    case '3M':
      date = new Date(timestamp*1000);
      months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
      month = months[date.getMonth()];
      day = String(date.getDate()).padStart(2, '0');
      year = date.getFullYear();
      displayTime = `${month}, ${day} ${year}`;
      break;
    case '1Y':
      date = new Date(timestamp*1000);
      months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
      month = months[date.getMonth()];
      day = String(date.getDate()).padStart(2, '0');
      year = date.getFullYear();
      displayTime = `${month}, ${day} ${year}`;
      break;
    case 'All':
      date = new Date(timestamp*1000);
      months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
      month = months[date.getMonth()];
      day = String(date.getDate()).padStart(2, '0');
      year = date.getFullYear();
      displayTime = `${month}, ${day} ${year}`;
    default:
      
  }
  return displayTime;
}

const onCurrentIndexChange = useCallback(
  (index) => {
    setEquity(parseFloat(dataRef.current[index].value.toFixed(2)));
    setProfitLoss(parseFloat(profitLossDataRef.current[index].toFixed(2)));
    setProfitLossPercent(parseFloat((profitLossPercentDataRef.current[index]*100).toFixed(2)));
  },
  []
);

  return (
    <SafeAreaView style={styles.wrapper}>
      <StatusBar barStyle="dark-content" />
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.valueBox}>
      <Text style={styles.totalValueTitle}>Portfolio</Text>
      <Text style={styles.totalValue}>${equity}</Text>
      {profitLossPercent !== 0 ? <View style={styles.prompt}><AntDesign name={[profitLossPercent < 0 ? 'caretdown' : 'caretup']} style={[profitLossPercent < 0 ? {color: '#ff3903'} : {color: '#32d142'}]}/><Text style={[profitLossPercent < 0 ? {color: '#ff3903'} : {color: '#32d142'}]}>  ${Math.abs(profitLoss)} {Math.abs(profitLossPercent)}%</Text></View> : <View style={styles.prompt}><AntDesign name={[profitLossPercent < 0 ? 'caretdown' : 'caretup']} style={[profitLossPercent < 0 ? {color: '#ff3903'} : {color: '#32d142'}]}/><Text style={[profitLossPercent < 0 ? {color: '#ff3903'} : {color: '#32d142'}]}> ${Math.abs(profitLoss)}</Text>{ isTouching ? null : <Text> {prompt}</Text>}</View>}
      </View>
        <View style={styles.bottomContainer}>
        <Graph data={data} LineChartColor={LineChartColor} onCurrentIndexChange={onCurrentIndexChange} invokeHaptic={invokeHaptic} endTouch={endTouch} period={period} formatDateLong={formatDateLong} handleTimeframePress={handleTimeframePress}/>
      <View style={styles.separator} />
      <View style={styles.creatorList}>
        {Array(3).fill().map((_, i) => (
          <View key={i} style={styles.creatorCard}>
            <View style={styles.profile}>
              
              <View style={styles.profilePicture} />
              <Text style={styles.username}>Username {i + 1}</Text>
            </View>
            <Text style={styles.gainLoss}>Gain/Loss: $0</Text>
            <Text style={styles.ordersToday}>Orders Today: 0</Text>
          </View>
        ))}
        <View style={styles.creatorCard}>
        <TouchableOpacity onPress={() => {}} style={styles.addButton}>
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
  prompt: {
    flexDirection: 'row',
    alignItems: 'center',
  },
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
    backgroundColor: 'lightgray',
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
    periodTabs: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: 50,
    },
    periodText: {
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