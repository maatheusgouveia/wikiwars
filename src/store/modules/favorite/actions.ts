export function toggleFavorite(name: string) {
	return {
		type: '@favorite/TOGGLE_FAVORITE',
		payload: { name },
	};
}
