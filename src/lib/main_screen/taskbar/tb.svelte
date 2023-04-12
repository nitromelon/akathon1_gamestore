<div class="taskbar">
	<!-- todo -->
	<a href="./about" class="logo">Kirito.</a>
</div>

<style lang="scss">
	.taskbar {
		position: absolute;
		bottom: 8px;
		left: 8px;
		height: 48px;
		width: auto;
		min-width: calc(40 * 8px);
		background: var(--taskbar_bg);
		color: white;
		border-radius: 8px;
		backdrop-filter: blur(25px);
		z-index: 1000;

		max-width: calc(100% - 16px);

		padding: 8px;
		display: flex;
		align-items: center;
		column-gap: 16px;

		// overflow: hidden;
		// overflow-x: auto;
		.logo {
			position: relative;
			font-family: var(--font_family);
			height: 100%;
			width: fit-content;
			// background-color: red;
			display: flex;
			align-items: center;
			justify-content: center;
			font-size: 24px;
			padding: 0 8px;
			text-decoration: none;
			color: #1a1a1a;
		}
	}
</style>
