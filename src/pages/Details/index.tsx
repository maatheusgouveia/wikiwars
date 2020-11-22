import axios from 'axios';
import React, { useCallback, useEffect, useState } from 'react';
import { Image, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

interface Char {
	name: string;
	birth_year: string;
	mass: string;
	gender: string;
	height: string;
	films: string[];
	homeworld: string;
}

interface HomeWorld {
	name: string;
}

interface Film {
	title: string;
	episode_id: number;
}

export default function Details({ route }) {
	const [charData, setCharData] = useState<Char>({} as Char);
	const [homeWorld, setHomeWorld] = useState<HomeWorld>();
	const [films, setFilms] = useState<Film[]>([]);

	const loadExtraData = useCallback(async () => {
		if (charData.homeworld) {
			axios
				.get(charData.homeworld)
				.then(response => setHomeWorld(response.data));
		}

		if (charData.films) {
			const filmsData = await Promise.all(
				charData.films.map(async (film: string) => {
					const response = await axios.get<Film>(film);
					return response.data;
				}),
			);

			setFilms(filmsData);
		}
	}, [charData]);

	const formatGender = useCallback(gender => {
		if (gender === 'male') {
			return 'Masculino';
		} else if (gender === 'female') {
			return 'Feminino';
		}
		return gender;
	}, []);

	const getFilmImage = useCallback(id => {
		let img = '';

		switch (id) {
			case 1:
				img = require('../../assets/1.jpg');
				break;
			case 2:
				img = require('../../assets/2.jpg');
				break;
			case 3:
				img = require('../../assets/3.jpg');
				break;
			case 4:
				img = require('../../assets/4.jpg');
				break;
			case 5:
				img = require('../../assets/5.jpg');
				break;
			case 6:
				img = require('../../assets/6.jpg');
				break;
		}

		return img;
	}, []);

	useEffect(() => {
		axios
			.get<Char>(`https://swapi.dev/api/people/${route.params.id}`)
			.then(response => setCharData(response.data));
	}, [route.params.id]);

	useEffect(() => {
		loadExtraData();
	}, [loadExtraData]);

	return (
		<SafeAreaView style={styles.container}>
			<Text style={styles.text}>
				<Text style={styles.label}>Nome: </Text>
				{charData?.name}
			</Text>
			<Text style={styles.text}>
				<Text style={styles.label}>Altura: </Text>
				{charData?.height} cm
			</Text>
			<Text style={styles.text}>
				<Text style={styles.label}>Gênero: </Text>
				{formatGender(charData?.gender)}
			</Text>
			<Text style={styles.text}>
				<Text style={styles.label}>Peso: </Text>
				{charData?.mass} kg
			</Text>
			<Text style={styles.text}>
				<Text style={styles.label}>Data de nascimento: </Text>
				{charData?.birth_year}
			</Text>
			<Text style={styles.text}>
				<Text style={styles.label}>Planeta natal: </Text>
				{homeWorld?.name}
			</Text>

			<View style={styles.subtitle}>
				<View>
					<Text style={styles.subtitleText}>
						BBY *Antes da batalha de Yavin
					</Text>
				</View>
				<View>
					<Text style={styles.subtitleText}>
						ABY *Depois da batalha de Yavin
					</Text>
				</View>
			</View>

			<Text style={styles.title}>Filmes</Text>
			<ScrollView horizontal>
				{films.map(film => {
					return (
						<View key={film.title} style={styles.film}>
							<Image
								style={styles.filmImage}
								source={getFilmImage(film.episode_id)}
							/>
							<Text style={styles.filmTitle}>{film.title}</Text>
						</View>
					);
				})}
			</ScrollView>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 15,
	},
	label: {
		fontWeight: 'bold',
	},
	text: {
		margin: 3,
	},
	subtitle: {
		alignItems: 'flex-end',
	},
	subtitleText: {
		fontSize: 10,
		textAlign: 'right',
	},
	title: {
		textAlign: 'center',
		margin: 15,
		fontSize: 18,
		fontWeight: 'bold',
	},
	film: {
		flex: 1,
		width: 120,
		height: 160,
		backgroundColor: '#000',
		margin: 5,
	},
	filmImage: {
		width: 110,
		height: 150,
	},
	filmTitle: {
		textAlign: 'center',
		marginTop: 12,
		fontWeight: 'bold',
		color: '#666',
	},
});
