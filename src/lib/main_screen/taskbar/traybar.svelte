<script lang="ts">
	import { are_there_maximized_app } from '../are_there_maximized_app/script';
	import { frame_collection } from '../collection/window';
	import Logo from './traybar/logo.svelte';

	$: height = $are_there_maximized_app.size !== 0 ? 40 : 64;
	$: bottom = $are_there_maximized_app.size !== 0 ? 5 : 16;
	$: inner_height = $are_there_maximized_app.size !== 0 ? 100 : 70;
</script>

<div class="traybar" id="mainscreen_traybar" style="height: {height}px; bottom: {bottom}px">
	<div class="inner_area" style="height: {inner_height}%;" />
	<div class="list_of_traybar_app" style="height: {inner_height}%">
		{#each $frame_collection as app}
			{#if app !== null}
				<Logo name={app} />
			{/if}
		{/each}
	</div>
</div>

<style lang="scss">
	$left_traybar: 16px + 64px + 16px;
	.traybar {
		position: absolute;
		z-index: 5;
		left: $left_traybar;
		width: calc(100% - $left_traybar - 96px);
		display: flex;
		align-items: center;
		justify-content: center;
		transition: height 0.3s cubic-bezier(0, 1, 0, 1), bottom 0.3s cubic-bezier(0, 1, 0, 1);
		color: #fafafa;
		.inner_area {
			z-index: 2;
			pointer-events: none;
			position: absolute;
			width: 100%;
			border-radius: 100px;
			// backdrop-filter: blur(10px);
			// border: 1px solid #fafafa;
			border: 1px solid #fafafa;
			opacity: 0;
			transition: opacity 0.25s cubic-bezier(0, 0, 0, 1), height 0.3s cubic-bezier(0, 1, 0, 1);
		}

		&:hover {
			.inner_area {
				opacity: 1;
			}
		}
		.list_of_traybar_app {
			position: relative;
			display: flex;
			align-items: center;
			overflow: hidden;
			overflow-y: auto;
			max-width: 100%;
			flex-wrap: wrap;
			gap: 10px;
			padding-left: 24px;
			padding-right: 24px;
			scrollbar-width: thin;
			scrollbar-color: #fafafa #1a1a1a;
			&::-webkit-scrollbar {
				width: 8px;
				border: 1px solid #fafafa;
				border-radius: 16px;
			}
			&::-webkit-scrollbar-thumb {
				background-color: #fafafa;
				width: 1px;
				border-radius: 16px;
			}
		}
	}
</style>
