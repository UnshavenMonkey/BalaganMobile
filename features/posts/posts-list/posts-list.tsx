import {
  Dimensions,
  FlatList,
  Image,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {FC, useEffect} from 'react';
import {useAppDispatch, useAppSelector} from '../../../app/store';
import {getPosts, selectPosts} from '../posts-slice';
import { Card, Text as TextR } from 'react-native-paper';

type ItemProps = {title: string};

const PostsList: FC = () => {
  const dispatch = useAppDispatch();
  const posts = useAppSelector(selectPosts);
  const {width: windowWidth, height: windowHeight} = Dimensions.get('screen');

  useEffect(() => {
    dispatch(getPosts.getThunk({}));
  }, [dispatch]);

  const Item = ({title}: ItemProps) => (
    <View style={styles.item}>
      <Card>
        <Card.Title title={title} titleStyle={{textAlign: 'center'}} />
        <Card.Cover source={require('../../../assets/fefaultpost.jpg')} />
        <Card.Content><TextR variant="bodyMedium">Тут должно быть описание события. Это может быть что угодно</TextR></Card.Content>
      </Card>
    </View>
  );
  return (
    <View style={{flex: 1}}>
      <FlatList
        data={Object.values(posts)}
        renderItem={({item}) => <Item title={item.body} />}
        keyExtractor={item => item.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  item: {
    // padding: 20,
    // marginVertical: 8,
    // marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
    textAlign: 'center',
  },
});

export default PostsList;
