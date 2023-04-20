<script lang="ts">
	import { onMount } from 'svelte';
	import { are_there_maximized_app } from '../are_there_maximized_app/script';
	import { frame_collection, window_collection } from '../collection/window';
	export let title: string;
	let id = 'frame' + Math.floor(Math.random() * 2 ** 32).toString();
	let is_hold = false;
	let drag_event: MouseEvent | null = null;
	let is_maximized = false;
	const height = 480;
	const width = 640;
	const x = Math.floor(Math.random() * (window.innerWidth - width));
	const y = Math.floor(Math.random() * (window.innerHeight - height));
	let daframe: HTMLDivElement | null = null;

	window_collection.update((n) => {
		while (n.has(id)) {
			id = 'frame' + Math.floor(Math.random() * 2 ** 32).toString();
			console.log(id);
		}
		n.add(id);
		return n;
	});

	$: {
		if (drag_event !== null && is_hold) {
			const frame = (drag_event.target as HTMLDivElement).parentNode?.parentNode as HTMLDivElement;
			const x = drag_event.clientX;
			const y = drag_event.clientY;
			let x_offset = x - frame.offsetLeft;
			const y_offset = y - frame.offsetTop;
			const cursor = document.getElementById('cursor') as HTMLDivElement;
			const move = (e: MouseEvent) => {
				let x = e.clientX;
				let y = e.clientY;
				if (!(x === drag_event?.clientX && y === drag_event?.clientY)) {
					if (is_maximized) {
						frame.classList.remove('maximized_frame');
						are_there_maximized_app.update((n) => {
							n.delete(id);
							return n;
						});
						is_maximized = false;
						return;
					}
				} else {
					return;
				}
				if (e.clientX > frame.offsetLeft + frame.offsetWidth - 150) {
					frame.style.left = `${x - x_offset + 150}px`;
					x_offset = x_offset - 150;
				} else {
					frame.style.left = `${x - x_offset}px`;
				}
				frame.style.top = `${y - y_offset}px`;
				cursor.style.display = 'none';
			};
			const up = () => {
				is_hold = false;
				drag_event = null;
				document.removeEventListener('mousemove', move);
				document.removeEventListener('mouseup', up);
				cursor.style.display = 'block';
			};
			document.addEventListener('mousemove', move);
			document.addEventListener('mouseup', up);
		}
	}

	const maximize = (e: MouseEvent) => {
		(
			(e.currentTarget as HTMLButtonElement).parentNode?.parentNode?.parentNode as HTMLDivElement
		).classList.toggle('maximized_frame');
		is_maximized
			? are_there_maximized_app.update((n) => {
					n.delete(id);
					return n;
			  })
			: are_there_maximized_app.update((n) => {
					n.add(id);
					return n;
			  });
		is_maximized = !is_maximized;
	};

	const db_maximize = (e: MouseEvent) => {
		(
			(e.currentTarget as HTMLButtonElement).parentNode?.parentNode as HTMLDivElement
		).classList.toggle('maximized_frame');
		is_maximized
			? are_there_maximized_app.update((n) => {
					n.delete(id);
					return n;
			  })
			: are_there_maximized_app.update((n) => {
					n.add(id);
					return n;
			  });
		is_maximized = !is_maximized;
	};

	const close_event = (e: MouseEvent) => {
		const frame = (e.currentTarget as HTMLButtonElement).parentNode?.parentNode
			?.parentNode as HTMLDivElement;
		if (is_maximized) {
			frame.classList.remove('maximized_frame');
			is_maximized = false;
		}
		frame.style.transition =
			'transform 0.3s cubic-bezier(0, 1, 0, 1), opacity 0.3s 0.2s cubic-bezier(0, 0, 0, 1)';
		frame.style.opacity = '0';
		frame.style.transform = 'scale(0.9)';
		are_there_maximized_app.update((n) => {
			n.delete(id);
			return n;
		});
		setTimeout(() => {
			window_collection.update((n) => {
				n.delete(id);
				return n;
			});
			frame_collection.update((n) => {
				const pos = n.indexOf(title);
				n[pos] = null;
				for (let i = n.length - 1; i >= 0; i--) {
					if (n[i] === null) {
						n.pop();
					} else {
						break;
					}
				}
				return n;
			});
			frame.remove();
		}, 600);
	};

	const change_z_order = () => {
		for (let i of $window_collection) {
			const frame = document.getElementById(i) as HTMLDivElement;
			frame.style.zIndex = '1';
		}
		daframe!.style.zIndex = '2';
	};

	onMount(() => {
		if (daframe === null) return;
		daframe.style.transition =
			'transform 0.3s 0.25s cubic-bezier(0, 1, 0, 1), opacity 0.25s cubic-bezier(0, 1, 0, 1)';
		daframe.style.opacity = '0';
		daframe.style.transform = 'scale(0.9)';
		daframe.style.pointerEvents = 'none';
		setTimeout(() => {
			daframe!.style.opacity = '1';
			daframe!.style.transform = 'scale(1)';
			daframe!.style.pointerEvents = 'auto';
			setTimeout(() => {
				daframe!.style.transition = '0.3s cubic-bezier(0, 1, 0, 1)';
			}, 250);
		}, 300);
	});
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<div
	class="frame"
	{id}
	bind:this={daframe}
	on:mousedown={change_z_order}
	style="top: {y}px; left: {x}px; height: {height}px; width: {width}px;"
