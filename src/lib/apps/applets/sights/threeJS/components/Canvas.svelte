<script lang="ts">

    import { onMount } from "svelte";

    import { getCanvasState } from "../../components/CanvasState.svelte";

    const canvasState = getCanvasState();

    let canvas: HTMLCanvasElement;

    let { animation } = $props();

    onMount(() => {
        canvasState.setCanvas('threeJS');

        canvasState.canvas.initializeCanvas(canvas);

        canvasState.canvas.checkCanvasSize(canvas);

        // onDestory/unmount behavior
        return () => {
            canvasState.canvas?.renderer?.setAnimationLoop(null);
            canvasState.canvas = null;
        }
    });

    $effect(() => {
        // redraw canvas when the animation changes
        if (animation) canvasState.canvas?.draw(animation);
    });

</script>

<canvas bind:this={canvas} class='w-full h-full'></canvas>
