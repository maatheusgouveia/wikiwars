import produce from 'immer';
import { Favorite } from './types';

const INITIAL_STATE = {
	list: [] as string[],
};

interface Action {
	type: string;
	payload: Favorite;
}

export default function favorite(state = INITIAL_STATE, action: Action) {
	return produce(state, draft => {
		switch (action.type) {
			case '@favorite/TOGGLE_FAVORITE': {
				const itemExists = draft.list.some(
					item => item === action.payload.name,
				);

				if (!itemExists) {
					draft.list = [...draft.list, action.payload.name];
				} else {
					draft.list = draft.list.filter(
						item => item !== action.payload.name,
					);
				}

				break;
			}
			default:
		}
	});
}
