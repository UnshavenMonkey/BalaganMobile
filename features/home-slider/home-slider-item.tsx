import {Image, Text, View, Dimensions} from 'react-native';
import React, {FC} from 'react';
import {Card, Text as TextR} from "react-native-paper";

type HomeSlideItemProps = {
  item: {id: number; img: any; text: string};
};

const HomeSlideItem: FC<HomeSlideItemProps> = item => {
  const {width: windowWidth, height: windowHeight} = Dimensions.get('screen');

  return (
    // <View
    //   style={{
    //     height: windowHeight,
    //     width: windowWidth,
    //     alignItems: 'center',
    //     justifyContent: 'center',
    //     marginTop: 10,
    //   }}>
      <Card style={{width: windowWidth}}>
        <Card.Title title={item.item.text} titleStyle={{textAlign: 'center'}} />
        <Card.Cover source={item.item.img} />
      </Card>
      // {/*<Text style={{fontSize: 18}}>{item.item.text}</Text>*/}
      // {/*<Image*/}
      // {/*  source={item.item.img}*/}
      // {/*  resizeMode="cover"*/}
      // {/*  style={{width: windowWidth, height: windowHeight}}*/}
      // {/*/>*/}
    // </View>
  );
};

export default HomeSlideItem;
