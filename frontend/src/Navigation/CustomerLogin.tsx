import {Animated, Image, StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import {
  GestureHandlerRootView,
  PanGestureHandler,
  State,
} from 'react-native-gesture-handler';

import ProductSlider from '../Components/Login/ProductSlider';
import {resetAndNavigate} from '../Utils/NavigationUtils';

const CustomerScreen = () => {
  const [gestureSequence, setGestureSequence] = useState<string[]>([]);

  console.log(gestureSequence);

  const handleGesture = ({nativeEvent}: any) => {
    if (nativeEvent.state === State.END) {
      const {translationX, translationY} = nativeEvent;

      console.log(translationX, translationY);

      let direction = '';
      if (Math.abs(translationX) > Math.abs(translationY)) {
        direction = translationX > 0 ? 'right' : 'left';
      } else {
        direction = translationY > 0 ? 'down' : 'up';
      }

      const newSequence = [...gestureSequence, direction].slice(-5);

      setGestureSequence(newSequence);
      if (newSequence.join(' ') === 'up up down left right') {
        setGestureSequence([]);
        resetAndNavigate('DeliveryLogin');
      }
    }
  };

  return (
    <GestureHandlerRootView style={styles.container}>
      <View style={styles.container}>
        <ProductSlider />

        <PanGestureHandler onHandlerStateChange={handleGesture}>
          <Animated.ScrollView
            bounces={false}
            keyboardDismissMode={'on-drag'}
            keyboardShouldPersistTaps="handled"
            contentContainerStyle={styles.subContainer}>
            <View style={styles.content}>
              <Image
                source={require('../assets/images/logo.png')}
                style={styles.logo}
              />
            </View>
          </Animated.ScrollView>
        </PanGestureHandler>
      </View>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },

  subContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginBottom: 20,
  },

  logo: {
    height: 50,
    width: 50,
    borderRadius: 20,
    marginVertical: 10,
  },

  content: {
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
});

export default CustomerScreen;
