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
import {getStateFromAsyncStorage} from "../common-utils";
import {useAppSelector} from "../app/store";
import {selectAccessToken, selectIsLoggedIn} from "../features/system/system-slice";

const HomeScreen = () => {
  const isLogged = useAppSelector(selectIsLoggedIn);
  const at = useAppSelector(selectAccessToken)
  console.log('home', isLogged)
  console.log('at', at)

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
