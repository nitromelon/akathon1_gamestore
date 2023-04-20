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
</script>

<div class="menu" bind:this={ms_menu}>
	<a
		class="desktop_menu_link"
		href="./about"
		on:click|preventDefault={() => {
			frame_collection.update((n) => {
				if (!n.includes('about')) {
					const pos = n.indexOf(null);
					if (pos === -1) {
						n.push('about');
					} else {
						n[pos] = 'about';
					}
				}
				return n;
			});
			is_menu_open.set(false);
		}}
	>
		<div class="desktop_menu_link_group dmlg_group1">
			{#each '#About' as char}
				<p class="desktop_menu_link_char">{char}</p>
			{/each}
		</div>
		<div class="desktop_menu_link_group dmlg_group2">
			{#each '#About' as char}
				<p class="desktop_menu_link_char">{char}</p>
			{/each}
		</div>
	</a>
	<a
		class="desktop_menu_link"
		href="./product"
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
		href="./payment"
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
	<a
		class="desktop_menu_link"
		href="./login"
		on:click|preventDefault={() => {
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
			is_menu_open.set(false);
		}}
	>
		<div class="desktop_menu_link_group dmlg_group1">
			{#each '#Log in' as char}
				{#if char === ' '}
					<p class="desktop_menu_link_char">&nbsp;</p>
				{:else}
					<p class="desktop_menu_link_char">{char}</p>
				{/if}
			{/each}
		</div>
		<div class="desktop_menu_link_group dmlg_group2">
			{#each '#Log in' as char}
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
		href="./signup"
		on:click|preventDefault={() => {
			frame_collection.update((n) => {
				if (!n.includes('signup')) {
					const pos = n.indexOf(null);
					if (pos === -1) {
						n.push('signup');
					} else {
						n[pos] = 'signup';
					}
				}
				return n;
			});
			is_menu_open.set(false);
		}}
	>
		<div class="desktop_menu_link_group dmlg_group1">
			{#each '#Sign up' as char}
				{#if char === ' '}
					<p class="desktop_menu_link_char">&nbsp;</p>
				{:else}
					<p class="desktop_menu_link_char">{char}</p>
				{/if}
			{/each}
		</div>
		<div class="desktop_menu_link_group dmlg_group2">
			{#each '#Sign up' as char}
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
			position: relative;
			border-radius: 100px;
			height: 50px;
			width: calc(25% - 128px);
			overflow: hidden;
			text-decoration: none;
			color: #fafafa;
			outline: none;
			transform: translateY(-64px);
			overflow: hidden;
			transition: .3s filter cubic-bezier(0, 1, 0, 1);
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
			a {
				transform: translateY(0px) !important;
			}
			a:nth-child(1) {
				transition: transform 0.5s cubic-bezier(0, 1, 0, 1);
			}
			a:nth-child(2) {
				transition: transform 0.5s cubic-bezier(0, 1, 0, 1) 0.1s;
			}
			a:nth-child(3) {
				transition: transform 0.5s cubic-bezier(0, 1, 0, 1) 0.2s;
			}
			a:nth-child(4) {
				transition: transform 0.5s cubic-bezier(0, 1, 0, 1) 0.3s;
			}
			a:nth-child(5) {
				transition: transform 0.5s cubic-bezier(0, 1, 0, 1) 0.4s;
			}
			a:nth-child(6) {
				transition: transform 0.5s cubic-bezier(0, 1, 0, 1) 0.5s;
			}
		}
	}
</style>
