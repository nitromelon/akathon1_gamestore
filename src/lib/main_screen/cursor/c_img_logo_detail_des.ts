import { is_menu_open } from '../is_openmenu/i';
import { is_cursor_locked } from '../is_already_locked/cursor';

let open: boolean;
is_menu_open.subscribe((value) => {
	open = value;
});

export function c_img_logo_detail_des(div: HTMLDivElement, target: HTMLDivElement, n: number) {
	const key = `img_logo_detail_des${n}`;
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
			div.style.height = target.offsetHeight + 'px';
			div.style.width = target.offsetWidth + 'px';
			div.style.top = `${rect.top}px`;
			div.style.left = `${rect.left}px`;
			div.style.transform = 'none';
			div.style.borderRadius = '6px';
			div.style.opacity = '0';
			div.style.transition = div.style.transition + ', opacity 0.2s ease-in-out';
		} else
			is_cursor_locked.update((n) => {
				n.delete(key);
				return n;
			});
	});
}
