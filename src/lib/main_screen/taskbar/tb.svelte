<script lang="ts">
	let openmenu = false;

	function changeline() {
		const desktop_working_area = document.getElementById('desktop_working_area');
		const line1 = document.getElementById('line1') as HTMLDivElement;
		const line2 = document.getElementById('line2') as HTMLDivElement;
		if (openmenu) {
			line1.classList.remove('line1_active');
			line2.classList.remove('line2_active');
			if (desktop_working_area != null) {
				desktop_working_area.classList.remove('smol_mainscreen');
			}
			openmenu = false;
		} else {
			line1.classList.add('line1_active');
			line2.classList.add('line2_active');
			if (desktop_working_area != null) {
				desktop_working_area.classList.add('smol_mainscreen');
			}
			openmenu = true;
		}
	}
</script>

<button class="taskbar" id="taskbar_menu" on:click={changeline}>
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
		.line {
			height: 1px;
			width: 36px;
			background-color: #fafafa;
			border-radius: 4px;
			transition: margin 0.3s cubic-bezier(0, 0, 0, 1), transform 0.25s cubic-bezier(1, 0, 0, 1);
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
	}
</style>
