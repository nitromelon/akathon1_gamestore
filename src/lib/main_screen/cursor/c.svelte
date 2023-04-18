<script lang="ts">
	import { onMount } from 'svelte';
	import { c_burger } from './c_burger';

	onMount(() => {
		const cursor = document.getElementById('cursor') as HTMLDivElement;
		const dot = document.getElementById('dot') as HTMLDivElement;

		document.addEventListener('mousemove', (e) => {
			move(e);
			if (
				Math.abs(e.pageX - cursor.offsetLeft) > 300 ||
				Math.abs(e.pageY - cursor.offsetTop) > 300
			) {
				cursor.style.transition = 'none';
				move(e);
				setTimeout(() => {
					cursor.style.transition = 'all 0.3s cubic-bezier(0, 0, 0, 1)';
				}, 100);
			}
		});

		document.documentElement.addEventListener('mouseleave', () => {
			stylemouse('0px', '0');
		});
		document.documentElement.addEventListener('mouseenter', () => {
			stylemouse('48px', '1');
		});

		c_burger(cursor);

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
</script>

<div id="cursor" />
<div id="dot" />

<style lang="scss">
	#cursor,
	#dot {
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
		transition: all 0.3s cubic-bezier(0, 0, 0, 1), border-radius .3s cubic-bezier(0, 1, 0, 1);
	}

	#dot {
		border-width: 2px;
	}
</style>
