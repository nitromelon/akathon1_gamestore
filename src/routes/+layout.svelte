<script lang="ts">
	import '../app.scss';
	import MainScreen from '$lib/main_screen/ms.svelte';
	import { onMount } from 'svelte';

	onMount(() => {
		document.addEventListener('contextmenu', (e) => e.preventDefault());
	});
</script>

<MainScreen />

<slot />
