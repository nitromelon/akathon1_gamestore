<script lang="ts">
	import { onMount } from 'svelte';
	import { c_burger } from './c_burger';
	import { c_link } from './c_link';
	import { is_cursor_locked } from '../is_already_locked/cursor';
	import { c_frame } from './frame/c_frame';
	import { frame_collection } from '../collection/window';
	import { browser } from '$app/environment';
	import { c_drag } from './frame/c_drag';
	import { c_ex_help } from './c_extended_help';
	import { c_traybar } from './traybar/c_traybar';

	onMount(() => {
		const cursor = document.getElementById('cursor') as HTMLDivElement;
		const dot = document.getElementById('dot') as HTMLDivElement;

		document.addEventListener(
			'mousemove',
			() => {
				cursor.style.display = 'block';
				dot.style.display = 'block';
			},
			{ once: true }
		);

		document.addEventListener('mousemove', (e) => {
			if (
				Math.abs(e.pageX - cursor.offsetLeft) > 300 ||
				Math.abs(e.pageY - cursor.offsetTop) > 300
			) {
				cursor.style.transition = 'none';
				move(e);
				setTimeout(() => {
					cursor.style.transition = 'all 0.3s cubic-bezier(0, 0, 0, 1)';
				}, 100);
			} else {
				move(e);
			}
		});

		document.addEventListener('mouseleave', () => {
			stylemouse('0px', '0');
		});
		document.addEventListener('mouseenter', () => {
			stylemouse('48px', '1');
		});

		Array.from(document.getElementsByClassName('desktop_menu_link')).forEach((link, i) => {
			c_link(cursor, link as HTMLAnchorElement, i);
		});

		c_burger(cursor, 'taskbar_menu');
		c_ex_help(cursor, 'ms_help');
		c_traybar(cursor, 'mainscreen_traybar');

		document.addEventListener('mousemove', () => {
			if ($is_cursor_locked.size === 0) {
				cursor.style.height = '48px';
				cursor.style.width = `48px`;
				cursor.style.transform = 'translate(-50%, -50%)';
				cursor.style.borderRadius = '50%';
				cursor.style.display = 'block';
				cursor.style.border = '1px solid #fafafa';
				cursor.style.opacity = '1';
				cursor.style.transition =
					'all 0.3s cubic-bezier(0, 0, 0, 1), border-radius 0.3s cubic-bezier(0, 1, 0, 1)';
			}
		});

		function move(e: MouseEvent) {
			cursor.style.top = e.pageY + 'px';
			cursor.style.left = e.pageX + 'px';
			dot.style.top = e.pageY + 'px';
			dot.style.left = e.pageX + 'px';
		}

		function stylemouse(style: string, opacity: string) {
			cursor.style.height = style;
			cursor.style.width = style;
			cursor.style.opacity = opacity;
			dot.style.opacity = opacity;
		}
	});

	$: {
		if (browser) {
			const cursor = document.getElementById('cursor') as HTMLDivElement;
			$frame_collection;
			Array.from(document.getElementsByClassName('titlebar_button')).forEach((link, i) => {
				c_frame(cursor, link as HTMLAnchorElement, i);
			});
			Array.from(document.getElementsByClassName('draggable_area')).forEach((link, i) => {
				c_drag(cursor, link as HTMLAnchorElement, i);
			});
		}
	}
</script>

<div id="cursor" />
<div id="dot" />

<style lang="scss">
	#cursor,
	#dot {
		display: none;
		position: fixed;
		top: 0;
		left: 0;
		transform: translate(-50%, -50%);
		border: 1px solid #fafafa;
		border-radius: 50%;
		pointer-events: none;
		z-index: 9999;
	}

	#cursor {
		height: 48px;
		width: 48px;
		transform: translate(-50%, -50%);
		transition: all 0.3s cubic-bezier(0, 0, 0, 1), border-radius 0.3s cubic-bezier(0, 1, 0, 1);
	}

	#dot {
		border: none;
		height: 8px;
		width: 8px;
		backdrop-filter: invert(100%);
	}
</style>
