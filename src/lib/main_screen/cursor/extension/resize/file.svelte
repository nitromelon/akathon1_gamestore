<script lang="ts">
	import { cursor_direction, hold_cursor } from '$lib/main_screen/collection/window';
	import { is_menu_open } from '$lib/main_screen/is_openmenu/i';
	import { onMount } from 'svelte';

	export let type: string;
	let hide = 'none';
	let deg = 0;
	let cursor: HTMLDivElement;
	$: switch ($cursor_direction) {
		case 'right':
		case 'left':
			deg = 0;
			hide = 'block';
			break;
		case 'top':
		case 'bottom':
			deg = 90;
			hide = 'block';
			break;
		case 'topleft':
		case 'bottomright':
			deg = 45;
			hide = 'block';
			break;
		case 'topright':
		case 'bottomleft':
			deg = 135;
			hide = 'block';
			break;
		case null:
			deg = 0;
			hide = 'none';
			break;
	}

	onMount(() => {
		document.addEventListener('mousedown', () => {
			if ($is_menu_open) return;
			cursor.classList.add('ex_move_animation');
			hold_cursor.set(true);
		});
		document.addEventListener('mouseup', () => {
			cursor.classList.remove('ex_move_animation');
			hold_cursor.set(false);
		});
	});
</script>

<div bind:this={cursor} class="ex">
	{#if type === 'resize' && !$is_menu_open}
		<div class="rs" style="transform: rotate({deg}deg); display: {hide}">
			<div class="l" />
			<div class="r" />
		</div>
	{/if}
</div>

<style lang="scss">
	.ex {
		position: absolute;
		top: -12px;
		left: -12px;
		bottom: -12px;
		right: -12px;
		transition: 0.3s cubic-bezier(0, 1, 0, 1);
		.rs {
			position: absolute;
			top: 0;
			left: 0;
			bottom: 0;
			right: 0;
			transition: 0.5s cubic-bezier(0, 1, 0, 1);
			.l,
			.r {
				position: absolute;
				top: 50%;
				transform: translateY(-50%);
				width: 6px;
				height: 6px;
				background: #cdcdcd;
			}

			.l {
				clip-path: polygon(0 50%, 100% 100%, 100% 0);
				left: 0;
			}

			.r {
				right: 0;
				clip-path: polygon(100% 50%, 0 100%, 0 0);
			}
		}
	}

	:global {
		.ex_move_animation {
			top: -10px !important;
			left: -10px !important;
			bottom: -10px !important;
			right: -10px !important;
		}
	}
</style>
