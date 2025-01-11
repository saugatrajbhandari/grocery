import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import SplashScreen from '../Features/Auth/SplashScreen';
import {navigationRef} from '../Utils/NavigationUtils';
import CustomerLogin from './CustomerLogin';
import DeliveryLogin from './DeliveryLogin';

const Stack = createNativeStackNavigator();

const Navigation = () => {
  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator
        screenOptions={{headerShown: false}}
        initialRouteName="SplashScreen">
        <Stack.Screen name="SplashScreen" component={SplashScreen} />
        <Stack.Screen
          options={{
            animation: 'fade',
          }}
          name="CustomerLogin"
          component={CustomerLogin}
        />
        <Stack.Screen
          options={{animation: 'fade'}}
          name="DeliveryLogin"
          component={DeliveryLogin}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
