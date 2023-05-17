<script lang="ts">
	import { onMount } from 'svelte';
	import { is_menu_open } from '../is_openmenu/i';
	import { are_there_maximized_app } from '../are_there_maximized_app/script';
	let desktop_working_area: HTMLDivElement | null = null;
	let line1: HTMLDivElement | null = null;
	let line2: HTMLDivElement | null = null;
	let height: number = 64;
	let bottom: number = 16;

	onMount(() => {
		desktop_working_area = document.getElementById('desktop_working_area') as HTMLDivElement;
		line1 = document.getElementById('line1') as HTMLDivElement;
		line2 = document.getElementById('line2') as HTMLDivElement;
	});

	$: if (desktop_working_area !== null && line1 !== null && line2 !== null) {
		if ($is_menu_open) {
			line1.classList.add('line1_active');
			line2.classList.add('line2_active');
			if (desktop_working_area !== null) {
				desktop_working_area.classList.add('smol_mainscreen');
			}
		} else {
			line1.classList.remove('line1_active');
			line2.classList.remove('line2_active');
			if (desktop_working_area !== null) {
				desktop_working_area.classList.remove('smol_mainscreen');
			}
		}
	}

	$: if ($are_there_maximized_app.size === 0 || $is_menu_open) {
		height = 64;
		bottom = 16;
	} else {
		height = 40;
		bottom = 5;
	}
</script>

<button
	class="taskbar"
	id="taskbar_menu"
	on:click={() => {
		is_menu_open.update((_) => !_);
	}}
	style="height: {height}px; bottom: {bottom}px;"
>
	<div class="line" id="line1" />
	<div class="line" id="line2" />
</button>

<style lang="scss">
	button {
		all: unset;
	}
	.taskbar {
		position: absolute;
		bottom: 16px;
		left: 16px;
		height: 64px;
		width: 64px;
		z-index: 1000;
		display: flex;
		align-items: center;
		border-radius: 4px;
		flex-direction: column;
		justify-content: center;
		transition: height 0.3s cubic-bezier(0, 1, 0, 1), bottom 0.3s cubic-bezier(0, 1, 0, 1);
		.line {
			height: 1px;
			width: 36px;
			background-color: #fafafa;
			border-radius: 4px;
			transition: margin 0.3s cubic-bezier(0, 0, 0, 1), transform 0.25s cubic-bezier(1, 0, 0, 1),
				width 0.3s cubic-bezier(0, 0, 0, 1);
		}
		.line:nth-child(1) {
			margin-bottom: 12px;
		}
		&:hover {
			.line:nth-child(1) {
				margin-bottom: 10px;
			}
		}
		&:active {
			.line:nth-child(1) {
				margin-bottom: 8px;
			}
		}
	}

	:global {
		.line1_active {
			transition: transform 0.25s cubic-bezier(1, 0, 0, 1);
			transform: translateY(0.5px) rotate(45deg);
			margin-bottom: 0px !important;
		}
		.line2_active {
			transform: translateY(-0.5px) rotate(-45deg);
		}
		#taskbar_menu:hover {
			.line1_active,
			.line2_active {
				width: 40px;
			}
		}

		#taskbar_menu:active {
			.line1_active,
			.line2_active {
				width: 46px;
			}
		}
	}
</style>
