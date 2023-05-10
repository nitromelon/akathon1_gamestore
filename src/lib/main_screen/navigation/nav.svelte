<script lang="ts">
	import { frame_collection } from '../collection/window';
	import { is_menu_open } from '../is_openmenu/i';

	let ms_menu: HTMLDivElement | null = null;
	$: {
		if (ms_menu !== null) {
			if ($is_menu_open) {
				ms_menu.classList.add('display_menu_links');
			} else {
				ms_menu.classList.remove('display_menu_links');
			}
		}
	}

	let login_logout: string = 'Log in';
	let login_logout_link: string = 'login';
	let signup_user: string = 'Sign up';
	let signup_user_link: string = 'signup';
</script>

<div class="menu" bind:this={ms_menu}>
	<a
		class="desktop_menu_link"
		href="#home"
		on:click|preventDefault={() => {
			frame_collection.update((n) => {
				if (!n.includes('home')) {
					const pos = n.indexOf(null);
					if (pos === -1) {
						n.push('home');
					} else {
						n[pos] = 'home';
					}
				}
				return n;
			});
			is_menu_open.set(false);
		}}
	>
		<div class="desktop_menu_link_group dmlg_group1">
			{#each '#Home' as char}
				<p class="desktop_menu_link_char">{char}</p>
			{/each}
		</div>
		<div class="desktop_menu_link_group dmlg_group2">
			{#each '#Home' as char}
				<p class="desktop_menu_link_char">{char}</p>
			{/each}
		</div>
	</a>
	<a
		class="desktop_menu_link"
		href="#product"
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
			is_menu_open.set(false);
		}}
	>
		<div class="desktop_menu_link_group dmlg_group1">
			{#each '#Product' as char}
				<p class="desktop_menu_link_char">{char}</p>
			{/each}
		</div>
		<div class="desktop_menu_link_group dmlg_group2">
			{#each '#Product' as char}
				<p class="desktop_menu_link_char">{char}</p>
			{/each}
		</div>
	</a>
	<a
		class="desktop_menu_link"
		href="#payment"
		on:click|preventDefault={() => {
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
			is_menu_open.set(false);
		}}
	>
		<div class="desktop_menu_link_group dmlg_group1">
			{#each '#Payment' as char}
				<p class="desktop_menu_link_char">{char}</p>
			{/each}
		</div>
		<div class="desktop_menu_link_group dmlg_group2">
			{#each '#Payment' as char}
				<p class="desktop_menu_link_char">{char}</p>
			{/each}
		</div>
	</a>
	<!-- <a
		rel="noopener noreferrer"
		target="_blank"
		class="desktop_menu_link"
		href="https://mercury.swin.edu.au/cos10026/s104182520/assign2/enhancements2.php"
	>
		{#each '#Legacy enhancement' as char}
			{#if char === ' '}
				<p class="desktop_menu_link_char">&nbsp;</p>
			{:else}
				<p class="desktop_menu_link_char">{char}</p>
			{/if}
		{/each}
	</a> -->
	<!-- Todo: When done signing in / up. If admin (will require 2nd password), login -> logout | signup -> manager page. User: login -> logout | signup -> username -->
	<!-- Todo: also, frame_collection must not have 2 old page  -->
	<a
		class="desktop_menu_link"
		href="#{login_logout_link}"
		on:click|preventDefault={() => {
			frame_collection.update((n) => {
				if (!n.includes(login_logout_link)) {
					const pos = n.indexOf(null);
					if (pos === -1) {
						n.push(login_logout_link);
					} else {
						n[pos] = login_logout_link;
					}
				}
				return n;
			});
			is_menu_open.set(false);
		}}
	>
		<div class="desktop_menu_link_group dmlg_group1">
			<!-- {#each '#Log in' as char} -->
			{#each `#${login_logout}` as char}
				{#if char === ' '}
					<p class="desktop_menu_link_char">&nbsp;</p>
				{:else}
					<p class="desktop_menu_link_char">{char}</p>
				{/if}
			{/each}
		</div>
		<div class="desktop_menu_link_group dmlg_group2">
			{#each `#${login_logout}` as char}
				{#if char === ' '}
					<p class="desktop_menu_link_char">&nbsp;</p>
				{:else}
					<p class="desktop_menu_link_char">{char}</p>
				{/if}
			{/each}
		</div>
	</a>
	<a
		class="desktop_menu_link"
		href="#{signup_user_link}"
		on:click|preventDefault={() => {
			frame_collection.update((n) => {
				if (!n.includes(signup_user_link)) {
					const pos = n.indexOf(null);
					if (pos === -1) {
						n.push(signup_user_link);
					} else {
						n[pos] = signup_user_link;
					}
				}
				return n;
			});
			is_menu_open.set(false);
		}}
	>
		<div class="desktop_menu_link_group dmlg_group1">
			{#each `#${signup_user}` as char}
				{#if char === ' '}
					<p class="desktop_menu_link_char">&nbsp;</p>
				{:else}
					<p class="desktop_menu_link_char">{char}</p>
				{/if}
			{/each}
		</div>
		<div class="desktop_menu_link_group dmlg_group2">
			{#each `#${signup_user}` as char}
				{#if char === ' '}
					<p class="desktop_menu_link_char">&nbsp;</p>
				{:else}
					<p class="desktop_menu_link_char">{char}</p>
				{/if}
			{/each}
		</div>
	</a>
</div>

<style lang="scss">
	.menu {
		z-index: 1;
		position: fixed;
		top: 0;
		left: calc(50% + 18px);
		transform: translateX(calc(-50% - 18px));
		width: calc(100% - 36px * 2);
		max-width: 2560px;
		height: 15%;
		display: flex;
		align-items: center;
		justify-content: space-between;
		font-size: 20px;
		font-family: var(--font_family);
		color: #fafafa;
		.desktop_menu_link {
			&:nth-child(1) {
				transition: transform 0.3s cubic-bezier(0, 1, 0, 1);
			}
			&:nth-child(2) {
				transition: transform 0.3s cubic-bezier(0, 1, 0, 1) 0.1s;
			}
			&:nth-child(3) {
				transition: transform 0.3s cubic-bezier(0, 1, 0, 1) 0.2s;
			}
			&:nth-child(4) {
				transition: transform 0.3s cubic-bezier(0, 1, 0, 1) 0.3s;
			}
			&:nth-child(5) {
				transition: transform 0.3s cubic-bezier(0, 1, 0, 1) 0.4s;
			}
			&:nth-child(6) {
				transition: transform 0.3s cubic-bezier(0, 1, 0, 1) 0.5s;
			}
		}
		.desktop_menu_link {
			position: relative;
			border-radius: 100px;
			height: 60px;
			width: 128px;
			// width: auto;
			overflow: hidden;
			text-decoration: none;
			color: #fafafa;
			outline: none;
			transform: translateY(-600%);
			overflow: hidden;
			.desktop_menu_link_group {
				position: absolute;
				height: 100%;
				width: 100%;
				display: flex;
				align-items: center;
				justify-content: center;
			}
			.dmlg_group2 {
				p {
					opacity: 0;
					transform: translateY(15px);
				}
			}
			.dmlg_group1,
			.dmlg_group2 {
				@for $i from 1 through 10 {
					p:nth-child(#{$i}) {
						transition: transform 0.1s * $i cubic-bezier(1, 0, 0, 1),
							opacity 0.1s * $i cubic-bezier(1, 0, 0, 1);
					}
				}
			}
			&:hover {
				cursor: none;
				.dmlg_group1 {
					p {
						opacity: 0;
						transform: translateY(-15px);
					}
				}
				.dmlg_group2 {
					p {
						opacity: 1;
						transform: translateY(0px);
					}
				}
			}
		}
		&:hover {
			.desktop_menu_link {
				&:hover {
					opacity: 0.6;
				}
			}
		}
	}

	:global {
		.display_menu_links {
			// make first a tag translateY 0px
			.desktop_menu_link {
				transform: translateY(0px) !important;
			}
		}
	}
</style>
