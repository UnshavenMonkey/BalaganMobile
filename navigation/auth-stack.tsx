import React, {useEffect, useLayoutEffect} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import OnboardingScreen from '../screens/OnboardScreen';
import {RootStackParamList} from '../types';
import {useDispatch} from 'react-redux';
import {useAppSelector} from '../app/store';
import {
  selectAccessToken,
  selectIsLoggedIn,
  selectRefreshToken,
  selectSessionUserId,
} from '../features/system/system-slice';
import {getStateFromAsyncStorage} from '../common-utils';
import HomeScreen from '../screens/HomeScreen';
import BottomNavigation from "../common/bottom-navigation";

const Stack = createNativeStackNavigator<RootStackParamList>();

const AuthStack = () => {
  const dispatch = useDispatch();
  const isLogged = useAppSelector(selectIsLoggedIn);

  useLayoutEffect(() => {
    getStateFromAsyncStorage(dispatch);
  }, [dispatch]);

  console.log('islogged', isLogged)

  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      {isLogged ? (
          <>
            <Stack.Screen name="Home" component={HomeScreen} />

          </>

      ) : (
        <>
          <Stack.Screen name="Onboarding" component={OnboardingScreen} />
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Register" component={RegisterScreen} />
          <Stack.Screen name="Home" component={HomeScreen} />
        </>
      )}
    </Stack.Navigator>
  );
};

export default AuthStack;
