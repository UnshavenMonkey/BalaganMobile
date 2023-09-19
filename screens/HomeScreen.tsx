import React from 'react';
import {
  FlatList,
  ImageBackground,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import HomeSlider from '../features/home-slider';
import PostsList from '../features/posts/posts-list';

const HomeScreen = () => {
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#fff'}}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginBottom: 20,
        }}>
        <Text style={{fontSize: 16}}>Hello</Text>
        <ImageBackground
          source={require('../assets/tucan.png')}
          style={{width: 35, height: 35}}
          imageStyle={{borderRadius: 25}}
        />
      </View>
      <View style={{flex: 1}}>
        <HomeSlider />
      </View>
      <PostsList />
    </SafeAreaView>
  );
};

export default HomeScreen;
