import {FlatList, StyleSheet, Text, View} from 'react-native';
import React, {FC, useEffect} from 'react';
import {useAppDispatch, useAppSelector} from '../../../app/store';
import {getPosts, selectPosts} from '../posts-slice';

type ItemProps = {title: string};

const PostsList: FC = () => {
  const dispatch = useAppDispatch();
  const posts = useAppSelector(selectPosts);
  useEffect(() => {
    dispatch(getPosts.getThunk({}));
  }, [dispatch]);

  const Item = ({title}: ItemProps) => (
    <View style={styles.item}>
      <Text style={styles.title}>{title}</Text>
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
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
  },
});

export default PostsList;
