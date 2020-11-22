import { all } from 'redux-saga/effects';

import char from './char/sagas';

export default function* rootSaga() {
	return yield all([char]);
}
