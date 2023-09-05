import React, {FC} from 'react';
import {View, Text, Pressable, TextInput, KeyboardTypeOptions, GestureResponderEvent} from 'react-native';

type InputFieldProps = {
  value?: string,
  onChangeText?: ((text: string) => void) | undefined;
  label?: string,
  inputType?: string,
  keyboardType?: KeyboardTypeOptions | undefined,
  fieldButtonLabel?: string,
  fieldButtonFunction?: (event: GestureResponderEvent) => void,
}
const InputField: FC<InputFieldProps> = ({
  label,
  onChangeText,
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
          onChangeText={onChangeText}
          secureTextEntry={true}
        />
      ) : (
        <TextInput
          placeholder={label}
          keyboardType={keyboardType}
          style={{flex: 1, paddingVertical: 0}}
          onChangeText={onChangeText}
        />
      )}
      <Pressable onPress={fieldButtonFunction}>
        <Text style={{color: '#20315f', fontWeight: '700'}}>{fieldButtonLabel}</Text>
      </Pressable>
    </View>
  );
}

export default InputField;