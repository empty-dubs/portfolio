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

<main class="app-container flex grow flex-col">
    <div>
        <p>head in the clouds</p>
    </div>
    <div>
        {#each aboutLinks as { src, icon } (src)}
            <a href="{src}" rel="noopener" class="about-icon" target="_blank">
                <Icon data={icon} scale={1.75}/>
            </a>
        {/each}
    </div>
</main>

<style>
    .app-container {
        text-align: center;
        position: relative;
        top: 20%;
        max-height: inherit;
    }

    .about-icon {
        font-size: 20px;
        color: black;
        text-decoration: none;
    }

    .about-icon:hover, .about-icon:active, .about-icon:visited {
        color: black;
    }

    h1 {
        font-size: 2.5rem;
    }

    p {
        padding: 5px;
    }
</style>
