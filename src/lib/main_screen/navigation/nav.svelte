<div class="menu">
	<a class="desktop_menu_link" href="./about" on:click|preventDefault>#About</a>
	<a class="desktop_menu_link" href="./product" on:click|preventDefault>#Product</a>
	<a class="desktop_menu_link" href="./payment" on:click|preventDefault>#Payment</a>
	<a class="desktop_menu_link" href="https://mercury.swin.edu.au/cos10026/s104182520/assign2/enhancements2.php">
		#Legacy_enhancement
	</a>
	<a class="desktop_menu_link" href="./login" on:click|preventDefault>#Login</a>
	<a class="desktop_menu_link" href="./signup" on:click|preventDefault>#Signup</a>
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
