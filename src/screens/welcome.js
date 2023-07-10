import React from 'react';
import { View, Text, TouchableHighlight, StyleSheet, Dimensions, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const { width, height } = Dimensions.get('window');

const Welcome = ({ navigation }) => {

const handleSignUpPress = () => {
    navigation.navigate('Signup');
};

const handleSignInPress = () => {
  navigation.navigate('Signin');
};
  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Image
          style={styles.logo}
          source={require('../../assets/logo.png')}
        />
      </View>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Sync</Text>
      </View>
      <LinearGradient
        colors={['white', '#8a2be2']}
        style={styles.gradient}
        start={{ x: 0.5, y: 0 }}
        end={{ x: 0.5, y: 1 }}
      >
       <View style={styles.buttonContainer}>
            <TouchableHighlight
                underlayColor="#8a2be230"
                activeOpacity={0.5}
                style={styles.signUpButton}
                onPress={handleSignUpPress}
            >
                <View>
                <Text style={styles.signUpButtonText}>SIGN UP FOR FREE</Text>
                </View>
            </TouchableHighlight>
            <TouchableHighlight
                underlayColor="#8a2be230"
                style={styles.loginButton}
                onPress={handleSignInPress}
            >
                <View>
                <Text style={styles.loginButtonText}>LOG IN</Text>
                </View>
            </TouchableHighlight>
        </View>
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  logoContainer: {
    alignItems: 'center',
    marginTop: height * 0.1,
  },
  logo: {
    width: 50,
    height: 50,
    resizeMode: 'contain',
  },
  titleContainer: {
    alignItems: 'center',
    marginTop: height * 0.05,
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#8a2be2',
  },
  gradient: {
    flex: 1,
  },
  buttonContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginBottom: height * 0.1,
  },
  signUpButton: {
    width: width * 0.8,
    padding: 18,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 4,
    marginBottom: 30,
  },
  signUpButtonText: {
    fontSize: 18,
    textAlign: 'center',
    fontWeight: 'bold',
    color: '#8a2be2',
  },
  loginButton: {
    width: width * 0.8,
    padding: 18,
    backgroundColor: 'transparent',
  },
  loginButtonText: {
    fontSize: 18,
    textAlign: 'center',
    fontWeight: 'bold',
    color: 'white',
  },
});

export default Welcome;







// import React from 'react';
// import { View, Text, TouchableOpacity, StyleSheet, Dimensions, Image } from 'react-native';
// import { LinearGradient } from 'expo-linear-gradient';

// const { width, height } = Dimensions.get('window');

// const Welcome = () => {
//   return (
//     <View style={styles.container}>
//       <LinearGradient
//         colors={['white', 'white', '#8a2be2']}
//         style={styles.gradient}
//         start={{ x: 0, y: 0 }}
//         end={{ x: 1, y: 1 }}
//       >
//         <View style={styles.logoContainer}>
//         <Image
//           style={styles.logo}
//           source={require('../../assets/logo.png')}
//         />
//         </View>
//         <View style={styles.titleContainer}>
//           <Text style={styles.title}>Sync</Text>
//         </View>
//       </LinearGradient>
//       <View style={styles.buttonContainer}>
//         <TouchableOpacity style={styles.signUpButton}>
//           <Text style={styles.signUpButtonText}>SIGN UP FOR FREE</Text>
//         </TouchableOpacity>
//         <TouchableOpacity style={styles.loginButton}>
//           <Text style={styles.loginButtonText}>LOG IN</Text>
//         </TouchableOpacity>
//       </View>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#8a2be2',
//   },
//   gradient: {
//     flex: 1,
//     justifyContent: 'center',
//   },
//   logoContainer: {
//     alignItems: 'center',
//     marginTop: height * 0.1,
//   },
//   logo: {
//     width: 50,
//     height: 50,
//     resizeMode: 'contain',
//   },
//   titleContainer: {
//     alignItems: 'center',
//     marginTop: height * 0.05,
//   },
//   title: {
//     fontSize: 36,
//     fontWeight: 'bold',
//     color: '#8a2be2',
//   },
//   buttonContainer: {
//     flex: 1,
//     justifyContent: 'flex-end',
//     alignItems: 'center',
//     marginBottom: height * 0.1,
//   },
//   signUpButton: {
//     width: width * 0.8,
//     padding: 12,
//     backgroundColor: 'white',
//     borderRadius: 4,
//     marginBottom: 12,
//   },
//   signUpButtonText: {
//     fontSize: 18,
//     textAlign: 'center',
//     fontWeight: 'bold',
//     color: '#8a2be2',
//   },
//   loginButton: {
//     width: width * 0.8,
//   },
//   loginButtonText: {
//     fontSize: 18,
//     textAlign: 'center',
//     fontWeight: 'bold',
//     color: 'white',
//   },
// });

// export default Welcome;
