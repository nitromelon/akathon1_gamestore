<script lang="ts">
	import { frame_collection } from '$lib/main_screen/collection/window';
	import { onMount } from 'svelte';
	import { text_header } from '../login/header';
	import { bg } from '../product/bought_game';
	import { bought_games } from '../product/product';
	import { signup_user } from '$lib/main_screen/navigation/change_text';

	const cheatcode_visa = 'truck_god';
	const cheatcode_mastercard = 'the_search_for_milk_crates';
	const cheatcode_discover = 'my_parents_are_the_best';
	const cheatcode_jcb = 'osu_slayer';
	const cheatcode_diners_club = 'caviar_is_overrated';
	const cheatcode_american_express = 'I_wiww_definyitewy_steaw_pickwes_fwom_you';

	const current_year = parseInt(new Date().getFullYear().toString().slice(2));
	const current_month = new Date().getMonth() + 1;

	let form: HTMLFormElement;
	let payment: HTMLDivElement | undefined = undefined;

	type App = {
		Game_ID: number;
		Image_path: string;
		Name: string;
		Price: number;
	};

	// fetch result will be done by checking local storage
	let fetch_result: Array<App> = [];

	let id_collection: Array<number> = []; // for caching stuff
	$: yeet_uwu = fetch_result.filter((item) => id_collection?.includes(item.Game_ID));
	let nap_lan_dau = false;

	$: if ($signup_user === 'Admin' && payment !== undefined) {
		frame_collection.update((n) => {
			if (!n.includes('statistics')) {
				const pos = n.indexOf(null);
				if (pos === -1) {
					n.push('statistics');
				} else {
					n[pos] = 'statistics';
				}
			}
			return n;
		});
		payment.parentElement?.previousElementSibling?.childNodes[0]?.childNodes[0]?.dispatchEvent(
			new MouseEvent('click')
		);
	}

	onMount(() => {
		form.reset();
		bg();
		const cart = localStorage.getItem('cart');
		if (cart !== null && cart !== '[]') {
			nap_lan_dau = true;
			const data = JSON.parse(cart).filter((item: number) => !$bought_games.has(item));
			localStorage.setItem('cart', JSON.stringify(data));
			if (data.length === 0) {
				nap_lan_dau = false;
				return;
			}
			fetch('http://localhost:3000/get/payment', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					data
				})
			}).then((res) => {
				if (res.ok) {
					res.json().then((data) => {
						fetch_result = data.data;
						id_collection = JSON.parse(cart);
						console.error(fetch_result);
						nap_lan_dau = false;
					});
				} else {
					console.error('Network response was not ok.');
				}
			});
		}
		let old_value: string | null = null;
		const fake_reactive = setInterval(() => {
			if (nap_lan_dau) return;
			localStorage.setItem(
				'cart',
				JSON.stringify(
					JSON.parse(localStorage.getItem('cart') || '[]').filter(
						(item: number) => !$bought_games.has(item)
					)
				)
			);
			const cart = localStorage.getItem('cart');
			if (cart === old_value || cart === null) return;
			old_value = cart;
			const new_cart: Array<number> = JSON.parse(cart);
			if (new_cart.length > id_collection.length) {
				const new_item = new_cart.filter((item: number) => !id_collection?.includes(item));
				fetch(`http://localhost:3000/get/${new_item[0]}/payment`).then((res) => {
					if (res.ok) {
						res.json().then((data) => {
							fetch_result.push(data.data);
							id_collection = new_cart;
						});
					} else {
						console.error('Network response was not ok.');
					}
				});
				id_collection = new_cart;
			} else {
				fetch_result = fetch_result.filter((item) => new_cart.includes(item.Game_ID));
				id_collection = new_cart;
			}
		}, 100);
		return () => clearInterval(fake_reactive);
	});

	let part2 = false;
	$: {
		if (id_collection.length === 0) {
			part2 = false;
		}
	}

	const remove_from_cart = (id: number) => {
		id_collection = id_collection.filter((item) => item !== id);
		localStorage.setItem('cart', JSON.stringify(id_collection));
	};

	let warning: Array<String | false> = ['', '', '', ''];
	let current_box = 0;
	let card_name = '';
	let card_number = '';
	let exp_date = '';
	let cvv = '';
	let timeout: ReturnType<typeof setTimeout> | null = null;
	let typeof_card = '';
	let cvv_max_length = 0;

	$: {
		switch (card_name) {
			case cheatcode_visa:
				card_name = 'Visa Test Debug';
				card_number = '4249466177144090';
				exp_date = '12/25';
				cvv = '123';
				break;
			case cheatcode_mastercard:
				card_name = 'Mastercard Test Debug';
				card_number = '5476249807598088';
				exp_date = '12/25';
				cvv = '123';
				break;
			case cheatcode_discover:
				card_name = 'Discover Test Debug';
				card_number = '6504913972166518';
				exp_date = '12/25';
				cvv = '123';
				break;
			case cheatcode_jcb:
				card_name = 'Jcb Test Debug';
				card_number = '3563935868819269';
				exp_date = '12/25';
				cvv = '123';
				break;
			case cheatcode_diners_club:
				card_name = 'Diners Club Test Debug';
				card_number = '38999122087819';
				exp_date = '12/25';
				cvv = '123';
				break;
			case cheatcode_american_express:
				card_name = 'American Express Test Debug';
				card_number = '374245455400126';
				exp_date = '12/25';
				cvv = '1234';
				break;
			default:
				break;
		}
	}

	$: {
		// reference: https://www.regular-expressions.info/creditcard.html
		const card_number_mmm: string = card_number.replace(/\s+/g, '');
		if (card_number_mmm.length === 0) {
			typeof_card = '';
		} else if (/^4[0-9]{12}(?:[0-9]{3})?$/.test(card_number_mmm)) {
			typeof_card = 'Visa';
		} else if (
			/^(?:5[1-5][0-9]{2}|222[1-9]|22[3-9][0-9]|2[3-6][0-9]{2}|27[01][0-9]|2720)[0-9]{12}$/.test(
				card_number_mmm
			)
		) {
			typeof_card = 'Mastercard';
		} else if (/^3[47][0-9]{13}$/.test(card_number_mmm)) {
			typeof_card = 'American Express';
		} else if (/^3(?:0[0-5]|[68][0-9])[0-9]{11}$/.test(card_number_mmm)) {
			typeof_card = 'Diners Club';
		} else if (/^6(?:011|5[0-9]{2})[0-9]{12}$/.test(card_number_mmm)) {
			typeof_card = 'Discover';
		} else if (/^(?:2131|1800|35\d{3})\d{11}$/.test(card_number_mmm)) {
			typeof_card = 'JCB';
		} else {
			typeof_card = `We don't support this card type yet.`;
		}
	}

	$: {
		switch (typeof_card) {
			case 'Visa':
			case 'Mastercard':
			case 'Discover':
			case 'JCB':
			case 'Diners Club':
				cvv_max_length = 3;
				break;
			case 'American Express':
				cvv_max_length = 4;
				break;
			default:
				cvv_max_length = 0;
				break;
		}
	}

	$: {
		if (timeout !== null) {
			clearTimeout(timeout);
		}
		timeout = setTimeout(() => {
			card_name = card_name.trim().replace(/\s+/g, ' ');
			card_number =
				card_number
					.replace(/\D/g, '')
					.match(/.{1,4}/g)
					?.join(' ') ?? '';
			exp_date =
				exp_date
					.replace(/\D/g, '')
					.match(/.{1,2}/g)
					?.join('/')
					.split('/')
					.splice(0, 2)
					.join('/') ?? '';
			cvv = cvv.replace(/\D/g, '');
		}, 1000);
	}

	$: {
		if (card_name.length === 0) {
			warning[0] = 'Card name is required';
		} else {
			const words = card_name.split(' ');
			if (words.length === 1) {
				warning[0] = 'Minimum 2 words are required';
			} else {
				if (words.some((word) => !/^[A-Za-z]+$/.test(word))) {
					warning[0] = 'Only letters (English letters only) and spaces are allowed';
				} else {
					if (words.some((word) => !/^[A-Z][a-z]*$/.test(word))) {
						warning[0] =
							'First letter of each word must be capitalized and the rest must be lowercase';
					} else {
						warning[0] = false;
					}
				}
			}
		}

		if (card_number.length === 0) {
			warning[1] = 'Card number is required';
		} else {
			const card_number_no_space = card_number.replace(/\s+/g, '');
			if (card_number_no_space.length < 13 || card_number_no_space.length > 19) {
				warning[1] = 'Card number must be between 13 and 19 digits';
			} else {
				if (!/^\d+$/.test(card_number_no_space)) {
					warning[1] = 'Only digits are allowed';
				} else {
					warning[1] = false;
				}
			}
		}

		const exp_date_no_space = exp_date.replace(/\s+/g, '').split('/');
		if (exp_date_no_space.length !== 2) {
			warning[2] = 'Expiration date is required';
		} else {
			if (exp_date_no_space[0]?.length !== 2 || exp_date_no_space[1]?.length !== 2) {
				warning[2] = 'Expiration date must be in the format MM / YY';
			} else {
				if (!/^\d+$/.test(exp_date_no_space[0]) || !/^\d+$/.test(exp_date_no_space[1])) {
					warning[2] = 'Only digits are allowed';
				} else {
					const month = parseInt(exp_date_no_space[0]);
					const year = parseInt(exp_date_no_space[1]);
					if (month < 1 || month > 12) {
						warning[2] = 'Month must be between 01 and 12';
					} else {
						if (year < current_year || (year === current_year && month < current_month)) {
							warning[2] = 'Card has expired';
						} else {
							warning[2] = false;
						}
					}
				}
			}
		}

		if (cvv.length === 0) {
			warning[3] = 'CVV is required';
		} else {
			if (typeof_card === 'American Express') {
				if (cvv.length !== 4) {
					warning[3] = 'CVV must be 4 digits';
				} else {
					if (!/^\d+$/.test(cvv)) {
						warning[3] = 'Only digits are allowed';
					} else {
						warning[3] = false;
					}
				}
			} else {
				if (cvv.length !== 3) {
					warning[3] = 'CVV must be 3 digits';
				} else {
					if (!/^\d+$/.test(cvv)) {
						warning[3] = 'Only digits are allowed';
					} else {
						warning[3] = false;
					}
				}
			}
		}
	}

	const submit_stuff = async () => {
		if (
			warning.every(
				(i) =>
					i === false &&
					typeof_card !== '' &&
					typeof_card !== `We don't support this card type yet.`
			)
		) {
			let price = yeet_uwu.reduce((acc, cur) => acc + cur.Price, 0);
			price = Number.isInteger(price) ? price : parseFloat(price.toFixed(2));
			const data = {
				data: {
					card_name,
					card_number: card_number.replace(/ /g, ''),
					typeof_card,
					cvv: parseInt(cvv),
					exp_date,
					game_id: JSON.parse(localStorage['cart']).sort((a: number, b: number) => a - b),
					price
				}
			};
			const res = await fetch('http://localhost:3000/order', {
				method: 'POST',
				credentials: 'include',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(data)
			});
			res
				.json()
				.then((data) => {
					// if data.result = false and data.code = 1, then redirect to login and a frame appear to tell user to login
					if (data.result === false) {
						if (data.code === 1) {
							$text_header = "You haven't logged in yet";
							frame_collection.update((n) => {
								if (!n.includes('login')) {
									const pos = n.indexOf(null);
									if (pos === -1) {
										n.push('login');
									} else {
										n[pos] = 'login';
									}
								}
								return n;
							});
							payment?.parentElement?.previousElementSibling?.childNodes[0]?.childNodes[0]?.dispatchEvent(
								new MouseEvent('click')
							);
						}
					} else {
						bg();
						form.reset();
						typeof_card = '';
						part2 = false;
						localStorage['cart'] = JSON.stringify([]);
					}
				})
				.catch((err) => {
					console.error(err);
				});
		}
	};
