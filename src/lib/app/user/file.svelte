<script lang="ts">
	import { createAvatar } from '@dicebear/core';
	import { notionists } from '@dicebear/collection';
	import { onMount } from 'svelte';
	import { frame_collection } from '$lib/main_screen/collection/window';
	const result = [
		{
			// user_id: 'aab3c6f3-7ef1-4131-b72e-91f22d28ef51',
			address: '4 Pwivet Dwive, W-Wittwe Whinging, Suwwey',
			email: 'hawwy.pottew@hogwawts.edu',
			firstname: 'Hawwywuvdebug',
			games: null,
			lastname: 'Pottew',
			// password: '$2a$10$uNjNHWRRR2No63jkB1ZJROW6zZMvkKfd6FnTD2C8PP.3wr40w14cu',
			phone: '+44123456789',
			username: 'Avada_Kedavwa_uwu'
		}
	][0];

	const result_game = [
		{
			Game_ID: 1,
			Image_path: './app/products/the-last-of-us',
			Name: 'The Last of Us'
		},
		{
			Game_ID: 2,
			Image_path: './app/products/fortnite',
			Name: 'Fortnite'
		},
		{
			Game_ID: 3,
			Image_path: './app/products/minecraft',
			Name: 'Minecraft'
		},
		{
			Game_ID: 4,
			Image_path: './app/products/overwatch',
			Name: 'Overwatch'
		}
	];

	let avatar: string | null = null;

	onMount(() => {
		if (result !== undefined) {
			avatar = createAvatar(notionists, {
				seed: result.username,
				size: 256
			}).toString();
		}
	});
</script>

