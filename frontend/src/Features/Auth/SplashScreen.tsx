import {View, StyleSheet, Image} from 'react-native';
import React from 'react';
import {Colors} from '../../Utils/Constants';
import {ScreenHeight, ScreenWidth} from '../../Utils/Scaling';
import logo from '../../assets/images/logo.png';

const SplashScreen = () => {
  return (
    <View style={styles.container}>
      <Image style={styles.logoImage} source={logo} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.primary,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  logoImage: {
    width: ScreenWidth * 0.7,
    height: ScreenHeight * 0.7,
    resizeMode: 'contain',
  },
});

export default SplashScreen;
