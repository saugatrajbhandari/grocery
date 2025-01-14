import React from 'react';
import {
  ActivityIndicator,
  Button,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {Colors, Fonts} from '../../Utils/Constants';
import CustomText from './CustomText';

interface CustomButtonProps {
  onPress: () => void;
  title: string;
  disabled: boolean;
  loading: boolean;
}

const CustomButton: React.FC<
  CustomButtonProps & React.ComponentProps<typeof Button>
> = ({onPress, loading, title, disabled, ...props}) => {
  return (
    <TouchableOpacity
      {...props}
      activeOpacity={0.8}
      style={[
        styles.button,
        {backgroundColor: disabled ? Colors.disabled : Colors.secondary},
      ]}
      onPress={onPress}
      disabled={disabled}>
      {loading ? (
        <ActivityIndicator color={'white'} size={'small'} />
      ) : (
        <CustomText
          variant="h6"
          fontFamily={Fonts.SemiBold}
          style={styles.text}>
          {title}
        </CustomText>
      )}
    </TouchableOpacity>
  );
};
export default CustomButton;

const styles = StyleSheet.create({
  button: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    padding: 15,
    marginVertical: 15,
  },

  text: {
    color: '#ff',
  },
});
