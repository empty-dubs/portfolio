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
        text-align: center;

        padding: 10px 0px;
    }
    
    .copyright {
        display: inline-block;

        font-size: 14px;

        border-top: 1px solid;
    }
</style>
