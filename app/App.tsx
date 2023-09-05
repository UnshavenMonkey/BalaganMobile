import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AuthStack from '../navigation/AuthStack';
import {createAppStore} from "./store";
import { Provider } from 'react-redux';
import {getStateFromAsyncStorage} from "../common-utils";

const state = getStateFromAsyncStorage().then(res => res);
// @ts-ignore
const store = createAppStore(state);

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        {/* <Stack.Navigator>
        <Stack.Screen name="Main" component={Main} options={{headerShown: false}}/>
        <Stack.Screen name="Home" component={HomeScreen} options={{headerShown: false}} />
      </Stack.Navigator> */}
        <AuthStack />
      </NavigationContainer>
    </Provider>
  )
}

export default App;
