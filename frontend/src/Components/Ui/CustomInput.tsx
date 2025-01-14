import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {TextInput} from 'react-native-gesture-handler';
import {Colors, Fonts} from '../../Utils/Constants';
import {RFValue} from 'react-native-responsive-fontsize';
import Icon from 'react-native-vector-icons/Ionicons';
import React from 'react';

interface InputProps {
  left?: React.ReactNode;
  onClear?: () => void;
  right?: boolean;
}

const CustomInput: React.FC<
  InputProps & React.ComponentProps<typeof TextInput>
> = ({left, onClear, right, ...props}) => {
  return (
    <View style={styles.flexRow}>
      {left}
      <TextInput
        {...props}
        style={styles.inputContainer}
        placeholderTextColor={'#cc'}
      />

      <View style={styles.icon}>
        {props.value?.length !== 0 && right && (
          <TouchableOpacity onPress={onClear}>
            <Icon name="close-circle-sharp" size={RFValue(16)} color="#ccc" />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default CustomInput;

const styles = StyleSheet.create({
  text: {
    width: '10%',
    marginLeft: 10,
  },

  flexRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: 10,
    borderWidth: 0.5,
    width: '100%',
    marginVertical: 10,
    backgroundColor: '#fff',
    shadowOffset: {width: 1, height: 1},
    shadowColor: Colors.border,
    shadowOpacity: 0.6,
    shadowRadius: 2,
    borderColor: Colors.border,
  },

  inputContainer: {
    width: '70%',
    fontFamily: Fonts.SemiBold,
    fontSize: RFValue(12),
    paddingVertical: 14,
    paddingBottom: 15,
    height: '100%',
    color: Colors.text,
    bottom: -1,
  },

  icon: {
    width: '5%',
    justifyContent: 'center',
    marginRight: 10,
  },
});
