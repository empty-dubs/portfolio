<!-- currently unused -->

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

<main class="app-container flex grow flex-row justify-center {windowState.screenType}">
    {#if windowState.screenType === "monitor"}
        <div class="flex grow items-center">
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
        </div>
        {:else}
            <div class='flex flex-col'>
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

    .app-container {
        overflow: auto;
    }

    .app-container.monitor {
        overflow: hidden;
    }

    .cv-slider-arrow {
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
