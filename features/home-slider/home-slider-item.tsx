import {
  Image,
  StyleSheet,
  Text,
  View,
  Dimensions,
  Animated,
  Easing,
} from 'react-native';
import React, {FC} from 'react';

const {width, height} = Dimensions.get('screen');

type HomeSlideItemProps = {
  item: {id: number; img: any; text: string};
};

const HomeSlideItem: FC<HomeSlideItemProps> = item => {
  const {width: windowWidth, height: windowHeight} = Dimensions.get('window');

  return (
    <View
      style={{
        height: windowHeight,
        width: windowWidth,
        alignItems: 'center',
        justifyContent: 'center',
				marginTop: 10,
      }}>
			<Text style={{fontSize: 18}}>{item.item.text}</Text>
      <Image
        source={item.item.img}
        resizeMode="cover"
        style={{width: windowWidth, height: windowHeight}}
      />
    </View>
  );
};

export default HomeSlideItem;
