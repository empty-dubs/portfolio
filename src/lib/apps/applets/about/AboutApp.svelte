<script>

    import Icon from 'svelte-awesome';

    import github from 'svelte-awesome/icons/github';
    import linkedin from 'svelte-awesome/icons/linkedin';
    import soundcloud from 'svelte-awesome/icons/soundcloud';

    import aboutLinks from '$lib/apps/data/about-links.json';

    const icons = [github, linkedin, soundcloud];

    Array.from(aboutLinks, (aboutLink, index) => {
        aboutLink["icon"] = icons[index];
    });

</script>

<main class="app-container flex grow flex-col items-center justify-center">
    <div class='icon-set flex'>
        {#each aboutLinks as { src, icon } (src)}
            <a href="{src}" rel="noopener" class="icon" target="_blank">
                <Icon data={icon} scale={1.75}/>
            </a>
        {/each}
    </div>
    <div>
        <p>head in the clouds</p>
    </div>
</main>

<style>
    .app-container {
        max-height: inherit;
        min-height: inherit;

        text-align: center;
    }

    .icon-set {
        gap: 28px;
    }

    p {
        padding: 5px;
    }
    
</style>
