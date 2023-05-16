<script lang="ts">
	// import { are_there_maximized_app } from '$lib/main_screen/are_there_maximized_app/script';
	import { frame_collection } from '$lib/main_screen/collection/window';
	import { onDestroy, onMount } from 'svelte';
	import Search from './search/file.svelte';
	import Search2 from './search/search2.svelte';
	import { bought_games, product_arr } from './product';
	import { bg } from './bought_game';
	import { signup_user } from '$lib/main_screen/navigation/change_text';
	import { getGame } from './getGame';
	// export let parent: string;
	type App = {
		Game_ID: number;
		Genre: string;
		Price: number;
		Rate: number;
		Image_path: string;
		Name: string;
		Subtitle: string;
	};

	$: test = $product_arr;
	let product: HTMLElement | undefined = undefined;

	onMount(() => {
		const first_element = product?.children[1] as HTMLDivElement | undefined;
		if (first_element !== undefined && product !== undefined) {
			product.scrollLeft = first_element.offsetLeft;
		}

		const observer = new ResizeObserver((entries) => {
			for (let entry of entries) {
				let target = entry.target as HTMLDivElement;
				if (target.classList.contains('product_content_file')) {
					let closest_element: HTMLDivElement | undefined = undefined;
					for (let i = 0; i < target.children.length; i++) {
						let child = target.children[i] as HTMLDivElement;
						if (closest_element === undefined) {
							closest_element = child;
						} else {
							if (
								Math.abs(child.offsetLeft - target.scrollLeft) <
								Math.abs(closest_element.offsetLeft - target.scrollLeft)
							) {
								closest_element = child;
							}
						}
					}
					if (closest_element !== undefined) {
						target.scrollTo({
							left: closest_element.offsetLeft
						});
					}
				}
			}
		});
		observer.observe(product as HTMLDivElement);

		getGame();

		bg();
	});
	let timeout: ReturnType<typeof setTimeout> | undefined = undefined;
	const product_scroll = (e: WheelEvent) => {
		const product = e.currentTarget as HTMLDivElement;
		if (
			e.target === document.getElementById('product_search_protip') ||
			(e.target instanceof HTMLElement &&
				e.target.parentNode === document.getElementById('game_list_product_page'))
		) {
			return;
		}
		product.scrollLeft += e.deltaY;
		if (e.deltaY > 0) {
			clearTimeout(timeout);
			for (let i = 0; i < product.children.length; i++) {
				let child = product.children[i] as HTMLDivElement;
				if (child.offsetLeft >= product.scrollLeft) {
					product.scrollTo({
						left: child.offsetLeft,
						behavior: 'smooth'
					});
					// child.classList.add('product_not_visible');
					break;
				} else {
					// child.classList.remove('product_not_visible');
				}
			}
		} else {
			for (let i = product.children.length - 1; i >= 0; i--) {
				let child = product.children[i] as HTMLDivElement;
				if (child.offsetLeft <= product.scrollLeft) {
					product.scrollTo({
						left: child.offsetLeft,
						behavior: 'smooth'
					});
					// child.classList.add('product_not_visible');
					break;
				} else {
					timeout = setTimeout(() => {
						// child.classList.remove('product_not_visible');
					}, 300);
				}
			}
		}

		if (product.scrollLeft + product.clientWidth >= product.scrollWidth) {
			product.scrollLeft = 0;
		} else if (product.scrollLeft <= 0) {
			product.scrollLeft = product.scrollWidth;
		}
	};

	// $: {
	// 	if ($are_there_maximized_app.has(parent)) {
	// 		if (product !== undefined) {
	// 			for (let i = 0; i < product?.children.length; i++) {
	// 				let child = product?.children[i] as HTMLDivElement;
	// 				console.log(child);
	// 				child.classList.add('product_not_visible');
	// 			}
	// 		}
	// 	} else {
	// 		if (product !== undefined) {
	// 			for (let i = 0; i < product?.children.length; i++) {
	// 				let child = product?.children[i] as HTMLDivElement;
	// 				child.classList.add('product_not_visible');
	// 			}
	// 		}
	// 	}
	// }
	$: result_array = test.map((a) => {
		return a.Price === 0 ? `Free` : `$${a.Price?.toFixed(2)}`;
	});

	const handle_cart = (id: number) => {
		if ($bought_games.has(id)) {
			return;
		}
		if (localStorage.getItem('cart') === null) {
			localStorage.setItem('cart', JSON.stringify([]));
		}
		let cart: Array<number> = JSON.parse(localStorage.getItem('cart') as string);
		if (!cart.includes(id)) {
			cart.push(id);
			localStorage.setItem('cart', JSON.stringify(cart));
			result_array[id - 1] = `Added`;
		} else {
			frame_collection.update((n) => {
				if (!n.includes('payment')) {
					const pos = n.indexOf(null);
					if (pos === -1) {
						n.push('payment');
					} else {
						n[pos] = 'payment';
					}
				}
				return n;
			});
		}
	};

	const mouseenter_btn = (i: number, a: App) => {
		if ($bought_games.has(a.Game_ID)) {
			return;
		}
		result_array[i] = `Add to cart`;
		if (localStorage.getItem('cart') !== null) {
			let cart: Array<number> = JSON.parse(localStorage.getItem('cart') as string);
			if (cart.includes(a.Game_ID)) {
				result_array[i] = `Purchase`;
			}
		}
	};

	const mouseleave_btn = (i: number, a: App) => {
		if ($bought_games.has(a.Game_ID)) {
			return;
		}
		result_array[i] = a.Price === 0 ? `Free` : `$${a.Price.toFixed(2)}`;
		if (localStorage.getItem('cart') !== null) {
			let cart: Array<number> = JSON.parse(localStorage.getItem('cart') as string);
			if (cart.includes(a.Game_ID)) {
				result_array[i] = `Added`;
			}
		}
	};

	onMount(() => {
		if (localStorage.getItem('cart') !== null) {
			let cart: Array<number> = JSON.parse(localStorage.getItem('cart') as string);
			for (let i = 0; i < cart.length; i++) {
				const id = cart[i];
				if (id !== undefined) {
					result_array[id - 1] = `Added`;
				}
			}
		}
	});

	onDestroy(() => {
		$product_arr = [];
	});
