<script>
    import {faStar} from '@fortawesome/free-solid-svg-icons';
    import Fa from 'svelte-fa/src/fa.svelte';
    import {city, country as countryStore, isIndex} from '../stores';

    /** @type {import('../../types').Data.Country} */
    export let country;

    function openCity(currentCity) {
        countryStore.update(() => country.code);
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
            <li class="city py-0.5">
                <span
                    on:click="{() => openCity(city)}"
                    on:keypress="{() => openCity(city)}"
                    class="hover:underline cursor-pointer"
                    style="color: var(--link-color)"
                    role="link"
                    aria-roledescription="Link to the city information"
                    tabindex="0"
                >
                    {#if city.mark}
                        <Fa icon={faStar} class="inline text-gray-300"/>
                    {/if}
                    {city.name}
                </span>
            </li>
        {/each}
    </ul>
{/if}
