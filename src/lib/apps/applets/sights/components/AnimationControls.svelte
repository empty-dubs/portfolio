<script lang="ts">

    import Icon from 'svelte-awesome';

    import arrowsAlt from 'svelte-awesome/icons/arrowsAlt';
    import refresh from 'svelte-awesome/icons/refresh';
    import repeat from 'svelte-awesome/icons/repeat';

    import { getCanvasState } from "./CanvasState.svelte";

    const canvasState = getCanvasState();

    let { animation } = $props();


    interface AnimationParameter {
        currentValue: number| string,
        defaultValue: number| string,
        label: string,
        maxValue?: number,
        minValue?: number,
        options?: string[],
        type: string
    }

    let parameters: AnimationParameter[] = $derived(Object.values(animation.metadata.parameters));

    function boundInput(currentValue: number, maxValue: number, minValue: number): number {
        if (currentValue > maxValue) currentValue = maxValue;
        if (currentValue < minValue) currentValue = minValue;

        return currentValue;
    }

    function resetAnimation (animation: object): void {
        for (const parameter of parameters) parameter.currentValue = parameter.defaultValue;

        canvasState.canvas.draw(animation);
    };

    function restartAnimation(animation: object) {
        canvasState.canvas.draw(animation)
    };

    function toFullScreen(): void {
        const canvas = canvasState.canvas.canvas;

        if (canvas.requestFullscreen) {
            canvas.requestFullscreen();
        } else if (canvas.webkitRequestFullscreen) {
            canvas.webkitRequestFullscreen();
        } else if (canvas.mozRequestFullScreen) {
            canvas.mozRequestFullScreen();
        } else if (canvas.msRequestFullscreen) {
            canvas.msRequestFullscreen();
        }
    };

</script>

<main class="navbar-controls flex flex-col">
    <div>
        {#each parameters as {label, maxValue, minValue, options, type}, index (label)}
            <p>{label}</p>
            {#if type === 'text'}
                <input
                    class="w-full"
                    type="text"
                    bind:value={parameters[index].currentValue}
                />
                {:else if type === 'select'}
                    <select class="w-full" bind:value={parameters[index].currentValue}>
                        {#each options as option (option)}
                            <option value={option}>
                                {option}
                            </option>
                        {/each}
                    </select>
                {:else}
                    <input
                        class="w-full"
                        type="number"
                        max="{maxValue}"
                        min="{minValue}"
                        bind:value={
                            () => parameters[index].currentValue,
                            (value: number) => parameters[index].currentValue = boundInput(value, maxValue, minValue)
                        }
                    />
            {/if}
        {/each}
    </div>
    <div class="flex w-full">
        <button class="flex-1" onclick={() => restartAnimation(animation)}>
            <Icon data={repeat} label="Restart" name="Restart"/>
        </button>
        <button class="flex-1" onclick={() => resetAnimation(animation)}>
            <Icon data={refresh} label="Refresh" name="Refresh"/>
        </button>
        <button class="flex-1" onclick={() => toFullScreen()}>
            <Icon data={arrowsAlt} label="Full Screen" name="Full Screen"/>
        </button>
    </div>
</main>

<style>

    .navbar-controls {
        text-align: left;
    }

    p {
        margin-top: 8px;
        margin-bottom: 0;
    }

</style>
