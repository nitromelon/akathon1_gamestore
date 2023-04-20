<script lang="ts">
	import { frame_collection } from '../collection/window';
	import { is_menu_open } from '../is_openmenu/i';
</script>

<div class="menu">
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
		}}>#About</a
	>
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
		>#Product
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
		}}>#Payment</a
	>
	<a
		rel="noopener noreferrer"
		target="_blank"
		class="desktop_menu_link"
		href="https://mercury.swin.edu.au/cos10026/s104182520/assign2/enhancements2.php"
	>
		#Legacy_enhancement
	</a>
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
			is_menu_open.set(false)
		}}>#Login</a
	>
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
			is_menu_open.set(false)
		}}>#Signup</a
	>
</div>

<style lang="scss">
	.menu {
		z-index: 1;
		position: fixed;
		top: 0;
		left: calc(50% + 18px);
		transform: translateX(-50%);
		width: calc(100% - 36px * 2);
		max-width: 2560px;
		height: 15%;
		display: flex;
		align-items: center;
		justify-content: space-between;
		font-size: 20px;
		font-family: var(--font_family);
		color: #fafafa;
		* {
			border-radius: 100px;
			max-width: calc(100% / 6);
			padding: 16px;
			overflow: hidden;
			white-space: nowrap;
			text-overflow: ellipsis;
			text-decoration: none;
			color: #fafafa;
			outline: none;
			&:hover {
				cursor: none;
			}
		}
	}
</style>
