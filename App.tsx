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

interface Char {
	name: string;
}

interface AxiosResponse {
	results: Char[];
	next: string;
	count: number;
}

const App = () => {
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
							<Text>{item.name}</Text>
						</View>
					)}
					onEndReached={handleLoadNextPage}
					onEndReachedThreshold={0.1}
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
	},
});

export default App;
