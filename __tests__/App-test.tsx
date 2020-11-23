import 'react-native';
import React from 'react';
import App from '../App';

import renderer, { act } from 'react-test-renderer';

jest.mock('@react-navigation/native', () => {
	return {
		useNavigation: jest.fn(),
	};
});

describe('Home', () => {
	it('renders correctly', async () => {
		await act(async () => {
			renderer.create(<App />);
		});
	});
});