</script>

<div
	class="payment {part2 === true && yeet_uwu.length !== 0 ? 'payment_go_brr' : ''}"
	bind:this={payment}
>
	<div class="page1">
		<div class="cart">
			<h1
				class="cart_herotext"
				style="transform: translateY({yeet_uwu.length === 0 ? '-16px' : '0'});"
			>
				Cart
			</h1>
			<div class="content">
				{#if yeet_uwu.length === 0}
					<div class="empty_sadness">
						<h1>Hey...</h1>
						<p>Looks like your cart is a bit empty</p>
						<button
							class="entice"
							on:click|preventDefault={() => {
								frame_collection.update((n) => {
									if (!n.includes('product')) {
										const pos = n.indexOf(null);
										if (pos === -1) {
											n.push('product');
										} else {
											n[pos] = 'product';
										}
									}
									return n;
								});
							}}
						>
							Mind exploring?
						</button>
					</div>
				{:else}
					<div class="added_game_li">
						{#each yeet_uwu as item}
							<!-- <p>{JSON.stringify(item)}</p> -->
							<div class="added_game">
								<div class="image" style="background-image: url('{item.Image_path}/logo/1.webp')" />
								<p class="name">{item.Name}</p>
								<p class="fee">{item.Price === 0 ? 'Free' : `$${item.Price.toFixed(2)}`}</p>
								<button
									class="remove"
									title="Remove from cart"
									on:click={() => {
										remove_from_cart(item.Game_ID);
									}}
								>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										height="24"
										viewBox="0 96 960 960"
										width="24"
									>
										<path
											d="M482 614 273 823q-9 9-19.5 9.5T233 823q-10-10-10-19.5t10-19.5l210-210-211-210q-9-9-9.5-18.5T232 326q10-10 19.5-10t19.5 10l209 208 207-207q9-9 19.5-9.5T727 327q10 10 10 20.5T727 368L519 577l209 209q8 8 8.5 18.5T728 824q-9 9-18.5 9t-18.5-9L482 614Z"
										/>
									</svg>
								</button>
							</div>
						{/each}
					</div>
				{/if}
			</div>
			<button
				class="center_btn"
				style="opacity: {yeet_uwu.length === 0 ? '0' : '1'}; pointer-event: {yeet_uwu.length === 0
					? 'none'
					: 'auto'}"
				on:click|preventDefault={() => {
					if (yeet_uwu.length !== 0) {
						part2 = true;
					}
				}}
			>
				Checkout
			</button>
		</div>
		<h2 class="text_top_right">Payment</h2>
		<div class="total_money" style="opacity: {yeet_uwu.length === 0 ? '0' : '1'};">
			Total:
			{yeet_uwu.length === 0
				? 'You have nothing in your cart'
				: `${
						yeet_uwu.reduce((acc, cur) => acc + cur.Price, 0) === 0
							? 'Free'
							: `$${yeet_uwu.reduce((acc, cur) => acc + cur.Price, 0).toFixed(2)}`
				  }`}
		</div>
	</div>
	<div
		class="page2"
		style={yeet_uwu.length === 0
			? 'transform: translateY(100%) !important; display: none'
			: 'display: flex'}
	>
		<div class="part1">
			<h1 class="slogan">Payment page | Kirito</h1>
			<div class="listgame">
				<div class="sumup">
					<h1>All:</h1>
					<p>
						{yeet_uwu.reduce((acc, cur) => acc + cur.Price, 0) === 0
							? 'Free'
							: `$${yeet_uwu.reduce((acc, cur) => acc + cur.Price, 0)}`}
					</p>
				</div>
				{#each yeet_uwu as item}
					<div class="game">
						<h1>{item.Name}</h1>
						<p>${item.Price.toFixed(2)}</p>
					</div>
				{/each}
			</div>
			<button
				class="go_back"
				on:click|preventDefault={() => {
					setTimeout(() => {
						part2 = false;
					}, 100);
				}}
			>
				<div class="logo">
					<svg xmlns="http://www.w3.org/2000/svg" height="20" viewBox="0 96 960 960" width="20"
						><path
							d="M382 938 53 607q-8-8-11.5-16T38 575q0-8 3.5-16T53 543l332-332q12-12 25.5-12t25.5 13q11 10 10 28t-11 28L128 575l310 310q11 11 11 26.5T438 938q-10 10-28 10t-28-10Z"
						/></svg
					>
				</div>
				<p>Go back</p>
			</button>
		</div>
		<div class="part2">
			<h1 class="payment_lol">Payment</h1>
			<form
				action="#"
				method="post"
				class="payment_form"
				bind:this={form}
				on:submit|preventDefault={async () => {
					await submit_stuff();
				}}
			>
				<input
					type="text"
					name="card_name"
					id="card_name"
					placeholder="Card name"
					bind:value={card_name}
					class="reset_input"
					on:click={() => {
						current_box = 0;
					}}
				/>
				<div class="card_number">
					<input
						type="text"
						autocomplete="cc-number"
						name="card_number"
						id="card_number"
						placeholder="Card number (xxxx xxxx xxxx xxxx)"
						bind:value={card_number}
						class="reset_input"
						on:click={() => {
							current_box = 1;
						}}
						maxlength="23"
					/>
					<p class="card_name_detection">
						{typeof_card === '' ? '' : `=> ${typeof_card}`}
					</p>
				</div>
				<div class="exp_date_cvv">
					<input
						type="text"
						name="exp_date"
						id="exp_date"
						placeholder="Exp date (MM/YY)"
						bind:value={exp_date}
						class="reset_input"
						on:click={() => {
							current_box = 2;
						}}
						maxlength="5"
					/>
					<input
						type="text"
						name="cvv"
						id="cvv"
						placeholder="CVV"
						bind:value={cvv}
						class="reset_input"
						maxlength={cvv_max_length}
						on:click={() => {
							current_box = 3;
						}}
					/>
				</div>
				<input type="submit" value="Pay" class="submit" />
				<p class="warning">
					{warning[current_box] === false ? 'You are good :)' : warning[current_box]}
				</p>
			</form>
		</div>
	</div>
</div>

<style lang="scss">
	.payment {
		width: 100%;
		height: 100%;
		overflow: hidden;
		position: relative;
		font-family: var(--font_family);
		.page1,
		.page2 {
			position: absolute;
			width: 100%;
			height: 100%;
			top: 0;
			left: 0;
			color: #fafafa;
		}
		.page1 {
			display: flex;
			align-items: center;
			justify-content: center;
			padding: 32px;
			transition: 0.3s cubic-bezier(0, 0, 0, 1);
			.text_top_right {
				position: absolute;
				top: 32px;
				right: 32px;
				font-size: 12px;
				writing-mode: vertical-lr;
			}
			.total_money {
				position: absolute;
				top: 32px;
				left: 32px;
				font-size: 12px;
				transition: 0.3s cubic-bezier(0, 0, 0, 1);
			}
			.cart {
				position: relative;
				height: 100%;
				width: 100%;
				.cart_herotext {
					position: relative;
					margin-top: 64px;
					margin-left: 16px;
					font-size: 48px;
					color: transparent;
					-webkit-text-stroke: 1px #fafafa;
					font-weight: 900;
					transition: transform 0.3s cubic-bezier(0, 1, 0, 1);
				}
				.content {
					position: relative;
					height: calc(100% - 64px - 48px - 32px);
					width: 100%;
					padding: 16px;
					overflow: hidden;
					overflow-y: auto;
					scrollbar-width: thin;
					scrollbar-color: #fafafa #1a1a1a;
					&::-webkit-scrollbar {
						width: 8px;
						border: 1px solid #1a1a1a;
						border-radius: 10px;
					}
					&::-webkit-scrollbar-thumb {
						border: 1px solid #fafafa;
						border-radius: 10px;
					}
					.empty_sadness {
						position: absolute;
						top: 0;
						left: 0;
						height: 100%;
						width: 100%;
						background: url('/app/payment/empty_cart.gif') no-repeat center center fixed;
						background-size: cover;
						display: flex;
						flex-direction: column;
						justify-content: center;
						border-radius: 12px;
						gap: 16px;
						box-shadow: 0px 0px 15px 0px #fafafa80 inset;
						border: 1px solid #fafafa;
						overflow: hidden;
						overflow-y: auto;
						flex-wrap: wrap;
						* {
							margin-left: 16px;
							mix-blend-mode: difference;
							color: white;
						}
						h1 {
							font-size: 24px;
							font-weight: 900;
						}
						p {
							font-size: 16px;
							font-weight: 900;
						}
						.entice {
							width: fit-content;
							height: 32px;
							padding: 0 16px;
							background: #fafafa;
							border: 1px solid #fafafa;
							border-radius: 100px;
							color: #1a1a1a;
							transition: 0.3s cubic-bezier(0, 1, 0, 1);
							font-weight: 600;
							cursor: none;
							&:hover {
								background: transparent;
								color: #fafafa;
							}
							&:active {
								transform: scale(0.95);
							}
						}
					}
					.added_game_li {
						position: relative;
						height: 100%;
						width: 100%;
						top: 0;
						left: 0;
						border-bottom: 1px solid #fafafa;
						overflow: hidden;
						overflow-y: auto;
						scrollbar-width: thin;
						scrollbar-color: #fafafa #1a1a1a;
						&::-webkit-scrollbar {
							width: 8px;
							border: 1px solid #1a1a1a;
							border-radius: 10px;
						}
						&::-webkit-scrollbar-thumb {
							border: 1px solid #fafafa;
							border-radius: 10px;
						}
						.added_game {
							position: relative;
							width: 100%;
							height: 64px;
							padding: 8px 0;
							display: flex;
							align-items: center;
							justify-content: space-between;
							gap: 16px;
							&:last-child {
								margin-bottom: 32px;
							}
							.image {
								height: 48px;
								width: 48px;
								border-radius: 6px;
								background: no-repeat center center fixed;
								background-size: cover;
							}
							.name {
								flex: 1;
								font-size: 18px;
								overflow: hidden;
								white-space: nowrap;
								text-overflow: ellipsis;
								&::before {
									content: var(--test);
								}
							}
							.fee {
								font-size: 16px;
							}
							.remove {
								height: 100%;
								width: 48px;
								border-radius: 6px;
								background: transparent;
								// border: 1px solid #fafafa;
								display: flex;
								align-items: center;
								justify-content: center;
								cursor: none;
								&:hover {
									border: 1px solid #fafafa;
								}
								svg {
									fill: #fafafa;
								}
							}
						}
					}
				}
				.center_btn {
					position: relative;
					left: 50%;
					transform: translateX(-50%);
					height: 32px;
					width: 128px;
					background: transparent;
					border: 1px solid #fafafa;
					color: #fafafa;
					border-radius: 100px;
					transition: 0.3s cubic-bezier(0, 0, 0, 1), transform 0.3s cubic-bezier(0, 1, 0, 1);
					cursor: none;
					&:hover {
						background: #fafafa;
						color: #1a1a1a;
					}
					&:active {
						transform: translateX(-50%) scale(0.875);
					}
				}
			}
		}
		.page2 {
			position: relative;
			transform: translateY(100%);
			opacity: 0;
			transition: 0.3s cubic-bezier(0, 1, 0, 1), opacity 0.3s cubic-bezier(0, 0, 0, 1);
			overflow: hidden;
			display: flex;
			.part1 {
				position: relative;
				width: 40%;
				max-width: 320px;
				height: 100%;
				background: url('/app/payment/background.jpg') no-repeat center center fixed;
				background-size: cover;
				background-color: #6b5b95;
				background-blend-mode: luminosity;
				border-right: 1px solid #fafafa;
				box-shadow: -5px 0px 30px 0px rgba(250, 250, 250, 0.75);
				padding: 32px;
				.slogan {
					font-size: 12px;
				}
				.listgame {
					margin-top: 16px;
					margin-bottom: 16px;
					height: calc(100% - 36px - 12px - 32px);
					width: 100%;
					overflow: hidden;
					overflow-y: auto;
					scrollbar-width: thin;
					scrollbar-color: #fafafa #1a1a1a;
					padding-right: 8px;
					&::-webkit-scrollbar {
						width: 8px;
						border: 1px solid #1a1a1a;
						border-radius: 10px;
					}
					&::-webkit-scrollbar-thumb {
						border: 1px solid #fafafa;
						border-radius: 10px;
					}
					.sumup,
					.game {
						position: relative;
						display: flex;
						align-items: center;
						justify-content: space-between;
						margin-bottom: 18px;

						* {
							overflow: hidden;
							white-space: nowrap;
							text-overflow: ellipsis;
							width: fit-content;
						}
						*:first-child {
							max-width: 70%;
						}
						*:last-child {
							max-width: 30%;
						}
					}
					.sumup {
						position: sticky;
						top: 0;
						padding: 16px 0;
						border-bottom: 1px solid #fafafa;
						backdrop-filter: blur(5px);
						z-index: 2;
					}
				}
				.go_back {
					background-color: transparent;
					height: 36px;
					width: fit-content;
					display: flex;
					align-items: center;
					padding-right: 16px;
					color: #fafafa;
					cursor: none;
					// border: 1px solid #fafafa;
					border-radius: 6px;
					transform: translateX(-16px);
					transition: 0.3s cubic-bezier(0, 1, 0, 1);
					.logo {
						height: 32px;
						width: 32px;
						margin-right: 8px;
						fill: #fafafa;
						display: flex;
						align-items: center;
						justify-content: center;
						svg {
							transform: translateX(50%);
							transition: 0.3s cubic-bezier(0, 1, 0, 1) 0.05s;
						}
					}
					p {
						transition: 0.3s cubic-bezier(0, 1, 0, 1);
					}
					&:hover {
						transform: translateX(0);
						border: 1px solid #fafafa;
					}
					&:active {
						.logo {
							svg {
								transform: translateX(25%);
							}
						}
						p {
							transform: translateX(-4px);
						}
					}
				}
			}
			.part2 {
				position: relative;
				flex: 1;
				padding: 32px;
				overflow: hidden;
				.payment_lol {
					font-size: 32px;
					font-weight: 900;
					margin-bottom: 32px;
					color: transparent;
					-webkit-text-stroke: 1px #fafafa;
				}
				.payment_form {
					position: relative;
					height: calc(100% - 80px + 16px);
					width: 100%;
					*:not(*:last-child) {
						margin-bottom: 16px;
					}
					.warning {
						position: absolute;
						bottom: 0;
						left: 0;
						width: 100%;
						font-size: 12px;
						overflow: hidden;
						white-space: nowrap;
						text-overflow: ellipsis;
					}
					.card_number,
					.exp_date_cvv {
						position: relative;
						* {
							display: inline-block;
						}
					}
					.card_number {
						.card_name_detection {
							display: block;
							width: 100%;
							overflow: hidden;
						}
					}
					.exp_date_cvv {
						#exp_date {
							width: 210px;
							margin-right: 8px;
						}
						#cvv {
							width: 96px;
						}
					}
					.submit {
						background: transparent;
						border: 1px solid #fafafa;
						border-radius: 6px;
						padding: 8px 16px;
						color: #fafafa;
						cursor: none;
						transition: 0.3s cubic-bezier(0, 0, 0, 1), transform 0.3s cubic-bezier(0, 1, 0, 1);
						&:hover {
							background-color: #fafafa;
							color: #1a1a1a;
						}
						&:active {
							transform: scale(0.95);
						}
					}
				}
			}
		}
	}
	.payment_go_brr {
		.page1 {
			opacity: 0 !important;
		}
		.page2 {
			opacity: 1 !important;
			transform: translateY(0) !important;
		}
	}

	.reset_input {
		background-color: transparent;
		border: 1px solid #fafafa;
		color: #fafafa;
		border-radius: 6px;
		height: 44px;
		padding: 0 16px;
		cursor: none;
		width: 100%;
		max-width: 320px;
	}

	*::selection {
		background-color: #fafafa;
		color: #1a1a1a;
	}
</style>
