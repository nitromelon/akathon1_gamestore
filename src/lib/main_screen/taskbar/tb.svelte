<script lang="ts">
</script>

<div class="taskbar">
	<!-- svelte-ignore a11y-mouse-events-have-key-events -->
	<p class="logo">K.</p>
	<a href="./introduction" class="link">Introduction</a>
	<a href="./product" class="link">Product</a>
	<a href="./payment" class="link">Payment</a>
	<a href="./about" class="link">About</a>
	<a href="./more" class="link">
		<!-- More logo -->
	</a>
</div>

<style lang="scss">
	.taskbar {
		position: absolute;
		bottom: 8px;
		left: 8px;
		height: 52px;
		width: auto;
		min-width: calc(40 * 8px);
		background: var(--taskbar_bg);
		border-radius: 8px;
		backdrop-filter: blur(25px);
		z-index: 1000;
		max-width: calc(100% - 16px);
		padding: 8px;
		display: flex;
		align-items: center;
		// column-gap: 0px;
		// overflow: hidden;
		// overflow-x: auto;
		* {
			cursor: default;
		}
		.logo,
		.link {
			position: relative;
			font-family: var(--font_family);
			height: 100%;
			width: auto;
			display: flex;
			align-items: center;
			justify-content: center;
			padding: 0 8px;
			text-decoration: none;
			color: #1a1a1a;
		}
		.logo {
			font-size: 24px;
		}
		.link {
			font-size: 18px;
		}
	}	
</style>
