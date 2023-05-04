// SlideScreen.js
import { Text, View, StyleSheet, TouchableOpacity, Linking} from 'react-native';

const SlideScreen = () => {
  const handleOpenLink = async () => {
    const supported = await Linking.canOpenURL('https://app.alpaca.markets/signup');

    if (supported) {
      await Linking.openURL('https://app.alpaca.markets/signup');
      
    } else {
      Alert.alert("Can't open the URL");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.textBold}>Sign Up!</Text>
      <Text style={styles.textMessage}>First go to the Alpaca website and create an account.</Text>
      <TouchableOpacity onPress={handleOpenLink}>
        <Text style={styles.textLink}>Alpace Signup</Text>
      </TouchableOpacity>
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
    fontSize: 24,
    marginRight: 20,
    marginBottom: 20,
    marginLeft: 20,
  },
  textLink: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#e8c003',
  },
  textBold: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  
});

export default SlideScreen;

