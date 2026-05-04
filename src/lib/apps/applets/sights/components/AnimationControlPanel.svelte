<script>
    
    import Icon from 'svelte-awesome';
    import gear from 'svelte-awesome/icons/gear';

    import { slide } from 'svelte/transition';
    import { cubicOut } from 'svelte/easing';

    import AnimationControls from "./AnimationControls.svelte";

    let { animation } = $props();
    let expanded = $state(false);

    const toggle = () => expanded = !expanded;

</script>

<div class="panel-wrapper w-full flex">
    <div class="panel" class:expanded>

    <button class="handle w-full" onclick={toggle} aria-expanded={expanded} aria-controls="panel-body">
        <span class="handle-label">Settings</span>
        <Icon data={gear}/>
    </button>

    {#if expanded}
      <!-- <div class='panel-body' transition:slide={ { duration: 380, easing: cubicOut }}> -->
      <div>
        <AnimationControls {animation}/>
      </div>
    {/if}

    </div>
</div>

<style>
 
  /* :global(body) {
    margin: 0;
    min-height: 100vh;
    background: #0c0c10;
    font-family: 'DM Mono', monospace;
    color: #e2ddd8;
  } */
 
  /* ── Layout ─────────────────────────────────── */
 
  .panel-wrapper {
    position: fixed;
    /* left: 0; */
    /* right: 0; */
    justify-content: center;
    z-index: 1;
    /* pointer-events: none; */
  }
 
  .panel {
    /* pointer-events: all; */
    background: #13131a;
    border: 1px solid none;
    /* border-bottom: none; */
    border-radius: 18px 18px 18px 18px;
  }
 
  .panel.expanded {
    width: min(640px, 100%);
    border: 1px solid rgb(255, 255, 255, 0.05);
    /* border-color: #3a3a52; */
  }
 
  /* ── Handle ─────────────────────────────────── */
 
  .handle {
    /* all: unset; */
    /* display: flex; */
    align-items: center;
    /* gap: 12px; */
    /* padding: 14px 20px; */
    box-sizing: border-box;
    cursor: pointer;
    border-bottom: 1px solid transparent;
    /* transition: background 0.2s ease, border-color 0.3s ease; */
    user-select: none;
  }
 
  .panel.expanded .handle {
    border-bottom-color: #22222e;
  }
 
  .handle:hover {
    background: rgba(255, 255, 255, 0.03);
  }
 
</style>
