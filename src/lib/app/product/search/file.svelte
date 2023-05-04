<script lang="ts">
</script>

<div class="search">
	<h1 class="cata">Search 2/2</h1>
	<h2 class="header_text">That might not be the game you want?</h2>
	<p class="list_game">
		These are the games listed at the moment, if you still don't like it, you can press buttons
		below:
	</p>
	<div class="game_list">
		<!-- todo: Hiện kết quả của 1 trên 4 -->
		<div class="buttons">
			<button class="btn" title="Have the game that was previously displayed.">Go back</button>
			<button class="btn" title="Go refreshing this current list">Go forward</button>
		</div>
	</div>
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
			color: #fafafa;
		}
		.game_list {
			position: absolute;
			top: 120px;
			left: 32px;
			height: calc(100% - 120px - 64px);
			width: calc(100% - 64px);
			overflow-y: auto;
			overflow-x: hidden;
			scrollbar-width: none;
			&::-webkit-scrollbar {
				display: none;
			}
			.buttons {
				position: relative;
				height: 32px;
				width: 100%;
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
