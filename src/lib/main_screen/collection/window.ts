import { writable } from 'svelte/store';
import type { Writable } from 'svelte/store';
import type Frame from '../appframe/frame.svelte';

export const window_collection: Writable<Set<string>> = writable(new Set());
export const frame_collection: Writable<Array<string | null>> = writable([]);

export const frame_collection2: Writable<Array<[typeof Frame, { title: string }]>> = writable([]);
