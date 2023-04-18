<script lang="ts">
	import Taskbar from './taskbar/tb.svelte';
	import Cursor from './cursor/c.svelte';
</script>

<div class="mainscreen">
	<div class="desktop" id="desktop_working_area">
		<div class="wallpaper_filter">
			<h1>Kirito</h1>
		</div>
	</div>
	<Taskbar />
	<Cursor />
</div>

<style lang="scss">
	.mainscreen {
		position: fixed;
		height: 100%;
		width: 100%;
		background-color: rgba(0, 0, 0, 0.5);
		backdrop-filter: grayscale(1) blur(10px);
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
			transition: 1s cubic-bezier(1, 0.2, 0.2, 1);
			.wallpaper_filter {
				position: absolute;
				top: 0;
				left: 0;
				height: 100%;
				width: 100%;
				background-color: rgba(0, 0, 0, 0.5);
				backdrop-filter: grayscale(1);
				h1 {
					position: absolute;
					top: 50%;
					left: 50%;
					transform: translate(-50%, -50%);
					font-family: var(--font_family);
					font-size: 144px;
					color: #fafafa;
					-webkit-text-stroke: 1px #fafafa;
					font-weight: 100;
					color: transparent;
					padding: 16px;
				}
			}
		}
	}

	:global {
		.smol_mainscreen {
			transform: scale(0.7);
			border-radius: 24px;
		}
	}
</style>
