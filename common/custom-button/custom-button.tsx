import {GestureResponderEvent, KeyboardTypeOptions, Pressable, Text, TouchableOpacity} from 'react-native';
import React, {FC} from 'react';

type CustomButtonProps = {
  label?: string,
  onPress?: (event: GestureResponderEvent) => void,
}

const CustomButton: FC<CustomButtonProps> = ({label, onPress}) => {

  return (
    <Pressable
      onPress={onPress}
      style={{
        backgroundColor: '#438cfa',
        padding: 20,
        borderRadius: 10,
        marginBottom: 30,
      }}>
      <Text
        style={{
          textAlign: 'center',
          fontWeight: '700',
          fontSize: 16,
          color: '#fff',
        }}>
        {label}
      </Text>
    </Pressable>
  );
}

export default CustomButton;