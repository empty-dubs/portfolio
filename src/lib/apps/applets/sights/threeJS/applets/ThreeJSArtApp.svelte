<script lang="ts">

    import NavBar from "../components/NavBar.svelte";
    import Canvas from "../components/Canvas.svelte";

	import { onMount } from "svelte";
    import { setCanvas } from "../components/canvasContext";

    import type { CanvasContext } from "../components/canvasContext";

    let animations: object[] | undefined = $state();
    let canvasContext: CanvasContext = $state({ canvasManager: null });
    let CurrentAnimation: object | undefined = $state();

    const modules = import.meta.glob('../animations/art/**/*.js', { eager: true });

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
    <div class="right-pane flex flex-1">
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
        padding-right: 1rem;

        max-height: inherit;

        max-width: inherit;

        overflow: hidden;
    }

</style>
