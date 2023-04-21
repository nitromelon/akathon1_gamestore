<script lang="ts">
	import { browser } from '$app/environment';
	import { are_there_maximized_app } from '$lib/main_screen/are_there_maximized_app/script';
	import { current_window, window_collection } from '$lib/main_screen/collection/window';
	import { onMount } from 'svelte';

	export let name: string;
	let logo_component: HTMLButtonElement;
	let app_for_logo: HTMLDivElement | null = null;
	let id_app_for_logo: string;
	let temporarily_remove_id_from_atma: boolean = false;
	const random_key =
		Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
	onMount(() => {
		if ($current_window === null) {
			// I hope this will never happen or else I die lol 💀.
			alert('Fail when catch current window. Error code: 1');
		}
		app_for_logo = $current_window;
		id_app_for_logo = ('button' + app_for_logo?.id) as string;
		logo_component.classList.add('traybar_logo_animation_start');
		setTimeout(() => {
			logo_component.classList.remove('traybar_logo_animation_start');
		}, 600);
		return () => {
			if (app_for_logo !== null) {
				// Just in case. Though I don't think this will ever happen because app when close will have to unminimize.
				Array.from(document.getElementsByTagName('style')).forEach((style) => {
					if (style.innerHTML.includes(`.app_for_logo_minimize_${random_key}`)) {
						style.remove();
						return;
					}
				});
				app_for_logo.classList.remove(`app_for_logo_minimize_${random_key}`);
			}
		};
	});
</script>

<button
	id={id_app_for_logo}
	bind:this={logo_component}
	on:click={() => {
		const { height, width, x, y } = logo_component.getBoundingClientRect();
		if (app_for_logo !== null) {
			if (browser) {
				Array.from(document.getElementsByTagName('style')).forEach((style) => {
					if (style.innerHTML.includes(`.app_for_logo_minimize_${random_key}`)) {
						style.remove();
						return;
					}
				});
				const style = document.createElement('style');
				style.innerHTML = `
					.app_for_logo_minimize_${random_key} {
						left: ${x}px !important;
						top: ${y}px !important;
						height: ${height}px !important;
						width: ${width}px !important;
						opacity: 0 !important;
						transition: all 0.3s cubic-bezier(1, 0, 0, 1), opacity 0.3s cubic-bezier(0, 0, 0, 1) !important;
					}
					.app_for_logo_minimize_${random_key} .titlebar, .app_for_logo_minimize_${random_key} .content {
						visibility: hidden !important;
					}
				`;
				document.head.appendChild(style);
				app_for_logo.classList.toggle(`app_for_logo_minimize_${random_key}`);

				for (let i of $window_collection) {
					const frame = document.getElementById(i);
					if (frame !== null) {
						frame.style.zIndex = '1';
					}
				}
				app_for_logo.style.zIndex = '2';
				$current_window = app_for_logo;

				if ($are_there_maximized_app.has(app_for_logo.id)) {
					are_there_maximized_app.update((n) => {
						if (app_for_logo !== null) {
							n.delete(app_for_logo.id);
						}
						return n;
					});
					app_for_logo.classList.remove('maximized_frame');
					temporarily_remove_id_from_atma = true;
				} else if (temporarily_remove_id_from_atma) {
					are_there_maximized_app.update((n) => {
						if (app_for_logo !== null) {
							n.add(app_for_logo.id);
						}
						return n;
					});
					app_for_logo.classList.add('maximized_frame');
					temporarily_remove_id_from_atma = false;
				}
			}
		}
	}}
>
	<p>{name[0]?.toUpperCase() + name.slice(1).toLowerCase()}</p>
	<div class="line" />
</button>

<style lang="scss">
	button {
		all: unset;
		position: relative;
		height: 80%;
		min-width: 38px;
		max-width: 64px;
		padding: 0px 8px;
		border-radius: 6px;
		overflow: hidden;
		transition: background-color 0.3s cubic-bezier(0, 1, 0, 1);
		p {
			position: relative;
			width: 100%;
			font-family: var(--font_family);
			overflow: hidden;
			white-space: nowrap;
			text-overflow: ellipsis;
			transition: transform 0.3s cubic-bezier(0, 1, 0, 1);
		}

		.line {
			position: absolute;
			bottom: 0;
			left: 50%;
			transform: translateX(-50%);
			height: 2px;
			width: 14px;
			border-radius: 100px;
			background-color: #fafafa;
			transition: width 0.3s cubic-bezier(0, 0, 0, 1), transform 0.3s cubic-bezier(0, 1, 0, 1);
		}

		&:hover {
			backdrop-filter: blur(10px);
			background-color: rgba(250, 250, 250, 0.2);
			.line {
				width: 10px;
			}
		}
		&:active {
			p {
				transform: scale(0.85);
			}
			.line {
				width: 4px;
			}
		}
	}

	:global {
		.traybar_logo_animation_start {
			p {
				transform: translateY(26px) !important;
			}
			.line {
				transform: translateX(-50%) translateY(13px) !important;
			}
		}
	}
</style>
