import {Alert, Animated, StyleSheet, View} from 'react-native';
import React, {useState} from 'react';
import {
  GestureHandlerRootView,
  PanGestureHandler,
  State,
} from 'react-native-gesture-handler';
import CustomSafeAreaView from '../Components/Global/CustomSafeAreaView';
import ProductSlider from '../Components/Login/ProductSlider';
import {resetAndNavigate} from '../Utils/NavigationUtils';

const CustomerScreen = () => {
  const [gestureSequence, setGestureSequence] = useState<string[]>([]);

  const handleGesture = ({nativeEvent}: any) => {
    console.log('hello');

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
        <CustomSafeAreaView>
          <ProductSlider />
          <PanGestureHandler onHandlerStateChange={handleGesture}>
            <Animated.ScrollView
              bounces={false}
              keyboardDismissMode={'on-drag'}
              keyboardShouldPersistTaps="handled"
              contentContainerStyle={styles.subContainer}></Animated.ScrollView>
          </PanGestureHandler>
        </CustomSafeAreaView>
      </View>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  subContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginBottom: 20,
  },
});

export default CustomerScreen;
