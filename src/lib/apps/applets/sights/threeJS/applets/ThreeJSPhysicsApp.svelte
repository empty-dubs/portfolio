<script lang="ts">

   import AnimationHub from "$lib/apps/applets/sights/components/AnimationHub.svelte";

    const modules = import.meta.glob('../animations/physics/**/*.js', { eager: true });

</script>

<AnimationHub {modules}/>
