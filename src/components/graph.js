import React from 'react';
import { LineChart } from 'react-native-wagmi-charts';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Dimensions
} from 'react-native';

const Graph = ({ data, onCurrentIndexChange, invokeHaptic, endTouch, period, formatDateLong, handleTimeframePress, LineChartColor }) => {

return(   <View>
            <View >
              {data.length === 0 ? <Text style={styles.emptyText}>No data to display</Text> :
               <LineChart.Provider data={data} onCurrentIndexChange={onCurrentIndexChange}>
              <LineChart width={Dimensions.get('window').width} height={150}>
                <LineChart.Path color={LineChartColor}></LineChart.Path>
                <LineChart.CursorLine/>
                <LineChart.CursorCrosshair color={LineChartColor} onActivated={invokeHaptic} onEnded={endTouch} minDurationMs={100}>
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
    </View>
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

export default Graph;