<script lang="ts">

    import { onMount } from "svelte";

    import { restartAnimation, toFullScreen } from '../../components/AnimationControls';
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
        if (animation) {
            const stream = canvas.captureStream(120);

            canvasState.record(animation, stream);

            canvasState.canvas?.draw(animation);
        };
    });

    function handleKeyDown(e) {
        if (e.key === 'r') {
            restartAnimation(animation, canvasState.canvas);
        } else if (e.key === 'f') {
            toFullScreen(canvasState.canvas.canvas);
        }
    }

</script>

<svelte:window onkeydown={handleKeyDown}/>

<canvas bind:this={canvas} class='w-full h-full'></canvas>
