// SlideScreen.js
import React, { useState } from 'react';
import { Text, View, StyleSheet, TouchableOpacity} from 'react-native';
import AlpacaSignup from '../modals/alpacaSignup';


const SlideScreen3 = ({ navigation }) => {
    const [modalVisible, setModalVisible] = useState(false);

    const toggleModal = () => {
        setModalVisible(true);
    };

  return (
    <View style={styles.container}>
        <Text style={styles.textMessage}>Lastly, click the "Enter Keys" button below and hit "Submit"</Text>
        <TouchableOpacity style={styles.buttonContainer}>
            <Text  style={styles.buttonTitle} onPress={toggleModal}>Enter Keys</Text>
        </TouchableOpacity>
        <AlpacaSignup navigation={navigation} modalVisible={modalVisible} setModalVisible={setModalVisible} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  textMessage: {
    lineHeight : 40,
    fontSize: 24,
    margin: 20
  },
  textLink: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#e8c003'
  },
  textBold: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  textOther: {
    fontSize: 24
  },
  buttonContainer: {
    position: 'relative',
    alignSelf: 'center',
    backgroundColor: '#e8c003',
    marginTop: 20,
    paddingVertical: 20,
    paddingHorizontal: 40,
    borderRadius: 10,
  },
  buttonTitle: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  }
  
});

export default SlideScreen3;
