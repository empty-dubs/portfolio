<script>

    import Icon from 'svelte-awesome';
    import bars from 'svelte-awesome/icons/bars';
    import close from 'svelte-awesome/icons/close';

    import { slide } from 'svelte/transition';

    let {icon, label, open, children} = $props();
    
    const handleClick = () => {open = !open}
  </script>
  
<div class="accordion">
    <div class="header">
        {#if icon}
            <button onclick={handleClick}>
                {#if open}
                    <Icon data={close} label="menu-open" name="Menu Open"/>
                    {:else}
                        <Icon data={bars} label="menu-closed" name="Menu Closed"/>
                {/if}
            </button>
        {/if}

        {#if label}
            <button onclick={handleClick}>{label}</button>
        {/if}
    </div>

    {#if open}
        <div class="details" transition:slide>
            {@render children()}
        </div>
    {/if}
</div>
  
<style>
    
    div.accordion {
        margin: 1rem 0;
    }

    div.header {
        display:flex;

        width:100%;
    }

    div.details {
        padding:1rem;
    }
</style>
  