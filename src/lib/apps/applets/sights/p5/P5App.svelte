<script>

    import P5Sketches from "./applets/P5Sketches.svelte";

	import Header from "$lib/components/Header.svelte";
    import ResponsiveContainer from "$lib/components/ResponsiveContainer.svelte";

    const tabs = [
        { label: 'Sketches', component: P5Sketches },
    ];

    let CurrentTab = $state(tabs[0]);

    let appHeight = $state();
    let headerHeight = $state();
    let appContentHeight = $derived(appHeight - headerHeight);
    
</script>

<main class="app-container flex grow flex-col"  bind:clientHeight={appHeight}>
    <ResponsiveContainer>
        <div class="app-header" bind:clientHeight={headerHeight}>
            <Header {tabs} bind:currentTab={CurrentTab}></Header>
        </div>
        <div class="app-content flex-1" style="max-height: {appContentHeight}px; min-height: {appContentHeight}px;">
            <CurrentTab.component></CurrentTab.component>
        </div>
    </ResponsiveContainer>
</main>

<style>

    .app-container {
        max-height: inherit;
    }

</style>
