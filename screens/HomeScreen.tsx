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
import {Avatar, Searchbar} from "react-native-paper";
import BottomNavigation from '../common/bottom-navigation';

const HomeScreen = () => {
  const dispatch = useAppDispatch();
  const isLogged = useAppSelector(selectIsLoggedIn);
  const [searchQuery, setSearchQuery] = React.useState('');

  const onChangeSearch = (query: string) => setSearchQuery(query);
  const handleLogout = () => {
    dispatch(logout.getThunk({}));
  };

  console.log('islogged home', isLogged);

  return (
    <SafeAreaView style={{flex: 4, backgroundColor: '#fff'}}>
      <View style={{margin: 10}}>
        <Avatar.Text size={36} label="XD" />
      </View>
      <View style={{flex: 1, marginBottom: 50}}>
        <Searchbar
          placeholder="Search"
          onChangeText={onChangeSearch}
          value={searchQuery}
        />
        <HomeSlider />
      </View>
      <View style={{flex: 2.5}}>
        <PostsList />
      </View>
      {/*<View>*/}
      {/*  <BottomNavigation />*/}
      {/*</View>*/}
    </SafeAreaView>
  );
};

export default HomeScreen;
