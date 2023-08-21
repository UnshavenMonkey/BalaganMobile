import React, {useState} from 'react';
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image, Pressable,
} from 'react-native';

import InputField from '../components/InputField';

import CustomButton from '../components/CustomButton';

const RegisterScreen = ({navigation}) => {
  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);

  return (
    <SafeAreaView style={{flex: 1, justifyContent: 'center'}}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{paddingHorizontal: 25}}>
        <View style={{alignItems: 'center'}}>
            <Image
              style={{width: 300, height: 300}}
              source={require('../assets/registration.jpg')}
            />
          </View>

        <Text
          style={{
            fontFamily: 'Roboto-Medium',
            fontSize: 28,
            fontWeight: '500',
            color: '#333',
            marginBottom: 30,
          }}>
          Register
        </Text>

        <Text style={{textAlign: 'center', color: '#666', marginBottom: 30}}>
          Or, register with email ...
        </Text>

        <InputField
          label={'Full Name'}
        />

        <InputField
          label={'Email'}
          keyboardType="email-address"
        />

        <InputField
          label={'Password'}
          inputType="password"
        />

        <InputField
          label={'Confirm Password'}
          inputType="password"
        />

        <CustomButton label={'Register'} onPress={() => {}} />

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            marginBottom: 30,
          }}>
          <Text>Already registered?</Text>
          <Pressable onPress={() => navigation.goBack()}>
            <Text style={{color: '#20315f', fontWeight: '700'}}> Login</Text>
          </Pressable>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default RegisterScreen;