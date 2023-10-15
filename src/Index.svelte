<script>
    import {faPlusCircle, faSearchLocation} from '@fortawesome/free-solid-svg-icons';
    import {Accordion, AccordionItem} from 'svelte-accessible-accordion';
    import Fa from 'svelte-fa/src/fa.svelte';
    import Search from 'svelte-search';
    import data from './data.json';
    import Country from './lib/Country.svelte';

    const countries = data.countries;
    let searchTerm = '';
    let expanded = Array(countries.length).fill(true, 0, 1).fill(false, 1);
    let isSearching;
    let found;

    $: {
        found = searchTerm !== '' ? findCities(countries, searchTerm) : countries;
        isSearching = !!searchTerm.length;
    }

    function findCities(countries, searchTerm) {
        return countries.reduce(function (res, country) {
            if (typeof country.cities != 'undefined'
                && country.cities.some(({name}) => name.toLowerCase().includes(searchTerm.toLowerCase()))) {
                const filtered = {
                    name: country.name,
                    description: country.description,
                    cities: country.cities.filter(({name}) => name.toLowerCase().includes(searchTerm.toLowerCase())),
                };
                res.push(filtered);
            }
            return res;
        }, []);
    }
</script>


<section>
    <div class="search-wrap relative">
        <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Fa class="text-gray-300 text-2xl" icon={faSearchLocation}/>
        </div>
        <Search
                bind:value={searchTerm}
                class="appearance-none border rounded-full w-full py-3 pl-12 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow"
                hideLabel="false"
                label=""
                placeholder="Поиск по городам"
        />
    </div>

    {#if isSearching}
        <ul class="found-list divide-y divide-gray-200">
            {#each found as country, i}
                <li>
                    <h3>{country.name}</h3>
                    <Country country={country}/>
                </li>
            {/each}
        </ul>

    {:else}
        <Accordion class="divide-y divide-gray-200">
            {#each found as country, i}
                <AccordionItem expanded={expanded[i]} class="">
                    <h3 slot="title">
                        <Fa icon={faPlusCircle} class="inline mr-5"/>{country.name}</h3>
                    <Country country={country}/>
                </AccordionItem>
            {/each}
        </Accordion>
    {/if}

</section>


<style>
    :global([data-accordion-item] [role="region"]) {
        overflow: hidden;
        padding: 0 0 0 2.55rem;
        max-height: 100vh;
        transition: max-height .4s ease,
        opacity .4s ease;
        opacity: 1;
    }

    :global([data-accordion-item] [role="region"][hidden]) {
        display: block;
        max-height: 0;
        opacity: 0;
    }

    :global([data-accordion-item] .fa) {
        transition: transform .5s ease;
    }

    :global([data-accordion-item] button) {
        display: block;
        width: 100%;
        text-align: left;
        padding-top: 1.25rem;
        padding-bottom: 1.25rem;
    }

    :global([data-accordion-item] [aria-expanded="true"] .fa) {
        transform: rotate(45deg);
    }

    .found-list li {
        padding: 0 0 0 2.55rem;
    }

    .found-list h3 {
        display: block;
        width: 100%;
        text-align: left;
        padding-top: 1.25rem;
        padding-bottom: 1.25rem;
    }

    :global(.cities-list) {
        columns: 2;
    }

    :global(.city) {
        position: relative;
    }

    :global(.city .fa) {
        position: absolute;
        left: -25px;
        top: 5px;
    }

    :global([data-svelte-search] input)::-webkit-search-cancel-button {
        -webkit-appearance: none;
        appearance: none;
        height: 10px;
        width: 10px;
        background-image: url(data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pg0KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDE2LjAuMCwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPg0KPCFET0NUWVBFIHN2ZyBQVUJMSUMgIi0vL1czQy8vRFREIFNWRyAxLjEvL0VOIiAiaHR0cDovL3d3dy53My5vcmcvR3JhcGhpY3MvU1ZHLzEuMS9EVEQvc3ZnMTEuZHRkIj4NCjxzdmcgdmVyc2lvbj0iMS4xIiBpZD0iQ2FwYV8xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB4PSIwcHgiIHk9IjBweCINCgkgd2lkdGg9IjEyMy4wNXB4IiBoZWlnaHQ9IjEyMy4wNXB4IiB2aWV3Qm94PSIwIDAgMTIzLjA1IDEyMy4wNSIgc3R5bGU9ImVuYWJsZS1iYWNrZ3JvdW5kOm5ldyAwIDAgMTIzLjA1IDEyMy4wNTsiDQoJIHhtbDpzcGFjZT0icHJlc2VydmUiPg0KPGc+DQoJPHBhdGggZD0iTTEyMS4zMjUsMTAuOTI1bC04LjUtOC4zOTljLTIuMy0yLjMtNi4xLTIuMy04LjUsMGwtNDIuNCw0Mi4zOTlMMTguNzI2LDEuNzI2Yy0yLjMwMS0yLjMwMS02LjEwMS0yLjMwMS04LjUsMGwtOC41LDguNQ0KCQljLTIuMzAxLDIuMy0yLjMwMSw2LjEsMCw4LjVsNDMuMSw0My4xbC00Mi4zLDQyLjVjLTIuMywyLjMtMi4zLDYuMSwwLDguNWw4LjUsOC41YzIuMywyLjMsNi4xLDIuMyw4LjUsMGw0Mi4zOTktNDIuNGw0Mi40LDQyLjQNCgkJYzIuMywyLjMsNi4xLDIuMyw4LjUsMGw4LjUtOC41YzIuMy0yLjMsMi4zLTYuMSwwLTguNWwtNDIuNS00Mi40bDQyLjQtNDIuMzk5QzEyMy42MjUsMTcuMTI1LDEyMy42MjUsMTMuMzI1LDEyMS4zMjUsMTAuOTI1eiIvPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPC9zdmc+DQo=);
        background-size: 10px 10px;
    }
</style>
