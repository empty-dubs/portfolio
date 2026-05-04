<script lang="ts">

    import { onMount } from "svelte";

    import AnimationControlPanel from "./AnimationControlPanel.svelte";
    import Canvas from "../threeJS/components/Canvas.svelte";
    import NavBar from "./NavBar.svelte";
    
    import { setCanvas } from "./ThreeJSCanvasContext";

    import type { CanvasContext } from "./ThreeJSCanvasContext";

    let { modules } = $props();

    let animations: object[] | undefined = $state();
    let canvasContext: CanvasContext = $state({ canvasManager: null });
    let CurrentAnimation: object | undefined = $state();

    onMount(() => {

        animations = Object.values(modules).map(mod => mod.default ?? mod).filter(mod => !mod.metadata.hidden);

        if (animations.length > 0) CurrentAnimation = animations[0];
    });

    setCanvas(canvasContext);

</script>

<main class="app-container flex grow flex-row">
    <div class="left-pane">
        <NavBar {animations} bind:currentAnimation={CurrentAnimation}/>
    </div>
    <div class="right-pane flex flex-1 flex-col">
        <AnimationControlPanel animation={CurrentAnimation}></AnimationControlPanel>
        <Canvas animation={CurrentAnimation}></Canvas>
    </div>
</main>

<style>

    .app-container {
        max-height: inherit;
        min-height: inherit;
    }

    .left-pane {
        background-color: #eaeaea;

        padding: 1rem 1rem 0rem 1rem;

        max-height: inherit;

        overflow: auto;
    }

    .right-pane {
        max-height: inherit;

        max-width: inherit;

        overflow: hidden;
    }

</style>
