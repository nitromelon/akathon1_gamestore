import { is_menu_open } from '../is_openmenu/i';
import { is_cursor_locked } from '../is_already_locked/cursor';

let open: boolean;
is_menu_open.subscribe((value) => {
	open = value;
});

export function c_link(div: HTMLDivElement, target: HTMLAnchorElement, n: number) {
	const key = `menu_link_${n}`;
	document.addEventListener('mousemove', (e) => {
		const rect = target.getBoundingClientRect();
		if (
			e.clientX >= rect.left &&
			e.clientX <= rect.right &&
			e.clientY >= rect.top &&
			e.clientY <= rect.bottom &&
			open
		) {
			is_cursor_locked.update((n) => {
				n.add(key);
				return n;
			});
			div.style.height = rect.bottom - rect.top + 'px';
			div.style.width = rect.right - rect.left + 'px';
			div.style.top = `${rect.top}px`;
			div.style.left = `${rect.left}px`;
			div.style.transform = 'none';
			div.style.borderRadius = '100px';
		} else
			is_cursor_locked.update((n) => {
				n.delete(key);
				return n;
			});
	});
}
