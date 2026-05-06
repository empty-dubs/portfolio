<script lang="ts">

    import attributes from '$lib/apps/data/home-app-attributes.json';

    let homeContainer: HTMLElement;

    function moveAttributes (homeContainer: HTMLElement) {
        const elems: NodeListOf<HTMLElement> = document.querySelectorAll('.home-attribute');
        const id = setInterval(frame, 5);

        let t: number = 0;

        function frame () {
            if (t === 35000000) {
                clearInterval(id);
            } else {
                elems.forEach((element, index) => {
                    element.style.top = homeContainer.clientHeight * (1 + Math.cos(index + t / 1000)) / 2 + 'px';
                    element.style.left = homeContainer.clientWidth * (3 + 20 * Math.sin(index + t / 1000)) / 60 + 'px';
                });

                t++;
            }
        }
    }

    $effect(() => {
        moveAttributes(homeContainer);
    });

</script>

<main class="app-container flex-1" bind:this={homeContainer}>
    {#each attributes as { text, size } (text) }
        <div class='home-attribute' style="font-size: {10 * size}px; zIndex=0">
            <p>{text}</p>
        </div>
    {/each}
</main> 

<style>
    .app-container {
        max-height: inherit;
        min-height: inherit;
        max-width: inherit;
        overflow: hidden;
    }

    :global(.home-attribute) {
        position: relative;
        float:left;

        filter: blur(0);
    }

</style>
