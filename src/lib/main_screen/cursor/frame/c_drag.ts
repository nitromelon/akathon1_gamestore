import { is_cursor_locked } from '../../is_already_locked/cursor';
import { is_menu_open } from '../../is_openmenu/i';
let open: boolean;
is_menu_open.subscribe((value) => {
	open = value;
});

export function c_drag(div: HTMLDivElement, target: HTMLAnchorElement, n: number) {
	const key = `frame_titlebar_draggable_area_${n}`;
	document.addEventListener('mousemove', (e) => {
		const rect = target.getBoundingClientRect();
		if (
			e.clientX >= rect.left &&
			e.clientX <= rect.right &&
			e.clientY >= rect.top &&
			e.clientY <= rect.bottom &&
			!open
		) {
			is_cursor_locked.update((n) => {
				n.add(key);
				return n;
			});
			div.style.opacity = '0';
			div.style.height = '36px';
			div.style.width = '36px';
		} else
			is_cursor_locked.update((n) => {
				n.delete(key);
				return n;
			});
	});
}
