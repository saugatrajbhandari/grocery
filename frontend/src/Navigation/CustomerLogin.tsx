import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {GestureHandlerRootView} from 'react-native-gesture-handler';

const CustomerScreen = () => {
  return (
    <GestureHandlerRootView style={styles.container}>
      <View style={styles.container}>
        <Text>dfassdfa</Text>
      </View>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default CustomerScreen;
