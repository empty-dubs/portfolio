<script lang="ts">

    import { onMount, onDestroy } from "svelte";

    import { getCanvas } from "./canvasContext";
    import CanvasManager from "./canvasManager";

    import type { CanvasContext } from "./canvasContext";

    let container: HTMLCanvasElement;

    const canvasContext: CanvasContext = getCanvas();

    let { animation } = $props();

    onMount(async () => {
        await import('p5').then(module => {
            const p5 = module.default;

            canvasContext.canvasManager = new CanvasManager(p5);
            canvasContext.canvasManager.initializeCanvas(container);
        });
    });

    onDestroy(() => {
        canvasContext.canvasManager?.resetCanvas();
    });

    $effect(() => {
        if (canvasContext.canvasManager && animation) {
            canvasContext.canvasManager?.draw(animation);
        }
    });

</script>

<main
    bind:this={container}
    class='flex w-full h-full'
></main>

<style>

    main {
        justify-content: center;
    }

</style>
