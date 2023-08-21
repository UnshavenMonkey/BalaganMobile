import React from 'react'
import { Image, Pressable, SafeAreaView, StyleSheet, Text, View } from 'react-native'

const OnboardingScreen = ({navigation}) => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={{marginTop: 20}}>
        <Text style={styles.titleApp}>Balagan</Text>
      </View>
      <View style={styles.imgContainer}>
        <Image style={styles.beginImage} source={require('../assets/beginImg.jpg')} />
      </View>
      <Pressable onPress={() => navigation.navigate('Login')} style={styles.beginPressable}>
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

  export default OnboardingScreen;