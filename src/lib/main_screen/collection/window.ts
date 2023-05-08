import { writable } from 'svelte/store';
import type { Writable } from 'svelte/store';

export const window_collection: Writable<Set<string>> = writable(new Set());
export const frame_collection: Writable<Array<string | null>> = writable(["user"]);
export const current_window: Writable<HTMLDivElement | null> = writable(null);
// export const cursor_type: Writable<string | null> = writable(null);
export const cursor_direction: Writable<string | null> = writable(null);
export const hold_cursor: Writable<boolean> = writable(false);