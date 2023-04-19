<script lang="ts">
	import { onMount } from 'svelte';
	import { is_menu_open } from './is_openmenu/i';
	import { frame_collection } from './collection/window';
	import Taskbar from './taskbar/tb.svelte';
	import Cursor from './cursor/c.svelte';
	import Navigation from './navigation/nav.svelte';
	import Traybar from './taskbar/traybar.svelte';
	import Frame from './appframe/frame.svelte';

	let time = new Date();

	$: hour = time.getHours() < 10 ? '0' + time.getHours().toString() : time.getHours();
	$: minute = time.getMinutes() < 10 ? '0' + time.getMinutes().toString() : time.getMinutes();

	onMount(() => {
		const interval = setInterval(() => {
			time = new Date();
		}, 1000);

		return () => {
			clearInterval(interval);
		};
	});
</script>

<div class="mainscreen">
	<!-- svelte-ignore a11y-click-events-have-key-events -->
	<div
		class="desktop"
		id="desktop_working_area"
		on:click={() => {
			is_menu_open.update((_) => false);
		}}
	>
		<div class="wallpaper_filter">
			<p class="time">{hour}:{minute}</p>
			<h1 class="slogan">Kirito | Game store</h1>
		</div>
		<Frame title={"Demo test title + App"}/>
		<!-- <Appframe title={"Demo test title + Appwg"}/> -->
		{#each $frame_collection as app}
			{#if app !== null}
				<svelte:component this={Frame} title={app} />
			{/if}
		{/each}
		<Traybar />
	</div>
	<Navigation />
	<Taskbar />
	<Cursor />
</div>

<style lang="scss">
	.mainscreen {
		position: fixed;
		height: 100%;
		width: 100%;
		background-color: rgba(0, 0, 0, 0.5);
		backdrop-filter: grayscale(1) blur(1vw);
		.desktop {
			position: absolute;
			top: 0;
			left: 0;
			height: 100%;
			width: 100%;
			background: url('./main_screen/ms2.jpg') no-repeat center center fixed;
			background-size: cover;
			outline: 1px solid #fafafa;
			overflow: hidden;
			transition: 0.5s cubic-bezier(0, 1, 0, 1);
			z-index: 2;
			.wallpaper_filter {
				position: absolute;
				top: 0;
				left: 0;
				height: 100%;
				width: 100%;
				background-color: rgba(0, 0, 0, 0.5);
				backdrop-filter: grayscale(1);
				.slogan {
					position: absolute;
					top: 50%;
					left: 50%;
					transform: translate(-50%, -50%);
					font-family: var(--font_family);
					font-size: 64px;
					-webkit-text-stroke: 1px #fafafa;
					// font-weight: 100;
					color: transparent;
					padding: 16px;
				}

				.time {
					position: absolute;
					top: 16px;
					left: 50%;
					transform: translate(-50%, 0);
					font-family: var(--font_family);
					font-size: 18px;
					color: #fafafa;
				}
			}
		}
	}

	:global {
		.smol_mainscreen {
			transform: scale(0.7);
			border-radius: 24px;
			* {
				pointer-events: none;
			}
		}
	}
</style>
