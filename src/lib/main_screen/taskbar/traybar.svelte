<script lang="ts">
	import { are_there_maximized_app } from '../are_there_maximized_app/script';
	// import { window_collection } from '../collection/window';

	$: height = $are_there_maximized_app.size !== 0 ? 40 : 64;
	$: bottom = $are_there_maximized_app.size !== 0 ? 5 : 16;
	$: inner_height = $are_there_maximized_app.size !== 0 ? 100 : 70;
	// $: p = Array.from($are_there_maximized_app);

	// $: {
	// 	console.log($window_collection)
	// }
</script>

<div class="traybar" id="mainscreen_traybar" style="height: {height}px; bottom: {bottom}px">
	<!-- <p>fthfth</p> -->
	<!-- {#each p as list}
		<p>{list}</p>
	{/each} -->
	<div class="inner_area" style="height: {inner_height}%;" />
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
			position: absolute;
			width: 100%;
			border-radius: 100px;
			backdrop-filter: blur(10px);
			border: 1px solid #fafafa;
			transition: height 0.3s cubic-bezier(0, 1, 0, 1);
		}
	}
</style>
