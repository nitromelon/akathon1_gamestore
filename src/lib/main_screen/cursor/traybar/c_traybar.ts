import { is_cursor_locked } from '../../is_already_locked/cursor';

export function c_traybar(div: HTMLDivElement, target: string) {
	const taskbar_menu = document.getElementById(target) as HTMLDivElement;
	const key = 'traybar_border';
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
