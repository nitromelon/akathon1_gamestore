<script lang="ts">
	import { onMount } from 'svelte';

	const text = 'Kirito | Gamestore';

	onMount(() => {
		const c = (a: number) => {
			if (a < text.length) {
				const b = text.slice(0, a + 1);
				document.title =
					' ' === b
						? '\u200e\u00a0'.repeat(text.length - a) + '\u200e\u00a0'
						: '\u200e\u00a0'.repeat(text.length - a) + b;
				setTimeout(() => {
					return c(a + 1);
				}, 250);
			} else {
				a === text.length &&
					setTimeout(() => {
						return d(a - 1);
					}, 250);
			}
		};
		const d = (a: number) => {
			if (0 <= a) {
				const b = text.substring(text.length - a);
				document.title = b.startsWith(' ') ? '\u200e\u00a0' + b : b + '\u200e';
				setTimeout(() => {
					return d(a - 1);
				}, 250);
			} else {
				-1 === a &&
					((document.title = '\u200e\u00a0'),
					setTimeout(() => {
						return c(0);
					}, 250));
			}
		};
		c(0);
	});
</script>

<!-- <h1>Welcome to SvelteKit</h1>
<p>Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation</p> -->
<svelte:head>
	<title />
	<meta name="description" content="Game store, Made by FullHD group" />
	<!-- <meta name="viewport" content="width=device-width,initial-scale=1" /> -->
</svelte:head>
