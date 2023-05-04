<script lang="ts">
	// let tip_display = 'none';
	let height = '0px';
</script>

<div class="search">
	<h1 class="cata">Search 1/2</h1>
	<div class="kirito_search_engine">
		<h1>Kirito Search</h1>
		<div class="search_stuff">
			<input type="text" placeholder="Search" />
		</div>
		<p
			class="protip"
			style="; height: {height}"
			id="product_search_protip"
		>
			Tips: (Please drag the sidebar due to the poor code design of the authors)<br /><br />
			+ If you want to search for the game name, enter name:game_name.<br />
			+ If you want to search for the genre name, enter genre:genre_name.<br />
			+ If you want to seach for the specific ID, enter ID:number. <br />
			!! Items must be separated by "|". <br />
			Ex: "name:Kirito|genre:Action" or "ID:1|ID:2 | ID:3" <br /><br />
			The result will be displayed in the next page. Check it out! <br />
			Besides, if you are still keeping the value in the search box, we will show the games according
			to that value until you remove the keywords.
		</p>
	</div>
	<button
		class="on_pro_tip"
		on:click={() => {
			if (height == '0px') {
				height = '120px';
			} else {
				height = '0px';
			}
		}}
	>
		Wanna pro tips?
	</button>
</div>

<style lang="scss">
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
		.kirito_search_engine {
			position: absolute;
			top: 64px;
			left: 32px;
			height: calc(100% - 64px - 32px - 32px);
			width: calc(100% - 64px);
			display: flex;
			flex-direction: column;
			align-items: center;
			justify-content: center;
			h1 {
				font-size: 36px;
				font-weight: 600;
				color: transparent;
				-webkit-text-stroke: 1px #fafafa;
				margin-bottom: 16px;
			}
			.search_stuff {
				margin-bottom: 16px;
				input {
					all: unset;
					padding: 8px 16px;
					border-radius: 100px;
					color: #fafafa;
					border: 1px solid #fafafa;
					font-size: 14px;
					transition: 0.3s cubic-bezier(0, 0, 0, 1), width 0.3s cubic-bezier(0, 1, 0, 1);
				}
				input {
					width: 200px;
					&:focus {
						width: 300px;
						box-shadow: 0 26px 58px 0 #fafafa38, 0 5px 14px 0 #fafafa2e;
					}
					&::selection {
						background: #fafafa;
						color: #1a1a1a;
					}
				}
			}
			.protip {
				line-height: 1.2;
				font-size: 12px;
				color: #fafafa;
				overflow: hidden;
				overflow-y: auto;
				transition: height 0.3s cubic-bezier(0, 1, 0, 1);
				scrollbar-width: thin;
				scrollbar-color: #fafafa #1a1a1a;
				padding-right: 8px;
				max-width: calc(100% - 64px);
				&::-webkit-scrollbar {
					width: 8px;
					display: block;
				}
				&::-webkit-scrollbar-track {
					border: 1px solid #1a1a1a;
					border-radius: 100px;
				}
				&::-webkit-scrollbar-thumb {
					border: 1px solid #fafafa;
					border-radius: 100px;
				}
			}
		}
		.on_pro_tip {
			all: unset;
			position: absolute;
			bottom: 24px;
			right: 16px;
			padding: 8px 16px;
			border-radius: 100px;
			color: #fafafa;
			border: 1px solid #fafafa;
			font-size: 12px;
			transition: 0.3s cubic-bezier(0, 1, 0, 1), box-shadow 0.3s cubic-bezier(0, 0, 0, 1);
			&:hover {
				box-shadow: 0 26px 58px 0 #fafafa38, 0 5px 14px 0 #fafafa2e;
			}
			&:active {
				transform: scale(0.95);
			}
		}
	}
</style>
