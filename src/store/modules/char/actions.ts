export function getCharsRequest(url: string) {
	return {
		type: '@char/GET_CHAR_REQUEST',
		payload: { url },
	};
}

export function getCharsSuccess(payload: {
	list: string[];
	nextPage: string;
	count: number;
}) {
	return {
		type: '@char/GET_CHAR_SUCCESS',
		payload,
	};
}

export function getCharsFailure() {
	return {
		type: '@char/GET_CHAR_FAILURE',
	};
}
