import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import SplashScreen from '../Features/Auth/SplashScreen';
import {navigationRef} from '../Utils/NavigationUtils';
import CustomerLogin from './CustomerLogin';
import DeliveryLogin from './DeliveryLogin';
import {SafeAreaView, StatusBar} from 'react-native';

const Stack = createNativeStackNavigator();

const Navigation = () => {
  return (
    <SafeAreaView style={{flex: 1}}>
      <StatusBar
        barStyle="dark-content" // Icons/text color: light-content or dark-content
        backgroundColor="#FFFFFF" // Status bar background color
        translucent={false} // Ensures the status bar is not translucent
      />
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
    </SafeAreaView>
  );
};

export default Navigation;
