<script context="module">
	import { base } from '$app/paths';
	export async function load({ fetch }) {
    const countries = await fetch(`${base}/index.json`)
        .then((r) => r.json());
				
    return {
      props: { countries }
    }
  }
	
</script>

<script>
	import { Accordion, AccordionItem } from "svelte-accessible-accordion";
	import Search from "svelte-search";
	import Fa from 'svelte-fa/src/fa.svelte';
  import {
    faSearchLocation,
		faPlusCircle,
		faStar,
faCity
  } from '@fortawesome/free-solid-svg-icons';

  let searchTerm = "";

	function findCities(countries, searchTerm) {
		return countries.reduce(function (res, country) {
			if (typeof country.сities != 'undefined' && country.сities.some(({ name }) => name.toLowerCase().includes(searchTerm.toLowerCase()))) {
				let filtered = {
					name: country.name,
					description: country.description,
					сities: country.сities.filter(({ name }) => name.toLowerCase().includes(searchTerm.toLowerCase()))
				}
				res.push(filtered)
			}
			return res
		}, [])
	}
	
	export let countries;
	$: found = searchTerm != "" ? findCities(countries, searchTerm) : countries;
	$: isSearching = searchTerm != "" ? true : false;

</script>


<section>
	
	<div class="search-wrap relative">
		<div class="absolute inset-y-0 left-0 pl-3  flex items-center  pointer-events-none">
			<Fa icon={faSearchLocation} class="text-gray-300 text-2xl" />
		</div>
		<Search bind:value = {searchTerm} label="" placeholder="Поиск по городам" hideLabel="false" class="appearance-none border rounded-full w-full py-3 pl-12 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow" />
	</div>
	
	<Accordion class="divide-y divide-gray-200">
		{#each found as country, i}

		<AccordionItem expanded='{i===0 || isSearching}' class=""  >
			<h3 slot="title"><Fa icon={faPlusCircle} class="inline mr-5" />{country.name}</h3>
		{#if country.description}<div class="mb-7 description">{@html country.description}</div>{/if}
		{#if country.сities}
		<ul class="cities-list mb-7">
			{#each country.сities as city}
				<li class="city py-0.5"><a href="/{city.slug}" class="hover:underline">{#if city.mark}<Fa icon={faStar} class="inline text-gray-300" />{/if}{city.name}</a></li>
			{/each}
		</ul>
		{/if}
	</AccordionItem>
	{/each}
</Accordion>

</section>


<style>
	:global([data-accordion-item] [role="region"]) {
		overflow: hidden;
		padding:0 0 0 2.55rem;
		max-height: 100vh;
		transition:
    	max-height .4s ease,
    	opacity .4s ease;
  	opacity: 1;
	}
	:global([data-accordion-item] [role="region"][hidden]) {
		display: block;
		max-height: 0px;
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
	.cities-list {
		columns: 2;
	}
	.city {
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