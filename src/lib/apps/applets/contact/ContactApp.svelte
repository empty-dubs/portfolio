<script>

    import Icon from 'svelte-awesome';

    import facebook from 'svelte-awesome/icons/facebook';
    import github from 'svelte-awesome/icons/github';
    import linkedin from 'svelte-awesome/icons/linkedin';
    import soundcloud from 'svelte-awesome/icons/soundcloud';

    import contactInfo from '$lib/apps/data/contact-info.json';
    import contactLinks from '$lib/apps/data/contact-links.json';

    const icons = [linkedin, facebook, soundcloud];

    Array.from(contactLinks, (contactLink, index) => {
        contactLink["icon"] = icons[index];
    });

</script>

<main class="app-container flex grow flex-col">
    <div>
        <h1>HIT ME UP</h1>
    </div>
    <div>
        {#each contactInfo as { text } (text)}
            <div>
                <p>{text}</p>
            </div>
        {/each}
    </div>
    <div>
        {#each contactLinks as { src, icon } (src)}
            <a href="{src}" rel="noopener" class="contact-icon" target="_blank">
                <Icon data={icon} scale={1.25}/>
            </a>
        {/each}
    </div>
    <div>
        <a href="https://github.com/" rel="noopener" class="contact-icon" target="_blank">
            <Icon data={github} scale={1.25}/>
        </a>
    </div>
</main>

<style>
    .app-container {
        text-align: center;
        position: relative;
        top: 20%;
        max-height: inherit;
    }

    .contact-icon {
        font-size: 20px;
        color: black;
        text-decoration: none;
    }

    .contact-icon:hover, .contact-icon:active, .contact-icon:visited {
        color: black;
    }

    h1 {
        font-size: 2.5rem;
    }

    p {
        padding: 5px;
    }
</style>
