import React, { useCallback, useEffect } from 'react';
import { FlatList, SafeAreaView, StatusBar, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { toggleFavorite } from '../../store/modules/favorite/actions';
import { getCharsRequest } from '../../store/modules/char/actions';
import ListItem from '../../components/ListItem';
import { useNavigation } from '@react-navigation/native';

interface Char {
	name: string;
}
interface StoreTypes {
	favorite: { list: string[] };
	char: {
		list: Char[];
		count: number;
		nextPage: string;
	};
}

export default function Home() {
	const navigation = useNavigation();
	const dispatch = useDispatch();

	const chars = useSelector<StoreTypes>(state => state.char.list) as Char[];
	const count = useSelector<StoreTypes>(state => state.char.count) as number;
	const nextPage = useSelector<StoreTypes>(
		state => state.char.nextPage,
	) as string;

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

	const favorites = useSelector<StoreTypes>(
		state => state.favorite.list,
	) as string[];

	return (
		<>
			<StatusBar barStyle="default" />
			<SafeAreaView>
				<FlatList
					style={styles.list}
					keyExtractor={item => item.name}
					data={chars}
					renderItem={({ item, index }) => (
						<ListItem
							list={favorites}
							item={item}
							onFavorite={() => handleAddFavorite(item.name)}
							onPress={() => {
								navigation.navigate('Details', {
									id: index + 1,
									name: item.name,
								});
							}}
						/>
					)}
					onEndReached={handleLoadNextPage}
					onEndReachedThreshold={0.6}
				/>
			</SafeAreaView>
		</>
	);
}

const styles = StyleSheet.create({
	list: {
		paddingHorizontal: 20,
	},
});
