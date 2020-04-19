import { Ionicons } from '@expo/vector-icons';
import * as WebBrowser from 'expo-web-browser';
import * as React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { RectButton, ScrollView } from 'react-native-gesture-handler';

export default function AddReminderScreen() {
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>

    </ScrollView>
  );
}

AddReminderScreen.navigationOptions = {
    title: "New Reminder",
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fafafa',
  },
  contentContainer: {
    paddingTop: 15,
  },
});