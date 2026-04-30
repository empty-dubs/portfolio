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
        background: #f7f7f7;
        bottom: 0;
        position: fixed;

        padding: 10px 0px;

        width: 100%;

        text-align: center;
    }
    
    .copyright {
        display: inline-block;

        border-top: 1px solid #ddd;
        
        color: #aaa;
        font-size: 14px;
    }
</style>
