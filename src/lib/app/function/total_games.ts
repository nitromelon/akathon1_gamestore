import { num_total_games } from '../product/product';

export const total_games = () => {
	fetch('http://localhost:3000/getgame/number')
		.then((r) => r.json())
		.then((r) => {
			num_total_games.set(r.result ? r.data.count : 0);
		})
		.catch((e) => console.error(e));
};
