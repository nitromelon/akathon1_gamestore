import { writable } from 'svelte/store';
import type { Writable } from 'svelte/store';

export const window_collection: Writable<Set<string>> = writable(new Set());
export const frame_collection: Writable<Array<string | null>> = writable([]);
