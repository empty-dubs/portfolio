<script lang="ts">

    import AnimationHub from "$lib/apps/applets/sights/components/AnimationHub.svelte";

    const engine = 'threeJS';
    const modules = import.meta.glob('../animations/simulations/**/*.js', { eager: true });

</script>

<AnimationHub {engine} {modules}/>
