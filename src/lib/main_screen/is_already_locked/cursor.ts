import { writable } from 'svelte/store';
import type { Writable } from 'svelte/store';

export const is_cursor_locked: Writable<Set<string>> = writable(new Set());
