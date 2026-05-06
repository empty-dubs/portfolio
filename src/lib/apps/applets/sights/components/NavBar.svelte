<script lang="ts">

    let { animations, currentAnimation=$bindable() } = $props();

    let searchText = $state('');

    const selectItem = (animation: object): void => {
        currentAnimation = animation;
    };

    let filteredAnimations = $derived.by(() => {
        return animations.filter(animation => {
            return animation.metadata.text.toLowerCase().includes(searchText.toLowerCase());
        });
    });

</script>

<main class="navbar flex flex-col">
    {#if animations}
        <div>
            <input class="w-full" type="text" placeholder="Search" bind:value={searchText}>
        </div>
        <div class='animation-list flex flex-col'>
            {#each filteredAnimations as animation (animation.metadata.name)}
                <button class="menu-item" onclick={() => selectItem(animation)}>{animation.metadata.text}</button>
            {/each}
        </div>
    {/if}

</main>

<style>

    .navbar {
        max-height: inherit;

        overflow: hidden;
    }

    .animation-list {
        overflow: auto;
    }

    button {
        border: None;

        text-align: left;
    }

    .menu-item {
        margin: 0.5rem 0.5rem 0.5rem 0.5rem;
        padding: 0.25rem;

        cursor: pointer;
    }

    .menu-item:hover {
        color: #ddd;
    }
</style>
