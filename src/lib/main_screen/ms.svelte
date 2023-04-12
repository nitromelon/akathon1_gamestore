<script lang="ts">
	import Taskbar from './taskbar/tb.svelte';
</script>

<div class="mainscreen">
	<div class="desktop">
	</div>
	<Taskbar />
</div>

<style lang="scss">
	.mainscreen {
		position: fixed;
		height: 100%;
		width: 100%;
		.desktop {
			position: absolute;
			top: 0;
			left: 0;
			height: 100%;
			width: 100%;
			background: url('./main_screen/ms.jpg') no-repeat center center fixed;
			background-size: cover;
		}
	}
</style>
