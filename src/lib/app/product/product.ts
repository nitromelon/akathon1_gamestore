import { writable, type Writable } from 'svelte/store';

type App = {
	Game_ID: number;
	Genre: string;
	Price: number;
	Rate: number;
	Image_path: string;
	Name: string;
	Subtitle: string;
};

export const product_arr: Writable<Array<App>> = writable([]);
export const num_total_games: Writable<number> = writable(0);
export const is_search_keyword: Writable<boolean> = writable(false);
export const search_keyword: Writable<string> = writable('');

export const bought_games: Writable<Set<number>> = writable(new Set());
