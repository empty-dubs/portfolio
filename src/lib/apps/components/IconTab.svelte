<script>

    import Icon from 'svelte-awesome';

    import facebook from 'svelte-awesome/icons/facebook';
    import github from 'svelte-awesome/icons/github';
    import linkedin from 'svelte-awesome/icons/linkedin';
    import soundcloud from 'svelte-awesome/icons/soundcloud';

    const contactLinks = [
        { url: 'https://github.com', icon: github},
        { url: 'https://www.linkedin.com', icon: linkedin },
        { url: 'https://www.facebook.com', icon: facebook },
        { url: 'https://www.soundcloud.com', icon: soundcloud },
    ];

</script>

<main class="app-container flex grow flex-row">
    {#each contactLinks as { url, icon } (url)}
        <a href="{url}" rel="noopener" class="link-icon" target="_blank">
            <Icon data={icon} scale={1.25}/>
        </a>
    {/each}
</main>

<style>

    .link-icon {
        font-size: 20px;
        color: black;
        text-decoration: none;
        padding: 0.5rem;
    }

    .link-icon:hover, .link-icon:active, .link-icon:visited {
        color: black;
    }

</style>
