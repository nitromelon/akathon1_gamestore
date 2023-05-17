<script lang="ts">
	import { notionists } from '@dicebear/collection';
	import { createAvatar } from '@dicebear/core';
	import { onMount } from 'svelte';

	type User = {
		username: string;
	};

	let arr_student: User[] = [];
	let warning = false;
	let da_target: string | null = null;
	let user_search = '';
	let cache_user_search: string | null = null;
	let timeout: ReturnType<typeof setTimeout> | null = null;

	$: {
		if (timeout !== null) {
			clearTimeout(timeout);
		}
		timeout = setTimeout(() => {
			if (user_search !== cache_user_search && user_search !== '') {
				cache_user_search = user_search;
				search();
			} else if (user_search === '') {
				dem();
			}
		}, 500);
	}

	onMount(async () => {
		await dem();
	});

	async function dem() {
		try {
			const r = await fetch('http://localhost:3000/admin/usernames', {
				method: 'GET',
				headers: {
					'Content-Type': 'application/json'
				},
				credentials: 'include'
			}).then((res) => res.json());
			if (r.result) {
				arr_student = r.data;
			}
		} catch (e) {
			console.error(e);
		}
	}

	const search = async () => {
		try {
			const r = await fetch('http://localhost:3000/admin/search', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				credentials: 'include',
				body: JSON.stringify({
					username: user_search
				})
			}).then((res) => res.json());
			if (r.result) {
				arr_student = [r.data];
			}
		} catch (e) {
			console.error(e);
		}
	};
</script>

