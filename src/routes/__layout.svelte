<script>
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

<div class="max-w">
			<PageTransition refresh={key}>
			<main id="main-container" class="max-w-full md:shadow-lg md:rounded-lg p-5 md:p-10 mb-10">
				<h2 class="mb-5">
					Групповые медитации для старых студентов
				</h2>
				
				<slot />
			
			</main>
		</PageTransition>
</div>

