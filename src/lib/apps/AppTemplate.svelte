<script>

    import IconTab from "./components/IconTab.svelte";

    import ContactApp from "$lib/apps/website/applets/ContactApp.svelte";
    import CVApp from "$lib/apps/website/applets/CVApp.svelte";
    import HomeApp from "$lib/apps/website/applets/HomeApp.svelte";
    import MediaApp from "$lib/apps/website/applets/MediaApp.svelte";

	import Header from "$lib/components/Header.svelte";

    const tabs = [
        { label: 'Home', component: HomeApp },
        { label: 'Sounds', component: MediaApp },
        { label: 'CV', component: CVApp },
        { label: 'Contact', component: ContactApp },
    ];

    let CurrentTab = $state(tabs[0]);

    let appHeight = $state();
    let headerHeight = $state();
    let appContentHeight = $derived(appHeight - headerHeight);

</script>

<main class="app-container flex grow flex-col" bind:clientHeight={appHeight}>
    <div class="app-header flex flex-row" bind:clientHeight={headerHeight}>
        <div class="tabs flex-1">
            <Header {tabs} bind:currentTab={CurrentTab}></Header>
        </div>
        <div class="icons">
            <IconTab></IconTab>
        </div>
    </div>
    <div class="app-content flex-1" style="max-height: {appContentHeight}px; min-height: {appContentHeight}px;">
        <CurrentTab.component></CurrentTab.component>
    </div>
</main>

<style>

    .app-container {
        max-height: inherit;
    }

    .tabs {
        justify-content: flex-start;
    }

    .icons {
        justify-content: flex-end;
    }

</style>