<!-- Todo: làm file user và file payment -->
<!-- File user bao gồm họ tên tuổi blah blah -->
<!-- Todo: sau khi làm xong rồi xóa 2 cái string ở array frame collection -->
<!-- Todo: làm xong nữa thì làm tiếp manager -->
<div class="user">
	<div class="side1">
		<div class="logo">
			{@html avatar !== null ? avatar : 'loading...'}
		</div>
		<hr />
		<h1 class="fl_name">{result?.firstname} {result?.lastname}</h1>
		<p class="username">"{result?.username}"</p>
		<h2 class="contact">User infomation:</h2>
		<p class="phone">📱: {result?.phone}</p>
		<p class="address">🏠: {result?.address}</p>
	</div>
	<div class="side2">
		<div class="part1">
			<h1 class="header">Library</h1>
			<div class="list">
				{#each result_game as i}
					<div class="game" style="background-image: url('{i.Image_path}/logo/1.jpg');">
						<button
							class="go"
							on:click={() => {
								frame_collection.update((n) => {
									if (!n.includes(`product / ${i.Name}-${i.Game_ID}`)) {
										const pos = n.indexOf(null);
										if (pos === -1) {
											n.push(`product / ${i.Name}-${i.Game_ID}`);
										} else {
											n[pos] = `product / ${i.Name}-${i.Game_ID}`;
										}
									}
									return n;
								});
							}}
						>
							<svg xmlns="http://www.w3.org/2000/svg" height="40" viewBox="0 96 960 960" width="40">
								<path
									d="m670.833 362.333-408.5 406.334q-2.789 2.833-7.478 2.833-4.688 0-7.522-2.939-2.833-2.938-2.833-7.833t2.833-7.728l406.334-407.833H278q-5.267 0-8.217-2.998-2.95-2.997-2.95-8.333t2.95-8.586Q272.733 322 278 322h388q12.067 0 20.033 7.967Q694 337.933 694 350v388q0 5.267-3.414 8.217-3.413 2.95-8.75 2.95-5.336 0-8.169-2.95-2.834-2.95-2.834-8.217V362.333Z"
								/>
							</svg>
						</button>
					</div>
				{/each}
			</div>
		</div>
	</div>
</div>

<style lang="scss">
	.user {
		height: 100%;
		position: relative;
		overflow: hidden;
		display: flex;
		font-family: var(--font_family);
		color: #fafafa;
		.side1,
		.side2 {
			position: relative;
			height: 100%;
			width: 50%;
		}
		.side1 {
			max-width: 480px;
			width: 40%;
			border-right: 1px solid #fafafa;
			overflow: hidden;
			overflow-y: auto;
			scrollbar-width: thin;
			scrollbar-color: #fafafa #1a1a1a;
			&::-webkit-scrollbar {
				width: 8px;
				border: 1px solid #1a1a1a;
				border-radius: 100px;
			}
			&::-webkit-scrollbar-thumb {
				background-color: #fafafa;
				border: 1px solid #1a1a1a;
				border-radius: 100px;
			}
			.logo {
				position: relative;
				left: 50%;
				transform: translateX(-50%);
				max-height: 256px;
				max-width: 256px;
				width: 100%;
				aspect-ratio: 1;
				// background-color: red;
				display: flex;
				justify-content: center;
				align-items: center;
				color: #fafafa;
				overflow: hidden;
			}
			hr {
				width: 100%;
				margin: 0 auto;
				border-bottom: 1px solid #fafafa;
				margin-bottom: 16px;
			}
			.username,
			.fl_name,
			.phone,
			.address,
			.contact {
				margin: 0 16px;
			}
			.fl_name {
				font-size: 24px;
				font-weight: 900;
				color: transparent;
				-webkit-text-stroke: 1px #fafafa;
				word-wrap: break-word;
				line-height: 1.2;
				margin-bottom: 8px;
			}
			.username {
				word-wrap: break-word;
				line-height: 1.2;
				margin-bottom: 32px;
				color: #747c88;
			}
			.contact {
				margin-bottom: 8px;
				font-size: 16px;
			}
			.phone,
			.address {
				margin-bottom: 8px;
				line-height: 1.2;
				font-size: 14px;
			}
		}
		.side2 {
			flex: 1;
			overflow: hidden;
			.part1 {
				position: relative;
				height: 100%;
				width: 100%;
				.header {
					margin: 32px;
					font-size: 24px;
					font-weight: 900;
					color: transparent;
					-webkit-text-stroke: 1px #fafafa;
				}
				.list {
					height: calc(100% - 56px);
					width: 100%;
					padding: 0 32px 32px 32px;
					display: flex;
					flex-wrap: wrap;
					gap: 8px;
					align-content: flex-start;
					overflow: hidden;
					overflow-y: auto;
					scrollbar-width: thin;
					scrollbar-color: #fafafa #1a1a1a;
					&::-webkit-scrollbar {
						width: 8px;
						border: 1px solid #1a1a1a;
						border-radius: 100px;
					}
					&::-webkit-scrollbar-thumb {
						background-color: #fafafa;
						border: 1px solid #1a1a1a;
						border-radius: 100px;
					}
					.game {
						position: relative;
						min-width: 120px;
						width: 30%;
						max-width: 200px;
						aspect-ratio: 1;
						background: center center no-repeat fixed;
						background-size: cover;
						border-radius: 6px;
						border: 1px solid transparent;
						transition: all 0.3s cubic-bezier(0, 1, 0, 1);
						overflow: hidden;
						&:hover {
							border-color: #fafafa; // will remove this when adding code to dynamic cursor
							.go {
								opacity: 1;
								backdrop-filter: blur(calc((1vw + 1vh) / 2));
							}
						}
						&:active {
							transform: scale(0.95);
						}
						.go {
							background-color: transparent;
							height: 100%;
							width: 100%;
							border-radius: 6px;
							overflow: hidden;
							opacity: 0;
							cursor: none;
							transition: all 0.3s cubic-bezier(0, 0, 0, 1), backdrop-filter 0s;
							svg {
								fill: #fafafa;
								transition: all 0.3s cubic-bezier(0, 1, 0, 1);
							}
							&:hover {
								svg {
									transform: translate(-8px, 8px);
									transition-delay: 0.6s;
								}
							}
							&:active {
								svg {
									transform: translate(0, 0);
									transition-delay: 0s;
								}
							}
						}
					}
				}
			}
		}
	}
</style>
