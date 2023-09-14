import {Animated, FlatList, StyleSheet, Text, View} from 'react-native';
import React, {useRef, useState} from 'react';
import Slides from './data';
import HomeSlideItem from './home-slider-item';

const HomeSlider = () => {
	const [index, setIndex] = useState(0);
	const scrollX = useRef(new Animated.Value(0)).current;

	const handleOnScroll = (event: any) => {
		Animated.event(
			[
				{
					nativeEvent: {
						contentOffset: {
							x: scrollX,
						},
					},
				},
			],
			{
				useNativeDriver: false,
			},
		)(event);
	};

	// @ts-ignore
	const handleOnViewableItemsChanged = useRef(({viewableItems}) => {
		setIndex(viewableItems[0].index);
	}).current;

	const viewabilityConfig = useRef({
		itemVisiblePercentThreshold: 50,
	}).current;

	// @ts-ignore
	return (
		<View>
			<FlatList
				data={Slides}
				renderItem={({item}) => <HomeSlideItem item={item} />}
				horizontal
				pagingEnabled
				snapToAlignment="center"
				showsHorizontalScrollIndicator={false}
				onScroll={handleOnScroll}
				onViewableItemsChanged={handleOnViewableItemsChanged}
				viewabilityConfig={viewabilityConfig}
			/>
		</View>
	);
};

export default HomeSlider;

const styles = StyleSheet.create({});