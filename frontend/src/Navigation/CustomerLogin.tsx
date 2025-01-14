import {Animated, Image, StyleSheet, View} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {
  GestureHandlerRootView,
  PanGestureHandler,
  State,
} from 'react-native-gesture-handler';

import ProductSlider from '../Components/Login/ProductSlider';
import {resetAndNavigate} from '../Utils/NavigationUtils';
import CustomText from '../Components/Ui/CustomText';
import CustomInput from '../Components/Ui/CustomInput';
import {Fonts} from '../Utils/Constants';
import CustomButton from '../Components/Ui/CustomButton';
import useKeyboardOffsetHeight from '../Hooks/useKeboardOffsetHeight';

const CustomerScreen = () => {
  const [gestureSequence, setGestureSequence] = useState<string[]>([]);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [loading, setLoading] = useState(false);
  const keyboardOffsetHeight = useKeyboardOffsetHeight();

  const animatedValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (keyboardOffsetHeight === 0) {
      Animated.timing(animatedValue, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(animatedValue, {
        toValue: -keyboardOffsetHeight * 0.84,
        duration: 500,
        useNativeDriver: true,
      }).start();
    }
  }, [keyboardOffsetHeight, animatedValue]);

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

  const handleAuth = () => {};

  return (
    <GestureHandlerRootView style={styles.container}>
      <View style={styles.container}>
        <ProductSlider />

        <PanGestureHandler onHandlerStateChange={handleGesture}>
          <Animated.ScrollView
            bounces={false}
            keyboardDismissMode={'on-drag'}
            keyboardShouldPersistTaps="handled"
            contentContainerStyle={styles.subContainer}
            style={{transform: [{translateY: animatedValue}]}}>
            <View style={styles.content}>
              <Image
                source={require('../assets/images/logo.png')}
                style={styles.logo}
              />

              <CustomText variant="h2" fontFamily={Fonts.Bold}>
                India's last minute app
              </CustomText>

              <CustomText
                variant="h3"
                style={styles.text}
                fontFamily={Fonts.SemiBold}>
                Login or Sign up
              </CustomText>

              <CustomInput
                onChangeText={text => setPhoneNumber(text.slice(0, 10))}
                onClear={() => setPhoneNumber('')}
                value={phoneNumber}
                left={<CustomText style={styles.phoneText}>+977</CustomText>}
                inputMode="numeric"
                placeholder="Enter mobile"
              />

              <CustomButton
                title="Login"
                onPress={handleAuth}
                disabled={loading || phoneNumber.length !== 10}
                loading={loading}
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

  phoneText: {
    marginLeft: 10,
  },

  text: {
    marginTop: 2,
    marginBottom: 25,
    opacity: 0.8,
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
