<script>
  import Fa from 'svelte-fa/src/fa.svelte';
  import {
    faStar
  } from '@fortawesome/free-solid-svg-icons';
  export let country;
</script>

{#if country.description}<div class="mb-7 description">{@html country.description}</div>{/if}
{#if country.сities}
<ul class="cities-list mb-7">
  {#each country.сities as city}
    <li class="city py-0.5"><a href="/{city.slug}" class="hover:underline">{#if city.mark}<Fa icon={faStar} class="inline text-gray-300" />{/if}{city.name}</a></li>
    {/each}
</ul>
{/if}