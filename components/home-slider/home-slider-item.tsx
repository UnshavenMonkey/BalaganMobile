import {
	Image,
	StyleSheet,
	Text,
	View,
	Dimensions,
	Animated,
	Easing,
} from 'react-native';
import React, { FC } from 'react';

const {width, height} = Dimensions.get('screen');

type HomeSlideItemProps = {
  item: {id: number; img: any};
};

const HomeSlideItem: FC<HomeSlideItemProps> = (item) => {

	return (
		<View style={styles.container}>
			<Animated.Image
				source={item.item.img}
				resizeMode="cover"
				style={[
					styles.image,
				]}
			/>
		</View>
	);
};

export default HomeSlideItem;

const styles = StyleSheet.create({
	container: {
		width,
		height,
		alignItems: 'center',
	},
	image: {
		flex: 0.6,
		width: '100%',
	},
});