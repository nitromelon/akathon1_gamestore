<script lang="ts">
	import { onMount } from 'svelte';
	import { bg } from '../bought_game';
	import { bought_games } from '../product';
	import { signup_user } from '$lib/main_screen/navigation/change_text';

	export let id: number;
	let text: string = 'Add to cart';
	let array_comments: Array<Comment> = [];
	type App = {
		Genre: string;
		Game_ID: number;
		Description: string;
		Image_path: string;
		Name: string;
		Price: number;
		Rate: number;
		Subtitle: string;
	};
	type Comment = {
		rating: number;
		review: string;
	};
	let result: App | undefined = undefined;
	const handle_cart = (id: number) => {
		if (localStorage.getItem('cart') === null) {
			localStorage.setItem('cart', JSON.stringify([]));
		}
		let cart = JSON.parse(localStorage.getItem('cart') as string);
		if (!cart.includes(id)) {
			cart.push(id);
			localStorage.setItem('cart', JSON.stringify(cart));
			text = 'Added';
		} else {
			cart = cart.filter((item: number) => item !== id);
			localStorage.setItem('cart', JSON.stringify(cart));
			text = 'Removed';
		}
	};

	onMount(() => {
		fetch(`http://localhost:3000/get/${id}`).then((res) => {
			res.json().then((data) => {
				result = data.data;
			});
		});
		if (localStorage.getItem('cart') !== null) {
			const cart = JSON.parse(localStorage.getItem('cart') as string);
			if (cart.includes(id)) {
				text = 'Added';
			}
		}
		bg();
		fetch(`http://localhost:3000/games/${id}/reviews`, {
			method: 'GET',
			credentials: 'include'
		})
			.then((res) => res.json())
			.then((data) => {
				if (data.result) {
					// array_comments = data.data;
					console.log(array_comments);
				}
			})
			.catch((err) => {
				console.log(err);
			});
	});

	let current_star: number = 0;
	let pinned_star: number | null = null;
	let old_star: number = 0;
	$: if (pinned_star !== null) {
		old_star = pinned_star;
	}
	let my_review: string = '';

	// const test_string_time = '2023-05-10T19:23:14.628Z';
	// const test_string = test_string_time.replace(/[-T.:Z]/g, ' ').split(' ').slice(0, -3); // 2023 05 10 19 23
	// console.table(
	// 	{
	// 		"year": test_string[0],
	// 		"month": test_string[1],
	// 		"day": test_string[2],
	// 		"hour": test_string[3],
	// 		"minute": test_string[4]
	// 	}
	// );
</script>

