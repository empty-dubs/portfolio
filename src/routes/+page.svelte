<script lang='ts'>

    import AboutApp from "$lib/apps/applets/about/AboutApp.svelte";
    import SightsApp from "$lib/apps/applets/sights/SightsApp.svelte";
    import MediaApp from "$lib/apps/applets/sounds/SoundsApp.svelte";

    import Header from "$lib/components/Header.svelte";
    import Footer from "$lib/components/Footer.svelte";

    const tabs = [
        { label: 'About', component: AboutApp },
        { label: 'Sights', component: SightsApp },
        { label: 'Sounds', component: MediaApp },
    ];

    let CurrentTab = $state(tabs[0]);

    let appHeight: number = $state(0);
    let headerHeight: number = $state(0);
    let footerHeight: number = $state(0);

    let appContentHeight = $derived(appHeight - headerHeight - footerHeight);

</script>

<main id="app-container" class="flex grow flex-col h-screen" bind:clientHeight={appHeight}>

    <Header {tabs} bind:currentTab={CurrentTab} bind:headerHeight={headerHeight}></Header>

    <div class="app-content flex grow" bind:clientHeight={appContentHeight} style="max-height:{appContentHeight}px;">
        <CurrentTab.component></CurrentTab.component>
    </div>

    <Footer bind:footerHeight={footerHeight}/>

</main>

<style>

    #app-container {
        overflow: hidden;
    }

</style>
