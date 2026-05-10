<script lang="ts">

    import { onMount, onDestroy } from "svelte";

    import { restartAnimation } from '../../components/AnimationControls';
    import { getCanvasState } from "../../components/CanvasState.svelte";

    const canvasState = getCanvasState();

    let container: HTMLCanvasElement;

    let { animation } = $props();

    onMount(async () => {
        await import('p5').then(module => {
            const p5 = module.default;

            canvasState.setCanvas('p5', p5);
            
            canvasState.canvas.initializeCanvas(container);
        });

        return () => {
            canvasState.canvas = null;
        }
    });

    onDestroy(() => {
        canvasState.canvas?.resetCanvas();
    });

    $effect(() => {
        if (canvasState.canvas && animation) {
            canvasState.canvas?.draw(animation);
        }
    });

    function handleKeyDown(e) {
        if (e.key === 'r') {
            restartAnimation(animation, canvasState.canvas);
        }
    }

</script>

<svelte:window onkeydown={handleKeyDown}/>

<main
    bind:this={container}
    class='flex w-full h-full'
></main>

<style>

    main {
        justify-content: center;
    }

</style>
