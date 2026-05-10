<script>

    import { getWindowState } from './WindowState.svelte';

    const windowState = getWindowState();

    let {tabs, currentTab = $bindable()} = $props();

    const tabChange = tab => {
        currentTab = tab
    };
</script>

<div class="tabs flex {windowState.screenType === 'monitor' ? 'monitor' : 'other'}">
    {#each tabs as tab (tab.label)}
        <button class:active={tab.label === currentTab.label} onclick={() => tabChange(tab)}>
            {tab.label}
        </button> 
    {/each}
</div>

<style>
    .tabs.monitor {
        margin-bottom: 20px;
    }

    button {
        font-size: 18px;

        margin: 0 16px;
        border: none;

        cursor: pointer;
    }

    .active {
        border-bottom: 2px solid;   
    }

</style>
