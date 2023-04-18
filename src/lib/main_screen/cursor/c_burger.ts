export function c_burger(div: HTMLDivElement, target: string) {
	const taskbar_menu = document.getElementById(target) as HTMLDivElement;
	document.addEventListener('mousemove', (e) => {
		const rect = taskbar_menu.getBoundingClientRect();
		if (
			e.clientX >= rect.left &&
			e.clientX <= rect.right &&
			e.clientY >= rect.top &&
			e.clientY <= rect.bottom
		) {
			div.style.height = taskbar_menu.offsetHeight + 'px';
			div.style.width = taskbar_menu.offsetWidth + 'px';
			div.style.top = `${rect.top}px`;
			div.style.left = `${rect.left}px`;
			div.style.transform = 'none';
			div.style.borderRadius = '6px';
		} else {
			div.style.height = '48px';
			div.style.width = '48px';
			div.style.transform = 'translate(-50%, -50%)';
			div.style.borderRadius = '50%';
		}
	});
}
