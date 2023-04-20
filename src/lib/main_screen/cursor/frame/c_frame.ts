import { is_cursor_locked } from '../../is_already_locked/cursor';
import { is_menu_open } from '../../is_openmenu/i';
let open: boolean;
is_menu_open.subscribe((value) => {
	open = value;
});

export function c_frame(div: HTMLDivElement, target: HTMLAnchorElement, n: number) {
	const key = `titlebar_button_${n}`;
	const frame_button = (e: MouseEvent) => {
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
			div.style.height = target.offsetHeight + 'px';
			div.style.width = target.offsetWidth + 'px';
			div.style.top = `${rect.top}px`;
			div.style.left = `${rect.left}px`;
			div.style.transform = 'none';
			div.style.borderRadius = '0px';
			div.style.borderTop = 'none';
			div.style.borderRight = 'none';
			div.style.borderBottom = 'none';
			if (n % 3 === 1 || n % 3 === 2) {
				div.style.borderRight = '1px solid #fafafa';
			}
		} else
			is_cursor_locked.update((n) => {
				n.delete(key);
				return n;
			});
	};
	document.removeEventListener('mousemove', frame_button);
	document.addEventListener('mousemove', frame_button);
}
