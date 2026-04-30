<script>

	import mediaPlayers from '$lib/apps/data/media-players.json';

</script>

<main class="app-container items-center justify-center flex-1 w-full">
    {#each mediaPlayers as { name, embedref } (name)}
        <div>
            <span>
                {@html embedref}
            </span>
        </div>
    {/each}
</main>

<style>

    .app-container {
        text-align: center;
        max-height: inherit;
        min-height: inherit;

        max-width: 25%;
        display: block;
        margin: auto;
    }

</style>
