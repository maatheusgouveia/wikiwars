import axios from 'axios';
import { takeLatest, call, put, all } from 'redux-saga/effects';

import { getCharsSuccess, getCharsFailure } from './actions';

export function* getChars({ payload }) {
	const { url } = payload;

	try {
		const response = yield call(axios.get, url);

		yield put(
			getCharsSuccess({
				list: response.data.results,
				nextPage: response.data.next,
				count: response.data.count,
			}),
		);
	} catch (err) {
		console.log(err);
		yield put(getCharsFailure());
	}
}

export default all([takeLatest('@char/GET_CHAR_REQUEST', getChars)]);
