<script lang="ts">
	export let id: number;
	const result = {
		ID: 7,
		Genre: 'Action-Adventure',
		Price: 59.99,
		Rate: 4.800000190734863,
		Description:
			"The Legend of Zelda: Breath of the Wild is an action-adventure game developed and published by Nintendo. It's the 19th main installment in The Legend of Zelda series. The game takes place in a large open world environment and features nonlinear gameplay which allows players to explore and progress through the story at their own pace.",
		Image_path: './main_screen/products/breath-of-the-wild.jpg',
		Name: 'The Legend of Zelda: Breath of the Wild',
		Subtitle: 'Discover a world as never before!'
	};
</script>

<div class="content">
	<div class="fixed_background">
		<div class="filter" />
		<h1 class="hero_text">
			{#each result.Name.split(' ') as p}
				<span class="letter">{p} </span>
			{/each}
		</h1>
		<p class="subtitle">"{result.Subtitle}""</p>
		<p class="id">ID: {result.ID}</p>
		<div class="line" />
	</div>
	<section class="page2">
		<h1 class="gamename">{result.Name}</h1>
		<button class="buy">Add to cart</button>
		<div class="logo logo_detail_game_product" />
		<div class="vertical_line" />
		<div class="des">
			<h2 class="des_intro">Description:</h2>
			<p class="description description_detail_game_product">"{result.Description}"</p>
			<h2 class="des_intro">Genre:</h2>
			<p class="description">{result.Genre}</p>
			<h2 class="des_intro">Price:</h2>
			<p class="description">{result.Price === 0 ? 'Free' : '$' + result.Price.toString()}</p>
			<h2 class="des_intro">Rate:</h2>
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
			background: url('./main_screen/ms.jpg') no-repeat center center fixed;
			background-size: cover;
			.filter {
				position: absolute;
				top: 0;
				left: 0;
				height: 100%;
				width: 100%;
				background-color: rgba(26, 26, 26, 0.5);
				backdrop-filter: grayscale(1) contrast(0.5) blur(1vw);
			}
			.hero_text {
				background: url('./main_screen/ms.jpg') no-repeat center center fixed;
				background-size: cover;
				-webkit-background-clip: text;
				-webkit-text-fill-color: transparent;
				font-family: var(--font_family);
				font-size: 48px;
				font-weight: 900;
				color: transparent;
				background-clip: text;
				z-index: 2;
				-webkit-text-stroke: 0.25px #fafafa;
				transition: all 0.3s cubic-bezier(0, 0, 0, 1);
				line-height: 1.2;
				text-align: center;
				&:hover {
					.letter {
						-webkit-text-fill-color: #2c2c2c;
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
			justify-content: center;
			gap: 32px;
			.gamename {
				position: absolute;
				top: 32px;
				left: 32px;
				width: 224px;
				font-size: 12px;
				color: #fafafa;
				white-space: nowrap;
				overflow: hidden;
				text-overflow: ellipsis;
				text-align: center;
			}
			.buy {
				all: unset;
				position: absolute;
				bottom: 32px;
				left: calc(32px + 224px / 2 - 100px / 2);
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
					left: calc(32px + 224px / 2 - 90px / 2);
					transform: scale(0.975);
					transition: all 0.3s cubic-bezier(0, 1, 0, 1);
				}
			}
			.logo {
				position: relative;
				min-width: 224px;
				height: 224px;
				background: grey no-repeat center fixed;
				background-size: cover;
				border-radius: 6px;
				&:hover {
					outline: 1px solid #fafafa;
					transition: outline 0.3s cubic-bezier(0, 0, 0, 1);
				}
			}
			.vertical_line {
				height: 100%;
				width: 1px;
				background-color: #fafafa;
			}
			.des {
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
