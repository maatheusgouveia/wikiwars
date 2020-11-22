import 'react-native-gesture-handler';
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Home from './pages/Home';
import Details from './pages/Details';

const Stack = createStackNavigator();

export default function Routes() {
	return (
		<NavigationContainer>
			<Stack.Navigator>
				<Stack.Screen
					name="Home"
					options={{ headerShown: false }}
					component={Home}
				/>
				<Stack.Screen
					name="Details"
					component={Details}
					options={({ route }) => ({ title: route.params.name })}
				/>
			</Stack.Navigator>
		</NavigationContainer>
	);
}
