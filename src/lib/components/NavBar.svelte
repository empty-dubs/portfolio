<script lang="ts">
    let { items, currentComponent = $bindable() } = $props();

    const selectItem = item => {
        currentComponent = item;
    };
</script>

<main class="navbar flex flex-col">
    {#each items as item (item.label)}
        <button class="menu-item" onclick={() => selectItem(item)}>{item.label}</button>
    {/each}
</main>

<style>

    .navbar {
        max-height: inherit;
    }

    button {
        background-color: transparent;

        border: None;

        text-align: left;
    }

    .menu-item {
        margin: 0.5rem 0;
        padding: 0.25rem;

        cursor: pointer;
    }

    .menu-item:hover {
        background-color: #ddd;
    }
</style>
