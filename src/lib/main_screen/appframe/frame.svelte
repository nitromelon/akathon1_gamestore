<script lang="ts">
	export let title: string;
	let is_hold = false;
	let drag_event: MouseEvent | null = null;
	$: {
		if (drag_event !== null && is_hold === true) {
			const frame = (drag_event.target as HTMLDivElement).parentNode?.parentNode as HTMLDivElement;
			const x = drag_event.clientX;
			const y = drag_event.clientY;
			const x_offset = x - frame.offsetLeft;
			const y_offset = y - frame.offsetTop;
			const cursor = document.getElementById("cursor") as HTMLDivElement;
			const move = (e: MouseEvent) => {
				const x = e.clientX;
				const y = e.clientY;
				frame.style.left = `${x - x_offset}px`;
				frame.style.top = `${y - y_offset}px`;
				cursor.style.display = "none";
			};
			const up = () => {
				is_hold = false;
				drag_event = null;
				document.removeEventListener("mousemove", move);
				document.removeEventListener("mouseup", up);
				cursor.style.display = "block";
			};
			document.addEventListener("mousemove", move);
			document.addEventListener("mouseup", up);
		}
	}
</script>

<div class="frame">
	<div class="titlebar">
		<div class="buttons">
			<button class="close" id="frame_titlebar_button_close">
				<div class="line" />
				<div class="line" />
			</button>
			<button class="maximize" id="frame_titlebar_button_maximize">
				<div class="group1" />
				<div class="group2" />
			</button>
			<button class="minimize" id="frame_titlebar_button_minimize">
				<div class="line" />
			</button>
		</div>
		<div
			class="draggable_area"
			id="frame_titlebar_draggable_area"
			on:mousedown|preventDefault={(e) => {
				is_hold = true;
				drag_event = e;
			}}
			on:mouseup|preventDefault={() => {
				is_hold = false;
				drag_event = null;
			}}
		/>
		<div class="title">{title}</div>
	</div>
	<div class="content" />
</div>

<style lang="scss">
	.frame {
		position: absolute;
		top: 10px;
		left: 0;
		height: 500px;
		width: 1000px;
		border: 1px solid #fafafa;
		backdrop-filter: blur(1vw);
		border-radius: 6px;
		overflow: hidden;
		.titlebar {
			position: absolute;
			top: 0;
			left: 0;
			height: 36px;
			width: 100%;
			border-bottom: 1px solid #fafafa;
			display: flex;
			align-items: center;
			justify-content: space-between;
			flex-direction: row-reverse;
			.buttons {
				position: relative;
				display: flex;
				width: auto;
				height: 100%;
				flex-direction: row-reverse;
				button {
					all: unset;
					position: relative;
					height: 100%;
					width: 48px;
					display: flex;
					align-items: center;
					justify-content: center;
					* {
						transition: scale 0.3s cubic-bezier(0, 0, 0, 1);
					}
					&:hover {
						* {
							scale: 0.9;
						}
					}
					&:active {
						* {
							scale: 0.8;
						}
					}
				}
				.close {
					.line {
						position: absolute;
						top: 50%;
						left: 50%;
						height: 14px;
						width: 1px;
						background-color: #fafafa;
						border-radius: 2px;
					}
					.line:nth-child(1) {
						transform: translate(-50%, -50%) rotate(45deg);
					}
					.line:nth-child(2) {
						transform: translate(-50%, -50%) rotate(-45deg);
					}
				}
				.minimize {
					.line {
						height: 1px;
						// width: 12px;
						width: 12px;
						background-color: #fafafa;
					}
				}
				.maximize {
					.group1,
					.group2 {
						position: absolute;
						top: 50%;
						left: 50%;
						transform: translate(-50%, -50%);
						height: 10px;
						width: 10px;
						border: 1px solid #fafafa;
					}
					.group2 {
						border-right: none;
						border-bottom: none;
						display: none;
					}
				}
			}
			.title {
				position: relative;
				font-family: var(--font_family);
				margin: 0 18px;
				font-size: 12px;
				color: #fafafa;
			}
			.draggable_area {
				height: 100%;
				flex: 1;
			}
		}
		.content {
			position: absolute;
			top: 36px;
			left: 0;
			height: calc(100% - 36px);
			width: 100%;
		}
	}
</style>
