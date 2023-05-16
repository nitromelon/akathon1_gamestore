<script lang="ts">
	import { onMount } from 'svelte';
	import { num_total_games } from '../product/product';
	import { total_games } from '../function/total_games';
	let user_number: number = 0;
	let comment_number: number = 0;
	let profit: number = 0.0;
	let star: Array<number> = [0, 0, 0, 0, 0];
	let height: Array<number> = [0, 0, 0, 0, 0];
	let game_name: string = '###';
	let current: number = 1;

	$: {
		const max = Math.max(...star);
		if (max !== 0) {
			for (let i = 0; i < star.length; i++) {
				height[i] = ((star[i] as number) / max) * 100;
			}
		} else {
			height = [0, 0, 0, 0, 0];
		}
	}

	const async_timeout = (ms: number) => {
		return new Promise((resolve) => setTimeout(resolve, ms));
	};
	const ascent_async_user = async (num: number, time: number) => {
		user_number = 0;
		const range = time < 10 ? Math.round((10 * num) / 1000): 1;
		while (user_number < num - range) {
			await async_timeout(time < 10 ? 10 : time);
			user_number+=range;
		}
		user_number = num;
	};

	const ascent_async_comment = async (num: number, time: number) => {
		comment_number = 0;
		const range = time < 10 ? Math.round((10 * num) / 1000): 1;
		while (comment_number < num - range) {
			await async_timeout(time < 10 ? 10 : time);
			comment_number+=range;
		}
		comment_number = num;
	};

	const ascent_async_money = async (num: number, time: number, data: number) => {
		profit = 0;
		const range = time < 10 ? Math.round((10 * num) / 1000): 1;
		while (profit < num - range) {
			await async_timeout(time < 10 ? 10 : time);
			profit+=range;
		}
		profit = num;
		await async_timeout(time);
		while (profit < data) {
			await async_timeout(10);
			profit += 0.01;
			profit = parseFloat(profit.toFixed(2));
		}
	};

	onMount(async () => {
		total_games();
		try {
			const result = await fetch('http://localhost:3000/statistics', {
				method: 'GET',
				headers: {
					'Content-Type': 'application/json'
				},
				credentials: 'include'
			});
			const data = await result.json();
			const users_num = parseInt(data.users);
			const comments_num = parseInt(data.comments);
			ascent_async_user(users_num, 1000 / users_num === Infinity ? 0 : 1000 / users_num);
			ascent_async_comment(
				comments_num,
				1000 / comments_num === Infinity ? 0 : 1000 / comments_num
			);
			const money = data.money;
			const integer_money = parseInt(money.toString().split('.')[0]);
			ascent_async_money(
				integer_money,
				1000 / integer_money === Infinity ? 0 : 1000 / integer_money,
				money
			);
		} catch (error) {
			console.log(error);
		}

		get_star_game();
	});

	const get_star_game = async (i: number = 1) => {
		try {
			const result = await fetch(`http://localhost:3000/statistics/star/${i}`, {
				method: 'GET',
				headers: {
					'Content-Type': 'application/json'
				},
				credentials: 'include'
			});
			const data = await result.json();
			if (data.result) {
				game_name = data.data2;
				for (const [k, v] of Object.entries(data.data)) {
					star[parseInt(k) - 1] = v as number;
				}
			}
		} catch (error) {
			console.log(error);
		}
	};
</script>

