<script lang="ts">
	import { onMount } from 'svelte';
	import { is_search_keyword, num_total_games, product_arr } from '../product';
	import { total_games } from '$lib/app/function/total_games';
	import { page_th } from './split_by_4';
	onMount(() => {
		total_games();
	});

	// $: console.table(total_game, test);
	$: lg = $product_arr[$product_arr.length - 1]?.Game_ID;
	// const page_th = (a: number | undefined) =>
	// 	void 0 === a ? '#' : a % 4 > 0 ? (a - (a % 4)) / 4 + 1 : a / 4;
</script>

<div class="search">
	<h1 class="cata">Search 2/2</h1>
	<h2 class="header_text">That might not be the game you want?</h2>
	<p class="list_game">
		These are the games listed at the moment, if you still don't like it, you can press buttons
		below:
	</p>
	<div class="game_list" id="game_list_product_page">
		<!-- todo: Hiện kết quả của 1 trên 4 -->
		{#each $product_arr as owo}
			<div class="game">
				<div class="logo" style="background-image: url('{owo.Image_path}/logo/1.webp');" />
				<p class="name">
					{owo.Name}
				</p>
			</div>
		{/each}
		<p class="pof" style="display: {$is_search_keyword === false ? 'inline-block' : 'none'};">
			Page {$is_search_keyword === false ? page_th(lg) : '##'} out of {$is_search_keyword === false
				? page_th($num_total_games)
				: '###'}
		</p>
		<div class="buttons">
			<button
				class="btn"
				title="Have the game that was previously displayed."
				style="display: {$is_search_keyword === false ? 'inline-block' : 'none'};"
				on:click={() => {
					if (
						$is_search_keyword === false &&
						lg !== undefined &&
						parseInt(page_th(lg).toString()) > 1
					) {
						fetch(
							`http://localhost:3000/get?startIndex=${lg % 4 > 0 ? lg + 4 - (lg % 4) - 7 : lg - 7}`
						)
							.then((res) => res.json())
							.then((res) => {
								$product_arr = res.data;
							});
					}
				}}
			>
				Go back
			</button>
			<button
				class="btn"
				title="Go refreshing this current list"
				style="display: {$is_search_keyword === false ? 'inline-block' : 'none'};"
				on:click={() => {
					if (
						$is_search_keyword === false &&
						lg !== undefined &&
						parseInt(page_th(lg).toString()) < parseInt(page_th($num_total_games).toString())
					) {
						fetch(`http://localhost:3000/get?startIndex=${lg + 1}`)
							.then((res) => res.json())
							.then((res) => {
								$product_arr = res.data;
							});
					}
				}}
			>
				Go forward
			</button>
		</div>
	</div>
</div>

<style lang="scss">
	* {
		color: #fafafa;
	}
	.search {
		width: 100%;
		height: 100%;
		.cata {
			position: absolute;
			top: 32px;
			left: 32px;
			font-size: 12px;
			color: #fafafa;
		}
		.header_text {
			position: absolute;
			top: 64px;
			left: 32px;
			font-size: 18px;
			color: #fafafa;
		}
		.list_game {
			position: absolute;
			top: 92px;
			left: 32px;
			font-size: 12px;
			color: #747c88;
		}
		.game_list {
			position: absolute;
			top: 120px;
			left: 32px;
			height: calc(100% - 120px - 64px);
			width: calc(100% - 64px);
			overflow-y: auto;
			overflow-x: hidden;
			scrollbar-width: thin;
			&::-webkit-scrollbar {
				// display: none;
				width: 8px;
				border: 1px solid #1a1a1a;
				border-radius: 100px;
			}
			&::-webkit-scrollbar-thumb {
				border: 1px solid #fafafa;
				border-radius: 100px;
			}
			.game {
				position: relative;
				display: flex;
				height: 48px;
				width: 100%;
				align-items: center;
				gap: 16px;
				&:hover {
					.name {
						color: #747c88;
					}
					.logo {
						transform: rotate(360deg);
						border-radius: 100px;
					}
				}
				.logo {
					position: relative;
					height: 32px;
					width: 32px;
					background: no-repeat center center fixed;
					background-size: cover;
					border-radius: 6px;
					transition: 0.3s cubic-bezier(1, 0, 0, 1);
				}
				.name {
					transition: 0.3s cubic-bezier(0, 0, 0, 1);
				}
			}
			.pof {
				margin-top: 24px;
			}
			.buttons {
				position: relative;
				height: 32px;
				width: 100%;
				margin-top: 16px;
				.btn {
					all: unset;
					padding: 0 16px;
					height: 100%;
					border: 1px solid #fafafa;
					border-radius: 6px;
					color: #fafafa;
					font-size: 14px;
					transition: 0.3s cubic-bezier(0, 0, 0, 1);
					&:hover {
						background-color: #fafafa;
						color: #1a1a1a;
					}
					&:active {
						transform: scale(0.95);
						transition: transform 0.3s cubic-bezier(0, 1, 0, 1);
					}
					&:first-child {
						margin-right: 16px;
					}
				}
			}
		}
	}
</style>
