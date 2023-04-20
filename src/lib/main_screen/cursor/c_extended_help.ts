import { is_cursor_locked } from '../is_already_locked/cursor';

export function c_ex_help(div: HTMLDivElement, target: string) {
	const taskbar_menu = document.getElementById(target) as HTMLDivElement;
	const key = 'extended_help';
	document.addEventListener('mousemove', (e) => {
		const rect = taskbar_menu.getBoundingClientRect();
		if (
			e.clientX >= rect.left &&
			e.clientX <= rect.right &&
			e.clientY >= rect.top &&
			e.clientY <= rect.bottom
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
			div.style.borderRadius = '6px';
		} else
			is_cursor_locked.update((n) => {
				n.delete(key);
				return n;
			});
	});
}
