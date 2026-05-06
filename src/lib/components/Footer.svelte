<script lang="ts">

   let {footerHeight = $bindable()} = $props<{
    footerHeight: number;
   }>();

   const year = new Date().getFullYear();

</script>

<footer bind:clientHeight={footerHeight}>
    <p class='copyright'>Copyright 2025-{year}</p>
</footer>

<style>
    footer {
        padding: 10px 0px;

        text-align: center;
    }
    
    .copyright {
        display: inline-block;

        border-top: 1px solid #888888;
        
        color: #B0B0B0;

        font-size: 14px;
    }
</style>
