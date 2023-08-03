import React, { useState, useRef } from 'react';
import { TextInput, View, StyleSheet, TouchableOpacity, Modal, Text, KeyboardAvoidingView, Platform, ScrollView} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Store from '../models/secureStore';
import axios from 'axios';
import DatabaseManager from '../models/databaseManager';
import HistoryDTO from '../models/historyDTO';



const AlpacaSignup = ({navigation, modalVisible, setModalVisible}) => {

    const [key, setKey] = useState('');
    const [secret, setSecret] = useState('');
    const [secure, setSecure] = useState(true);
    const [secure2, setSecure2] = useState(true);

    const passwordInputRef = useRef(null);

    function getCurrentDate() {
        const date = new Date();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        const year = date.getFullYear();
        return `${year}-${month}-${day}`;
      }
    
      const loadDataAlpaca = async () => {
        const token = await Store.get('token');
        const config = {
          'date_end': getCurrentDate(),
          "period": "all",
          "timeframe": "1D",
          "extended_hours": false
        }
        const headers = { headers: { Authorization: `Bearer ${token}` } }
        
        const history = await axios.post('http://192.168.1.13:8080/user/setup', config, headers)
        const historyDTOs = HistoryDTO.fromData(history.data);
        const databaseManager = DatabaseManager.getInstance();
        //databaseManager.insertHistory(historyDTOs, );
        // setBaseValue(history.data.baseValue);
        // setEquity(parseFloat(history.data.equity[data.data.equity.length-1].toFixed(2)));
        // const filteredData = filterDataByTimeframe(data.data, '1M');
        // setData(filteredData);
      }

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

    const firstTimeSetup = async () => {
        loadDataAlpaca();
    };

    const handleSubmission = async () => {
       
        // TODO fix navigation
        const token = await Store.get('token');
        try{
            const response = await axios.post('http://192.168.1.13:8080/user/alpaca_signup', {"key": key, "secret": secret}, {headers: {Authorization: `Bearer ${token}`}})
            Store.save('token', response.data);
            //await firstTimeSetup();
            setModalVisible(false);
            navigation.navigate('AppTabs');
        }
        catch(error){
            setKey('');
            setSecret('');
        }
    };

    const toggleSecure = () => {
        setSecure(!secure);
    };

    const toggleSecure2 = () => {
        setSecure2(!secure2);
    };



    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
            Alert.alert('Modal has been closed.');
            }}>
                <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={styles.centeredView}
                >
                    <View style={styles.modalView}>
                        <ScrollView contentContainerStyle={styles.contentContainer}>
                            <View style={styles.titleContainer}>
                                <Text style={styles.modalText}>Alpaca Key and Secret</Text>
                            </View>
                            <View style={styles.inputContainer}>
                                <TextInput
                                style={styles.input}
                                placeholder="Key"
                                placeholderTextColor="grey"
                                autoCapitalize="none"
                                returnKeyType="next"
                                onChangeText={setKey}
                                value={key}
                                secureTextEntry={secure}
                                onSubmitEditing={() => passwordInputRef.current.focus()}
                                />
                                <Icon style={styles.searchIcon} name={secure ? "eye-off" : "eye"} size={30} color="gray" onPress={toggleSecure}/>
                            </View>
                            <View style={styles.inputContainer}>
                                <TextInput
                                style={styles.input}
                                ref={passwordInputRef}
                                placeholder="Secret"
                                placeholderTextColor="grey"
                                autoCapitalize="none"
                                returnKeyType="done"
                                onChangeText={setSecret}
                                value={secret}
                                secureTextEntry={secure2}
                                />
                                <Icon style={styles.searchIcon} name={secure2 ? "eye-off" : "eye"} size={30} color="gray" onPress={toggleSecure2}/>
                            </View>
                            <TouchableOpacity style={styles.submitButtonContainer} onPress={handleSubmission}>
                                <Text
                                    style={styles.submitButton}
                                >Submit</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.dismissButtonContainer}>
                            <Text
                                style={styles.dismissButton}
                                onPress={() => {
                                setModalVisible(!modalVisible);
                                }}
                            >Dismiss</Text>
                            </TouchableOpacity>
                        </ScrollView>
                    </View>
                </KeyboardAvoidingView>
        </Modal>

    )

};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    contentContainer: {
        width: '100%',
        height: '100%',
        justifyContent: 'center',
      },
      titleContainer: {
        alignItems: 'center',
        marginBottom: 20
      },
    scroll: {
        justifyContent: 'flex-end'
    },
    centeredView: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
        },
    inputContainer: {
        width: '100%',
        height: 70,
        justifyContent: 'center',
        flexDirection: 'row',
        alignItems: 'center',
        },
    inputText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'black',
        },
    searchIcon: {
        marginLeft: 10
        },
    input: {
        width: '80%',
        height: '70%',
        borderColor: 'gray',
        borderWidth: 1,
        paddingHorizontal: 10,
        marginBottom: 0,
        },
    centeredView: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
        },
    submitButton: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'white',
        },
    submitButtonContainer: {
        marginBottom: 15,
        marginTop: 20,
        alignSelf: 'center',
        backgroundColor: '#e8c003',
        paddingVertical: 15,
        paddingHorizontal: 40,
        borderRadius: 10,
    },
    dismissButton: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#e8c003',
        },
    dismissButtonContainer: {
        marginBottom: 20,
        alignSelf: 'center',
        borderWidth: 1,
        borderColor: '#e8c003',
        backgroundColor: 'white',
        paddingVertical: 15,
        paddingHorizontal: 40,
        borderRadius: 10,
    },
    modalView: {
        backgroundColor: 'white',
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'flex-start',
        width: '100%',
        height: '75%',
        shadowColor: '#000',
        shadowOffset: {
        width: 0,
        height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        },
    modalText: {
        fontSize: 24,
        fontWeight: "bold"
        }
});

export default AlpacaSignup;