</script>

<div class="product product_content_file" bind:this={product} on:wheel|passive={product_scroll}>
	<div class="the_end"><Search2 /></div>
	{#each test as a, i}
		<div class="product_container product_not_visible" id="product_list_game{a.Game_ID}">
			<div
				class="wallpaper"
				style="background-image: url('{a.Image_path}/background/{Math.floor(Math.random() * 5) +
					1}.webp');"
			/>
			<div class="info">
				<h1 class="genre">#{a.Genre} | {a.Rate.toFixed(2).replace(/\.?0+$/, '')} / 5</h1>
				<div class="logo" style="background-image: url('{a.Image_path}/logo/1.webp');" />
				<div class="title_subtitle">
					<h1 class="title">{a.Name}</h1>
					<h2 class="subtitle">{a.Subtitle}</h2>
					<div class="learnmore_price">
						<button
							class="learnmore"
							on:click|preventDefault={() => {
								frame_collection.update((n) => {
									if (!n.includes(`product / ${a.Name}-${a.Game_ID}`)) {
										const pos = n.indexOf(null);
										if (pos === -1) {
											n.push(`product / ${a.Name}-${a.Game_ID}`);
										} else {
											n[pos] = `product / ${a.Name}-${a.Game_ID}`;
										}
									}
									return n;
								});
							}}>Learn More</button
						>
						{#if $signup_user !== 'Admin'}
							<button
								class="price"
								style="pointer-events: {$bought_games.has(a.Game_ID) ? 'none' : 'auto'};"
								on:click|preventDefault={() => {
									handle_cart(a.Game_ID);
								}}
								on:mouseenter|preventDefault={() => {
									mouseenter_btn(i, a);
								}}
								on:mouseleave|preventDefault={() => {
									mouseleave_btn(i, a);
								}}
							>
								<p class="price" style="display:block">
									{$bought_games.has(a.Game_ID) ? 'Purchased' : result_array[i]}
								</p>
							</button>
						{/if}
					</div>
				</div>
			</div>
		</div>
	{/each}
	<div class="the_end"><Search /></div>
</div>

<style lang="scss">
	.product {
		position: relative;
		width: 100%;
		height: 100%;
		overflow: hidden;
		overflow-x: auto;
		white-space: nowrap;
		scrollbar-width: none;
		font-family: sans-serif;
		.product_container,
		.the_end {
			height: 100%;
			// width: calc(100% - 64px);
			width: 100%;
			position: relative;
			display: inline-block;
			overflow: hidden;
			white-space: normal;
		}
		.product_container::after {
			// border right
			content: '';
			position: absolute;
			top: 0;
			right: 0;
			width: 1px;
			height: 100%;
			background-color: #fafafa;
		}
		.product_container {
			.wallpaper {
				position: absolute;
				top: 0;
				left: 0;
				width: 100%;
				height: 100%;
				// background: url('./main_screen/ms.jpg') no-repeat center fixed;
				background: no-repeat center center fixed;
				background-size: cover;
				// filter: grayscale(100%);
				transition: 0.3s cubic-bezier(0, 0, 0, 1);
				&:before {
					content: '';
					position: absolute;
					top: 0;
					left: 0;
					width: 100%;
					height: 100%;
					// backdrop-filter: contrast(0.5);
					background-color: rgba(26, 26, 26, 0.5);
					// background-color: rgba(107, 91, 149, 0.7);
					transition: 0.3s cubic-bezier(0, 0, 0, 1);
				}
			}
			&:hover {
				.wallpaper {
					// filter: grayscale(0%);
					&::before {
						// backdrop-filter: contrast(1);
						backdrop-filter: blur(calc((1vw + 1vh) / 2));
						transition-delay: 1s;
					}
				}
			}
			.info {
				position: absolute;
				top: 0;
				left: 0;
				width: 100%;
				height: 100%;
				color: #fafafa;
				.genre {
					position: absolute;
					top: 32px;
					left: 32px;
					font-size: 18px;
					transform: translateX(56px);
					transition: transform 0.3s cubic-bezier(0, 0, 0, 1) 0.6s;
				}
				.logo {
					position: absolute;
					top: 50%;
					left: 32px;
					transform: translateY(calc(-100% - 4px)) translateX(64px);
					width: 128px;
					height: 128px;
					background: no-repeat center center fixed;
					background-size: cover;
					border-radius: 6px;
					transition: transform 0.3s cubic-bezier(0, 0, 0, 1) 0.5s;
				}
				.title_subtitle {
					position: absolute;
					top: calc(50% + 16px);
					left: 32px;
					height: calc(50% - 32px);
					width: fit-content;
					max-width: calc(100% - 64px);
					// overflow: hidden;
					.title {
						position: relative;
						font-size: 32px;
						font-weight: 900;
						min-height: 48px;
						max-height: 50%;
						// overflow: hidden;
						line-height: 1.2;
						margin: 0;
						padding: 0;
						-webkit-text-stroke: 1px #fafafa;
						color: transparent;
						transform: translateX(72px);
						transition: transform 0.3s cubic-bezier(0, 0, 0, 1) 0.4s;
						margin-bottom: 8px;
					}
					.subtitle {
						position: relative;
						color: #b0b0b0;
						font-size: 16px;
						max-width: 60%;
						// overflow: hidden;
						line-height: 1.2;
						transform: translateX(80px);
						transition: transform 0.3s cubic-bezier(0, 0, 0, 1) 0.3s;
					}
					.learnmore_price {
						margin-top: 16px;
						position: relative;
						display: flex;
						flex-direction: row;
						align-items: center;
						column-gap: 16px;
						transform: translateX(88px);
						transition: transform 0.3s cubic-bezier(0, 0, 0, 1) 0.2s;
						button {
							all: unset;
							color: #b0b0b0;
							padding: 8px 16px;
							border: 1px solid #b0b0b0;
							border-radius: 6px;
							transition: 0.3s cubic-bezier(0, 0, 0, 1), transform 0.3s cubic-bezier(0, 1, 0, 1);
							&:hover {
								border-color: #fafafa;
								color: #fafafa;
							}
							&:active {
								transform: scale(0.95);
							}
						}
						.price {
							background-color: #fafafa;
							color: #1a1a1a;
							display: flex;
							align-items: center;
							justify-content: center;
							overflow: hidden;
							&:hover {
								background-color: #ffffff;
								color: #1a1a1a;
							}
						}
					}
				}
			}
		}
		&::-webkit-scrollbar {
			display: none;
		}
	}

	:global {
		.product_not_visible {
			.info {
				.genre {
					transform: translateX(0) !important;
				}
				.logo {
					transform: translateY(calc(-100% - 4px)) translateX(0) !important;
				}
				.title_subtitle {
					.title {
						transform: translateX(0) !important;
					}
					.subtitle {
						transform: translateX(0) !important;
					}
					.learnmore_price {
						transform: translateX(0) !important;
					}
				}
			}
		}
	}
</style>
