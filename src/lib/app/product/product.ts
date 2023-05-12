import { writable, type Writable } from "svelte/store";

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