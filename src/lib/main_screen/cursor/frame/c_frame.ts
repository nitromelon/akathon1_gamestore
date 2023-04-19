import { is_cursor_locked } from '../../is_already_locked/cursor';
import { is_menu_open } from '../../is_openmenu/i';
let open: boolean;
is_menu_open.subscribe((value) => {
	open = value;
});


export function c_frame(div: HTMLDivElement, target: string) {
	const taskbar_menu = document.getElementById(target) as HTMLDivElement;
	const key = 'menu_burger' + target;
	document.addEventListener('mousemove', (e) => {
		const rect = taskbar_menu.getBoundingClientRect();
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
			div.style.height = taskbar_menu.offsetHeight + 'px';
			div.style.width = taskbar_menu.offsetWidth + 'px';
			div.style.top = `${rect.top}px`;
			div.style.left = `${rect.left}px`;
			div.style.transform = 'none';
			div.style.borderRadius = '0px';
		} else
			is_cursor_locked.update((n) => {
				n.delete(key);
				return n;
			});
	});
}
