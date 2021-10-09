<script>
	import Header from '$lib/header/Header.svelte';
	import "../styles/tailwind-output.css";
	import PageTransition from "$lib/components/base/PageTransition.svelte"
  export let key
</script>

<script context="module">
  export const load = async ({ page }) => ({
    props: {
      key: page.path,
    },
  })
</script>

<Header />
<div class="max-w-screen-lg mx-auto">
	<header class="bg-yellow-50 max-w-full h-24 mb-10"></header>
	<div class="grid grid-cols-4 gap-8">
		<sidebar class="h md:col-span-1 bg-gray-50 rounded"></sidebar>
		<article class="col-span-4 md:col-span-3">
			<main id="main-container" class="max-w-full md:shadow-lg md:rounded-lg p-5 md:p-10 mb-10">
				<h2 class="mb-5">
					Групповые медитации для старых студентов
				</h2>
				<PageTransition refresh={key}>
				<slot />
			</PageTransition>
			</main>
			<h1>Lorem ipsum</h1>
			<p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse quisquam fugit nam! Vel, officiis eum ratione quod, consequatur itaque aliquid laudantium in aspernatur minus quam, modi eaque delectus autem eos!</p>
			<p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse quisquam fugit nam! Vel, officiis eum ratione quod, consequatur itaque aliquid laudantium in aspernatur minus quam, modi eaque delectus autem eos!</p>
			<p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse quisquam fugit nam! Vel, officiis eum ratione quod, consequatur itaque aliquid laudantium in aspernatur minus quam, modi eaque delectus autem eos!</p>
		</article>
	</div>
</div>

