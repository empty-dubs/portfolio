<script lang="ts">

    import AnimationControls from "./AnimationControls.svelte";

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
        <input class="w-full" type="text" placeholder="Search" bind:value={searchText}>

        {#each filteredAnimations as animation (animation.metadata.name)}
            <button class="menu-item" onclick={() => selectItem(animation)}>{animation.metadata.text}</button>
            {#if animation === currentAnimation}
                <AnimationControls {animation}/>
            {/if}
        {/each}
    {/if}

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
