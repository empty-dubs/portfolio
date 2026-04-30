<script lang="ts">

    import Icon from 'svelte-awesome';

    import chevronLeft from 'svelte-awesome/icons/chevronLeft';
    import chevronRight from 'svelte-awesome/icons/chevronRight';

    import { getWindowState } from '$lib/components/WindowState.svelte';

    import cvContents from '$lib/apps/data/cv-contents.json';

    const windowState = getWindowState();

    let currentSlide = $state(0);

    let contents = $state(cvContents);

    let visibleCvContents = $derived(contents.filter(content => content.display));

    function onSlideLeft(slideNumber: number): void {
        contents.forEach(content => {
            content.display = false;
        });

        currentSlide = currentSlide > 0 ? slideNumber - 1 : contents.length - 1;

        contents[currentSlide].display = true;
    };

    function onSlideRight(slideNumber: number): void {
        contents.forEach(content => {
            content.display = false;
        });

        currentSlide = (slideNumber + 1) % contents.length;

        contents[currentSlide].display = true;
    };

</script>

<main class="app-container items-center justify-center flex grow flex-row {windowState.screenType}">
    {#if windowState.screenType === "monitor"}
        <div class=flex-1>
            <button class="cv-slider-arrow" onclick={ () => onSlideLeft(currentSlide) }>
                <Icon data={chevronLeft} scale={1.25}/>
            </button>
        </div>
        <div class=flex-2>
            {#each visibleCvContents as { header, details} (header)}
                <div class="cv-section-container">
                    <h1>{header}</h1>
                    {#each details as { index, text, type } (index)}
                        <p class={type}>{text}</p>
                    {/each}
                </div>
            {/each}
        </div>
        <div class=flex-1>
            <button class="cv-slider-arrow" onclick={ () => onSlideRight(currentSlide) }>
                <Icon data={chevronRight} scale={1.25}/>
            </button>
        </div>
        {:else}
            <div>
                {#each contents as { header, details } (header)}
                    <div class='cv-section {windowState.screenType}'>
                        <h1>{header}</h1>
                        {#each details as { index, text, type } (index)}
                            <p class={type}>{text}</p>
                        {/each}
                    </div>
                {/each}
            </div>
    {/if}
</main>

<style>
    .app-container {
        max-height: inherit;
        min-height: inherit;

        text-align: center;
    }

    .app-container.monitor {
        overflow: hidden;
    }

    .cv-slider-arrow {
        background: none;
        border: none;
        outline: none;
        box-shadow: none;
        cursor: pointer;
    }
    .cv-organization {
        font-weight: bold;
    }

    h1 {
        font-size: 2.5rem;
    }

    p {
        padding: 5px;
    }

</style>
