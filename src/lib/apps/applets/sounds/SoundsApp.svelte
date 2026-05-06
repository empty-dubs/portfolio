<script>

	import mediaPlayers from '$lib/apps/data/media-players.json';

</script>

<main class="app-container grid grow items-center">
    {#each mediaPlayers as { name, embedref } (name)}
        <div class='card'>
            <span>
                {@html embedref}
            </span>
        </div>
    {/each}
</main>

<style>

    .app-container {
        grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
        gap: 1em;

        max-height: inherit;
        min-height: inherit;

        overflow-x: hidden;
        overflow-y: auto;

        text-align: center;
    }

    .card {
        padding: 2em;
    }

</style>
