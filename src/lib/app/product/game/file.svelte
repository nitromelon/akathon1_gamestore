<script lang="ts">
	import { onMount } from 'svelte';

	export let id: number;
	let text: string = 'Add to cart';
	const result = {
		Genre: 'Action-Adventure',
		Game_ID: 1,
		Description:
			'In The Last of Us players control Joel - a smuggler tasked with escorting a teenage girl Ellie across a post-apocalyptic United States.',
		Image_path: './app/products/the-last-of-us',
		Name: 'The Last of Us',
		Price: 59.99,
		Rate: 4.5,
		Subtitle: 'A story of survival in a post-apocalyptic world.'
	};
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
		if (localStorage.getItem('cart') !== null) {
			const cart = JSON.parse(localStorage.getItem('cart') as string);
			if (cart.includes(id)) {
				text = 'Added';
			}
		}
	});
</script>

<div class="content">
	<div
		class="fixed_background"
		style="background-image: url('{result.Image_path}/background/{Math.floor(Math.random() * 5) +
			1}.jpg');"
	>
		<div class="filter" />
		<h1
			class="hero_text"
			style="background-image: url('{result.Image_path}/background/{Math.floor(Math.random() * 5) +
				1}.jpg');"
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
				style="background-image: url('{result.Image_path}/logo/1.jpg');"
			/>
			<button
				class="buy"
				on:click|preventDefault={() => {
					handle_cart(id);
				}}
				on:mouseenter={() => {
					if (text === 'Added') {
						text = 'Remove';
					}
				}}
				on:mouseleave={() => {
					if (text === 'Remove') {
						text = 'Added';
					} else if (text === 'Removed') {
						text = 'Add to cart';
					}
				}}
			>
				{text}
			</button>
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
		</div>
	</section>
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
			}
		}
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
