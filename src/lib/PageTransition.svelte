<script>
  import { fly } from "svelte/transition"
  export let refresh = ""
  let dx;
  let duration = 200;
  $: dx = refresh === 'index' ? -35 : 35;
</script>

{#key refresh}
  <div in:fly={{  x:dx, duration: duration, delay: duration }}
       out:fly={{ x: -dx, duration: duration }}>
    <slot />
  </div>
{/key}