<div class="admin">
	<p class="manage">Manage users</p>
	<div class="result">
		<div class="box">
			{#each arr_student as student}
				<div class="logo" title={student.username}>
					<div class="image">
						{@html createAvatar(notionists, {
							seed: student.username,
							size: 100
						}).toString()}
					</div>
					<button
						class="del"
						on:click={() => {
							warning = !warning;
							da_target = student.username;
							// alert(da_target);
						}}
					>
						<div class="line1" />
						<div class="line2" />
					</button>
				</div>
			{/each}
		</div>
	</div>
	<div class="searchbar">
		<input type="text" placeholder="Search for user" bind:value={user_search} />
	</div>
	<div class="box_container" style="display: {!warning ? 'none' : 'block'};">
		<div class="background" />
		<div class="content">
			<h1>Remove {da_target}?</h1>
			<button
				class="return"
				on:click={() => {
					warning = !warning;
					da_target = '';
				}}
			>
				No, I want my Mommy
			</button>
			<button
				class="burn"
				on:click={async () => {
					const result = await fetch('http://localhost:3000/admin', {
						method: 'POST',
						headers: {
							'Content-Type': 'application/json'
						},
						credentials: 'include',
						body: JSON.stringify({
							user_name: da_target
						})
					}).then((res) => res.json());

					if (result.result) {
						warning = !warning;
						arr_student = arr_student.filter((student) => student.username !== da_target);
						await dem();
						da_target = '';
						user_search = '';
					} else {
						console.error(result);
					}
				}}
			>
				Yes, bring it on!
			</button>
		</div>
	</div>
</div>

<style lang="scss">
	.admin {
		position: relative;
		width: 100%;
		height: 100%;
		overflow: hidden;
		color: #fafafa;
		font-family: var(--font_family);
		.manage {
			position: absolute;
			top: 32px;
			left: 32px;
			font-size: 24px;
			color: transparent;
			font-weight: 900;
			-webkit-text-stroke: 1px #fafafa;
		}
		.searchbar {
			position: absolute;
			bottom: 32px;
			left: 50%;
			transform: translateX(-50%);
			height: 32px;
			width: 400px;
			display: flex;
			input {
				background: transparent;
				color: #fafafa;
				border: 1px solid #fafafa;
				flex: 1;
				padding: 0 16px;
				text-align: center;
				border-radius: 100px;
				opacity: 0.5;
				transition: 0.3s cubic-bezier(0, 0, 0, 1);
				cursor: none;
				&:focus {
					opacity: 1;
				}
			}
		}
		.result {
			position: absolute;
			top: 80px;
			left: 32px;
			height: calc(100% - 80px - 32px - 48px);
			width: calc(100% - 64px);
			display: flex;
			justify-content: center;
			align-items: center;
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
			.box {
				position: relative;
				min-height: auto;
				max-height: 100%;
				display: flex;
				justify-content: center;
				flex-wrap: wrap;
				gap: 16px;
				.logo {
					position: relative;
					height: 100px;
					width: 100px;
					overflow: hidden;
					border-radius: 50%;
					border: 1px solid #fafafa;
					display: flex;
					justify-content: center;
					align-items: center;
					transition: transform 0.3s cubic-bezier(0, 1, 0, 1);
					.image {
						position: absolute;
						transition: 0.3s cubic-bezier(0, 0, 0, 1);
					}
					.del {
						position: absolute;
						height: 100%;
						width: 100%;
						background: rgba(26, 26, 26, 0.5);
						border-radius: 50%;
						color: #fafafa;
						opacity: 0;
						cursor: none;
						transition: 0.3s cubic-bezier(0, 0, 0, 1);
						transition-delay: 0.3s;
					}
					&:hover {
						.del {
							opacity: 1;
							transition-delay: 0s;
						}
						.image {
							opacity: 0;
						}
					}
					&:active {
						transform: scale(0.9);
					}
				}
			}
		}
	}

	*::selection {
		background: #fafafa;
		color: #1a1a1a;
	}

	.line1,
	.line2 {
		position: absolute;
		top: 50%;
		left: 50%;
		height: 1px;
		width: 0%;
		background: #fafafa;
		transition: 0.3s cubic-bezier(0, 1, 0, 1);
	}
	.line1 {
		transform: translate(-50%, -50%) rotate(45deg);
	}
	.line2 {
		transform: translate(-50%, -50%) rotate(-45deg);
	}

	.del:hover {
		transition-delay: 0;
		.line1 {
			width: 50%;
		}
		.line2 {
			width: 50%;
		}
	}

	.del:active {
		transition-delay: 0.3s;
		transition: 0.3s cubic-bezier(0, 1, 0, 1);
		.line1 {
			width: 40%;
		}
		.line2 {
			width: 40%;
		}
	}

	.box_container {
		position: absolute;
		z-index: 10;
		height: 100%;
		width: 100%;
		overflow: hidden;
		.background {
			position: absolute;
			height: 100%;
			width: 100%;
			background: url('/app/admin/ko.gif') no-repeat center center fixed;
			background-size: cover;
			background-color: #1f1d20;
			&::before {
				position: absolute;
				content: '';
				height: 100%;
				width: 100%;
				backdrop-filter: blur(0);
				transition: 0.3s cubic-bezier(0, 0, 0, 1);
			}
		}
		.content {
			position: absolute;
			height: 100%;
			width: 100%;
			opacity: 0;
			transition: 0.3s cubic-bezier(0, 0, 0, 1);
			color: #fafafa;
			display: flex;
			align-items: center;
			justify-content: center;
			gap: 16px;
			h1 {
				position: absolute;
				top: 32px;
				left: 32px;
				font-weight: 900;
				font-size: 20px;
				width: calc(100% - 64px);
				overflow: hidden;
				white-space: nowrap;
				text-overflow: ellipsis;
				text-align: center;
				&:hover {
					color: #d0342c;
				}
			}
			button {
				background: transparent;
				padding: 16px 32px;
				border: 1px solid;
				border-radius: 8px;
				cursor: none;
				box-shadow: 0 26px 58px 0 #fafafa38, 0 5px 14px 0 #fafafa2e;
				transition: 0.3s cubic-bezier(0, 1, 0, 1);
				&:active {
					transform: scale(0.9);
				}
			}
			.return {
				border-color: #90ee90;
				color: #90ee90;
				&:hover {
					background: #90ee90;
					color: #1a1a1a;
				}
			}
			.burn {
				border-color: #d0342c;
				color: #d0342c;
				&:hover {
					background: #d0342c;
					color: #fafafa;
				}
			}
		}
		&:hover {
			.background {
				&::before {
					background: rgba(26, 26, 26, 0.5);
					backdrop-filter: blur(calc((2vw + 2vh) / 2));
				}
			}
			.content {
				opacity: 1;
			}
		}
	}
</style>