<div class="content">
	{#if result !== undefined}
		<div
			class="fixed_background"
			style="background-image: url('{result.Image_path}/background/{Math.floor(Math.random() * 5) +
				1}.webp');"
		>
			<div class="filter" />
			<h1
				class="hero_text"
				style="background-image: url('{result.Image_path}/background/{Math.floor(
					Math.random() * 5
				) + 1}.webp');"
			>
				{#each result.Name.split(' ') as p}
					<span class="letter">{p} </span>
				{/each}
			</h1>
			<p class="subtitle">"{result.Subtitle}""</p>
			<p class="id">ID: {result.Game_ID}</p>
			<div class="line" />
		</div>
		<section class="page2">
			<div class="part1">
				<h1 class="gamename">{result.Name}</h1>
				<div
					class="logo logo_detail_game_product"
					style="background-image: url('{result.Image_path}/logo/1.webp');"
				/>
				{#if $signup_user !== 'Admin'}
					<button
						class="buy"
						style="pointer-events: {$bought_games.has(id) ? 'none' : 'auto'};"
						on:click|preventDefault={() => {
							if ($bought_games.has(id)) {
								return;
							}
							handle_cart(id);
						}}
						on:mouseenter={() => {
							if ($bought_games.has(id)) {
								return;
							}
							if (text === 'Added') {
								text = 'Remove';
							}
						}}
						on:mouseleave={() => {
							if ($bought_games.has(id)) {
								return;
							}
							if (text === 'Remove') {
								text = 'Added';
							} else if (text === 'Removed') {
								text = 'Add to cart';
							}
						}}
					>
						{$bought_games.has(id) ? 'Purchased' : text}
					</button>
				{:else}
					<br />
					<!-- Cheap hack due to display flex -->
				{/if}
			</div>
			<div class="vertical_line" />
			<div class="des">
				<h2 class="des_intro">Description:</h2>
				<p class="description description_detail_game_product">"{result.Description}"</p>
				<h2 class="des_intro">Genre:</h2>
				<p class="description">{result.Genre}</p>
				<h2 class="des_intro">Price:</h2>
				<p class="description">{result.Price === 0 ? 'Free' : '$' + result.Price.toString()}</p>
				<h2 class="des_intro">Overall rate:</h2>
				<p class="description bonus">{result.Rate.toFixed(2).replace(/\.?0+$/, '')} / 5</p>
				<p class="description star" style="--offset_width: calc({(result.Rate / 5) * 100}%)">
					{#each '⭐⭐⭐⭐⭐' as _}
						<p class="star_icon">⭐</p>
					{/each}
				</p>
				<h2 class="des_intro">Ratings and reviews:</h2>
				<div class="rating_n_review">
					{#each array_comments as r}
						<div class="rnr_container">
							<div class="p1">
								<div class="logo" />
								<div class="name_n_rate">
									<p class="name">Anonymous</p>
									<p class="rate">
										{#each Array(5)
											.fill(0)
											.map((_, i) => (i < r.rating ? 1 : 0)) as a}
											<p
												class="
												star_icon
												{a === 0 ? 'not_pinned_star' : ''}
											"
											>
												⭐
											</p>
										{/each}
									</p>
								</div>
							</div>
							<p class="p2">
								{r.review}
							</p>
							<p class="timeline">10:30 35/02/2077</p>
						</div>
					{/each}
					<div class="next_back">
						<button class="back">
							<svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 96 960 960" width="24">
								<path
									d="M543 780 368 605q-7-7-10-15t-3-15q0-8 3-15.5t10-14.5l175-175q10-10 19-10t19 10q10 10 10 19t-10 19L414 575l167 167q10 10 10 19t-10 19q-10 10-19 10t-19-10Z"
								/>
							</svg>
						</button>
						<p>1/5</p>
						<button class="next">
							<svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 96 960 960" width="24">
								<path
									d="M357 780q-9-9-9-19t9-19l167-167-167-167q-9-9-9-19t9-19q9-9 19-9t19 9l175 175q7 7 10 14.5t3 15.5q0 8-3 15.5T570 605L395 780q-9 9-19 9t-19-9Z"
								/>
							</svg>
						</button>
					</div>
				</div>
				{#if $signup_user !== 'Admin'}
					<form
						class="my_rnr"
						action="#"
						method="post"
						on:submit|preventDefault={() => {
							// handle_review(id);
							if (old_star === 0) return;
							alert(my_review);
							alert(old_star);
						}}
					>
						<div class="p1">
							<div class="logo" />
							<div class="n_r">
								<p class="name">UserName</p>
								<div
									class="rate"
									on:mouseout={() => {
										current_star = 0;
									}}
									on:blur={() => {
										current_star = 0;
									}}
								>
									{#each '⭐⭐⭐⭐⭐' as _, i}
										<button
											class="star_icon
									{pinned_star !== null ? (pinned_star > i ? 'pinned_star' : '') : ''}
									"
											on:mouseenter|preventDefault={() => {
												current_star = i + 1;
												pinned_star = null;
											}}
											on:click|preventDefault={() => {
												pinned_star = i + 1;
											}}
											on:mouseout={() => {
												if (pinned_star === null) {
													pinned_star = old_star;
												}
											}}
											on:blur={() => {
												if (pinned_star === null) {
													pinned_star = old_star;
												}
											}}
											on:dblclick|preventDefault={() => {
												pinned_star = null;
												old_star = 0;
											}}
											style="filter: grayscale({current_star <= i ? 100 : 0}%)"
										>
											⭐
										</button>
									{/each}
								</div>
							</div>
						</div>
						<div class="p2">
							<textarea
								name="review"
								id="review"
								cols="30"
								rows="10"
								placeholder="Write your review here..."
								class="text_area"
								maxlength="2000"
								bind:value={my_review}
							/>
							<input type="submit" value="Submit" class="submit" />
						</div>
					</form>
				{/if}
			</div>
		</section>
	{/if}
</div>

<style lang="scss">
	.content {
		position: absolute;
		top: 0;
		left: 0;
		height: 100%;
		width: 100%;
		overflow: hidden;
		overflow-y: auto;
		scrollbar-width: none;
		&::-webkit-scrollbar {
			display: none;
		}
		.fixed_background {
			position: sticky;
			top: 0;
			left: 0;
			height: 100%;
			width: 100%;
			display: flex;
			align-items: center;
			justify-content: center;
			flex-wrap: wrap;
			flex-direction: column;
			row-gap: 18px;
			padding: 32px;
			background: no-repeat center center fixed;
			background-size: cover;
			.filter {
				position: absolute;
				top: 0;
				left: 0;
				height: 100%;
				width: 100%;
				background-color: rgba(26, 26, 26, 0.5);
				// background-color: rgba(26, 26, 26, 0.5);
				backdrop-filter: blur(calc((1vw + 1vh) / 2));
				// backdrop-filter: grayscale(1) contrast(0.5) blur(1vw);
			}
			.hero_text {
				background: no-repeat center center fixed;
				background-size: cover;
				-webkit-background-clip: text;
				-webkit-text-fill-color: transparent;
				font-family: var(--font_family);
				font-size: 48px;
				font-weight: 900;
				color: transparent;
				background-clip: text;
				z-index: 2;
				-webkit-text-stroke: 1px #fafafa;
				transition: all 0.3s cubic-bezier(0, 0, 0, 1);
				line-height: 1.2;
				text-align: center;
				&:hover {
					.letter {
						-webkit-text-fill-color: #1a1a1a;
						&:hover {
							-webkit-text-fill-color: transparent;
						}
					}
				}
			}
			.subtitle {
				font-family: var(--font_family);
				font-size: 16px;
				font-weight: 100;
				color: #fafafa;
				text-align: center;
				width: 75%;
				line-height: 1.2;
				font-style: italic;
				z-index: 2;
			}
			.id {
				position: absolute;
				top: 16px;
				left: 16px;
				font-family: var(--font_family);
				writing-mode: vertical-lr;
				transform: rotate(180deg);
				font-size: 12px;
				color: #fafafa;
			}
			.line {
				position: absolute;
				bottom: 16px;
				right: 16px;
				height: 75px;
				width: 1px;
				&::after {
					content: '';
					position: absolute;
					width: 100%;
					background-color: #fafafa;
					border-radius: 100px;
					animation: slide 2s cubic-bezier(1, 0, 0, 1) forwards infinite;
				}
				&::before {
					content: 'scroll';
					position: absolute;
					transform: translate(-24px, 56px) rotate(-90deg);
					font-family: var(--font_family);
					font-size: 12px;
					color: #fafafa;
				}
			}
		}
		.page2 {
			position: relative;
			margin-top: 1px;
			height: 100%;
			width: 100%;
			padding: 0 32px;
			backdrop-filter: blur(2vw);
			z-index: 1;
			color: #1a1a1a;
			font-family: var(--font_family);
			outline: 1px solid #fafafa;
			display: flex;
			align-items: center;
			// justify-content: center;
			gap: 32px;
			.part1 {
				flex: 0.5;
				position: relative;
				height: 100%;
				width: 240px;
				display: flex;
				flex-direction: column;
				align-items: center;
				justify-content: space-between;
				.gamename {
					position: relative;
					width: 224px;
					font-size: 12px;
					color: #fafafa;
					white-space: nowrap;
					overflow: hidden;
					text-overflow: ellipsis;
					text-align: center;
					margin-top: 32px;
				}
				.buy {
					all: unset;
					margin-bottom: 32px;
					position: relative;
					width: 100px;
					padding: 8px 0;
					border-radius: 6px;
					border: 1px solid #fafafa;
					color: #fafafa;
					font-size: 14px;
					display: flex;
					align-items: center;
					justify-content: center;
					transition: all 0.3s cubic-bezier(0, 0, 0, 1);
					&:hover {
						background-color: #fafafa;
						border: 1px solid #1a1a1a;
						color: #1a1a1a;
					}
					&:active {
						width: 90px;
						transform: scale(0.975);
						transition: all 0.3s cubic-bezier(0, 1, 0, 1);
					}
				}
				.logo {
					position: relative;
					width: 224px;
					height: 224px;
					background: no-repeat center fixed;
					background-size: cover;
					border-radius: 6px;
					&:hover {
						outline: 1px solid #fafafa;
						transition: outline 0.3s cubic-bezier(0, 0, 0, 1);
					}
				}
			}
			.vertical_line {
				height: 100%;
				width: 1px;
				background-color: #fafafa;
			}
			.des {
				flex: 1;
				position: relative;
				height: calc(100% - 64px);
				overflow: hidden;
				overflow-y: auto;
				scrollbar-width: thin;
				overscroll-behavior: auto;
				color: #fafafa;
				padding-right: 16px;
				&::-webkit-scrollbar {
					width: 8px;
					border: 1px solid #1a1a1a;
					border-radius: 100px;
				}
				&::-webkit-scrollbar-thumb {
					border: 1px solid #fafafa;
					border-radius: 100px;
				}
				.description {
					font-size: 14px;
					line-height: 1.2;
					font-weight: 100;
					font-style: italic;
					margin-bottom: 32px;
					line-height: 1.25;
					color: #c7c7c7;
				}
				.bonus {
					margin-bottom: 4px;
				}
				.des_intro {
					font-size: 18px;
					margin-bottom: 8px;
				}
				.star {
					position: relative;
					font-style: normal;
					width: fit-content;
					.star_icon {
						display: inline;
						margin-left: 1px;
					}
					&::after {
						content: '';
						position: absolute;
						right: 0;
						top: 0;
						backdrop-filter: brightness(100);
						height: 100%;
						width: calc(100% - var(--offset_width));
					}
				}
				.rating_n_review {
					position: relative;
					width: 100%;
					height: fit-content;
					// background-color: red;
					margin-bottom: 32px;
					margin-top: 16px;
					.next_back {
						position: relative;
						width: 100%;
						height: 32px;
						display: flex;
						align-items: center;
						justify-content: space-between;
						button {
							all: unset;
							position: relative;
							box-sizing: border-box;
							height: 100%;
							width: 48px;
							border: 1px solid #fafafa;
							display: flex;
							align-items: center;
							justify-content: center;
							border-radius: 100px;
							transition: all 0.3s cubic-bezier(0, 0, 0, 1);
							svg {
								fill: #fafafa;
								transition: 0.3s cubic-bezier(0, 0, 0, 1);
							}
							&:hover {
								background-color: #fafafa;
								border: 1px solid #1a1a1a;
								color: #1a1a1a;
								svg {
									fill: #1a1a1a;
								}
							}
							&:active {
								transform: scale(0.9);
								transition: all 0.3s cubic-bezier(0, 1, 0, 1);
							}
						}
					}
				}
				.rnr_container {
					width: 100%;
					position: relative;
					height: fit-content;
					margin-bottom: 32px;
					.p1 {
						position: relative;
						width: 100%;
						height: 48px;
						display: flex;
						align-items: center;
						justify-content: space-between;
						margin-bottom: 8px;
						.logo {
							height: 100%;
							min-width: 48px;
							border: 1px solid #fafafa;
							border-radius: 50%;
							margin-right: 16px;
						}
						.name_n_rate {
							height: 100%;
							width: calc(100% - 64px);
							position: relative;
							display: flex;
							flex-direction: column;
							justify-content: space-evenly;
							.name {
								font-size: 16px;
								color: #fafafa;
								width: 100%;
								overflow: hidden;
								text-overflow: ellipsis;
								white-space: nowrap;
							}
							.rate {
								position: relative;
								font-size: 14px;
								color: #747c88;
								.star_icon {
									display: inline;
									margin-left: 1px;
								}
							}
						}
					}
					.p2 {
						line-height: 1.2;
						font-size: 14px;
					}
					.timeline {
						font-size: 12px;
						margin-top: 8px;
						color: #747c88;
					}
				}
				.my_rnr {
					width: 100%;
					position: relative;
					height: fit-content;
					margin-bottom: 32px;
					margin-top: 32px;
					.p1,
					.p2 {
						width: 100%;
						position: relative;
					}
					.p1 {
						display: flex;
						height: 48px;
						margin-bottom: 16px;
						.logo {
							height: 100%;
							min-width: 48px;
							border: 1px solid #fafafa;
							border-radius: 50%;
							margin-right: 16px;
						}
						.n_r {
							height: 100%;
							width: calc(100% - 64px);
							position: relative;
							display: flex;
							flex-direction: column;
							justify-content: space-evenly;
							.name {
								font-size: 16px;
								color: #fafafa;
								width: 100%;
								overflow: hidden;
								text-overflow: ellipsis;
								white-space: nowrap;
							}
							.rate {
								position: relative;
								font-size: 14px;
								color: #747c88;
								.star_icon {
									background: transparent;
									cursor: none;
									display: inline;
									margin-left: 1px;
									cursor: none;
									transition: 0.3s cubic-bezier(0, 0, 0, 1);
								}
							}
						}
					}
					.p2 {
						.text_area {
							all: unset;
							border: 1px solid #747c88;
							box-sizing: border-box;
							padding: 8px;
							border-radius: 6px;
							width: 100%;
							color: #747c88;
							transition: all 0.3s cubic-bezier(0, 0, 0, 1);
							overflow-wrap: break-word;
							line-height: 1.2;
							font-size: 14px;
							scrollbar-width: thin;
							scrollbar-color: #fafafa #1a1a1a;
							&::-webkit-scrollbar {
								width: 8px;
								border: 1px solid #1a1a1a;
								border-radius: 100px;
							}
							&::-webkit-scrollbar-thumb {
								border: 1px solid #fafafa;
								border-radius: 100px;
							}
							&:focus {
								border: 1px solid #fafafa;
								color: #fafafa;
							}
						}
						.submit {
							all: unset;
							border: 1px solid #fafafa;
							box-sizing: border-box;
							padding: 8px;
							border-radius: 6px;
							margin-top: 8px;
							transition: all 0.3s cubic-bezier(0, 0, 0, 1), transform 0.3s cubic-bezier(0, 1, 0, 1);

							&:hover {
								background-color: #fafafa;
								color: #1a1a1a;
							}
							&:active {
								transform: scale(0.9);
							}
						}
					}
				}
			}
		}
	}

	.pinned_star {
		filter: none !important;
	}
	.not_pinned_star {
		filter: grayscale(100%) !important;
	}

	*::selection {
		background: #fafafa;
		color: #1a1a1a;
	}

	@keyframes slide {
		0% {
			top: 0;
			height: 0;
		}
		33% {
			top: 0;
			height: 100%;
		}
		66% {
			bottom: 0;
			height: 100%;
		}
		100% {
			bottom: 0;
			height: 0;
		}
	}
</style>
