import React, { useState } from 'react';
import {
  StyleSheet,
  ScrollView,
  View,
  Text,
  TouchableOpacity,
} from 'react-native';

const Profile = () => {
  const [creatorStatus, setCreatorStatus] = useState(false);

  const handleEditProfilePress = () => {
    // Empty onPress handler for the "Edit Profile" link
  };

  const handleBecomeCreatorPress = () => {
    // Empty onPress handler for the "Become one today!" link
  };

  return (
    <View style={styles.wrapper}>
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.userInfo}>
        <Text style={styles.username}>Username</Text>
        <TouchableOpacity onPress={handleEditProfilePress}>
          <Text style={styles.editProfileLink}>Edit Profile</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.separator} />
      <View style={styles.investingSection}>
        <Text style={styles.sectionTitle}>Investing</Text>
        <Text style={styles.investingText}>Total Investing Value: $1000</Text>
        <Text style={styles.investingText}>Brokerage Holdings: $800</Text>
        <Text style={styles.investingText}>Cash: $200</Text>
      </View>
      <View style={styles.separator} />
      <View style={styles.creatorStatus}>
        <Text style={styles.creatorStatusText}>Creator Status: {creatorStatus ? 'True' : 'False'}</Text>
        {!creatorStatus && (
          <TouchableOpacity onPress={handleBecomeCreatorPress}>
            <Text style={styles.becomeCreatorLink}>Become one today!</Text>
          </TouchableOpacity>
        )}
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
    justifyContent: 'space-evenly',
    alignItems: 'center',
    backgroundColor: '#2f1412',
    paddingVertical: 50,
  },
  userInfo: {
    alignItems: 'center',
  },
  username: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#e7a0ae',
  },
  editProfileLink: {
    fontSize: 14,
    color: '#c76982',
  },
  investingSection: {
    alignItems: 'center',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#e7a0ae',
  },
  investingText: {
    fontSize: 16,
    color: '#c76982',
  },
  creatorStatus: {
    alignItems: 'center',
  },
  creatorStatusText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#e7a0ae',
  },
  becomeCreatorLink: {
    fontSize: 14,
    color: '#c76982',
  },
  separator: {
    height: 1,
    width: '100%',
    backgroundColor: '#c76982',
    marginVertical: 20,
  },
});

export default Profile;