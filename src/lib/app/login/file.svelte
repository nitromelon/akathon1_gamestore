<script lang="ts">
	import { frame_collection } from '$lib/main_screen/collection/window';
	const cheatcode = 'CownyJummyWuvwySweatyGeometwySausagy_username';
	const cheatcode2 = 'CownyJummyWuvwySweatyGeometwySausagy_email';
	let email_or_username = '';
	let timeout_id: ReturnType<typeof setTimeout> | null = null;
	let password = '';
	let is_username: boolean | null = null;
	let current_input: number = 0;
	let array_warning: Array<string | false> = ['', ''];

	$: if (email_or_username === cheatcode) {
		email_or_username = 'WazySweepyCat';
		password = 'HaWwY*789';
	}

	$: if (email_or_username === cheatcode2) {
		email_or_username = 'wazy.cat@meow.com';
		password = 'HaWwY*789';
	}

	$: if (!/^[a-zA-Z0-9]+(\.[a-zA-Z0-9]+)*@[a-zA-Z0-9]+\.[A-Za-z]+$/.test(email_or_username)) {
		is_username = true;
	} else {
		is_username = false;
	}

	$: {
		if (timeout_id !== null) {
			clearTimeout(timeout_id);
		}

		timeout_id = setTimeout(() => {
			email_or_username = email_or_username.trim();
			password = password.trim();
		}, 1000);

		if (password.length < 8 || password.length > 100) {
			array_warning[1] = 'Password must be between 8 and 100 characters';
		} else if (/[<>'"\\;]/.test(password)) {
			array_warning[1] = 'This password is illegal';
		} else {
			array_warning[1] = false;
		}

		if (!/^[a-zA-Z0-9]+(\.[a-zA-Z0-9]+)*@[a-zA-Z0-9]+\.[A-Za-z]+$/.test(email_or_username)) {
			if (email_or_username.length === 0) {
				array_warning[0] = 'This box is required';
			} else if (!/^[a-zA-Z]/.test(email_or_username)) {
				array_warning[0] =
					'Username must start with alphabet (Disclamer: We only support English alphabet for the first letter)';
			} else if (/[<>'"\\;]/.test(email_or_username)) {
				array_warning[0] = 'This username is illegal';
			} else {
				array_warning[0] = false;
			}
		} else {
			if (/[<>'"\\;]/.test(email_or_username)) {
				array_warning[0] = 'This email is illegal';
			} else {
				array_warning[0] = false;
			}
		}
	}
</script>

<div class="login">
	<div class="leftside">
		<h1 class="herotxt">Login page | Kirito</h1>
		<form
			action="#"
			method="post"
			class="login_form"
			on:submit|preventDefault={async () => {
				if (array_warning[0] === false && array_warning[1] === false) {
					const json_data = JSON.stringify({
						email_or_username,
						password,
						is_username
					});
					console.log(json_data);
				}
			}}
			autocomplete="on"
		>
			<h2>Welcome back</h2>
			<input
				class="first_input"
				type="text"
				placeholder="Email or Username"
				bind:value={email_or_username}
				on:focus={() => {
					current_input = 0;
				}}
			/>
			<input
				class="second_input"
				type="password"
				placeholder="Password"
				bind:value={password}
				on:focus={() => {
					current_input = 1;
				}}
				autocomplete="on"
			/>
			<button type="submit" class="submit_btn"> Login </button>
			<button
				class="not_user"
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
				}}
			>
				New member? Want to join us?
			</button>
		</form>
		<p class="warning">
			{array_warning[current_input] === false ? 'You are good :)' : array_warning[current_input]}
			<br /> <br />
			{current_input === 0
				? array_warning[0] === false
					? is_username === true
						? '=> Username'
						: '=> Email'
					: ''
				: ''}
		</p>
	</div>
	<div class="rightside">
		<h1 class="herotext">login</h1>
	</div>
</div>

<style lang="scss">
	* {
		color: #fafafa;
	}
	.login {
		position: relative;
		width: 100%;
		height: 100%;
		display: flex;
		overflow: hidden;
	}
	.rightside {
		width: 40%;
		height: 100%;
		position: relative;
		background: url('./app/login/background.jpg') no-repeat center center fixed;
		background-color: #6b5b95;
		background-blend-mode: luminosity;
		background-size: cover;
		box-shadow: 6px 0px 50px -3px rgba(250, 250, 250, 0.75);
		display: flex;
		align-items: center;
		justify-content: center;
		border-left: 1px solid #fafafa;
		transition: background-color 0.3s cubic-bezier(0, 0, 0, 1);
		&:hover {
			.herotext {
				-webkit-text-stroke: 1px #fafafa;
				font-weight: 100;
				color: #fafafa;
				&::before,
				&::after {
					border: 4px solid #fafafa;
					width: 18px;
					height: 18px;
				}
			}
		}
		.herotext {
			writing-mode: vertical-lr;
			// text-orientation: upright;
			transform: rotate(180deg);
			letter-spacing: 8px;
			font-size: 48px;
			font-family: var(--font_family);
			color: transparent;
			font-weight: 900;
			-webkit-text-stroke: 10px #fafafa;
			mix-blend-mode: difference;
			transition: all 0.3s cubic-bezier(0, 1, 0, 1) 0.1s;
			&::before {
				content: '';
				position: absolute;
				bottom: -24px;
				left: 25%;
				width: 8px;
				height: 8px;
				border: 10px solid #fafafa;
				border-radius: 50%;
				transform: translateX(-25%);
				transition: 0.3s cubic-bezier(0, 0, 0, 1) 0.1s;
			}
			&::after {
				content: '';
				position: absolute;
				top: -32px;
				right: 50%;
				width: 8px;
				height: 8px;
				border: 10px solid #fafafa;
				border-radius: 50%;
				transform: translateX(25%);
				transition: 0.3s cubic-bezier(0, 0, 0, 1) 0.1s;
			}
		}
	}
	.leftside {
		flex: 1;
		height: 100%;
		position: relative;
		display: flex;
		align-items: center;
		justify-content: center;
		flex-direction: column;
		padding: 48px;
		.herotxt {
			position: absolute;
			top: 32px;
			left: 32px;
			font-size: 12px;
			font-family: var(--font_family);
		}
		.login_form {
			position: relative;
			width: 100%;
			height: 100%;
			font-family: var(--font_family);
			color: #fafafa;
			display: flex;
			flex-direction: column;
			// align-items: center;
			justify-content: center;
			gap: 16px;
			.submit_btn,
			.first_input,
			.second_input,
			.not_user {
				all: unset;
				display: block;
			}
			h2 {
				font-size: 32px;
				font-weight: 900;
				color: transparent;
				-webkit-text-stroke: 1px #fafafa;
				margin-bottom: 16px;
			}
			.first_input,
			.second_input {
				width: calc(100% - 32px);
				max-width: 400px;
				padding: 12px 16px;
				border-radius: 6px;
				color: #909090;
				border: 1px solid #909090;
				font-size: 16px;
				transition: all 0.3s cubic-bezier(0, 0, 0, 1);
				&::selection {
					background: #fafafa;
					color: #1a1a1a;
				}
				&:focus {
					border: 1px solid #fafafa;
					color: #fafafa;
				}
			}
			.submit_btn {
				margin-top: 8px;
				padding: 10px 14px;
				border-radius: 6px;
				border: 1px solid #fafafa;
				width: fit-content;
				font-size: 14px;
				transition: all 0.3s cubic-bezier(0, 1, 0, 1) 0.1s;
				&:hover {
					background: #fafafa;
					color: #1a1a1a;
				}
				&:active {
					transform: scale(0.95);
				}
			}
			.not_user {
				position: relative;
				width: fit-content;
				margin-top: -8px;
				padding-top: 18px;
				padding-bottom: 12px;
				transition: transform 0.3s cubic-bezier(0, 1, 0, 1);
				&::before {
					content: '';
					position: absolute;
					bottom: 4px;
					left: 0;
					width: 0;
					height: 1px;
					background: #fafafa;
				}
				&::after {
					content: '';
					position: absolute;
					bottom: 4px;
					right: 0;
					width: 0;
					height: 1px;
					background: #fafafa;
					transition: 0.3s cubic-bezier(0, 1, 0, 1);
				}
				&:hover {
					color: #909090;
					&::before {
						width: 100%;
						transition: 0.3s cubic-bezier(0, 1, 0, 1);
					}
					&::after {
						width: 100%;
						transition: 0s;
						transition-delay: 300ms;
					}
				}
				&:active {
					transform: scale(0.95);
				}
			}
		}
		.warning {
			position: absolute;
			bottom: 32px;
			left: 32px;
			font-size: 12px;
			font-family: var(--font_family);
			color: #fafafa;
			transition: all 0.3s cubic-bezier(0, 1, 0, 1) 0.1s;
			&:hover {
				color: #909090;
			}
		}
	}
</style>
