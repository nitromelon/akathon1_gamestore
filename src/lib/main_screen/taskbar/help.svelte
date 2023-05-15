<script lang="ts">
	import { are_there_maximized_app } from '../are_there_maximized_app/script';
	import { is_extendedhelp } from '../is_extendedhelp/script';
	import { is_menu_open } from '../is_openmenu/i';

	let height: number = 64;
	let bottom: number = 16;
	let height_svg: number = 40;
	let width_svg: number = 40;
	let help_button: any;

	$: if ($are_there_maximized_app.size === 0 || $is_menu_open) {
		height = 64;
		bottom = 16;
		height_svg = width_svg = 40;
	} else {
		height = 40;
		bottom = 5;
		height_svg = width_svg = 30;
	}

	$: toggle = $is_extendedhelp
		? 'M460.333 922.333 382 844H228q-24 0-40-16t-16-40V284q0-24 16-40t40-16h504q24 0 40 16t16 40v504q0 24-16 40t-40 16H578l-78.333 78.333q-8.334 8.334-19.667 8.334-11.333 0-19.667-8.334ZM482 729q9.667 0 16.5-6.833 6.833-6.834 6.833-16.5 0-9.667-6.833-16.834-6.833-7.166-16.5-7.166t-16.833 7.166Q458 696 458 705.667q0 9.666 7.167 16.5Q472.333 729 482 729Zm9.333-138q1.334-19 12.334-34.5T534 521.667q25.667-25.667 38.167-46.834 12.5-21.166 12.5-47.166 0-45.667-28.5-70.167T483.333 333q-35 0-63.333 16.333-28.333 16.334-41 40.334-1.667 4.333.5 9.833t7.5 6.833q5 2 9.833 0 4.834-2 7.834-6.333 11.333-18 29.666-29.5 18.334-11.5 47-11.5 41 0 59.834 20.5Q560 400 560 427.667q0 21.666-10.667 39.666-10.666 18-29.333 35Q493 529 480.167 549.5 467.333 570 465.333 591q0 6 3.667 9.667 3.667 3.666 9 3.666 5 0 8.667-3.666 3.666-3.667 4.666-9.667Z'
		: 'M482.019 729q9.648 0 16.481-6.732 6.833-6.732 6.833-16.62 0-9.648-6.732-16.815-6.732-7.166-16.62-7.166-9.648 0-16.814 7.185Q458 696.038 458 705.685q0 9.648 7.185 16.482Q472.371 729 482.019 729Zm9.314-138q1.334-19 12.334-34.5T534 521.667q25.667-25.667 38.167-46.811 12.5-21.145 12.5-47.189 0-45.667-28.5-70.167T483.333 333q-35 0-63.333 16.333-28.333 16.334-41 40.334-1.667 4.333.5 9.833t7.5 6.833q5 2 9.833 0 4.834-2 7.834-6.333 11.333-18 29.666-29.5 18.334-11.5 47-11.5 41.301 0 59.984 20.5T560 427.667q0 21.666-10.667 39.666-10.666 18-29.333 35Q493 529 480.167 549.5 467.333 570 465.333 591q0 6.235 3.611 9.784 3.611 3.549 9.056 3.549 5.296 0 8.926-3.616 3.629-3.616 4.407-9.717Zm-31 331.333L382 844H228q-23.85 0-39.925-16Q172 812 172 788V284q0-23.85 16.075-39.925Q204.15 228 228 228h504q24 0 40 16.075T788 284v504q0 24-16 40t-40 16H578l-78.333 78.333q-8.334 8.334-19.667 8.334-11.333 0-19.667-8.334ZM228 820h164.667L480 907.333 567.333 820H732q14 0 23-9t9-23V284q0-14-9-23t-23-9H228q-14 0-23 9t-9 23v504q0 14 9 23t23 9Zm-32-568v568-568Z';
</script>

<button
	id="ms_help"
	style="height: {height}px; bottom: {bottom}px;"
	title="Get help"
	on:click={() => {
		help_button.classList.toggle('rotate_ms_extended_help');
		setTimeout(() => {
			$is_extendedhelp = !$is_extendedhelp;
		}, 300);
	}}
>
	<svg
		bind:this={help_button}
		xmlns="http://www.w3.org/2000/svg"
		height={height_svg}
		viewBox="0 96 960 960"
		width={width_svg}
	>
		<path d={toggle} />
	</svg>
</button>

<style lang="scss">
	#ms_help {
		all: unset;
		position: fixed;
		right: 16px;
		width: 64px;
		border-radius: 6px;
		z-index: 1000;
		display: flex;
		justify-content: center;
		align-items: center;
		transition: 0.3s cubic-bezier(0, 1, 0, 1);
		svg {
			fill: #fafafa;
			transform: translateY(2px);
			transition: all 0.3s cubic-bezier(0, 1, 0, 1), transform 0.6s cubic-bezier(1, 0, 0, 1);
		}
		&:hover {
			svg {
				scale: 0.9;
			}
		}
		&:active {
			svg {
				scale: 0.8;
			}
		}
	}
	:global {
		.rotate_ms_extended_help {
			transform: translateY(2px) rotate(360deg) !important;
		}
	}
</style>
