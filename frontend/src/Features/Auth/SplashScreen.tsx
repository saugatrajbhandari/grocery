import {View, StyleSheet, Image, Alert} from 'react-native';
import React, {useEffect} from 'react';
import {Colors} from '../../Utils/Constants';
import {ScreenHeight, ScreenWidth} from '../../Utils/Scaling';
import logo from '../../assets/images/splash_logo.jpeg';
import GeoLocation from '@react-native-community/geolocation';
// import useAuthStore from '../../Store/AuthStore';
import {tokenStorage} from '../../Store/Storage';
import {resetAndNavigate} from '../../Utils/NavigationUtils';

GeoLocation.setRNConfiguration({
  skipPermissionRequests: false,
  authorizationLevel: 'always',
  enableBackgroundLocationUpdates: true,
  locationProvider: 'auto',
});

const SplashScreen = () => {
  // const {user, setUser} = useAuthStore();

  const tokenCheck = async () => {
    const accessToken = tokenStorage.getString('accessToken');

    if (accessToken) {
    } else {
      resetAndNavigate('CustomerLogin');
      return false;
    }
  };

  useEffect(() => {
    const fetchUserLocation = async () => {
      try {
        GeoLocation.requestAuthorization();
        tokenCheck();
      } catch (error) {
        Alert.alert(
          'We need to show location service to give you better shopping experience',
        );
      }
    };

    const timeoutId = setTimeout(fetchUserLocation, 1000);

    return () => clearTimeout(timeoutId);
  }, []);

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
