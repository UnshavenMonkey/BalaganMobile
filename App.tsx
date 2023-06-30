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

const App = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Text style={styles.titleApp}>Balagan</Text>
      </View>
      <View>
        <Image
          // style={styles.beginImage}
          source={require('./')}
        />
      </View>
      <Pressable style={styles.beginPressable}>
        <Text style={styles.pressapleText}>Начать пользоваться</Text>
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
  },
  pressapleText: {
    fontWeight: 'bold',
    fontSize: 18,
    color: '#fff',
  },
})


export default App;