>
	<div class="titlebar">
		<div class="buttons">
			<button class="close titlebar_button" on:click|preventDefault={close_event}>
				<div class="line" />
				<div class="line" />
			</button>
			<button
				class="maximize titlebar_button"
				id="frame_titlebar_button_maximize"
				on:click|preventDefault={maximize}
			>
				<div class="group1" />
				<div class="group2" />
			</button>
			<button class="minimize titlebar_button">
				<div class="line" />
			</button>
		</div>
		<div
			class="draggable_area"
			on:mousedown|preventDefault={(e) => {
				is_hold = true;
				drag_event = e;
			}}
			on:mouseup|preventDefault={() => {
				is_hold = false;
				drag_event = null;
			}}
			on:dblclick={db_maximize}
		/>
		<div class="title">{title}</div>
	</div>
	<div class="content">
		{$frame_collection} - text holder
	</div>
</div>

<style lang="scss">
	.frame {
		position: absolute;
		border: 1px solid #fafafa;
		backdrop-filter: blur(1vw);
		border-radius: 6px;
		overflow: hidden;
		transition: 0.3s cubic-bezier(0, 1, 0, 1);
		z-index: 3;
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
						transition: transform 1s 0.3s cubic-bezier(1, 0, 0, 1);
					}
					.group2 {
						border-left: none;
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
				border-left: 1px solid #fafafa;
				border-right: 1px solid #fafafa;
				opacity: 0;
				margin-right: 16px;
				&:hover {
					border-left: 1px solid #fafafa;
					border-right: 1px solid #fafafa;
					opacity: 1;
					transition: 0.3s cubic-bezier(0, 0, 0, 1);
				}
			}
		}
		.content {
			position: absolute;
			top: 36px;
			left: 0;
			height: calc(100% - 36px);
			width: 100%;

			// demo
			display: flex;
			align-items: center;
			justify-content: center;
			color: #fafafa;
		}
	}
	:global {
		.maximized_frame {
			top: 0 !important;
			left: 0 !important;
			height: calc(100% - 50px) !important;
			width: 100% !important;
			border-radius: 0 !important;
			border-left: none !important;
			border-right: none !important;
			border-top: none !important;
			.titlebar {
				.buttons {
					.maximize {
						.group1,
						.group2 {
							display: block !important;
						}
						.group1 {
							transform: translate(calc(-50% - 1px), calc(-50% + 1px)) !important;
						}
						.group2 {
							transform: translate(calc(-50% + 1px), calc(-50% - 1px)) !important;
						}
					}
				}
			}
		}
	}
</style>
