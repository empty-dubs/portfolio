<script>
    let {tabs, currentTab = $bindable()} = $props();

    const tabChange = tab => {
        currentTab = tab
    };
</script>

<div class="tabs flex">
    {#each tabs as tab (tab.label)}
        <button class:active={tab.label === currentTab.label} onclick={() => tabChange(tab)}>
            {tab.label}
        </button> 
    {/each}
</div>

<style>
    .tabs {
        margin-bottom: 20px;
    }

    button {
        background-color: transparent;

        margin: 0 16px;
        border: none;

        color: #B0B0B0;
        font-size: 18px;

        cursor: pointer;
    }

    .active {
        border-bottom: 2px solid #888888;        

        color: #B0B0B0;
    }


</style>
