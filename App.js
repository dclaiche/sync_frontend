import 'react-native-gesture-handler';
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
    //deleteDatabase('SyncDBLocal.db');
    const databaseManager = DatabaseManager.getInstance();
    
  }, []);

  return (
    <NavigationContainer>
      <AppNavigator />
    </NavigationContainer>
  );
}

//TODO: Start SQLITE DB and store data from loaddata call into DB DONE
// Fix CSS on Investment Screen and refactor code
// TODO PUSH NOTIFICATIONS
//START ON LISTING CREATORS