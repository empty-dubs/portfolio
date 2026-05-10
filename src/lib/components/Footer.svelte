<script lang="ts">

    import { getWindowState } from '$lib/components/WindowState.svelte';

    const windowState = getWindowState();

   let {footerHeight = $bindable()} = $props<{
    footerHeight: number;
   }>();

   const year = new Date().getFullYear();

</script>

<footer bind:clientHeight={footerHeight} class={windowState.screenType === 'monitor' ? 'monitor': 'other'}>
    <p class='copyright'>Copyright 2025-{year}</p>
</footer>

<style>

    footer {
        text-align: center;
    }

    footer.monitor {
        padding: 10px 0px;
    }
    
    .copyright {
        display: inline-block;

        font-size: 14px;

        border-top: 1px solid;
    }
</style>
