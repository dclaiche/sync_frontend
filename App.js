import 'react-native-gesture-handler';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import AppNavigator from './src/navigation/AppNavigator';
import DatabaseManager from './src/models/databaseManager';
import React, { useEffect } from 'react';
import * as FileSystem from 'expo-file-system';

export default function App() {
  async function deleteDatabase(dbName) {
    try {
      const appDir = FileSystem.documentDirectory;
      const dbPath = appDir + 'SQLite/' + dbName;
      await FileSystem.deleteAsync(dbPath);
      console.log('Database deleted successfully');
    } catch (error) {
      console.error('Error deleting database:', error);
    }
  }

  useEffect(() => {
    deleteDatabase('SyncDBLocal.db');
    const databaseManager = DatabaseManager.getInstance();
    
  }, []);

  return (
    <NavigationContainer>
      <AppNavigator />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

//TODO: Start SQLITE DB and store data from loaddata call into DB 
// Fix CSS on Investment Screen
// TODO PUSH NOTIFICATIONS