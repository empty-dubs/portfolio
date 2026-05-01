<script lang="ts">

	import './layout.css';
	import '../app.css';

	import headerImage from '$lib/assets/chrysanthedad2.png'

	import { setWindowState } from '$lib/components/WindowState.svelte';

	let { children } = $props();

	setWindowState();

</script>

<svelte:head>
	<link rel="icon" href={headerImage} />
</svelte:head>

{@render children()}
