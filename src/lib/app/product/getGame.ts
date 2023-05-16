import { product_arr } from './product';

export async function getGame() {
	fetch('http://localhost:3000/get?startIndex=1')
	.then((res) => res.json())
	.then((res) => {
		product_arr.set(res.data);
	});
}
