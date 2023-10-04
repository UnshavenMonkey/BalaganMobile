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
import {getStateFromAsyncStorage} from '../common-utils';
import {useAppDispatch, useAppSelector} from '../app/store';
import {
  logout,
  selectAccessToken,
  selectIsLoggedIn,
} from '../features/system/system-slice';
import CustomButton from '../common/custom-button';
import {useDispatch} from 'react-redux';

const HomeScreen = () => {
  const dispatch = useAppDispatch();
  const isLogged = useAppSelector(selectIsLoggedIn);
  const handleLogout = () => {
    dispatch(logout.getThunk({}));
  };

  console.log('islogged home', isLogged);

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#fff'}}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginBottom: 20,
        }}>
        {/*<CustomButton label={'Logout'} onPress={handleLogout} />*/}
        <ImageBackground
          source={require('../assets/tucan.png')}
          style={{width: 35, height: 35}}
          imageStyle={{borderRadius: 25}}
        />
      </View>
      <View style={{flex: 1}}>
        <HomeSlider />
      </View>
      <View style={{flex: 2}}>
        <PostsList />
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;
