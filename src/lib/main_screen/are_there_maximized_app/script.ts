import { writable } from 'svelte/store';
import type { Writable } from 'svelte/store';

export const are_there_maximized_app: Writable<Set<string>> = writable(new Set());