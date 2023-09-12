import React, {FC, useState} from 'react';
import {
  SafeAreaView,
  View,
  Text,
  Image, Pressable,
} from 'react-native';
import CustomButton from '../components/CustomButton';
import InputField from "../components/InputField";
import {NativeStackScreenProps} from "@react-navigation/native-stack";
import {RootStackParamList} from "../types";
import {useAppDispatch} from "../app/store";
import {isAxiosError} from "axios";
import {login} from "../features/system/system-slice";

type Props = NativeStackScreenProps<RootStackParamList, "Login">;

const LoginScreen: FC<Props> = ({navigation}) => {
  const dispatch = useAppDispatch();
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const handleLogin = async () => {
    let isInputValid = true;

    const emailTrimmed = email.trim();
    if (!emailTrimmed.length) {
      setEmailError("Поле обязательно");
      isInputValid = false;
    }

    if (!password) {
      setPasswordError("Поле обязательно");
      isInputValid = false;
    }

    if (!isInputValid) return;

    try {
      await dispatch(
        login.getThunk({ email: emailTrimmed, password })
      );
      navigation.navigate('Home');
    } catch (e) {
      if (isAxiosError(e) && e.response?.data) {
        setPasswordError('Неправильный логин или пароль');
      } else {
        throw e;
      }
    }
  };




  return (
      <SafeAreaView style={{flex: 1, justifyContent: 'center'}}>
        <View style={{paddingHorizontal: 25}}>
          <View style={{alignItems: 'center'}}>
            <Image
              style={{width: 300, height: 300}}
              source={require('../assets/login.png')}
            />
          </View>

          <Text
            style={{
              fontFamily: 'Roboto-Medium',
              fontSize: 28,
              fontWeight: '500',
              color: '#333',
              marginBottom: 30,
              textAlign: 'center',
            }}>
            Login
          </Text>

          <InputField
            label={'Email'}
            keyboardType="email-address"
            onChangeText={setEmail}
          />
          <Text style={{color: 'red', marginBottom: 5}}>{emailError}</Text>

          <InputField
            label={'Password'}
            inputType="password"
            onChangeText={setPassword}
          />
          <Text style={{color: 'red', marginBottom: 5}}>{passwordError}</Text>

          <CustomButton label={'Login'} onPress={handleLogin} />

          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              marginBottom: 30,
            }}>
            <Text>Первый раз?</Text>
            <Pressable onPress={() => navigation.navigate('Register')}>
              <Text style={{color: '#20315f', fontWeight: '700'}}>
                {' '}
                Register
              </Text>
            </Pressable>
          </View>
        </View>
      </SafeAreaView>
    );
  };
  
  export default LoginScreen;