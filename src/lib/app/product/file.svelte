<script lang="ts">
	// import { are_there_maximized_app } from '$lib/main_screen/are_there_maximized_app/script';
	import { frame_collection } from '$lib/main_screen/collection/window';
	import { onMount } from 'svelte';
	import Search from './search/file.svelte';
	import Search2 from './search/search2.svelte';
	// export let parent: string;

	const test = [
		{
			ID: 6,
			Genre: 'Action',
			Price: 59.99,
			Rate: 4.5,
			Description:
				"Assassin's Creed Odyssey is an action role-playing video game developed by Ubisoft Quebec and published by Ubisoft. Set in the year 431 BCE the plot tells a fictional history of the Peloponnesian War between Athens and Sparta.",
			Image_path: './main_screen/products/assassins-creed-odyssey.jpg',
			Name: "Assassin's Creed Odyssey",
			Subtitle: 'Choose your fate and become a legendary Spartan hero.'
		},
		{
			ID: 11,
			Genre: 'Platformer',
			Price: 59.99,
			Rate: 4.800000190734863,
			Description:
				"Super Mario Odyssey is a platform game developed and published by Nintendo. It's the 19th title in the Super Mario series and follows Mario and Cappy - a sentient hat that allows Mario to control other characters and objects on a quest to save Princess Peach from Bowser's wedding plans.",
			Image_path: './main_screen/products/super-mario-odyssey.jpg',
			Name: 'Super Mario Odyssey',
			Subtitle: 'Join Mario on a massive, globe-trotting 3D adventure!'
		},
		{
			ID: 2,
			Genre: 'Battle Royale',
			Price: 0,
			Rate: 4.5,
			Description:
				'Fortnite is a free-to-play battle royale game where players fight to be the last person or team standing on a shrinking island.',
			Image_path: './main_screen/products/fortnite.jpg',
			Name: 'Fortnite',
			Subtitle: 'Last one standing wins in this multiplayer game.'
		},
		{
			ID: 3,
			Genre: 'Sandbox',
			Price: 26.95,
			Rate: 4,
			Description:
				'Minecraft is a sandbox game where players can build structures and explore a randomly generated world made up of blocks of various materials.',
			Image_path: './main_screen/products/minecraft.jpg',
			Name: 'Minecraft',
			Subtitle: 'Build and explore in this block-based world.'
		},
		{
			ID: 5,
			Genre: 'Multiplayer Online Battle Arena',
			Price: 0,
			Rate: 4,
			Description:
				'League of Legends is a free-to-play multiplayer online battle arena game where players compete as champions with unique abilities and strategic styles.',
			Image_path: './main_screen/products/league-of-legends.jpg',
			Name: 'League of Legends',
			Subtitle: 'A strategic team-based game with global appeal.'
		},
		{
			ID: 12,
			Genre: 'Action-Adventure',
			Price: 19.99,
			Rate: 4.900000095367432,
			Description:
				"God of War is an action-adventure game developed by Santa Monica Studio and published by Sony Interactive Entertainment. It's the eighth installment in the God of War series and a soft reboot for the franchise. The game follows Kratos - a former Greek God of War - and his young son Atreus as they venture into the Norse wilds in order to fulfill a promise.",
			Image_path: './main_screen/products/god-of-war.jpg',
			Name: 'God of War',
			Subtitle: "Kratos is back and he's now accompanied by his son Atreus."
		},
		{
			ID: 8,
			Genre: 'Action-Adventure',
			Price: 29.99,
			Rate: 4.699999809265137,
			Description:
				'Grand Theft Auto V is an action-adventure game developed by Rockstar North and published by Rockstar Games. The game is set in the fictional state of San Andreas - based on Southern California and follows three criminals and their efforts to commit heists while under pressure from a government agency.',
			Image_path: './main_screen/products/gta-v.jpg',
			Name: 'Grand Theft Auto V',
			Subtitle:
				'Explore the stunning world of Los Santos and Blaine County in the ultimate Grand Theft Auto V experience.'
		},
		{
			ID: 4,
			Genre: 'First-Person Shooter',
			Price: 39.99,
			Rate: 4.5,
			Description:
				'Overwatch is a team-based first-person shooter game where players work together to achieve objectives while battling against the enemy team.',
			Image_path: './main_screen/products/overwatch.jpg',
			Name: 'Overwatch',
			Subtitle: 'Fight for the future in this team-based shooter.'
		},
		{
			ID: 1,
			Genre: 'Action-Adventure',
			Price: 59.99,
			Rate: 4.5,
			Description:
				'In The Last of Us players control Joel - a smuggler tasked with escorting a teenage girl Ellie across a post-apocalyptic United States.',
			Image_path: './main_screen/products/tlu.jpg',
			Name: 'The Last of Us',
			Subtitle: 'A story of survival in a post-apocalyptic world.'
		},
		{
			ID: 9,
			Genre: 'Action-Adventure',
			Price: 59.99,
			Rate: 4.900000095367432,
			Description:
				"Red Dead Redemption 2 is an action-adventure game developed and published by Rockstar Games. It's the third entry in the Red Dead series and a prequel to the 2010 game Red Dead Redemption. The game is set in a fictionalized version of the American Old West in 1899 and follows outlaw Arthur Morgan - a member of the Van der Linde gang.",
			Image_path: './main_screen/products/red-dead-redemption-2.jpg',
			Name: 'Red Dead Redemption 2',
			Subtitle: 'Live the life of an outlaw in the Wild West.'
		},
		{
			ID: 10,
			Genre: 'Action-Adventure',
			Price: 19.99,
			Rate: 4.800000190734863,
			Description:
				'Horizon Zero Dawn is an action role-playing game developed by Guerrilla Games and published by Sony Interactive Entertainment. The game is set in a post-apocalyptic world where humans live in tribes and hunt robotic creatures for resources. The player controls Aloy - a young hunter who sets out to uncover her past.',
			Image_path: './main_screen/products/horizon-zero-dawn.jpg',
			Name: 'Horizon Zero Dawn',
			Subtitle: 'Unleash devastating tactical attacks against unique Machines and rival tribes.'
		},
		{
			ID: 7,
			Genre: 'Action-Adventure',
			Price: 59.99,
			Rate: 4.800000190734863,
			Description:
				"The Legend of Zelda: Breath of the Wild is an action-adventure game developed and published by Nintendo. It's the 19th main installment in The Legend of Zelda series. The game takes place in a large open world environment and features nonlinear gameplay which allows players to explore and progress through the story at their own pace.",
			Image_path: './main_screen/products/breath-of-the-wild.jpg',
			Name: 'The Legend of Zelda: Breath of the Wild',
			Subtitle: 'Discover a world as never before!'
		}
	].sort((a, b) => {
		return a.ID - b.ID;
	});

	let product: HTMLElement | undefined = undefined;
	let eof: HTMLElement;

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

		return () => {
			observer.disconnect();
		};
	});
	let timeout: string | number | NodeJS.Timeout | undefined;
	const product_scroll = (e: WheelEvent) => {
		const product = e.currentTarget as HTMLDivElement;
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
</script>

<div
	class="product product_content_file"
	bind:this={product}
	on:wheel|preventDefault={product_scroll}
>
	<div class="the_end" bind:this={eof}>
		<Search2 />
	</div>
	{#each test as a}
		<div class="product_container product_not_visible">
			<div class="wallpaper" />
			<div class="info">
				<h1 class="genre">#{a.Genre} | {a.Rate.toFixed(2).replace(/\.?0+$/, '')} / 5</h1>
				<div class="logo" />
				<div class="title_subtitle">
					<h1 class="title">{a.Name}</h1>
					<h2 class="subtitle">{a.Subtitle}</h2>
					<div class="learnmore_price">
						<button
							class="learnmore"
							on:click|preventDefault={() => {
								frame_collection.update((frame) => {
									if (frame.includes(`product / ${a.Name}-${a.ID}`)) return frame;
									frame = [...frame, `product / ${a.Name}-${a.ID}`];
									return frame;
								});
							}}>Learn More</button
						>
						<button class="price">{a.Price === 0 ? `Free` : `$${a.Price.toFixed(2)}`}</button>
					</div>
				</div>
			</div>
		</div>
	{/each}
	<div class="the_end" bind:this={eof}>
		<Search />
	</div>
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
			width: calc(100% - 64px);
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
				background: url('./main_screen/ms.jpg') no-repeat center fixed; // test demo
				background-size: cover;
				filter: grayscale(100%);
				transition: 0.3s cubic-bezier(0, 0, 0, 1);
				&:before {
					content: '';
					position: absolute;
					top: 0;
					left: 0;
					width: 100%;
					height: 100%;
					backdrop-filter: contrast(0.5);
					background-color: rgba(26, 26, 26, 0.5);
					transition: 0.3s cubic-bezier(0, 0, 0, 1);
				}
			}
			&:hover {
				.wallpaper {
					filter: grayscale(0%);
					&::before {
						backdrop-filter: contrast(1);
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
					background-color: #6e6e6e;
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
