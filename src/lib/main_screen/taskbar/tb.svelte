<script lang="ts">
</script>

<div class="taskbar" id="taskbar_menu">
	<div class="line line1" />
	<div class="line line2" />
</div>

<style lang="scss">
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
		.line {
			height: 1px;
			width: 36px;
			background-color: #fafafa;
			border-radius: 4px;
			transition: margin 0.3s cubic-bezier(0, 0, 0, 1);
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
</style>
