<script lang="ts">

    import { onMount } from "svelte";

    import { getCanvas } from "$lib/apps/applets/sights/components/ThreeJSCanvasContext";
    import CanvasManager from "./canvasManager";

    import type { CanvasContext } from "$lib/apps/applets/sights/components/ThreeJSCanvasContext";

    let canvas: HTMLCanvasElement;

    const canvasContext: CanvasContext = getCanvas();

    let { animation } = $props();

    onMount(() => {

        canvasContext.canvasManager = new CanvasManager();

        canvasContext.canvasManager.initializeCanvas(canvas);

        canvasContext.canvasManager.checkCanvasSize(canvas);

        // onDestory/unmount behavior
        return () => {
            // if (frameId) cancelAnimationFrame(frameId);
            canvasContext.canvasManager?.renderer?.setAnimationLoop(null);
        }
    });

    $effect(() => {
        // redraw canvas when the animation changes
        if (animation) canvasContext.canvasManager?.draw(animation);
    });

</script>

<canvas bind:this={canvas} class='w-full h-full'></canvas>
