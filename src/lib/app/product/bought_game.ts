import { bought_games } from './product';

export function bg() {
	fetch('http://localhost:3000/user?only_games=1', {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json'
		},
		credentials: 'include'
	})
		.then((res) => res.json())
		.then((res) => {
			if (res.result) {
				bought_games.update((v) => {
					v = new Set(res.data.games);
					return v;
				});
			}
		})
		.catch((err) => {
			console.error(err);
		});
}
