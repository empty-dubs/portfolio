<script>

    import { getWindowState } from './WindowState.svelte';

    const windowState = getWindowState();

    let { children } = $props();
    
</script>

{#if windowState.screenType === 'phone'}
    <div class='phone-warning'>
        <h1>Insufficient space to display app.</h1>
        <h1>Consider rotating device if using a phone or tablet.</h1>
    </div>
    {:else}
        {@render children()}
{/if}

<style>

    .phone-warning {
        position: relative;
        top: 50%;
        text-align: center;
    }

</style>
