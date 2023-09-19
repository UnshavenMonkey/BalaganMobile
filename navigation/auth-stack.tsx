import React, {useEffect} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import OnboardingScreen from '../screens/OnboardScreen';
<<<<<<< HEAD:navigation/AuthStack.tsx
import {RootStackParamList} from "../types";
import HomeScreen from "../screens/HomeScreen";
import {useDispatch} from "react-redux";
import {getStateFromAsyncStorage} from "../common-utils";
import {useAppSelector} from "../app/store";
import {selectAccessToken, selectIsLoggedIn} from "../features/system/system-slice";
=======
import {RootStackParamList} from '../types';
import HomeScreen from '../screens/HomeScreen';
>>>>>>> 90112b38b3c393dcb91c2eb1c3c1d59cd4aad673:navigation/auth-stack.tsx

const Stack = createNativeStackNavigator<RootStackParamList>();

const AuthStack = () => {
  const dispatch = useDispatch()
  const isLogged = useAppSelector(selectIsLoggedIn);
  const at = useAppSelector(selectAccessToken)
  console.log('at', at)


  useEffect(() => {
    getStateFromAsyncStorage(dispatch)
  }, [dispatch]);

  console.log(isLogged)

  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="Onboarding" component={OnboardingScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />
      <Stack.Screen name="Home" component={HomeScreen} />
    </Stack.Navigator>
  );
};

export default AuthStack;
