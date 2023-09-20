import React, {useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import AuthStack from '../navigation/auth-stack';
import {createAppStore, RootState} from './store';
import {Provider, useDispatch} from 'react-redux';
import {getStateFromAsyncStorage} from '../common-utils';

const store = createAppStore();

const App = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <AuthStack />
      </NavigationContainer>
    </Provider>
  );
};

export default App;
