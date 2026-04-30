<script>

    import Accordion from "./Accordion.svelte";
    import Tabs from "./Tabs.svelte";

    import { getWindowState } from './WindowState.svelte';

    const windowState = getWindowState();

    let {tabs, currentTab = $bindable()} = $props();

    let open = $state(false);

    const tabChange = tab => {
        currentTab = tab;
    };

</script>

{#if windowState.screenType === 'phone'}
    <Accordion {open} icon='hamburger'>
        <div class="tabs flex flex-col">
            {#each tabs as tab (tab.label)}
                <button class:active={tab.label === currentTab.label} onclick={() => tabChange(tab)}>
                    {tab.label}
                </button> 
            {/each}
        </div>
    </Accordion>
    {:else}
        <Tabs tabs={tabs} bind:currentTab={currentTab}/>
{/if}
