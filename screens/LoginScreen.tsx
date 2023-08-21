import React from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image, Pressable,
} from 'react-native';
import CustomButton from '../components/CustomButton';
import InputField from "../components/InputField";


const LoginScreen = ({navigation}) => {
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
          />

          <InputField
            label={'Password'}
            inputType="password"
            fieldButtonLabel={'Forgot?'}
            fieldButtonFunction={() => {}}
          />

          <CustomButton label={'Login'} onPress={() => {}} />

          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              marginBottom: 30,
            }}>
            <Text>New to the app?</Text>
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