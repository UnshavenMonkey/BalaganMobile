import React, {FC} from 'react';
import {View, Text, Pressable, TextInput, KeyboardTypeOptions, GestureResponderEvent} from 'react-native';

type InputFieldProps = {
  label?: string,
  inputType?: string,
  keyboardType?: KeyboardTypeOptions | undefined,
  fieldButtonLabel?: string,
  fieldButtonFunction?: (event: GestureResponderEvent) => void,
}
const InputField: FC<InputFieldProps> = ({
  label,
  inputType,
  keyboardType,
  fieldButtonLabel,
  fieldButtonFunction,
}) => {
  return (
    <View
      style={{
        flexDirection: 'row',
        borderBottomColor: '#ccc',
        borderBottomWidth: 1,
        paddingBottom: 8,
        marginBottom: 25,
      }}>
      {inputType == 'password' ? (
        <TextInput
          placeholder={label}
          keyboardType={keyboardType}
          style={{flex: 1, paddingVertical: 0}}
          secureTextEntry={true}
        />
      ) : (
        <TextInput
          placeholder={label}
          keyboardType={keyboardType}
          style={{flex: 1, paddingVertical: 0}}
        />
      )}
      <Pressable onPress={fieldButtonFunction}>
        <Text style={{color: '#20315f', fontWeight: '700'}}>{fieldButtonLabel}</Text>
      </Pressable>
    </View>
  );
}

export default InputField;