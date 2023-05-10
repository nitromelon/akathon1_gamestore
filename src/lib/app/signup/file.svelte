<script lang="ts">
	import { frame_collection } from '$lib/main_screen/collection/window';

	const cheatcode: string = 'CownyJummyWuvwySweatyGeometwySausagy';
	let form: HTMLFormElement | null = null;
	let warning: Array<string | false> = ['', '', '', '', '', '', ''];
	let firstname: string = '';
	let lastname: string = '';
	let username: string = '';
	let password: string = '';
	let email: string = '';
	let phonenumber: string = '';
	let address: string = '';
	let current_input: number = 0;
	// 0 = firstname, 1 = lastname, 2 = username, 3 = password, 4 = email, 5 = phonenumber, 6 = address
	let timeout_id: ReturnType<typeof setTimeout> | null = null;
	$: if (firstname === cheatcode) {
		firstname = 'Hawwywuvdebug';
		lastname = 'Pottew';
		username = 'Avada_Kedavwa_uwu';
		password = 'HaWwY*789';
		email = 'hawwy.pottew@hogwawts.edu';
		phonenumber = '+44123456789';
		address = '4 Pwivet Dwive, W-Wittwe Whinging, Suwwey';
	}
	$: {
		if (timeout_id !== null) {
			clearTimeout(timeout_id);
		}
		timeout_id = setTimeout(() => {
			firstname = firstname.trim();
			lastname = lastname.trim();
			username = username.trim();
			password = password.trim();
			email = email.trim();
			phonenumber = phonenumber.trim();
			address = address.trim();
		}, 1000);
		if (phonenumber[0] !== '+') {
			phonenumber = '+' + phonenumber;
		}
		if (firstname === '') {
			warning[0] = 'Firstname must not be empty';
		} else if (firstname.length < 2) {
			warning[0] = 'Firstname must be at least 2 characters long';
		} else if (firstname.length > 20) {
			warning[0] = 'Firstname must be at most 20 characters long';
		} else if (firstname.match(/[^a-zA-Z]/g)) {
			warning[0] =
				'Firstname must not contain number or special character (Disclamer: We only support English alphabet and not space)';
		} else if (firstname.match(/[\u{1F600}-\u{1F6FF}]/gu)) {
			warning[0] = 'Firstname must not contain emoji';
		} else if (firstname[0] !== firstname[0]?.toUpperCase()) {
			warning[0] = 'Firstname must start with capital letter';
		} else {
			warning[0] = false;
		}

		if (lastname === '') {
			warning[1] = 'Lastname must not be empty';
		} else if (lastname.length < 2) {
			warning[1] = 'Lastname must be at least 2 characters long';
		} else if (lastname.length > 20) {
			warning[1] = 'Lastname must be at most 20 characters long';
		} else if (lastname.match(/[^a-zA-Z]/g)) {
			warning[1] =
				'Lastname must not contain number or special character (Disclamer: We only support English alphabet and not space)';
		} else if (lastname.match(/[\u{1F600}-\u{1F6FF}]/gu)) {
			warning[1] = 'Lastname must not contain emoji';
		} else if (lastname[0] !== lastname[0]?.toUpperCase()) {
			warning[1] = 'Lastname must start with capital letter';
		} else {
			warning[1] = false;
		}

		if (username === '') {
			warning[2] = 'Username must not be empty';
		} else if (!/^[a-zA-Z]/.test(username)) {
			warning[2] =
				'Username must start with alphabet (Disclamer: We only support English alphabet for the first letter)';
		} else if (/[<>'"\\;]/.test(username)) {
			warning[2] = 'Sorry, this user name is forbidden';
		} else {
			warning[2] = false;
		}

		if (password === '') {
			warning[3] = 'Password must not be empty';
		} else if (password.length < 8) {
			warning[3] = 'Password must be at least 8 characters long';
		} else if (password.length > 100) {
			warning[3] = 'Password must be at most 100 characters long';
		} else if (!/[A-Z]/.test(password)) {
			warning[3] = 'Password must contain at least 1 uppercase letter';
		} else if (!/[a-z]/.test(password)) {
			warning[3] = 'Password must contain at least 1 lowercase letter';
		} else if (!/[0-9]/.test(password)) {
			warning[3] = 'Password must contain at least 1 number';
		} else if (/[<>'"\\;]/.test(password)) {
			warning[3] = 'Sorry, this password is forbidden';
		} else if (password.match(/[\u{1F600}-\u{1F6FF}]/gu)) {
			warning[3] = 'Password must not contain emoji';
		} else if (!/[!@#$%^&*()_+\-=[\]{}:|,./?]/.test(password)) {
			warning[3] = 'Password must contain at least 1 symbol';
		} else {
			warning[3] = false;
		}

		if (email === '') {
			warning[4] = 'Email must not be empty';
		} else if (!/^[a-zA-Z0-9]+(\.[a-zA-Z0-9]+)*@[a-zA-Z0-9]+\.[A-Za-z]+$/.test(email)) {
			warning[4] = 'Email is invalid';
		} else {
			warning[4] = false;
		}

		if (phonenumber === '') {
			warning[5] = 'Phone number must not be empty';
		} else if (!/^\+/.test(phonenumber)) {
			warning[5] = 'Phone number must start with +';
		} else if (!/^\+[0-9]+$/.test(phonenumber)) {
			warning[5] = 'Phone number must contain only number';
		} else if (phonenumber.length < 8) {
			warning[5] = 'Phone number must be at least 7 digits long';
		} else if (phonenumber.length > 16) {
			warning[5] = 'Phone number must be at most 15 digits long';
		} else {
			warning[5] = false;
		}

		if (address === '') {
			warning[6] = 'Address must not be empty';
		} else if (address.match(/[\u{1F600}-\u{1F6FF}]/gu)) {
			warning[6] = 'Address must not contain emoji';
		} else if (/[<>'"\\;]/.test(address)) {
			warning[6] = 'Sorry, this address is forbidden';
		} else {
			warning[6] = false;
		}
	}

	const jump = (event: KeyboardEvent) => {
		if (event.key === 'Enter') {
			event.preventDefault();
			if (warning[current_input] === false) {
				current_input++;
			}
		}
	};
</script>

<div class="signup">
	<div class="showinfo">
		<h1 class="header_txt">
			{firstname !== 'Hawwywuvdebug'
				? "Hello, Kirito. I'm here to join the party !!1"
				: "Hewwo, Kiwito. I'm h-h-hewe t-to join the x3 pawty !!1"}
		</h1>
		<span class="body_txt">
			<span>{firstname !== 'Hawwywuvdebug' ? `"Hi, my name is` : `"Hi, my nyame is`}</span>
			<span class="box">{firstname === '' ? '\u200e' : firstname}</span>
			<span class="box">{lastname === '' ? '\u200e' : lastname}</span>
			<span>
				{firstname !== 'Hawwywuvdebug'
					? `, and I'm here to join the party. I would like to be nicknamed as`
					: `, and I'm h-h-hewe t-to join the x3 pawty. I w-wouwd wike *screams* t-to be nyicknyamed as`}</span
			>
			<span class="box">{username === '' ? '\u200e' : username}</span>
			<span>
				{firstname !== 'Hawwywuvdebug'
					? `. And there will be a secret password to know that I'm the real`
					: `.-.-. And thewe wiww be a secwet passwowd ^-^ t-to knyow that I'm the x3 weaw`}
				{username === '' ? 'one' : `"${username}"`}
			</span>
			<span>
				{firstname !== 'Hawwywuvdebug'
					? ` login in. The secret password is `
					: ` wogin *twerks* in. the *runs away* secwet passwowd ^-^ is `}
			</span>
			<span
				class="box"
				title={firstname !== 'Hawwywuvdebug'
					? 'You have to remember. Do not forget.'
					: 'You have t-to wemembew. Do nyot fowget.'}
			>
				{password === '' ? '\u200e' : password.replace(/./g, '*')}
			</span>
			<span>
				{firstname !== 'Hawwywuvdebug'
					? `. I'm looking forward to join the party. Oh, by the way, here is my phone number `
					: `.-.-. I'm wooking fowwawd t-to join the x3 pawty. Oh, by the x3 way, h-h-hewe is my phonye nyumbew `}
			</span>
			<span class="box">{phonenumber === '' || phonenumber === '+' ? '\u200e' : phonenumber}</span>
			<span>
				{firstname !== 'Hawwywuvdebug' ? `and my address` : `and my addwess`}
			</span>
			<span class="box">{address === '' ? '\u200e' : address}</span>
			<span>
				{firstname !== 'Hawwywuvdebug'
					? `. I'm looking forward to fullfil my dream when joining this game store."`
					: `.-.-. I'm wooking fowwawd t-to f-fuwwfiw my dweam when *notices buldge* joinying *looks at you* this game s-stowe."`}
			</span>
			<br />
			<span>
				{firstname !== 'Hawwywuvdebug'
					? `You can contact me through`
					: `You c-can contact me thwough`}
			</span>
			<span class="box">{email === '' ? '\u200e' : email}</span>.
			<br />
			<span>
				{firstname !== 'Hawwywuvdebug' ? `Sincerely,` : `Sincewewy,`}
			</span>
			<br />
			<span>
				{firstname === '' ? '\u200e' : firstname}
				{lastname === '' ? '\u200e' : lastname}
			</span>
		</span>
	</div>
	<div class="inputarea">
		<hr />
		<div class="halfleft">
			<form
				action=""
				method="post"
				on:submit|preventDefault={async () => {
					if (warning.every((item) => item === false)) {
						const post_json = JSON.stringify({
							firstname,
							lastname,
							username,
							password,
							email,
							phonenumber,
							address
						});

						const res = await fetch('http://localhost:3000/signup', {
							method: 'POST',
							credentials: 'include',
							headers: {
								'Content-Type': 'application/json'
							},
							body: post_json
						});

						const data = await res.json();
						console.log(data);
					}
				}}
				bind:this={form}
				autocomplete="on"
			>
				<input
					class="single_input"
					type="text"
					name="firstname"
					id="signup_input_firstname"
					bind:value={firstname}
					placeholder="Firstname"
					style="display: {current_input === 0 ? 'inline-block' : 'none'};"
					on:keydown={jump}
				/>
				<input
					class="single_input"
					type="text"
					name="lastname"
					id="signup_input_lastname"
					bind:value={lastname}
					placeholder="Lastname"
					style="display: {current_input === 1 ? 'inline-block' : 'none'};"
					on:keydown={jump}
				/>
				<input
					class="single_input"
					type="text"
					name="username"
					id="signup_input_username"
					bind:value={username}
					placeholder="Username"
					style="display: {current_input === 2 ? 'inline-block' : 'none'};"
					on:keydown={jump}
				/>
				<input
					class="single_input"
					type="password"
					name="password"
					id="signup_input_password"
					bind:value={password}
					placeholder="Password"
					style="display: {current_input === 3 ? 'inline-block' : 'none'};"
					on:keydown={jump}
					autocomplete="on"
				/>
				<input
					class="single_input"
					type="email"
					name="email"
					id="signup_input_email"
					bind:value={email}
					placeholder="Email"
					style="display: {current_input === 4 ? 'inline-block' : 'none'};"
					on:keydown={jump}
				/>
				<input
					class="single_input"
					type="tel"
					name="phonenumber"
					id="signup_input_phonenumber"
					bind:value={phonenumber}
					placeholder="Phone number"
					style="display: {current_input === 5 ? 'inline-block' : 'none'};"
					on:keydown={jump}
				/>
				<input
					class="single_input"
					type="text"
					name="address"
					id="signup_input_address"
					bind:value={address}
					placeholder="Address"
					style="display: {current_input === 6 ? 'inline-block' : 'none'};"
					on:keydown={(event) => {
						if (event.key === 'Enter') {
							event.preventDefault();
							if (
								warning.every((item) => item === false) &&
								form !== null &&
								warning[6] === false
							) {
								// form.submit();
								// Todo
							}
						}
					}}
				/>
				<p class="warning">
					{warning[current_input] === false ? 'You are good :)' : warning[current_input]}
				</p>
				<button
					class="previous"
					style="display: {current_input === 0 ? 'none' : 'inline-block'};"
					on:click|preventDefault={() => {
						if (current_input > 0) {
							setTimeout(() => {
								current_input--;
							}, 100);
						}
					}}
				>
					{firstname !== 'Hawwywuvdebug' ? `previous` : `pwevious *screams*`}
				</button>
				<button
					class="next"
					style="display: {current_input === 6 ? 'none' : 'inline-block'};"
					on:click|preventDefault={() => {
						if (current_input < 6) {
							setTimeout(() => {
								current_input++;
							}, 100);
						}
					}}
				>
					{firstname !== 'Hawwywuvdebug' ? `next` : `nyext`}
				</button>
				<input
					type="submit"
					value={firstname !== 'Hawwywuvdebug' ? `Let's go!` : `Wet's go?!?!`}
					class="submit_btn"
					style="opacity: {warning.every((item) => item === false) ? '1' : '0'};"
				/>
				<button
					class="notmemyet"
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
					}}
				>
					Already our member?
				</button>
			</form>
		</div>
		<div class="halfright">
			<ul class="list">
				<p class="todo">Todo:</p>
				<li class="elemment">
					<a
						href="#firstname"
						on:click|preventDefault={() => {
							current_input = 0;
						}}
						style="--strike0: {warning[0] === false ? 'calc(100% + 16px)' : '0%'};"
					>
						First name
					</a>
				</li>
				<li class="elemment">
					<a
						href="#lastname"
						on:click|preventDefault={() => {
							current_input = 1;
						}}
						style="--strike1: {warning[1] === false ? 'calc(100% + 16px)' : '0%'};"
					>
						Last name
					</a>
				</li>
				<li class="elemment">
					<a
						href="#username"
						on:click|preventDefault={() => {
							current_input = 2;
						}}
						style="--strike2: {warning[2] === false ? 'calc(100% + 16px)' : '0%'};"
					>
						User name
					</a>
				</li>
				<li class="elemment">
					<a
						href="#password"
						on:click|preventDefault={() => {
							current_input = 3;
						}}
						style="--strike3: {warning[3] === false ? 'calc(100% + 16px)' : '0%'};"
					>
						Password
					</a>
				</li>
				<li class="elemment">
					<a
						href="#email"
						on:click|preventDefault={() => {
							current_input = 4;
						}}
						style="--strike4: {warning[4] === false ? 'calc(100% + 16px)' : '0%'};"
					>
						Email
					</a>
				</li>
				<li class="elemment">
					<a
						href="#phonenumber"
						on:click|preventDefault={() => {
							current_input = 5;
						}}
						style="--strike5: {warning[5] === false ? 'calc(100% + 16px)' : '0%'};"
					>
						Phone number
					</a>
				</li>
				<li class="elemment">
					<a
						href="#address"
						on:click|preventDefault={() => {
							current_input = 6;
						}}
						style="--strike6: {warning[6] === false ? 'calc(100% + 16px)' : '0%'};"
					>
						Address
					</a>
				</li>
			</ul>
		</div>
	</div>
</div>

<style lang="scss">
	*::selection {
		background-color: #fafafa;
		color: #1a1a1a;
	}
	.signup {
		position: relative;
		width: 100%;
		height: 100%;
		overflow: hidden;
		font-family: var(--font_family);
		.showinfo {
			position: relative;
			width: 100%;
			height: calc(100% - 256px);
			overflow: hidden;
			overflow-y: auto;
			scrollbar-width: thin;
			scrollbar-color: #fafafa #1a1a1a;
			padding: 32px;
			&::-webkit-scrollbar {
				width: 8px;
				border: 1px solid #1a1a1a;
				border-radius: 100px;
			}
			&::-webkit-scrollbar-thumb {
				border: 1px solid #1a1a1a;
				background-color: #fafafa;
				border-radius: 100px;
			}
			.header_txt {
				font-size: 32px;
				font-weight: 900;
				color: transparent;
				-webkit-text-stroke: 1px #fafafa;
				line-height: 1.2;
				margin-bottom: 16px;
			}
			.body_txt {
				position: relative;
				font-size: 16px;
				color: #fafafa;
				line-height: 2;
				font-style: italic;
				display: block;
				span {
					transition: opacity 0.3s cubic-bezier(0, 0, 0, 1);
				}
				.box {
					position: relative;
					display: inline-block;
					min-width: 100px;
					width: fit-content;
					max-width: 100%;
					min-height: 24px;
					border: 1px solid #fafafa;
					border-radius: 6px;
					margin: 0px 8px;
					padding: 0px 8px;
					font-style: normal;
					text-align: center;
					overflow: hidden;
					white-space: nowrap;
					text-overflow: ellipsis;
					transform: translateY(12px);
				}
				&:hover {
					* {
						opacity: 0.5;
					}
					.box {
						opacity: 1;
					}
				}
			}
		}
		.inputarea {
			position: relative;
			width: 100%;
			height: 256px;
			position: relative;
			padding: 32px;
			padding-top: 8px;
			display: flex;
			flex-direction: row;
			justify-content: space-between;
			align-items: center;
			hr {
				position: absolute;
				top: 8px;
				height: 1px;
				width: calc(100% - 64px);
				background-color: #fafafa;
			}
			.halfleft,
			.halfright {
				position: relative;
				height: 100%;
				overflow: hidden;
				padding-top: 8px;
			}
			.halfleft {
				flex: 1;
				form {
					position: relative;
					width: 100%;
					height: 100%;
					overflow: hidden;
					input {
						all: unset;
						// box-sizing: border-box;
						color: #fafafa;
						&:focus {
							color: #fafafa;
							border: 1px solid #fafafa;
						}
					}
					.submit_btn {
						// display: none !important;
						position: absolute;
						bottom: 0;
						left: 0;
						min-width: 80px;
						padding: 4px 16px;
						height: 32px;
						border: 1px solid #fafafa;
						border-radius: 100px;
						display: flex;
						justify-content: center;
						align-items: center;
						transition: 0.3s cubic-bezier(0, 0, 0, 1), transform 0.3s cubic-bezier(0, 1, 0, 1);
						white-space: nowrap;
						&:hover {
							background-color: #fafafa;
							color: #1a1a1a;
						}
						&:active {
							transform: scale(0.95);
						}
					}
					.notmemyet {
						all: unset;
						position: absolute;
						bottom: 0;
						right: 0;
						padding: 4px 0px;
						height: 32px;
						// border: 1px solid #fafafa;
						// border-radius: 100px;
						display: flex;
						justify-content: center;
						align-items: center;
						color: #fafafa;
						transition: 0.3s cubic-bezier(0, 0, 0, 1), transform 0.3s cubic-bezier(0, 1, 0, 1);
						white-space: nowrap;
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
					.single_input {
						box-sizing: border-box;
						margin-top: 16px;
						position: relative;
						width: 100%;
						height: 36px;
						border: 1px solid #909090;
						color: #909090;
						border-radius: 100px;
						padding: 0px 16px;
						transition: 0.25s cubic-bezier(0, 0, 0, 1);
					}
					.next,
					.previous {
						all: unset;
						margin-top: 16px;
						padding: 8px 16px;
						border: 1px solid #fafafa;
						border-radius: 6px;
						color: #fafafa;
						transition: 0.3s cubic-bezier(0, 0, 0, 1), transform 0.3s cubic-bezier(0, 1, 0, 1);
						&:hover {
							background-color: #fafafa;
							color: #1a1a1a;
						}
						&:active {
							transform: scale(0.95);
						}
					}
					.previous {
						margin-right: 16px;
					}
					.warning {
						color: #fafafa;
						margin-top: 16px;
						// display: none;
						font-size: 12px;
						line-height: 1.2;
					}
				}
			}
			.halfright {
				min-width: 30%;
				.list {
					position: relative;
					width: 100%;
					height: 100%;
					overflow: hidden;
					overflow-y: auto;
					scrollbar-width: none;
					scrollbar-color: #fafafa #1a1a1a;
					display: flex;
					flex-direction: column;
					align-items: center;
					gap: 16px;
					&::-webkit-scrollbar {
						display: none;
						width: 8px;
						border: 1px solid #1a1a1a;
						border-radius: 100px;
					}
					&::-webkit-scrollbar-thumb {
						border: 1px solid #fafafa;
						border-radius: 100px;
					}
					.elemment {
						width: 120px;
						transition: opacity 0.3s cubic-bezier(0, 0, 0, 1),
							transform 0.3s cubic-bezier(0, 1, 0, 1);
						transition-delay: 100ms;
						a {
							position: relative;
							color: #fafafa;
							text-decoration: none;
							font-size: 16px;
							cursor: none;
							outline: none;
							&::before {
								content: '';
								position: absolute;
								top: 50%;
								left: -8px;
								height: 2px;
								width: 0%;
								background-color: #fafafa;
								transform: translateY(-50%);
								transition: all 0.3s cubic-bezier(1, 0, 0, 1);
							}
						}
						&:nth-child(2) > a::before {
							width: var(--strike0);
						}
						&:nth-child(3) > a::before {
							width: var(--strike1);
						}
						&:nth-child(4) > a::before {
							width: var(--strike2);
						}
						&:nth-child(5) > a::before {
							width: var(--strike3);
						}
						&:nth-child(6) > a::before {
							width: var(--strike4);
						}
						&:nth-child(7) > a::before {
							width: var(--strike5);
						}
						&:nth-child(8) > a::before {
							width: var(--strike6);
						}
						&:last-child {
							margin-bottom: 48px;
						}
					}
					.todo {
						color: #9f9f9f;
						font-weight: 600;
						margin-top: 16px;
						width: 120px;
						font-size: 24px;
					}
					&:hover {
						scrollbar-width: thin;
						&::-webkit-scrollbar {
							display: block;
						}
						.elemment {
							opacity: 0.5;
							transform: scale(0.9);
							&:hover {
								opacity: 1;
								transform: scale(1);
							}
							&:active {
								transform: scale(0.9);
							}
						}
					}
				}
			}
		}
	}
</style>
