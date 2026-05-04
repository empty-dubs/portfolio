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

<div class="panel-wrapper">
    <div class="panel" class:expanded>

      <button class="handle w-full" onclick={toggle} aria-expanded={expanded} aria-controls="panel-body">
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
    /* background: #0c0c10; */
    background: black;
    color: #e2ddd8;
  }

  .panel {
    border: 1px solid none;
  }
 
  .handle {
    align-items: center;
    box-sizing: border-box;
    cursor: pointer;
    border-bottom: 1px solid transparent;
    user-select: none;
  }
 
  .panel.expanded .handle {
    border-bottom-color: #22222e;
  }
 
  .handle:hover {
    background: rgba(255, 255, 255, 0.1);
  }

  .panel-body {
    background: black;
    position:absolute;
    left: 50%;
    transform: translate(-50%, 0);
    z-index: 1;
    width: 50%;
  }
 
</style>
