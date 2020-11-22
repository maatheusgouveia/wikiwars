import produce from 'immer';

const INITIAL_STATE = {
	list: [],
	count: 0,
	nextPage: '',
	success: false,
	error: false,
};

interface Action {
	type: string;
	payload: {
		list: [];
		count: string;
		nextPage: string;
	};
}

export default function char(state = INITIAL_STATE, action: Action) {
	return produce(state, draft => {
		switch (action.type) {
			case '@char/GET_CHAR_REQUEST':
				break;

			case '@char/GET_CHAR_SUCCESS': {
				console.log(action.payload);
				draft.list = [...draft.list, ...action.payload.list];
				draft.count = action.payload.count;
				draft.nextPage = action.payload.nextPage;
				draft.success = true;
				draft.error = false;
				break;
			}

			case '@char/GET_CHAR_FAILURE': {
				draft.success = false;
				draft.error = true;
				break;
			}
			default:
		}
	});
}
