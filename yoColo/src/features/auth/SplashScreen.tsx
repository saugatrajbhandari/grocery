import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import {Colors} from '@/assets/utils/Constants';

const SplashScreen = () => {
  return (
    <View style={style.container}>
      <Text>
        SplashScreenSplashScreenSplashScreenSplashScreenSplashScreenSplashScreenSplashScreenSplashScreenSplashScreenSplashScreenSplashScreenSplashScreenSplashScreenSplashScreenSplashScreenSplashScreenSplashScreenSplashScreenSplashScreenSplashScreenSplashScreenSplashScreenSplashScreenSplashScreen
      </Text>
    </View>
  );
};

export default SplashScreen;

const style = StyleSheet.create({
  container: {
    backgroundColor: Colors.primary,
    flex: 1,
  },
});
