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

  let searchTerm = "";

	function findCities(countries, searchTerm) {
		return countries.reduce(function (res, country) {
			if (country.сities.some(({ name }) => name.toLowerCase().includes(searchTerm.toLowerCase()))) {
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
	
	$: found = findCities(countries, searchTerm);
	$: isSearching = searchTerm != "" ? true : false;

	export let countries;
</script>


<section>
	
	<Search bind:value = {searchTerm} label="" placeholder="Поиск по городам" autofocus hideLabel="false" />
	
	<Accordion>
		{#each found as country, i}

		<AccordionItem expanded='{i===0 || isSearching}' title="{country.name}">
		<ul>
			{#each country.сities as city}
				<li><a href="/{city.slug}">{city.name}</a></li>
			{/each}
		</ul>
	</AccordionItem>
	{/each}
</Accordion>

</section>


<style>
	:global([data-accordion-item] [role="region"]) {
		overflow: hidden;
		padding:0 1rem;
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
	:global([data-svelte-search] input)::-webkit-search-cancel-button {
  -webkit-appearance: none;
  appearance: none;
  height: 10px;
  width: 10px;
  background-image: url(data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pg0KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDE2LjAuMCwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPg0KPCFET0NUWVBFIHN2ZyBQVUJMSUMgIi0vL1czQy8vRFREIFNWRyAxLjEvL0VOIiAiaHR0cDovL3d3dy53My5vcmcvR3JhcGhpY3MvU1ZHLzEuMS9EVEQvc3ZnMTEuZHRkIj4NCjxzdmcgdmVyc2lvbj0iMS4xIiBpZD0iQ2FwYV8xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB4PSIwcHgiIHk9IjBweCINCgkgd2lkdGg9IjEyMy4wNXB4IiBoZWlnaHQ9IjEyMy4wNXB4IiB2aWV3Qm94PSIwIDAgMTIzLjA1IDEyMy4wNSIgc3R5bGU9ImVuYWJsZS1iYWNrZ3JvdW5kOm5ldyAwIDAgMTIzLjA1IDEyMy4wNTsiDQoJIHhtbDpzcGFjZT0icHJlc2VydmUiPg0KPGc+DQoJPHBhdGggZD0iTTEyMS4zMjUsMTAuOTI1bC04LjUtOC4zOTljLTIuMy0yLjMtNi4xLTIuMy04LjUsMGwtNDIuNCw0Mi4zOTlMMTguNzI2LDEuNzI2Yy0yLjMwMS0yLjMwMS02LjEwMS0yLjMwMS04LjUsMGwtOC41LDguNQ0KCQljLTIuMzAxLDIuMy0yLjMwMSw2LjEsMCw4LjVsNDMuMSw0My4xbC00Mi4zLDQyLjVjLTIuMywyLjMtMi4zLDYuMSwwLDguNWw4LjUsOC41YzIuMywyLjMsNi4xLDIuMyw4LjUsMGw0Mi4zOTktNDIuNGw0Mi40LDQyLjQNCgkJYzIuMywyLjMsNi4xLDIuMyw4LjUsMGw4LjUtOC41YzIuMy0yLjMsMi4zLTYuMSwwLTguNWwtNDIuNS00Mi40bDQyLjQtNDIuMzk5QzEyMy42MjUsMTcuMTI1LDEyMy42MjUsMTMuMzI1LDEyMS4zMjUsMTAuOTI1eiIvPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPGc+DQo8L2c+DQo8Zz4NCjwvZz4NCjxnPg0KPC9nPg0KPC9zdmc+DQo=);
  background-size: 10px 10px;
}
</style>