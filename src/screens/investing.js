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
import { LongPressGestureHandler, State } from 'react-native-gesture-handler';


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
  const [timeoutRef, setTimeoutRef] = useState(null);


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
        timeframe = '5Min';
        break;
      case '1W':
        timeframe = '15Min';
        break;
      case '1M':
        timeframe = '1D';
        break;
      case '3M':
        timeframe = '1D';
        break;
      case '1Y':
        timeframe = '1D';
        break;
      case 'All':
        timeframe = '1D';
      default:
    }
    // calculate end date
    const nowFormatted = new Date(now*1000).toISOString().slice(0, 10);
    // setup config for the request
    const token = await Store.get('token');
    const config = {
      'date_end': nowFormatted,
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
    const result = response.data.timestamp.map((timestamp, index) => {
      return {
        timestamp: timestamp,
        value: response.data.equity[index],
      };
    }).filter(item => item.value !== null);
    return result;
  };

const invokeHaptic = () => {
  haptics.impactAsync(haptics.ImpactFeedbackStyle.Light);
}


const endTouch = () => {
  setEquity(parseFloat(data[data.length-1].value.toFixed(2)));
  setProfitLoss(0)
  setProfitLossPercent(0)
  haptics.impactAsync(haptics.ImpactFeedbackStyle.Light);
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

const onLongPressHandlerStateChange = ({ nativeEvent }) => {
  if (nativeEvent.state === State.ACTIVE) {
    invokeHaptic();
  } else if (nativeEvent.state === State.END) {
    endTouch();
  }
};

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
      {profitLossPercent !== 0 ? <Text style={[profitLossPercent < 0 ? {color: '#ff3903'} : {color: '#32d142'}]}>${Math.abs(profitLoss)} {Math.abs(profitLossPercent)}%</Text> : null}
      </View>
        <View style={styles.bottomContainer}>
            <View style={styles.graphContainer}>
              {data.length === 0 ? <Text style={styles.emptyText}>No data to display</Text> :
               <LineChart.Provider data={data} onCurrentIndexChange={onCurrentIndexChange}>
              <LineChart width={Dimensions.get('window').width} height={150}>
                <LineChart.Path color={LineChartColor}></LineChart.Path>
                <LineChart.CursorLine/>
                <LineChart.CursorCrosshair color={LineChartColor} onActivated={invokeHaptic} onEnded={endTouch} minDurationMs={200}>
                <LineChart.Tooltip cursorGutter={100} position="top">
                  <LineChart.DatetimeText format={({value}) => {
                    'worklet'
                    const dateval = formatDateLong(value, period)
                    return dateval}}/>
                </LineChart.Tooltip>
              </LineChart.CursorCrosshair>
              </LineChart>
            </LineChart.Provider>
            }
            
              </View>
              <View style={styles.periodTabs}>
                {['1D', '1W', '1M', '3M', '1Y', 'All'].map((tf) => (
                  <TouchableOpacity key={tf} style={[{ borderRadius: 5 }, period === tf ? styles.activeTimeframe && {backgroundColor: LineChartColor}: styles.activeTimeframe && {backgroundColor: "transparent"}]} onPress={() => handleTimeframePress(tf)}>
                    <Text style={[styles.periodText, period === tf ? { color: "#fff"} : {color: LineChartColor}]}>{tf}</Text>
                  </TouchableOpacity>
                ))}
              </View>
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
  diffText: {

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