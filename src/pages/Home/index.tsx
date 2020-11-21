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

interface Char {
	name: string;
}

interface AxiosResponse {
	results: Char[];
	next: string;
	count: number;
}

const Home = () => {
	const [chars, setChars] = useState<Char[]>([]);
	const [nextPage, setNextPage] = useState('');
	const [count, setCount] = useState(0);

	useEffect(() => {
		axios
			.get<AxiosResponse>('https://swapi.dev/api/people/')
			.then((response) => {
				setChars(response?.data?.results);
				setNextPage(response?.data?.next);
				setCount(response.data.count);
			});
	}, []);

	const handleLoadNextPage = useCallback(async () => {
		if (chars.length < count) {
			axios.get<AxiosResponse>(nextPage).then((response) => {
				console.log(chars);
				setChars([...chars, ...response.data.results]);
				setNextPage(response.data.next);
			});
		}
	}, [chars, nextPage, count]);

	return (
		<>
			<StatusBar barStyle="dark-content" />
			<SafeAreaView>
				<FlatList
					style={styles.list}
					keyExtractor={(item) => item.name}
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
								color="#f50" // #999
								onPress={() => console.log(item.name)}
							/>
						</View>
					)}
					onEndReached={handleLoadNextPage}
					onEndReachedThreshold={0.2}
				/>
			</SafeAreaView>
		</>
	);
};

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

export default Home;
