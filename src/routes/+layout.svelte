<script lang="ts">

	import './layout.css';
	import '../app.css';

	import favicon from '$lib/assets/favicon.ico'

	import { setWindowState } from '$lib/components/WindowState.svelte';

	let { children } = $props();

	setWindowState();

</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

{@render children()}
