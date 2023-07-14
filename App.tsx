import React from 'react';
import type {PropsWithChildren} from 'react';
import {
  Image,
  Pressable,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './screens/HomeScreen';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Main" component={Main} options={{headerShown: false}}/>
        <Stack.Screen name="Home" component={HomeScreen} options={{headerShown: false}} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

const Main = ({navigation}) => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={{marginTop: 20}}>
        <Text style={styles.titleApp}>Balagan</Text>
      </View>
      <View style={styles.imgContainer}>
        <Image style={styles.beginImage} source={require('./assets/beginImg.jpg')} />
      </View>
      <Pressable onPress={() => navigation.navigate('Home')} style={styles.beginPressable}>
        <Text style={styles.pressapleText}>Начать пользоватся</Text>
      </Pressable>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  titleApp: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#20315f'
  },
  beginPressable: {
    backgroundColor: '#438cfa',
    padding: 20,
    width: '90%',
    borderRadius: 5,
    marginBottom: 20,
  },
  pressapleText: {
    fontWeight: 'bold',
    fontSize: 18,
    color: '#fff',
    textAlign: 'center',
  },
  beginImage: {
    width: 300,
    height: 300
  },
  imgContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
})


export default App;