<div class="statistics">
	<div class="part1 part">
		<div class="p1 p">
			<div class="chart">
				<p class="game_name">{game_name}</p>
				<div class="box">
					<div class="1star star">
						<div class="line" style="height: {height[0]}%;" />
						<p>{star[0]}⭐</p>
					</div>
					<div class="2star star">
						<div class="line" style="height: {height[1]}%;" />
						<p>{star[1]}⭐⭐</p>
					</div>
					<div class="3star star">
						<div class="line" style="height: {height[2]}%;" />
						<p>{star[2]}⭐⭐⭐</p>
					</div>
					<div class="4star star">
						<div class="line" style="height: {height[3]}%;" />
						<p>{star[3]}⭐⭐⭐⭐</p>
					</div>
					<div class="5star star">
						<div class="line" style="height: {height[4]}%;" />
						<p>{star[4]}⭐⭐⭐⭐⭐</p>
					</div>
				</div>
			</div>
			<div class="des des_rate">
				<button
					on:click={() => {
						if (current > 1) {
							current--;
							get_star_game(current);
						}
					}}
				>
					Back
				</button>
				<p>Total ratings</p>
				<button
					on:click={() => {
						if (current < $num_total_games) {
							current++;
							get_star_game(current);
						}
					}}
				>
					Next
				</button>
			</div>
		</div>
		<hr />
		<div class="p2 p">
			<div class="chart">
				<p class="num">{user_number}</p>
			</div>
			<p class="des">Total number of users</p>
		</div>
	</div>
	<div class="part2 part">
		<div class="p3 p">
			<div class="chart">
				<p class="num">{comment_number}</p>
			</div>
			<p class="des">Total comments</p>
		</div>
		<hr />
		<div class="p4 p">
			<div class="chart">
				<p class="num">${profit}</p>
			</div>
			<p class="des">Estimated profit earned</p>
		</div>
	</div>
</div>

<style lang="scss">
	.statistics {
		position: relative;
		width: 100%;
		height: 100%;
		overflow: hidden;
		font-family: var(--font_family);
		.part {
			position: relative;
			width: 100%;
			height: 50%;
			display: flex;
			justify-content: space-between;
			align-items: center;
			hr {
				height: 100%;
				width: 1px;
				background-color: #fafafa;
			}
			.p {
				position: relative;
				height: 100%;
				width: 50%;
				.chart {
					position: relative;
					height: calc(100% - 32px);
					width: 100%;
					padding: 8px;
					overflow: hidden;
					display: flex;
					justify-content: center;
					align-items: center;
					gap: 16px;
				}
				.des {
					position: relative;
					height: 32px;
					width: 100%;
					display: flex;
					justify-content: center;
					align-items: center;
					font-size: 12px;
					color: #fafafa;
					font-style: italic;
				}
			}
		}
		.part1 {
			border-bottom: 1px solid #fafafa;
		}
	}

	.box {
		position: relative;
		height: 100%;
		width: 100%;
		border-bottom: 1px solid #fafafa;
		display: flex;
		.star {
			position: relative;
			height: 100%;
			overflow: hidden;
			text-overflow: ellipsis;
			width: 20%;
			padding: 0 16px;
			padding-bottom: 32px;
			transform: rotate(180deg);
			.line {
				position: relative;
				height: 0%;
				width: 100%;
				border: 1px solid #fafafa;
				border-top: none;
				margin-bottom: 16px;
				transition: 0.5s cubic-bezier(1, 0, 0, 1);
			}
			p {
				position: sticky;
				bottom: 8px;
				left: 50%;
				transform: translateX(-50%);
				writing-mode: vertical-lr;
				color: white;
				font-size: 12px;
			}
		}
	}

	.num {
		font-size: 48px;
		font-weight: 900;
		color: transparent;
		-webkit-text-stroke: 1px #fafafa;
	}

	.game_name {
		position: absolute;
		top: 16px;
		left: 22px;
		color: #fafafa;
		width: calc(100% - 44px);
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		font-size: 12px;
	}

	.des_rate {
		display: flex;
		justify-content: space-around !important;
		align-items: center;
		button {
			background-color: transparent;
			height: calc(100% - 8px);
			padding: 0 8px;
			border: 1px solid #fafafa;
			color: #fafafa;
			border-radius: 100px;
			font-size: 12px;
			cursor: none;
			transition: 0.3s cubic-bezier(0, 0, 0, 1), transform 0.3s cubic-bezier(0, 1, 0, 1);
			&:hover {
				background-color: #fafafa;
				color: #1a1a1a;
			}
			&:active {
				transform: scale(0.9);
				opacity: 0.8;
			}
		}
	}
</style>
