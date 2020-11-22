import React, { useCallback, useEffect, useState } from 'react';
import {
	FlatList,
	SafeAreaView,
	StatusBar,
	StyleSheet,
	Text,
	View,
} from 'react-native';
import axios from 'axios';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Icon } from 'react-native-elements';
import { useDispatch, useSelector } from 'react-redux';
import { toggleFavorite } from '../../store/modules/favorite/actions';
import { getCharsRequest } from '../../store/modules/char/actions';

interface Char {
	name: string;
}

interface AxiosResponse {
	results: Char[];
	next: string;
	count: number;
}

export default function Home() {
	const dispatch = useDispatch();
	const chars = useSelector(state => state.char.list);
	const count = useSelector(state => state.char.count);
	const nextPage = useSelector(state => state.char.nextPage);

	useEffect(() => {
		dispatch(getCharsRequest('https://swapi.dev/api/people/'));
	}, [dispatch]);

	const handleLoadNextPage = useCallback(async () => {
		if (chars.length < count) {
			dispatch(getCharsRequest(nextPage));
		}
	}, [chars, nextPage, count, dispatch]);

	const handleAddFavorite = useCallback(
		name => {
			dispatch(toggleFavorite(name));
		},
		[dispatch],
	);

	const favorites = useSelector<{ favorite: { list: string[] } }>(
		state => state.favorite.list,
	) as string[];

	return (
		<>
			<StatusBar barStyle="dark-content" />
			<SafeAreaView>
				<FlatList
					style={styles.list}
					keyExtractor={item => item.name}
					data={chars}
					renderItem={({ item }) => (
						<View style={styles.listItem}>
							<TouchableOpacity onPress={() => {}}>
								<Text>{item.name}</Text>
							</TouchableOpacity>

							<Icon
								raised
								name="favorite"
								type="material"
								color={
									favorites.some(fav => fav === item.name)
										? '#f50'
										: '#999'
								}
								onPress={() => handleAddFavorite(item.name)}
							/>
						</View>
					)}
					onEndReached={handleLoadNextPage}
					onEndReachedThreshold={0.2}
				/>
			</SafeAreaView>
		</>
	);
}

const styles = StyleSheet.create({
	list: {
		paddingHorizontal: 20,
	},

	listItem: {
		backgroundColor: '#EEE',
		marginTop: 20,
		padding: 30,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
	},

	listItemText: {
		flex: 1,
	},
});
