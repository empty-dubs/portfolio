<script>
    
    import Icon from 'svelte-awesome';
    import gear from 'svelte-awesome/icons/gear';

    import { slide } from 'svelte/transition';
    import { cubicOut } from 'svelte/easing';

    import AnimationControls from "./AnimationControls.svelte";

    let { animation } = $props();
    let expanded = $state(false);

    const toggle = () => expanded = !expanded;

    function handleKeyDown(e) {
      e.preventDefault();

      if (e.key === 'Escape') {
        toggle();
      }
    }

</script>

<svelte:window onkeydown={handleKeyDown}/>

<div class="panel-wrapper">
    <div class="panel" class:expanded>

      <button class="handle items-center w-full" onclick={toggle} aria-expanded={expanded} aria-controls="panel-body">
          <span class="handle-label">Settings</span>
          <Icon data={gear}/>
      </button>

      {#if expanded}
        <div class='panel-body' transition:slide={ { duration: 200, easing: cubicOut }}>
          <AnimationControls {animation}/>
        </div>
      {/if}

    </div>
</div>

<style>
 
  .panel-wrapper {
    position: relative;
    justify-content: center;

    background: inherit;

    color: #e2ddd8;
  }

  .panel {
    background: inherit;
    border: 1px solid none;
  }
 
  .handle {
    box-sizing: border-box;
    border-bottom: 1px solid transparent;

    cursor: pointer;
    user-select: none;
  }
 
  .panel.expanded .handle {
    border-bottom-color: #22222e;
  }
 
  .handle:hover {
    background: rgba(255, 255, 255, 0.1);
  }

  .panel-body {
    position:absolute;
    left: 50%;

    background: #121212;

    width: 50%;

    z-index: 1;

    transform: translate(-50%, 0);
  }
 
</style>
