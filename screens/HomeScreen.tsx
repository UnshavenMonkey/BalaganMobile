import React from 'react'
import { FlatList, ImageBackground, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native'

const HomeScreen = () => {

  type ItemProps = {title: string};

  const Item = ({title}: ItemProps) => (
  <View style={styles.item}>
    <Text style={styles.title}>{title}</Text>
  </View>
  );
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#fff'}}>
      <ScrollView style={{padding: 20}}>
        <View style={{flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20}}>
          <Text style={{fontSize: 16}}>Hello Joe</Text>
          <ImageBackground source={require('../assets/tucan.png')} style={{width: 35, height: 35}} imageStyle={{borderRadius: 25}} />
        </View>
        <View style={{borderColor: '#C6C6C^', borderWidth: 1, borderRadius: 8, paddingHorizontal: 10, paddingVertical: 8}}>
          <TextInput placeholder='Поиск'/>
        </View>
        <View>
          <FlatList
            data={[{id: '1', title: 'Первый пост'}, {id: '2', title: 'Второй пост'}]}
            renderItem={({item}) => <Item title={item.title} />}
            keyExtractor={item => item.id}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

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

export default HomeScreen;

