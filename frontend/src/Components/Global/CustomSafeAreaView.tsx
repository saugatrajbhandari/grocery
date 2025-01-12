import {ViewStyle, SafeAreaView, View} from 'react-native';
import React from 'react';

interface CustomSafeAreaViewProps {
  children: React.ReactNode;
  style?: ViewStyle;
}

const CustomSafeAreaView: React.FC<CustomSafeAreaViewProps> = ({
  children,
  style,
}) => {
  return (
    <SafeAreaView style={[styles.container, style]}>
      <View>{children}</View>
    </SafeAreaView>
  );
};

const styles = {
  container: {
    flex: 1,
    background: '#fff',
  },
};

export default CustomSafeAreaView;
