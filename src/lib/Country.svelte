<script>
  import {faStar} from '@fortawesome/free-solid-svg-icons';
  import Fa from 'svelte-fa/src/fa.svelte';
  import {city, isIndex} from '../stores';

  export let country;

    function openCity(currentCity) {
        city.update(() => currentCity);
        isIndex.update(() => false);
    }

</script>

{#if country.description}
    <div class="mb-7 description">{@html country.description}</div>
{/if}
{#if country.cities}
    <ul class="cities-list mb-7">
        {#each country.cities as city}
            <li class="city py-0.5"><a href="#" on:click="{() => openCity(city)}" class="hover:underline">
                {#if city.mark}
                    <Fa icon={faStar} class="inline text-gray-300"/>
                {/if}{city.name}</a></li>
        {/each}
    </ul>
{/if}
