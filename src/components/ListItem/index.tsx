import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Icon } from 'react-native-elements';
import { TouchableOpacity } from 'react-native-gesture-handler';

export default function ListItem({ list, onPress, onFavorite, item }) {
	return (
		<View style={styles.listItem}>
			<TouchableOpacity onPress={onPress}>
				<Text>{item.name}</Text>
			</TouchableOpacity>

			<Icon
				raised
				name="favorite"
				type="material"
				color={list.some(fav => fav === item.name) ? '#f50' : '#999'}
				onPress={onFavorite}
			/>
		</View>
	);
}

const styles = StyleSheet.create({
	listItem: {
		backgroundColor: '#EEE',
		marginTop: 20,
		padding: 30,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
	},
});
