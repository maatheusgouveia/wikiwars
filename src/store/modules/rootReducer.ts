import { combineReducers } from 'redux';
import favorite from './favorite/reducer';
import char from './char/reducer';

interface Store {
	favorite: {
		list: string[];
	};
	char: any;
}

//Objeto que combina todos os reducers
export default combineReducers<Store>({
	favorite,
	char,
});
