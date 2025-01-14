import {useEffect, useState} from 'react';
import {Keyboard} from 'react-native';

const useKeyboardOffsetHeight = () => {
  const [keyboardOffsetHeight, setKeyboardOffsetHeight] = useState(0);

  useEffect(() => {
    const keyboardWillAndroidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      e => {
        setKeyboardOffsetHeight(e.endCoordinates.height);
      },
    );

    const keyboardWillAndroidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        setKeyboardOffsetHeight(0);
      },
    );

    const keyboardWillIosShowListener = Keyboard.addListener(
      'keyboardWillShow',
      e => {
        setKeyboardOffsetHeight(e.endCoordinates.height);
      },
    );

    const keyboardWillIosHideListener = Keyboard.addListener(
      'keyboardWillHide',
      () => {
        setKeyboardOffsetHeight(0);
      },
    );

    return () => {
      keyboardWillAndroidHideListener.remove();
      keyboardWillAndroidShowListener.remove();
      keyboardWillIosShowListener.remove();
      keyboardWillIosHideListener.remove();
    };
  }, []);

  return keyboardOffsetHeight;
};

export default useKeyboardOffsetHeight;
